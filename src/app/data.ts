// 集中管理页面内容，方便日后修改，无需改动组件代码。

export const site = {
  title: "那年那日",
  subtitle: "我们的聚会回忆",
  intro:
    "十年，说长不长，说短不短。当年那群少年，如今各奔东西，却仍记得同一个夏天。这里收藏我们重逢的每一刻。",
  reunionDate: "2026-08-15", // 下次聚会日期，用于倒数
  reunionLabel: "下次相聚",
};

export type TimelineItem = {
  year: string;
  title: string;
  desc: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2016",
    title: "毕业那天",
    desc: "在老槐树下拍了最后一张全班合影，谁也没想到这一别就是好几年。",
  },
  {
    year: "2019",
    title: "第一次小聚",
    desc: "只来了七个人，却聊到了凌晨三点，把宿舍里的糗事全翻了个底朝天。",
  },
  {
    year: "2022",
    title: "线上云聚会",
    desc: "隔着屏幕举杯，虽然不能拥抱，但那份熟悉一点没变。",
  },
  {
    year: "2026",
    title: "十年重逢",
    desc: "回到母校，回到那棵老槐树下，重新按下快门。",
  },
];

export type Photo = {
  caption: string;
  // 用渐变色块占位，替换为真实图片时把 src 填上即可
  color: string;
  src?: string;
};

export const photos: Photo[] = [
  { caption: "老槐树下的全班合影", color: "from-amber-200 to-orange-300" },
  { caption: "食堂三楼的深夜长谈", color: "from-rose-200 to-amber-200" },
  { caption: "运动会接力最后一棒", color: "from-teal-200 to-emerald-300" },
  { caption: "宿舍楼道里的吉他声", color: "from-indigo-200 to-purple-300" },
  { caption: "毕业旅行的海边日落", color: "from-orange-200 to-red-300" },
  { caption: "十年后重逢的拥抱", color: "from-amber-300 to-yellow-200" },
];

export type Message = {
  name: string;
  text: string;
};

export const messages: Message[] = [
  { name: "阿明", text: "无论走多远，想起你们就觉得踏实。" },
  { name: "小雨", text: "那些年一起熬过的夜，都成了最亮的星。" },
  { name: "老张", text: "下次聚会我请客，谁都不许缺席！" },
];
