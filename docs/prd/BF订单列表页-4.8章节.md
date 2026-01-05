# 4.8 订单列表页 Order List Page（BF 适配版）

> **定位**：Blox Fruits 订单列表页，复用 GAG 订单列表页模板，进行游戏特定内容配置。  
> **基线参考**：`订单列表页-2025年11月更新.md`

---

## 4.8.1 页面模板化设计建议

### 通用不变模块
| 模块 | 说明 |
|------|------|
| 页面布局结构 | Hero Banner + 搜索区 + 筛选区 + 订单列表 + 分页 + FAQ + 底部工具入口 |
| 搜索框交互 | 搜索逻辑、placeholder 格式一致 |
| 筛选区结构 | Category、Trade Direction、Status、Value Range 筛选器结构不变 |
| 订单卡片布局 | 卡片结构、交互逻辑一致（但道具槽数量可配置） |
| 分页组件 | 样式与交互一致 |
| 响应式断点 | Desktop / Tablet / Mobile 断点一致 |

### 需配置/灵活设置模块
| 模块 | 配置项 | GAG 值 | BF 值 |
|------|--------|--------|-------|
| Hero Banner | 标题文案 | `All Tradeable Items in Grow a Garden` | `All Tradeable Fruits & Items in Blox Fruits` |
| Hero Banner | 副标题文案 | `Browse the latest trades from the GAG community` | `Browse the latest trades from the Blox Fruits community` |
| 统计数据 | 数据源 | GAG 交易数据 | BF 交易数据 |
| 统计数据 | 显示文案 | `Ongoing Trades` / `Completed Trades` | `Ongoing Trades` / `Completed Trades` |
| 搜索框 | Placeholder | `Search items...` | `Search fruits or items...` |
| 筛选器 | Category 选项 | GAG 道具分类 | BF 道具分类（Fruits、Swords、Accessories 等） |
| 订单卡片 | 道具槽数量 | 6 slots | 4 slots |
| 订单卡片 | 稀有度样式 | GAG 稀有度色系 | BF 稀有度色系（Common→Mythical） |
| 工具入口 | 第一个工具 | `Seed Value List` → Value 列表页 | `Blox Fruits Wiki` → Wiki 列表页 |
| 工具入口 | 第二个工具 | `Trade Calculator` → 计算器页 | `Trade Value Calculator` → 计算器页 |
| FAQ | 内容 | GAG 相关 FAQ | BF 相关 FAQ（待运营提供） |
| Trading Guide | 跳转链接 | GAG 指南页 | BF 指南页（链接待补充） |
| SEO | TDK | GAG 相关 | BF 相关 |

---

## 4.8.2 BF 订单列表页详细需求

### 4.8.2.1 Hero Banner 区域

**布局**：与 GAG 一致，左侧文案 + 右侧统计数据

**英文文案**：
```
标题：All Tradeable Fruits & Items in Blox Fruits
副标题：Browse the latest trades from the Blox Fruits community
```

**统计数据**：
```
[数字] Ongoing Trades    [数字] Completed Trades
```
- 数据源：BF 游戏的实时交易统计
- 样式：与 GAG 一致

**Trading Guide 入口**：
```
文案：View Trading Guide →
跳转：/bloxfruits/trading-guide（链接待补充确认）
```

---

### 4.8.2.2 搜索与筛选区域

**搜索框**：
```
Placeholder：Search fruits or items...
```

**筛选按钮**：
```
按钮文案：Item Filters
```

**Category 筛选器**（BF 专属分类）：
```
- All Categories
- Fruits（水果）
- Swords（剑）
- Accessories（配件）
- Fighting Styles（战斗风格）
- Boats（船）
- Gamepasses
```
> 具体分类以 BF 道具数据为准

**其他筛选器**：与 GAG 一致
- Trade Direction：`Looking For` / `Offering`
- Status：`All` / `Active` / `Completed`
- Value Range：滑块筛选

---

### 4.8.2.3 订单卡片组件

**差异点**：
| 项目 | GAG | BF |
|------|-----|-----|
| 道具槽数量 | 6 slots | 4 slots |
| 稀有度配色 | GAG 体系 | BF 体系（见下表） |
| 道具图标 | 种子/植物图标 | 水果/武器图标 |

**BF 稀有度颜色方案**：
```css
Common:     bg-gray-100     text-gray-600     border-gray-300
Uncommon:   bg-green-100    text-green-600    border-green-400
Rare:       bg-blue-100     text-blue-600     border-blue-400
Legendary:  bg-yellow-100   text-yellow-600   border-yellow-400
Mythical:   bg-purple-100   text-purple-600   border-purple-400
```

**卡片其他元素**：与 GAG 一致
- 用户头像 + 用户名
- 发布时间
- 交易状态标签
- Value 对比显示
- Quick Quote 按钮

---

### 4.8.2.4 底部工具入口卡片

**布局**：两个工具入口卡片，横向排列

**工具卡片 1**：
```
图标：📖 或 Wiki 图标
标题：Blox Fruits Wiki
描述：Explore all fruits, items and their values
按钮：View Wiki →
跳转：/bloxfruits/wiki
```

**工具卡片 2**：
```
图标：🧮 或计算器图标
标题：Trade Value Calculator
描述：Calculate the value of your trades
按钮：Open Calculator →
跳转：/bloxfruits/calculator
```

---

### 4.8.2.5 FAQ 模块

**状态**：内容待运营提供

**预留结构**：
```
Q: How do I trade in Blox Fruits?
A: [待补充]

Q: What determines fruit value?
A: [待补充]

Q: How do I know if a trade is fair?
A: [待补充]

Q: What are the different fruit rarities?
A: [待补充]
```

---

### 4.8.2.6 SEO 配置

**Title**：
```
Blox Fruits Trades - Buy, Sell & Trade Fruits | [站点名]
```

**Description**：
```
Browse and discover the latest Blox Fruits trades. Find fruits, swords, and accessories from the community. Trade safely with verified players.
```

**H1**：
```
All Tradeable Fruits & Items in Blox Fruits
```

**URL 结构**：
```
/bloxfruits/trades
/bloxfruits/trades?category=fruits
/bloxfruits/trades?status=active
```

**Structured Data**：
- WebPage schema
- BreadcrumbList：Home > Blox Fruits > Trades

---

## 4.8.3 页面模板实现建议（供研发参考）

### 配置化方案

```typescript
interface OrderListPageConfig {
  gameKey: 'gag' | 'bloxfruits';
  
  // Hero Banner
  heroTitle: string;
  heroSubtitle: string;
  tradingGuideUrl: string;
  
  // Search
  searchPlaceholder: string;
  
  // Filters
  categoryOptions: CategoryOption[];
  
  // Order Card
  itemSlotCount: 4 | 6;
  rarityColorScheme: RarityColorMap;
  
  // Tool Entries
  toolCards: ToolCardConfig[];
  
  // FAQ
  faqItems: FAQItem[];
  
  // SEO
  seoConfig: SEOConfig;
}

// GAG 配置示例
const gagConfig: OrderListPageConfig = {
  gameKey: 'gag',
  heroTitle: 'All Tradeable Items in Grow a Garden',
  heroSubtitle: 'Browse the latest trades from the GAG community',
  tradingGuideUrl: '/growagarden/trading-guide',
  searchPlaceholder: 'Search items...',
  itemSlotCount: 6,
  // ...
};

// BF 配置示例
const bfConfig: OrderListPageConfig = {
  gameKey: 'bloxfruits',
  heroTitle: 'All Tradeable Fruits & Items in Blox Fruits',
  heroSubtitle: 'Browse the latest trades from the Blox Fruits community',
  tradingGuideUrl: '/bloxfruits/trading-guide',
  searchPlaceholder: 'Search fruits or items...',
  itemSlotCount: 4,
  // ...
};
```

### 组件复用策略

```
OrderListPage (页面容器)
├── HeroBanner (通用组件，接收 config)
├── SearchFilterBar (通用组件，接收 config)
├── OrderCardList (通用组件)
│   └── OrderCard (通用组件，itemSlotCount 可配置)
│       └── ItemSlot (通用组件，rarityStyle 可配置)
├── Pagination (完全通用)
├── FAQSection (通用组件，接收 FAQ 内容)
└── ToolEntryCards (通用组件，接收 toolCards 配置)
```

---

## 4.8.4 待确认/待补充事项

| 事项 | 状态 | 负责方 |
|------|------|--------|
| Trading Guide 跳转链接 | 待补充 | 产品/运营 |
| FAQ 具体内容 | 待运营提供 | 运营 |
| BF 道具分类完整列表 | 待确认 | 产品 |
| BF 稀有度配色终版 | 待设计确认 | 设计 |

---

## 4.8.5 版本记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2025-01-05 | 初版，基于 GAG 订单列表页模板适配 BF |
