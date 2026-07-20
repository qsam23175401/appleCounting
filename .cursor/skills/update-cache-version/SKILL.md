---
name: update-cache-version
description: >-
  Bumps the Service Worker cache version whenever project content changes.
  Use on every edit to index.html, sw.js, manifest.json, assets, or any other
  cached/served files in 可愛的數數練習 so browsers pick up the new version.
---

# 更新快取版本號

此技能由 agent 自主維護，若發現不適當或不足，須立即修正。

## 何時必須套用

**每次**更新本專案任何會影響使用者看到的內容時都要參考並執行本技能，包含但不限於：

- `index.html`、`test-grouping.html` 等頁面
- `sw.js`、`manifest.json`
- 圖示／圖片／靜態資源（如 `apple-icon.webp`）
- 任何被 `sw.js` 的 `urlsToCache` 涵蓋，或之後會被快取／提供給使用者的檔案

純文件／技能本身微調、且不影響實際頁面或資源內容時，可不升版；若不確定，一律升版。

## 怎麼做

1. 開啟 `sw.js`，找到：

```js
const CACHE_NAME = "apple-counting-cache-vX.Y.Z";
```

2. **遞增**版本號（semver 風格即可）：
   - 一般內容／樣式／行為修改 → 升 patch（`v1.0.1` → `v1.0.2`）
   - 較大功能或結構調整 → 升 minor（`v1.0.2` → `v1.1.0`）
   - 快取策略大改 → 升 major（`v1.1.0` → `v2.0.0`）

3. 若本次新增了需離線／快取的檔案，同步更新 `urlsToCache`。

4. 完成內容修改後，確認 `CACHE_NAME` 已與修改前不同再結束任務。

## 注意

- 只改 `CACHE_NAME` 字串即可讓舊快取在 `activate` 時被清掉；不要刪掉既有的 install／fetch／activate 邏輯，除非任務明確要求改策略。
- 不要重複使用已經用過的版本號。
