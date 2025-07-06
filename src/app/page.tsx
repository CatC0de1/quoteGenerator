"use client";

// import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import QuoteCard from "../components/QuoteCard";

type Quote = {
  content: string;
  author: string;
};

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <QuoteCard quote={quote} onNewQuote={fetchQuote} loading={loading} />
        </motion.div>
      </div>
    </main>
  );
}
