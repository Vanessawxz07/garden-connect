# 抽奖功能产品需求文档 (PRD) v1.0

## 📋 概述

### 核心价值
- **平台运营**：提升用户活跃度和留存率，建立健康的社交生态
- **VIP创作者**：通过抽奖活动吸引和维护粉丝群体，提升个人影响力
- **普通用户**：通过关注喜爱的VIP获得奖品机会，享受参与乐趣

### 上线目标
在**2025年12月20日前**，以便支持双节活动上线。

---

## 👥 用户角色

### 1. VIP用户（抽奖发起者）
**画像**：平台活跃的内容创作者、交易大户、社区意见领袖

**核心需求**：快速创建抽奖活动，选择奖品和设置规则，简化的定时开奖机制；通过抽奖吸引新粉丝关注 

### 2. 普通用户（参与者）
**画像**：平台活跃用户，对游戏道具有需求，喜欢社交互动

**核心需求**：快速发现感兴趣的抽奖活动，一键参与抽奖（自动关注VIP）；查看自己参与的抽奖记录，了解结果与状态

### 3. 平台运营
**核心需求**：手动审核和授予VIP权限；后续数据分析和运营决策支持

---

## 🎯 功能需求拆分

### P0：前置条件（基础设施）
优先级：必须完成

| 功能模块 | 功能描述 | 技术要点 |
|---------|---------|---------|
| **用户角色和权限分级** | 安全的角色权限管理 | 不同用户的功能权限区分 |
| **奖品库** | 道具、token数据管理 | 包括道具和token，及对应名称、图片、数量、价值等交易关键字段 |
| **关注系统** | 用户关注关系 | user_follows表，支持关注/取关 |

### P1：核心功能
优先级：高

#### 1. VIP抽奖发起
- **创建抽奖活动**
  - 选择奖品（支持1个or多个奖品，包括token或普通道具，跟创建交易中选择方式相同）
  - 设置参与条件（默认需关注VIP）
  - 开奖时间（默认逻辑为报名时间截止时，即为开奖时间）
  - 设置报名时间段（时间范围）
  - 设置获奖人数（默认为1）
  - 填写活动标题、描述

- **查看抽奖活动**
  - 查看活动参与人数统计、活动状态等（用户中心动态tab、抽奖详情页）
  - （待讨论-不支持取消或关闭抽奖）

#### 2. 用户参与抽奖
- **发现抽奖**
  - 首页、活动页（giveaway聚合页）的抽奖列表
  - 关注VIP的抽奖动态优先展示
  - 抽奖状态标识（进行中/已结束）

- **参与流程**
  - 点击"参加抽奖"按钮
  - 自动检测是否已关注VIP
  - 未关注则自动关注后参与成功
  - 已关注直接参与成功
  - 展示参与成功提示

- **参与记录**
  - 我参与的抽奖列表
  - 中奖记录单独展示

#### 3. 定时开奖（MVP版）
- **自动开奖机制**
  - 支持设定抽奖的报名时间范围，到报名时间截止时即为开奖时间，到时自动触发抽奖/开奖（同时）
  - 随机算法抽取获奖者
  - 确保公平性（已关注且参与的用户）

- **开奖结果**
  - 生成中奖记录
  - 系统通知中奖用户
  - 奖品自动发放到用户账户

#### 4. 中奖通知与领取
- **通知系统**
  - 站内消息通知中奖
  - 邮件通知（可选）
  
- **奖品领取**
  - 中奖用户查看奖品详情
  - 确认领取奖品
  - 奖品进入用户背包/道具库

#### 5. 抽奖列表页面
- **展示维度**
  - 全站抽奖列表（按时间/热度排序）
  - 关注的VIP抽奖（优先展示）
  - 进行中/已结束分类

- **卡片设计**（社交优先型 + 长条型）
  - 参考现有交易订单列表的长条卡片样式
  - 左侧：VIP头像、用户名
  - 中间：奖品缩略图、活动描述、参与条件
  - 右侧：参与人数、倒计时、操作按钮
  - 状态标签：FAIR/ONGOING/ENDED

#### 6. VIP主页聚合
- **个人主页布局**（参考截图1设计）
  - 顶部：VIP用户信息卡片
    - 头像、用户名
    - 关注数/粉丝数/拥有道具数
    - 加入时间、交易统计
    - 标签展示（如：标签1、标签2等）
    - 个人简介/招募说明
    - "关注"按钮（对于访客）
  
  - 侧边导航栏：
    - 动态
    - 交易
    - 收藏
    - 宠物背包
  
  - 主内容区域：
    - **进行中的抽奖**（Ongoing Giveaways）
      - 展示该VIP创建的所有进行中抽奖
      - 长条卡片样式，包含：
        - 奖品图片
        - 参与条件（如"Requirements: 50 users join"）
        - 参与进度条
        - 当前参与人数
        - "JOIN NOW"按钮
        - 分享按钮
    
    - **往期抽奖**（Past Giveaways）
      - 已结束的抽奖活动
      - "VIEW"按钮查看中奖结果

#### 7. 普通用户权限申请
> **说明**：VIP角色和抽奖功能权限由运营在管理后台授予，普通用户可通过Discord频道申请。

- **申请入口**
  - 用户个人主页 → 动态Tab → 空状态中的按钮（参见「用户隐私设置PRD」5.1.4节）
  - 按钮文案：「Create Giveaway」
  - 若无抽奖权限，点击后引导至Discord申请频道

- **申请流程**
  1. 用户在动态Tab空状态点击「Create Giveaway」
  2. 系统检测用户是否有 `create_giveaway` 权限
  3. 无权限：弹窗/Toast提示，引导跳转Discord频道申请
  4. 有权限：进入创建抽奖流程

- **审核流程**
  - 用户在Discord频道提交申请
  - 平台运营人工审核
  - 通过后由运营在管理后台为用户添加抽奖权限

### P2：未来增强（后续迭代）
优先级：低

- **高级开奖方式**
  - 达到指定人数自动开奖
  - 手动实时开奖
  
- **社交分享**
  - 分享抽奖到社交媒体
  - 邀请好友参与获得额外机会

- **数据统计分析**
  - VIP数据看板
  - 粉丝增长趋势图
  - 抽奖效果分析

- **高级权限管理**
  - 用户自助申请VIP
  - 自动化审核流程
  - VIP等级体系

---

## 🔐 关键业务逻辑

### 1. VIP用户权限管理
```
规则：
- 角色必须存储在独立的user_roles表（安全要求）
- 前期由平台运营手动指定VIP权限
- 用户可以申请成为VIP，但需要人工审核通过后手动添加

安全要求：
- 禁止使用客户端存储（localStorage等）验证权限
- 所有权限验证必须在服务端完成
- 使用SECURITY DEFINER函数避免RLS递归问题
```

### 2. 抽奖活动生命周期
```
创建 → 进行中 → 开奖 → 已结束

状态说明：
- created: 刚创建，未开始
- ongoing: 进行中，可以参与
- drawing: 正在开奖（锁定状态）
- completed: 已完成，展示结果
- cancelled: 已取消
```

### 3. 参与与开奖逻辑
```
参与条件：
1. 用户必须已登录
2. 用户必须关注该VIP（未关注则自动关注）
3. 抽奖活动处于"进行中"状态
4. 用户未重复参与同一抽奖

开奖逻辑（MVP-定时开奖）：
1. 到达设定时间自动触发
2. 检查有效参与者（已关注+已参与）
3. 随机抽取指定数量获奖者
4. 生成中奖记录
5. 发送中奖通知
6. 奖品自动发放

未中奖处理：
- 参与记录保留
- 积累参与积分（future: 可兑换奖励）
```

### 4. 领奖与交接流程

#### 4.1 开奖后系统行为
```
开奖完成后，系统自动执行以下操作：

1. 创建中奖记录（giveaway_winners表）
2. 发送站内通知给中奖者（系统消息）
3. 发送站内通知给发奖者（系统消息）
4. 自动创建发奖者与中奖者的聊天会话
5. 在聊天会话中发送首条系统消息（包含抽奖信息卡片）
```

#### 4.2 聊天系统集成

##### 4.2.1 系统消息通知（截图1样式）
发送到「System Message」频道，采用橙色主题卡片样式：

**发奖者收到的通知：**
```
🎉 Giveaway Draw Completed!                    [时间戳]
Your giveaway "[标题]" has been drawn successfully!
Winner: [中奖者用户名]
Please deliver the prize in-game and confirm handover.

[VIEW DETAILS]
```

**中奖者收到的通知：**
```
🎊 Congratulations! You Won!                   [时间戳]
You won "[奖品名称]" from [发奖者用户名]'s giveaway!
Please contact the host to receive your prize.

[VIEW DETAILS]
```

##### 4.2.2 用户聊天会话（截图2样式）
系统自动创建发奖者与中奖者的一对一聊天，首条消息为系统卡片：

```
+-------------------------------------------------------------+
| Giveaway #[ID短码]                          View Details    |
+-------------------------------------------------------------+
| [奖品图片]                                                   |
|                                                              |
| Prize Delivery                                               |
| [发奖者] won [奖品名称] from your giveaway.                  |
| Please deliver the prize in-game.                            |
|                                                              |
|           [CONFIRM HANDOVER]     [VIEW DETAILS]              |
+-------------------------------------------------------------+
```

**卡片字段说明：**
- Giveaway ID短码：取UUID前8位
- View Details：跳转giveaway详情页
- 奖品图片：显示中奖的道具图片
- CONFIRM HANDOVER：点击拉起「确认交接弹窗」
- VIEW DETAILS：跳转giveaway详情页

#### 4.3 确认交接弹窗

##### 4.3.1 弹窗UI设计
```
+-------------------------------------------------------------+
|                    Confirm Prize Handover                    |
|                           ✕                                 |
+-------------------------------------------------------------+
| Giveaway: [抽奖标题]                                         |
| Prize: [奖品名称] x [数量]                                   |
| Winner: [中奖者用户名]                                       |
+-------------------------------------------------------------+
| Upload Screenshot *                                          |
| [拖拽上传区域 或 点击选择图片]                                 |
| (Required for prize giver / Optional for winner)             |
+-------------------------------------------------------------+
| Note (Optional)                                              |
| [文本输入框，限制100字符]                                      |
+-------------------------------------------------------------+
|                    [CANCEL]    [CONFIRM]                     |
+-------------------------------------------------------------+
```

##### 4.3.2 交接逻辑规则

| 角色 | 截图上传 | 备注填写 | 操作必要性 |
|------|---------|---------|-----------|
| 发奖者 | 必填 | 选填 | 必须操作确认 |
| 中奖者 | 选填 | 选填 | 可选操作 |

**交接状态流转：**
```
pending（待交接）
    ↓ 发奖者点击CONFIRM HANDOVER
handover_submitted（发奖者已提交）
    ↓ 中奖者确认（可选）或 7天后自动
completed（交接完成）
```

#### 4.4 交接提醒机制

##### 7天未操作提醒
如果开奖后7天内双方均未操作确认交接，系统在聊天会话中推送提醒消息：

```
+-------------------------------------------------------------+
| ⏰ Handover Reminder                          [时间戳]       |
+-------------------------------------------------------------+
| The prize handover for "[抽奖标题]" has not been confirmed.  |
| Please complete the handover as soon as possible.            |
|                                                              |
|                      [CONFIRM HANDOVER]                      |
+-------------------------------------------------------------+
```

##### 提醒规则
- 触发条件：开奖后7天，发奖者未操作确认交接
- 提醒对象：发奖者和中奖者同时收到
- 提醒频率：仅发送一次
- 按钮行为：点击后拉起「确认交接弹窗」

#### 4.5 交接记录存储

新增 `giveaway_handovers` 表记录交接信息：

```sql
create type handover_status as enum ('pending', 'handover_submitted', 'completed');

create table public.giveaway_handovers (
    id uuid primary key default gen_random_uuid(),
    giveaway_id uuid references public.giveaways(id) on delete cascade,
    winner_id uuid references auth.users(id) on delete cascade,
    
    -- 发奖者提交
    giver_screenshot_url text,
    giver_note text,
    giver_submitted_at timestamp with time zone,
    
    -- 中奖者提交（可选）
    winner_screenshot_url text,
    winner_note text,
    winner_submitted_at timestamp with time zone,
    
    -- 状态
    status handover_status default 'pending',
    reminder_sent_at timestamp with time zone, -- 提醒发送时间
    completed_at timestamp with time zone,
    
    created_at timestamp with time zone default now()
);
```

#### 4.6 完整交接流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                      开奖完成                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │ 系统自动操作：                  │
              │ 1. 创建中奖记录                │
              │ 2. 发送系统消息通知双方         │
              │ 3. 创建双方聊天会话            │
              │ 4. 发送首条消息（抽奖卡片）     │
              │ 5. 创建handover记录(pending)   │
              └───────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │ 发奖者在聊天中看到卡片：        │
              │ [CONFIRM HANDOVER] 按钮       │
              └───────────────────────────────┘
                              │
           ┌──────────────────┴──────────────────┐
           │                                     │
           ▼                                     ▼
    ┌─────────────┐                      ┌─────────────────┐
    │ 7天内操作    │                      │ 7天未操作        │
    └─────────────┘                      └─────────────────┘
           │                                     │
           ▼                                     ▼
    ┌─────────────────┐                  ┌─────────────────────┐
    │ 点击按钮         │                  │ 系统发送提醒消息     │
    │ 拉起确认交接弹窗  │                  │ 附带[CONFIRM]按钮   │
    └─────────────────┘                  └─────────────────────┘
           │                                     │
           ▼                                     ▼
    ┌─────────────────────────────────────────────────────────┐
    │                   确认交接弹窗                            │
    │  发奖者：上传截图（必填）+ 备注（选填）                     │
    │  中奖者：上传截图（选填）+ 备注（选填）                     │
    └─────────────────────────────────────────────────────────┘
           │
           ▼ 发奖者提交
    ┌───────────────────────────────┐
    │ 更新handover状态为             │
    │ "handover_submitted"          │
    │ 存储截图URL和备注              │
    └───────────────────────────────┘
           │
           ▼ 中奖者确认（可选）或自动完成
    ┌───────────────────────────────┐
    │ 更新handover状态为             │
    │ "completed"                   │
    │ 记录completed_at              │
    └───────────────────────────────┘
```

---

## 📊 数据模型设计

### 核心数据表

#### 1. user_roles - 用户角色表
> **说明**：角色体系详见「用户隐私设置PRD」2.1节。网站用户角色分为 `vip`（特权用户）和 `user`（普通用户，默认）。`admin`/`moderator` 为内部管理角色，不在此体现。

```sql
create type public.app_role as enum ('vip', 'user');

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now(),
    unique (user_id, role)
);
```

#### 2. user_follows - 用户关注关系表
```sql
create table public.user_follows (
    id uuid primary key default gen_random_uuid(),
    follower_id uuid references auth.users(id) not null, -- 关注者
    following_id uuid references auth.users(id) not null, -- 被关注者
    created_at timestamp with time zone default now(),
    unique (follower_id, following_id)
);
```

#### 3. items - 道具库表
```sql
create table public.items (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    image_url text,
    value numeric(10,2), -- 道具价值
    category text, -- 道具分类
    created_at timestamp with time zone default now()
);
```

#### 4. giveaways - 抽奖活动表
```sql
create type giveaway_status as enum ('created', 'ongoing', 'drawing', 'completed', 'cancelled');

create table public.giveaways (
    id uuid primary key default gen_random_uuid(),
    creator_id uuid references auth.users(id) not null, -- VIP用户
    title text not null,
    description text,
    status giveaway_status default 'created',
    winner_count integer not null default 1, -- 中奖人数
    draw_time timestamp with time zone not null, -- 开奖时间
    campaign_tag text, -- 关联活动标签（管理端手动配置，如"圣诞活动"，显示为标签样式，不可点击）
    created_at timestamp with time zone default now(),
    ended_at timestamp with time zone
);
```

#### 5. giveaway_items - 抽奖奖品表
```sql
create table public.giveaway_items (
    id uuid primary key default gen_random_uuid(),
    giveaway_id uuid references public.giveaways(id) on delete cascade,
    item_id uuid references public.items(id),
    quantity integer default 1,
    created_at timestamp with time zone default now()
);
```

#### 6. giveaway_participants - 参与记录表
```sql
create table public.giveaway_participants (
    id uuid primary key default gen_random_uuid(),
    giveaway_id uuid references public.giveaways(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    participated_at timestamp with time zone default now(),
    points_earned integer default 1, -- 参与积分
    unique (giveaway_id, user_id)
);
```

#### 7. giveaway_winners - 中奖记录表
```sql
create type claim_status as enum ('pending', 'claimed', 'expired');

create table public.giveaway_winners (
    id uuid primary key default gen_random_uuid(),
    giveaway_id uuid references public.giveaways(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    item_id uuid references public.items(id),
    claimed_status claim_status default 'pending',
    claimed_at timestamp with time zone,
    expire_at timestamp with time zone, -- 领取截止时间（7天）
    created_at timestamp with time zone default now()
);
```

#### 8. giveaway_permission_requests - VIP权限申请表
```sql
create type request_status as enum ('pending', 'approved', 'rejected');

create table public.giveaway_permission_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    name text not null,
    contact text not null,
    reason text not null,
    attachments jsonb, -- 附件URLs
    status request_status default 'pending',
    reviewed_by uuid references auth.users(id),
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone default now()
);
```

---

## 📋 Giveaway 字段表

> 本节抽象出 Giveaway 的完整字段，区分业务逻辑字段与展示字段，供不同场景（长条卡片、方形卡片、详情页）选择使用。

### 字段分类说明
- **业务逻辑字段**：后端存储、业务计算所需
- **展示字段**：前端UI展示所需，部分为计算/派生字段

### 完整字段表

| 字段名 | 字段说明 | 业务逻辑 | 长条卡片 | 方形卡片(日历hover) | 详情页 | 备注 |
|--------|----------|:--------:|:--------:|:-------------------:|:------:|------|
| **基础信息** |
| id | 抽奖活动唯一标识 | ✅ | - | - | - | UUID |
| title | 活动标题 | ✅ | ✅ | ✅ | ✅ | 限制50字符 |
| description | 活动描述/说明 | ✅ | 摘要 | - | ✅完整 | 限制500字符 |
| status | 活动状态 | ✅ | ✅ | ✅ | ✅ | created/ongoing/drawing/completed/cancelled |
| **创建者信息** |
| creator_id | 创建者用户ID | ✅ | - | - | - | 关联user表 |
| creator_avatar | 创建者头像URL | - | ✅ | ✅ | ✅ | 从user表获取 |
| creator_name | 创建者用户名 | - | ✅ | ✅ | ✅ | 从user表获取 |
| creator_tags | 创建者标签 | - | ✅(3个+more) | - | ✅(最多8个) | 从user_tags表获取 |
| is_following | 当前用户是否已关注创建者 | - | ✅ | - | ✅ | 运行时计算 |
| **奖品信息** |
| items | 奖品列表 | ✅ | ✅ | ✅ | ✅ | 关联giveaway_items表 |
| item_images | 奖品图片列表 | - | ✅(首个) | ✅(首个) | ✅(全部) | 从items表获取 |
| item_names | 奖品名称列表 | - | ✅ | ✅ | ✅ | 从items表获取 |
| total_prizes | 奖品总数量 | - | ✅ | ✅ | ✅ | 计算字段 |
| **时间信息** |
| created_at | 创建时间 | ✅ | ✅ | - | ✅ | 展示"X ago"格式 |
| draw_time | 开奖时间 | ✅ | ✅ | ✅ | ✅ | 定时开奖触发时间 |
| ended_at | 实际结束时间 | ✅ | - | - | ✅ | 开奖完成时间 |
| countdown_text | 倒计时文案 | - | ✅ | ✅ | ✅ | 计算字段："Ends in 2h 30m" |
| time_status | 时间状态标签 | - | ✅ | ✅ | - | "FAIR"/"ONGOING"/"ENDED" |
| campaign_tag | 关联活动标签 | ✅ | ✅ | ✅ | ✅ | 管理端配置，标签样式显示，不可点击 |
| **参与信息** |
| winner_count | 中奖人数上限 | ✅ | ✅ | ✅ | ✅ | 默认1 |
| participant_count | 当前参与人数 | - | ✅ | ✅ | ✅ | 计算字段 |
| participation_progress | 参与进度百分比 | - | ✅ | - | ✅ | 可选：用于进度条展示 |
| is_participated | 当前用户是否已参与 | - | ✅ | - | ✅ | 运行时计算 |
| my_participation_time | 我的参与时间 | - | - | - | ✅ | 仅已参与时显示 |
| **中奖信息（已结束时）** |
| winners | 中奖者列表 | ✅ | - | - | ✅ | 关联giveaway_winners表 |
| winner_avatars | 中奖者头像 | - | ✅(最多3个) | - | ✅(全部) | 从user表获取 |
| winner_names | 中奖者用户名 | - | - | - | ✅ | 从user表获取 |
| is_winner | 当前用户是否中奖 | - | ✅ | - | ✅ | 运行时计算 |
| my_prize | 我的奖品信息 | - | - | - | ✅ | 仅中奖时显示 |
| claim_status | 领奖状态 | ✅ | - | - | ✅ | pending/claimed/expired |
| claim_deadline | 领奖截止时间 | ✅ | - | - | ✅ | 中奖后7天 |
| **交接信息（已中奖时）** |
| handover_status | 交接状态 | ✅ | - | - | ✅ | pending/handover_submitted/completed |
| giver_screenshot_url | 发奖者交接截图 | ✅ | - | - | ✅ | 发奖者必填 |
| giver_note | 发奖者交接备注 | ✅ | - | - | ✅ | 选填，限100字符 |
| winner_screenshot_url | 中奖者交接截图 | ✅ | - | - | ✅ | 中奖者选填 |
| winner_note | 中奖者交接备注 | ✅ | - | - | ✅ | 选填，限100字符 |
| can_confirm_handover | 是否可确认交接 | - | - | - | ✅ | 计算字段：已中奖且交接未完成 |
| **交互字段** |
| can_participate | 是否可参与 | - | ✅ | - | ✅ | 计算字段：状态ongoing且未参与 |
| action_button_text | 操作按钮文案 | - | ✅ | - | ✅ | "JOIN NOW"/"JOINED"/"VIEW"/"CLAIM" |
| action_button_state | 操作按钮状态 | - | ✅ | - | ✅ | enabled/disabled/loading |
| share_url | 分享链接 | - | ✅ | - | ✅ | 生成的分享URL |

### 不同场景的展示重点

#### 1. 长条卡片（抽奖列表/动态Tab）
主要展示：创建者信息、奖品缩略、参与统计、倒计时、操作按钮
- 适用场景：Giveaway列表页、用户主页动态Tab
- 信息密度：中等，需快速浏览

#### 2. 方形卡片（日历Hover）
主要展示：标题、状态、奖品、倒计时
- 适用场景：抽奖日历hover时的信息预览
- 信息密度：低，仅关键信息

#### 3. 详情页
主要展示：完整信息，包括完整描述、所有奖品、参与者列表、中奖结果
- 适用场景：点击卡片进入的详情页面
- 信息密度：高，完整展示

---

## 🗺️ 用户旅程与逻辑图

### 主态（创建者视角）

#### 用户旅程
```
创建者（VIP用户/有抽奖权限的用户）视角下的完整流程：

1. 发现入口
   ├─ 个人主页 → 动态Tab → 「Create Giveaway」按钮
   └─ 全站 Giveaway 列表页 → 「Create」按钮（仅有权限用户可见）

2. 创建抽奖
   ├─ 填写标题、描述
   ├─ 选择奖品（从道具库选择，支持多个）
   ├─ 设置开奖时间
   ├─ 设置中奖人数
   └─ 提交创建

3. 管理抽奖（进行中）
   ├─ 查看实时参与人数
   ├─ 查看粉丝增长数据
   ├─ 分享抽奖链接
   └─ 提前结束/开奖（可选）

4. 查看结果（已结束）
   ├─ 查看中奖者列表
   ├─ 查看奖品发放状态
   └─ 查看活动统计数据
```

#### 主态页面状态

| 页面位置 | 进行中状态 | 已结束状态 |
|---------|-----------|-----------|
| 动态Tab卡片 | 显示参与人数、倒计时、「Share」按钮 | 显示参与人数、中奖者头像、「View」按钮 |
| 详情页 | 参与者列表（实时更新）、「End Early」按钮 | 中奖者列表、奖品发放状态、统计数据 |

### 客态（参与者视角）

#### 用户旅程
```
普通用户参与抽奖的完整流程：

1. 发现抽奖
   ├─ 首页推荐
   ├─ Giveaway 列表页（支持筛选：全部/关注的VIP/进行中）
   ├─ 抽奖日历（按日期查看）
   └─ VIP用户主页 → 动态Tab

2. 浏览抽奖
   ├─ 查看卡片信息（奖品、参与人数、倒计时）
   └─ 点击进入详情页查看完整信息

3. 参与抽奖
   ├─ 点击「JOIN NOW」按钮
   ├─ 系统检测关注状态
   │   ├─ 已关注 → 直接参与成功
   │   └─ 未关注 → 自动关注VIP → 参与成功
   ├─ Toast提示"Successfully joined!"
   └─ 按钮变为「JOINED」（禁用态）

4. 等待开奖
   ├─ 在"我参与的抽奖"列表查看
   └─ 关注倒计时

5. 查看结果
   ├─ 中奖 → 收到通知 → 查看奖品 → 领取奖品
   └─ 未中奖 → 获得参与积分 → 查看其他抽奖
```

#### 客态页面状态

| 页面位置 | 未参与 | 已参与 | 已结束-未中奖 | 已结束-中奖 |
|---------|--------|--------|--------------|------------|
| 列表卡片 | 「JOIN NOW」按钮 | 「JOINED」(禁用) | 「VIEW」按钮 | 「VIEW」按钮 + 🎉标识 |
| 详情页 | 完整信息 + 「JOIN NOW」 | 完整信息 + 参与确认 | 中奖者列表 | 中奖提示 + 「CLAIM」按钮 |

### 参与抽奖核心逻辑图

```
┌─────────────────────────────────────────────────────────────────┐
│                     用户点击「JOIN NOW」                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   是否已登录？    │
                    └─────────────────┘
                       │           │
                      否           是
                       │           │
                       ▼           ▼
              ┌─────────────┐  ┌─────────────────┐
              │ 跳转登录页面  │  │ 抽奖状态是否为   │
              │ 登录后返回   │  │ "ongoing"？      │
              └─────────────┘  └─────────────────┘
                                  │           │
                                 否           是
                                  │           │
                                  ▼           ▼
                          ┌───────────┐  ┌─────────────────┐
                          │ 显示错误   │  │ 是否已参与？     │
                          │ 活动已结束 │  └─────────────────┘
                          └───────────┘     │           │
                                           是           否
                                            │           │
                                            ▼           ▼
                                    ┌───────────┐  ┌─────────────────┐
                                    │ 显示提示   │  │ 是否已关注VIP？  │
                                    │ 您已参与   │  └─────────────────┘
                                    └───────────┘     │           │
                                                     是           否
                                                      │           │
                                                      │           ▼
                                                      │   ┌───────────────┐
                                                      │   │ 自动关注VIP    │
                                                      │   │ 创建关注记录   │
                                                      │   └───────────────┘
                                                      │           │
                                                      ▼           ▼
                                              ┌─────────────────────────┐
                                              │     创建参与记录         │
                                              │  giveaway_participants  │
                                              └─────────────────────────┘
                                                          │
                                                          ▼
                                              ┌─────────────────────────┐
                                              │     参与成功             │
                                              │  - Toast提示            │
                                              │  - 按钮变为「JOINED」    │
                                              │  - 参与人数+1           │
                                              └─────────────────────────┘
```

### 开奖逻辑图（系统自动）

```
┌─────────────────────────────────────────────────────────────────┐
│               定时任务触发（到达 draw_time）                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ 更新状态为       │
                    │ "drawing"       │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ 获取有效参与者    │
                    │ (已关注+已参与)  │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ 参与者数量 > 0？ │
                    └─────────────────┘
                       │           │
                      否           是
                       │           │
                       ▼           ▼
              ┌─────────────┐  ┌─────────────────────┐
              │ 标记为无有效  │  │ 随机抽取winner_count │
              │ 参与者结束   │  │ 个获奖者             │
              └─────────────┘  └─────────────────────┘
                                          │
                                          ▼
                              ┌─────────────────────┐
                              │ 创建中奖记录         │
                              │ giveaway_winners    │
                              │ 设置claim_deadline  │
                              └─────────────────────┘
                                          │
                                          ▼
                              ┌─────────────────────┐
                              │ 发送中奖通知         │
                              │ - 站内消息          │
                              │ - 邮件（可选）       │
                              └─────────────────────┘
                                          │
                                          ▼
                              ┌─────────────────────┐
                              │ 更新状态为           │
                              │ "completed"         │
                              │ 记录ended_at        │
                              └─────────────────────┘
```

---

## 🎨 UI/UX设计方向

### 设计风格：社交优先型 + 长条卡片

#### 核心设计原则
1. **社交互动优先**：VIP与粉丝关系是核心
2. **信息密度适中**：长条卡片提升浏览效率
3. **视觉统一**：与现有交易订单列表风格一致
4. **快速操作**：减少点击步骤，提升转化

#### 关键页面布局

##### 1. VIP个人主页（参考截图1）
```
+-----------------------------------+
| 左侧导航栏    |  顶部用户信息卡片      |
| - 动态        |  [头像] User Name     |
| - 交易        |  Following: xxx  Followed: xxx |
| - 收藏        |  标签1 标签2 标签3    |
| - 宠物背包    |  个人简介...          |
|              |  [Follow按钮]         |
+-----------------------------------+
|              | Ongoing Giveaways    |
|              | [长条抽奖卡片1]       |
|              | [长条抽奖卡片2]       |
|              |                      |
|              | Past Giveaways       |
|              | [长条抽奖卡片3]       |
+-----------------------------------+
```

##### 2. 长条抽奖卡片（参考截图2交易列表样式）
```
+-------------------------------------------------------------+
| [VIP头像] VIP Name      [奖品图]  Requirements: 50 users    |
|           Published     奖品名称   [进度条 70%]  [JOIN NOW] |
|           1 minute ago             36 users joining!  Share  |
+-------------------------------------------------------------+

状态变化：
- 进行中：JOIN NOW按钮 + 倒计时
- 已结束：VIEW按钮 + "75 users joined!"
```

##### 3. 抽奖列表页面
```
+-----------------------------------+
|     LATEST GIVEAWAYS             |
|  [筛选] 全部 | 关注的VIP | 进行中  |
+-----------------------------------+
| [长条抽奖卡片1 - ONGOING]        |
| [长条抽奖卡片2 - FAIR]           |
| [长条抽奖卡片3 - ENDED]          |
+-----------------------------------+
```

#### 核心交互流程

##### 参与抽奖流程
```
1. 用户浏览抽奖列表
   ↓
2. 点击"JOIN NOW"按钮
   ↓
3. 检测关注状态
   ├─ 已关注 → 直接参与成功
   └─ 未关注 → 自动关注 → 参与成功
   ↓
4. Toast提示"参与成功！"
5. 按钮变为"已参与"（禁用状态）
6. 参与人数+1，进度条更新
```

---

## 🛠️ 技术栈

### 前端
- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **路由**：React Router v6
- **UI组件**：Shadcn/ui + Tailwind CSS
- **状态管理**：TanStack Query
- **表单处理**：React Hook Form + Zod

### 后端
- **平台**：Lovable Cloud（基于Supabase）
- **数据库**：PostgreSQL
- **认证**：Supabase Auth（邮箱+密码）
- **实时功能**：Supabase Realtime
- **无服务器函数**：Edge Functions

### 关键技术决策
1. **角色权限**：独立user_roles表 + SECURITY DEFINER函数
2. **定时任务**：Supabase Edge Functions + Cron Jobs
3. **随机算法**：PostgreSQL random() + 服务端验证
4. **通知系统**：Supabase Realtime + Email triggers

---

## 📅 项目时间表

### 里程碑
| 阶段 | 时间节点 | 交付内容 |
|------|---------|---------|
| **需求确认** | 11月30日 | ✅ PRD v1.0 |
| **架构设计** | 12月1-2日 | 数据库Schema + API设计 |
| **前端开发** | 12月3-10日 | 核心页面 + 组件 |
| **后端开发** | 12月5-12日 | Edge Functions + 定时任务 |
| **联调测试** | 12月13-16日 | 功能测试 + Bug修复 |
| **上线准备** | 12月17-19日 | 数据迁移 + 性能优化 |
| **正式上线** | 12月20日 | 🎄 圣诞节上线 |

### 风险预案
- **风险1**：定时开奖功能复杂度超预期
  - 预案：先上线手动开奖，定时功能下个版本
  
- **风险2**：道具库数据迁移问题
  - 预案：提前准备测试数据，预演迁移流程
  
- **风险3**：性能问题（参与人数过多）
  - 预案：实施分页加载 + 缓存优化

---

## 📈 成功指标（MVP阶段）

### 核心指标
1. **抽奖活跃度**
   - 目标：每周至少10个VIP创建抽奖
   - 目标：平均每个抽奖吸引50+用户参与

2. **用户参与度**
   - 目标：用户参与抽奖转化率 > 30%
   - 目标：通过抽奖带来的新关注转化率 > 50%

3. **系统稳定性**
   - 目标：定时开奖成功率 > 99%
   - 目标：页面加载时间 < 2秒

### 数据监控
- 每日活跃抽奖数
- 用户参与次数
- VIP粉丝增长数
- 奖品发放成功率

---

## 🔄 后续迭代计划

### V2.0 规划（春节版本）
- 高级开奖方式（达到人数开奖、手动开奖）
- 社交分享功能
- 数据统计看板
- 积分兑换系统

### V3.0 规划（全年规划）
- VIP等级体系
- 付费抽奖功能
- 联合抽奖（多VIP合作）
- 移动端优化

---

## 📝 附录

### A. 术语表
- **VIP用户**：拥有平台特权的用户角色（团队成员、KOL、游戏开发者等），由运营在管理后台授予
- **普通用户**：平台默认角色，新注册用户自动分配
- **抽奖权限**：`create_giveaway` 功能权限，VIP用户默认拥有，普通用户可通过申请获得
- **道具库**：游戏内可交易的虚拟物品集合
- **参与积分**：用户参与抽奖累积的积分（暂不可兑换）
- **主态**：用户查看自己创建的抽奖活动
- **客态**：用户查看他人创建的抽奖活动

### B. 参考资料
- 前置需求：「用户隐私设置PRD」（用户体系、角色、权限、标签）
- 原始需求文档：[抽奖功能.pdf]
- UI设计参考：截图1（个人主页）、截图2（交易列表）
- 技术文档：Lovable Cloud官方文档
- 竞品分析：Twitter Giveaways, Discord Events

### C. 变更记录
| 版本 | 日期 | 变更内容 | 负责人 |
|------|------|---------|--------|
| v1.0 | 2025-11-30 | 初始版本，完成MVP需求定义 | AI Product Manager |
| v1.1 | 2025-12-05 | 与用户隐私PRD对齐：更新角色体系、权限申请入口；新增Giveaway字段表、用户旅程与逻辑图 | AI Product Manager |
| v1.2 | 2025-12-08 | 新增奖品交接流程：聊天系统集成、确认交接弹窗、7天提醒机制、giveaway_handovers表 | AI Product Manager |
| v1.3 | 2025-12-08 | 新增关联活动字段（campaign_tag），管理端手动配置，标签样式展示 | AI Product Manager |

---

**文档状态**：✅ 已确认  
**最后更新**：2025-12-08  
**下一步行动**：开始架构设计和技术选型
