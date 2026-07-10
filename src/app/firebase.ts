// Firebase 配置：用于「网页上直接编辑，所有人可见」的内容存储。
//
// 注册并配置步骤（详见 README）：
//   1) 打开 https://console.firebase.google.com 新建一个项目
//   2) 建一个 Web 应用，复制它给你的 firebaseConfig 里的值填到下面
//   3) 左侧 Build → Firestore Database → 创建数据库（生产模式或测试模式都行）
//   4) 在 Firestore 的 Rules（规则）里允许读写（README 有示例规则）
//
// 下面的值填好前，网页编辑功能不可用（但网站照常显示默认内容）。
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// 编辑密码：知道这个密码的人才能进入编辑模式。改成你们约定的密码。
export const EDIT_PASSWORD = "faxiao2026";

// 存放内容的 Firestore 文档路径：集合 site / 文档 content
export const CONTENT_PATH = { collection: "site", doc: "content" };

export const firebaseEnabled = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

export function getDb() {
  if (!firebaseEnabled) return null;
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}
