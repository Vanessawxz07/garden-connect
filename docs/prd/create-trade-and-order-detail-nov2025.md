# 创建交易页与订单详情页 - 2025年11月更新

> 本文档记录创建交易页和订单详情页的现网版本需求，作为后续新游戏拓展专项的基线参考。

---

# 【迭代版本】2025年12月6日 - 增加支持Token交易

## 一、创建交易页 - Token迭代

### 1.1 Token选择

**12宫格道具选择：**
- 用户点击"+"号，在道具选择弹窗中可选择道具或Token
- Token Tab带火苗角标，位于最左侧
- Token输入后，格子中展示Token图标 + 数量

**Token展示规则：**
- 格子空间有限，仅在信息卡片和弹窗中添加千分位分隔符
- 超长数量自适应显示（如 `1599...` 或 `159...`），不使用 `9999+` 逻辑
- Token添加后自动排列在第一个格子

### 1.2 Trade Summary更新

**Token项拼接格式：**
- `Token x[token数量] · Value [Trade Value]`
- 示例：`Token x10 · Value 500K`

**展示示例：**
```
Trade Summary                    Value Details (+25%)
- Token x10 · Value 500K
- Giraffe x1 · Golden · 1yr · 1.24kg · Value 150.12K

Total value: 815,000
```

### 1.3 Value Details弹窗

**Token公式披露：**
```
[Token] Trade Value 150,000 = 3 Trade Tokens x 50,000
```
- Token公式放在道具公式最前面
- [Token]点击跳转Token文章详情页

**公式下方解释：**
```
How are tokens converted into trade value?
Tokens × 50,000 = Trade Value
The Tokens are multiplied by 50,000 to be converted into the Trade Value.
```

### 1.4 Token交易限制

**指定订单限制：**
- 不支持左右侧都只有Token（即左侧只提供Token，右侧Looking for也只有Token）
- 提交时校验，不符合则显示红色Toast：`Both sides can't be tokens only. Add some items to make your trade valid.`

**Open Offer：**
- 左侧允许只选Token（出钱求购道具，由道具卖家make offer）

**每侧Token限制：**
- 每侧12宫格中只能选择一次Token
- 第二次选择Token时，输入框展示上次已填写的数量
- 修改确认后，新数量展示在第一个格子

### 1.5 Value/Token Requirement更新

**滑块区域文案：**
- `Lowest Value/Tokens I'll accept: {value值(KMB标记)} ≈ {数量} tokens`
- `Max value/Tokens: {value值(KMB标记)} ≈ {数量} tokens`

**问号弹窗文案：**
```
Want to make sure you get decent offers?

Use the slider to pick the lowest value/trade tokens you'll accept. 
Any offer from others must be worth more than this, then their trade could be posted successfully!

* Trade Value ÷ 50,000 = Trade Tokens
```

### 1.6 How to Post a Trade教程更新

| 步骤 | 标题 | 说明 |
|------|------|------|
| STEP 1 | Pick Your Trade Type | Choose "Specific Trade" if you know what you want, or "Open to Offers" to get offers and set your limits. |
| STEP 2 | Select Your Items or Tokens | Add the items or tokens you want to trade, and adjust traits for best value. |
| STEP 3 | Set Offer Rules | For open offers, select pets you don't want (NLF), and set your lowest accepted tokens or value. |
| STEP 4 | Check the Deal | See if your trade is Win, Fair, or Loss. Edit until you're happy, then post! |

---

## 二、订单详情页 - Token迭代

### 2.1 指定订单（主客态）

**面板展示：**
- 与创建交易页一致
- 有Token则展示在格子中（Token图标 + 数量）
- 仍使用按Trade Value由高到低的优化排序（Token在第一格）

**Trade Summary：**
- 复用创建交易页中的逻辑、文案
- Token公式披露与创建交易页一致

### 2.2 Open Offer（客态）

**右侧面板 - Your Offers：**
- 买家make offer时同样支持选择Token
- 使用道具选择组件，体验与创建交易时一致

**底部文案更新：**
- `Lowest Value/Token required: {value值(KMB标记)} / 🪙 {token数量，千分位分隔}`
- 示例：`Lowest Value/Token required: 112.52k / 🪙 110`

**Open offer must meet要求框：**
- `Open offer must meet {卖家用户名}'s minimum value/tokens requirement: {value值(KMB标记)} ≈ {数量} tokens`
- 文字链：`How is value/token calculated?`

**文字链点击弹窗：**
```
How is value/token calculated?

- Value consists of two parts: Base Value and Market Adjustment. 
  Base Value is determined by the pet's traits, plus bonuses from age, weight, and mutations. 
  Market Adjustment applies real-time data from Tradekitsune and external markets to calculate the final value.
  
- The value/token conversion formula: Trade Value ÷ 50,000 = Trade Tokens.
```

### 2.3 Open Offer（主态）

**Value条件展示：**
- 与创建交易页该位置一样
- `Lowest Value/Tokens I'll accept: {value值} ≈ {数量} tokens`
- `Max value/Tokens: {value值} ≈ {数量} tokens`

### 2.4 页面Title更新

**包含Token时的Title格式：**
- 原格式：`Trade Details: Disco Bee, Butterfly x3, Barn Owl & more - Grow a Garden Trading`
- 新格式（有Token时）：`Trade Details: Token x150, Disco Bee, Butterfly x3, Barn Owl & more - Grow a Garden Trading`

---

## 三、Offer List模块

**卡片展示：**
- 与常规指定订单时的右侧效果一致
- Token展示在6宫格第一格
- 点击"more"时，弹窗中的Trade Summary拼接文案逻辑与创建交易页一致

---

## 四、FAQ更新

**新增Token相关FAQ：**

Q1: What are Grow a Garden Trading Tokens and how do they work?
A: Trading Tokens are the currency used in the Farmers Market/Trade World for purchasing pets, crops, and other player-listed items.

Q2: How do Token-based trade offers work on TradeKitsune?
A: Some offers include Tokens as part of the trade value, either alone or combined with pets and crops.

Q3: How are tokens converted into trade value?
A: Tokens × 50,000 = Trade Value. The conversion formula is determined by the expert panel based on an analysis of the trading market conditions.

---

# 【基线版本】2025年11月 - 原有页面需求

---

## 一、创建交易页

### 1.1 页面概述

- 页面标题：Create a New Trade
- 副标题：Choose what you're offering and what you want.

### 1.2 交易类型切换

**Tab切换：**
- Specific Trade（指定交易）
- Open to Offers（开放报价）

---

### 1.3 Specific Trade 模式

#### My Items区域（左侧）

**道具选择：**
- 12个道具槽位（6x2网格）
- 点击"+"添加道具
- 显示已选道具数量（如 1/12）

**Trade Summary：**
- 已选道具列表（名称、数量、Age、kg、Value）
- Value Details链接
- My Value总计

#### Looking for Items区域（右侧）

**道具选择：**
- 12个道具槽位（6x2网格）
- 点击"+"添加想要的道具
- 显示已选道具数量（如 1/12）

**Trade Summary：**
- 已选道具列表
- Value Details链接
- Their Value总计

#### 中间Value对比区

- WIN/LOSS/FAIR状态提示
- Trade provider提示（如：Trade provider (left side) get extra value. (+304%)）
- Offering Value 进度条
- Looking for Value 进度条

---

### 1.4 Open to Offers 模式

#### My Items区域（左侧）

- 与Specific Trade模式相同
- 12个道具槽位
- Trade Summary显示已选道具和总Value

#### Open to Offers区域（右侧）

**显示内容：**
- "Open to Offers" 图标和文字
- 中间区显示 Offering Value vs Looking for Value 对比

**Not Looking for (NLF)：**
- 复选框启用/禁用
- 6个道具槽位用于设置不想要的道具
- 帮助买家了解避免报价哪些道具

**Value/Token Requirement：**
- 复选框启用/禁用
- 滑块设置最低接受的Value/Token
- 显示：Lowest Value/Tokens I'll accept: [数值]
- 显示：Max Value/Tokens: [数值]

---

### 1.5 操作按钮

- CLEAR ALL：清空所有已选道具
- POST TRADE：发布交易
- 提示文字：After posting, we'll sort your items by value for easier viewing.

---

### 1.6 How to Post a Trade 教程

**4个步骤：**

| 步骤 | 标题 | 说明 |
|------|------|------|
| STEP 1 | Pick Your Trade Type | Choose "Specific Trade" if you know what you want, or "Open to Offers" to get offers and set your limits. |
| STEP 2 | Select Your Items or Tokens | Add the items or tokens you want to trade, and adjust traits for best value. |
| STEP 3 | Set Offer Rules | For open offers, select pets you don't want (NLF) and set your lowest accepted tokens or value. |
| STEP 4 | Check the Deal | See if your trade is Win, Fair, or Loss. Edit until you're happy, then post! |

每个步骤配有对应的插图。

---

### 1.7 Friendly Reminders

- **Stay Online** - After posting a trade, remain online so you can respond to offers quickly.
- **Verify Details** - Double check the item information and all trade conditions before confirming.
- **Protect Your Account** - Avoid unknown third-party links, and make sure the trader's Roblox ID matches their in-game ID.
- **Report Suspicious Activity** - If you see a suspicious trade or possible scam, report in the Chat immediately.
- **Start Small** - New traders could begin with low-value items to gain experience before making high-value trades.

---

### 1.8 FAQ

**Q1: What are Grow a Garden Trading Tokens and how do they work?**
A: 关于Trading Tokens的说明...

**Q2: How do Token-based trade offers work on TradeKitsune?**
A: 关于Token交易的说明...

**Q3: What does "Not Looking For (NLF)" mean?**
A: NLF lets you list pets you don't want to receive in offers...

**Q4: How does the "Value/Token Requirement" in Open Offers work?**
A: Value/Token Requirement sets the minimum total value/token...

---

## 二、订单详情页

### 2.1 页面概述

订单详情页分为两种类型：
- **指定订单（Specific Trade）**：卖家指定想要的道具，买家只能接受交易
- **开放订单（Open to Offers）**：卖家接受报价，买家可以自由报价

### 2.2 页面头部

**面包屑导航：**
- Home > Trade Listings > Trans #[订单编号]

**用户信息区：**
- 用户头像
- 用户名 + 在线状态标签
- 发布时间（Published X minutes ago）
- 可交易日期（如：Fri, Sat, Sun）
- 可交易时间（如：Any Time）

**广告位：**
- 页面头部展示广告

---

### 2.3 指定订单详情（Specific Trade）

#### 页面标题
- Trade Details: [道具名称] - Grow a Garden Trading
- 副标题：Make a Trade with [用户名]

#### 左侧卡片 - 卖家道具

**标题：**
- [用户名]'s Item (X/12)

**道具展示区：**
- 12格道具槽位（4x3网格）
- 显示已有道具图片和数量

**Trade Summary：**
- 道具名称、稀有度、Age、kg、Value
- Value Details链接
- Total value: [总价值]

#### 中间Value对比区

- WIN/LOSS/FAIR状态标签
- 提示文字：Trade provider (left side) get less. (-XX%)
- Offering Value 进度条（绿色）
- Looking for Value 进度条（橙色）

#### 右侧卡片 - 想要的道具

**标题：**
- Looking for Item (X/12)

**道具展示区：**
- 12格道具槽位
- 显示想要的道具图片和数量

**Trade Summary：**
- 道具名称、稀有度、Age、kg、Value
- Value Details链接
- Total value: [总价值]

#### 操作按钮

- **ACCEPT TRADE**：接受交易（绿色按钮）

---

### 2.4 开放订单详情（Open to Offers）

#### 页面标题
- Trade Details: [道具名称] - Grow a Garden Trading
- 副标题：Make a Trade with [用户名]

#### 左侧卡片 - 卖家道具

**标题：**
- [用户名]'s Item (X/12)

**道具展示区：**
- 12格道具槽位
- 显示已有道具图片和数量

**Trade Summary：**
- 道具名称、稀有度、Age、kg、Value
- Value Details链接
- Total value: [总价值]

#### 中间Value对比区

- LOSE/WIN/FAIR状态标签
- Offering Value vs Looking for Value 进度条
- **Open offer must meet要求框：**
  - [用户名]'s minimum value/token's requirement: [数值]
  - +[数值] Tokens
  - How to value/token calculate? 链接

#### 右侧卡片 - 您的报价

**标题：**
- Your Offers (X/12)

**道具选择区：**
- 12格道具槽位（可点击"+"添加道具）
- 点击添加报价道具

**Not Looking for (NLF)：**
- 显示卖家不想要的道具（或显示 Not Set）

**Trade Summary：**
- View Details链接
- Lowest Value/Token required: [数值] / [Token数值]

#### 操作按钮

- **CLEAR ALL**：清空报价
- **MAKE OFFER**：提交报价（紫色按钮）
- 提示文字：Add items to make your offer. If there's a minimum value, make sure your offer meets it.

---

### 2.5 分享与社区

**提示条：**
- 💬 Not sure if this deal is fair? Ask the pros!
- **Share按钮**：分享订单
- **Discord按钮**：跳转Discord讨论

---

### 2.6 Offer List（仅Open to Offers类型）

**区域标题：**
- Offer List

**空状态：**
- 图标 + "No content here yet."
- Sorry, no luck this time. Explore more?

**有报价时：**
- 显示报价列表（待补充具体样式）

---

### 2.7 More Similar Trades

**区域标题：**
- More Similar Trades >

**订单卡片列表：**

| 区域 | 内容 |
|------|------|
| 用户信息 | 头像、用户名、发布时间 |
| Have区域 | 道具列表（图片、+X More） |
| 状态区 | LOSE/WIN/Open to Offers、Offering Value vs Looking for Value 进度条 |
| Want区域 | 道具列表或 Lowest value/token required + NLF提示 |
| 操作按钮 | TRADE按钮 |

**底部按钮：**
- VIEW MORE（绿色按钮）

---

### 2.8 How to Trade on Tradekitsune

**3个指南卡片：**

| 图标 | 标题 | 内容 |
|------|------|------|
| 🛡️ | Safe Trading | - Verify the trader's in-game Roblox ID matches their profile ID. <br> - Use the official Grow a Garden trading system to avoid scams. <br> - Never click on unknown or third-party links. |
| 📊 | Value Assessment | - Follow market trends to track price changes - check the latest **Grow a Garden Pet Value List**. <br> - Special traits like weight, mutations can increase worth. <br> - Compare prices from past trades before setting yours. |
| ⏰ | Timing Your Trades | - Trade during peak hours for faster matches. <br> - Prices for new items peak soon after release. <br> - Activity is higher during holidays and events. |

---

### 2.9 FAQ

**Q1: What are Grow a Garden Trading Tokens?**
A: Trading Tokens are the currency used in the Farmers Market/Trade World for purchasing pets, crops, and other player-listed items...

**Q2: How do Token-based trades work on TradeKitsune?**
A: Some offers include Tokens as part of the trade value, either alone or combined with pets and crops...

**Q3: How does the platform judge if a trade is Win, Fair or Loss?**
A: We calculate WFL based on real-time item values from recent trades, so you get an unbiased estimate of the deal's balance.

**Q4: What's the best way to check if my trade is fair?**
A: Consider sharing your order in our Discord or on social apps for quick crowd feedback. Community opinions can help spot great or risky trades.

**Q5: How do I make a good, friendly trade?**
A: Be honest about your items, clearly communicate, and aim for fair trades that benefit both sides. Respect your partners to build a strong community.

---

### 2.10 底部工具入口

**标题：**
- 🌟 All your need for smarter trading
- Speed up your trades with our core features and calculators

**链接按钮：**
- 📊 Pet Value
- 📖 GAG Wiki
- 🔢 Trade Calculator
- ⚖️ Pet Weight Calculator

---

## 三、SEO优化

### 创建交易页

**TDK设置：**
- Title: Create Trade - [Game Name] Trading
- Description: Create your trade offer for [Game Name] items
- H1: Create a New Trade

### 订单详情页

**TDK设置：**
- Title: Trade Details: [道具名称] - [Game Name] Trading
- Description: View trade details and make an offer for [道具名称]
- H1: Trade Details: [道具名称] - Grow a Garden Trading

**结构化数据：**
- Product schema for trade items
- BreadcrumbList for navigation

---

# 版本变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| V1.1 | 2025-12-06 | 增加支持Token交易：创建交易页Token选择、Trade Summary Token拼接、Value Details Token公式披露、Token交易限制规则、订单详情页Token展示、Open Offer Token报价、FAQ更新等 | - |
| V1.0 | 2025-11-XX | 初始版本：创建交易页与订单详情页基线需求 | - |
