"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  defaultContent,
  type SiteContent,
} from "./data";
import {
  getDb,
  firebaseEnabled,
  EDIT_PASSWORD,
  CONTENT_PATH,
} from "./firebase";

type Ctx = {
  content: SiteContent;
  editing: boolean;
  canEdit: boolean; // 已通过密码
  firebaseEnabled: boolean;
  saving: boolean;
  dirty: boolean;
  loaded: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
  setEditing: (v: boolean) => void;
  update: (patch: Partial<SiteContent>) => void;
  save: () => Promise<void>;
  reset: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [serverContent, setServerContent] = useState<SiteContent>(defaultContent);
  const [editing, setEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 首次加载：从 Firestore 拉最新内容，覆盖默认值
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const db = getDb();
      if (!db) {
        setLoaded(true);
        return;
      }
      try {
        const ref = doc(db, CONTENT_PATH.collection, CONTENT_PATH.doc);
        const snap = await getDoc(ref);
        if (!cancelled && snap.exists()) {
          const data = snap.data() as Partial<SiteContent>;
          // 与默认结构合并，避免旧文档缺字段
          const merged = { ...defaultContent, ...data };
          setContent(merged);
          setServerContent(merged);
        }
      } catch {
        // 读取失败就用默认内容
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((pw: string) => {
    if (pw === EDIT_PASSWORD) {
      setCanEdit(true);
      setEditing(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setCanEdit(false);
    setEditing(false);
    setContent(serverContent);
    setDirty(false);
  }, [serverContent]);

  const update = useCallback((patch: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    const db = getDb();
    if (!db) return;
    setSaving(true);
    try {
      const ref = doc(db, CONTENT_PATH.collection, CONTENT_PATH.doc);
      await setDoc(ref, content);
      setServerContent(content);
      setDirty(false);
    } finally {
      setSaving(false);
    }
  }, [content]);

  const reset = useCallback(() => {
    setContent(serverContent);
    setDirty(false);
  }, [serverContent]);

  return (
    <ContentContext.Provider
      value={{
        content,
        editing,
        canEdit,
        firebaseEnabled,
        saving,
        dirty,
        loaded,
        login,
        logout,
        setEditing,
        update,
        save,
        reset,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
