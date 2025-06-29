# Mihomo VPN 覆写规则项目

一个用于 mihomo VPN 的覆写规则配置项目，提供智能代理分组和自定义流量路由。

## 📁 项目结构

```
clash/
├── proxy-groups.js      # 机场提供的代理组配置
├── 参考.js              # 机场提供的覆写示例文件
├── self.js        # 自定义覆写规则（已转换为标准格式）
├── 目的.md              # 项目说明文档
└── README.md            # 本文件
```

## 🎯 项目目的

本项目旨在为 mihomo VPN 创建一套完整的覆写规则系统：

- **标准化格式**: 将自定义规则转换为符合 mihomo 规范的 JavaScript 函数格式
- **代理组引用**: 正确引用机场提供的代理组配置
- **自定义规则**: 保留并优化个人使用的特定规则
- **智能路由**: 为不同服务提供专门的代理路由

## 📋 文件说明

### 1. `proxy-groups.js` - 机场代理组配置
机场提供的标准代理组配置，包含：
- **🚀 节点代理**: 主代理选择组
- **🌍 国外媒体**: 国外媒体服务组
- **📲 电报信息**: Telegram 专用组
- **Ⓜ️ 微软服务**: 微软服务组
- **🍎 苹果服务**: 苹果服务组
- **♻️ 自动选择**: 自动测试组
- **🎯 绕过代理**: 直连组
- **🚧 屏蔽访问**: 拒绝访问组

### 2. `参考.js` - 标准覆写示例
机场提供的标准覆写规则示例，包含：
- 完整的 JavaScript 函数结构
- 代理组配置示例
- 规则提供者配置
- 流量路由规则

### 3. `self.js` - 自定义覆写规则
**已转换为标准格式**的个人自定义规则，包含：

#### 自定义规则
- **Steam 相关**: 游戏平台域名路由
- **AI 服务**: OpenAI、Claude、Bard 等 AI 服务
- **设计工具**: Figma、ArtStation 等设计平台
- **开发工具**: GitHub、Discord 等开发相关服务

#### 自定义代理组
- **PROXY**: 香港代理组（过滤"港"字节点）
- **US**: 美国代理组（过滤"美"字节点）

#### 代理提供者
- **bit**: 香港节点提供者
- **aooz**: 美国节点提供者

### 4. `目的.md` - 项目说明
详细说明项目的目标和实现要求。

## 🛠️ 使用方法

### 1. 基础配置
确保你的 mihomo 配置文件中引用了覆写规则：

```yaml
# 在你的 mihomo 配置文件中
script:
  path: ./self.js
  mode: rule
```

### 2. 代理组引用
覆写规则会自动引用 `proxy-groups.js` 中的代理组：
- `🚀 节点代理` - 主代理选择
- `🌍 国外媒体` - 媒体服务
- `♻️ 自动选择` - 自动测试
- `US` - 美国代理（自定义）

### 3. 规则优先级
规则按以下优先级执行：
1. **私有网络** → DIRECT
2. **Steam 服务** → 🌍 国外媒体
3. **AI 服务** → US
4. **设计工具** → ♻️ 自动选择
5. **其他服务** → 根据规则路由

## 🔧 自定义配置

### 添加新规则
在 `self.js` 的 `config["rules"]` 数组中添加：

```javascript
config["rules"] = [
  "DOMAIN-SUFFIX,your-domain.com,🚀 节点代理",
  // 更多规则...
];
```

### 添加新代理组
在 `config["proxy-groups"]` 中添加：

```javascript
config["proxy-groups"].push({
  name: "YOUR_GROUP",
  type: "url-test",
  url: "http://www.gstatic.com/generate_204",
  interval: 3600,
  use: ["your_provider"]
});
```

### 添加新代理提供者
在 `config["proxy-providers"]` 中添加：

```javascript
config["proxy-providers"]["your_provider"] = {
  type: "http",
  path: "./profiles/proxies/your_provider.yaml",
  url: "your_subscription_url",
  interval: 3600,
  filter: "your_filter",
  health_check: {
    enable: true,
    url: "http://www.gstatic.com/generate_204",
    interval: 300
  }
};
```

## 📊 规则映射

| 服务类型 | 域名示例 | 目标代理组 |
|---------|---------|-----------|
| **Steam 游戏** | steam.com, steamcommunity.com | 🌍 国外媒体 |
| **AI 服务** | openai.com, claude.ai | US |
| **设计工具** | figma.com, artstation.com | ♻️ 自动选择 |
| **开发工具** | github.com, discord.com | ♻️ 自动选择 |
| **搜索服务** | bing.com, gemini.google.com | US |

## ⚙️ 技术特性

### 代理组特性
- **自动测试**: 300-3600 秒间隔的健康检查
- **智能过滤**: 基于节点名称的自动分组
- **故障转移**: 自动切换到可用节点

### 规则特性
- **精确匹配**: DOMAIN 精确域名匹配
- **后缀匹配**: DOMAIN-SUFFIX 域名后缀匹配
- **关键词匹配**: DOMAIN-KEYWORD 域名关键词匹配

### 更新机制
- **代理提供者**: 3600 秒（1小时）更新间隔
- **健康检查**: 300 秒（5分钟）检查间隔
- **自动重试**: 失败时自动重试机制

## 🐛 故障排除

### 常见问题

1. **规则不生效**
   - 检查 mihomo 配置中的 script 路径
   - 确认 JavaScript 语法正确
   - 查看 mihomo 日志

2. **代理组为空**
   - 检查代理提供者 URL 是否可访问
   - 确认过滤器设置正确
   - 验证订阅链接有效性

3. **流量路由错误**
   - 检查规则优先级
   - 确认代理组名称正确
   - 验证规则语法

### 调试方法

1. **查看日志**
   ```bash
   # 查看 mihomo 日志
   tail -f /path/to/mihomo.log
   ```

2. **测试代理**
   ```bash
   # 测试代理连接
   curl -x your_proxy:port http://www.gstatic.com/generate_204
   ```

3. **验证配置**
   ```bash
   # 验证配置文件语法
   mihomo -c config.yaml -t
   ```

## 📚 相关文档

- [Mihomo 官方文档](https://wiki.metacubex.one/)
- [Clash 配置指南](https://clash.wiki/)
- [代理规则编写](https://github.com/Loyalsoldier/clash-rules)

## 🤝 贡献

欢迎提交问题和改进建议！

## 📄 许可证

本项目基于 MIT 许可证开源。

---

**注意**: 请根据你的实际网络环境和需求调整代理组和规则配置。 