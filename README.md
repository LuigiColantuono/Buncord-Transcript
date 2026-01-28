# Buncord-Transcript

<p align="center"><a href="https://github.com/sponsors/LuigiColantuono"><img src="https://img.shields.io/github/sponsors/LuigiColantuono?style=social"></a> <a href="https://paypal.me/l0g4n7"><img src="https://img.shields.io/badge/💖-Support-ff69b4"></a> <img src="https://img.shields.io/npm/v/buncord-transcript"> <img src="https://img.shields.io/npm/dm/buncord-transcript?label=downloads"> <img src="https://img.shields.io/npm/l/buncord-transcript"> <img src="https://img.shields.io/github/repo-size/LuigiColantuono/Buncord-Transcript"> <a href="https://github.com/LuigiColantuono/Buncord-Transcript"><img src="https://img.shields.io/badge/Bun-Networking-black?logo=bun"></a></p>

<div align="center">
  <img src="https://github.com/user-attachments/assets/70e8758e-f363-478a-a013-fd46ca3cf3ec" alt="Buncord Logo" width="180"/>
  <p><b>The fastest, lightest, and most faithful Discord HTML transcript generator.</b></p>
  <p><i>Built exclusively for the Bun ecosystem.</i></p>
</div>

---

Stop simulating browsers to generate simple text logs. **Buncord-Transcript** purges the bloat of JSDOM and React, replacing them with a high-performance, string-based rendering engine powered by Bun and a specialized fork of Mustache.

## ⚡ Blazingly Fast

*   **Zero Node Dependencies**: No `ws`, no `http` legacy, no `JSDOM`. Pure Bun-native execution.
*   **Mustache Powered**: Generates complex transcripts in milliseconds using optimized string templates instead of heavy, recursive DOM manipulation.
*   **Zero Memory Overhead**: While other libraries require hundreds of MBs to "render" a virtual DOM, Buncord processes messages through a stream-like logic that keeps your RAM footprint invisible.

## 🎨 Absolute Cinema UI

*   **Discord v2 Native**: First-class support for modern components: **Buttons**, **Select Menus**, and the new **Containers**.
*   **1:1 Visual Fidelity**: Unlike libraries with hardcoded styles, Buncord uses a dynamic CSS variable system mirrored directly from the official Discord client.
*   **Media-First**: Native support for **Multi-image Media Galleries**, high-res avatars, and custom emoji rendering.
*   **Smart Mentions**: Intelligently resolves user mentions and relative timestamps within the transcript context.

### 📦 Bundle Size Comparison: Transcripts

| Package | Size (Unpacked) | Total Files | Dependencies | Install Weight (est.) |
| :--- | :--- | :--- | :--- | :--- |
| **discord-html-transcripts** | 170 kB | 87 | React, JSDOM, etc. | **~25.000 kB (25MB)** |
| **buncord-transcript** | 33.8 kB | 8 | **NONE** (Native) | **~34 kB** |

### 🚀 Result: 99.8% savings on total installation weight!

## 📦 Installation

```bash
bun add buncord-transcript
```

## 🚀 Quick Start

```typescript
import { createTranscript } from 'buncord-transcript';

const messages = [...]; // Your Discord.js / Buncord messages
const channel = { name: 'ticket-001' };

const html = await createTranscript(messages, channel);
// Output is a high-performance HTML buffer/string ready to be served or saved.
```

<div align="center">
<img width="400" height="500" alt="Buncord-Transcript" src="https://github.com/user-attachments/assets/a63256bd-c22e-465a-a667-74d747526dfb" />
</div>

## 🛠️ The Philosophy

Built out of frustration with outdated, bloated libraries that fail to render modern Discord components. Buncord-Transcript is a **"Performance Tier 1"** tool for developers who prioritize speed, code purity, and production stability.

---
> This project was created using `bun init` in bun v1.3.6. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
