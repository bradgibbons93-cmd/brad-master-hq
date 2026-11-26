# Brad Master HQ — New Public HQ (static build)

Built 26 Nov 2026 from the full Brad Master HQ artifact (v4) content saved in
`~/workspace/brad-hq/brad-master-hq-content-2026-11-26.md`.
Fresh static build — NOT based on the Railway Brad-OS app.

## Files

- `index.html` — the whole HQ: header/nav, title block, worlds, intro note,
  brain dump, the studio, top of the list (with "Today's one thing"),
  waiting on you (6), money this month, right now, this week (Agenda + Week
  views), Gibbons OS / Yumi, Brad 2.0, coming up, the vault, quick launch,
  25-minute timer, tasks note, all six project cards + small project notes,
  Me (5 tabs), Me Money, full Toolkit, Docs & Links, iPhone widget steps,
  Made by Cyph X footer.
- `styles.css` — Cyph X brand system (Noir #08090C, Graphite #161A21,
  Paper #F5F5F3, Cyph Yellow #FFD400, Cel-X Cyan #00E5FF, Signal Violet
  #7A5CFF; Space Grotesk headlines, Inter body via Google Fonts CDN).
- `app.js` — Me tabs, Agenda/Week toggle, 25-minute timer (Start/Pause/
  Reset), "Today's one thing" saved to localStorage, Brad 2.0 suggest
  buttons + floating panel.

## Interactive bits

- Me tabs switch the five panels (Profile & goals, Routine, People & dates,
  How Claude works with you, Everything on the go).
- Agenda/Week toggle in "This week" — Agenda is the default and uses the
  Agenda-view dates (Tue 8 Dec for Centrelink + Lara Lake transition).
- 25-minute timer counts down, Start becomes Pause while running, Reset
  restores 25:00.
- "Today's one thing" saves to localStorage only (device only, nothing sent
  anywhere).

## Links policy

Only URLs from the source file or known context are live links:
Yumi, Runnit live app, Runnit site, Gmail, Google Calendar, Google Drive,
Railway, GitHub (bradgibbons93-cmd). Everything else the artifact links to
with no known URL ("Open BRAD HQ ↗", project HQ links, Drive folders, etc.)
is rendered as plain text or an anchor to the matching section on this page —
no URL was guessed.

## Notes / deliberate limits

- "Right now" live status (City Ink drafting, Yumi online, unread mail) is
  rendered as the snapshot the artifact showed on 26 Nov 2026. A static
  page cannot poll Railway/Gmail — the Refresh button reloads the page.
- Brad 2.0 cannot answer on a public static page (it lives in Claude), so
  the Ask field shows a note pointing back to Claude instead of faking a reply.
- No photos of the girls and no real photos at all, per the brief.
- The artifact's own notes are kept verbatim, e.g. "This is an old copy,
  kept to look back on" and the NOW Finance / Google One items.

## Local check (run 26 Nov 2026)

```bash
cd ~/workspace/brad-hq/new-hq
python3 -m http.server 8130
curl -s http://localhost:8130/ | grep -c "section"   # sections present
node --check app.js                                # JS syntax OK
```

## Deploy on Railway (static site)

Option A — Railway static hosting from a repo:
1. Push this folder to a GitHub repo (e.g. `bradgibbons93-cmd/brad-master-hq`).
2. In Railway: New Project → Deploy from GitHub → pick the repo.
3. No build step needed. Set the deploy to serve the static files
   (Railway's static hosting / a `nixpacks` static config, or a tiny
   `python3 -m http.server $PORT` start command serving this folder).
4. Railway gives a public `*.up.railway.app` link — no sign-in wall.

Option B — one-liner static server (same as the local check):
`python3 -m http.server $PORT` with the working directory set to this folder.

Keep the public link read-only: this build sends nothing anywhere and has no
sign-in, so it can be pasted into Higgsfield or anywhere else.
