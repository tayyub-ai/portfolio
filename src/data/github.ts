type GithubAccountConfig = {
  handle: string;
  label: string;
  accent: string;
  fallbackTotal: number;
  fallbackActiveDays: number;
  fallbackMaxDayCount: number;
  fallbackBusiestDay: string;
  fallbackBusiestDayCount: number;
  fallbackVisibleRepos: string[];
};

type GithubRepo = {
  name: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type GithubContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GithubContributionMonth = {
  key: string;
  label: string;
  total: number;
};

export type GithubAccountContributionData = {
  handle: string;
  label: string;
  accent: string;
  profile: string;
  total: number;
  activeDays: number;
  publicRepoCount: number;
  visibleRepos: string[];
  weeks: GithubContributionDay[][];
  months: GithubContributionMonth[];
  maxDayCount: number;
  busiestDay: {
    date: string;
    label: string;
    count: number;
  } | null;
  windowLabel: string;
  sourceLabel: string;
};

export type GithubContributionDataset = {
  combinedTotal: number;
  combinedPublicRepoCount: number;
  accounts: GithubAccountContributionData[];
  windowLabel: string;
  sourceLabel: string;
};

const githubAccounts: GithubAccountConfig[] = [
  {
    handle: "tayyub-ai",
    label: "Primary public build account",
    accent: "#c44d2c",
    fallbackTotal: 1005,
    fallbackActiveDays: 54,
    fallbackMaxDayCount: 112,
    fallbackBusiestDay: "2026-03-28",
    fallbackBusiestDayCount: 112,
    fallbackVisibleRepos: [
      "portfolio",
      "awesome-llm-apps",
      "basketball-player-movement-analysis",
      "markdown-rag-knowledgebase",
      "image-driven-dialogue",
      "cv-builder",
      "free-online-games",
      "ai-tools",
    ],
  },
  {
    handle: "Tayyab8ms",
    label: "Company account",
    accent: "#8a5e15",
    fallbackTotal: 196,
    fallbackActiveDays: 21,
    fallbackMaxDayCount: 22,
    fallbackBusiestDay: "2025-10-12",
    fallbackBusiestDayCount: 8,
    fallbackVisibleRepos: [
      "google-search-console-connector",
      "Vaccine-K-means-Cluster",
    ],
  },
];

function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatWindowLabel(from: string, to: string) {
  return `${formatDateLabel(from)} to ${formatDateLabel(to)}`;
}

function parseCountFromTooltip(tooltip: string) {
  if (tooltip.includes("No contributions")) {
    return 0;
  }

  const match = tooltip.match(/([\d,]+)\s+contribution/);
  return match ? Number(match[1].replaceAll(",", "")) : 0;
}

function parseContributionDays(markup: string) {
  const days: GithubContributionDay[] = [];
  const dayPattern =
    /data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*><\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g;

  for (const match of markup.matchAll(dayPattern)) {
    days.push({
      date: match[1],
      level: Number(match[2]),
      count: parseCountFromTooltip(match[3]),
    });
  }

  return days.sort((left, right) => left.date.localeCompare(right.date));
}

function buildWeeks(days: GithubContributionDay[]) {
  const byDate = new Map(days.map((day) => [day.date, day]));
  const start = new Date(`${days[0]?.date}T00:00:00Z`);
  const end = new Date(`${days.at(-1)?.date}T00:00:00Z`);
  const weeks: GithubContributionDay[][] = [];
  let cursor = new Date(start);

  while (cursor <= end) {
    const week: GithubContributionDay[] = [];

    for (let dayOffset = 0; dayOffset < 7 && cursor <= end; dayOffset += 1) {
      const iso = cursor.toISOString().slice(0, 10);
      const day = byDate.get(iso) ?? { date: iso, count: 0, level: 0 };
      week.push(day);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    if (week.length === 7) {
      weeks.push(week);
    }
  }

  return weeks;
}

function buildMonths(days: GithubContributionDay[]) {
  const monthMap = new Map<string, number>();

  for (const day of days) {
    const key = day.date.slice(0, 7);
    monthMap.set(key, (monthMap.get(key) ?? 0) + day.count);
  }

  return [...monthMap.entries()].map(([key, total]) => ({
    key,
    total,
    label: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(new Date(`${key}-01T00:00:00Z`)),
  }));
}

async function loadVisibleRepos(account: GithubAccountConfig) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${account.handle}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub repo request failed: ${response.status}`);
    }

    const repos = (await response.json()) as GithubRepo[];
    const visibleRepos = repos
      .filter((repo) => !repo.archived)
      .sort((left, right) => right.pushed_at.localeCompare(left.pushed_at))
      .map((repo) => repo.name);

    return {
      publicRepoCount: visibleRepos.length,
      visibleRepos: visibleRepos.slice(0, 8),
    };
  } catch {
    return {
      publicRepoCount: account.fallbackVisibleRepos.length,
      visibleRepos: account.fallbackVisibleRepos,
    };
  }
}

async function loadGithubAccountData(
  account: GithubAccountConfig,
): Promise<GithubAccountContributionData> {
  const repoData = await loadVisibleRepos(account);
  const profile = `https://github.com/${account.handle}`;
  const contributionsUrl = `https://github.com/users/${account.handle}/contributions`;

  try {
    const response = await fetch(contributionsUrl);
    if (!response.ok) {
      throw new Error(`GitHub contribution request failed: ${response.status}`);
    }

    const markup = await response.text();
    const days = parseContributionDays(markup);
    if (days.length === 0) {
      throw new Error("GitHub contribution graph returned no day cells.");
    }

    const totalMatch = markup.match(/>\s*([\d,]+)\s*contributions\s*in the last year\s*</i);
    const fromMatch = markup.match(/data-from="([^"]+)/);
    const toMatch = markup.match(/data-to="([^"]+)/);
    const total = totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : 0;
    const fromDate = (fromMatch?.[1] ?? days[0].date).slice(0, 10);
    const toDate = (toMatch?.[1] ?? days.at(-1)?.date ?? days[0].date).slice(0, 10);
    const months = buildMonths(days);
    const activeDays = days.filter((day) => day.count > 0).length;
    const busiestDay = [...days].sort((left, right) => right.count - left.count)[0] ?? null;

    return {
      handle: account.handle,
      label: account.label,
      accent: account.accent,
      profile,
      total,
      activeDays,
      publicRepoCount: repoData.publicRepoCount,
      visibleRepos: repoData.visibleRepos,
      weeks: buildWeeks(days),
      months,
      maxDayCount: Math.max(...days.map((day) => day.count), 0),
      busiestDay: busiestDay
        ? {
            date: busiestDay.date,
            label: formatDateLabel(busiestDay.date),
            count: busiestDay.count,
          }
        : null,
      windowLabel: formatWindowLabel(fromDate, toDate),
      sourceLabel: `Verified from the public GitHub contribution view on ${formatDateLabel(
        new Date().toISOString().slice(0, 10),
      )}`,
    };
  } catch {
    return {
      handle: account.handle,
      label: account.label,
      accent: account.accent,
      profile,
      total: account.fallbackTotal,
      activeDays: account.fallbackActiveDays,
      publicRepoCount: repoData.publicRepoCount,
      visibleRepos: repoData.visibleRepos,
      weeks: [],
      months: [],
      maxDayCount: account.fallbackMaxDayCount,
      busiestDay: {
        date: account.fallbackBusiestDay,
        label: formatDateLabel(account.fallbackBusiestDay),
        count: account.fallbackBusiestDayCount,
      },
      windowLabel: "May 11, 2025 to May 16, 2026",
      sourceLabel: "Public GitHub contribution data could not be loaded during build.",
    };
  }
}

export async function getGithubContributionDataset(): Promise<GithubContributionDataset> {
  const accounts = await Promise.all(githubAccounts.map((account) => loadGithubAccountData(account)));

  return {
    combinedTotal: accounts.reduce((sum, account) => sum + account.total, 0),
    combinedPublicRepoCount: accounts.reduce((sum, account) => sum + account.publicRepoCount, 0),
    accounts,
    windowLabel: accounts[0]?.windowLabel ?? "Unavailable",
    sourceLabel: accounts[0]?.sourceLabel ?? "Unavailable",
  };
}
