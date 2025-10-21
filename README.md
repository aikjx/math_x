# 数学学习导航平台 (Math Learning Platform)

一个全面的数学学习平台，基于 React、TypeScript 和 Vite 构建。

## ✨ 功能特性

- 🏠 **首页** - 项目概览和导航
- 📚 **学习网站** - 数学学习资源网站集合
- 🔣 **数学符号** - 数学符号查询和解释工具
- 🛠️ **数学工具** - 实用的数学计算工具
- 🧮 **数学实用** - 实际应用中的数学知识
- 🤖 **AI数学** - AI辅助数学学习
- 📈 **基础到大师** - 系统化的数学学习路径
- 🌌 **统一场论** - 高级物理数学理论

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式系统**: Tailwind CSS
- **动画库**: Framer Motion
- **数学公式**: MathJax
- **路由**: React Router
- **状态管理**: React Context
- **图表**: Recharts
- **通知**: Sonner

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm build
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── DataSwitcher.tsx
│   ├── NavigationItem.tsx
│   ├── SymbolEditor.tsx
│   └── ...
├── contexts/           # React Context
│   ├── authContext.ts
│   └── DataContext.tsx
├── hooks/              # 自定义 Hooks
│   └── useTheme.ts
├── lib/                # 工具函数和数据
│   ├── mockData.ts
│   └── utils.ts
├── pages/              # 页面组件
│   ├── Home.tsx
│   ├── MathematicalSymbols.tsx
│   ├── MathTools.tsx
│   └── ...
├── App.tsx             # 主应用组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 🎯 主要功能

### 数学符号查询
- 支持按名称、含义、LaTeX代码搜索
- 分类筛选功能
- 一键复制LaTeX代码
- 符号详情预览
- 最近查看记录

### 数学工具
- 计算器
- 方程求解器
- 图形绘制
- 统计分析

### 学习资源
- 精选数学学习网站
- 分类整理
- 快速访问

### AI数学助手
- 智能问答
- 步骤解析
- 概念解释

## 🌟 特色功能

- **响应式设计**: 完美适配桌面端和移动端
- **深色模式**: 支持浅色/深色主题切换
- **数学公式渲染**: 使用MathJax渲染LaTeX公式
- **动画效果**: 流畅的页面过渡和交互动画
- **本地存储**: 保存用户偏好和历史记录

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 快速构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [MathJax](https://MathJax.org/) - 数学公式渲染
- [Framer Motion](https://www.framer.com/motion/) - 动画库

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/aikjx/math/issues)
- 关注我们的社交媒体:
  - GitHub: https://github.com/aikjx/math
  - X (Twitter): https://x.com/aikjxcom
  - YouTube: https://www.youtube.com/@aikjx

## ⚖️ 免责声明

### 教育用途
本项目仅供教育和学习目的使用。所有数学内容、公式和理论仅作为学习参考，不构成专业建议。

### 内容准确性
- 我们努力确保所有数学内容的准确性，但不保证内容完全无误
- 用户在使用本平台内容时应当独立验证其准确性
- 对于因使用本平台内容而产生的任何损失，我们不承担责任

### 第三方链接
- 本平台包含指向第三方网站的链接，这些链接仅为方便用户而提供
- 我们不对第三方网站的内容、准确性或可用性负责
- 访问第三方网站的风险由用户自行承担

### 知识产权
- 本项目尊重知识产权，如发现侵权内容请及时联系我们
- 用户在使用平台内容时应遵守相关版权法律法规

### 使用限制
- 禁止将本平台用于任何非法或有害目的
- 禁止恶意攻击或破坏平台功能
- 禁止传播虚假或误导性信息

## 📋 法律条款

### 服务条款
使用本平台即表示您同意以下条款：

1. **接受条款**: 通过访问和使用本平台，您同意受本条款约束
2. **服务变更**: 我们保留随时修改或终止服务的权利，恕不另行通知
3. **用户责任**: 用户对其在平台上的行为承担全部责任
4. **隐私保护**: 我们承诺保护用户隐私，不会未经授权分享个人信息

### 适用法律
本项目及相关争议适用中华人民共和国法律法规。

### 争议解决
如发生争议，双方应友好协商解决；协商不成的，可向有管辖权的人民法院提起诉讼。

---

**最后更新**: 2025年1月

⭐ 如果这个项目对你有帮助，请给它一个星标！

*本项目致力于为数学学习者提供优质的学习资源和工具，让数学学习变得更加简单有趣！*
