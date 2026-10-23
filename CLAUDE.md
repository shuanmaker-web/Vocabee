# Vocabee — session handoff note

Mobile-first PWA for **junior-high (國中)** English vocabulary (字卡 FSRS 排程 / 選擇題 /
拼字). Sister app to **Vocaboo** (senior-high / 學測, repo `shuanmaker-web/vocab-app`), built
from the same engine. Built by a teacher ("shuanmaker") for students, used on phones.
One bank: `data/jhs.json` (1,364 words), two tiers — **核心 (lv1)** and **基礎 (lv2)**.
Read `README.md` for the data format and credits.

## Live site
- **Student URL:** https://shuanmaker-web.github.io/vocabee/
- **Hosting:** GitHub Pages, repo `shuanmaker-web/vocabee`, source = branch `main`, folder `/`.
  Every push to `main` auto-rebuilds Pages (~1 min).
- Vanilla static site — no build step/framework/bundler. The repo-root files ARE the site.

## How to make a change
1. Edit files (`index.html`, `style.css`, `app.js`, `data/jhs.json`, …).
2. **If you change anything in the service worker's `CORE` list (see `sw.js`) — any file
   students load — BUMP `VERSION` in `sw.js`** (`v1` → `v2` → …). Also bump `APP_VERSION` in
   `app.js` if you want the settings footer to reflect it. Doc/tool-only changes need no bump.
3. `git add -A && git commit -m "..." && git push origin main`.
4. Wait ~1 min, load the URL, hard-refresh (Ctrl/Cmd+Shift+R) to confirm.

## Students are LIVE — verify BEFORE you push ⚠️
No separate staging site; a push to `main` goes live in ~1 min. Treat `main` as production.
- Before `git push`, run the working copy and exercise the change, then show the owner evidence
  (screenshot / test). Reliable: `python3 -m http.server` in the repo dir + headless Chromium
  (Playwright is installed). Only push once confirmed.
- For risky / owner-flagged changes, get the owner's OK on the verification first.

## Don't break existing students' saved data ⚠️
Each student's progress (FSRS cards, logs) lives in **their own phone's IndexedDB** — not on any
server, unrecoverable if corrupted. Keep any change to data shape, storage keys, IndexedDB, or
`sw.js` backward-compatible; flag risk first.

## Progress definitions (shown in-app)
- **已學** = answered in at least **2 of the 3 modes** (字卡/選擇題/拼字). Computed from the
  answer logs (indexed at boot into `S.modes`), since flashcard vs mcq both use the `recog` card.
- **已精熟** = **spelled correctly at least once** (`S.spellOK`) **AND** recog-card stability ≥ 21.
- Both the top tiles and the 核心/基礎 bars use these; the mastered tile shows `/ total`.

## For a fresh Claude session
- `add_repo(owner=shuanmaker-web, repo=vocabee, access=push)` then clone as instructed.
- `git fetch origin main && git reset --hard origin/main` before editing.
- Preview via the built-in browser on the live URL, or `start.bat` locally (needs Python).

## Git-proxy limits in the Claude session
- Pushing commits works. Branch **deletion** and some write APIs (Pages, git refs) return 403 —
  don't retry. Push approved changes straight to `main`; if you must use a temp branch, the owner
  deletes it manually on GitHub.

## Conventions
- **Keep asset paths relative** (served from `/vocabee/` sub-path); `manifest` uses `./`.
- Single bank is driven by `BANKS` (one entry with `levels:[1,2]`) + `LVLABELS`. New words are
  served in random order (avoids always starting at A). Theme color is `--page` (default amber
  `#FF9E2C`, THEMES.orange). No landing page / no practice-question bank (removed vs Vocaboo).
- Data source: 翰霖文教《國中基礎單字》(han-lin.tw) — non-commercial educational use, credited
  in Settings → 關於與致謝. Keep that attribution.
