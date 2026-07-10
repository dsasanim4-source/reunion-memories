// 集中管理页面内容，方便日后修改，无需改动组件。
// 主题：我和发小的回忆 · 轻松搞笑基调
// 【占位内容】下面都是示例，替换成你和发小的真实故事即可。

export const site = {
  title: "发小传",
  subtitle: "一部俩人从穿开裆裤到现在的搞笑纪录片",
  intro:
    "从一起偷摘邻居家枣、到一起被老师罚站，再到现在一起吐槽生活。二十几年了，你还是那个一喊就来的家伙。这网站专门记录我俩干过的那些傻事。",
  // 你俩认识的那天（大概就行），首页会算「我们已经认识了 N 天」
  metDate: "2003-09-01",
  metLabel: "我们已经互相嫌弃了",
};

// 趣味统计数字
export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "9999+", label: "一起挨过的骂（次）" },
  { value: "128", label: "一起逃过的课（节）" },
  { value: "∞", label: "路边摊拼过的账单（顿）" },
  { value: "37", label: "吵架后又和好（回）" },
];

// 黑历史时间轴
export type TimelineItem = {
  year: string;
  title: string;
  desc: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "小学",
    title: "初次结怨",
    desc: "为了一块橡皮打了一架，第二天又用同一块橡皮换了半包辣条，从此绑定。",
  },
  {
    year: "初中",
    title: "共犯时代",
    desc: "一起翻墙去网吧，一起被家长在网吧门口逮住，一起罚跪搓衣板。",
  },
  {
    year: "高中",
    title: "革命友谊",
    desc: "考试互相打掩护，结果双双挂科，被老师并排叫去办公室，场面一度十分和谐。",
  },
  {
    year: "现在",
    title: "相爱相杀",
    desc: "隔三差五约饭，见面第一句还是「你怎么又胖了」，然后一起点最油的那家。",
  },
];

// 名场面照片墙
export type Photo = {
  caption: string;
  color: string; // 渐变占位色
  src?: string; // 填了就显示真图，放在 public/ 目录
};

export const photos: Photo[] = [
  { caption: "六岁：一起把脸埋进蛋糕的名场面", color: "from-amber-200 to-orange-300" },
  { caption: "十二岁：翻墙时被拍下的罪证", color: "from-rose-200 to-amber-200" },
  { caption: "十七岁：晚自习偷吃泡面被抓包", color: "from-teal-200 to-emerald-300" },
  { caption: "毕业那年：哭得比谁都丑的合影", color: "from-indigo-200 to-purple-300" },
  { caption: "去年：还是一样中二的两个人", color: "from-orange-200 to-red-300" },
  { caption: "上周：吃到扶墙出的路边摊", color: "from-amber-300 to-yellow-200" },
];

// 「你有多懂这段友情」趣味小测验
export type Quiz = {
  question: string;
  options: string[];
  answer: number; // 正确选项下标
  reveal: string; // 答对/看答案后的吐槽
};

export const quizzes: Quiz[] = [
  {
    question: "我俩第一次打架是为了啥？",
    options: ["一块橡皮", "一个女生", "一局游戏", "谁也不记得了"],
    answer: 0,
    reveal: "没错，就是那块后来还换了辣条的橡皮。",
  },
  {
    question: "我俩约饭最爱去哪？",
    options: ["米其林", "食堂", "楼下那家最油的路边摊", "我家"],
    answer: 2,
    reveal: "油到能照镜子的那家，永远的神。",
  },
  {
    question: "吵架后一般谁先服软？",
    options: ["我", "他", "都不服，靠时间", "假装啥都没发生"],
    answer: 3,
    reveal: "经典操作：第二天照常喊吃饭，绝口不提昨天。",
  },
];

// 结尾的心里话
export type Message = {
  name: string;
  text: string;
};

export const messages: Message[] = [
  { name: "致我的发小", text: "虽然天天嫌弃你，但真有事的时候，我第一个想到的还是你。" },
  { name: "友情提示", text: "下次你再迟到，我还是会一边骂一边等。" },
];
