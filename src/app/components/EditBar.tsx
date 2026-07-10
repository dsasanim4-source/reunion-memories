"use client";

import { useState } from "react";
import { useContent } from "../content-context";

export default function EditBar() {
  const {
    editing,
    canEdit,
    firebaseEnabled,
    saving,
    dirty,
    login,
    logout,
    save,
    reset,
  } = useContent();
  const [showLogin, setShowLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [savedTip, setSavedTip] = useState(false);

  // Firebase 没配置时，不显示编辑入口（避免误导）
  if (!firebaseEnabled) return null;

  const doLogin = () => {
    if (login(pw)) {
      setShowLogin(false);
      setPw("");
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const doSave = async () => {
    await save();
    setSavedTip(true);
    setTimeout(() => setSavedTip(false), 2500);
  };

  // 未登录：右上角一个「编辑」按钮
  if (!canEdit) {
    return (
      <>
        <button
          onClick={() => setShowLogin(true)}
          className="fixed top-3 right-3 z-[60] px-4 py-2 rounded-full bg-accent/90 text-white text-sm shadow-lg hover:bg-accent"
        >
          编辑
        </button>
        {showLogin && (
          <div
            className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center px-6"
            onClick={() => setShowLogin(false)}
          >
            <div
              className="bg-paper rounded-2xl p-6 w-full max-w-sm shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold text-lg mb-3">输入编辑密码</h3>
              <input
                type="password"
                value={pw}
                autoFocus
                onChange={(e) => {
                  setPw(e.target.value);
                  setErr(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && doLogin()}
                placeholder="密码"
                className="w-full px-4 py-2 rounded-lg border border-accent-soft/60 bg-white/80 focus:outline-none focus:border-accent mb-3"
              />
              {err && (
                <p className="text-sm text-rose-500 mb-3">密码不对，再试试</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={doLogin}
                  className="flex-1 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
                >
                  进入编辑
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="px-4 py-2 rounded-lg border border-accent-soft/60 text-foreground/70"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // 已登录：顶部编辑工具条
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-sm font-medium">
          {editing ? "编辑模式" : "预览"}
          {dirty && " · 有未保存的改动"}
          {savedTip && " · ✅ 已保存"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={doSave}
            disabled={saving || !dirty}
            className="px-4 py-1.5 rounded-full bg-white text-accent text-sm font-medium disabled:opacity-50"
          >
            {saving ? "保存中…" : "保存"}
          </button>
          <button
            onClick={reset}
            disabled={!dirty}
            className="px-3 py-1.5 rounded-full bg-white/20 text-white text-sm disabled:opacity-40"
          >
            撤销改动
          </button>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-full bg-white/20 text-white text-sm"
          >
            退出编辑
          </button>
        </div>
      </div>
    </div>
  );
}
