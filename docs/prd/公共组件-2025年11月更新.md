# 公共组件 - 2025年11月更新

> 本文档记录交易链路中复用的公共组件需求，作为后续新游戏拓展专项的基线参考。

---

# 【迭代版本】2025年12月6日 - 增加支持Token交易

## 迭代概述

本次迭代在原有交易链路基础上，增加支持Token（游戏内货币）作为独立交易类型参与交易。Token可与道具混合交易，也可单独作为报价条件。

### Token基础设计

**字段定义：**
- Token图标：专属图标（发光效果）
- Token名称：Token
- Token价值：固定换算比例 `Token : Value = 1 : 50,000`
- Token数量：仅支持整数（最小值1，最大值9,999,999）

**样式规范：**
- Token在6宫格和12宫格中，格子使用专属样式（发光边框 + 整体带底色）
- 道具优化排序后，Token永远占第一格位置
- Token数量展示：格子空间有限，仅在信息卡片和弹窗中添加千分位分隔符
- 超长数量自适应显示（超出用省略号如 `1599...` 或 `159...`），不再使用 `9999+` 逻辑

---

## 一、道具选择弹窗组件 - Token迭代

### 1.1 Token Tab新增

**Tab结构调整：**
```
┌─────────┬─────────┬─────────┬─────────┐
│◎ Token🔥│ My Pets │  Pets   │  Crops  │
└─────────┴─────────┴─────────┴─────────┘
```

**Token Tab特性：**
- 位置：Tab最左侧，带火苗角标（🔥）标识突出显示
- 角标展示条件：宽度足够时展示，不够则隐藏
- 点击进入Token Tab后，直接展示Token数量输入界面，无需再打开道具参数弹窗
- 12/4更新：Tab增加Token图标，详见视觉稿

**Token输入界面：**
```
┌─────────────────────────────────────────────────────────────┐
│  Select Items                                           [X] │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🔍 Search                                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────┬─────────┬─────────┬─────────┐                  │
│  │◎ Token🔥│ My Pets │  Pets   │  Crops  │                  │
│  └─────────┴─────────┴─────────┴─────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    10,055                           │    │
│  └─────────────────────────────────────────────────────┘    │
│  大尺寸数字输入框，支持千位分隔符显示                           │
│  仅支持整数（1 - 9,999,999）                                  │
│                                                             │
│  Trade Value: 502.75M (10,055 Tokens x 50K)                 │
│                                                             │
│  Token is the in-game currency used in Grow a Garden.       │
│  View Details >                                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    CONFIRM                          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**实时Value换算：**
- 用户未输入时（默认0）：不展示该行
- 输入Token后：立即显示等价Value
- 文案格式：`Trade Value: {value数值(KMB标记)} ({token数量，千分位分隔} Tokens x 50K)`
- 示例：`Trade Value: 50M (1,000 Tokens x 50K)`
- Token单复数：1个为单数"Token"，多个为复数"Tokens"

**确认按钮：**
- 点击确认添加Token到交易格子中

**Token交易简介：**
- 文本介绍Token交易方式和注意点
- 附文字链（在新页面打开文章详情页：Grow a Garden Trade Token Wiki）

---

## 二、Token信息卡片组件 - 新增

### 2.1 Token信息卡片

**结构：**
```
┌─────────────────────────────────┐
│  [Token图片]  Token             │
│                                 │
│  Token Quantity  5              │
│  Trade Value     250K           │
└─────────────────────────────────┘
```

**字段：**
- Token图片（道具图片）
- Token名称："Token"
- Token Quantity（数量，千分位分隔符）
- Trade Value（根据数量 x 50,000计算）

**使用场景：**
- 交易链路中的信息展示
- 复用通用信息卡片基础样式

---

## 三、Token交易信息弹窗 - 新增

### 3.1 弹窗结构

**布局：**
```
┌─────────────────────────────────────────────────────────────┐
│                                                         [X] │
│                                                             │
│  [Token图片]     Token 🔗                                   │
│                  (点击跳转Token文章详情页)                    │
│                                                             │
│  Token Quantity  5                                          │
│  Trade Value     250K                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**特殊交互：**
- 名称旁的文字链点击打开Token的文章详情页面（Grow a Garden Trade Token Wiki），而非Wiki详情页
- 复用交易信息弹窗基础样式

---

## 四、订单卡片组件 - Token迭代

### 4.1 指定订单卡片

**Token展示：**
- 左右侧6宫格中增加Token道具展示（Token图标 + 外显数量）
- Token可与其他道具混排
- Token添加后自动排列在第一个格子
- 其他信息（Value比例、WFL文案）不变

### 4.2 Open Offer卡片

**展示调整方案：**

| NLF设置 | Value条件 | 展示效果 |
|--------|----------|---------|
| N | N | 不变，右侧为空，显示"Looking For: Open" |
| Y | N | 右侧显示NLF条件 |
| N | Y | 右侧显示Value条件 + 问号图标 |
| Y | Y | 合并为一种样式，同时展示NLF和Value条件 |

**Value条件展示：**
- 中间Value比例条均展示（按实际左右侧Value，右侧可以为0）
- 问号图标tooltip提示文案：`Open offer must meet the minimum value/tokens requirement: {value值(KMB标记)} ≈ {数量} tokens`
- 文案示例：`Lowest value/token required: 112k / 🪙 10`

**NLF条件展示：**
- 如有设置，显示道具种类数量（如：`NLF: 5 Items`）
- 点击后打开NLF道具弹窗

**12/4补充：**
- 只要有Value条件的情况下都展示中间比例条
- 文案与Value条件时一样

---

## 五、Trade Summary组件 - Token迭代

### 5.1 拼接逻辑更新

**Token项拼接格式：**
- `Token x[token数量] · Value [Trade Value]`
- 示例：`Token x10 · Value 500K`

**道具项拼接格式（不变）：**
- `[Item Name] x[Item Quantity] + [Mutation 如有] + [Age] + [Weight] + [Trade Value]`
- 示例：`Giraffe x1 · Golden · Age 2 · 1.24kg · Value 150.12K`

**展示示例：**
```
Trade Summary
- Token x10 · Value 500K
- Giraffe x1 · Golden · 1yr · 1.24kg · Value 150.12K
- Peacock x2 · 6yr · 3.5kg · Value 14.2M

Total value: 815,000
```

**排序规则：**
- Token添加后自动展示在第一个格子
- 其余道具按Value值排序（已有优化排序逻辑）

### 5.2 Value Details弹窗更新

**Token公式披露：**
```
[Token] Trade Value 150,000 = 3 Trade Tokens x 50,000
```
- Token公式放在道具公式前
- Score 改为 "Trade Value"
- [Token]点击跳转文章详情页（Grow a Garden Trade Token Wiki）

**公式下方解释内容：**
- 标题：How are tokens converted into trade value?
- 公式：`Tokens × 50,000 = Trade Value`
- 说明：The Tokens are multiplied by 50,000 to be converted into the Trade Value. The conversion formula is determined by the expert panel based on an analysis of the trading market conditions.

### 5.3 Value/Token Requirement展示

**文案格式：**
- `Lowest value/tokens I'll accept: {value值(KMB标记)} ≈ {数量} tokens`
- `Max value/tokens: {value值(KMB标记)} ≈ {数量} tokens`

**Value条件问号弹窗文案更新：**
```
Want to make sure you get decent offers?

Use the slider to pick the lowest value/trade tokens you'll accept. 
Any offer from others must be worth more than this, then their trade could be posted successfully!

* Trade Value ÷ 50,000 = Trade Tokens
```

---

## 六、Value/Token计算弹窗 - 新增

### 6.1 组件用途

- 订单详情页：点击"How is value/token calculated?"文字链触发

### 6.2 弹窗内容

**标题：** How is value/token calculated?

**内容：**
- Value consists of two parts: Base Value and Market Adjustment. Base Value is determined by the pet's traits, plus bonuses from age, weight, and mutations. Market Adjustment applies real-time data from Tradekitsune and external markets to calculate the final value.
- The value/token conversion formula: Trade Value ÷ 50,000 = Trade Tokens.

---

## 七、其他组件场景复用

### 7.1 个人中心页
- 复用6宫格新样式、逻辑
- Token格子展示与订单卡片一致

### 7.2 聊天页
- 现网样式基础上增加Token格子样式、逻辑
- 订单卡片中Token展示遵循统一规范

### 7.3 订单详情页 - Offer List模块
- 与常规指定订单时的右侧效果一致
- Token展示在6宫格第一格

---

## 八、FAQ组件 - Token相关更新

### 8.1 新增FAQ内容

**Q: What are Grow a Garden Trading Tokens and how do they work?**
A: Trading Tokens are the currency used in the Farmers Market/Trade World for purchasing pets, crops, and other player-listed items.

**Q: How do Token-based trade offers work on TradeKitsune?**
A: Some offers include Tokens as part of the trade value, either alone or combined with pets and crops.

**Q: How are tokens converted into trade value?**
A: Tokens × 50,000 = Trade Value. The conversion formula is determined by the expert panel based on an analysis of the trading market conditions.

---

## 九、Token Offer筛选项（P2，暂不开发）

**筛选项说明：**
- 新增Token offer筛选开关
- 默认关闭
- 开启后筛选包含Token的交易订单

---

## 十、测试关注 - 数据准确性验证

### 10.1 背景

Trade Value是道具交易的关键指标，帮助用户评估交易的合理性（WFL: Win/Fair/Lose）。增加Token后，需要在各环节检查：
- Token添加到交易中的Value数值
- Token + 道具的Total Value是否正确

### 10.2 重点关注页面

- Value Calculator页面：/growagarden/calculator
- Create Trade页面：/growagarden/trade/create
- Chat页面：聊天框里的Item展示
- Profile页面：Item及价值计算结果

---

# 【基线版本】2025年11月 - 原有组件需求

---

## 一、组件概述

公共组件是在交易链路各页面中复用的UI组件，确保用户体验一致性和开发效率。

**核心组件清单：**
- 订单卡片组件（Trade Card）
- 道具信息卡片组件（Item Info Card）
- 道具交易信息弹窗（Item Trade Info Modal）
- 道具复合筛选弹窗（Pet Filters Modal）
- 道具选择弹窗组件（Item Selector Modal）
- 道具参数选择弹窗组件（Item Parameters Modal）
- Trade Summary组件
- 用户信息组件
- 筛选器组件
- 弹窗组件
- 空状态组件
- 加载状态组件
- Toast通知组件

---

## 二、订单卡片组件（Trade Card）

### 2.1 组件用途

- 订单列表页：展示订单概要信息
- 单道具交易列表页：展示相关交易订单
- 首页/推荐区域：展示热门订单

### 2.2 卡片变体

#### 2.2.1 指定订单卡片（Card/Trade）

**结构布局：**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [头像] KING JITES          [道具1][道具2][道具3][道具4]              │
│        12 minutes ago       ⚡9999                                   │
│        🏆 Influencer > Veteran          5 More                       │
│                                                                      │
│                             WIN                                      │
│              Trade provider (left side) get extra value. (+25%)      │
│                                                                      │
│        Offering Value: 815k ████████████                             │
│        Looking for Value: 112k ████                      [TRADE]    │
│                                                                      │
│                             [道具5][道具6]                           │
└─────────────────────────────────────────────────────────────────────┘
```

**左侧用户信息区：**
- 用户头像（带在线状态指示）
- 用户名（加粗）
- 发布时间（如：12 minutes ago）
- 用户标签（如：🏆 Influencer > Veteran）

**中间道具展示区（Have）：**
- 道具缩略图网格（最多显示4个）
- 道具数量角标（如：9999，红色圆角背景）
- 超出显示"5 More"链接

**中间价值对比区：**
- WIN/LOSS/FAIR 状态标签
  - WIN：绿色背景
  - LOSS：红色背景
  - FAIR：黄色/中性色背景
- 价值差异描述文字（如：Trade provider (left side) get extra value. (+25%)）
- 双进度条对比：
  - Offering Value: [数值] + 进度条（蓝色）
  - Looking for Value: [数值] + 进度条（绿色）

**右侧道具展示区（Want）：**
- 道具缩略图网格
- 道具数量角标

**操作按钮：**
- TRADE 按钮（绿色主色，圆角）

#### 2.2.2 Open Offer卡片（Card/Open offer）

**结构布局：**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [头像] KING JITES          [道具1][道具2][道具3][道具4]              │
│        12 minutes ago       ⚡9999                                   │
│        🏆 Influencer > Veteran          5 More                       │
│                                                                      │
│                      [用户图标]                                       │
│                      Open to Offers                                  │
│                                                                      │
│        Offering Value: 815k ████████████                             │
│                                          Looking for: Open           │
│                                                          [TRADE]    │
└─────────────────────────────────────────────────────────────────────┘
```

**与指定订单差异：**
- 中间区域显示"Open to Offers"标识（带用户图标）
- 不显示WIN/LOSS/FAIR状态
- Looking for显示为"Open"（绿色文字）
- 右侧无Want道具展示区，仅显示空槽位占位

### 2.3 交互逻辑

**点击行为：**
- 点击卡片任意区域：跳转订单详情页
- 点击TRADE按钮：跳转订单详情页

**悬浮效果：**
- 卡片整体轻微上浮阴影效果
- TRADE按钮颜色加深

### 2.4 组件API

```typescript
interface TradeCardProps {
  order: {
    id: string;
    user: UserInfo;
    haveItems: ItemWithQuantity[];
    wantItems?: ItemWithQuantity[];
    isOpenOffer: boolean;
    offeringValue: number;
    lookingForValue?: number;
    createdAt: Date;
  };
  onClick?: () => void;
}

interface UserInfo {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  badges: string[]; // 如：['Influencer', 'Veteran']
}

interface ItemWithQuantity {
  item: Item;
  quantity: number;
}
```

---

## 三、道具信息卡片组件（Item Info Card）

### 3.1 组件用途

- 道具列表页：展示道具详细信息
- 道具选择器：悬浮显示道具信息
- 订单详情页：展示道具属性

### 3.2 卡片变体

#### 3.2.1 宠物信息卡片（Pet Info Card）

**结构（深色主题）：**
```
┌─────────────────────────────────┐
│  [宠物图片]  Token              │
│             Acquisition Method  │
│             Safari Egg          │
│                                 │
│  Trade Value     150k - 200K    │
│  Pet Ranking     T2             │
│  Release Date    Nov 4th - 5th, │
│                  2025           │
│                  by Harvest     │
│                  Event          │
│  Offer Orders    200            │
│  Request Orders  500            │
│  Sheckle Value   15K            │
└─────────────────────────────────┘
```

**信息字段：**
- 宠物图片（左上角）
- 宠物名称（Token，白色加粗）
- 获取方式（Acquisition Method: Safari Egg）
- Trade Value（价值范围，绿色）
- Pet Ranking（T1/T2/T3等级）
- Release Date（发布日期+事件名称）
- Offer Orders（出售订单数）
- Request Orders（求购订单数）
- Sheckle Value（游戏货币价值）

#### 3.2.2 宠物交易信息卡片（Pet Trade Info Card）

**结构：**
```
┌─────────────────────────────────┐
│  [宠物图片]  Token              │
│             Acquisition Method  │
│             Safari Egg          │
│                                 │
│  Mutation        Rainbow        │
│  Current Age     1 year         │
│  Current Weight  1.2kg          │
│  Hatch Weight    1.5kg [Normal] │
│  Trade Value     +10% 15k       │
│  Offer Orders    200            │
│  Request Orders  500            │
└─────────────────────────────────┘
```

**额外信息字段：**
- Mutation（变异类型：Rainbow/Silver/Gold等，彩色显示）
- Current Age（当前年龄，绿色）
- Current Weight（当前重量，绿色）
- Hatch Weight（孵化重量 + [Normal/Huge/Titanic/Godly]标签）
- Trade Value（带涨跌幅显示，如：+10% 15k）

#### 3.2.3 Token信息卡片

**结构：**
```
┌─────────────────────────────────┐
│  [Token图片]  Token             │
│                                 │
│  Token Quantity  5              │
│  Trade Value     99k            │
└─────────────────────────────────┘
```

**信息字段：**
- Token图片
- Token名称
- Token Quantity（数量，蓝色）
- Trade Value（价值，绿色）

#### 3.2.4 作物信息卡片（Crop Info Card）

**结构：**
```
┌─────────────────────────────────┐
│  [作物图片]  Brussels Sprout    │
│                                 │
│  Weight          1kg            │
│  Sheckle Value   15K            │
│  Rarity          Common         │
│  Mutation        Silver, Gold,  │
│                  Rainbow        │
└─────────────────────────────────┘
```

**信息字段：**
- 作物图片
- 作物名称
- Weight（重量）
- Sheckle Value（游戏货币价值）
- Rarity（稀有度：Common/Rare/Legendary等，对应颜色显示）
- Mutation（变异类型列表，彩色显示）

### 3.3 卡片状态

**默认状态：**
- 深色背景（#1a1a2e 或 design token）
- 圆角边框
- 信息左对齐

**悬浮状态：**
- 边框高亮
- 轻微放大效果

### 3.4 组件API

```typescript
interface ItemInfoCardProps {
  item: Item;
  variant: 'pet' | 'pet-trade' | 'token' | 'crop';
  tradeParams?: {
    mutation?: string;
    currentAge?: string;
    currentWeight?: string;
    hatchWeight?: string;
    weightClassification?: 'Normal' | 'Huge' | 'Titanic' | 'Godly';
  };
}
```

---

## 四、道具交易信息弹窗（Item Trade Info Modal）

### 4.1 组件用途

- 订单详情页：点击道具查看详细信息
- 道具列表页：快速预览道具交易信息

### 4.2 弹窗结构

**布局：**
```
┌─────────────────────────────────────────────────────────────┐
│                                                         [X] │
│                                                             │
│  [大图]        Brussels Sprout 🔗                           │
│                Acquisition Method xxx                       │
│                                                             │
│  ┌─────────────────────┬─────────────────────┐              │
│  │ Mutation    Rainbow │ Current Age  1 year │              │
│  ├─────────────────────┼─────────────────────┤              │
│  │ Hatch weight 1.2kg  │ Current Weight      │              │
│  │            [Normal] │              1.2kg  │              │
│  ├─────────────────────┼─────────────────────┤              │
│  │ Trade Value +10%    │ Rarity              │              │
│  │             15k >   │         Legendary   │              │
│  ├─────────────────────┼─────────────────────┤              │
│  │ Offer Orders  200 > │ Request Orders      │              │
│  │                     │             500 >   │              │
│  ├─────────────────────┼─────────────────────┤              │
│  │ Sheckle Value  15k  │ Pet Ranking   T2 >  │              │
│  ├─────────────────────┴─────────────────────┤              │
│  │ Release Date                              │              │
│  │        Nov 4th - 5th, 2025 by Harvest     │              │
│  │        Event >                            │              │
│  └───────────────────────────────────────────┘              │
│                                                             │
│           ┌─────────────────────────┐                       │
│           │   VIEW MORE TRADES      │                       │
│           └─────────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

**头部区域：**
- 大尺寸道具图片（左侧）
- 道具名称 + 外链图标（可跳转Wiki详情页）
- 获取方式描述

**信息网格区域（2列布局）：**
- 左列：Mutation, Hatch weight, Trade Value, Offer Orders, Sheckle Value
- 右列：Current Age, Current Weight, Rarity, Request Orders, Pet Ranking
- 底部跨列：Release Date

**可点击字段：**
- Trade Value（带 > 箭头，点击跳转Value详情）
- Offer Orders（带 > 箭头，点击跳转Offering订单列表）
- Request Orders（带 > 箭头，点击跳转Looking for订单列表）
- Pet Ranking（带 > 箭头，点击跳转排行榜）
- Release Date（带 > 箭头，点击跳转事件详情）

**底部操作：**
- VIEW MORE TRADES 按钮（绿色主色，圆角，全宽）

**关闭按钮：**
- 右上角红色 X 按钮

### 4.3 交互逻辑

**打开方式：**
- 点击订单详情页中的道具
- 点击道具列表页中的"查看详情"

**关闭方式：**
- 点击右上角关闭按钮
- 点击弹窗外部遮罩
- ESC键

### 4.4 组件API

```typescript
interface ItemTradeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
  tradeParams?: ItemTradeParams;
  onViewMoreTrades?: () => void;
}

interface ItemTradeParams {
  mutation?: string;
  currentAge?: string;
  currentWeight?: string;
  hatchWeight?: string;
  weightClassification?: 'Normal' | 'Huge' | 'Titanic' | 'Godly';
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic';
}
```

---

## 五、道具复合筛选弹窗（Pet Filters Modal）

### 5.1 组件用途

- 订单列表页：高级筛选功能
- 单道具交易列表页：筛选特定属性的交易

### 5.2 弹窗结构

**布局：**
```
┌─────────────────────────────────────────────────────────────┐
│                                                         [X] │
│  Pet Filters                                                │
│  Pick options if you want to filter for specific pets       │
│  or leave blank to browse all.                              │
│                                                             │
│  ┌─────────────────────────┬─────────────────────────┐      │
│  │     Offering Pet        │     Looking For Pet     │      │
│  ├─────────────────────────┼─────────────────────────┤      │
│  │ Rarity                  │ Rarity                  │      │
│  │ ☑ Common  ☐ Uncommon    │ ☐ Common  ☐ Uncommon    │      │
│  │ ☐ Rare    ☐ Legendary   │ ☐ Rare    ☐ Legendary   │      │
│  │ ☐ Mythical ☐ Divine     │ ☐ Mythical ☐ Divine     │      │
│  │ ☐ Prismatic             │ ☐ Prismatic             │      │
│  │                         │                         │      │
│  │ Weight Classifications  │ Weight Classifications  │      │
│  │ ☑ Normal   ☐ Huge       │ ☐ Normal   ☐ Huge       │      │
│  │ ☐ Titanic  ☐ Godly      │ ☐ Titanic  ☐ Godly      │      │
│  │                         │                         │      │
│  │ Age                     │ Age                     │      │
│  │ ○────────●──────○  50   │ ○────────────────○      │      │
│  │                         │                         │      │
│  │ Mutation                │ Mutation                │      │
│  │ [All Mutation    ▼]     │ [All Mutation    ▼]     │      │
│  └─────────────────────────┴─────────────────────────┘      │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │    CLEAR FILTERS    │  │       CONFIRM       │          │
│  └─────────────────────┘  └─────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**头部区域：**
- 标题：Pet Filters
- 说明文字：Pick options if you want to filter for specific pets or leave blank to browse all.
- 关闭按钮（右上角红色 X）

**双列筛选区域：**

**左列 - Offering Pet（绿色标题）：**
- Rarity（稀有度多选）
  - Common / Uncommon / Rare / Legendary / Mythical / Divine / Prismatic
  - Checkbox样式，绿色选中态
- Weight Classifications（重量分类多选）
  - Normal / Huge / Titanic / Godly
  - Checkbox样式
- Age（年龄范围滑块）
  - 双端滑块
  - 显示当前选择值
  - 绿色滑块主题
- Mutation（变异类型下拉）
  - 默认"All Mutation"
  - 下拉选择

**右列 - Looking For Pet（蓝色标题）：**
- 结构与左列相同
- 独立筛选条件

**底部操作按钮：**
- CLEAR FILTERS（灰色/次要按钮）- 清空所有筛选
- CONFIRM（蓝色主按钮）- 应用筛选

### 5.3 交互逻辑

**筛选联动：**
- 左右两列独立筛选
- 支持多选组合
- 实时预览匹配数量（可选）

**清空逻辑：**
- CLEAR FILTERS重置所有条件到默认状态
- 默认状态：无任何勾选，滑块归零，下拉选"All"

### 5.4 组件API

```typescript
interface PetFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: PetFiltersState;
  onConfirm: (filters: PetFiltersState) => void;
}

interface PetFiltersState {
  offering: PetFilterOptions;
  lookingFor: PetFilterOptions;
}

interface PetFilterOptions {
  rarity: string[];
  weightClassifications: string[];
  ageRange: [number, number];
  mutation: string | null;
}
```

---

## 六、道具选择弹窗组件（Item Selector Modal）

### 6.1 组件用途

- 创建交易页：选择Have/Want/NLF道具
- 订单详情页（Open Offer）：选择报价道具

### 6.2 弹窗结构

**主体布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  Select Items                                           [X] │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🔍 Search                                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────┬─────────┬─────────┬─────────┐                  │
│  │◎ Token🔴│ My Pets │  Pets   │  Crops  │                  │
│  └─────────┴─────────┴─────────┴─────────┘                  │
│                                                             │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ All Rarity      ▼  │  │ 🎁 Newest Added ▼  │            │
│  └────────────────────┘  └────────────────────┘            │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │[Common]│ │[Common]│ │[Common]│ │[Common]│ │[Common]│    │
│  │ [图片] │ │ [图片] │ │ [图片]🔴│ │ [图片] │ │ [图片] │    │
│  │Giraffe │ │Giraffe │ │Giraffe │ │Giraffe │ │Giraffe │    │
│  │TV:120k │ │TV:120k │ │TV:120k │ │TV:120k │ │TV:120k │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │[Common]│ │[Common]│ │[Common]│ │[Common]│ │[Common]│    │
│  │ [图片] │ │ [图片] │ │ [图片] │ │ [图片] │ │ [图片] │    │
│  │Giraffe │ │Giraffe │ │Giraffe │ │Giraffe │ │Giraffe │    │
│  │TV:120k │ │TV:120k │ │TV:120k │ │TV:120k │ │TV:120k │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
│                        ... 更多 ...                         │
└─────────────────────────────────────────────────────────────┘
```

**头部区域：**
- 标题：Select Items
- 关闭按钮（右上角红色 X）

**搜索框：**
- 搜索图标 + 输入框
- 实时模糊搜索
- 清空按钮

**分类Tab：**
- Token（带红点表示有数量）
- My Pets（绿色选中态，填充背景）
- Pets
- Crops
- （可扩展更多分类）

**筛选下拉：**
- All Rarity（稀有度筛选）
- 排序方式（🎁 Newest Added / Value High to Low / Value Low to High等）

**道具网格：**
- 6列布局（桌面端），响应式调整
- 每个道具卡片：
  - 稀有度标签（左上角，如：[Common]）
  - 道具图片
  - 选中/数量红点（右上角）
  - 道具名称
  - Trade Value（TV: 120k）

### 6.3 卡片样式

**默认态：**
- 浅色背景
- 圆角边框

**选中态：**
- 边框高亮（绿色/主题色）
- 右上角显示选中数量红点

**悬浮态：**
- 背景色加深
- 轻微放大

### 6.4 组件API

```typescript
interface ItemSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'single' | 'multiple';
  selectedItems: SelectedItem[];
  onSelect: (items: SelectedItem[]) => void;
  excludeItems?: string[];
  maxItems?: number;
  categories?: string[];
  showMyItems?: boolean; // 是否显示"My Pets"等个人道具Tab
}

interface SelectedItem {
  itemId: string;
  quantity: number;
}
```

---

## 七、道具参数选择弹窗组件（Item Parameters Modal）

### 7.1 组件用途

- 创建交易页：设置道具的详细参数（变异、重量、年龄等）
- 订单详情页（Open Offer）：设置报价道具参数

### 7.2 弹窗结构

**布局：**
```
┌─────────────────────────────────────────────────────────────┐
│  Set parameters                                         [X] │
│                                                             │
│  ┌───────────────────────────────────────────────┐          │
│  │  [图片🔴]  Rainbow Unicorn                    │          │
│  │           Base Sheckle Price: 1,000,000 🪙    │          │
│  └───────────────────────────────────────────────┘          │
│                                                             │
│  Weight                                                     │
│  ┌───────────────────────────────────────────────┐          │
│  │ Text                                          │          │
│  └───────────────────────────────────────────────┘          │
│  The greater the weight, the higher the value               │
│                                                             │
│  Price                                                      │
│  ┌───────────────────────────────────────────────┐          │
│  │ Text                                          │          │
│  └───────────────────────────────────────────────┘          │
│  The recycling price affects the market value of the props  │
│                                                             │
│  Growth Mutations                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ Name x1.5│ │ Name x1.5│ │◎Name x1.5│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│                                                             │
│  Temperature Mutations                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │◎Name x1.5│ │ Name x1.5│ │ Name x1.5│ │ Name x1.5│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
│  Temperature Mutations (Multiple choices)                   │
│  ┌────────────────┬────────────────┬────────────────┐       │
│  │ ↓ Temperature  │ ✦ Environment  │ ◇ Special      │       │
│  └────────────────┴────────────────┴────────────────┘       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │◎Name x1.5│ │ Name x1.5│ │ Name x1.5│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│  ┌──────────┐ ┌──────────┐                                  │
│  │ Name x1.5│ │ Name x1.5│                                  │
│  └──────────┘ └──────────┘                                  │
│                                                             │
│  Quantity to add (1-xx)                                     │
│  ┌────┬────────────────────────────────────┬────┐          │
│  │ -  │              1                     │ +  │          │
│  └────┴────────────────────────────────────┴────┘          │
│                                                             │
│  Item trade value: 560,000                                  │
│  The item's trade value is calculated based on the          │
│  parameters you enter. Check [Name]'s latest value          │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │       CANCEL        │  │       CONFIRM       │          │
│  └─────────────────────┘  └─────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**头部区域：**
- 标题：Set parameters
- 关闭按钮（右上角红色 X）

**道具信息卡片：**
- 道具图片（带数量红点角标）
- 道具名称（如：Rainbow Unicorn）
- 基础价格（Base Sheckle Price: 1,000,000 🪙）

**参数输入区域：**

**Weight（重量）：**
- 文本输入框
- 帮助文字：The greater the weight, the higher the value

**Price（价格）：**
- 文本输入框
- 帮助文字：The recycling price affects the market value of the props

**Growth Mutations（成长变异）：**
- 标签选择器（单选）
- 格式：[Name] x[倍率]
- 选中态：绿色填充 + ◎图标

**Temperature Mutations（温度变异）：**
- 标签选择器（单选或多选）
- 格式：[Name] x[倍率]

**Temperature Mutations (Multiple choices)（多选变异）：**
- 顶部分类Tab：Temperature / Environment / Special
- 下方标签网格（多选）

**Quantity to add（添加数量）：**
- 数量输入器
- 减号按钮 | 数字输入框 | 加号按钮
- 范围：1 - xx（根据道具类型限制）

**价值计算区域：**
- Item trade value: [计算值]（绿色高亮）
- 说明文字 + 链接到最新价值页

**底部操作按钮：**
- CANCEL（灰色/次要按钮）
- CONFIRM（绿色主按钮）

### 7.3 交互逻辑

**参数联动：**
- 修改任意参数实时重新计算Trade Value
- 数量影响总价值

**验证规则：**
- Weight/Price必须为有效数字
- 数量范围验证

### 7.4 组件API

```typescript
interface ItemParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
  initialParams?: ItemParameters;
  onConfirm: (params: ItemParameters) => void;
}

interface ItemParameters {
  weight?: number;
  price?: number;
  growthMutation?: string;
  temperatureMutation?: string;
  specialMutations?: string[];
  quantity: number;
}
```

---

## 八、Trade Summary组件

### 8.1 组件用途

- 创建交易页：发布前预览
- 订单详情页：订单信息汇总
- 报价确认：报价前预览

### 8.2 组件结构

**Have区域：**
- 道具列表（迷你卡片）
- 道具总数
- 总Value

**Want区域：**
- 道具列表或"Accept Any Offer"
- 道具总数
- 总Value

**Value对比：**
- Have总Value
- Want总Value
- 差额（正负标识）
- 差额百分比
- WIN/LOSS/FAIR状态

**NLF区域（可选）：**
- NLF道具列表
- 折叠/展开

### 8.3 组件API

```typescript
interface TradeSummaryProps {
  haveItems: SelectedItem[];
  wantItems: SelectedItem[];
  nlfItems?: SelectedItem[];
  acceptAnyOffer?: boolean;
  showValueComparison?: boolean;
}
```

---

## 九、用户信息组件

### 9.1 组件用途

- 订单卡片：显示发布者
- 订单详情：显示交易对象
- 聊天页：显示聊天对象

### 9.2 组件变体

**头像组件（Avatar）：**
- 用户头像图片
- 在线状态指示点
- 大小变体（sm/md/lg）

**用户名片（UserCard）：**
- 头像
- 用户名
- VIP标识
- 用户标签（Influencer / Veteran等）
- 在线状态
- 注册时间
- 交易统计（可选）

**用户行组件（UserRow）：**
- 头像 + 用户名 + 在线状态
- 紧凑布局
- 用于列表项
- 发布时间显示

### 9.3 用户标签系统

**标签类型：**
- Influencer（影响力用户）- 🏆 图标
- Veteran（资深用户）
- VIP
- Verified（已验证）

**标签展示：**
- 多标签用 > 连接
- 如：🏆 Influencer > Veteran

### 9.4 在线状态

**状态类型：**
- 在线（绿点）
- 离开（黄点）
- 离线（灰点）

**状态判断：**
- 基于最后活跃时间
- 5分钟内：在线
- 30分钟内：离开
- 超过30分钟：离线

### 9.5 组件API

```typescript
interface UserAvatarProps {
  user: User;
  size: 'sm' | 'md' | 'lg';
  showOnlineStatus?: boolean;
}

interface UserCardProps {
  user: User;
  showStats?: boolean;
  showVipBadge?: boolean;
  showBadges?: boolean;
  onClick?: () => void;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastActiveAt: Date;
  badges: UserBadge[];
}

type UserBadge = 'influencer' | 'veteran' | 'vip' | 'verified';
```

---

## 十、筛选器组件

### 10.1 组件用途

- 订单列表页筛选
- 单道具交易列表页筛选
- 道具列表页筛选

### 10.2 筛选器类型

**分类筛选器：**
- Tab样式
- 单选
- 支持"全部"选项

**范围筛选器：**
- 双输入框（最小-最大）
- 用于Value范围筛选

**开关筛选器：**
- Switch样式
- 用于布尔筛选（如"仅在线"、"Open Offer"）

**下拉筛选器：**
- Select样式
- 用于排序选项

**标签筛选器：**
- 多选标签组
- 如：Fill + Basic / User Online / Open Offer / Prefency provided

### 10.3 筛选器布局

**桌面端布局：**
- 横向排列
- 展开显示所有筛选项
- 右侧显示排序下拉

**移动端布局：**
- 收起为按钮
- 点击打开筛选抽屉
- 底部固定"应用"按钮

### 10.4 组件API

```typescript
interface FilterBarProps {
  filters: FilterConfig[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset?: () => void;
}

interface FilterConfig {
  key: string;
  type: 'category' | 'range' | 'switch' | 'select' | 'tags';
  label: string;
  options?: Option[];
}
```

---

## 十一、弹窗组件

### 11.1 确认弹窗

**用途：**
- 删除确认
- 取消订单确认
- 重要操作确认

**结构：**
- 标题
- 内容描述
- 取消按钮
- 确认按钮（警告色）

### 11.2 报价弹窗

**用途：**
- 快速报价
- 不跳转页面

**结构：**
- 订单摘要
- 道具选择器
- 备注输入
- 提交按钮

### 11.3 分享弹窗

**用途：**
- 订单分享
- 道具分享

**结构：**
- 分享预览
- 复制链接按钮
- 社交媒体分享按钮

### 11.4 弹窗通用规范

**头部：**
- 标题居中或左对齐
- 右上角关闭按钮（红色X背景或简单X）

**交互：**
- ESC关闭
- 点击遮罩关闭（可配置）
- 动画过渡

**响应式：**
- 桌面端：居中弹窗
- 移动端：底部抽屉或全屏弹窗

**关闭按钮样式：**
- 红色方形背景 + 白色X图标
- 尺寸约24x24px
- 圆角

---

## 十二、空状态组件

### 12.1 组件用途

- 列表为空时显示
- 搜索无结果时显示
- 数据加载失败时显示

### 12.2 空状态类型

**无数据：**
- 插图
- 主文案
- 副文案
- 操作按钮（可选）

**无搜索结果：**
- 搜索相关插图
- 提示调整搜索条件
- 清除筛选按钮

**加载失败：**
- 错误插图
- 错误描述
- 重试按钮

### 12.3 组件API

```typescript
interface EmptyStateProps {
  type: 'no-data' | 'no-results' | 'error';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

## 十三、加载状态组件

### 13.1 骨架屏

**用途：**
- 首屏加载占位
- 分页加载占位

**变体：**
- 列表骨架屏
- 卡片骨架屏
- 详情骨架屏

### 13.2 加载指示器

**用途：**
- 操作进行中
- 数据刷新中

**样式：**
- Spinner旋转
- 进度条（有进度时）

### 13.3 加载更多

**用途：**
- 列表底部加载

**样式：**
- "VIEW MORE"按钮（绿色，全宽，圆角）
- 加载中Spinner
- "No more data"提示

---

## 十四、Toast通知组件

### 14.1 通知类型

**成功通知：**
- 绿色主题
- 成功图标
- 自动消失（3秒）

**错误通知：**
- 红色主题
- 错误图标
- 手动关闭或5秒消失

**警告通知：**
- 黄色主题
- 警告图标
- 自动消失（4秒）

**信息通知：**
- 蓝色主题
- 信息图标
- 自动消失（3秒）

### 14.2 通知位置

- 桌面端：右上角
- 移动端：顶部居中

### 14.3 通知队列

- 最多同时显示3个
- 新通知从上方入场
- 旧通知从下方出场

---

## 十五、样式规范

### 15.1 颜色使用

- 使用设计系统的语义化颜色变量
- 不直接使用色值
- 支持深色模式

**主题色参考：**
- 主色（Primary）：绿色系 - 用于主要按钮、选中态
- 次色（Secondary）：蓝色系 - 用于次要按钮、链接
- 警告色：红色系 - 用于删除、关闭按钮
- 中性色：灰色系 - 用于边框、次要文字

**状态色：**
- WIN：绿色
- LOSS：红色
- FAIR：黄色/中性色

**稀有度色：**
- Common：灰色
- Uncommon：绿色
- Rare：蓝色
- Legendary：紫色/金色
- Mythical：粉色
- Divine：红色
- Prismatic：彩虹渐变

### 15.2 间距规范

- 使用Tailwind间距类
- 组件内部间距统一
- 响应式间距调整

### 15.3 动画规范

- 使用统一的动画时长
- 过渡效果一致
- 考虑减弱动画偏好

**常用动画：**
- 弹窗出现：从底部/中心放大淡入
- 悬浮效果：轻微上浮 + 阴影加深
- 选中态：边框高亮过渡

### 15.4 响应式规范

- 移动优先设计
- 断点：sm(640) md(768) lg(1024) xl(1280)
- 组件自适应不同尺寸

**网格布局响应：**
- 道具选择器：移动端3列，桌面端6列
- 订单卡片：移动端单列，桌面端双列

### 15.5 圆角规范

- 卡片圆角：8px - 12px
- 按钮圆角：6px - 8px（或全圆角pill样式）
- 输入框圆角：4px - 6px
- 标签圆角：4px（或全圆角）

---

# 版本变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| V1.1 | 2025-12-06 | 增加支持Token交易：新增Token Tab、Token信息卡片、Token交易信息弹窗、订单卡片Token展示、Trade Summary Token拼接逻辑、Value/Token计算弹窗等 | - |
| V1.0 | 2025-11-XX | 初始版本：交易链路公共组件基线需求 | - |
