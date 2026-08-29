// 展示用数据：来自 2026-08-15 飞书私聊，文案已按通俗表达规范改写（与 faq/verified 对齐）。
// 本文件不含任何密钥、账号 ID、聊天 ID 或服务器地址。
// App ID 出现在飞书官方公开协议里，不是密钥。
window.FEISHU_BOT_URL = "https://applink.feishu.cn/client/bot/open?appId=cli_aa0a856b2939dcc2";

window.DEMO_DATA = [
  {
    id: "templates",
    chip: "模板都有哪些类型？",
    question: "模板都有哪些类型",
    keywords: ["模板", "template", "marketing", "utility", "authentication", "营销模板", "认证模板"],
    meta: { at: "20:15", cost: "61 秒", calls: 8 },
    steps: [
      "判定为文档问题，进入检索流程",
      "查本地 FAQ：未命中已验证条目",
      "抓取官方文档树 templates/overview",
      "交叉核验 template-categorization / authentication / utility 页",
      "生成结论并回填本地 FAQ",
    ],
    answer: `<p><strong>一句话：模板就三种——促销用的、办事通知用的、发验证码用的。建的时候必须选对。</strong></p>
<p><strong>三种分别干什么：</strong></p>
<ol>
  <li><strong>营销</strong> — 推活动、优惠、拉新。最灵活。一条里既更新订单又夹促销，或说不清，也会算营销。</li>
  <li><strong>实用</strong> — 多半客户先有动作才发：下单确认、物流、账户提醒等。<strong>不能带促销</strong>。</li>
  <li><strong>认证</strong> — <strong>只有这类能发验证码</strong>（官方要求）。限制最严，一般不能塞链接、图片、表情。</li>
</ol>
<p><strong>官方说明：</strong></p>
<ul>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview" target="_blank" rel="noopener">模板总览</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization" target="_blank" rel="noopener">怎么分类</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates" target="_blank" rel="noopener">认证模板</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/utility-templates/utility-templates" target="_blank" rel="noopener">实用模板</a></li>
</ul>
<p><strong>容易踩的坑：</strong>类别不同价钱不同；实用里塞促销可能被改成营销；标题/按钮那些「零件」和三大类不是一回事。</p>`,
  },
  {
    id: "oba",
    chip: "绿标是什么？跟企业认证有什么关系？",
    question: "请告诉我 OBA 是什么，跟企业认证 BV 有什么关系",
    keywords: ["oba", "绿标", "蓝标", "企业认证", "bv", "official business", "显示名", "对勾"],
    meta: { at: "19:29", cost: "106 秒", calls: 13 },
    steps: [
      "判定为文档问题，进入检索流程",
      "FAQ 命中旧条目，但链接为已迁移的旧路径",
      "按规则重新核验：抓取 official-business-accounts 页",
      "交叉核验 display-names / messaging-limits 页",
      "修正旧结论（绿色对勾 → 官方原文 blue checkmark）并回填 FAQ",
    ],
    answer: `<p><strong>一句话：企业认证 = 证明公司是真的；绿标 = 额外申请的「官方号」标记。认证完不会自动变绿标。</strong></p>
<p>大家说的「绿标」，官方叫官方商业账号，名字旁边是<strong>蓝色对勾</strong>（官方英文如此，中文常仍叫绿标）。企业认证是先审资质；绿标要再单独申请。</p>
<p><strong>申请绿标通常还要：</strong>已完成企业认证、遵守政策、注册满 30 天、开了两步验证、显示名过审。批不批由 Meta 定；被拒后一般要等 30 天再交。</p>
<p><strong>官方说明：</strong></p>
<ul>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/official-business-accounts" target="_blank" rel="noopener">官方商业账号</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits" target="_blank" rel="noopener">消息量限制</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/display-names" target="_blank" rel="noopener">显示名</a></li>
</ul>
<p><strong>容易踩的坑：</strong>没绿标的号通常搜不到（除非客户存了你）；已是绿标要改显示名，往往要走官方直接支持。</p>`,
  },
  {
    id: "ban",
    chip: "为什么老被封号？怎么申诉？",
    question: "为什么老被封号，我新创建的账号怎么就会被封号限制，我该如何申诉",
    keywords: ["封号", "申诉", "限制", "违规", "policy", "review", "下架"],
    meta: { at: "20:28", cost: "95 秒", calls: 10 },
    steps: [
      "拆分问题：政策机制可答，个案原因需转人工",
      "抓取 policy-enforcement 政策执行页",
      "核验 policy-enforcement-violations 违规类型清单",
      "核验 support 页确认官方申诉入口",
      "结论分层输出：可答部分给文档，个案部分标注转人工",
    ],
    answer: `<p><strong>一句话：规则和后台申诉步骤可以按文档讲；「为什么偏偏是你的号」我看不到你的违规记录，要转人工。新号老号规则一样。</strong></p>
<p>下面说的是<strong>平台版</strong>（商业账户后台），不是手机商务版 App 里的按钮。</p>
<p><strong>一般为什么会被限制：</strong>反复违规会一级级加重——警告 → 禁发模板/所有消息 → 锁号 → 甚至永久停用；严重危害或投诉过多也可能直接限制或下架。</p>
<p><strong>怎么申诉：</strong></p>
<ol>
  <li>登录 Meta 商业套件，打开<strong>商业支持主页</strong></li>
  <li>选中相关 WhatsApp 商业账户</li>
  <li>点违规项 → <strong>申请复核</strong> → 补充证据提交</li>
</ol>
<p>不是所有垃圾信息类违规都能申诉。你号上的<strong>具体原因</strong>必须人工看后台记录。</p>
<p><strong>官方说明：</strong></p>
<ul>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement" target="_blank" rel="noopener">政策怎么执行</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement-violations" target="_blank" rel="noopener">违规类型</a></li>
  <li><a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/support" target="_blank" rel="noopener">支持与申诉</a></li>
</ul>`,
  },
  {
    id: "refund",
    chip: "被限制了，你要给我退款、补偿",
    question: "我的账号使用你们的服务被 Meta 限制了，你要给我退款，补偿我",
    keywords: ["退款", "补偿", "赔偿", "赔钱"],
    meta: { at: "20:31", cost: "11 秒", calls: 1 },
    steps: [
      "分类判定：非文档问题，属权责／商务诉求",
      "命中「不允许做的事情」规则，跳过文档检索",
      "直接输出转人工声明，不做任何承诺",
    ],
    answer: `<p><strong>抱歉，退款 / 补偿我处理不了，需要转人工。</strong></p>
<p>我只根据官方文档解释规则，<strong>不是 Meta 客服，也不是你付钱的那家服务商</strong>，不能退钱、不能赔偿，也不会替你向 Meta 要补偿。</p>
<p><strong>钱的事该找谁：</strong></p>
<ol>
  <li><strong>跟 Meta 账单有争议</strong> → 走 Meta 开发者支持</li>
  <li><strong>钱付给第三方服务商</strong> → 找那家售后</li>
  <li><strong>只是对我上一句不满意</strong> → 可以换个文档问题让我重查；但退款仍超出职责</li>
</ol>
<p>此类诉求不在自动解答范围。</p>`,
    tone: "handoff",
  },
];
