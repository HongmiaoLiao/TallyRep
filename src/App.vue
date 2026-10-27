<script setup lang="ts">
import { computed, ref } from "vue";
import { greet, runtime } from "./services/greeting";

const name = ref("");
const message = ref("");
const error = ref("");
const pending = ref(false);
const source = computed(() => runtime === "native" ? "Rust command" : "浏览器实现");

async function submitGreeting() {
  if (pending.value) return;
  pending.value = true;
  message.value = "";
  error.value = "";
  try {
    message.value = await greet(name.value);
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : String(cause);
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <div class="shell">
    <header class="header">
      <a class="brand" href="./" aria-label="TallyRep 首页"><span class="brand-mark">T</span>TallyRep</a>
      <span class="runtime"><span class="status-dot"></span>{{ runtime === 'native' ? 'Tauri 客户端' : 'Web 演示' }}</span>
    </header>
    <main>
      <section class="intro" aria-labelledby="page-title">
        <p class="eyebrow">从第一个交互开始</p>
        <h1 id="page-title">你好，TallyRep<span>。</span></h1>
        <p class="lead">把一个想法，变成可以运行的应用。<br />你的 Vue、TypeScript 与 Rust 之旅从这里开始。</p>
      </section>
      <section class="demo" aria-labelledby="demo-title">
        <div class="section-heading"><span class="step">01</span><div><h2 id="demo-title">试着打个招呼</h2><p>输入名字，完成第一次交互。</p></div></div>
        <form @submit.prevent="submitGreeting">
          <label for="name">你的名字</label>
          <div class="form-row">
            <input id="name" v-model="name" name="name" autocomplete="given-name" placeholder="例如：小廖" :aria-invalid="!!error" aria-describedby="greeting-status" />
            <button type="submit" :disabled="pending">{{ pending ? '正在问候…' : '发送问候' }}<span aria-hidden="true">↗</span></button>
          </div>
        </form>
        <div id="greeting-status" class="result" :class="{ success: message, error: error }" role="status" aria-live="polite">
          <template v-if="error">{{ error }}</template>
          <template v-else-if="message"><span class="result-label">收到回复</span>{{ message }}</template>
          <template v-else>准备好了，等待你的第一条问候。</template>
        </div>
        <p class="source">本次运行使用 <strong>{{ source }}</strong>{{ runtime === 'web' ? ' · 网页演示无需安装客户端' : ' · 通过 Tauri 调用本地 Rust 函数' }}</p>
      </section>
      <section class="platforms" aria-label="项目方向">
        <article><span class="platform-index">01 / WEB</span><h3>打开即可体验</h3><p>共享界面，可构建为 GitHub Pages 演示。</p></article>
        <article><span class="platform-index">02 / DESKTOP</span><h3>在桌面上开发</h3><p>连接 Rust，在 Windows 上验证完整交互。</p></article>
        <article><span class="platform-index">03 / ANDROID</span><h3>下一站，移动端</h3><p>随项目成长，再接入安卓设备进行验证。</p></article>
      </section>
    </main>
    <footer><span>TallyRep · 开发起点</span><span>Vue 3 / TypeScript / Tauri 2</span></footer>
  </div>
</template>
