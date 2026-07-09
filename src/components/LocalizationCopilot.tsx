"use client";

import { useState } from "react";

export default function LocalizationCopilot() {
  const [sourceText, setSourceText] = useState("");
  const [english, setEnglish] = useState("");
  const [portuguese, setPortuguese] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<"english" | "portuguese" | "">("");

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      setMessage("Please enter text before translating.");
      return;
    }

    setMessage("");
    setLoading(true);

    setTimeout(() => {
      setEnglish("E104 fault. Please check the input voltage.");
      setPortuguese("Falha E104. Verifique a tensão de entrada.");
      setExplanation(
        'This translation uses standard inverter maintenance terminology. "Input voltage" is commonly used in technical support and repair documentation.'
      );
      setLoading(false);
    }, 1000);
  };
  const handleCopy = async (text: string, type: "english" | "portuguese") => {
    if (!text) return;
  
    await navigator.clipboard.writeText(text);
    setCopied(type);
  
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };
  return (
    <main className="min-h-screen bg-[#070A18] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600">
              🌐
            </div>
            <span className="font-semibold">AI Localization Copilot</span>
          </div>
          <span className="text-sm text-slate-400">
            For PMs & Localization Teams
          </span>
        </header>

        <section className="mb-12 text-center">
          <p className="mb-4 inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
            ✨ AI-powered localization
          </p>
          <h1 className="text-5xl font-bold md:text-7xl">
            AI Localization{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Copilot
            </span>
          </h1>
          <p className="mt-5 text-xl text-slate-400">
            Translate smarter for global products.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="mb-4 font-medium text-slate-300">🇨🇳 Source Text</p>

            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste Chinese UI text or technical support text..."
              className="h-72 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-white outline-none placeholder:text-slate-600 focus:border-indigo-400"
            />

            <button
              onClick={handleTranslate}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? "Translating..." : "Translate"}
            </button>

            {message && (
              <p className="mt-4 rounded-xl bg-white/5 px-4 py-3 text-sm text-indigo-200">
                {message}
              </p>
            )}
          </div>

          <div className="space-y-6">
          <ResultCard
  title="English Translation"
  flag="🇺🇸"
  result={english}
  copied={copied === "english"}
  onCopy={() => handleCopy(english, "english")}
/>

<ResultCard
  title="Portuguese Translation"
  flag="🇧🇷"
  result={portuguese}
  copied={copied === "portuguese"}
  onCopy={() => handleCopy(portuguese, "portuguese")}
/>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="mb-4 font-semibold">✨ AI Explanation</p>
              <div className="min-h-28 rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-5 text-slate-300">
                {explanation || "AI explanation will appear here."}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ResultCard({
  title,
  flag,
  result,
  copied,
  onCopy,
}: {
  title: string;
  flag: string;
  result: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
      <div className="mb-4 flex items-center justify-between">
  <p className="font-semibold">
    {flag} {title}
  </p>

  <button
    onClick={onCopy}
    disabled={!result}
    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-indigo-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
  >
    {copied ? "✅ Copied" : "📋 Copy"}
  </button>
</div>
      <div className="min-h-28 rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-5 text-slate-300">
        {result || "Translation will appear here."}
      </div>
    </div>
  );
}