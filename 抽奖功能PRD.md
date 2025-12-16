# 抽奖功能产品需求文档 (PRD) v1.7

## 📋 一、概述

### 核心价值
- **平台运营**：提升用户活跃度和留存率，建立健康的社交生态
- **VIP创作者**：通过抽奖活动吸引和维护粉丝群体，提升个人影响力
- **普通用户**：通过关注喜爱的VIP获得奖品机会，享受参与乐趣

### 上线目标
在**2025年12月20日前**，以便支持双节活动上线。

### 关注
本期设计实现方案时，应考虑拓展性，即未来能相对容易的兼容平台新增其他游戏的抽奖活动。

---

## 👥 二、用户角色

### 1. VIP用户（抽奖发起者）
**画像**：平台活跃的内容创作者、交易大户、社区意见领袖

**核心需求**：快速创建抽奖活动，选择奖品和设置规则，简化的定时开奖机制；通过抽奖吸引新粉丝关注 

### 2. 普通用户（参与者）
**画像**：平台活跃用户，对游戏道具有需求，喜欢社交互动

**核心需求**：快速发现感兴趣的抽奖活动，一键参与抽奖（自动关注VIP）；查看自己参与的抽奖记录，了解结果与状态

### 3. 平台运营
**核心需求**：手动审核和授予VIP权限；后续数据分析和运营决策支持

---

## 🎯 三、功能需求拆分

### 前置条件（基础设施）

| 功能模块 | 功能描述 | 技术要点 |
|---------|---------|---------|
| **用户角色和权限分级** | 安全的角色权限管理 | 不同用户的功能权限区分 |
| **奖品库** | 道具、token数据管理 | 包括道具和token，及对应名称、图片、数量、价值等交易关键字段 |
| **关注系统** | 用户关注关系 | user_follows表，支持关注/取关 |

### P0：核心功能与逻辑

**主要流程**
<img width="1529" height="454" alt="局部截取_20251208_123956" src="https://github.com/user-attachments/assets/5060031f-0a6c-4e12-a534-a71d057ce037" />

**抽奖卡片示例**
<img width="1405" height="412" alt="局部截取_20251211_172932" src="https://github.com/user-attachments/assets/57a5b504-e351-4e52-b3b1-718ea5a7eb28" />


#### 抽奖活动生命周期-状态定义
```
创建 → 进行中 → 开奖 → 已开奖 → 已交接/过期失效

状态说明：
- created: 刚创建，未开始 → "UPCOMING"
- ongoing: 进行中，即处于报名参与期 → "ONGOING"
- drawing: 正在开奖（锁定状态，不支持报名）——待讨论，如抽奖过程极短，不需要展示抽奖过程，则无需该状态
- ended: 已开奖，不管是否完成奖品交接都进入此状态 → "ENDED"
- completed: 已交接，任一方（发奖者或中奖者）完成确认交接即变更为此状态 → "COMPLETED"
- expired: 过期失效，开奖后14天内双方均未确认交接，则自动变为此状态 → "EXPIRED"
- （后续-支持取消）cancelled: 已取消 → "CANCELLED"

ex：
created → ongoing 切换时点 = 报名开始时间
ongoing → ended 切换时点 = 报名结束时间 = 开奖时间

状态互斥规则：
- ended与completed/expired互斥：开奖后先进入ended状态
- completed与expired互斥：以是否完成交接区分，只能存在一个
```
注意：
- 前端外显的状态名称只有"UPCOMING/ONGOING/ENDED"；completed/expired主要作为后端内部状态，不影响前端状态标签展示，开奖后统一显示"ENDED"（具体展示逻辑按下方页面、卡片的详细要求）
- 所有外显的时间应统一，与value一样都需要转为UTC时间


以下为具体功能与逻辑：

#### 1. 个人主页-动态Tab中的Giveaway展示
视觉稿：https://www.figma.com/design/0M4JNzqICab4h3Vcewm8RZ/user?node-id=5263-6647&p=f&t=LzMgNh2IDsqyxOzC-0

> **说明**：个人主页动态Tab用于展示用户的抽奖活动，包括创建的抽奖和参与的抽奖。本期动态Tab文案暂时使用"Giveaways"。

##### 1.1 展示内容与布局
- 使用 `GiveawayCard` 卡片组件
- 卡片布局：瀑布流式长条卡片，响应式
- 支持数字分页切换（使用组件），默认单页8个活动
- 按开奖时间倒序排列（越早的排下方），不同状态的抽奖展示对应状态标签

##### 1.2 分类展示与空状态

**分类展示规则**：
- 始终展示两个独立区域："Participated"/"Published" 
- 两个区域各自独立处理空状态；每个区域有独立的分页
- 用户以主人态/访客态进入用户主页时，默认优先展示Giveaways的Participated tab内容

**分类说明**：
- **"Participated"**：该用户参与的抽奖活动
  - 主态：展示自己参与的抽奖，标题 "Participated Giveaways"
  - 客态：根据隐私设置决定是否可见，标题与上同
- **"Published"**：该用户创建的所有抽奖活动
  - 主态：展示自己创建的抽奖，小标题 "My Giveaways"
  - 客态：展示该用户创建的抽奖，根据隐私设置决定是否可见，标题 "[Username]'s Giveaways"
    
**布局说明**：
```
+-------------------------------------------------------------+
| [Participated] [Published]  ← 二级Tab切换                   |
+-------------------------------------------------------------+
| （主客态小标题）Participated Giveaways                       |
| [GiveawayCard]...                                           |
| 或 空状态提示                                                |
+-------------------------------------------------------------+
| （主态小标题）My Giveaways / （客态）[Username]'s Giveaways  |
| [GiveawayCard] ...                                          |
| 或 空状态提示                                                |
+-------------------------------------------------------------+

```

**空状态文案**：（无数据时的兜底）
| 区域 | 主人态空状态 | 访客态空状态 |
|------|-------------|-------------|
|发起抽奖(Published) | "No giveaways yet. Start your first one!" + 「CREATE GIVEAWAYS」按钮 | "No giveaways from this user yet." |
|参与的抽奖(Participated) | "You haven't joined any giveaways yet." + 「CHECK GIVEAWAYS」 | "No participated giveaways." + 「CHECK GIVEAWAYS」按钮|

- 「CREATE GIVEAWAYS」按钮:（交互见1.3部分）
- 「CHECK GIVEAWAYS」按钮：点击跳转giveaway聚合页


##### 1.3 创建抽奖与权限检查

> **说明**：VIP角色和抽奖功能权限由运营在管理后台授予，普通用户可通过Discord频道申请。

**点击创建流程**（主人态-Published区域）：
1. 用户点击「CREATE GIVEAWAYS」按钮
2. 系统检测用户是否有 `create_giveaway` 权限
3. **有权限**：进入创建抽奖流程，拉起创建抽奖弹窗（见1.4节）
4. **无权限**：弹窗提示需申请，引导跳转Discord频道申请
   <img width="960" height="374" alt="局部截取_20251211_174823" src="https://github.com/user-attachments/assets/cc43321a-45d8-43e5-8fc4-dee02aaefc22" />

   - 弹窗标题：Want to Host Giveaways?
   - 描述：Ready to share amazing items with the community? Apply for giveaway permission on our Discord - only takes minutes!
   - 按钮：Maybe Later（取消） / Go to Discord（确认）     

- **审核流程**：用户在Discord频道提交申请，平台运营人工审核，通过后由运营在管理后台为用户添加抽奖权限


##### 1.4 VIP抽奖发起
- **创建抽奖活动**：拉起抽奖配置弹窗

**创建抽奖弹窗设计**
 <img width="1155" height="714" alt="局部截取_20251211_173304" src="https://github.com/user-attachments/assets/2e1971d6-7de5-4689-a9fb-2eecf84f7fb1" />

文案如下：
```
+-------------------------------------------------------------+
|                    Create Giveaway                           |
|                           ✕                                 |
+-------------------------------------------------------------+
| Prize *                                                      |
| [Select Prize]  ← 点击拉起道具选择器                          |
| (Choose 1 item or any tokens as the prize)                   |
+-------------------------------------------------------------+
| Entry Period *                                             |
| Start Time: [Date Picker] [Time Picker]                   |
| End Time:   [Date Picker] [Time Picker]                    |
| ⚠️ End time must be within 30 days from now                |
+-------------------------------------------------------------+
| Draw Time                                                    |
| [Auto-generated based on entry end time]  (只读，不可修改)    |
+-------------------------------------------------------------+
| Title *                                                      |
| [Enter giveaway title...]                                    |
| (Max 50 characters)                                          |
+-------------------------------------------------------------+
| Description                                                  |
| [Describe your giveaway...]                                  |
| (Optional, max 200 characters)                               |
+-------------------------------------------------------------+
| Entry Requirement                                          |
| Follow you to participate (Default)  (只读，不可修改)       |
+-------------------------------------------------------------+
| Related Campaign                             |
| [Select Campaign ▼]                                          |
| (Link to an ongoing platform campaign)                       |
+-------------------------------------------------------------+
|                    [CANCEL]    [CONFIRM]                    |
+-------------------------------------------------------------+
```

**字段说明：**
| 字段 | 必填 | 说明 |
|-----|-----|-----|
| Prize | ✅ | 使用道具选择组件，支持token或普通道具（选择道具->选择道具参数，选择参数弹窗中的数量选择需要禁用，因为1个抽奖只能有1个道具或者token x 若干数量） |
| Title | ✅ | 活动标题，限50字符 |
| Description | ❌ | 活动描述，限200字符 |
| Entry Period | ✅ | 报名时间段，精确到分钟 |
| Draw Time | 自动 | 根据报名截止时间自动生成，不可修改 |
| Related Campaign | ❌ | 下拉选择运营预配置的活动名称，本期只有一个"Christmas & New Year"；也可不选 |
| Entry Requirement | 默认 | 本期固定为"关注发奖者"，不可更改 |

**时间限制**：报名截止时间/开奖时间不能超过创建时间起30天，以保持活动节奏

- **编辑或取消抽奖活动**：mvp阶段先不支持取消或编辑抽奖，后续再加-如报名开始之前可支持取消或修改
 

#### 2. 用户参与抽奖
- **发现抽奖入口**
  - 首页顶部giveaway数量拉取入口（支持点击）、活动页（giveaway聚合页）的抽奖列表；用户主页的tab（已参与抽奖）

- **参与流程**
  1. **抽奖卡片点击参与按钮**：跳转至抽奖详情页（非抽奖报名时间段有其他按钮状态，详见第6、7节）
  2. **抽奖详情页**：抽奖信息、参与条件等
  3. **详情页点击「JOIN NOW」**：直接完成参与（无确认弹窗）
  
  - **未登录用户**：点击任意卡片中的「JOIN NOW」后跳转抽奖详情页，如继续点击详情页的「JOIN NOW」，则拉起登录/注册流程，登录完成后自动返回继续参与流程
  - **已登录用户**：点击详情页「JOIN NOW」后直接提示参与成功

- **参与成功后**：
  - 未关注则自动关注VIP
  - 获得粉丝铭牌（`[Avatar] Fan`样式，14天有效期）（P1-MVP版本不加粉丝铭牌）
  - 已关注则直接参与成功
  - 展示参与成功提示Toast："You're in! 🎉 Good luck!"
  - 详情页按钮状态变更为「JOINED」；卡片的按钮变为「VIEW + Joined（状态）」

- **参与记录**
  - 个人中心：我参与的抽奖列表、抽奖活动状态

##### 2.1 参与条件
```
1. 用户必须已登录账号（未登录则先跳转登录页，登录后自动返回）
2. 用户必须关注该VIP（未关注则自动关注）
3. 抽奖活动处于"进行中"状态
4. 用户未重复参与同一抽奖
5. 用户并非该抽奖的创建者
```


##### 2.1 **粉丝铭牌（Fan Badge）**  （P1-MVP版本不加粉丝铭牌）
获取方式: 用户通过参与抽奖自动关注VIP时，获得该VIP的粉丝铭牌。
英文名称：Fan Badge

##### 展示样式
```
+-------------------+
| [VIP头像] Fan     |
+-------------------+
```
- 样式：圆形小头像 + "Fan" 文字
- 头像尺寸：与其他标签高度一致
- 点击行为：点击后跳转至该VIP的用户主页

##### 有效期
- 默认有效期：从获得之日起**14天**
- 过期后自动隐藏，不再展示

##### 展示位置与规则
粉丝铭牌与用户身份标签展示在同一位置：
1. **身份标签**（如Official等）固定在第一位
2. **粉丝铭牌**按获得时间倒序排列
3. **显示上限**：与其他标签一起计算总数（下方为标签总数），保持原有逻辑
   - 个人主页：最多8个（超出不展示）
   - 其他场景：最多3个（超出不展示）

##### 设计要点
- 视觉上需与身份标签有所区分，体现趣味性和社交属性；头像使设计上有辨识度，吸引其他用户点击查看。鼓励用户通过参与多个抽奖收集不同VIP的粉丝铭牌


#### 3. 定时开奖**
- **自动开奖机制**
  - 支持设定抽奖的报名时间范围，到报名时间截止时即为开奖时间，到时自动触发抽奖/开奖（同时）
  - 随机算法抽取获奖者（已关注且参与的用户，所有用户中奖机率相同；未来可考虑引入积分体系，增加中奖机率，本期不用）
  - 本期不校验开奖时用户是否仍要在关注中

- **开奖逻辑（MVP-定时开奖）**：
  1. 到达设定时间自动触发
  2. 检查有效参与者（已关注+已参与）
  3. 随机抽取指定数量获奖者
  4. 生成中奖记录
  5. 触发机制化的中奖通知
  6. 更新抽奖状态为`ended`

- **无参与者时的处理**：
  - 抽奖状态仍变为`ended`
  - 无中奖者记录生成
  - 不发送任何通知

- **未中奖用户处理**：保留参与记录


#### 4. 中奖通知与领取
**开奖后系统行为**：
```
开奖完成后，系统自动执行以下操作：

1. 创建中奖记录
2. 发送站内通知给中奖者（系统消息）
3. 发送站内通知给发奖者（系统消息）
4. 自动创建发奖者与中奖者的聊天会话（参考交易成功时拉起聊天的逻辑）

``` 
- **奖品领取**：双方通过聊天沟通游戏中奖品交接，并上传确认交接的截图
  

**领奖与交接流程** 集成聊天系统

##### 4.1.1 系统消息通知
视觉稿：https://www.figma.com/design/oS9Yg9snhnkrTR3QF8f0Bf/chat?node-id=2959-6485&p=f&t=U1GMg1ovQKnzPysj-0

<img width="488" height="364" alt="局部截取_20251211_190846" src="https://github.com/user-attachments/assets/0e87f47f-8163-4c82-841c-69c9ab8f75fa" />

仅中奖者和发奖者收到，其他未中奖参与者在个人中心查看参与的抽奖状态。

发送到「System Message」频道，采用橙色(或其他醒目颜色)主题卡片样式：
**发奖者（抽奖创建者）收到的通知：**
```
🎉 Giveaway Draw Completed!                    [时间戳]
Your giveaway "[标题]" has been drawn successfully!
Winner: [中奖者用户名]
Please deliver the prize in-game in **14 days** and confirm handover.
Big thanks from Tradekitsune!

[VIEW DETAILS(抽奖详情页入口)]
```

**中奖者收到的通知：**
```
🎊 Congratulations! You Won!                   [时间戳]
You won "[奖品名称]" from [发奖者用户名]'s giveaway!
Please contact the host to receive your prize in **14 days**.
Claim Deadline: [Date Time]

[VIEW DETAILS]
```

##### 4.1.2 用户聊天会话
<img width="1340" height="433" alt="局部截取_20251211_190931" src="https://github.com/user-attachments/assets/136e6b28-1694-4a3a-a6a5-ec39ab175667" />

（Show Less/More的折叠与展开功能在聊天页优化中包含，MVP版本可不开发）

- 系统自动创建发奖者与中奖者的一对一聊天，包含抽奖主要信息卡片，并展示领奖倒计时
- 从开奖算起超过14天即过期，不支持再领奖：一对一聊天消失，仅在用户中心中能查看参与的抽奖卡片，按钮状态变为「VIEW + Expired（状态）」
```
+-------------------------------------------------------------+
| 信息展示区                                               |
+-------------------------------------------------------------+
| Prize Delivery                                               |
| Please complete the prize delivery in-game within 14 days, then upload a screenshot to **CONFIRM HANDOVER**.|
|                              [UPLOAD]                       |
+-------------------------------------------------------------+
```

**抽奖信息展示区域说明：**
- Giveaway名称：支持点击跳转giveaway详情页
- 奖品图片：显示中奖的道具，交互与交易格子中道具、token一致（hover信息卡片、弹窗）
- 中奖者名称:"Winner: [中奖者]"
- 中奖时间
  

##### 4.1.3 确认交接弹窗
发奖者与中奖者均可点击"确认交接"按钮，在弹窗中上传交接截图（发奖者必须上传图片，中奖者可选），并输入一句话（可选）。
如一方已完成确认交接，则ta自己所有场景的卡片中"UPLOAD"按钮变为「VIEW + Handover Confirmed（状态）」。不影响另一方的按钮状态。
注意：用户中心中的抽奖卡片的操作按钮状态与这里联动，任一地方操作，均统一切换状态。

**弹窗UI设计**
```


+-------------------------------------------------------------+
|                    Confirm Prize Handover                    |
|                           ✕                                 |
+-------------------------------------------------------------+
|  Example Screenshots
|  截图示例文案+图片（支持点击放大）
| e.g. Photo with item / Trade screen
+-------------------------------------------------------------+
| Upload Screenshot *                                          |
| [拖拽上传 或 点击选择图片]                                  |
| Max 5 MB
+-------------------------------------------------------------+
| Warm Words to [中奖者/发奖者昵称] (Optional)                 |
| [(文本输入框) Max 100 characters]                                      |
+-------------------------------------------------------------+
|                    [CANCEL]    [CONFIRM]                     |
+-------------------------------------------------------------+
```

#### 4.2 领奖有效期与过期失效机制

##### 领奖有效期
- **有效期**：开奖后14天内
- **生效条件**：任一方（发奖者或中奖者）完成确认交接操作即视为交接完成

##### 过期失效规则
如果开奖后14天内双方均未操作确认交接，系统自动执行以下操作：

1. **抽奖状态变更**：从`ended`变为`expired`
2. **聊天会话失效**：发奖者与中奖者的对话窗口自动消失/隐藏
3. **系统通知清除**：中奖提示的系统通知消失（mvp先不做这一项）
4. **入口失效**：用户中心中抽奖卡片的确认交接入口变化，由VIEW + UPLOAD 变成 VIEW + Expired（状态）
5. **中奖者失去领奖资格**：不再支持领取奖品

##### 用户提示
- 在参与确认弹窗中需展示领奖有效期说明："Prize must be claimed within 14 days after draw."
- 在中奖通知中明确标注领奖截止时间："Claim Deadline: [Date]"


#### 5. Giveaway聚合页面
URL规则：/growagarden/giveaways/

本期与双节活动需求合并，即常规Giveaway列表页基础上增加活动模块，待活动结束后可下线活动模块，聚合展示日常Giveaways（具体见Jiaming需求单）


#### 6. Giveaway详情页
URL规则：/growagarden/giveaways/抽奖标题slug
视觉稿：https://www.figma.com/design/9Zg2tQV0fIFZu3GgNmtwjl/giveaways?node-id=8011-1845&p=f&t=N2QYqOhQOgCqozwc-0
<img width="598" height="260" alt="局部截取_20251211_184140" src="https://github.com/user-attachments/assets/45fb1e37-7940-4529-9e1f-e82eb8324cc5" />

##### 6.1 页面布局

<img width="896" height="677" alt="image" src="https://github.com/user-attachments/assets/0a3e708c-095f-43df-b2ac-315d7b40eb7f" />
<img width="840" height="798" alt="局部截取_20251211_154321" src="https://github.com/user-attachments/assets/d719ac80-ae92-48d4-862d-9ea296f2934d" />


##### 6.2 详情页字段说明
（字段具体位置以视觉设计稿为准，字段序号可忽略）

| 序号 | 区域 | 字段 | 说明 |
|:---:|-----|-----|-----|
| 1 | **导航** | 面包屑 | Giveaway / [抽奖标题] |
| 6 | **头部** | 状态标签 | UPCOMING / ONGOING / ENDED（前端仅显示这3种） |
| 7 | | 倒计时 | 见下方详细逻辑 |
| 7 | | 标题 | 完整展示 |
| 8 | | 描述 | 完整展示 |
| 9 | | 分享按钮 | SHARE，始终可见。点击分享详情页，复用已有分享逻辑 |
| 10 | **奖品区域** | 奖品图片 | 大图（优先用优化后宠物大图，如无则使用普通宠物图片）展示，hover信息卡片，点击可查看道具详情弹窗 |
| 11 | | 奖品名称 | 🎁 [道具名称/Token] |
| 12 | | 奖品价值 | Prize Value: [价值对应的token数量/value值] ，如为token则展示token数量和对应的value值（见视觉稿示意）|
| 13 | | 宠物属性 | 变异、年龄、重量（仅宠物类道具显示） |
| 14 | **操作区域** | 按钮 | COMING SOON / JOIN NOW / JOINED / ENDED（详见6.3状态表） |
| 15 | | 参与提示 | 仅需在ONGOING状态时展示："✓ Get notified if you win"  "✓ Auto-folow 发奖者名称" |
| 16 | **开奖时间 Draw Time** | 时间点 |文案：抽奖的[日期时间] |
| 17 | **报名时间 Entry Period** | 时间范围 |具体时间拼接文案：报名开始的[日期时间] - 报名结束的[日期时间] |
| 2 | **发奖者 Host** | 发奖用户信息 | 下方圆形头像，可点击跳转用户主页 |
| 3 | | 用户名 | 可点击跳转用户主页 |
| 4 | | 用户标签 | 最多显示8个标签，交互与展示逻辑和其他标签一致 |
| 2 | **活动 Campaign** | 关联活动 | 活动名称 "Christmas & New Year" |
| 20 | **参与者 Participants** | 参与人数 | 仅报名开始前不展示该区域|
| 21 | | 参与者头像 | 报名开始但无参与者时显示"Be the first to join!"；有参与者时展示"XX users(注意单复数) joined" +图像，最多10个头像 + "总人数" |
| 22 | **中奖者介绍 Winner** | 中奖信息 | 整个区域在开奖d后显示 |
| 23 | | 中奖者 | 用户名+头像，两者均支持点击跳转用户主页 |
| 25 | | 用户标签 | 逻辑复用 |
| 24 | | 中奖时间 | Won on: [日期时间] |
| 26 | **交接展示** | 截图与留言 | 已完成交接时才显示（任一方上传了截图），否则隐藏整个区域；标题"Prize Handover Complete!"，描述文案"Another successful giveaway on Tradekitsune!" |
| 28 | | 截图 | 可点击放大 |
| 27 | | 留言 | 最多100字符 |
| 27 | | 来自xx | "From [发奖者]/[中奖者]" |
| 30 | **推荐模块 Discover More Giveaways** | 推荐抽奖 | 使用抽奖列表组件；最多3条，优先展示ONGOING，其次UPCOMING，开奖时间or报名开始时间越近的展示在上方；无符合条件的（表内所有抽奖均已开奖）则隐藏整个模块。点击标题行和底部More按钮，跳转至giveaway聚合页；卡片交互统一（组件） |

**倒计时的逻辑**：该逻辑在giveaway详情页和giveaway卡片中复用。

<img width="563" height="258" alt="局部截取_20251211_121725" src="https://github.com/user-attachments/assets/2a0984a6-4590-431a-996d-d7272ab7e061" />

文案：created(待开启报名时):"Starts in Xd Xh Xm"；ongoing（报名期间）:"Ends in Xd Xh Xm"；ended:不显示

##### 6.3 不同状态下的详情页差异

| 状态 | 用户角色 | 操作按钮 | 中奖者区域 | 交接区域 |
|-----|---------|---------|---------|---------|
| created | 所有人 | COMING SOON (disabled) | 隐藏 | 隐藏 |
| ongoing | 未参与 | JOIN NOW | 隐藏 | 隐藏 |
| ongoing | 已参与 | JOINED (disabled) | 隐藏 | 隐藏 |
| ended | 所有人 | ENDED (disabled) | 显示中奖者 | 隐藏 |
| completed | 所有人 | ENDED (disabled) | 显示中奖者 | 显示截图和留言 |
| expired | 所有人 | ENDED (disabled) | 显示中奖者 | 隐藏 |

> **注意**：详情页不提供UPLOAD入口，交接确认操作仅在**个人中心卡片**和**1v1聊天**中进行。

#### 7. 抽奖卡片
视觉稿：https://www.figma.com/design/4mDwVh4lJ2t1Yy7EcINY5t/UI-Kit?node-id=4747-99&p=f&t=yWnkGrXuQAV1tfQg-0

<img width="1025" height="353" alt="局部截取_20251211_154935" src="https://github.com/user-attachments/assets/80a30579-fb69-4674-a1bd-34ed1c1211df" />
<img width="1039" height="317" alt="局部截取_20251211_155138" src="https://github.com/user-attachments/assets/8729e015-849e-4cf4-90c8-549461b1d9b8" />

##### 7.0 卡片字段说明
（字段展示位置以视觉设计稿为准，字段序号可忽略）
**如下方无特殊说明，则该字段与详情页中展示、交互逻辑一致，复用即可**

| 序号 | 字段 | 说明 |
|:---:|-----|-----|
| 1 | 奖品图片 | 同详情页 |
| 2 | 状态标签 | 同详情页 |
| 3 | 标题 | 抽奖标题，限50字符 |
| 4 | 倒计时 | 同详情页 |
| 5 | 奖品名称 | "Prize:[道具名称/Token]" |
| 6 | 奖品价值 | "Prize Value: [价值对应的token数量/value值]" ，token和道具展示效果一样（见视觉稿示意） |
| 7 | 开奖时间 | Draw Time: [日期时间] |
| 8 | 报名时间段 | Entry Period: [start_time] - [draw_time] |
| 9 | 描述 | 大屏最多1行，中小屏最多2行，超长则显示... |
| 10 | 参与人数 | 报名未开始时不展示；报名开始但无参与者时显示"Be the first to join!"；有参与者时展示"XX users(注意单复数) joining!" |
| 11 | 发奖者信息 | 头像 + "Hosted by [发奖者名称]"+标签（最多3个） |
| 12 | 中奖者信息 | 仅ended后显示：头像 + "Won by [中奖者名称] |
| 13 | 操作按钮 | 详见7.1-7.2状态表 |
| 14 | 分享按钮 | SHARE，始终可见。点击后拉起分享组件，但分享内容不是当前页面，而是该抽奖对应的giveaway详情页信息/OG |

> **交互**：卡片整体也可点击，跳转至抽奖详情页。


【按钮与状态】
详情页按钮与卡片按钮的关系：
- **卡片（列表中）**：主按钮统一为 VIEW（引导进入详情页）或VIEW + UPLOAD (交接操作)，下方附带状态标签（Joined/Handover Confirmed/Expired）
- **详情页（落地页）**：从卡片进入后，显示实际操作按钮（JOIN NOW、JOINED、ENDED等）


##### 7.1 主态（我创建的抽奖）操作按钮
该卡片属于某用户创建的情况下，在各个展示场景（（用户中心、聚合页、个人主页等）都统一用这部分逻辑，不需要区分页面（并非指卡片按钮与详情页中一致）。

| 抽奖状态 | 交接状态 | 按钮文案 | 可操作 | 说明 |
|---------|---------|---------|:------:|-----|
| created | - | VIEW | ✅ | 查看详情 |
| ongoing | - | VIEW | ✅ | 查看详情 |
| ended | pending | VIEW + UPLOAD | ✅ | VIEW查看详情，UPLOAD点击拉起交接弹窗 |
| ended | 对方已确认 | VIEW + UPLOAD | ✅ | VIEW查看详情，UPLOAD点击拉起交接弹窗 |
| completed | 我已确认 | VIEW + Handover Confirmed（状态） | ❌ | VIEW可点击，Handover Confirmed仅为状态体现 |
| expired | - | VIEW + Expired（状态） | ❌ | VIEW可点击，Expired仅为状态体现 |

##### 7.2 主态（我参与的抽奖）操作按钮
用户参与了某抽奖的情况下，在各个场景该抽奖对应卡片都统一用这部分的逻辑，不需要区分页面

| 抽奖状态 | 是否中奖 | 交接状态 | 按钮文案 | 可操作 | 说明 |
|---------|---------|---------|---------|:------:|-----|
| ongoing | - | - | VIEW + Joined（状态） | ✅ | VIEW可点击，Joined仅为状态体现 |
| ended | 否 | - | VIEW | ✅ | 查看详情 |
| ended | 是 | pending | VIEW + UPLOAD 双按钮 | ✅ | VIEW查看详情，UPLOAD点击拉起交接弹窗 |
| ended | 是 | 对方已确认 | VIEW + UPLOAD 双按钮 | ✅ | VIEW查看详情，UPLOAD点击拉起交接弹窗 |
| completed | 是 | 我已确认 | VIEW + Handover Confirmed（状态）  | ❌ | VIEW可点击，Handover Confirmed仅为状态体现 |
| expired | 是 | - | VIEW + Expired（状态）  | ❌ | VIEW可点击，Expired仅为状态体现 |

**状态联动规则**：
1. **统一状态源**：所有场景中UPLOAD按钮状态**共享同一数据源**（giveaway_handovers表）
2. **实时同步**：任一入口完成upload交接操作，所有入口按钮状态同步更新
3. **过期处理**：过期后自动upload操作按钮变为"Expired"状态


##### 7.3 卡片的基础逻辑
用户在未参与抽奖和未创建抽奖的情况下，通用按钮状态如下：

| 文案与状态 | 使用场景与条件 |
|---------|---------|
| VIEW | 已创建(未到开奖时间)/已开奖（包括开奖后所有状态）；点击跳转详情页 |
| JOIN NOW | 可参与时；点击跳转详情页 | 

---

## 📋 四、Giveaway 字段表

> 本节抽象出 Giveaway 的完整字段，区分业务逻辑字段与展示字段，供不同场景（个人中心/用户主页tab中或抽奖列表中的长条形卡片、方形卡片、抽奖详情页）选择使用。

### 字段分类说明
- **业务逻辑字段**：后端存储、业务计算所需
- **展示字段**：前端UI展示所需，部分为计算/派生字段

### 字段表（非全部枚举，以下字段名、数据表仅作示意，具体由研发根据实际已有数据表和命名规则而定）

| 字段名 | 字段说明 | 业务逻辑 | 长条卡片 | 方形卡片(日历hover) | 详情页 | 备注 |
|--------|----------|:--------:|:--------:|:-------------------:|:------:|------|
| **基础信息** |
| id | 抽奖活动唯一标识 | ✅ | - | - | - | UUID |
| title | 活动标题 | ✅ | ✅ | ✅ | ✅ | 限制50字符 |
| description | 活动描述/说明 | ✅ | 摘要 | - | ✅完整 | 限制500字符 |
| status | 活动状态 | ✅ | ✅ | ✅ | ✅ | created/ongoing/drawing/ended/completed/expired/cancelled |
| **创建者信息** |
| ？？ | 创建者用户ID | ✅ | - | - | - | 关联user表 |
| creator_avatar | 创建者头像URL | - | ✅ | ✅ | ✅ | 从user表获取 |
| creator_name | 创建者用户名 | - | ✅ | ✅ | ✅ | 从user表获取 |
| creator_tags | 创建者标签 | - | ✅(3个+more) | - | ✅(最多8个) | 从user_tags表获取 |
| **奖品信息** |
关联token或道具数据表（需展示奖品名称、图片、value+token数量、宠物年龄、体重、变异；用道具信息卡片和弹窗）
| **时间信息** |
| created_at | 创建时间 | ✅ | ✅ | - | ✅ | 展示"X ago"格式 |
| draw_time | 开奖时间 | ✅ | ✅ | ✅ | ✅ | 定时开奖触发时间 |
| ended_at | 实际结束时间 | ✅ | - | - | ✅ | 开奖完成时间 |
| countdown_text | 倒计时文案 | - | ✅ | ✅ | ✅ | 计算字段："Ends in 2h 30m" |
| time_status | 时间状态标签 | - | ✅ | ✅ | - | "UPCOMING"/"ONGOING"/"ENDED" |
| campaign_tag | 关联活动标签 | ✅ | ✅ | ✅ | ✅ | 管理端配置，标签样式显示，不可点击 |
| **参与信息** |
| winner_count | 中奖人数上限 | ✅ | ✅ | ✅ | ✅ | 默认1 |
| participant_count | 当前参与人数 | - | ✅ | ✅ | ✅ | 计算字段 |
| is_participated | 当前用户是否已参与 | - | ✅ | - | ✅ | 运行时计算 |
| my_participation_time | 我的参与时间 | - | - | - | ✅ | 仅已参与时显示 |
| **中奖信息（已结束时）** |
| winners | 中奖者列表 | ✅ | - | - | ✅ | 关联giveaway_winners表 |
| winner_avatars | 中奖者头像 | - | ✅(最多3个) | - | ✅(全部) | 从user表获取 |
| winner_names | 中奖者用户名 | - | - | - | ✅ | 从user表获取 |
| is_winner | 当前用户是否中奖 | - | ✅ | - | ✅ | 运行时计算 |
| my_prize | 我的奖品信息 | - | - | - | ✅ | 仅中奖时显示 |
| claim_status | 领奖状态 | ✅ | - | - | ✅ | pending/claimed/expired |
| claim_deadline | 领奖截止时间 | ✅ | - | - | ✅ | 中奖后14天 |
| **交接信息（已中奖时）** |
| handover_status | 交接状态 | ✅ | - | - | ✅ | pending/handover_submitted/completed |
| giver_screenshot_url | 发奖者交接截图 | ✅ | - | - | ✅ | 发奖者必填 |
| giver_note | 发奖者交接备注 | ✅ | - | - | ✅ | 选填，限100字符 |
| winner_screenshot_url | 中奖者交接截图 | ✅ | - | - | ✅ | 中奖者选填 |
| winner_note | 中奖者交接备注 | ✅ | - | - | ✅ | 选填，限100字符 |
| can_confirm_handover | 是否可确认交接 | - | - | - | ✅ | 计算字段：已中奖且交接未完成 |
| **交互字段** |
| can_participate | 是否可参与 | - | ✅ | - | ✅ | 计算字段：状态ongoing且未参与 |
| action_button_state | 操作按钮状态 | - | ✅ | - | ✅ | enabled/disabled/loading |
| share_url | 分享链接 | - | ✅ | - | ✅ | 生成的分享URL |



## 📈 成功指标（MVP阶段）

### 核心指标
1. **抽奖活跃度**
   - 目标：平均每个抽奖吸引50+用户参与

2. **用户参与度**
   - 目标：聚合页列表中抽奖卡片曝光点击率 > 30%

### 数据监控
- 每日活跃抽奖数
- 用户参与次数
- VIP粉丝增长数
- 奖品发放成功率

---

## 📝 附录

### A. 术语表
- **VIP用户**：拥有平台特权的用户角色（团队成员、KOL、游戏开发者等），由运营在管理后台授予
- **普通用户**：平台默认角色，新注册用户自动分配
- **抽奖权限**：`create_giveaway` 功能权限，VIP用户默认拥有，普通用户可通过申请获得
- **主态**：用户查看自己创建的抽奖活动
- **客态**：用户查看他人创建的抽奖活动

### B. 参考资料
- 前置需求：「用户隐私设置PRD」（用户体系、角色、权限、标签）
- 原始需求文档：[抽奖功能.pdf]
- 竞品分析：Twitter Giveaways, Discord Events

### C. 变更记录
| 版本 | 日期 | 变更内容 | 负责人 |
|------|------|---------|--------|
| v1.0 | 2025-11-30 | 初始版本，完成MVP需求定义 | AI Product Manager |
| v1.1 | 2025-12-05 | 与用户隐私PRD对齐：更新角色体系、权限申请入口；新增Giveaway字段表、用户旅程与逻辑图 | AI Product Manager |
| v1.2 | 2025-12-08 | 新增奖品交接流程：聊天系统集成、确认交接弹窗、7天提醒机制、giveaway_handovers表 | AI Product Manager |
| v1.3 | 2025-12-08 | 新增关联活动字段（campaign_tag），管理端手动配置，标签样式展示 | AI Product Manager |
| v1.4 | 2025-12-09 | 重大更新：(1) 参与确认弹窗流程 (2) 粉丝铭牌设计 (3) 抽奖时间限制30天 (4) 领奖有效期14天 (5) 状态体系调整 (6) 关联活动下拉选择 (7) 过期失效机制 | AI Product Manager |
| v1.5 | 2025-12-09 | 文档精简：(1) 补充无参与者开奖处理逻辑 (2) 删除用户旅程与逻辑图章节 (3) 删除UI/UX设计方向章节 (4) 修正开奖状态流转逻辑 | AI Product Manager |
| v1.6 | 2025-12-09 | 全面补充英文展示文案：状态标签、按钮文案、Toast提示、空状态文案、交接模块文案等 | AI Product Manager |
| v1.7 | 2025-12-11 | 按钮状态统一：(1) 详情页按钮状态完善 (2) 交接按钮从CONFIRM HANDOVER改为UPLOAD (3) 明确UPLOAD入口仅在个人中心卡片和聊天中 (4) 详情页ended状态统一显示ENDED(disabled) | AI Product Manager |

---

**文档状态**：✅ 已确认  
**最后更新**：2025-12-09  

