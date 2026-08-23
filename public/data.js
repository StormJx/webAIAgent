// 展示用数据：全部来自 2026-08-15 飞书私聊的真实问答记录。
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
    answer: `<p><strong>WhatsApp 消息模板按类别（category）分为三种类型：marketing（营销）、utility（实用）、authentication（认证）。</strong> 官方规定每个模板创建时必须归入其中一类。</p>
<p><strong>官方文档来源：</strong></p>
<ul>
  <li>模板总览：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview" target="_blank" rel="noopener">templates/overview</a></li>
  <li>模板分类指南：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization" target="_blank" rel="noopener">template-categorization</a></li>
  <li>认证模板专页：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates" target="_blank" rel="noopener">authentication-templates</a></li>
  <li>实用模板专页：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/utility-templates/utility-templates" target="_blank" rel="noopener">utility-templates</a></li>
</ul>
<p><strong>三种类型速览：</strong></p>
<ol>
  <li><strong>Marketing（营销）模板</strong> — 最灵活的一类，用于品牌认知、促销优惠、再营销、App 推广、客户关系维护等。官方规定：混合内容（比如「订单更新 + 促销」）、内容不清晰的模板，也会被归为 marketing。</li>
  <li><strong>Utility（实用）模板</strong> — 通常由用户动作触发，如订单确认／物流更新、账户提醒、反馈调查等。判定标准是：<strong>必须非促销</strong>，且<strong>与用户订单／账户／交易相关，或对用户必需</strong>（如安全提醒）。</li>
  <li><strong>Authentication（认证）模板</strong> — 唯一可以发送一次性密码（OTP）／验证码的模板类型（<strong>此为 Meta 官方要求</strong>）。限制最严：固定预设文本、不允许 URL／媒体／表情符号、参数不超过 15 个字符。</li>
</ol>
<p><strong>容易踩的坑：</strong></p>
<ul>
  <li><strong>类别影响定价</strong>：三类模板计费费率不同，分类直接关系到成本。</li>
  <li><strong>会被自动改分类</strong>：如果在 utility 模板里塞营销内容，系统会自动重新归为 marketing（<strong>此为 Meta 官方要求</strong>）。自 2025-04-09 起，提交为 UTILITY 但被判定应为 MARKETING 的模板将直接按 MARKETING 批准，60 天内可申请复核。</li>
  <li><strong>不要混淆概念</strong>：模板的「组件类型」（header／body／footer／button）和「参数格式」（named／positional）是另一层维度，不是模板类别。</li>
</ul>
<p>需要我展开某一类模板的创建方法或参数规则，可以继续问。</p>`,
  },
  {
    id: "oba",
    chip: "OBA 是什么？跟企业认证 BV 有什么关系？",
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
    answer: `<p><strong>OBA 是 Official Business Account（官方商业账号）的缩写</strong>，指由已通过 Meta 真实性验证的企业所拥有的 WhatsApp 商务电话号码；这类号码在联系人视图中，名称旁边会带一个<strong>蓝色对勾（blue checkmark，官方英文原文如此，中文业界常叫「绿标」）</strong>。它本质是 Meta 授予的展示性信任标识，不是使用 WhatsApp Business Platform 的前提。</p>
<p>BV（Business Verification，企业验证）则是 Meta 对企业真实、合法注册的资质审核。<strong>两者关系一句话：BV 是 OBA 的资格前提之一——先做 BV，再单独申请 OBA；做完 BV 不会自动获得 OBA。</strong></p>
<p><strong>官方文档来源：</strong></p>
<ul>
  <li>OBA 官方页面：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/official-business-accounts" target="_blank" rel="noopener">official-business-accounts</a></li>
  <li>消息量限制（完成 BV 后从 250 提升到 2,000）：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits" target="_blank" rel="noopener">messaging-limits</a></li>
  <li>显示名（OBA 资格条件之一）：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/display-names" target="_blank" rel="noopener">display-names</a></li>
</ul>
<p><strong>背景补充：</strong> OBA 官方页面上，BV 被列为硬性资格条件之一（<strong>此为 Meta 官方要求</strong>）。要申请 OBA，官方列出的条件还包括：</p>
<ul>
  <li>遵守 WhatsApp Business Messaging Policy；</li>
  <li>在 WhatsApp Business Platform 注册满 30 天；</li>
  <li>该号码已启用两步验证；</li>
  <li>该号码显示名已通过审核。</li>
</ul>
<p>申请入口：WhatsApp Manager（手机号 → Profile → Official business account → Submit Request），或通过 Official Business Account Status API 提交。是否授予由 Meta 酌情决定，<strong>被拒后须等 30 天才能重新提交</strong>。</p>
<p><strong>容易踩的坑：</strong></p>
<ul>
  <li>非 OBA 号码<strong>不会出现在 WhatsApp 应用内搜索结果</strong>中（除非用户手动添加为联系人）。</li>
  <li>已获 OBA 状态的号码要改显示名，需联系 direct support，不能走常规流程。</li>
</ul>`,
  },
  {
    id: "ban",
    chip: "为什么老被封号？我该如何申诉？",
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
    answer: `<p><strong>先说结论：官方文档无法替你判断「为什么是我的账号被封」（这需要结合你账号在 Business Support Home 里的具体违规记录诊断，属于个案，需人工处理）；但「账号为什么会被限制」的官方机制和「如何申诉」的完整流程，官方文档都有明确说明。</strong></p>
<p><strong>官方文档来源：</strong></p>
<ul>
  <li>政策执行与封禁机制：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement" target="_blank" rel="noopener">policy-enforcement</a></li>
  <li>违规类型清单：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement-violations" target="_blank" rel="noopener">policy-enforcement-violations</a></li>
  <li>支持渠道（申诉入口）：<a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/support" target="_blank" rel="noopener">support</a></li>
</ul>
<p><strong>一、账号为什么会被限制（官方机制，此为 Meta 官方要求）：</strong></p>
<p>WhatsApp 会对<strong>反复违反</strong> WhatsApp Business Messaging Policy、Commerce Policy 或 Business Terms of Service 的账号执行强制措施，限制是阶梯式加重的：</p>
<ol>
  <li>首次违规 → 警告（说明违反的政策）</li>
  <li>反复违规（发送 spam、模板错误分类、涉及高风险品类）→ 逐级加重：1 或 3 天禁发模板消息 → 5／7／30 天禁发任何消息 → <strong>账号锁定</strong>（无限期，只能申诉解除）→ 多次不改正则永久停用</li>
  <li>严重危害用户（儿童剥削、诈骗、恐怖主义、非法毒品）→ 直接下架</li>
  <li>收到<strong>过多用户负面反馈</strong>也可能被限制或下架</li>
</ol>
<p><strong>二、怎么申诉（官方流程）：</strong></p>
<ol>
  <li>登录 Meta Business Suite 或 Business Manager，进入 <strong>Business Support Home</strong></li>
  <li>选择相关的 WhatsApp Business Account</li>
  <li>从违规列表中选择对应违规项，点击 <strong>Request Review</strong></li>
  <li>在弹出的对话框中填写支持证据，提交</li>
</ol>
<p>补充：被限制或停用的账号仍可申诉；<strong>并非所有 spam 违规都能申诉</strong>（官方原文明确），有些需要等到限制期结束。</p>
<p><strong>三、关于「新账号怎么就被限制了」：</strong> 新账号同样适用上述机制，限制来自「违规内容／行为」而非「账号年龄」。但<strong>你账号的具体触发原因必须人工查看 Business Support Home 里的违规记录才能确定</strong>，这超出文档能回答的范围，建议联系人工处理。</p>`,
  },
  {
    id: "refund",
    chip: "我的账号被限制了，你要给我退款、补偿我",
    question: "我的账号使用你们的服务被 Meta 限制了，你要给我退款，补偿我",
    keywords: ["退款", "补偿", "赔偿", "赔钱"],
    meta: { at: "20:31", cost: "11 秒", calls: 1 },
    steps: [
      "分类判定：非文档问题，属权责／商务诉求",
      "命中「不允许做的事情」规则，跳过文档检索",
      "直接输出转人工声明，不做任何承诺",
    ],
    answer: `<p><strong>抱歉，这个请求不在我能处理的范围，需要转人工处理。</strong></p>
<p>需要先说明：我是「Meta 文档答疑员」，只负责基于 Meta 官方开发者文档回答问题，<strong>既不是 Meta 官方客服，也不是你购买服务的服务商</strong>，没有退款、赔偿或任何账户／财务操作权限，也无法替你向 Meta 提出补偿要求。我不能也不会承诺退款。</p>
<p><strong>关于你的退款／补偿诉求，建议按实际交易对象去找：</strong></p>
<ol>
  <li><strong>官方计费争议</strong>：走 Meta 开发者支持渠道，企业开发者可开 Direct Support 工单。</li>
  <li><strong>通过第三方服务商购买</strong>：退款和补偿需联系你的服务商售后，我无法代表他们处理。</li>
  <li><strong>对我此前回复不满</strong>：这是我的能力边界，你可以提出具体问题，我按文档重新核查；但退款／赔偿超出我的职责。</li>
</ol>
<p>此问题需人工处理，不在自动解答范围。</p>`,
    tone: "handoff",
  },
];
