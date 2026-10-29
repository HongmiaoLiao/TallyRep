# TallyRep

面向力量与有氧训练的跨平台应用，使用 Vue 3、TypeScript、Vite、Tauri 2 与 Rust。优先开发 Windows 客户端与 Web 演示，之后验证 Android。

产品方向是力量与有氧训练记录及 AI 教练，详见 [产品与 MVP](docs/MVP.md)。当前代码已有问候与动作列表调用，计划、训练持久化及 AI 尚未实现。

正式开发依据 [整体架构](docs/ARCHITECTURE.md) 和 [交付计划与首个任务](docs/DELIVERY.md) 推进。第一版 AI 使用用户自配 URL、模型和密钥，不增加服务端。

[团队分工与排期](docs/SCHEDULE.md) 给出岗位责任、工作量、依赖和里程碑。它基于假设的人力容量，实际执行需按人员与日历重新估算。

分支、评审、验证与提交要求见 [贡献指南](CONTRIBUTING.md)。当前任务状态以交付计划及对应 PR 的验收证据为准。

## 启动

使用 Node.js（满足当前 Vite 要求）与 npm。Windows 客户端还需要 Rust MSVC 工具链、Microsoft C++ Build Tools 与 WebView2。

```powershell
npm install
npm run dev          # 浏览器：http://localhost:1420
```

启动 Windows 客户端时，先停止单独运行的 Vite（Ctrl+C），再执行：

```powershell
npm run tauri dev    # 自动启动 Vite，再编译并打开客户端
```

两个开发入口共享端口，不要同时启动。首次 Rust 构建会下载依赖，通常比后续构建慢。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run typecheck` | 检查 Vue、TypeScript 和 Vite 配置的类型 |
| `npm run build` | 生成客户端使用的前端产物 `dist/` |
| `npm run preview` | 预览 `dist/`，不启动 Rust |
| `npm run build:web` | 生成 GitHub Pages 产物 `dist-web/`，默认路径 `/TallyRep/` |
| `npm run tauri dev` | Windows 客户端开发与热更新 |
| `npm run tauri build` | 构建当前平台的客户端和安装包 |
| `cargo check --manifest-path src-tauri/Cargo.toml` | 检查 Rust 工程 |
| `cargo fmt --manifest-path src-tauri/Cargo.toml --check` | 检查 Rust 格式 |

统一使用 npm，提交 `package-lock.json` 和 `src-tauri/Cargo.lock`。CI 中用 `npm ci` 安装锁定版本。

## 从入口读代码

1. `index.html` 提供 `#app` 容器，加载 `src/main.ts`。
2. `src/main.ts` 创建 Vue 应用，挂载 `App.vue` 并引入全局样式。
3. `src/App.vue` 使用 `<script setup lang="ts">`：`ref` 保存状态，`v-model` 绑定输入，`@submit.prevent` 处理表单。
4. `src/services/greeting.ts` 是平台边界：Tauri 内使用 `invoke("greet", { name })`，浏览器中提供同接口的本地实现。
5. `src-tauri/src/lib.rs` 的 `#[tauri::command]` 声明 Rust 命令，`generate_handler![greet, list_exercises]` 注册问候与动作列表。`src/services/exercises.ts` 负责列表的平台分流；命令返回 `Result` 时，错误会成为前端 Promise 的拒绝。
6. `src-tauri/src/main.rs` 是桌面可执行程序入口；公共启动逻辑在 `lib.rs`，便于移动端复用。

浏览器演示不会执行 Rust，也不会自动和客户端同步数据。Rust 端仍独立验证输入，因为前端验证不能代替原生边界的验证。

## 配置之间的关系

- `package.json`：前端依赖与 npm 命令；`src-tauri/Cargo.toml`：Rust crate 与依赖。
- `tsconfig.json`：启用严格类型检查；`tsconfig.node.json` 检查运行于 Node.js 的 Vite 配置。
- `vite.config.ts`：Vue 插件、固定端口 1420、移动调试主机、Web 发布路径。忽略 `src-tauri` 的文件变化，Rust 的重编译交给 Tauri。
- `src-tauri/tauri.conf.json`：应用名称、标识、窗口、构建入口和 CSP。`devUrl` 对应 Vite 地址；`frontendDist` 相对于 `src-tauri`，指向 `../dist`。
- `src-tauri/capabilities/default.json`：将 `core:default` 权限授予 `main` 窗口。新增文件、系统等插件时，再添加需要的权限。
- 应用标识暂用 `io.github.hongmiaoliao.tallyrep`，正式发布前确认；发布后应保持稳定。

## Web / GitHub Pages

`npm run build:web` 使用 pages 模式，输出与客户端分开的 `dist-web/`。未来部署该目录至 `https://hongmiaoliao.github.io/TallyRep/`，目前仅准备构建入口，尚未启用或发布 Pages。

自定义域名或仓库更名时，通过环境变量覆盖 base：

```powershell
$env:VITE_BASE_PATH = "/"
npm run build:web
Remove-Item Env:VITE_BASE_PATH
```

本地预览 Pages 构建：`npm run preview -- --outDir dist-web --base /TallyRep/`，访问输出地址下的 `/TallyRep/`。当前没有路由；之后添加页面时优先使用 hash 路由，避免静态托管的刷新 404。

## 后续 Android 验证

首次使用前安装对应 Rust Android targets，设置 `JAVA_HOME`、`ANDROID_HOME`、`NDK_HOME`，准备真机或 AVD。

```powershell
npm run tauri android init
npm run tauri android dev
```

Android 工程尚未初始化。模板图标仍是 Tauri 默认图标，业务开发和正式发布前再替换。
