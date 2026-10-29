# 贡献指南

需求范围见 [MVP](docs/MVP.md)，模块边界见 [架构方案](docs/ARCHITECTURE.md)，任务与验收见 [交付计划](docs/DELIVERY.md)。开始实现前确认任务范围、依赖和验收条件，避免把设计目标当成已有功能。

## 分支与评审

- 禁止直接在 `main` 或 `master` 开发、提交或直接推送功能变更。修改前检查当前分支与工作区，保留已有未提交工作。
- 使用短生命周期任务分支，一项任务形成一个可评审变更。现有分支命名约定为 `codex/tr-编号-主题`，无任务编号时使用 `codex/主题`。
- 通过 Pull Request 合入主分支；描述问题、最终行为、验证结果与尚未覆盖的范围。完成评审及所需检查后，由维护者决定合并。
- 主分支保持可构建；流程约定不代表远端已启用分支保护。

## 实现约定

- 前端使用 Vue 3 Composition API、`<script setup lang="ts">` 与 TypeScript；统一使用 npm，维护 `package-lock.json` 和 `src-tauri/Cargo.lock`。
- 页面经 `src/services` 访问平台能力；浏览器使用演示适配器，不能直接执行 Rust commands。业务规则与原生持久化按架构逐步落在 Rust。
- 引入依赖或抽象时说明职责、代价及验证依据。涉及共享契约、数据库格式或错误码的变更，先评审对依赖任务的影响。
- Windows 与 Web 开发共用端口 1420；`npm run dev` 和 `npm run tauri dev` 不同时启动。预先考虑窄屏与触摸，Android 在对应里程碑独立验收。

## 验证与提交内容

按实际变更范围运行检查：

| 变更 | 验证要求 |
| --- | --- |
| 前端类型或实现 | `npm run typecheck`、`npm run build` |
| Pages 路径或演示构建 | 额外执行 `npm run build:web` |
| Rust | `cargo check --manifest-path src-tauri/Cargo.toml`、`cargo fmt --manifest-path src-tauri/Cargo.toml --check` |
| UI 或前后端调用 | 检查实际运行与错误路径，说明验证的平台 |
| 文档或忽略规则 | 检查链接、示例、Git 跟踪状态及 `git diff --check` |

涉及状态转换、持久化、恢复或凭据保护时增加针对性测试。类型检查、编译、界面验证和安装包验证应分别报告，不能相互替代。测试工具与 CI 由 TR-002 建立，尚未建立的检查不得声称已经执行。

公开内容应限于项目源码、非敏感样例、需求、设计、任务和验证依据。个人笔记、协作上下文、本机配置、凭据、真实训练数据与备份不得提交。环境配置样例仅含占位值；提交前审查实际 diff，不能只依赖 `.gitignore`。已经被跟踪的文件需要显式停止跟踪，忽略规则不会移除 Git 历史。

动作数据导入须固定上游版本、保留许可声明并审核字段；图片、GIF 等媒体单独核实分发许可。正式发布前确认应用 identifier、图标与目标平台权限。
