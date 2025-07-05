import { NextResponse } from "next/server";

// Dummy list quotes
const quotes = [
  { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { content: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
];

export function GET() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  return NextResponse.json(quote);
}
