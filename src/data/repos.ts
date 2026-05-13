export type RepoItem = {
  name: string;
  url: string;
  description: string;
  tags: string[];
};

export const publicRepos: RepoItem[] = [
  {
    name: "ai-tools",
    url: "https://github.com/tayyub-ai/ai-tools",
    description:
      "TypeScript-based public tooling work. Useful as evidence of practical application delivery rather than client-confidential analytics systems.",
    tags: ["TypeScript", "App tooling"],
  },
  {
    name: "markdown-rag-knowledgebase",
    url: "https://github.com/tayyub-ai/markdown-rag-knowledgebase",
    description:
      "Public RAG-oriented repository showing LLM and knowledge-base implementation work in a shareable form.",
    tags: ["RAG", "LLM", "Knowledge base"],
  },
  {
    name: "image-driven-dialogue",
    url: "https://github.com/tayyub-ai/image-driven-dialogue",
    description:
      "Public multimodal experimentation work that is safe to share and relevant to AI systems thinking.",
    tags: ["Multimodal", "AI", "Research"],
  },
  {
    name: "portfolio",
    url: "https://github.com/tayyub-ai/portfolio",
    description:
      "The public portfolio codebase itself, useful as evidence of front-end implementation, information architecture, and evidence-surface design decisions.",
    tags: ["Astro", "Frontend", "Portfolio"],
  },
];
