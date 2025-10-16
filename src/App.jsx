import React, { useState, useEffect } from 'react';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setCopied(false);
    
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      
      setQuote({
        text: data.quote,
        author: data.author
      });
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyQuote = () => {
    const text = `"${quote.text}" - ${quote.author}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetQuote = () => {
    const text = `"${quote.text}" - ${quote.author}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-2xl w-full text-center bg-white/10 p-8 md:p-12 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-purple-400">
          Random Quote Generator
        </h1>
        
        <div className="min-h-[150px] flex items-center justify-center mb-8">
          {loading ? (
            <p className="text-lg text-gray-400 italic">Fetching wisdom...</p>
          ) : quote ? (
            <div>
              <p className="text-xl md:text-2xl italic mb-4 text-gray-100">
                "{quote.text}"
              </p>
              <p className="text-lg text-purple-300 font-semibold">
                — {quote.author}
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          <button
            onClick={fetchQuote}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'New Quote'}
          </button>

          {quote && (
            <div className="flex gap-3">
              <button
                onClick={copyQuote}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-3 rounded-lg text-white font-semibold transition-all"
              >
                {copied ? '✓ Copied!' : 'Copy Quote'}
              </button>

              <button
                onClick={tweetQuote}
                className="flex-1 bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-lg text-white font-semibold transition-all"
              >
                Tweet Quote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}