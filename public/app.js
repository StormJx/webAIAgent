(function () {
  "use strict";

  var data = window.DEMO_DATA || [];
  var chat = document.getElementById("chat");
  var chips = document.getElementById("chips");
  var traceHint = document.querySelector(".trace__hint");
  var traceList = document.getElementById("traceList");
  var traceMeta = document.getElementById("traceMeta");
  var composer = document.getElementById("composer");
  var input = document.getElementById("userInput");
  var busy = false;

  function wait(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function scrollDown() {
    chat.scrollTop = chat.scrollHeight;
  }

  function addUser(text) {
    var el = document.createElement("div");
    el.className = "msg msg--user";
    el.innerHTML = '<div class="av">你</div><div class="bubble"></div>';
    el.querySelector(".bubble").textContent = text;
    chat.appendChild(el);
    scrollDown();
  }

  function addTyping() {
    var el = document.createElement("div");
    el.className = "msg msg--bot";
    el.innerHTML =
      '<div class="av">文</div><div class="bubble">' +
      '<span class="typing"><i></i><i></i><i></i></span></div>';
    chat.appendChild(el);
    scrollDown();
    return el;
  }

  function addBot(html, handoff) {
    var el = document.createElement("div");
    el.className = "msg msg--bot";
    el.innerHTML =
      '<div class="av">文</div><div class="bubble' +
      (handoff ? " bubble--handoff" : "") +
      '"></div>';
    el.querySelector(".bubble").innerHTML = html;
    chat.appendChild(el);
    scrollDown();
  }

  function addSystem(text) {
    var el = document.createElement("div");
    el.className = "day";
    el.textContent = text;
    chat.appendChild(el);
    scrollDown();
  }

  async function renderTrace(item) {
    traceHint.hidden = true;
    traceList.innerHTML = "";
    traceMeta.hidden = true;

    for (var i = 0; i < item.steps.length; i++) {
      var li = document.createElement("li");
      li.textContent = item.steps[i];
      traceList.appendChild(li);
      await wait(420);
      li.classList.add("on");
    }

    document.getElementById("mCost").textContent = item.meta.cost;
    document.getElementById("mCalls").textContent = item.meta.calls + " 次";
    document.getElementById("mAt").textContent = item.meta.at;
    traceMeta.hidden = false;
  }

  async function play(item, btn) {
    if (busy) return;
    busy = true;
    setChipsDisabled(true);

    addUser(item.question);
    await wait(500);

    var typing = addTyping();
    await renderTrace(item);
    await wait(350);

    typing.remove();
    addBot(item.answer, item.tone === "handoff");

    btn.classList.add("chip--done");
    setChipsDisabled(false);
    busy = false;
  }

  function setChipsDisabled(state) {
    Array.prototype.forEach.call(chips.querySelectorAll("button"), function (b) {
      b.disabled = state;
    });
  }

  data.forEach(function (item) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = item.chip;
    btn.addEventListener("click", function () { play(item, btn); });
    chips.appendChild(btn);
  });

  function matchDemo(text) {
    var q = text.toLowerCase();
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var keys = item.keywords || [];
      for (var k = 0; k < keys.length; k++) {
        if (q.indexOf(String(keys[k]).toLowerCase()) !== -1) return item;
      }
    }
    return null;
  }

  function feishuLinkHtml() {
    var url = window.FEISHU_BOT_URL || "#add";
    return '<a href="' + url + '" target="_blank" rel="noopener">添加飞书机器人</a>';
  }

  composer.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v || busy) return;
    input.value = "";

    var hit = matchDemo(v);
    if (hit) {
      var btn = chips.querySelectorAll("button")[data.indexOf(hit)];
      play(hit, btn || document.createElement("button"));
      return;
    }

    addUser(v);
    addBot(
      "<p>这个问题演示库里还没有，本页不会调用模型。</p>" +
      "<p>请" + feishuLinkHtml() + "，在飞书私聊把同一句话发给我，我会去 Meta 官方文档核对后再回答。</p>"
    );
  });
})();
