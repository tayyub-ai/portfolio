export type PublicationItem = {
  title: string;
  url: string;
  outlet: string;
  format: string;
  theme: string;
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
    title: "Meet EmCoin – Where You Can Trade Crypto, Stocks, and Commodities Together",
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
