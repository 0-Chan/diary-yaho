import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Diary Yaho",
    short_name: "Yaho",
    description: "하루의 마음을 편지로 남기는 개인 우편함",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8efe0",
    theme_color: "#dc5f4b",
    categories: ["lifestyle", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
