// Summer Chores demo: the same chores written with callbacks, Promises, and async/await.

// Each chore has a glow color (color), a run time (ms), and a chance of success (p).
const CHORES = [
  { id: "mow",   label: "Mow the yard",       done: "mowed the yard",                during: "mowing the yard",     ms: 2000, p: 1,   color: "#76ffc4" },
  { id: "weed",  label: "Use the weed eater", done: "finished using the weed eater", during: "weed eating",         ms: 1500, p: 0.7, color: "#ffd166" },
  { id: "hedge", label: "Trim the hedges",    done: "finished trimming the hedges",  during: "trimming the hedges", ms: 1000, p: 0.9, color: "#a78bfa" },
  { id: "wood",  label: "Collect wood",       done: "finished collecting wood",      during: "collecting wood",     ms: 2500, p: 0.4, color: "#ff9e5e" },
  { id: "water", label: "Water the garden",   done: "finished watering the garden",  during: "watering the garden", ms: 500,  p: 0.8, color: "#42edff" }
];
const [MOW, WEED, HEDGE, WOOD, WATER] = CHORES;

// Each version has its own file name (for the typed command), color, and short explanation.
const VERSIONS = {
  callbacks: { file: "callbackVersion.js",   color: "#ff52d9", blurb: "Functions passed into functions. Each chore calls the next one when it finishes, so the code nests deeper with every step." },
  promises:  { file: "promiseVersion.js",    color: "#a78bfa", blurb: "Each chore returns a Promise. The steps chain together with .then(), and one .catch() handles a failure anywhere in the chain." },
  async:     { file: "asyncAwaitVersion.js", color: "#42edff", blurb: "Still Promises underneath, but await lets the steps read top to bottom, and try/catch handles a failure." }
};

const board = document.getElementById("board");
const logEl = document.getElementById("terminal-output");
const meter = document.getElementById("meter");
const runBtn = document.getElementById("run");
const nameEl = document.getElementById("name");
const codeEl = document.getElementById("code");
const blurbEl = document.getElementById("blurb");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
let version = "callbacks";

/* Git Bash style two-line prompt: user@host in green, shell in purple, path in yellow. */
function promptLines(parent) {
  const a = document.createElement("div");
  a.innerHTML = '<span class="gb-user">mimic@mimictomastery</span><span class="gb-shell">MINGW64</span><span class="gb-path">~/summer-chores (main)</span>';
  const b = document.createElement("div");
  b.textContent = "$ ";
  parent.append(a, b);
  return b;
}

function say(text, cls, color) {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  if (color) d.style.color = color;
  d.textContent = text;
  logEl.appendChild(d);
}

function resetBoard() {
  board.innerHTML = "";
  CHORES.forEach(c => {
    const li = document.createElement("li");
    li.id = "r-" + c.id;
    li.style.setProperty("--c", c.color);
    li.innerHTML = '<b></b><span></span>';
    li.querySelector("b").textContent = c.label;
    board.appendChild(li);
    mark(c.id, "waiting");
  });
  meter.style.width = "0%";
}

function mark(id, state) {
  const li = document.getElementById("r-" + id);
  li.className = "chore-item is-" + state;
  li.querySelector("span").textContent = { waiting: "Waiting", working: "Working…", done: "Done", failed: "Fell asleep" }[state];
  const done = board.querySelectorAll(".chore-item.is-done").length;
  meter.style.width = (done / CHORES.length * 100) + "%";
}

function idlePrompt() {
  const b = promptLines(logEl);
  const cur = document.createElement("span");
  cur.className = "cursor";
  b.appendChild(cur);
}
function finish() { idlePrompt(); runBtn.disabled = false; }

async function start(name) {
  runBtn.disabled = true;
  logEl.innerHTML = "";
  resetBoard();
  const line = promptLines(logEl);
  for (const ch of "node " + VERSIONS[version].file) {
    line.append(ch);
    if (!calm) await new Promise(r => setTimeout(r, 35));
  }
  RUNNERS[version](name);
}

/* Callback style: each chore takes a callback and calls it on success. */
function chore(c, name, callback) {
  mark(c.id, "working");
  setTimeout(() => {
    if (Math.random() < c.p) {
      say(`${name} ${c.done}.`, "terminal-success", c.color); mark(c.id, "done"); callback();
    } else {
      say(`${name} fell asleep while ${c.during}.`, "terminal-fail"); mark(c.id, "failed"); finish();
    }
  }, c.ms);
}

/* Promise style: each chore returns a Promise that resolves or rejects. */
function choreP(c, name) {
  return new Promise((resolve, reject) => {
    mark(c.id, "working");
    setTimeout(() => {
      if (Math.random() < c.p) {
        say(`${name} ${c.done}.`, "terminal-success", c.color); mark(c.id, "done"); resolve();
      } else {
        mark(c.id, "failed"); reject(`${name} fell asleep while ${c.during}.`);
      }
    }, c.ms);
  });
}

function runCallbacks(name) {
  chore(MOW, name, () => {
    chore(WEED, name, () => {
      chore(HEDGE, name, () => {
        chore(WOOD, name, () => {
          chore(WATER, name, () => {
            say(`${name} finished all their chores!`, "terminal-win");
            finish();
          });
        });
      });
    });
  });
}

function runPromises(name) {
  choreP(MOW, name)
    .then(() => choreP(WEED, name))
    .then(() => choreP(HEDGE, name))
    .then(() => choreP(WOOD, name))
    .then(() => choreP(WATER, name))
    .then(() => say(`${name} finished all their chores!`, "terminal-win"))
    .catch(err => say(err, "terminal-fail"))
    .finally(finish);
}

async function runAsync(name) {
  try {
    await choreP(MOW, name);
    await choreP(WEED, name);
    await choreP(HEDGE, name);
    await choreP(WOOD, name);
    await choreP(WATER, name);
    say(`${name} finished all their chores!`, "terminal-win");
  } catch (err) {
    say(err, "terminal-fail");
  } finally {
    finish();
  }
}

const RUNNERS = { callbacks: runCallbacks, promises: runPromises, async: runAsync };

/* Show the selected version's code and color. */
function showVersion() {
  codeEl.textContent = RUNNERS[version].toString();
  blurbEl.textContent = VERSIONS[version].blurb;
  document.documentElement.style.setProperty("--v", VERSIONS[version].color);
}

document.querySelectorAll(".version-tab").forEach(b => {
  b.addEventListener("click", () => {
    if (runBtn.disabled) return;
    version = b.dataset.v;
    document.querySelectorAll(".version-tab").forEach(x => x.setAttribute("aria-pressed", x === b));
    showVersion();
  });
});
runBtn.addEventListener("click", () => start(nameEl.value.trim() || "Autumn"));

resetBoard();
idlePrompt();
showVersion();