"use client";

import { useState } from "react";
import { quizzes } from "../data";

export default function Quiz() {
  // 记录每道题选了哪个（未选为 null）
  const [picked, setPicked] = useState<(number | null)[]>(
    quizzes.map(() => null)
  );

  const choose = (qi: number, oi: number) => {
    setPicked((prev) => {
      if (prev[qi] !== null) return prev; // 已答过不再改
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  };

  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === quizzes[i].answer).length;

  return (
    <section id="quiz" className="bg-paper/60 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          你有多懂这段友情
        </h2>
        <p className="text-center text-foreground/60 mb-12">
          答错的话，友情警告
        </p>

        <div className="space-y-8">
          {quizzes.map((q, qi) => {
            const sel = picked[qi];
            const done = sel !== null;
            return (
              <div
                key={qi}
                className="bg-white/70 rounded-2xl p-6 shadow-sm border border-accent-soft/30"
              >
                <p className="font-semibold mb-4">
                  {qi + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oi) => {
                    const isAnswer = oi === q.answer;
                    const isPicked = oi === sel;
                    let cls =
                      "border-accent-soft/60 bg-white/60 hover:border-accent";
                    if (done) {
                      if (isAnswer)
                        cls = "border-emerald-400 bg-emerald-50 text-emerald-700";
                      else if (isPicked)
                        cls = "border-rose-300 bg-rose-50 text-rose-600";
                      else cls = "border-accent-soft/40 bg-white/40 opacity-60";
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => choose(qi, oi)}
                        disabled={done}
                        className={`text-left px-4 py-2.5 rounded-lg border transition-colors ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <p className="mt-4 text-sm text-foreground/70">
                    {sel === q.answer ? "✅ 答对了！" : "❌ 差点意思。"}{" "}
                    {q.reveal}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {answered === quizzes.length && (
          <div className="mt-10 text-center bg-accent/10 rounded-2xl py-6 px-4 border border-accent-soft/50">
            <p className="text-lg font-semibold text-accent">
              答对 {correct} / {quizzes.length} 题
            </p>
            <p className="text-foreground/70 mt-1">
              {correct === quizzes.length
                ? "满分！这友情稳如老狗。"
                : correct === 0
                ? "零分？你确定我俩是发小？"
                : "还行，勉强够格当我发小。"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
