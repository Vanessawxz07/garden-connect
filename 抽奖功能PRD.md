# 抽奖功能产品需求文档 (PRD) v1.0

## 📋 产品概述

### 产品使命
打造一个以VIP创作者为核心的社交抽奖平台，让VIP用户通过定期抽奖活动增强与粉丝的互动，提升粉丝粘性和平台活跃度。

### 核心价值
- **VIP创作者**：通过抽奖活动吸引和维护粉丝群体，提升个人影响力
- **普通用户**：通过关注喜爱的VIP获得奖品机会，享受参与乐趣
- **平台运营**：提升用户活跃度和留存率，建立健康的社交生态

### MVP范围
本次MVP聚焦核心抽奖流程，采用简化版本快速上线，计划在**2025年12月20日前**完成圣诞节上线。

---

## 👥 用户角色

### 1. VIP用户（抽奖发起者）
**画像**：平台活跃的内容创作者、交易大户、社区意见领袖

**核心需求**：
- 快速创建抽奖活动，选择奖品和设置规则
- 通过抽奖吸引新粉丝关注
- 实时查看参与数据和粉丝增长情况
- 简化的定时开奖机制

**痛点**：
- 手动管理粉丝关系成本高
- 缺乏有效的粉丝互动工具
- 难以衡量营销活动效果

### 2. 普通用户（参与者）
**画像**：平台活跃用户，对游戏道具有需求，喜欢社交互动

**核心需求**：
- 快速发现感兴趣的抽奖活动
- 一键参与抽奖（自动关注VIP）
- 查看自己参与的抽奖记录
- 积累参与积分（即使未中奖）

**痛点**：
- 错过喜欢的VIP的抽奖活动
- 参与流程复杂繁琐
- 未中奖时缺乏心理补偿

### 3. 平台运营
**核心需求**：
- 手动审核和授予VIP权限
- 监控抽奖活动质量
- 数据分析和运营决策支持

---

## 🎯 功能需求拆分

### P0：前置条件（基础设施）
优先级：必须完成

| 功能模块 | 功能描述 | 技术要点 |
|---------|---------|---------|
| **Lovable Cloud** | 启用后端服务 | Supabase集成、数据库、认证系统 |
| **用户角色系统** | 安全的角色权限管理 | 独立user_roles表，防止权限提升攻击 |
| **道具库** | 游戏道具数据管理 | items表，包含名称、图片、价值等 |
| **关注系统** | 用户关注关系 | user_follows表，支持关注/取关 |

### P1：核心功能（圣诞节必上线）
优先级：高

#### 1. VIP抽奖发起
- **创建抽奖活动**
  - 选择道具库中的奖品（支持多个奖品）
  - 设置参与条件（需关注VIP）
  - 设置开奖时间（定时开奖）
  - 设置获奖人数
  - 填写活动描述

- **管理抽奖活动**
  - 查看活动参与人数实时统计
  - 查看粉丝增长数据
  - 手动结束抽奖（未到时间也可提前开奖）

#### 2. 用户参与抽奖
- **发现抽奖**
  - 首页推荐抽奖列表
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
  - 参与积分累积显示

#### 3. 定时开奖（MVP版）
- **自动开奖机制**
  - 到达设定时间自动触发
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
- **申请入口**
  - 用户设置页面
  - 申请成为VIP按钮

- **申请表单**
  - 姓名
  - 联系方式
  - 申请理由
  - 相关资料上传

- **审核流程**
  - 表单提交后进入待审核状态
  - 平台运营人工审核
  - 通过后由运营在后台手动添加VIP权限

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

### 4. 领奖流程
```
流程：
1. 用户收到中奖通知
2. 查看中奖详情页面
3. 点击"领取奖品"
4. 确认领取后奖品进入用户背包
5. 更新领取状态

限制：
- 中奖后7天内必须领取，否则作废
- 奖品不可转让
```

---

## 📊 数据模型设计

### 核心数据表

#### 1. user_roles - 用户角色表
```sql
create type public.app_role as enum ('admin', 'vip', 'user');

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now(),
    granted_by uuid references auth.users(id), -- 授予人
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
- **VIP用户**：拥有创建抽奖权限的用户
- **普通用户**：平台注册用户，可参与抽奖
- **道具库**：游戏内可交易的虚拟物品集合
- **参与积分**：用户参与抽奖累积的积分（暂不可兑换）

### B. 参考资料
- 原始需求文档：[抽奖功能.pdf]
- UI设计参考：截图1（个人主页）、截图2（交易列表）
- 技术文档：Lovable Cloud官方文档
- 竞品分析：Twitter Giveaways, Discord Events

### C. 变更记录
| 版本 | 日期 | 变更内容 | 负责人 |
|------|------|---------|--------|
| v1.0 | 2025-11-30 | 初始版本，完成MVP需求定义 | AI Product Manager |

---

**文档状态**：✅ 已确认  
**最后更新**：2025-11-30  
**下一步行动**：开始架构设计和技术选型
