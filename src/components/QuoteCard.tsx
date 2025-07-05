import React from "react";

type Quote = {
  content: string;
  author: string;
};

type QuoteCardProps = {
  quote: Quote;
  onNewQuote: () => void;
};

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onNewQuote }) => {
  const copyToClipboard = () => {
    const text = `"${quote.content}" — ${quote.author}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 transition-all">
      <p className="text-xl italic mb-4">{quote.content}</p>
      <p className="text-right font-semibold text-gray-600 mb-4">— {quote.author}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onNewQuote}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Quote
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
