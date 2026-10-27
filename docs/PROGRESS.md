# 开发与学习进度

更新日期：2026-10-28（Asia/Shanghai）。本文件用于关机、新聊天或上下文切换后的接续。

## 当前阶段

工程初始化已完成。现在是一个用于理解 Vue → Tauri → Rust 调用链的问候示例，尚未进入业务功能开发。

## 已完成

- 在现有 TallyRep 仓库根目录创建官方 `create-tauri-app` 的 Vue + TypeScript + Tauri 2 工程，保留原 Git 仓库和 LICENSE。
- 采用 npm；已安装依赖并生成前端/Rust 锁文件。此前讨论过 Bun，最终沿用 npm。
- 页面支持宽窄屏布局、输入名字、空值提示、异步状态和错误显示。
- `src/services/greeting.ts` 根据 `isTauri()` 分流：客户端 invoke Rust `greet`，浏览器使用同接口的 Web 实现。
- Rust `greet` 独立校验空输入，用 `Result<String, String>` 返回结果。
- 配置独立 Pages 构建：`dist-web/` 与 `/TallyRep/`；尚未发布。
- README 已说明启动方式、关键文件和配置关系；AGENTS.md 保存协作方式。

## 已验证（初始化阶段）

- `npm run build`、`npm run build:web` 通过，均包含类型检查。
- `cargo check --manifest-path src-tauri/Cargo.toml` 通过。
- `cargo fmt --manifest-path src-tauri/Cargo.toml --check` 通过。
- `npm run tauri dev` 成功编译并打开 Windows 窗口，已观察到 Rust 返回的问候。
- 浏览器预览验证空输入提示、带前后空格的名字及正常结果；检查时未捕获浏览器 warning/error。
- 检查了 390px 窄屏布局，无横向溢出。
- 未验证发布安装包；未初始化/编译 Android；未启用 GitHub Pages 或云端服务。

## 环境备注

- Windows + PowerShell；初始化时 Node.js 22.13.0、npm 10.9.2、Rust/Cargo 1.99.1（MSVC）。版本以之后实际检查为准。
- Rust 用户 PATH 已存在 `.cargo/bin`。此前 VS Code 继承旧 PATH，重启电脑后用户确认恢复；不要继续增加临时 PATH 补丁。
- 之前的 `scripts/Enter-DevEnvironment.ps1` 已按用户意图删除，不应因旧聊天再次创建。
- Android Studio、SDK、命令行工具和 NDK 已安装；用户级 `ANDROID_HOME`、`NDK_HOME` 已配置。
- Android Studio 自带 Java 21；原有全局 Java 17 保留。开始 Android 构建时再确认项目的 JAVA_HOME，不盲目更改现有 Java 项目的全局环境。
- Android Rust targets、AVD/真机需在开始移动调试时检查。

## 下次从这里开始

1. 阅读本文件和 README，检查 `git status` 和 `git log -3 --oneline`，确认当前工作区及初始化基线提交；远端同步情况以 Git 实际状态为准。
2. 与用户回顾一个调用链：`App.vue` → `services/greeting.ts` → `src-tauri/src/lib.rs` → 页面结果。
3. 确认 TallyRep 的具体用途及第一个 MVP 功能，再设计数据模型和存储；不要擅自新增业务范围。
4. 后续按需要加入路由、持久化、测试、GitHub Actions Pages 发布和 Android 验证。

重启后在项目根目录执行 `npm run tauri dev`，或选择 `npm run dev` 做浏览器开发，二者不要同时启动。已安装的依赖通常无需重装。之前的 4173 预览服务与窗口都是临时进程，关机后需重新启动。
