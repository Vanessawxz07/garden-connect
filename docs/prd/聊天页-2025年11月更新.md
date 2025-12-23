# 聊天页 - 2025年11月更新

> 本文档记录聊天页的现网版本需求，作为后续新游戏拓展专项的基线参考。

---

## 一、页面概述

聊天页是交易双方沟通的核心页面，支持实时消息、交易状态同步和安全提醒。

---

## 二、页面结构

### 2.1 整体布局

**桌面端三栏布局：**
- 左侧：广告位
- 中间左侧：会话列表
- 中间右侧：聊天主区域
- 右侧：广告位

---

### 2.2 会话列表区

**标题栏：**
- "Message" + 未读消息总数徽章（如：10）

**系统消息项：**
- 🔔 图标 + 红点未读标识
- "System Message" 标签
- 时间戳
- 消息预览（如：📦 Vote for your favorite garden on PoliUnit an...）

**会话列表项：**

| 区域 | 内容 |
|------|------|
| 用户头像 | 圆形头像 |
| 用户信息 | 用户名 + 在线状态标签（Offline/Online） |
| 关联订单 | Trade #[订单编号] |
| 最后消息 | 消息预览（Trade Request / 文字消息） |
| 时间戳 | 日期时间（如：12/09 13:53） |

**列表排序：**
- 按时间倒序（最新消息在上）

---

### 2.3 聊天主区域

#### 头部信息栏

**用户信息：**
- 用户头像
- 用户名 + 在线状态标签（Offline/Online）
- 📅 可交易日期图标 + 日期列表（Mon, Tue, Wed, Thu, Fri, Sat, Sun）
- 🕐 可交易时间图标 + 时间段（Afternoon）

**操作按钮：**
- Report按钮（右上角）

#### 安全警告条（橙色背景）

- ⚠️ **Beware of scams!** 🙏
- 警告文字：Don't trust links or fake giveaways asking you to go off-site. Report anything suspicious!
- X 关闭按钮

#### 订单信息区

**标题行：**
- Trade #[订单编号]
- View Details 链接（右侧）

**道具展示：**
- 12格道具槽位（4x3网格）
- 显示交易相关道具图片

#### 消息区域

**交易请求消息（系统消息卡片）：**
- **Trade Request** 标签
- 提示文字：You have received a trade request. Do you accept? The trade will start immediately upon acceptance.
- **ACCEPT** 按钮（绿色）
- **DECLINE** 按钮（红色）

**普通文字消息：**
- 消息气泡
- 时间戳

#### 输入区域

- Message 输入框（placeholder: "Message"）
- 发送按钮（箭头图标，紫色背景）

---

### 2.4 Trade Chat Tips

**区域标题：**
- ⚠️ Trade Chat Tips

**提示列表（4条）：**
1. Before confirming, carefully double-check the item information and trade conditions.
2. Do not click any unknown third-party links. Confirm the user's Roblox ID matches their in-game ID.
3. Be polite and friendly to build good trading relationships.
4. If you have any doubts, communicate with your trade partner in the chat to confirm details.

---

## 三、功能说明

### 3.1 消息类型

**系统消息：**
- 交易请求（Trade Request）
- 订单状态变更通知
- 安全提醒

**用户消息：**
- 文字消息

### 3.2 交易请求处理

**收到交易请求时：**
- 显示Trade Request卡片
- 提示交易将立即开始
- **ACCEPT**：接受交易
- **DECLINE**：拒绝交易

### 3.3 举报功能

- 点击Report按钮
- 可举报可疑用户或消息

---

## 四、响应式设计

### 4.1 桌面端

- 三栏布局（广告 + 会话列表 + 聊天区 + 广告）
- 会话列表和聊天区并排显示

### 4.2 移动端

- 会话列表和聊天区分开为两个页面
- 点击会话进入聊天详情页
- 返回按钮回到会话列表

---

## 五、SEO优化

**说明：**
- 聊天页为私密页面，不需要SEO优化
- 需登录后访问
