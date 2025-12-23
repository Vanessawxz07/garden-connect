# 单道具交易列表页 - 2025年11月更新

> 本文档记录单道具交易列表页的现网版本需求，作为后续新游戏拓展专项的基线参考。

---

## 一、页面概述

单道具交易列表页展示某个特定道具相关的所有交易订单，是用户查找特定道具交易的核心页面。包含道具详情、价值趋势、交易列表和相关推荐。

---

## 二、页面结构

### 2.1 道具信息头部

**左侧 - 道具基础信息：**
- 道具大图
- 道具名称 + 外链图标（H1）
- 道具描述（如 `Aspiration Method: Safari Egg`）

**右侧 - 统计信息表格：**

| 字段 | 示例 |
|------|------|
| Offer Orders | 200 |
| Request Orders | 500 |
| Rarity | Legendary（彩色标签） |
| Obtainment | Yes |
| Trade Value | 15k - 20k（绿色高亮） |
| Pet Ranking | T2 |
| Release Date | Nov 4th - 9th, 2025 by Harvest Event |

**操作按钮：**
- `POST A TRADE`（绿色主按钮）
- `CHECK ITS VALUE`（蓝色次按钮）

### 2.2 Trade Value Overview 区域

**标题区域：**
- 标题：`Trade Value Overview >`（可点击跳转）
- 说明文字：价值趋势描述（含动态数据如涨跌幅度、百分比）

**Tab切换：**
- Normal（默认）
- Huge

**时间范围切换：**
- 7 Days（默认）
- 30 Days
- 90 Days
- All

**图表区域：**
- 折线图展示价值趋势
- X轴：日期
- Y轴：Value值
- 悬浮显示具体数值

### 2.3 交易列表区域

**区域标题：**
- `Explore active trades for [道具名称] and make an offer`

**交易方向Tab：**
- `Offering (X)`：用户提供此道具的订单
- `Looking for (X)`：用户寻找此道具的订单

**筛选条件（横向排列）：**
- ☑ Fill + Basic
- ☐ User Online
- ☐ Open Offer
- ☐ Prefency provided

**结果统计：**
- `Found [X] orders sorted by [排序方式]`

**排序选项：**
- peacock（默认）
- 其他排序方式

### 2.4 交易卡片

**卡片布局：**
- 移动端：单列
- 桌面端：双列

**卡片结构（左右两栏）：**

| 区域 | 内容 |
|------|------|
| 用户信息 | 头像、用户名（如 `Pet collector`） |
| Have区域 | 道具图片列表（多个小图） |
| Value比较 | `WIN`/`LOSS`/`FAIR` + 百分比（如 `40%`） |
| 交易类型 | `Open to Offers` 标签（如适用） |
| Want区域 | `Looking for Value` / `Not Looking for` |
| 底部信息 | `Offering Value: [X]` / `Looking for Value: [X]` |
| 操作按钮 | `TRADE`（绿色按钮） |

**卡片交互：**
- 点击卡片或 `TRADE` 按钮跳转订单详情页
- Hover高亮效果

### 2.5 分页

**分页方式：**
- `VIEW MORE` 按钮（绿色，全宽）
- 加载更多订单

### 2.6 Related Articles 区域

**移动端布局：**
- 位于交易列表下方
- 垂直排列的文章卡片列表

**桌面端布局：**
- 位于右侧边栏
- 文章卡片包含：
  - 缩略图
  - 文章标题（如 `Roblox Review - An Infinite Metaverse for You to Explore`）

### 2.7 右侧边栏（桌面端特有）

**Related Articles：**
- 文章列表（带缩略图）

**Master Trading on YouTube：**
- 推广卡片
- YouTube图标
- `Learn More` 按钮

**Your Voice Matters：**
- 用户反馈入口
- 描述文字
- `Add feedback` 按钮

### 2.8 底部 Footer

- 与全站统一的Footer布局

---

## 三、功能说明

### 3.1 交易方向筛选

**Offering（提供）：**
- 筛选Have中包含当前道具的订单
- 用户视角：我想买这个道具

**Looking for（寻找）：**
- 筛选Want中包含当前道具的订单
- 用户视角：我想卖这个道具

### 3.2 筛选器功能

| 筛选项 | 说明 |
|--------|------|
| Fill + Basic | 默认勾选 |
| User Online | 仅显示在线用户的订单 |
| Open Offer | 仅显示接受开放报价的订单 |
| Prefency provided | 仅显示提供了偏好设置的订单 |

### 3.3 Trade Value Overview

**图表功能：**
- 展示道具历史价值趋势
- 支持Normal/Huge两种类型切换
- 支持不同时间范围查看
- 悬浮显示具体数值点

### 3.4 快速交易

**TRADE按钮：**
- 点击跳转至订单详情页
- 在详情页完成报价

---

## 四、SEO优化

### 4.1 TDK设置

**Title格式：**
- `[道具名称] Trades - Buy & Sell [道具名称] | TradeKitsune`

**Description格式：**
- `Find the best [道具名称] trades. [X] active listings. Trade [道具名称] with trusted players on TradeKitsune.`

**H1：**
- `[道具名称]`

### 4.2 URL结构

**路由设计：**
- `/item/[item-slug]`
- 或 `/trades/item/[item-slug]`

**URL参数：**
- `tab`: offering/looking
- `sort`: 排序方式
- `page`: 页码

### 4.3 结构化数据

**Product结构化数据：**
```json
{
  "@type": "Product",
  "name": "道具名称",
  "description": "道具描述",
  "offers": {
    "@type": "AggregateOffer",
    "offerCount": "活跃交易数",
    "lowPrice": "最低Value",
    "highPrice": "最高Value"
  }
}
```

---

## 五、响应式设计

### 5.1 移动端布局

- 道具信息头部：垂直堆叠
- 统计信息：表格形式
- 交易列表：单列卡片
- Related Articles：位于底部
- 无右侧边栏

### 5.2 桌面端布局

- 道具信息头部：左图右表
- 交易列表：双列卡片
- 右侧边栏：Related Articles + 推广卡片
- 三栏布局（左广告/主内容/右侧栏）

### 5.3 卡片响应式

- 移动端：简化展示，单列
- 桌面端：完整展示，双列
