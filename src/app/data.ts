// 集中管理页面内容，方便日后修改，无需改动组件。
// 主题：我们这一帮发小的回忆 · 轻松搞笑基调
// 【占位内容】下面都是示例，替换成你们这帮人的真实故事即可。

export const site = {
  title: "发小天团",
  subtitle: "十几个人从小闹到大的搞笑纪录片",
  intro:
    "一群从穿开裆裤就认识的家伙，一起逃课、一起挨骂、一起长大。如今各奔东西，但群里一喊「吃饭」，还是能凑齐一桌。这网站专门收藏我们这帮人干过的傻事。",
  // 这帮人「组队」的大概时间，首页会算「我们这帮人已经互相嫌弃了 N 天」
  metDate: "2003-09-01",
  metLabel: "这帮人已经互相嫌弃了",
};

// 成员图鉴：十几个人，每人一张卡片
export type Member = {
  name: string;
  title: string; // 江湖称号 / 花名
  quote: string; // 一句吐槽或口头禅
  color: string; // 头像占位渐变色
  avatar?: string; // 填了就显示真图，放在 public/ 目录
};

export const members: Member[] = [
  { name: "老大", title: "永远迟到担当", quote: "马上到马上到（还没出门）", color: "from-amber-200 to-orange-300" },
  { name: "阿强", title: "饭局发起人", quote: "今晚谁不来谁狗", color: "from-rose-200 to-amber-200" },
  { name: "小胖", title: "行走的零食库", quote: "我减肥，从明天开始", color: "from-teal-200 to-emerald-300" },
  { name: "眼镜", title: "作业救星", quote: "抄可以，别抄一模一样", color: "from-indigo-200 to-purple-300" },
  { name: "阿飞", title: "球场C位", quote: "这球绝对进（没进）", color: "from-orange-200 to-red-300" },
  { name: "静静", title: "群里唯一清醒的", quote: "你们又在群里发什么疯", color: "from-pink-200 to-rose-300" },
  { name: "老K", title: "游戏坑王", quote: "别怪我，是网卡了", color: "from-sky-200 to-cyan-300" },
  { name: "二妹", title: "笑点最低", quote: "哈哈哈哈哈（还没听完）", color: "from-yellow-200 to-amber-300" },
  { name: "大熊", title: "力气担当", quote: "重活交给我，动脑的免谈", color: "from-lime-200 to-green-300" },
  { name: "阿May", title: "拍照摄影师", quote: "再来一张，这张我闭眼了", color: "from-violet-200 to-fuchsia-300" },
  { name: "小林", title: "冷笑话制造机", quote: "我讲个笑话…（全场沉默）", color: "from-emerald-200 to-teal-300" },
  { name: "阿珍", title: "群主兼客服", quote: "聚会时间已发群公告，请查收", color: "from-red-200 to-orange-300" },
];

// 趣味统计数字（一帮人的热闹日常）
export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "12", label: "一个都没跑的老伙计" },
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
    options: ["老大", "阿强", "眼镜", "全都迟到"],
    answer: 0,
    reveal: "老大的「马上到」是本群最大的谎言。",
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
