// This route is a stub in the static SPA build.
// The sitemap is served as a static file from public/sitemap.xml.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
