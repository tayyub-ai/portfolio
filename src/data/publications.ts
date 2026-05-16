export type PublicationItem = {
  title: string;
  url: string;
  outlet: string;
  format: string;
  theme: string;
  note?: string;
};

export type ArchivedPublicationItem = {
  title: string;
  date: string;
  format: string;
  note?: string;
};

export const liveCointelegraphArticles: PublicationItem[] = [
  {
    title: "Inside the Swiss city where you can pay for almost everything in Bitcoin",
    url: "https://cointelegraph.com/news/inside-the-swiss-city-where-you-can-pay-for-almost-everything-in-bitcoin",
    outlet: "Cointelegraph",
    format: "How to",
    theme: "Adoption",
    note: "Direct article URL verified through browser-accessible retrieval on 2026-05-14.",
  },
  {
    title: "What happens to Satoshi’s 1M Bitcoin if quantum computers go live?",
    url: "https://cointelegraph.com/explained/what-happens-to-satoshi-s-1m-bitcoin-if-quantum-computers-go-live",
    outlet: "Cointelegraph",
    format: "Explained",
    theme: "Quantum",
  },
  {
    title: "Can ChatGPT-powered AI agents really trade crypto for you?",
    url: "https://cointelegraph.com/news/can-chatgpt-powered-ai-agents-really-trade-crypto-for-you",
    outlet: "Cointelegraph",
    format: "How to",
    theme: "AI agents",
  },
  {
    title: "AI-powered romance scams: The new frontier in crypto fraud",
    url: "https://cointelegraph.com/explained/ai-powered-romance-scams-the-new-frontier-in-crypto-fraud",
    outlet: "Cointelegraph",
    format: "Explained",
    theme: "Security",
  },
  {
    title: "Can AI bots steal your crypto? The rise of digital thieves",
    url: "https://cointelegraph.com/explained/can-ai-bots-steal-your-crypto-the-rise-of-digital-thieves",
    outlet: "Cointelegraph",
    format: "Explained",
    theme: "Security",
  },
  {
    title: "How to use Grok for real-time crypto trading signals",
    url: "https://cointelegraph.com/news/how-to-use-grok-for-crypto-trading",
    outlet: "Cointelegraph",
    format: "How to",
    theme: "AI trading",
  },
  {
    title: "How to use GitHub, Discord and X to identify real crypto innovation",
    url: "https://cointelegraph.com/news/how-to-use-github-discord-and-x-to-identify-real-crypto-innovation",
    outlet: "Cointelegraph",
    format: "How to",
    theme: "Research workflow",
  },
  {
    title: "What is decentralized identity in blockchain?",
    url: "https://cointelegraph.com/explained/what-is-decentralized-identity-in-blockchain/",
    outlet: "Cointelegraph",
    format: "Explained",
    theme: "Blockchain",
  },
];

export const liveAlphaWireArticles: PublicationItem[] = [
  {
    title: "X402 Explained: How Coinbase Is Simplifying Stablecoin Transactions Over HTTP",
    url: "https://alphawire.xyz/news/x402-explained-how-coinbase-is-simplifying-stablecoin-transactions-over-http/",
    outlet: "AlphaWire",
    format: "Technology",
    theme: "Payments",
  },
  {
    title: "Meet EmCoin: Where You Can Trade Crypto, Stocks, and Commodities Together",
    url: "https://alphawire.xyz/news/meet-emcoin-where-you-can-trade-crypto-stocks-and-commodities-together/",
    outlet: "AlphaWire",
    format: "Business",
    theme: "Fintech",
  },
];

export const publicationArchive = {
  title: "Cointelegraph publication record archive",
  url: "/evidence/cointelegraph-articles-history.pdf",
  description:
    "PDF archive captured from Cointelegraph history before the outlet removed or restructured parts of the earlier author-index surface.",
};

export const archivedCointelegraphArticles: ArchivedPublicationItem[] = [
  { title: "Inside the Swiss city where you can pay for almost everything in Bitcoin", date: "2025-12-26", format: "How to" },
  { title: "What happens to Satoshi’s 1M Bitcoin if quantum computers go live?", date: "2025-11-15", format: "Explained" },
  { title: "How to turn ChatGPT into your personal crypto trading assistant", date: "2025-11-05", format: "How to" },
  { title: "Can ChatGPT really predict the next crypto market crash?", date: "2025-10-30", format: "How to" },
  { title: "How to use Google’s Gemini to research coins before you invest", date: "2025-10-14", format: "How to" },
  { title: "How to day trade crypto using ChatGPT and Grok", date: "2025-09-22", format: "How to" },
  { title: "How to use ChatGPT for real-time crypto trading signals", date: "2025-09-19", format: "How to" },
  { title: "How to use Grok for real-time crypto trading signals", date: "2025-09-08", format: "How to" },
  { title: "Can AI bots steal your crypto? The rise of digital thieves", date: "2025-09-04", format: "Explained" },
  { title: "How to use Google Gemini for smarter crypto trading", date: "2025-09-03", format: "How to" },
  { title: "How to use ChatGPT to predict altcoin pumps before they happen", date: "2025-09-01", format: "How to" },
  { title: "Can Google Gemini really help plan crypto trades?", date: "2025-08-08", format: "How to" },
  { title: "This open-source LLM could redefine AI research, and it’s 100% public", date: "2025-08-05", format: "Explained" },
  { title: "How to use GitHub, Discord, and X to find hidden crypto gems early", date: "2025-07-14", format: "How to" },
  { title: "How to use ChatGPT for crypto strategy, signals, and sentiment", date: "2025-07-11", format: "How to" },
  { title: "ChatGPT vs X: Which is better at first spotting the next big crypto narrative?", date: "2025-07-09", format: "How to" },
  { title: "What are address poisoning attacks in crypto and how to avoid them?", date: "2025-07-03", format: "How to" },
  { title: "Tried automating crypto trades with Grok 3? Here’s what happens", date: "2025-06-12", format: "How to" },
  { title: "When an AI says, ‘No, I don’t want to power off’: Inside the o3 refusal", date: "2025-06-11", format: "Explained" },
  { title: "Can ChatGPT-powered AI agents really trade crypto for you?", date: "2025-05-23", format: "How to" },
  { title: "How to use ChatGPT to predict crypto market trends", date: "2025-03-24", format: "How to" },
  { title: "How to build a ChatGPT-powered AI trading bot: A step-by-step guide", date: "2025-03-04", format: "How to" },
  { title: "How to develop an AI agent for crypto trading", date: "2025-02-10", format: "How to" },
  { title: "AI-powered romance scams: The new frontier in crypto fraud", date: "2025-01-27", format: "Explained" },
  { title: "SAB 121 rescinded: What it means for crypto custody and regulation in 2025", date: "2025-01-24", format: "Explained" },
  { title: "What are quantum-resistant tokens and why do they matter for crypto?", date: "2025-01-08", format: "Explained" },
  { title: "Google’s Willow quantum chip vs. Bitcoin security — What’s at stake?", date: "2024-12-17", format: "Explained" },
  { title: "What is decentralized identity in blockchain?", date: "2024-12-13", format: "Explained" },
  { title: "What is a crypto vault, and how does it work?", date: "2024-05-23", format: "Explained" },
  { title: "What are generative art NFTs?", date: "2024-04-07", format: "Explained" },
];
