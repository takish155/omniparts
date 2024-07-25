import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Omniparts",
    short_name: "Omniparts",
    description:
      "Omniparts - Omniparts is the best place to buy PC parts, from the fastest CPU to the most powerful GPU. We have everything you need to build your dream PC.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
