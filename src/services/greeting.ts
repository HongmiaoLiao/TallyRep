import { invoke, isTauri } from "@tauri-apps/api/core";

export const runtime = isTauri() ? "native" : "web";

// Components use this interface instead of calling native APIs directly.
export async function greet(name: string): Promise<string> {
  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("请输入你的名字。");
  if (runtime === "native") {
    return invoke<string>("greet", { name: trimmedName });
  }
  // GitHub Pages has no Tauri runtime: this demo runs in the browser.
  return `你好，${trimmedName}！欢迎开始 TallyRep 的开发。`;
}
