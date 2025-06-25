用于苹果设备的 Quantumult 软件分流规则
====================================

本项目为自用 Quantumult 分流规则，适用于 iOS/macOS 端 Quantumult/Quantumult X，主要用于科学上网、分流加速、广告屏蔽等场景。

## 规则整理思路
- **先按主域名分组**：同一主域名归为一组，单一域名归为"其他"组。
- **每个域名组内再按规则类型分组**：如 host、host-suffix、host-keyword、ip-cidr 等。
- **每个规则类型内再按用途分组**：如 ChatGpt、美国、香港、自动选择、direct 等。
- **每组前加注释，组内按字母排序**。
- **组与组之间空行分隔，便于维护和查找**。

## 主要分组说明
- 浏览器相关（diabrowser & arc）
- google 相关
- apple 相关
- ChatGpt/OpenAI/Anthropic/Claude 相关
- 影视/娱乐相关
- AI/工具相关
- 内网/保留地址
- 其他规则
- final 规则

## 适用范围
- 适用于 Quantumult/Quantumult X 规则自定义导入
- 适合有一定分流需求的用户
- 支持自定义节点策略名（如 ChatGpt、🇺🇸 美国、🤖 自动选择等）

## 使用说明
1. 复制 `self.list` 文件内容，粘贴到 Quantumult/Quantumult X 的本地分流规则中。
2. 根据自身节点策略名称适当调整规则中的策略名。
3. 可根据实际需求增删分组或规则。

## 维护建议
- 定期根据实际访问需求调整和补充规则。
- 保持分组和注释清晰，便于后续维护和查找。

---

如有建议或补充，欢迎 issue 或 PR！