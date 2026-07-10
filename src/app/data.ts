// 集中管理页面内容，方便日后修改，无需改动组件。
// 主题：我们这一帮发小的回忆 · 轻松搞笑基调
// 【占位内容】下面都是示例，替换成你们这帮人的真实故事即可。

export const site = {
  title: "发小天团",
  subtitle: "十几个人从小闹到大的搞笑纪录片",
  intro:
    "一群从穿开裆裤就认识的家伙，一起逃课、一起挨骂、一起长大。如今各奔东西，但群里一喊「吃饭」，还是能凑齐一桌。这网站专门收藏我们这帮人干过的傻事。",
  // 下一次聚会的日期（改成你们约好的日子），首页会倒数到这天。
  // 格式：年-月-日 时:分，例如 "2026-10-01 18:00"
  reunionDate: "2026-10-01 18:00",
  reunionLabel: "距离下次聚会还有",
  reunionArrived: "聚会日到啦，冲鸭！🎉",
};

// Cloudinary 图片/视频上传配置。
// 注册 https://cloudinary.com 后，把下面两个值换成你自己的：
//   1) cloudName：Dashboard 首页显示的 Cloud name
//   2) uploadPreset：Settings → Upload → 新建一个 Unsigned（免签名）上传预设，填它的名字
// 另外在 Settings → Security 勾选 "Resource list"，否则照片墙拉不到列表。
// 两个值填好前，上传区会提示「尚未配置」，不影响其他功能。
export const cloudinary = {
  cloudName: "ke4thsna",
  uploadPreset: "ml_default", // 已验证为 Unsigned，可用
  tag: "reunion", // 所有上传都打这个标签，照片墙按它拉取
};

// 成员图鉴：十几个人，每人一张卡片
export type Member = {
  name: string;
  title: string; // 江湖称号 / 花名
  quote: string; // 一句吐槽或口头禅
  color: string; // 头像占位渐变色
  avatar?: string; // 填了就显示真图，放在 public/ 目录
};

// 目前只放名字，title（江湖称号）和 quote（口头禅）留空，你们之后自己填。
export const members: Member[] = [
  { name: "星星", title: "", quote: "", color: "from-amber-200 to-orange-300" },
  { name: "博", title: "", quote: "", color: "from-rose-200 to-amber-200" },
  { name: "尧", title: "", quote: "", color: "from-teal-200 to-emerald-300" },
  { name: "康", title: "", quote: "", color: "from-indigo-200 to-purple-300" },
  { name: "杨超", title: "", quote: "", color: "from-orange-200 to-red-300" },
  { name: "恒超", title: "", quote: "", color: "from-pink-200 to-rose-300" },
  { name: "佳浩", title: "", quote: "", color: "from-sky-200 to-cyan-300" },
  { name: "家俊", title: "", quote: "", color: "from-yellow-200 to-amber-300" },
  { name: "豆豆", title: "", quote: "", color: "from-lime-200 to-green-300" },
  { name: "毛毛", title: "", quote: "", color: "from-violet-200 to-fuchsia-300" },
];

// 趣味统计数字（一帮人的热闹日常）
export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "10", label: "一个都没跑的老伙计" },
  { value: "9999+", label: "群里发过的沙雕表情包" },
  { value: "∞", label: "凑齐一桌的路边摊（顿）" },
  { value: "0", label: "成功执行的减肥计划" },
];

// 黑历史时间轴（一帮人的糗事编年史）
export type TimelineItem = {
  year: string;
  title: string;
  desc: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "小学",
    title: "帮派成立",
    desc: "一群人为了争小卖部最后一根辣条打成一团，打完发现挺聊得来，从此结伙。",
  },
  {
    year: "初中",
    title: "集体作案",
    desc: "全体翻墙去网吧，被班主任一锅端，十几个人在办公室门口排排站，蔚为壮观。",
  },
  {
    year: "高中",
    title: "革命友谊",
    desc: "考试互相递小抄，结果一整排一起挂科，成为年级传说级的翻车现场。",
  },
  {
    year: "现在",
    title: "云养群友",
    desc: "各在一方，但群消息从没断过，谁发个饭照，底下秒回二十条「带我」。",
  },
];

// 名场面照片墙
export type Photo = {
  caption: string;
  color: string; // 渐变占位色
  src?: string; // 填了就显示真图，放在 public/ 目录
};

export const photos: Photo[] = [
  { caption: "小学：全员把脸埋进蛋糕的名场面", color: "from-amber-200 to-orange-300" },
  { caption: "初中：网吧门口被逮的集体合影", color: "from-rose-200 to-amber-200" },
  { caption: "高中：运动会输了还笑得很开心", color: "from-teal-200 to-emerald-300" },
  { caption: "毕业：十几个人哭成一团", color: "from-indigo-200 to-purple-300" },
  { caption: "去年聚会：还是一样的沙雕", color: "from-orange-200 to-red-300" },
  { caption: "上周：把整条街吃了个遍", color: "from-amber-300 to-yellow-200" },
];

// 「你有多懂这帮人」趣味小测验
export type Quiz = {
  question: string;
  options: string[];
  answer: number; // 正确选项下标
  reveal: string; // 答对/看答案后的吐槽
};

export const quizzes: Quiz[] = [
  {
    question: "聚会时永远最后一个到的是谁？",
    options: ["星星", "博", "康", "全都迟到"],
    answer: 0,
    reveal: "星星的「马上到」是本群最大的谎言。",
  },
  {
    question: "群里凑饭局最爱去哪？",
    options: ["米其林", "谁家谁请", "楼下最油的路边摊", "轮流做东"],
    answer: 2,
    reveal: "油到能照镜子的那家，十几个人的食堂。",
  },
  {
    question: "群里聊天最常刷屏的是啥？",
    options: ["认真讨论", "沙雕表情包", "工作", "养生知识"],
    answer: 1,
    reveal: "一个表情包能接龙五十层，正事一句没有。",
  },
];

// 结尾的心里话
export type Message = {
  name: string;
  text: string;
};

export const messages: Message[] = [
  { name: "致这帮人", text: "天天在群里互相嫌弃，但真有事的时候，一个电话全到齐。" },
  { name: "友情提示", text: "下次聚会谁再放鸽子，全群拉黑三天（第四天照样喊你）。" },
];
