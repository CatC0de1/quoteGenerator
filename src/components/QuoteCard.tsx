"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clipboard, Check } from "lucide-react";

type Quote = {
  content: string;
  author: string;
};

type QuoteCardProps = {
  quote: Quote | null;
  onNewQuote: () => void;
  loading: boolean;
};


const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onNewQuote, loading }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!quote) return;
    const text = `"${quote.content}" — ${quote.author}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }} 
            className="bg-white rounded-xl shadow p-6 transition-all w-full"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-1/2 ml-auto" />
            </div>
      
          </motion.div>
        )}

        {quote && !loading && (
          <motion.div
            key="quote"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow p-6 w-full flex flex-col gap-4"
          >
            <motion.button
              onClick={copyToClipboard}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 hover:bg-gray-300 text-white px-2 py-2 rounded self-end"
            >
              { copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Clipboard className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
            <p className="text-xl italic text-gray-900">&quot;{quote.content}&quot;</p>
            <p className="text-right font-semibold text-gray-500 mb-4">— {quote.author}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {setCopied(false); onNewQuote();}}
        disabled={loading}
        whileHover={{ scale: 0.95 }}
        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Loading..." : "New Quote"}
      </motion.button>
    </div>
  );
};

export default QuoteCard;
