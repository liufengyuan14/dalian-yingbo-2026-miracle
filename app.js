
(function () {
"use strict";

/* ==================================================================
   数据（已与最终积分榜、官方大名单核验）
   ================================================================== */
var DLY_PTS = [0,0,3,6,9,12,15,15,18,18,18,18,19,22,22,22,25,26,29,29,30,33,33,36,37,40,43,46,49,52];
var CDR_PTS = [3,6,7,10,13,16,19,22,25,28,31,34,34,34,37,40,41,42,43,44,45,45,48,48,51,52,52,52,52,52];
var GAP = CDR_PTS.map(function (v, i) { return v - DLY_PTS[i]; });

var MOMENTS = [
  { r:"第 3 轮", tag:"站稳脚跟", img:"assets/img/r03.webp", pos:"center 32%", cap:"2026 赛季第 3 轮 · 梭鱼湾主场",
    h:"主场 1-0 上海海港",
    p:"开局连负上海申花、武汉三镇，球队急需一场胜利稳住军心。这场含金量十足的胜利，让上赛季才升上来的新军，在强敌环伺的中超站稳了脚跟。",
    tags:["开局两连败后止血"] },
  { r:"第 14 轮", tag:"埋下伏笔", img:"assets/img/r14.webp", cap:"2026 赛季第 14 轮 · 梭鱼湾主场",
    h:"主场 2-0 成都蓉城",
    p:"马莱莱 76′ 反击中接杨铭锐传中低射远角，马马杜 89′ 补射锁定胜局。这是两队赛季首次交手，也是整个赛季最重要的一笔伏笔——当时没人想到，这两分的分量要在最后一轮才兑现。",
    tags:["马莱莱 76′","马马杜 89′","首回合双杀基础"] },
  { r:"第 16 轮", tag:"至暗时刻", img:"assets/img/r16.webp", cap:"2026 赛季第 16 轮 · 客场上海",
    h:"落后 18 分",
    p:"客场 1-4 不敌上海申花，16 轮只拿到 22 分，与领头羊成都蓉城的差距被拉大到 18 分，净胜球还是负数。那时候，冠军的话题几乎和大连英博无关。",
    tags:["最大分差 18 分","谷底"] },
  { r:"第 22 轮", tag:"辽宁德比", img:"assets/img/tifo88.webp", cap:"2026.08.08 梭鱼湾 · 中超第 22 轮辽宁德比",
    h:"8 月 8 日 · 1-0 辽宁铁人",
    p:"62,075 人涌进梭鱼湾。开赛前四面看台同时升起巨幅 TIFO，主角是身披黑袍的 10 号斯坦丘——悬浮的足球、摊开的战术宝典、盘旋的海鸥。开场不久，他在禁区外一脚远射，打进全场唯一进球。同一晚，吕焯毅与黄子豪先后完成代表球队的第 100 场。",
    tags:["62,075 人","四面台 TIFO","斯坦丘远射制胜","两人百场"] },
  { r:"第 27 轮", tag:"绝杀", img:"assets/img/r27.webp", cap:"2026 赛季第 27 轮 · 客场青岛",
    h:"客场 4-0 青岛西海岸",
    p:"阿奇姆彭 7′ 闪击，一场干脆利落的大胜。同一轮，成都蓉城主场 0-1 负于天津津门虎——打平即可夺冠，眼看平局要守到终场，补时第 91 分钟基莱斯扫射绝杀。",
    tags:["阿奇姆彭 7′","蓉城补时被绝杀"] },
  { r:"第 28 轮", tag:"分差压缩", img:"assets/img/r28.webp", cap:"2026 赛季第 28 轮 · 梭鱼湾主场",
    h:"主场 3-1 深圳新鹏城",
    p:"斯坦丘 8′、罗竞 42′、阿奇姆彭 52′，主队三球领先。同一轮，上海海港 3-0 完胜成都蓉城——王东升乌龙、莱昂纳多吊射、武磊补时破门，成都的领先优势被压缩到 6 分。",
    tags:["斯坦丘 8′","罗竞 42′","海港 3-0 蓉城"] },
  { r:"第 29 轮", tag:"天王山", img:"assets/img/r29.webp", cap:"2026 赛季第 29 轮 · 客场凤凰山",
    h:"客场 1-0 成都蓉城",
    p:"打平即可提前夺冠，四万余名球迷在凤凰山等着捧杯。上半场费利佩主罚点球被刘伟国扑出；66′ 斯坦丘定位球助攻，马马杜头球破门；补时胡荷韬进球因越位被吹。赛季双杀完成，悬念被强行拖进最后一轮。",
    tags:["刘伟国扑点","马马杜 66′","赛季双杀"] },
  { r:"第 30 轮", tag:"雪夜加冕", img:"assets/img/r30-a.webp", cap:"2026.11.08 梭鱼湾 · 收官之夜",
    h:"雪战 3-1 天津津门虎",
    p:"开场 5′ 吕焯毅右路传中，杨铭锐门前包抄破门；50′ 哈达斯点球扳平；70′ 斯坦丘开出角球，廖锦涛点球点附近推射反超；90+3′ 黄山门前抢点锁定。同时济南，山东泰山 3-2 击败成都。终场，两队同积 52 分。",
    tags:["杨铭锐 5′","廖锦涛 70′","黄山 90+3′","泰山 3-2 蓉城"] }
];


var SQUAD = [
  ["1","葛彭","门将",0],["20","刘伟国","门将 · 客战蓉城扑出点球",1],["26","黄子豪","门将",0],["32","王晓峰","门将",0],
  ["2","马马杜·特拉奥雷","后卫 · 191次关键解围 中超第4 · R29制胜头球",1],["5","彭顺杰","后卫",0],["6","宋岳","后卫",0],
  ["12","冯博轩","后卫",0],["15","温家宝","后卫",0],["24","毕津浩","后卫",0],["28","孙康博","后卫",0],["33","曹海清","后卫",0],
  ["4","阿利米","中场 · 90次关键抢断 中超第2",1],["7","罗竞","中场 · 多场关键进球",1],["8","张华晨","中场",0],
  ["9","德尔加多","中场 · 夏窗加盟",0],["10","斯坦丘","中场 · 10球5助攻",1],["21","吕鹏","队长",1],
  ["22","毛伟杰","中场 · 场均跑动超10000米",1],["23","黄山","中场 · 收官战 90+3′ 锁定",1],["37","张城瑞","中场",0],
  ["38","吕焯毅","中场 · 57次关键拦截 中超第1",1],["40","廖锦涛","中场 · 收官战反超球",1],["56","曾俊豪","中场",0],
  ["11","马莱莱","前锋 · 8球4助攻",1],["16","朱鹏宇","前锋",0],["27","杨铭锐","前锋 · 收官战首球",1],
  ["30","阿奇姆彭","前锋 · 12球4助攻 · 30场全首发",1],["44","冯劲","前锋",0],["59","肖力荣","前锋",0]
];

var CONTRIB = [
  { tag:"第 26 轮", img:"assets/img/thx-b.webp", cap:"2026.11.08 · 大连夺冠之夜",
    h:"河南队", sc:"主场 0-0 成都蓉城",
    p:"取胜即可提前四轮夺冠的成都，全场久攻不下。这一分，是成都蓉城最后五轮拿到的唯一一分。河南自己被扣 6 分、早早无欲无求，却在自己的主场把第一个冠军点挡了下来。" },
  { tag:"第 27 轮 · 第 30 轮", img:"assets/img/tj.webp", cap:"2026.11.08 · 大连夺冠之夜",
    h:"天津津门虎", sc:"客场 1-0 成都蓉城",
    p:"赛前成都打平即可夺冠，补时第 91 分钟基莱斯扫射绝杀。而到了第 30 轮，被扣 10 分、早已提前两轮保级的他们又在大雪里真刀真枪打到最后一分钟——哈达斯 50′ 点球一度把大连推到悬崖边。对手够认真，冠军才够分量。" },
  { tag:"第 28 轮", img:"assets/img/hg.webp", cap:"2026.11.08 · 大连夺冠之夜",
    h:"上海海港", sc:"主场 3-0 成都蓉城",
    p:"王东升 57′ 乌龙、莱昂纳多 83′ 吊射、武磊 90+4′ 补射。这一败把成都的领先优势直接压缩到 6 分，争冠悬念重新回到桌面。海港自己带着 -5 分起步，最终仍排在联赛第五。" },
  { tag:"第 30 轮", img:"assets/img/ts.webp", cap:"2026.11.08 · 大连夺冠之夜",
    h:"山东泰山", sc:"主场 3-2 成都蓉城",
    p:"李小恒 15′ 转身凌空世界波、马德鲁加 23′ 补射、克雷桑 63′ 一条龙爆射；费利佩 38′、韦林顿·席尔瓦 79′ 两度迫近。成都只需一场平局即可夺冠，泰山在主场把最后一个冠军点按灭了。他们自己被扣 6 分，最终排名第四。" }
];

var GALLERY = [
  { img:"critical/champ.webp", cap:"2026.11.08 · 我们是冠军", t:"我们是冠军" },
  { img:"assets/img/snow-d.webp", cap:"2026.11.08 梭鱼湾 · 冒雪入场的球迷", t:"冒雪而来" },
  { img:"assets/img/snow-e.webp", cap:"2026.11.08 梭鱼湾 · 雪中的看台", t:"雪夜看台" },
  { img:"assets/img/snow-g.webp", cap:"2026.11.08 梭鱼湾 · 六万人", t:"六万人" },
  { img:"assets/img/snow-h.webp", cap:"2026.11.08 梭鱼湾 · 收官战现场", t:"收官战" },
  { img:"assets/img/lanyan-b.webp", cap:"2026.11.08 · 最后一个主场，球迷用蓝烟迎接球队大巴", t:"蓝烟" },
  { img:"assets/img/champ-b.webp", cap:"2026.11.08 · 夺冠现场", t:"夺冠时刻" },
  { img:"assets/img/champ-c.webp", cap:"2026.11.08 · 夺冠现场", t:"我们是冠军" },
  { img:"assets/img/champ-d.webp", cap:"2026.11.08 · 夺冠现场", t:"欢庆" },
  { img:"assets/img/champ-e.webp", cap:"2026.11.08 · 夺冠现场", t:"蓝色人海" },
  { img:"assets/img/champ-f.webp", cap:"2026.11.08 · 夺冠现场", t:"这一夜" },
  { img:"assets/img/home-a.webp", cap:"2026.11.08 · 大连球迷", t:"大连球迷" },
  { img:"assets/img/home-b.webp", cap:"2026.11.08 · 大连球迷", t:"回家过年" },
  { img:"assets/img/rank13.webp", cap:"德转统计：2026 赛季大连英博主场场均 61,516 人，位列世界第 13", t:"世界第 13" }
];

var HIST = [
  { img:"assets/img/shide2006.webp", yr:"2005", p:"大连实德最后一次夺得中国顶级联赛冠军。此后 21 年，这座城市再没有站上过这个位置。" },
  { img:"assets/img/jinzhou.webp", yr:"金州", p:"大连金州体育场，一代大连球迷的主场记忆（Wikimedia Commons / Unsonique · CC BY-SA 3.0）。" },
  { img:"assets/img/sunjihai.webp", yr:"孙继海", p:"从万达、实德走出的大连足球代表人物之一（Wikimedia Commons）。" },
  { img:"assets/img/lastgame2023.webp", yr:"2023.11.04", p:"大连人职业足球俱乐部的最后一场比赛（Wikimedia Commons / 超级核潜艇 · CC BY 4.0）。" }
];

var NS = "http://www.w3.org/2000/svg";
function el(tag, attrs, parent) {
  var n = document.createElementNS(NS, tag);
  for (var k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}
function txt(parent, x, y, s, attrs) {
  var t = el("text", Object.assign({ x:x, y:y, fill:"#5d7591", "font-size":12,
    "font-family":"system-ui,sans-serif" }, attrs || {}), parent);
  t.textContent = s; return t;
}
var CSS = { ink:"#eaf1fa", ink2:"#b9cde4", ink3:"#5d7591",
  grid:"rgba(140,180,230,.10)", axis:"rgba(140,180,230,.26)",
  blue:"#3987e5", red:"#e66767", gold:"#d9b45b", bg:"#0b1524" };

/* ==================================================================
   一、争冠折线图
   ================================================================== */
(function () {
  var svg = document.getElementById("chart1");
  if (!svg) return;
  var W = 980, H = 470, L = 54, R = 152, T = 34, B = 46;
  var pw = W - L - R, ph = H - T - B;
  var X = function (i) { return L + (i / 30) * pw; };
  var Y = function (p) { return T + (1 - p / 60) * ph; };

  var sp = el("rect", { x:X(26), y:T, width:X(30) - X(26), height:ph, fill:CSS.blue, opacity:.055 }, svg);
  txt(svg, (X(26) + X(30)) / 2, T - 12, "最后五轮", { "text-anchor":"middle", fill:CSS.gold, "font-size":12, "font-weight":700 });

  for (var p = 0; p <= 60; p += 10) {
    el("line", { x1:L, y1:Y(p), x2:W - R, y2:Y(p), stroke:p === 0 ? CSS.axis : CSS.grid, "stroke-width":1 }, svg);
    txt(svg, L - 10, Y(p) + 4, String(p), { "text-anchor":"end" });
  }
  for (var i = 0; i <= 30; i += 5) txt(svg, X(i), H - B + 24, String(i), { "text-anchor":"middle" });
  txt(svg, L - 34, T - 12, "积分", { "font-size":11 });
  txt(svg, W - R + 6, H - B + 24, "轮次", { "font-size":11 });

  /* 18 分分差标注 */
  var gx = X(16);
  el("line", { x1:gx, y1:Y(DLY_PTS[15]), x2:gx, y2:Y(CDR_PTS[15]), stroke:CSS.ink3, "stroke-width":1.2 }, svg);
  el("line", { x1:gx - 5, y1:Y(DLY_PTS[15]), x2:gx + 5, y2:Y(DLY_PTS[15]), stroke:CSS.ink3, "stroke-width":1.2 }, svg);
  el("line", { x1:gx - 5, y1:Y(CDR_PTS[15]), x2:gx + 5, y2:Y(CDR_PTS[15]), stroke:CSS.ink3, "stroke-width":1.2 }, svg);
  var midY = (Y(DLY_PTS[15]) + Y(CDR_PTS[15])) / 2;
  txt(svg, gx - 12, midY - 6, "18分", { "text-anchor":"end", fill:CSS.ink2, "font-weight":700, "font-size":14 });
  txt(svg, gx - 12, midY + 12, "第16轮", { "text-anchor":"end", "font-size":11 });

  function drawLine(pts, color) {
    var d = "M" + X(0).toFixed(1) + " " + Y(0).toFixed(1);
    pts.forEach(function (v, idx) { d += " L" + X(idx + 1).toFixed(1) + " " + Y(v).toFixed(1); });
    el("path", { d:d, fill:"none", stroke:color, "stroke-width":2.6,
      "stroke-linejoin":"round", "stroke-linecap":"round" }, svg);
  }
  drawLine(CDR_PTS, CSS.red);
  drawLine(DLY_PTS, CSS.blue);

  /* 第29轮标记 */
  var mx = X(29), my = Y(49);
  el("circle", { cx:mx, cy:my, r:4.5, fill:CSS.blue, stroke:CSS.bg, "stroke-width":2 }, svg);
  txt(svg, mx - 12, my - 44, "第29轮", { "text-anchor":"end", "font-size":11 });
  txt(svg, mx - 12, my - 28, "客场双杀蓉城", { "text-anchor":"end", fill:CSS.ink2, "font-weight":700, "font-size":13 });

  /* 终点 */
  var ex = X(30), ey = Y(52);
  el("circle", { cx:ex, cy:ey, r:5.5, fill:CSS.blue, stroke:CSS.bg, "stroke-width":2.5 }, svg);
  el("circle", { cx:ex, cy:ey, r:10, fill:"none", stroke:CSS.blue, "stroke-width":1, opacity:.5 }, svg);
  el("line", { x1:ex + 6, y1:ey - 4, x2:ex + 20, y2:ey - 30, stroke:CSS.grid, "stroke-width":1 }, svg);
  el("line", { x1:ex + 6, y1:ey + 4, x2:ex + 20, y2:ey + 34, stroke:CSS.grid, "stroke-width":1 }, svg);
  el("line", { x1:ex + 22, y1:ey - 34, x2:ex + 34, y2:ey - 34, stroke:CSS.blue, "stroke-width":3, "stroke-linecap":"round" }, svg);
  txt(svg, ex + 38, ey - 30, "大连英博 52分", { fill:CSS.ink, "font-weight":700, "font-size":13 });
  el("line", { x1:ex + 22, y1:ey + 38, x2:ex + 34, y2:ey + 38, stroke:CSS.red, "stroke-width":3, "stroke-linecap":"round" }, svg);
  txt(svg, ex + 38, ey + 42, "成都蓉城 52分", { fill:CSS.ink, "font-weight":700, "font-size":13 });
  txt(svg, ex + 38, ey + 62, "同分 · 相互战绩夺冠", { fill:CSS.ink3, "font-size":11 });

  /* 交互 */
  var cw = document.getElementById("cw1"), tip = document.getElementById("tip1");
  var cross = el("line", { y1:T, y2:H - B, stroke:"rgba(234,241,250,.32)", "stroke-width":1, visibility:"hidden" }, svg);
  var dD = el("circle", { r:5, fill:CSS.blue, stroke:CSS.bg, "stroke-width":2, visibility:"hidden" }, svg);
  var dC = el("circle", { r:5, fill:CSS.red, stroke:CSS.bg, "stroke-width":2, visibility:"hidden" }, svg);
  var ov = el("rect", { x:L, y:T, width:pw, height:ph, fill:"transparent" }, svg);
  ov.style.cursor = "crosshair";

  var RES = { W:"胜", D:"平", L:"负" };
  var DLY_RES = "LLWWWWWLWLLLDWLLWDWLDWLWDWWWWW".split("");
  var CDR_RES = "WWDWWWWWWWWWLLWWDDDDDLWLWDLLLL".split("");

  function show(i, ev) {
    cross.setAttribute("x1", X(i + 1)); cross.setAttribute("x2", X(i + 1));
    cross.setAttribute("visibility", "visible");
    dD.setAttribute("cx", X(i + 1)); dD.setAttribute("cy", Y(DLY_PTS[i])); dD.setAttribute("visibility", "visible");
    dC.setAttribute("cx", X(i + 1)); dC.setAttribute("cy", Y(CDR_PTS[i])); dC.setAttribute("visibility", "visible");
    var g = GAP[i];
    tip.innerHTML =
      '<div class="r">第 ' + (i + 1) + ' 轮</div>' +
      '<div class="row"><i style="background:' + CSS.blue + '"></i>大连英博 <b>' + DLY_PTS[i] + '</b> 分 · ' + RES[DLY_RES[i]] + '</div>' +
      '<div class="row"><i style="background:' + CSS.red + '"></i>成都蓉城 <b>' + CDR_PTS[i] + '</b> 分 · ' + RES[CDR_RES[i]] + '</div>' +
      '<div class="r" style="margin-top:5px">分差 ' + (g === 0 ? "持平" : (g > 0 ? "成都 +" + g : "大连 +" + (-g))) + '</div>';
    tip.classList.add("on");
    var rect = svg.getBoundingClientRect(), wrect = cw.getBoundingClientRect();
    var scale = rect.width / W;
    tip.style.left = (rect.left - wrect.left + cw.scrollLeft + X(i + 1) * scale) + "px";
    tip.style.top = (rect.top - wrect.top + Math.min(Y(DLY_PTS[i]), Y(CDR_PTS[i])) * scale) + "px";
  }
  function hide() {
    cross.setAttribute("visibility", "hidden");
    dD.setAttribute("visibility", "hidden"); dC.setAttribute("visibility", "hidden");
    tip.classList.remove("on");
  }
  function idxFromEvent(ev) {
    var rect = svg.getBoundingClientRect();
    var x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left;
    var rel = (x / rect.width) * W;
    var i = Math.round((rel - L) / pw * 30) - 1;
    return Math.max(0, Math.min(29, i));
  }
  ov.addEventListener("mousemove", function (e) { show(idxFromEvent(e), e); });
  ov.addEventListener("mouseleave", hide);
  ov.addEventListener("touchstart", function (e) { show(idxFromEvent(e), e); }, { passive:true });
  ov.addEventListener("touchmove", function (e) { show(idxFromEvent(e), e); }, { passive:true });
  ov.addEventListener("touchend", hide);
})();

/* ==================================================================
   二、分差柱状图
   ================================================================== */
(function () {
  var box = document.getElementById("gapBars"), axis = document.getElementById("gapAxis");
  if (!box) return;
  var max = 18;
  GAP.forEach(function (g, i) {
    var col = document.createElement("div");
    col.className = "gap-col";
    var h = Math.max(2, (g / max) * 100);
    var color = g === 0 ? CSS.gold : (g > 0 ? CSS.red : CSS.blue);
    col.innerHTML = '<div class="b" style="height:0%;background:' + color + ';opacity:' + (g === 0 ? 1 : (0.45 + 0.55 * (g / max))) + '"></div>';
    col.title = "第 " + (i + 1) + " 轮：" + (g === 0 ? "持平" : (g > 0 ? "成都 +" + g : "大连 +" + (-g)));
    box.appendChild(col);
    var b = col.querySelector(".b");
    setTimeout(function () { b.style.height = h + "%"; }, 60 * i + 120);
  });
  for (var i = 0; i < 30; i++) {
    var s = document.createElement("span");
    s.textContent = (i + 1) % 5 === 0 || i === 0 ? String(i + 1) : "";
    axis.appendChild(s);
  }
})();

/* ==================================================================
   三、渲染：高光 / 阵容 / 感谢
   ================================================================== */
(function () {
  var rail = document.getElementById("mRail");
  if (rail) {
    MOMENTS.forEach(function (m, i) {
      var card = document.createElement("article");
      card.className = "m-card reveal";
      card.setAttribute("data-lb", m.img);
      card.setAttribute("data-cap", m.cap);
      card.innerHTML =
        '<div class="ph ' + (m.ratio || "ph-43") + '"><img src="' + m.img + '" alt="' + m.h + '" loading="lazy"' + (m.pos ? ' style="object-position:' + m.pos + '"' : '') + '>' +
          '<div class="m-cap"><div class="m-round">' + m.r + ' · ' + m.tag + '</div>' +
          '<h3>' + m.h + '</h3><p>' + m.p.slice(0, 34) + '…</p></div></div>' +
        '<div class="m-body"><p>' + m.p + '</p><div class="m-tags">' +
          m.tags.map(function (t, k) { return '<span class="' + (k === 0 ? "g" : "") + '">' + t + '</span>'; }).join("") +
        '</div></div>';
      rail.appendChild(card);
    });
  }
  var sq = document.getElementById("squad");
  if (sq) {
    SQUAD.forEach(function (p) {
      var d = document.createElement("div");
      d.className = "jersey" + (p[3] ? " key" : "");
      d.innerHTML = '<div class="no">' + p[0] + '</div><div class="nm">' + p[1] + '</div><div class="rl">' + p[2] + '</div>';
      sq.appendChild(d);
    });
  }
  var cb = document.getElementById("contrib");
  if (cb) {
    CONTRIB.forEach(function (c) {
      var d = document.createElement("div");
      d.className = "c-card";
      d.setAttribute("data-lb", c.img);
      d.setAttribute("data-cap", c.cap);
      d.innerHTML =
        '<div class="c-photo"><img src="' + c.img + '" alt="' + c.h + '" loading="lazy"></div>' +
        '<div class="c-text"><span class="tag">' + c.tag + '</span><h4>' + c.h + '</h4>' +
        '<div class="sc">' + c.sc + '</div><p>' + c.p + '</p></div>';
      cb.appendChild(d);
    });
  }
  var gg = document.getElementById("galGrid");
  if (gg) {
    GALLERY.forEach(function (g) {
      var f = document.createElement("figure");
      f.className = "gal reveal";
      f.setAttribute("data-lb", g.img);
      f.setAttribute("data-cap", g.cap);
      f.innerHTML = '<div class="box"><img src="' + g.img + '" alt="' + g.t + '" loading="lazy"></div>' +
        '<figcaption>' + g.t + '</figcaption>';
      gg.appendChild(f);
    });
  }
  var hg = document.getElementById("histGrid");
  if (hg) {
    HIST.forEach(function (h) {
      var d = document.createElement("div");
      d.className = "hist-item reveal";
      d.setAttribute("data-lb", h.img);
      d.setAttribute("data-cap", h.p);
      d.innerHTML = '<div class="box"><img src="' + h.img + '" alt="' + h.yr + '" loading="lazy"></div>' +
        '<div class="tx"><div class="yr">' + h.yr + '</div><p>' + h.p + '</p></div>';
      hg.appendChild(d);
    });
  }
})();

/* ==================================================================
   四、灯箱
   ================================================================== */
(function () {
  var lb = document.getElementById("lb"), img = document.getElementById("lbImg"),
      cap = document.getElementById("lbCap"), x = document.getElementById("lbX");
  function open(src, c) {
    img.src = src; img.alt = c || ""; cap.textContent = c || ""; lb.classList.add("on");
  }
  function close() { lb.classList.remove("on"); }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-lb]") : null;
    if (t) { open(t.getAttribute("data-lb"), t.getAttribute("data-cap")); }
  });
  if (x) x.addEventListener("click", close);
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();

/* ==================================================================
   五、滚动 / 进度 / 揭示 / 计数
   ================================================================== */
(function () {
  var prog = document.getElementById("progress"), bar = document.getElementById("topbar");
  var vh = function () { return window.innerHeight || document.documentElement.clientHeight; };

  /* 揭示：以 IntersectionObserver 为主，滚动检测为兜底（不依赖 IO 也能显示） */
  var io = (typeof IntersectionObserver !== "undefined") ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:.1, rootMargin:"0px 0px -40px" }) : null;

  function watchReveal() {
    var ns = document.querySelectorAll(".reveal:not(.in)");
    for (var i = 0; i < ns.length; i++) {
      var n = ns[i];
      if (io) io.observe(n);
      var r = n.getBoundingClientRect();
      /* 只要用户已经滚到（或滚过）它，就显示——避免快速滚动时漏掉 */
      if (r.top < vh() * 0.94) n.classList.add("in");
    }
  }

  function countUp(n) {
    if (n.__done) return; n.__done = 1;
    var target = parseFloat(n.dataset.count), t0 = null;
    /* 保留 <small> 单位后缀（如「年」「人」「/15」），避免动画把单位吃掉 */
    var sm = n.querySelector("small"), tail = sm ? sm.outerHTML : "";
    var fmt = function (v) { return Math.round(v).toLocaleString("en-US"); };
    function put(v) { n.innerHTML = fmt(v) + tail; }
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / 1100);
      put(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step); else { clearTimeout(guard); put(target); }
    }
    /* rAF 在后台标签页 / 部分 WebView 里会被节流甚至停摆，
       这里加一道兜底，保证数字最终一定落到正确值。 */
    var guard = setTimeout(function () { put(target); }, 1600);
    requestAnimationFrame(step);
  }
  var cio = (typeof IntersectionObserver !== "undefined") ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) countUp(e.target); });
  }, { threshold:.35 }) : null;

  function watchCount() {
    var ns = document.querySelectorAll("[data-count]");
    for (var i = 0; i < ns.length; i++) {
      var n = ns[i];
      if (cio) cio.observe(n);
      var r = n.getBoundingClientRect();
      if (r.top < vh() * 0.9 && r.bottom > 0) countUp(n);
    }
  }

  var links = document.querySelectorAll(".navlinks a");
  function syncChrome() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, (h.scrollHeight - h.clientHeight));
    prog.style.width = (p * 100) + "%";
    if (h.scrollTop > 60) bar.classList.add("solid"); else bar.classList.remove("solid");
    /* 导航高亮 */
    var ids = ["numbers", "race", "moments", "gallery", "fans", "hist", "thanks"], cur = null;
    for (var i = 0; i < ids.length; i++) {
      var n = document.getElementById(ids[i]);
      if (n && n.getBoundingClientRect().top <= 120) cur = ids[i];
    }
    for (var j = 0; j < links.length; j++) {
      links[j].classList.toggle("active", links[j].getAttribute("href") === "#" + cur);
    }
  }
  var ticking = false;
  function onScroll() {
    syncChrome();
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; watchReveal(); watchCount(); });
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  window.addEventListener("resize", function () { syncChrome(); watchReveal(); watchCount(); });
  syncChrome(); watchReveal(); watchCount();
  setTimeout(function () { syncChrome(); watchReveal(); watchCount(); }, 700);
  setTimeout(function () { syncChrome(); watchReveal(); watchCount(); }, 2200);
  /* 定时轮询兜底：某些 WebView 会饿死 rAF，导致滚动回调不触发 */
  var revTimer = setInterval(function () {
    syncChrome(); watchReveal(); watchCount();
    if (!document.querySelector(".reveal:not(.in)")) clearInterval(revTimer);
  }, 300);

})();

/* ==================================================================
   六、雪
   ================================================================== */
(function () {
  var cv = document.getElementById("snow");
  if (!cv) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ctx = cv.getContext("2d"), flakes = [], raf = null;
  function resize() {
    var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = r.width * dpr; cv.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(90, Math.round(r.width / 14));
    flakes = [];
    for (var i = 0; i < n; i++) {
      flakes.push({ x:Math.random() * r.width, y:Math.random() * r.height,
        r:Math.random() * 2.1 + 0.7, s:Math.random() * 0.55 + 0.25,
        d:Math.random() * Math.PI * 2, w:Math.random() * 0.012 + 0.004 });
    }
  }
  function draw() {
    var r = cv.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.d += f.w; f.y += f.s; f.x += Math.sin(f.d) * 0.42;
      if (f.y > r.height + 6) { f.y = -6; f.x = Math.random() * r.width; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(226,238,252," + (0.28 + f.r * 0.22) + ")";
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }
  resize(); draw();
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
  /* 离开视口时暂停 */
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { if (!raf) draw(); }
      else if (raf) { cancelAnimationFrame(raf); raf = null; }
    });
  }, { threshold:0 }).observe(cv);
})();

/* ==================================================================
   七、开场门：点击进入
   容器 CSP 的 media-src 不支持 data: / blob: 媒体，且上传白名单不含音频扩展名，
   背景音乐无法合规交付，已整体移除（含播放器）。此处只保留开场进入逻辑。
   ================================================================== */
(function () {
  var gate = document.getElementById("gate"), enter = document.getElementById("enterBtn");
  var closed = false;

  function closeGate() {
    if (closed) return;
    closed = true;
    if (gate) gate.classList.add("off");
    document.removeEventListener("click", onAny, true);
    document.removeEventListener("touchstart", onAny, true);
    document.removeEventListener("keydown", onAny, true);
  }
  function onAny() { closeGate(); }

  if (enter) enter.addEventListener("click", function (e) {
    e.stopPropagation();
    closeGate();
  });

  /* 兜底：任意点击 / 触摸 / 按键都能关闭遮罩，避免出现无法进入的死页 */
  document.addEventListener("click", onAny, true);
  document.addEventListener("touchstart", onAny, { passive: true, capture: true });
  document.addEventListener("keydown", onAny, true);
})();

/* ==================================================================
   能力检测与兼容基线（Chrome 61）
   ================================================================== */
(function () {
  /* Flex gap：语法检测不能证明在 Flex 布局中生效，需实测一次布局 */
  try {
    var f = document.createElement("div");
    f.style.position = "absolute";
    f.style.visibility = "hidden";
    f.style.display = "flex";
    f.style.flexDirection = "column";
    f.style.rowGap = "1px";
    f.appendChild(document.createElement("div"));
    f.appendChild(document.createElement("div"));
    document.body.appendChild(f);
    var ok = f.scrollHeight === 1;
    if (f.parentNode) f.parentNode.removeChild(f);
    if (ok) document.documentElement.className += " supports-flex-gap";
  } catch (e) {}

  /* 容器内不允许跳转站外 URL / target=_blank：改为展示链接供长按复制 */
  var frBtn = document.getElementById("footRead");
  var frUrl = document.getElementById("frUrl");
  var frTxt = document.getElementById("frUrlText");
  if (frBtn && frUrl && frTxt) {
    var toggle = function () {
      frUrl.hidden = !frUrl.hidden;
      frBtn.setAttribute("aria-expanded", frUrl.hidden ? "false" : "true");
      if (!frUrl.hidden && window.getSelection && document.createRange) {
        try {
          var r = document.createRange();
          r.selectNodeContents(frTxt);
          var s = window.getSelection();
          s.removeAllRanges();
          s.addRange(r);
        } catch (e2) {}
      }
    };
    frBtn.addEventListener("click", toggle);
    frBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  }
})();

})();
