import { defineConfig } from "vitepress"

export default defineConfig({
  title: "package-name",
  description: "description",
  // Served from https://OWNER.github.io/REPO/
  base: "/REPO/",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: "Docs", link: "/getting-started" }],
    sidebar: [{ text: "Getting Started", link: "/getting-started" }],
    search: { provider: "local" },
    editLink: {
      pattern: "https://github.com/OWNER/REPO/edit/main/docs/:path",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/OWNER/REPO" }],
  },
})
