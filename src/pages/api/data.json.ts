import type { APIRoute } from "astro";
import data from "public/data.json";

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(data));
}