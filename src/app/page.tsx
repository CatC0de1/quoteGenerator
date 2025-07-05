"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";

type Quote = {
  content: string;
  author: string;
};

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/quotes");
      if (!res.ok) throw new Error("Failed to fetch quote");
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setQuote({ content: "Failed to load quote.", author: "System" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-xl w-full text-center">
        {loading || !quote ? (
          <p className="text-lg font-medium">Loading...</p>
        ) : (
          <QuoteCard quote={quote} onNewQuote={fetchQuote} />
        )}
      </div>
    </main>
  );
}
