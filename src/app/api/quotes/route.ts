import { NextResponse } from "next/server";
import quotes from "@/data/quotes.json";

export function GET() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  return NextResponse.json(quote);
}
