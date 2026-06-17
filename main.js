/* ambient mario-inspired pixel page — no framework, no build step */
(function () {
  'use strict';

  var REDUCED = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BLOCK_SCALE = 2; // DOM blocks render sprites at 2x

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

  Promise.all([
    fetch('assets/sprites.json?v=d80988c7').then(function (r) { return r.json(); }),
    loadImage('assets/sprites.png?v=d80988c7'),
  ]).then(function (loaded) {
    var sprites = loaded[0].sprites;
    var atlas = loaded[1];
    setupBlocks(sprites, atlas);
    setupDialog();
    setupScene(sprites, atlas);
  });

  // ------------------------------------------------------------- blocks

  function frameRect(sprites, name, i) {
    var meta = sprites[name];
    return meta.frames[Math.min(i, meta.frameCount - 1)];
  }

  function applyBlockSprite(el, sprites, atlas, name, frame) {
    var r = frameRect(sprites, name, frame);
    el.style.width = r.w * BLOCK_SCALE + 'px';
    el.style.height = r.h * BLOCK_SCALE + 'px';
    el.style.backgroundImage = 'url(assets/sprites.png?v=d80988c7)';
    el.style.backgroundSize =
      atlas.width * BLOCK_SCALE + 'px ' + atlas.height * BLOCK_SCALE + 'px';
    el.style.backgroundPosition =
      -r.x * BLOCK_SCALE + 'px ' + -r.y * BLOCK_SCALE + 'px';
    el.classList.add('has-sprite');
  }

  function setupBlocks(sprites, atlas) {
    var blocks = document.querySelectorAll('.block');
    Array.prototype.forEach.call(blocks, function (el) {
      applyBlockSprite(el, sprites, atlas, el.getAttribute('data-sprite'), 0);
      el.style.setProperty('--bob-delay', (-Math.random() * 3.2).toFixed(2) + 's');
    });

    // glow pulse on the three link blocks
    var links = document.querySelectorAll('.block.is-link');
    if (!REDUCED) {
      var pulse = 0;
      setInterval(function () {
        pulse = 1 - pulse;
        Array.prototype.forEach.call(links, function (el) {
          var r = frameRect(sprites, 'block-link', pulse);
          el.style.backgroundPosition =
            -r.x * BLOCK_SCALE + 'px ' + -r.y * BLOCK_SCALE + 'px';
        });
      }, 350);
    }

    Array.prototype.forEach.call(links, function (el) {
      addTeleIcon(el, sprites, atlas);
      wireLinkBlock(el, sprites, atlas);
    });
  }

  // floating icon above a link block, telegraphing what it does
  function addTeleIcon(el, sprites, atlas) {
    var name = el.getAttribute('data-icon');
    if (!name) return;
    var r = frameRect(sprites, name, 0);
    var icon = document.createElement('span');
    icon.className = 'tele-icon';
    icon.style.width = r.w * BLOCK_SCALE + 'px';
    icon.style.height = r.h * BLOCK_SCALE + 'px';
    icon.style.backgroundImage = 'url(assets/sprites.png?v=d80988c7)';
    icon.style.backgroundSize =
      atlas.width * BLOCK_SCALE + 'px ' + atlas.height * BLOCK_SCALE + 'px';
    icon.style.backgroundPosition =
      -r.x * BLOCK_SCALE + 'px ' + -r.y * BLOCK_SCALE + 'px';
    icon.style.setProperty('--tele-delay', (-Math.random() * 2.8).toFixed(2) + 's');
    el.appendChild(icon);
  }

  var legendFaded = false;
  function fadeLegend() {
    if (legendFaded) return;
    legendFaded = true;
    var legend = document.getElementById('legend');
    if (legend) legend.classList.add('faded');
  }

  function bump(el) {
    el.classList.remove('bumping');
    void el.offsetWidth; // restart the animation
    el.classList.add('bumping');
  }

  function popIcon(el, sprites, atlas) {
    var name = el.getAttribute('data-icon');
    if (!name || REDUCED) return;
    var r = frameRect(sprites, name, 0);
    var icon = document.createElement('span');
    icon.className = 'pop-icon';
    icon.style.width = r.w * BLOCK_SCALE + 'px';
    icon.style.height = r.h * BLOCK_SCALE + 'px';
    icon.style.marginLeft = -(r.w * BLOCK_SCALE) / 2 + 'px';
    icon.style.backgroundImage = 'url(assets/sprites.png?v=d80988c7)';
    icon.style.backgroundSize =
      atlas.width * BLOCK_SCALE + 'px ' + atlas.height * BLOCK_SCALE + 'px';
    icon.style.backgroundPosition =
      -r.x * BLOCK_SCALE + 'px ' + -r.y * BLOCK_SCALE + 'px';
    el.appendChild(icon);
    // the telegraph icon ducks out of the way while its twin arcs
    var tele = el.querySelector('.tele-icon');
    if (tele) {
      tele.classList.add('hidden');
      setTimeout(function () { tele.classList.remove('hidden'); }, 800);
    }
    var dir = Math.random() < 0.5 ? -1 : 1;
    var anim = icon.animate([
      { transform: 'translate(0, 6px)', opacity: 0 },
      { transform: 'translate(' + dir * 10 + 'px, -46px)', opacity: 1, offset: 0.3 },
      { transform: 'translate(' + dir * 34 + 'px, -64px) rotate(' + dir * 14 + 'deg)', opacity: 1, offset: 0.65 },
      { transform: 'translate(' + dir * 56 + 'px, -34px) rotate(' + dir * 24 + 'deg)', opacity: 0 },
    ], { duration: 750, easing: 'ease-out' });
    anim.onfinish = function () { icon.remove(); };
  }

  function wireLinkBlock(el, sprites, atlas) {
    var busy = false;
    var preview = function () {
      fadeLegend();
      if (busy || REDUCED) return;
      busy = true;
      bump(el);
      popIcon(el, sprites, atlas);
      setTimeout(function () { busy = false; }, 600);
    };
    el.addEventListener('pointerenter', preview);
    el.addEventListener('focus', preview);

    el.addEventListener('click', function (event) {
      fadeLegend();
      var fire = function () {
        if (el.id === 'about-block') {
          document.getElementById('about-dialog').showModal();
        } else {
          window.location.href = el.getAttribute('href');
        }
      };
      if (REDUCED) {
        if (el.id === 'about-block') fire();
        return; // links navigate natively
      }
      if (el.getAttribute('target') === '_blank') {
        // let the browser open the new tab synchronously (popup-blocker
        // safe); the bump still plays on this page
        bump(el);
        popIcon(el, sprites, atlas);
        return;
      }
      event.preventDefault();
      bump(el);
      popIcon(el, sprites, atlas);
      setTimeout(fire, 430);
    });
  }

  // ------------------------------------------------------------- dialog

  function setupDialog() {
    var dialog = document.getElementById('about-dialog');
    document.getElementById('about-close').addEventListener('click', function () {
      dialog.close();
    });
    // click on the backdrop (the dialog element itself) closes it
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
    // ESC + focus trap are native <dialog> behavior
  }

  // -------------------------------------------------------------- scene

  function setupScene(sprites, atlas) {
    var canvas = document.getElementById('scene');
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, S = 2, dpr = 1;

    function rectOf(name, frame) { return frameRect(sprites, name, frame); }

    // Each Sawyer pose is bottom-aligned in a fixed 64px frame, but the art
    // fills a different slice of it (jump fills the frame, walk/idle leave
    // transparent headroom). Drawing every frame at the same frame scale made
    // walk/idle look smaller than jump. Measure the real (opaque) height of
    // each pose so we can scale them to one shared on-screen height.
    var SAWYER_ANIMS = ['sawyer-walk', 'sawyer-idle', 'sawyer-jump'];
    function measureContentHeights() {
      var fallback = { 'sawyer-walk': 53, 'sawyer-idle': 60, 'sawyer-jump': 64 };
      var oc = document.createElement('canvas');
      oc.width = atlas.width;
      oc.height = atlas.height;
      var octx = oc.getContext('2d');
      if (!octx) return fallback;
      octx.drawImage(atlas, 0, 0);
      var data;
      try {
        data = octx.getImageData(0, 0, atlas.width, atlas.height).data;
      } catch (e) {
        return fallback; // tainted canvas (e.g. file://) — use known values
      }
      var aw = atlas.width;
      function frameContentH(f) {
        var top = f.h, bottom = -1;
        for (var y = 0; y < f.h; y++) {
          for (var x = 0; x < f.w; x++) {
            if (data[((f.y + y) * aw + (f.x + x)) * 4 + 3] > 8) {
              if (y < top) top = y;
              if (y > bottom) bottom = y;
              break;
            }
          }
        }
        return bottom >= top ? bottom - top + 1 : f.h;
      }
      var out = {};
      SAWYER_ANIMS.forEach(function (name) {
        var h = 0;
        sprites[name].frames.forEach(function (f) {
          h = Math.max(h, frameContentH(f));
        });
        out[name] = h || fallback[name];
      });
      return out;
    }
    var sawyerContentH = measureContentHeights();
    // normalize every pose to the jump's visible height so size is constant,
    // then scale the whole guy up so he stands tall over the cats (he's 6'4")
    var sawyerTargetH = sawyerContentH['sawyer-jump'];
    var SAWYER_BOOST = 1.5;
    function sawyerScale(name) {
      return SAWYER_BOOST * sawyerTargetH / (sawyerContentH[name] || sawyerTargetH);
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      S = W < 700 ? 1 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    }

    function groundTop() { return H - rectOf('ground', 0).h * S; }

    var elapsed = 0;

    var sawyer = {
      x: 0.35, // stored as fraction until first layout
      dir: 1,
      mode: 'walk',
      modeT: 0,
      modeDur: 3,
      jumpY: 0,
      vy: 0,
      jumping: false,
    };

    var cats = [
      { name: 'cat-brown', x: 0.7, dir: -1, speed: 52, phase: 0 },
      { name: 'cat-gray', x: 0.12, dir: 1, speed: 28, phase: 0.5 },
    ];

    // ambient cyclist: crosses right-to-left now and then, then waits a while.
    // Purely decorative — no collision with Sawyer-man or the cats.
    var nikki = {
      active: false,
      x: 0,
      speed: 140,                       // px/s (before S); brisker than a walk
      nextIn: 5 + Math.random() * 7,    // first ride shows up soon-ish
    };
    function nikkiInterval() { return 30 + Math.random() * 15; } // 30-45s

    var clouds = [
      { name: 'cloud-1', x: 0.15, y: 0.10, v: 7, scale: 2 },
      { name: 'cloud-2', x: 0.55, y: 0.22, v: 10, scale: 2 },
      { name: 'cloud-1', x: 0.82, y: 0.16, v: 5, scale: 3 },
    ];

    var fractional = true;
    function materialize() {
      // convert layout fractions to pixels once the viewport is known
      sawyer.x = sawyer.x * W;
      cats.forEach(function (c) { c.x = c.x * W; });
      clouds.forEach(function (c) { c.x = c.x * W; });
      fractional = false;
    }

    function startJump() {
      if (sawyer.jumping) return;
      sawyer.jumping = true;
      sawyer.vy = -460; // higher arc so he clears a cat and lands beside it
      sawyer.jumpY = 0;
    }

    function update(dt) {
      elapsed += dt;

      // sawyer behavior: walk <-> idle, occasional hop
      sawyer.modeT += dt;
      if (!sawyer.jumping && sawyer.modeT > sawyer.modeDur) {
        sawyer.modeT = 0;
        if (sawyer.mode === 'walk') {
          sawyer.mode = 'idle';
          sawyer.modeDur = 1 + Math.random() * 1.5;
          if (Math.random() < 0.3) sawyer.dir *= -1;
        } else {
          sawyer.mode = 'walk';
          sawyer.modeDur = 2 + Math.random() * 3;
        }
      }
      if (sawyer.mode === 'walk' || sawyer.jumping) {
        // leap forward faster while airborne so the hop carries him past a cat
        var hspeed = sawyer.jumping ? 120 : 70;
        sawyer.x += sawyer.dir * hspeed * S * dt;
        var margin = 24;
        var sw = rectOf('sawyer-walk', 0).w * S;
        if (sawyer.x < margin) { sawyer.x = margin; sawyer.dir = 1; }
        if (sawyer.x > W - margin - sw) { sawyer.x = W - margin - sw; sawyer.dir = -1; }
      }
      if (sawyer.mode === 'walk' && !sawyer.jumping && Math.random() < 0.05 * dt) {
        startJump();
      }
      if (sawyer.jumping) {
        sawyer.vy += 950 * dt;
        sawyer.jumpY += sawyer.vy * dt;
        if (sawyer.jumpY >= 0) {
          sawyer.jumpY = 0;
          sawyer.jumping = false;
        }
      }

      // cats patrol; sawyer hops over an approaching cat
      cats.forEach(function (cat) {
        var cw = rectOf(cat.name, 0).w * S;
        cat.x += cat.dir * cat.speed * S * dt;
        if (cat.x < 8) { cat.x = 8; cat.dir = 1; }
        if (cat.x > W - 8 - cw) { cat.x = W - 8 - cw; cat.dir = -1; }
        var dx = cat.x + cw / 2 - (sawyer.x + 14 * S);
        var approaching = (dx > 0 && sawyer.dir > 0) || (dx < 0 && sawyer.dir < 0);
        // only hop a cat closing in head-on; chasing a cat fleeing the same
        // way could otherwise drop him on top of it as it slips underneath
        var headOn = cat.dir * -dx > 0;
        if (!sawyer.jumping && sawyer.mode === 'walk' && approaching && headOn &&
            Math.abs(dx) < 60 * S) {
          startJump();
        }
      });

      clouds.forEach(function (cloud) {
        var cw = rectOf(cloud.name, 0).w * cloud.scale;
        cloud.x += cloud.v * dt;
        if (cloud.x > W + 20) cloud.x = -cw - 10;
      });

      // ambient cyclist crossing right -> left, then idle until next interval
      var nw = rectOf('nikki-bike', 0).w * S;
      if (nikki.active) {
        nikki.x -= nikki.speed * S * dt;
        if (nikki.x + nw < 0) {           // fully off the left edge
          nikki.active = false;
          nikki.nextIn = nikkiInterval();
        }
      } else {
        nikki.nextIn -= dt;
        if (nikki.nextIn <= 0) {
          nikki.active = true;
          nikki.x = W;                    // enter from the right edge
        }
      }
    }

    function drawSprite(name, frame, x, y, scale, flip) {
      var r = rectOf(name, frame);
      if (flip) {
        ctx.save();
        ctx.translate(x + r.w * scale, y);
        ctx.scale(-1, 1);
        ctx.drawImage(atlas, r.x, r.y, r.w, r.h, 0, 0, r.w * scale, r.h * scale);
        ctx.restore();
      } else {
        ctx.drawImage(atlas, r.x, r.y, r.w, r.h, x, y, r.w * scale, r.h * scale);
      }
    }

    function animFrame(name, phase) {
      var meta = sprites[name];
      if (meta.frameCount < 2 || !meta.fps) return 0;
      return Math.floor((elapsed + (phase || 0)) * meta.fps) % meta.frameCount;
    }

    function render() {
      ctx.clearRect(0, 0, W, H);

      clouds.forEach(function (cloud) {
        drawSprite(cloud.name, 0, cloud.x, cloud.y * H, cloud.scale, false);
      });

      var gr = rectOf('ground', 0);
      var gy = groundTop();
      for (var gx = 0; gx < W; gx += gr.w * S) {
        drawSprite('ground', 0, gx, gy, S, false);
      }

      // cyclist rides along the ground line, behind Sawyer-man and the cats.
      // Atlas art faces right; flip so she heads left. Wheels meet the ground.
      if (nikki.active) {
        var nkr = rectOf('nikki-bike', 0);
        drawSprite('nikki-bike', animFrame('nikki-bike', 0),
          nikki.x, gy - nkr.h * S + 4 * S, S, true);
      }

      cats.forEach(function (cat) {
        var r = rectOf(cat.name, 0);
        drawSprite(cat.name, animFrame(cat.name, cat.phase),
          cat.x, gy - r.h * S + 4 * S, S, cat.dir < 0);
      });

      var animName = sawyer.jumping ? 'sawyer-jump'
        : (sawyer.mode === 'walk' ? 'sawyer-walk' : 'sawyer-idle');
      var sr = rectOf(animName, 0);
      // scale each pose to the shared height; feet stay pinned to the ground
      // and he stays horizontally centered so growing walk/idle doesn't shift
      var scale = S * sawyerScale(animName);
      var sx = sawyer.x - sr.w * (scale - S) / 2;
      var sy = gy + 2 * S - sr.h * scale + sawyer.jumpY * S;
      // all sprites face right in the atlas; flip when heading left
      drawSprite(animName, animFrame(animName, 0), sx, sy, scale, sawyer.dir < 0);
    }

    var last = 0;
    function tick(now) {
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      render();
      requestAnimationFrame(tick);
    }

    resize();
    materialize();
    window.addEventListener('resize', function () {
      var oldW = W;
      resize();
      if (oldW > 0 && !fractional) {
        var k = W / oldW;
        sawyer.x *= k;
        cats.forEach(function (c) { c.x *= k; });
        clouds.forEach(function (c) { c.x *= k; });
        if (nikki.active) nikki.x *= k;
      }
      if (REDUCED) render();
    });

    if (REDUCED) {
      render(); // single static frame, no ambient motion
      return;
    }
    requestAnimationFrame(function (now) {
      last = now;
      requestAnimationFrame(tick);
    });
  }
})();
