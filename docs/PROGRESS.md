# 开发与学习进度

更新日期：2026-10-29（Asia/Shanghai）。本文件用于关机、新聊天或上下文切换后的接续。

## 当前阶段

已切换为真实产品的架构与任务管理方式：助手担任架构师、技术负责人和导师，用户主要实现。架构基线见 `docs/ARCHITECTURE.md`，任务与验收见 `docs/DELIVERY.md`，当前为 M0，TR-001 Ready。

当前代码已有动作类型、Rust 列表命令、原生/Web service 分流及页面异步加载；没有 SQLite、计划、训练持久化、真实 AI 或密钥库。初始化提交为 `9af089f`，本轮代码与架构文档在 `codex/architecture-baseline` 分支整理提交，提交及远端状态以 Git 实际记录为准。

## 已完成

- 在现有 TallyRep 仓库根目录创建官方 `create-tauri-app` 的 Vue + TypeScript + Tauri 2 工程，保留原 Git 仓库和 LICENSE。
- 采用 npm；已安装依赖并生成前端/Rust 锁文件。此前讨论过 Bun，最终沿用 npm。
- 页面支持宽窄屏布局、输入名字、空值提示、异步状态和错误显示。
- `src/services/greeting.ts` 根据 `isTauri()` 分流：客户端 invoke Rust `greet`，浏览器使用同接口的 Web 实现。
- Rust `greet` 独立校验空输入，用 `Result<String, String>` 返回结果。
- 配置独立 Pages 构建：`dist-web/` 与 `/TallyRep/`；尚未发布。
- README 已说明启动方式、关键文件和配置关系；AGENTS.md 保存协作方式。
- 2026-10-29：记录用户确认的 MVP、初版本机数据、后续托管同步和 Web 示例演示需求；提出计划与实际记录分离、AI 训练后复盘的实现建议。同步更新协作指引，移除用途未定义的旧状态。
- 用户选择亲手编写代码，由助手分步讲解与检查；已完成 `src/types/exercise.ts` 和 `src/data/exercises.ts`，包含动作类型与三条示例数据。本次 `npm run typecheck` 通过，页面尚未接入动作列表。
- 随后用户已在 `App.vue` 导入数据，通过 `v-for` 和稳定 ID 渲染列表；再次运行 `npm run typecheck` 通过，未做本轮运行界面验证。用户希望同步学习 Rust，下一练习提前安排 Rust 动作列表命令。
- 用户已完成 Rust 的 `ExerciseCategory`、`Exercise` 和 `list_exercises` 命令并注册；本轮 `cargo check` 与 `cargo fmt --check` 均通过。前端仍直接读取静态数组，Rust 动作命令尚未进行实际调用验证。
- 随后用户已完成 `src/services/exercises.ts` 和页面异步加载；架构设计阶段重新检查源码，`npm run typecheck` 与 `cargo check` 均通过，新列表链路尚未实际界面验收。
- 用户明确 AI 采用自行配置 URL、模型及密钥，暂不增加服务端；首版范围为复盘、下次建议、确认后调整计划。已同步 MVP、架构、任务与协作指引；所有新架构能力仍待实现和验证。
- 用户明确后续不在 main/master 开发。已建立任务分支与 PR 评审约定，本轮先创建 `codex/architecture-baseline` 保留现有修改；远端分支保护未配置。
- 本轮提交前验证：`npm run build`（含类型检查）、`cargo check`、`cargo fmt --check` 通过。列表的实际界面验收仍待 TR-002；未新增持久化或模型能力。

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
2. 执行 `docs/DELIVERY.md` 的 TR-001：用户提交动作/计划目标/实际记录/session 契约字段表、JSON 示例、状态转换和反例，由助手评审。不要直接代写该任务，除非用户明确委托。
3. 按任务依赖完成当前链路验收、质量检查、Rust 模块与 SQLite 验证，再开发正式页面和计划训练用例；不继续堆积 App.vue 演示代码。
4. AI 由 Rust 直接访问用户端点；密钥库候选 Stronghold 需验证，不将文档支持等同实际可用；Web 仅示例。Android 保持 MVP 后集中验证。
5. 后续在独立任务分支开发，经评审与检查后通过 PR 合入；不直接在 main/master 修改。架构设计未增加依赖，新架构能力的测试和发布要求按交付计划落实。

重启后在项目根目录执行 `npm run tauri dev`，或选择 `npm run dev` 做浏览器开发，二者不要同时启动。已安装的依赖通常无需重装。之前的 4173 预览服务与窗口都是临时进程，关机后需重新启动。
