import { portfolio, SITE_URL, PERSON_ID, ORG_ID, WEBSITE_ID } from './portfolio';

export { SITE_URL, PERSON_ID, ORG_ID, WEBSITE_ID };

const { personalInfo, socialLinks, education } = portfolio;

const SAME_AS = [
  socialLinks.linkedin,
  socialLinks.github,
  socialLinks.twitter,
  // TODO: Cointelegraph author page URL — see recognitionTodos[1]
  // TODO: AlphaWire contributor URL — see recognitionTodos[2]
].filter(Boolean);

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: personalInfo.name,
    alternateName: personalInfo.alternateName,
    jobTitle: personalInfo.title,
    description: personalInfo.summary,
    image: `${SITE_URL}${personalInfo.image}`,
    url: SITE_URL,
    email: `mailto:${personalInfo.email}`,
    nationality: personalInfo.nationality,
    knowsLanguage: personalInfo.languages,
    knowsAbout: personalInfo.knowsAbout,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stirling',
      addressRegion: 'Scotland',
      addressCountry: 'GB',
    },
    worksFor: { '@id': ORG_ID },
    alumniOf: education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
    })),
    sameAs: SAME_AS,
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Tayyub Yaqoob',
    url: SITE_URL,
    logo: `${SITE_URL}${personalInfo.image}`,
    founder: { '@id': PERSON_ID },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.summary,
    publisher: { '@id': ORG_ID },
    mainEntity: { '@id': PERSON_ID },
    inLanguage: 'en-GB',
  };
}

export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

export function buildProfilePageSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: canonicalUrl,
    mainEntity: { '@id': PERSON_ID },
    dateModified: new Date().toISOString().slice(0, 10),
  };
}

export function buildContactPageSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: canonicalUrl,
    about: { '@id': PERSON_ID },
  };
}

export function buildPublicationsCollectionSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: canonicalUrl,
    name: 'Publications & Bylines',
    about: { '@id': PERSON_ID },
    hasPart: portfolio.publications.map((p) => ({
      '@type': 'Article',
      headline: p.title,
      author: { '@id': PERSON_ID },
      publisher: {
        '@type': 'Organization',
        name: p.publisher,
        url: p.publisherUrl,
      },
      about: p.topics,
      url: p.url || p.publisherUrl,
    })),
  };
}

export function buildProjectsCollectionSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: canonicalUrl,
    name: 'Projects',
    about: { '@id': PERSON_ID },
    hasPart: portfolio.projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      creator: { '@id': PERSON_ID },
      url: `${SITE_URL}/projects/${p.slug}`,
      keywords: p.technologies.join(', '),
    })),
  };
}

export function buildProjectSchema(slug: string, canonicalUrl: string) {
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Project not found: ${slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: { '@id': PERSON_ID },
    url: canonicalUrl,
    keywords: project.technologies.join(', '),
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'profile' | 'article';
};

export function buildPageMeta(meta: PageMeta) {
  const canonical = `${SITE_URL}${meta.path}`;
  return {
    canonical,
    fullTitle: `${meta.title} — ${portfolio.personalInfo.name}`,
    description: meta.description,
    ogType: meta.ogType ?? 'website',
    ogImage: `${SITE_URL}${portfolio.personalInfo.image}`,
    twitterHandle: '@TayyabY',
  };
}
