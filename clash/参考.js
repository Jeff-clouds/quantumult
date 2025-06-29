/**
 * Mihomo VPN 覆写规则参考文件
 * 这是一个标准的 JavaScript 覆写规则示例，用于 mihomo VPN 配置
 * 包含代理组配置、规则提供者配置和流量路由规则
 */

function main(config) {
  // ==================== 代理组配置 ====================
  // 定义各种类型的代理组，用于不同的服务分类和路由策略
  config["proxy-groups"] = [
    {
      // 主代理选择组 - 用户手动选择代理
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Static.png",
      "include-all": true, // 包含所有代理
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置", // 排除流量/到期相关代理
      name: "PROXY",
      type: "select", // 手动选择类型
      proxies: ["AUTO", "HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"], // 可选择的代理组
    },
    {
      // 自动测试组 - 自动选择最佳代理
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Urltest.png",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      name: "AUTO",
      type: "url-test", // URL测试类型，自动选择延迟最低的代理
      interval: 300, // 测试间隔：300秒（5分钟）
    },
    {
      // AI/ML 服务专用组 - 为AI服务提供专门的代理选择
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/OpenAI.png",
      name: "AIGC",
      type: "select",
      proxies: ["SG AUTO", "JP AUTO", "US AUTO"], // 优先使用新加坡、日本、美国代理
    },
    {
      // Telegram 专用组 - 为Telegram提供专门的代理选择
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Telegram.png",
      name: "Telegram",
      type: "select",
      proxies: ["HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"], // 香港、新加坡、日本、美国代理
    },
    {
      // Google 服务专用组 - 为Google服务提供专门的代理选择
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Google.png",
      name: "Google",
      type: "select",
      proxies: ["HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"],
    },
    {
      // 香港区域自动测试组 - 自动选择最佳香港代理
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/HK.png",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)香港|Hong Kong|HK|🇭🇰", // 过滤包含香港关键词的代理
      name: "HK AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      // 新加坡区域自动测试组 - 自动选择最佳新加坡代理
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/SG.png",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)新加坡|Singapore|🇸🇬", // 过滤包含新加坡关键词的代理
      name: "SG AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      // 日本区域自动测试组 - 自动选择最佳日本代理
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/JP.png",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)日本|Japan|🇯🇵", // 过滤包含日本关键词的代理
      name: "JP AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      // 美国区域自动测试组 - 自动选择最佳美国代理
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/US.png",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)美国|USA|🇺🇸", // 过滤包含美国关键词的代理
      name: "US AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      // 全局代理选择组 - 包含所有自动测试组
      icon: "https://testingcf.jsdelivr.net/gh/Orz-3/mini@master/Color/Global.png",
      "include-all": true,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      proxies: ["AUTO", "HK AUTO", "SG AUTO", "JP AUTO", "US AUTO"],
      name: "GLOBAL",
      type: "select",
    }
  ];

  // ==================== 规则提供者配置 ====================
  // 初始化规则提供者对象（如果不存在）
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }
  
  // 合并规则提供者配置
  config["rule-providers"] = Object.assign(config["rule-providers"], {
    // 私有网络规则 - 本地网络和私有IP
    private: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.yaml",
      path: "./ruleset/private.yaml",
      behavior: "domain", // 域名匹配行为
      interval: 86400, // 更新间隔：24小时
      format: "yaml",
      type: "http",
    },
    // 中国域名规则 - 中国大陆网站
    cn_domain: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.yaml",
      path: "./ruleset/cn_domain.yaml",
      behavior: "domain",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Telegram 域名规则 - Telegram 相关域名
    telegram_domain: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.yaml",
      path: "./ruleset/telegram_domain.yaml",
      behavior: "domain",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Google 域名规则 - Google 服务域名
    google_domain: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.yaml",
      path: "./ruleset/google_domain.yaml",
      behavior: "domain",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // 非中国地理位置规则 - 除中国外的全球网站
    "geolocation-!cn": {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/geolocation-!cn.yaml",
      path: "./ruleset/geolocation-!cn.yaml",
      behavior: "domain",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // 中国IP规则 - 中国大陆IP地址段
    cn_ip: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.yaml",
      path: "./ruleset/cn_ip.yaml",
      behavior: "ipcidr", // IP地址段匹配行为
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Telegram IP规则 - Telegram 服务器IP地址段
    telegram_ip: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.yaml",
      path: "./ruleset/telegram_ip.yaml",
      behavior: "ipcidr",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Google IP规则 - Google 服务器IP地址段
    google_ip: {
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.yaml",
      path: "./ruleset/google_ip.yaml",
      behavior: "ipcidr",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Bing 搜索规则 - Microsoft Bing 搜索服务
    bing: {
      url: "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bing/Bing.yaml",
      path: "./ruleset/bing.yaml",
      behavior: "classical", // 经典规则行为
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // GitHub Copilot 规则 - AI 编程助手
    copilot: {
      url: "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Copilot/Copilot.yaml",
      path: "./ruleset/copilot.yaml",
      behavior: "classical",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Claude AI 规则 - Anthropic Claude AI 服务
    claude: {
      url: "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml",
      path: "./ruleset/claude.yaml",
      behavior: "classical",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Google Bard AI 规则 - Google Bard AI 服务
    bard: {
      url: "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BardAI/BardAI.yaml",
      path: "./ruleset/bard.yaml",
      behavior: "classical",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // OpenAI 规则 - OpenAI 服务（ChatGPT等）
    openai: {
      url: "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
      path: "./ruleset/openai.yaml",
      behavior: "classical",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
    // Steam 游戏平台规则 - Steam 游戏服务
    steam: {
      url: "https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",
      path: "./ruleset/steam.yaml",
      behavior: "classical",
      interval: 86400,
      format: "yaml",
      type: "http",
    },
  });

  // ==================== 流量路由规则 ====================
  // 定义流量路由规则，按优先级顺序排列
  config["rules"] = [
    // 私有网络直连
    "RULE-SET,private,DIRECT",
    
    // AI/ML 服务路由到 AIGC 组
    "RULE-SET,bing,AIGC",      // Bing 搜索
    "RULE-SET,copilot,AIGC",   // GitHub Copilot
    "RULE-SET,bard,AIGC",      // Google Bard
    "RULE-SET,openai,AIGC",    // OpenAI 服务
    "RULE-SET,claude,AIGC",    // Claude AI
    
    // Steam 游戏平台路由到 PROXY 组
    "RULE-SET,steam,PROXY",
    
    // Telegram 服务路由到 Telegram 专用组
    "RULE-SET,telegram_domain,Telegram", // Telegram 域名
    "RULE-SET,telegram_ip,Telegram",     // Telegram IP
    
    // Google 服务路由到 Google 专用组
    "RULE-SET,google_domain,Google",     // Google 域名
    "RULE-SET,google_ip,Google",        // Google IP
    
    // 非中国网站路由到 PROXY 组
    "RULE-SET,geolocation-!cn,PROXY",
    
    // 中国网站和IP直连
    "RULE-SET,cn_domain,DIRECT",        // 中国域名
    "RULE-SET,cn_ip,DIRECT",           // 中国IP
    
    // 默认规则：其他所有流量路由到 PROXY 组
    "MATCH,PROXY",
  ];
  
  // 返回修改后的配置
  return config;
}