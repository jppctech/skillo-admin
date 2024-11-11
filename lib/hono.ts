import { Apptype } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const client = hc<Apptype>(process.env.NEXT_PUBLIC_APP_URL!)