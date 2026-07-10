"use client";

import { useState } from "react";
import { useContent } from "../content-context";
import { Editable } from "./Editable";
import { type Quiz as QuizType } from "../data";

export default function Quiz() {
  const { content, editing, update } = useContent();
  const quizzes = content.quizzes;
  const [picked, setPicked] = useState<(number | null)[]>(
    quizzes.map(() => null)
  );

  const choose = (qi: number, oi: number) => {
    if (editing) return;
    setPicked((prev) => {
      if (prev[qi] != null) return prev;
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  };

  const setQuiz = (i: number, patch: Partial<QuizType>) => {
    update({
      quizzes: quizzes.map((q, idx) => (idx === i ? { ...q, ...patch } : q)),
    });
  };
  const setOption = (qi: number, oi: number, v: string) => {
    const q = quizzes[qi];
    const options = q.options.map((o, idx) => (idx === oi ? v : o));
    setQuiz(qi, { options });
  };
  const addQuiz = () =>
    update({
      quizzes: [
        ...quizzes,
        { question: "新问题？", options: ["选项1", "选项2"], answer: 0, reveal: "揭晓吐槽" },
      ],
    });
  const removeQuiz = (i: number) =>
    update({ quizzes: quizzes.filter((_, idx) => idx !== i) });

  const answered = picked.filter((p) => p != null).length;
  const correct = picked.filter((p, i) => p === quizzes[i]?.answer).length;

  return (
    <section id="quiz" className="bg-paper/60 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          你有多懂这帮人
        </h2>
        <p className="text-center text-foreground/60 mb-12">
          答错的话，取消群成员资格
        </p>

        <div className="space-y-8">
          {quizzes.map((q, qi) => {
            const sel = picked[qi];
            const done = sel != null && !editing;
            return (
              <div
                key={qi}
                className="relative bg-white/70 rounded-2xl p-6 shadow-sm border border-accent-soft/30"
              >
                {editing && (
                  <button
                    onClick={() => removeQuiz(qi)}
                    className="absolute top-3 right-3 text-xs text-rose-500 hover:underline"
                  >
                    删除
                  </button>
                )}
                <div className="font-semibold mb-4">
                  {qi + 1}.{" "}
                  <Editable
                    value={q.question}
                    onChange={(v) => setQuiz(qi, { question: v })}
                  />
                </div>
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
                    if (editing && isAnswer)
                      cls = "border-emerald-400 bg-emerald-50";
                    return (
                      <div
                        key={oi}
                        className={`px-4 py-2.5 rounded-lg border transition-colors ${cls} ${
                          editing ? "" : "cursor-pointer"
                        }`}
                        onClick={() => choose(qi, oi)}
                      >
                        {editing ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={isAnswer}
                              onChange={() => setQuiz(qi, { answer: oi })}
                              title="设为正确答案"
                            />
                            <Editable
                              value={opt}
                              onChange={(v) => setOption(qi, oi, v)}
                            />
                          </div>
                        ) : (
                          opt
                        )}
                      </div>
                    );
                  })}
                </div>
                {editing && (
                  <div className="mt-3 text-sm text-foreground/60">
                    <span className="block mb-1">答对后的吐槽：</span>
                    <Editable
                      value={q.reveal}
                      onChange={(v) => setQuiz(qi, { reveal: v })}
                      multiline
                    />
                    <p className="text-xs mt-1 text-foreground/40">
                      （左边圆点选中哪项，哪项就是正确答案）
                    </p>
                  </div>
                )}
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

        {editing && (
          <div className="text-center mt-8">
            <button
              onClick={addQuiz}
              className="px-6 py-2 rounded-full border-2 border-dashed border-accent/40 text-accent/70 hover:border-accent hover:text-accent"
            >
              ＋ 加一道题
            </button>
          </div>
        )}

        {!editing && answered === quizzes.length && quizzes.length > 0 && (
          <div className="mt-10 text-center bg-accent/10 rounded-2xl py-6 px-4 border border-accent-soft/50">
            <p className="text-lg font-semibold text-accent">
              答对 {correct} / {quizzes.length} 题
            </p>
            <p className="text-foreground/70 mt-1">
              {correct === quizzes.length
                ? "满分！妥妥的元老级群成员。"
                : correct === 0
                ? "零分？你确定你在这个群里待过？"
                : "还行，勉强够格留在群里。"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
