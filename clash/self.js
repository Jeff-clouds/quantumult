function main(config) {
  // 添加自定义规则
  config["rules"] = [
    "DOMAIN,test.com,DIRECT",
    "DOMAIN-SUFFIX,ea.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,figma.com,♻️ 自动选择",
    "DOMAIN-SUFFIX,artstation.com,♻️ 自动选择",
    "DOMAIN-SUFFIX,openai.com,US",
    "DOMAIN-SUFFIX,discord.com,♻️ 自动选择",
    "DOMAIN-SUFFIX,bing.com,US",
    "DOMAIN-SUFFIX,m.manhuagui.com,♻️ 自动选择",
    "DOMAIN-SUFFIX,gemini.google.com,US",
    
    // Steam 相关规则
    "DOMAIN-SUFFIX,steamcdn-a.akamaihd.net,🌍 国外媒体",
    "DOMAIN-SUFFIX,steamstat.us,🌍 国外媒体",
    "DOMAIN-SUFFIX,api.steampowered.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,fanatical.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,humblebundle.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,steamcommunity.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,steampowered.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,steamstatic.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,steam-chat.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,steamusercontent.com,🌍 国外媒体",
    "DOMAIN-SUFFIX,valvesoftware.com,🌍 国外媒体",
    "DOMAIN-KEYWORD,steamuserimages,🌍 国外媒体",
    "DOMAIN-KEYWORD,steamcontent,🌍 国外媒体",
    "DOMAIN-SUFFIX,github.com,♻️ 自动选择"
  ];

  // 添加自定义代理提供者
  if (!config['proxy-providers']) {
    config['proxy-providers'] = {};
  }
  
  config["proxy-providers"]["bit"] = {
    type: "http",
    path: "./profiles/proxies/bit.yaml",
    url: "https://app.nloli.xyz/sub?target=clash&udp=true&config=https%3A%2F%2Fapp.nloli.xyz%2Fstatic%2FACL4SSR_Online.ini&exclude=GAME&emoji=true&filename=Paoluz_Cat4SSR&new_name=true&url=https://rss.paoluz.xyz/link/BpxJnf1JkPMi5HgW?sub=1",
    interval: 3600,
    filter: "港",
    health_check: {
      enable: true,
      url: "http://www.gstatic.com/generate_204",
      interval: 300
    }
  };

  config["proxy-providers"]["aooz"] = {
    type: "http",
    path: "./profiles/proxies/aooz.yaml",
    url: "https://app.nloli.xyz/sub?target=clash&udp=true&config=https%3A%2F%2Fapp.nloli.xyz%2Fstatic%2FACL4SSR_Online.ini&exclude=GAME&emoji=true&filename=Paoluz_Cat4SSR&new_name=true&url=https://rss.paoluz.xyz/link/BpxJnf1JkPMi5HgW?sub=1",
    interval: 3600,
    filter: "美",
    health_check: {
      enable: true,
      url: "http://www.gstatic.com/generate_204",
      interval: 300
    }
  };

  // 添加自定义代理组
  if (!config['proxy-groups']) {
    config['proxy-groups'] = [];
  }

  config["proxy-groups"].push(
    {
      name: "PROXY",
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 3600,
      use: ["bit"]
    },
    {
      name: "US",
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 3600,
      use: ["aooz"]
    }
  );

  // 修改现有的代理组，添加自定义代理
  // 找到 🚀 节点代理 组并添加 PROXY 和 US
  for (let group of config["proxy-groups"]) {
    if (group.name === "🚀 节点代理") {
      if (!group.proxies) {
        group.proxies = [];
      }
      // 在指定位置插入自定义代理
      group.proxies.splice(2, 0, "PROXY");
      group.proxies.splice(3, 0, "US");
      break;
    }
  }

  return config;
}