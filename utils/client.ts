import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: "zyjzzhza",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token:
    "sk3eJFbNaLrR9PQp1kiFpD0LR1TpZ57vju19itnzJWG4eprJm55G1tIxZIUcrhnlASFCIAKC61q7mfMi9Yk1VGUr2MrY3wqTAyxM3OGyZi8a4bGOj284eoGJDDgBMmlVgiXMkdC6c9Vo3cOgUygKAhAm6IhhJJ2OUAKAWNneDNXoecWaAanx",
});
// process.env.SANITY_PROJECT_ID,
// process.env.SANITY_TOKEN,
