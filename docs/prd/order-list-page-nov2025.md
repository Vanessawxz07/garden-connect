# 订单列表页 - 2025年11月更新

> 本文档记录订单列表页的现网版本需求，作为后续新游戏拓展专项的基线参考。
<img width="1187" height="817" alt="image" src="https://github.com/user-attachments/assets/e36c4618-5baa-4e54-84d6-650891edaf00" />
<img width="1158" height="692" alt="image" src="https://github.com/user-attachments/assets/ffd5b296-d92b-4c1c-8592-a525ab403ed8" />

---

# 【迭代版本】2025年12月6日 - 增加支持Token交易

## 一、订单卡片 - Token迭代

### 1.1 指定订单卡片

**Token展示：**
- 左右侧6宫格中增加Token道具展示（Token图标 + 外显数量）
- Token可与其他道具混排
- Token添加后自动排列在第一个格子
- Value比例、WFL文案和交互保持不变


### 1.2 Open Offer卡片 - 展示调整

**展示规则矩阵：**

| NLF设置 | Value条件 | 展示效果 |
|--------|----------|---------|
| N | N | 不变，右侧为空，显示"Looking For: Open" |
| Y | N | 右侧显示NLF条件 |
| N | Y | 右侧显示Value条件 + 问号图标 + 中间比例条 |
| Y | Y | 合并展示，同时显示NLF和Value条件 + 中间比例条 |

**Value条件展示：**
- 中间Value比例条均展示（按实际左右侧Value计算，右侧可以为0）
- 增加问号图标，tooltip提示文案：`Open offer must meet the minimum value/tokens requirement: {value值(KMB标记)} ≈ {数量} tokens`
- 文案格式：`Lowest value/token required: {value值} / 🪙 {token数量}`
- 示例：`Lowest value/token required: 112k / 🪙 10`

**NLF条件展示：**
- 如有设置，显示道具种类数量（如：`NLF: 5 Items`）
- 点击后打开NLF道具弹窗（与订单详情页的Offer List交互相同）
- 如未设置，显示 `NLF: N/A`

**12/4补充：**
- 只要有Value条件的情况下都展示中间比例条
- 文案与有Value条件时一样



**FAQ文案**：
https://doc.weixin.qq.com/doc/w3_ATMA6AazAK0CNimZyps0xSNiVYtYF?scode=AFIANgeJAA0yHRRXvoAWkAuwbIADo


---

## 二、Token Offer筛选项（P2，暂不开发）

**新增筛选项：**
- Token Offer筛选开关
- 默认关闭
- 开启后：筛选包含Token的交易订单

**筛选器布局：**
```
┌──────────────┬─────────────┬────────────┬──────────────┐
│ 🐾 Pet Filter│ User Online │ Open Offer │ Token Offer  │
└──────────────┴─────────────┴────────────┴──────────────┘
```



---

## 三、其他场景复用

### 3.1 订单详情页 - Offer List模块

- 与常规指定订单时的右侧效果一致
- Token展示在6宫格第一格
- 其他信息不变

### 3.2 个人中心页

- 复用6宫格新样式、逻辑
- Token格子展示与订单卡片一致

---

# 【基线版本】2025年11月 - 原有页面需求
企微文档：https://doc.weixin.qq.com/doc/w3_AWkAuwbIADoCNJKNhmy39T10s120k?scode=AFIANgeJAA0r1CLS3xAWkAuwbIADo

<img width="329" height="627" alt="局部截取_20260120_101236" src="https://github.com/user-attachments/assets/40955f72-fbd6-4b26-81f4-4235f374b7d4" />


---

# 版本变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| V1.1 | 2025-12-06 | 增加支持Token交易：订单卡片Token展示、Open Offer卡片展示调整（NLF+Value条件合并展示）、Token Offer筛选项（P2暂不开发）、个人中心页复用等 | - |
| V1.0 | 2025-11-XX | 初始版本：订单列表页基线需求 | - |
