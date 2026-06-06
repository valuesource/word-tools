"use client";

// =============================================================================
// The Daily Grid — crossword page for a Next.js (App Router) site.
// Drop this at: app/crossword/page.js   ->  available at /crossword
//
// Setup (3 steps):
//   1) npm install @supabase/supabase-js   (skip if already installed)
//   2) Ensure these env vars exist (the Vercel↔Supabase integration adds them):
//        NEXT_PUBLIC_SUPABASE_URL
//        NEXT_PUBLIC_SUPABASE_ANON_KEY
//   3) Run the SQL in crossword_supabase_setup.sql once in the Supabase SQL editor.
//
// If Supabase isn't configured yet, the page still works — it just keeps
// progress in memory for the session instead of saving it.
//
// All CSS/classes are scoped under `.dg-root` and prefixed `dg-`, so nothing
// here can affect the rest of the site.
// =============================================================================

import { useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const TABLE = "crossword_progress";

export default function DailyGridPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let removeKey = null;
    let saveTimer = null;
    let cancelled = false;

    // ---- load Google Fonts once -------------------------------------------
    if (!document.getElementById("dg-fonts")) {
      const l = document.createElement("link");
      l.id = "dg-fonts";
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Archivo:wght@500;600;700&display=swap";
      document.head.appendChild(l);
    }

    // ---- Supabase client (guarded) ----------------------------------------
    let supabase = null;
    const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (SB_URL && SB_KEY) {
      try { supabase = createClient(SB_URL, SB_KEY); } catch { supabase = null; }
    }

    async function resolveUserId() {
      if (supabase) {
        try {
          const { data } = await supabase.auth.getUser();
          if (data && data.user && data.user.id) return data.user.id;
        } catch {}
      }
      // anonymous fallback so guests keep their progress on this browser
      try {
        let id = localStorage.getItem("dg_anon_id");
        if (!id) {
          id = "anon-" + (crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random());
          localStorage.setItem("dg_anon_id", id);
        }
        return id;
      } catch { return "anon"; }
    }

    function makeDb(sb, userId) {
      if (!sb) {
        const mem = {};
        return {
          async loadProgress(d) { return mem[d] || null; },
          async saveProgress(d, o) { mem[d] = o; },
          async listPlayed() {
            return Object.keys(mem)
              .map((d) => ({ date: d, solved: !!mem[d].solved }))
              .sort((a, b) => (a.date < b.date ? 1 : -1));
          },
        };
      }
      return {
        async loadProgress(d) {
          try {
            const { data } = await sb.from(TABLE).select("data")
              .eq("user_id", userId).eq("puzzle_date", d).maybeSingle();
            return data ? data.data : null;
          } catch { return null; }
        },
        async saveProgress(d, o) {
          try {
            await sb.from(TABLE).upsert(
              { user_id: userId, puzzle_date: d, data: o, updated_at: new Date().toISOString() },
              { onConflict: "user_id,puzzle_date" }
            );
          } catch {}
        },
        async listPlayed() {
          try {
            const { data } = await sb.from(TABLE).select("puzzle_date,data")
              .eq("user_id", userId).order("puzzle_date", { ascending: false });
            return (data || []).map((r) => ({ date: r.puzzle_date, solved: !!(r.data && r.data.solved) }));
          } catch { return []; }
        },
      };
    }

    // ---- Word + clue bank --------------------------------------------------
    const BANK = [
      ["MOUNTAIN","Lofty natural peak"],["BUTTERFLY","Winged garden flutterer"],["ELEPHANT","Trunked giant of the savanna"],
      ["LIBRARY","House of borrowed books"],["COMPASS","Tool that points north"],["LANTERN","Portable hanging light"],
      ["ORCHARD","Grove of fruit trees"],["HARBOUR","Sheltered place for ships"],["DIAMOND","Hardest gemstone"],
      ["JOURNEY","A long trip"],["THUNDER","Storm's loud rumble"],["MEADOW","Grassy open field"],
      ["CASTLE","Fortified royal home"],["BRIDGE","Span across a river"],["CANDLE","Wax light source"],
      ["FOREST","Dense stand of trees"],["ISLAND","Land ringed by water"],["WINTER","Coldest season"],
      ["SUMMER","Warmest season"],["ANCHOR","Ship's holding weight"],["PENCIL","Writer with a lead core"],
      ["GUITAR","Six-stringed instrument"],["ROCKET","Spacefaring vessel"],["CAMERA","Photo-taking device"],
      ["DOCTOR","Medical professional"],["FLOWER","Blooming plant"],["MARKET","Place to buy and sell"],
      ["NATURE","The physical world"],["PEPPER","Spicy table seasoning"],["GARDEN","Plot for growing plants"],
      ["PLANET","Earth, Mars, or Venus"],["ORANGE","Citrus fruit and a colour"],["SILVER","Shiny gray metal"],
      ["WINDOW","Glass opening in a wall"],["PURPLE","Colour of royalty"],["SUNSET","Day's end on the horizon"],
      ["VOYAGE","A sea journey"],["MAGNET","It attracts iron"],["KETTLE","Pot for boiling water"],
      ["RIBBON","Decorative strip of fabric"],["VELVET","Soft plush fabric"],["MELODY","A tune"],
      ["SUGAR","Sweetener"],["TIGER","Striped big cat"],["LEMON","Sour yellow fruit"],
      ["HONEY","Bee-made sweet"],["CLOUD","Sky's fluffy mass"],["STORM","Violent weather"],
      ["BEACH","Sandy shore"],["TRAIN","Transport on rails"],["HEART","Blood-pumping organ"],
      ["LIGHT","Opposite of dark"],["MUSIC","Organized sound"],["PAPER","Sheet for writing"],
      ["RADIO","Audio broadcast device"],["TABLE","Furniture with a flat top"],["WATER","Plain H2O"],
      ["APPLE","Doctor-repelling fruit"],["BREAD","Baker's staple loaf"],["CHAIR","Seat with a back"],
      ["DANCE","Move to music"],["EAGLE","Soaring bird of prey"],["GRAPE","Wine's source fruit"],
      ["HOUSE","Place to live"],["JUICE","Squeezed fruit drink"],["KNIFE","Cutting utensil"],
      ["MONEY","Coins and bills"],["NORTH","Up on a map"],["PIANO","Keyboard instrument"],
      ["QUEEN","King's counterpart"],["SMILE","Happy expression"],["OCEAN","Vast saltwater body"],
      ["RIVER","Flowing waterway"],["WHEEL","Round rolling part"],["ZEBRA","Striped African grazer"],
      ["GOLDEN","Made of a prized metal"],["GINGER","Spicy root, or red-haired"],["TOMATO","Salad fruit, red and round"],
      ["SUN","Star at the system's heart"],["SEA","Smaller than an ocean"],["SKY","Where clouds drift"],
      ["ICE","Frozen water"],["OWL","Nocturnal hooter"],["BEE","Honey maker"],
      ["ANT","Tiny colony insect"],["OAK","Sturdy hardwood tree"],["CAT","Common feline pet"],
      ["DOG","Loyal canine pet"],["EAR","Organ of hearing"],["EGG","Breakfast oval"],
      ["INK","Pen's dark fluid"],["ARC","A curved line"],["ACE","Top playing card"],
      ["TEA","Steeped hot drink"],["MAP","Guide to places"],["KEY","It opens a lock"],
    ];
    const CLUE = {}; BANK.forEach(([w, c]) => (CLUE[w] = c));

    // ---- Seeded RNG + generator -------------------------------------------
    function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
    function shuffle(arr,rng){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

    function generatePuzzle(seed){
      const rng=mulberry32(seed);
      let pool=shuffle(BANK.map(b=>b[0]),rng).slice(0,30);
      pool.sort((a,b)=>b.length-a.length);
      const cells=new Map();const placed=[];
      const key=(r,c)=>r+","+c;const get=(r,c)=>cells.get(key(r,c));
      const first=pool.shift();
      for(let i=0;i<first.length;i++)cells.set(key(0,i),first[i]);
      placed.push(first);
      function validate(word,sr,sc,dir){
        const len=word.length;
        const before=dir==="A"?get(sr,sc-1):get(sr-1,sc);
        const after=dir==="A"?get(sr,sc+len):get(sr+len,sc);
        if(before!=null||after!=null)return null;
        let inter=0;
        for(let i=0;i<len;i++){
          const r=dir==="D"?sr+i:sr;const c=dir==="A"?sc+i:sc;const ex=get(r,c);
          if(ex!=null){if(ex!==word[i])return null;inter++;}
          else{if(dir==="A"){if(get(r-1,c)!=null||get(r+1,c)!=null)return null;}else{if(get(r,c-1)!=null||get(r,c+1)!=null)return null;}}
        }
        if(inter<1)return null;return{sr,sc,dir,inter};
      }
      function bestPlacement(word){
        let cands=[];
        for(const[k]of cells){const[r,c]=k.split(",").map(Number);const ch=cells.get(k);
          for(let i=0;i<word.length;i++){if(word[i]!==ch)continue;
            const a=validate(word,r,c-i,"A");if(a)cands.push(a);
            const d=validate(word,r-i,c,"D");if(d)cands.push(d);}}
        if(!cands.length)return null;
        cands.sort((x,y)=>y.inter-x.inter||rng()-0.5);return cands[0];
      }
      const TARGET=12;
      for(const word of pool){
        if(placed.includes(word))continue;if(placed.length>=TARGET)break;
        const p=bestPlacement(word);if(!p)continue;
        for(let i=0;i<word.length;i++){const r=p.dir==="D"?p.sr+i:p.sr;const c=p.dir==="A"?p.sc+i:p.sc;cells.set(key(r,c),word[i]);}
        placed.push(word);
      }
      let minR=Infinity,minC=Infinity,maxR=-Infinity,maxC=-Infinity;
      for(const[k]of cells){const[r,c]=k.split(",").map(Number);minR=Math.min(minR,r);minC=Math.min(minC,c);maxR=Math.max(maxR,r);maxC=Math.max(maxC,c);}
      const H=maxR-minR+1,W=maxC-minC+1;
      const grid=Array.from({length:H},()=>Array(W).fill(null));
      for(const[k,v]of cells){const[r,c]=k.split(",").map(Number);grid[r-minR][c-minC]=v;}
      const filled=(r,c)=>r>=0&&c>=0&&r<H&&c<W&&grid[r][c]!=null;
      const numAt={};let num=0;const across=[],down=[];
      for(let r=0;r<H;r++)for(let c=0;c<W;c++){
        if(!filled(r,c))continue;
        const sA=(!filled(r,c-1))&&filled(r,c+1);
        const sD=(!filled(r-1,c))&&filled(r+1,c);
        if(sA||sD){num++;numAt[r+","+c]=num;}
        if(sA){let w="";const list=[];let cc=c;while(filled(r,cc)){w+=grid[r][cc];list.push([r,cc]);cc++;}across.push({num,r,c,dir:"A",answer:w,cells:list});}
        if(sD){let w="";const list=[];let rr=r;while(filled(rr,c)){w+=grid[rr][c];list.push([rr,c]);rr++;}down.push({num,r,c,dir:"D",answer:w,cells:list});}
      }
      return {H,W,grid,across,down,numAt,filled};
    }

    // ---- App state ---------------------------------------------------------
    let db = null;
    let DATE, PUZ, USER = {}, SOLVED = false, sel = null, dir = "A";
    const $ = (id) => root.querySelector("#" + id);
    const EPOCH = new Date("2024-01-01T00:00:00");
    const fmtKey = (d) => d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
    const parseKey = (s) => { const [y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d); };
    const seedFromKey = (s) => parseInt(s.replace(/-/g,""),10);
    const issueNo = (s) => Math.floor((parseKey(s)-EPOCH)/86400000)+1;
    const prettyDate = (s) => parseKey(s).toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"});

    async function loadDate(dateStr){
      DATE=dateStr;
      PUZ=generatePuzzle(seedFromKey(dateStr));
      USER={};SOLVED=false;sel=null;dir="A";
      const saved=await db.loadProgress(dateStr);
      if(saved){USER=saved.grid||{};SOLVED=!!saved.solved;}
      if(cancelled)return;
      if(PUZ.across.length){sel={r:PUZ.across[0].r,c:PUZ.across[0].c};dir="A";}
      renderAll();
      $("dg_datepick").value=dateStr;
      $("dg_issue").textContent=issueNo(dateStr);
      $("dg_dateline").textContent=prettyDate(dateStr);
      updateNavBounds();
      hideHint();
    }

    function buildGrid(){
      const g=$("dg_grid");
      g.style.gridTemplateColumns=`repeat(${PUZ.W},1fr)`;
      const w="min(92vw,"+Math.min(520,PUZ.W*52)+"px)";
      g.style.width=w;$("dg_activeclue").style.width=w;
      root.querySelectorAll(".dg-tools,.dg-hintbox").forEach(e=>e.style.width=w);
      g.innerHTML="";
      for(let r=0;r<PUZ.H;r++)for(let c=0;c<PUZ.W;c++){
        const d=document.createElement("div");
        if(!PUZ.filled(r,c)){d.className="dg-cell dg-block";g.appendChild(d);continue;}
        d.className="dg-cell";d.dataset.r=r;d.dataset.c=c;
        const n=PUZ.numAt[r+","+c];
        if(n){const s=document.createElement("div");s.className="dg-num";s.textContent=n;d.appendChild(s);}
        const L=document.createElement("div");L.className="dg-ltr";L.textContent=USER[r+","+c]||"";d.appendChild(L);
        d.addEventListener("click",()=>onCellClick(r,c));
        g.appendChild(d);
      }
    }
    function entryAt(r,c,d){const list=d==="A"?PUZ.across:PUZ.down;return list.find(e=>e.cells.some(([er,ec])=>er===r&&ec===c));}
    function currentEntry(){return sel?entryAt(sel.r,sel.c,dir):null;}
    function renderAll(){buildGrid();renderClues();refresh();}

    function renderClues(){
      const mk=(list,el,d)=>{
        el.innerHTML="";
        list.slice().sort((a,b)=>a.num-b.num).forEach(e=>{
          const li=document.createElement("li");li.dataset.num=e.num;li.dataset.dir=d;
          const n=document.createElement("span");n.className="dg-n";n.textContent=e.num;
          const t=document.createElement("span");t.textContent=CLUE[e.answer]?(CLUE[e.answer]+" ("+e.answer.length+")"):e.answer;
          li.appendChild(n);li.appendChild(t);
          li.addEventListener("click",()=>{sel={r:e.r,c:e.c};dir=d;refresh();$("dg_hidden").focus({preventScroll:true});});
          el.appendChild(li);
        });
      };
      mk(PUZ.across,$("dg_acrossList"),"A");
      mk(PUZ.down,$("dg_downList"),"D");
    }

    function refresh(){
      if(sel&&!entryAt(sel.r,sel.c,dir))dir=dir==="A"?"D":"A";
      const ent=currentEntry();
      root.querySelectorAll(".dg-cell").forEach(el=>{
        if(el.classList.contains("dg-block"))return;
        const r=+el.dataset.r,c=+el.dataset.c;
        el.classList.remove("dg-hl","dg-sel");
        el.querySelector(".dg-ltr").textContent=USER[r+","+c]||"";
        if(ent&&ent.cells.some(([er,ec])=>er===r&&ec===c))el.classList.add("dg-hl");
        if(sel&&sel.r===r&&sel.c===c)el.classList.add("dg-sel");
      });
      root.querySelectorAll("#dg_acrossList li,#dg_downList li").forEach(li=>li.classList.remove("dg-active"));
      if(ent){
        const li=root.querySelector(`#${dir==="A"?"dg_acrossList":"dg_downList"} li[data-num="${ent.num}"]`);
        if(li)li.classList.add("dg-active");
        const txt=CLUE[ent.answer]?CLUE[ent.answer]:ent.answer;
        $("dg_activeclue").innerHTML=`<b>${ent.num} ${dir==="A"?"Across":"Down"}</b><span>${txt} (${ent.answer.length})</span>`;
      }else{$("dg_activeclue").innerHTML="<b>—</b><span>Tap a square to begin.</span>";}
      const upd=(list,d)=>list.forEach(e=>{const li=root.querySelector(`#${d==="A"?"dg_acrossList":"dg_downList"} li[data-num="${e.num}"]`);if(!li)return;const ok=e.cells.every(([r,c],i)=>USER[r+","+c]===e.answer[i]);li.classList.toggle("dg-done",ok);});
      upd(PUZ.across,"A");upd(PUZ.down,"D");
      const pill=$("dg_statuspill");
      if(SOLVED){pill.textContent="Solved ✓";pill.className="dg-pill dg-solved";}
      else{const any=Object.keys(USER).length;pill.textContent=any?"In progress":"Not started";pill.className="dg-pill";}
      if(ent&&$("dg_hintbox").classList.contains("dg-on"))updateHint(ent);
    }

    function onCellClick(r,c){
      if(sel&&sel.r===r&&sel.c===c){if(entryAt(r,c,dir==="A"?"D":"A"))dir=dir==="A"?"D":"A";}
      else{sel={r,c};if(!entryAt(r,c,dir))dir=dir==="A"?"D":"A";}
      refresh();$("dg_hidden").focus({preventScroll:true});
    }
    function moveNext(){const ent=currentEntry();if(!ent)return;const i=ent.cells.findIndex(([r,c])=>r===sel.r&&c===sel.c);if(i<ent.cells.length-1)sel={r:ent.cells[i+1][0],c:ent.cells[i+1][1]};}
    function movePrev(){const ent=currentEntry();if(!ent)return;const i=ent.cells.findIndex(([r,c])=>r===sel.r&&c===sel.c);if(i>0)sel={r:ent.cells[i-1][0],c:ent.cells[i-1][1]};}
    function stepCell(dr,dc){let r=sel.r+dr,c=sel.c+dc;while(r>=0&&c>=0&&r<PUZ.H&&c<PUZ.W){if(PUZ.filled(r,c)){sel={r,c};return;}r+=dr;c+=dc;}}

    function handleKey(e){
      if(!sel)return;
      const active=document.activeElement;
      if(active&&active!==document.body&&!root.contains(active))return; // don't hijack other inputs on the site
      const k=e.key;
      if(/^[a-zA-Z]$/.test(k)){USER[sel.r+","+sel.c]=k.toUpperCase();if(SOLVED)SOLVED=false;moveNext();refresh();save();checkWin();e.preventDefault();}
      else if(k==="Backspace"){if(USER[sel.r+","+sel.c]){delete USER[sel.r+","+sel.c];}else{movePrev();delete USER[sel.r+","+sel.c];}refresh();save();e.preventDefault();}
      else if(k==="ArrowRight"){dir="A";stepCell(0,1);refresh();e.preventDefault();}
      else if(k==="ArrowLeft"){dir="A";stepCell(0,-1);refresh();e.preventDefault();}
      else if(k==="ArrowDown"){dir="D";stepCell(1,0);refresh();e.preventDefault();}
      else if(k==="ArrowUp"){dir="D";stepCell(-1,0);refresh();e.preventDefault();}
      else if(k===" "||k==="Tab"){dir=dir==="A"?"D":"A";if(sel&&!entryAt(sel.r,sel.c,dir))dir=dir==="A"?"D":"A";refresh();e.preventDefault();}
    }

    function checkWin(){
      const all=[...PUZ.across,...PUZ.down];
      const done=all.every(e=>e.cells.every(([r,c],i)=>USER[r+","+c]===e.answer[i]));
      if(done&&!SOLVED){
        SOLVED=true;save();refresh();
        const t=$("dg_toast");$("dg_toasttext").textContent="Solved! "+prettyDate(DATE).split(",")[0]+"'s grid is yours.";
        t.classList.add("dg-on");setTimeout(()=>t.classList.remove("dg-on"),3600);
      }
    }
    function doCheck(){
      root.querySelectorAll(".dg-cell").forEach(el=>{
        if(el.classList.contains("dg-block"))return;
        const r=+el.dataset.r,c=+el.dataset.c,u=USER[r+","+c];
        el.classList.remove("dg-wrong");
        if(u&&u!==PUZ.grid[r][c])el.classList.add("dg-wrong");
      });
      setTimeout(()=>root.querySelectorAll(".dg-cell.dg-wrong").forEach(el=>el.classList.remove("dg-wrong")),1600);
    }
    function revealWord(){const ent=currentEntry();if(!ent)return;ent.cells.forEach(([r,c],i)=>USER[r+","+c]=ent.answer[i]);refresh();save();checkWin();}
    function revealAll(){for(let r=0;r<PUZ.H;r++)for(let c=0;c<PUZ.W;c++)if(PUZ.filled(r,c))USER[r+","+c]=PUZ.grid[r][c];refresh();save();checkWin();}
    function clearAll(){USER={};SOLVED=false;refresh();save();}

    function scramble(word,seed){const rng=mulberry32(seed);return shuffle(word.split(""),rng).join("");}
    function showHint(){const ent=currentEntry();if(!ent)return;$("dg_hintbox").classList.add("dg-on");updateHint(ent);}
    function hideHint(){$("dg_hintbox").classList.remove("dg-on");}
    function updateHint(ent){const letters=scramble(ent.answer,seedFromKey(DATE)+ent.num*(dir==="A"?7:13));$("dg_hintletters").textContent=letters.split("").join(" ");$("dg_hintbox").dataset.letters=letters;}
    function copyLetters(){
      const txt=$("dg_hintbox").dataset.letters||"";
      const done=()=>{const c=$("dg_copied");c.classList.add("dg-show");setTimeout(()=>c.classList.remove("dg-show"),1500);};
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,done);
      else{const ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");}catch{}ta.remove();done();}
    }

    function save(){
      clearTimeout(saveTimer);
      const snap={grid:{...USER},solved:SOLVED,ts:Date.now()};
      const d=DATE;
      saveTimer=setTimeout(()=>{ if(Object.keys(snap.grid).length||snap.solved) db.saveProgress(d,snap); },350);
    }

    async function openArchive(){
      const arr=await db.listPlayed();
      const ul=$("dg_arclist");ul.innerHTML="";
      if(!arr.length){ul.innerHTML='<div class="dg-arcempty">No past puzzles yet. Solve a square or two and they\'ll be saved here automatically.</div>';}
      arr.forEach(({date,solved})=>{
        const li=document.createElement("li");
        li.innerHTML=`<span class="dg-when">${prettyDate(date)}</span><span class="dg-pill ${solved?"dg-solved":""}">${solved?"Solved ✓":"In progress"}</span>`;
        li.addEventListener("click",()=>{$("dg_panel").classList.remove("dg-on");loadDate(date);});
        ul.appendChild(li);
      });
      $("dg_panel").classList.add("dg-on");
    }

    function shiftDay(n){const d=parseKey(DATE);d.setDate(d.getDate()+n);const ks=fmtKey(d);if(d<EPOCH)return;if(ks>fmtKey(new Date()))return;loadDate(ks);}
    function updateNavBounds(){const today=fmtKey(new Date());$("dg_next").disabled=DATE>=today;$("dg_prev").disabled=DATE<=fmtKey(EPOCH);$("dg_datepick").min=fmtKey(EPOCH);$("dg_datepick").max=today;}

    // ---- wire up + boot ----------------------------------------------------
    function wire(){
      $("dg_prev").onclick=()=>shiftDay(-1);
      $("dg_next").onclick=()=>shiftDay(1);
      $("dg_todayBtn").onclick=()=>loadDate(fmtKey(new Date()));
      $("dg_datepick").onchange=(e)=>{if(e.target.value)loadDate(e.target.value);};
      $("dg_archiveBtn").onclick=openArchive;
      $("dg_closePanel").onclick=()=>$("dg_panel").classList.remove("dg-on");
      $("dg_panel").addEventListener("click",(e)=>{if(e.target.id==="dg_panel")$("dg_panel").classList.remove("dg-on");});
      $("dg_checkBtn").onclick=doCheck;
      $("dg_revealWordBtn").onclick=revealWord;
      $("dg_revealAllBtn").onclick=revealAll;
      $("dg_clearBtn").onclick=clearAll;
      $("dg_hintBtn").onclick=()=>{ if($("dg_hintbox").classList.contains("dg-on")) hideHint(); else showHint(); };
      $("dg_copyLetters").onclick=copyLetters;
      $("dg_hidden").addEventListener("input",()=>{$("dg_hidden").value="";});
      document.addEventListener("keydown",handleKey);
      removeKey=()=>document.removeEventListener("keydown",handleKey);
    }

    (async function init(){
      const userId=await resolveUserId();
      if(cancelled)return;
      db=makeDb(supabase,userId);
      wire();
      await loadDate(fmtKey(new Date()));
    })();

    return () => {
      cancelled = true;
      if (removeKey) removeKey();
      clearTimeout(saveTimer);
    };
  }, []);

  // ---- scoped styles (everything under .dg-root, classes prefixed dg-) -----
  const css = `
.dg-root{--paper:#f3ecdd;--paper-2:#ece2cd;--ink:#1c1813;--ink-soft:#5d5447;--line:#cdbfa3;--accent:#bb3b22;--accent-soft:#e7c9bf;--highlight:#f6e3a6;--highlight-2:#efd06b;--good:#3f7d4f;--shadow:rgba(28,24,19,.22);
  position:relative;overflow:hidden;color:var(--ink);font-family:"Newsreader",Georgia,serif;-webkit-font-smoothing:antialiased;
  background:radial-gradient(120% 120% at 0% 0%, #f7f1e4 0%, var(--paper) 55%, var(--paper-2) 100%);
  border-radius:6px;padding:26px clamp(12px,3vw,40px) 44px;border:1px solid var(--line);}
.dg-root *{box-sizing:border-box;}
.dg-root::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;mix-blend-mode:multiply;opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");}
.dg-root .dg-wrap{max-width:980px;margin:0 auto;position:relative;z-index:1;}
.dg-root .dg-mast{text-align:center;border-bottom:3px double var(--ink);padding-bottom:14px;}
.dg-root .dg-kicker{font-family:"Archivo",sans-serif;letter-spacing:.42em;text-transform:uppercase;font-size:11px;color:var(--accent);font-weight:700;}
.dg-root .dg-mast h1{font-family:"Fraunces",serif;font-weight:900;font-size:clamp(34px,7vw,68px);line-height:.92;margin:6px 0 4px;letter-spacing:-.01em;}
.dg-root .dg-mast h1 em{font-style:italic;font-weight:500;color:var(--accent);}
.dg-root .dg-dateline{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:8px;font-style:italic;color:var(--ink-soft);font-size:15px;}
.dg-root .dg-dateline .dg-rule{flex:0 0 40px;height:1px;background:var(--line);}
.dg-root .dg-nav{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin:16px 0 6px;}
.dg-root .dg-nav button,.dg-root .dg-btn{font-family:"Archivo",sans-serif;font-weight:600;font-size:13px;letter-spacing:.02em;background:var(--paper);border:1.5px solid var(--ink);color:var(--ink);padding:8px 14px;border-radius:2px;cursor:pointer;transition:all .12s ease;box-shadow:2px 2px 0 var(--ink);}
.dg-root .dg-nav button:hover,.dg-root .dg-btn:hover{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink);}
.dg-root .dg-nav button:active,.dg-root .dg-btn:active{transform:translate(2px,2px);box-shadow:0 0 0 var(--ink);}
.dg-root .dg-nav button:disabled{opacity:.35;cursor:not-allowed;box-shadow:2px 2px 0 var(--line);border-color:var(--line);}
.dg-root .dg-nav button.dg-today{background:var(--ink);color:var(--paper);}
.dg-root input[type=date]{font-family:"Archivo",sans-serif;font-size:13px;border:1.5px solid var(--ink);background:var(--paper);padding:7px 10px;border-radius:2px;color:var(--ink);}
.dg-root .dg-pill{font-family:"Archivo",sans-serif;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:99px;border:1.5px solid var(--accent);color:var(--accent);background:var(--accent-soft);}
.dg-root .dg-pill.dg-solved{border-color:var(--good);color:var(--good);background:#d8e6d8;}
.dg-root .dg-board{display:grid;grid-template-columns:minmax(0,auto) minmax(260px,1fr);gap:clamp(18px,3vw,40px);margin-top:26px;align-items:start;}
@media(max-width:760px){.dg-root .dg-board{grid-template-columns:1fr;}}
.dg-root .dg-gridwrap{display:flex;flex-direction:column;align-items:center;gap:14px;}
.dg-root .dg-grid{display:grid;gap:0;background:var(--ink);border:3px solid var(--ink);box-shadow:7px 9px 0 var(--shadow);width:min(92vw,520px);}
.dg-root .dg-cell{position:relative;aspect-ratio:1/1;background:var(--paper);border:1px solid #b8aa8d;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;}
.dg-root .dg-cell.dg-block{background:var(--ink);border-color:var(--ink);cursor:default;}
.dg-root .dg-cell .dg-num{position:absolute;top:1px;left:3px;font-family:"Archivo",sans-serif;font-size:clamp(8px,1.7vw,11px);color:var(--ink-soft);font-weight:600;line-height:1;}
.dg-root .dg-cell .dg-ltr{font-family:"Archivo",sans-serif;font-weight:600;text-transform:uppercase;font-size:clamp(15px,4.4vw,26px);color:var(--ink);margin-top:3px;}
.dg-root .dg-cell.dg-hl{background:var(--highlight);}
.dg-root .dg-cell.dg-sel{background:var(--highlight-2);box-shadow:inset 0 0 0 2.5px var(--accent);}
.dg-root .dg-cell.dg-wrong{background:#f3d9d2;}
.dg-root .dg-cell.dg-wrong .dg-ltr{color:var(--accent);}
.dg-root .dg-activeclue{width:min(92vw,520px);background:var(--ink);color:var(--paper);padding:10px 14px;border-radius:2px;font-size:16px;min-height:44px;display:flex;align-items:center;gap:10px;box-shadow:4px 4px 0 var(--shadow);}
.dg-root .dg-activeclue b{font-family:"Archivo",sans-serif;font-size:12px;letter-spacing:.06em;background:var(--accent);padding:3px 8px;border-radius:2px;white-space:nowrap;}
.dg-root .dg-activeclue span{font-style:italic;}
.dg-root .dg-tools{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:min(92vw,520px);}
.dg-root .dg-hintbox{width:min(92vw,520px);border:1.5px dashed var(--accent);background:var(--accent-soft);border-radius:3px;padding:12px 14px;font-size:14px;color:var(--ink);display:none;}
.dg-root .dg-hintbox.dg-on{display:block;}
.dg-root .dg-hintbox .dg-letters{font-family:"Archivo",sans-serif;font-weight:700;letter-spacing:.34em;font-size:22px;text-transform:uppercase;margin:6px 0 10px;color:var(--accent);}
.dg-root .dg-hintbox .dg-links{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
.dg-root .dg-hintbox a{font-family:"Archivo",sans-serif;font-weight:600;font-size:12.5px;color:var(--ink);text-decoration:none;border-bottom:2px solid var(--accent);padding-bottom:1px;}
.dg-root .dg-hintbox a:hover{color:var(--accent);}
.dg-root .dg-copied{font-family:"Archivo",sans-serif;font-size:11px;color:var(--good);font-weight:700;opacity:0;transition:opacity .2s;}
.dg-root .dg-copied.dg-show{opacity:1;}
.dg-root .dg-clues{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
@media(max-width:760px){.dg-root .dg-clues{grid-template-columns:1fr;}}
.dg-root .dg-cluecol h2{font-family:"Fraunces",serif;font-weight:900;font-size:20px;margin:0 0 8px;border-bottom:2px solid var(--ink);padding-bottom:4px;display:flex;align-items:center;gap:8px;}
.dg-root .dg-cluecol h2 .dg-dot{width:9px;height:9px;background:var(--accent);border-radius:50%;}
.dg-root ol.dg-cluelist{list-style:none;margin:0;padding:0;}
.dg-root ol.dg-cluelist li{display:flex;gap:8px;padding:5px 6px;cursor:pointer;border-radius:2px;line-height:1.3;font-size:15.5px;}
.dg-root ol.dg-cluelist li:hover{background:var(--paper-2);}
.dg-root ol.dg-cluelist li.dg-active{background:var(--highlight);box-shadow:inset 3px 0 0 var(--accent);}
.dg-root ol.dg-cluelist li.dg-done{color:var(--ink-soft);text-decoration:line-through;text-decoration-color:var(--accent);}
.dg-root ol.dg-cluelist li .dg-n{font-family:"Archivo",sans-serif;font-weight:700;min-width:20px;text-align:right;}
.dg-root .dg-foot{margin-top:36px;text-align:center;color:var(--ink-soft);font-size:12.5px;font-style:italic;border-top:1px solid var(--line);padding-top:14px;position:relative;z-index:1;}
.dg-root .dg-panel{position:fixed;inset:0;background:rgba(28,24,19,.5);display:none;align-items:flex-start;justify-content:center;z-index:9999;padding:40px 16px;overflow:auto;}
.dg-root .dg-panel.dg-on{display:flex;}
.dg-root .dg-panelcard{background:var(--paper);border:3px solid var(--ink);box-shadow:9px 11px 0 var(--shadow);max-width:520px;width:100%;padding:22px 24px;border-radius:3px;}
.dg-root .dg-panelcard h3{font-family:"Fraunces",serif;font-weight:900;font-size:26px;margin:0 0 4px;}
.dg-root .dg-panelcard .dg-sub{font-style:italic;color:var(--ink-soft);margin-bottom:16px;font-size:14px;}
.dg-root .dg-arclist{list-style:none;margin:0;padding:0;max-height:46vh;overflow:auto;}
.dg-root .dg-arclist li{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 4px;border-bottom:1px solid var(--line);cursor:pointer;font-size:15px;}
.dg-root .dg-arclist li:hover{background:var(--paper-2);}
.dg-root .dg-arcempty{color:var(--ink-soft);font-style:italic;padding:14px 2px;}
.dg-root .dg-closebar{display:flex;justify-content:flex-end;margin-top:16px;}
.dg-root .dg-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(140%);background:var(--ink);color:var(--paper);padding:14px 22px;border-radius:3px;z-index:9999;box-shadow:5px 6px 0 var(--shadow);font-family:"Fraunces",serif;font-size:18px;font-weight:600;transition:transform .35s cubic-bezier(.2,1.2,.3,1);display:flex;align-items:center;gap:10px;}
.dg-root .dg-toast.dg-on{transform:translateX(-50%) translateY(0);}
.dg-root .dg-toast .dg-star{color:var(--highlight-2);}
.dg-root .dg-hidden{position:absolute;opacity:0;height:0;width:0;}
`;

  return (
    <div className="dg-root" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dg-wrap">
        <header className="dg-mast">
          <div className="dg-kicker">Est. Today · No. <span id="dg_issue">1</span></div>
          <h1>The Daily <em>Grid</em></h1>
          <div className="dg-dateline">
            <span className="dg-rule" /><span id="dg_dateline">Loading…</span><span className="dg-rule" />
          </div>
        </header>

        <div className="dg-nav">
          <button id="dg_prev">‹ Prev</button>
          <button id="dg_todayBtn" className="dg-today">Today</button>
          <button id="dg_next">Next ›</button>
          <input type="date" id="dg_datepick" />
          <button id="dg_archiveBtn" className="dg-btn">📚 Archive</button>
          <span id="dg_statuspill" className="dg-pill">In progress</span>
        </div>

        <div className="dg-board">
          <div className="dg-gridwrap">
            <div className="dg-activeclue" id="dg_activeclue"><b>—</b><span>Tap a square to begin.</span></div>
            <div className="dg-grid" id="dg_grid" />
            <div className="dg-tools">
              <button className="dg-btn" id="dg_checkBtn">Check</button>
              <button className="dg-btn" id="dg_revealWordBtn">Reveal word</button>
              <button className="dg-btn" id="dg_revealAllBtn">Reveal all</button>
              <button className="dg-btn" id="dg_clearBtn">Clear</button>
              <button className="dg-btn" id="dg_hintBtn">🔤 Unscramble hint</button>
            </div>
            <div className="dg-hintbox" id="dg_hintbox">
              Hand these letters to a word unscrambler and it will find the answer:
              <div className="dg-letters" id="dg_hintletters">— — —</div>
              <div className="dg-links">
                <button className="dg-btn" id="dg_copyLetters">Copy letters</button>
                <a id="dg_link1" href="https://wordunscramblr.net" target="_blank" rel="noopener noreferrer">wordunscramblr.net ↗</a>
                <a id="dg_link2" href="https://wordunscrambleit.com" target="_blank" rel="noopener noreferrer">wordunscrambleit.com ↗</a>
                <span className="dg-copied" id="dg_copied">copied ✓</span>
              </div>
            </div>
            <input className="dg-hidden" id="dg_hidden" autoComplete="off" aria-hidden="true" />
          </div>

          <div className="dg-clues">
            <div className="dg-cluecol">
              <h2><span className="dg-dot" />Across</h2>
              <ol className="dg-cluelist" id="dg_acrossList" />
            </div>
            <div className="dg-cluecol">
              <h2><span className="dg-dot" />Down</h2>
              <ol className="dg-cluelist" id="dg_downList" />
            </div>
          </div>
        </div>

        <div className="dg-foot">
          A fresh interlocking puzzle every day. Progress saves to your account automatically and every past day is replayable from the Archive.
        </div>
      </div>

      <div className="dg-panel" id="dg_panel">
        <div className="dg-panelcard">
          <h3>The Archive</h3>
          <div className="dg-sub">Every day you&apos;ve played. Jump back to any of them.</div>
          <ul className="dg-arclist" id="dg_arclist" />
          <div className="dg-closebar"><button className="dg-btn" id="dg_closePanel">Close</button></div>
        </div>
      </div>

      <div className="dg-toast" id="dg_toast"><span className="dg-star">★</span><span id="dg_toasttext">Solved!</span></div>
    </div>
  );
}