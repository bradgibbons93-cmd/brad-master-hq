/* Brad Master HQ — public static build: interactions
   - Me tabs
   - Week / Agenda toggle
   - 25-minute timer (Start / Reset)
   - "Today's one thing" saved to localStorage (device only)
   - Brad 2.0 suggest buttons + floating panel (read-only copy: shows a note, no live answers)
*/
(function () {
  'use strict';

  /* ---------- Me tabs ---------- */
  var tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.getElementById('tab-' + btn.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Week / Agenda toggle ---------- */
  var viewBtns = document.querySelectorAll('.toggle-btn[data-weekview]');
  viewBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      viewBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var which = btn.getAttribute('data-weekview');
      document.getElementById('view-agenda').classList.toggle('active', which === 'agenda');
      document.getElementById('view-week').classList.toggle('active', which === 'week');
    });
  });

  /* ---------- 25-minute timer ---------- */
  var TOTAL = 25 * 60; // seconds
  var remaining = TOTAL;
  var intervalId = null;
  var display = document.getElementById('timer-display');
  var startBtn = document.getElementById('timer-start');
  var resetBtn = document.getElementById('timer-reset');

  function fmt(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }
  function render() { display.textContent = fmt(remaining); }
  function stop() {
    if (intervalId !== null) { clearInterval(intervalId); intervalId = null; }
    startBtn.textContent = 'Start';
  }
  startBtn.addEventListener('click', function () {
    if (intervalId !== null) { // pause
      stop();
      return;
    }
    if (remaining <= 0) remaining = TOTAL;
    startBtn.textContent = 'Pause';
    intervalId = setInterval(function () {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = 0;
        render();
        stop();
        display.textContent = 'Done — nice work.';
        return;
      }
      render();
    }, 1000);
  });
  resetBtn.addEventListener('click', function () {
    stop();
    remaining = TOTAL;
    render();
  });
  render();

  /* ---------- Today's one thing (localStorage, device only) ---------- */
  var oneThing = document.getElementById('one-thing');
  var KEY = 'brad-hq-one-thing';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved) oneThing.value = saved;
    oneThing.addEventListener('input', function () {
      try { localStorage.setItem(KEY, oneThing.value); } catch (e) { /* storage unavailable */ }
    });
  } catch (e) { /* storage unavailable */ }

  /* ---------- Brad 2.0 (read-only copy: show the note) ---------- */
  function showReply(id, text) {
    var el = document.getElementById(id);
    if (text) el.textContent = text;
    el.style.display = 'block';
  }
  document.querySelectorAll('.suggest button[data-ask]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById('brad20-input');
      input.value = btn.getAttribute('data-ask');
      showReply('brad20-reply');
    });
  });
  document.getElementById('brad20-ask').addEventListener('click', function () {
    showReply('brad20-reply');
  });
  document.getElementById('brad20-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') showReply('brad20-reply');
  });

  /* ---------- Floating Brad 2.0 panel ---------- */
  var fab = document.getElementById('fab-toggle');
  var panel = document.getElementById('fab-panel');
  fab.addEventListener('click', function () {
    panel.classList.toggle('open');
  });
  document.getElementById('fab-send').addEventListener('click', function () {
    showReply('fab-reply');
  });
  document.getElementById('fab-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') showReply('fab-reply');
  });
})();
