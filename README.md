# Vocabee — 國中英文單字

手機優先的 PWA:字卡(FSRS 間隔複習)、選擇題、拼字,專為**國中**英語單字設計。
姊妹作 Vocaboo 則是高中/學測版。

- 單字庫:`data/jhs.json`(1,364 字,分兩級:**核心** lv1 / **基礎** lv2)
- 倒數預設:**國中會考**

## 本機試用(Windows)
雙擊 `start.bat`,再用瀏覽器開 http://localhost:8000 。
(需安裝 Python;直接雙擊 index.html 無法載入單字資料。)

## 分享給學生
1. 整個資料夾部署到 **GitHub Pages**(或 Cloudflare Pages)。
2. 把網址貼給學生。iPhone 用 Safari「分享 → 加入主畫面」;Android 用 Chrome「加到主畫面」。
3. 改動任何學生會載入的檔案後,把 `sw.js` 的 `VERSION` 加 1,學生才會拿到新版。

## 單字資料格式
```json
{ "meta": {"sample": false, "source": "翰霖文教 國中基礎單字 (han-lin.tw)"},
  "words": [ {"id":"j0001","w":"ability","pos":"n.","zh":"能力、才幹","lv":1} ] }
```
- `w`:英文(`bike/bicycle` 表示兩種拼法都算對)
- `pos`:詞性(n./v./vt./vi./adj./adv./prep./pron./conj./phr.…)
- `zh`:中文解釋
- `lv`:1 = 核心(翰霖 800 字範圍)、2 = 基礎(其餘 1200 字)

## 授權與致謝
單字資料:翰霖文教機構《國中基礎單字》(han-lin.tw),僅供非營利教學使用、須標示出處。
排程:ts-fsrs(MIT)。
