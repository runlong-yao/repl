import {
  isVNode as ui,
  Comment as ci,
  Fragment as Mr,
  defineComponent as le,
  computed as A,
  ref as B,
  watch as ut,
  onMounted as Wt,
  readonly as di,
  inject as be,
  getCurrentInstance as Pn,
  onBeforeUnmount as Br,
  renderSlot as fi,
  onActivated as hi,
  onDeactivated as vi,
  provide as zn,
  onBeforeMount as Ar,
  shallowRef as pi,
  watchEffect as ct,
  h as v,
  Transition as mr,
  toRef as dt,
  mergeProps as gi,
  nextTick as Nr,
} from 'vue'
function bi(e) {
  return e.composedPath()[0] || null
}
function Vr(e) {
  return typeof e == 'string'
    ? e.endsWith('px')
      ? Number(e.slice(0, e.length - 2))
      : Number(e)
    : e
}
function _n(e, t) {
  const r = e.trim().split(/\s+/g),
    n = {
      top: r[0],
    }
  switch (r.length) {
    case 1:
      ;(n.right = r[0]), (n.bottom = r[0]), (n.left = r[0])
      break
    case 2:
      ;(n.right = r[1]), (n.left = r[1]), (n.bottom = r[0])
      break
    case 3:
      ;(n.right = r[1]), (n.bottom = r[2]), (n.left = r[1])
      break
    case 4:
      ;(n.right = r[1]), (n.bottom = r[2]), (n.left = r[3])
      break
    default:
      throw new Error('[seemly/getMargin]:' + e + ' is not a valid value.')
  }
  return n
}
const Ur = {
    black: '#000',
    silver: '#C0C0C0',
    gray: '#808080',
    white: '#FFF',
    maroon: '#800000',
    red: '#F00',
    purple: '#800080',
    fuchsia: '#F0F',
    green: '#008000',
    lime: '#0F0',
    olive: '#808000',
    yellow: '#FF0',
    navy: '#000080',
    blue: '#00F',
    teal: '#008080',
    aqua: '#0FF',
    transparent: '#0000',
  },
  Le = '^\\s*',
  Ne = '\\s*$',
  $e = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*',
  Pe = '([0-9A-Fa-f])',
  ze = '([0-9A-Fa-f]{2})',
  mi = new RegExp(`${Le}rgb\\s*\\(${$e},${$e},${$e}\\)${Ne}`),
  yi = new RegExp(`${Le}rgba\\s*\\(${$e},${$e},${$e},${$e}\\)${Ne}`),
  wi = new RegExp(`${Le}#${Pe}${Pe}${Pe}${Ne}`),
  xi = new RegExp(`${Le}#${ze}${ze}${ze}${Ne}`),
  Ci = new RegExp(`${Le}#${Pe}${Pe}${Pe}${Pe}${Ne}`),
  Si = new RegExp(`${Le}#${ze}${ze}${ze}${ze}${Ne}`)
function ie(e) {
  return parseInt(e, 16)
}
function Be(e) {
  try {
    let t
    if ((t = xi.exec(e))) return [ie(t[1]), ie(t[2]), ie(t[3]), 1]
    if ((t = mi.exec(e))) return [ne(t[1]), ne(t[5]), ne(t[9]), 1]
    if ((t = yi.exec(e))) return [ne(t[1]), ne(t[5]), ne(t[9]), it(t[13])]
    if ((t = wi.exec(e)))
      return [ie(t[1] + t[1]), ie(t[2] + t[2]), ie(t[3] + t[3]), 1]
    if ((t = Si.exec(e)))
      return [ie(t[1]), ie(t[2]), ie(t[3]), it(ie(t[4]) / 255)]
    if ((t = Ci.exec(e)))
      return [
        ie(t[1] + t[1]),
        ie(t[2] + t[2]),
        ie(t[3] + t[3]),
        it(ie(t[4] + t[4]) / 255),
      ]
    if (e in Ur) return Be(Ur[e])
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`)
  } catch (t) {
    throw t
  }
}
function Ti(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e
}
function yr(e, t, r, n) {
  return `rgba(${ne(e)}, ${ne(t)}, ${ne(r)}, ${Ti(n)})`
}
function ur(e, t, r, n, o) {
  return ne((e * t * (1 - n) + r * n) / o)
}
function Ri(e, t) {
  Array.isArray(e) || (e = Be(e)), Array.isArray(t) || (t = Be(t))
  const r = e[3],
    n = t[3],
    o = it(r + n - r * n)
  return yr(
    ur(e[0], r, t[0], n, o),
    ur(e[1], r, t[1], n, o),
    ur(e[2], r, t[2], n, o),
    o,
  )
}
function cr(e, t) {
  const [r, n, o, i = 1] = Array.isArray(e) ? e : Be(e)
  return t.alpha ? yr(r, n, o, t.alpha) : yr(r, n, o, i)
}
function $t(e, t) {
  const [r, n, o, i = 1] = Array.isArray(e) ? e : Be(e),
    { lightness: l = 1, alpha: s = 1 } = t
  return $i([r * l, n * l, o * l, i * s])
}
function it(e) {
  const t = Math.round(Number(e) * 100) / 100
  return t > 1 ? 1 : t < 0 ? 0 : t
}
function ne(e) {
  const t = Math.round(Number(e))
  return t > 255 ? 255 : t < 0 ? 0 : t
}
function $i(e) {
  const [t, r, n] = e
  return 3 in e
    ? `rgba(${ne(t)}, ${ne(r)}, ${ne(n)}, ${it(e[3])})`
    : `rgba(${ne(t)}, ${ne(r)}, ${ne(n)}, 1)`
}
function J(e, ...t) {
  if (Array.isArray(e)) e.forEach((r) => J(r, ...t))
  else return e(...t)
}
function Pi(e, t) {
  throw new Error(`[naive/${e}]: ${t}`)
}
function jt(e) {
  return e.some((t) =>
    ui(t) ? !(t.type === ci || (t.type === Mr && !jt(t.children))) : !0,
  )
    ? e
    : null
}
function at(e, t) {
  return (e && jt(e())) || t()
}
function zi(e, t, r) {
  return (e && jt(e(t))) || r(t)
}
function Pt(e, t) {
  const r = e && jt(e())
  return t(r || null)
}
const Xr = le({
  render() {
    var e, t
    return (t = (e = this.$slots).default) === null || t === void 0
      ? void 0
      : t.call(e)
  },
})
function _i(e) {
  const { left: t, right: r, top: n, bottom: o } = _n(e)
  return `${n} ${r} ${o} ${t}`
}
function Ei(e) {
  let t = 0
  for (let r = 0; r < e.length; ++r) e[r] === '&' && ++t
  return t
}
const En = /\s*,(?![^(]*\))\s*/g,
  Mi = /\s+/g
function Bi(e, t) {
  const r = []
  return (
    t.split(En).forEach((n) => {
      let o = Ei(n)
      if (o) {
        if (o === 1) {
          e.forEach((l) => {
            r.push(n.replace('&', l))
          })
          return
        }
      } else {
        e.forEach((l) => {
          r.push(
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (l && l + ' ') + n,
          )
        })
        return
      }
      let i = [n]
      for (; o--; ) {
        const l = []
        i.forEach((s) => {
          e.forEach((u) => {
            l.push(s.replace('&', u))
          })
        }),
          (i = l)
      }
      i.forEach((l) => r.push(l))
    }),
    r
  )
}
function Ai(e, t) {
  const r = []
  return (
    t.split(En).forEach((n) => {
      e.forEach((o) => {
        r.push((o && o + ' ') + n)
      })
    }),
    r
  )
}
function Oi(e) {
  let t = ['']
  return (
    e.forEach((r) => {
      ;(r = r && r.trim()), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        r && (r.includes('&') ? (t = Bi(t, r)) : (t = Ai(t, r)))
    }),
    t.join(', ').replace(Mi, ' ')
  )
}
function Yr(e) {
  if (!e) return
  const t = e.parentElement
  t && t.removeChild(e)
}
function Lt(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`)
}
function Fi(e) {
  const t = document.createElement('style')
  return t.setAttribute('cssr-id', e), t
}
function zt(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1
}
const Di = /[A-Z]/g
function Mn(e) {
  return e.replace(Di, (t) => '-' + t.toLowerCase())
}
function Hi(e, t = '  ') {
  return typeof e == 'object' && e !== null
    ? ` {
` +
        Object.entries(e).map((r) => t + `  ${Mn(r[0])}: ${r[1]};`).join(`
`) +
        `
` +
        t +
        '}'
    : `: ${e};`
}
function Ii(e, t, r) {
  return typeof e == 'function'
    ? e({
        context: t.context,
        props: r,
      })
    : e
}
function qr(e, t, r, n) {
  if (!t) return ''
  const o = Ii(t, r, n)
  if (!o) return ''
  if (typeof o == 'string')
    return `${e} {
${o}
}`
  const i = Object.keys(o)
  if (i.length === 0)
    return r.config.keepEmptyBlock
      ? e +
          ` {
}`
      : ''
  const l = e ? [e + ' {'] : []
  return (
    i.forEach((s) => {
      const u = o[s]
      if (s === 'raw') {
        l.push(
          `
` +
            u +
            `
`,
        )
        return
      }
      ;(s = Mn(s)), u != null && l.push(`  ${s}${Hi(u)}`)
    }),
    e && l.push('}'),
    l.join(`
`)
  )
}
function wr(e, t, r) {
  e &&
    e.forEach((n) => {
      if (Array.isArray(n)) wr(n, t, r)
      else if (typeof n == 'function') {
        const o = n(t)
        Array.isArray(o) ? wr(o, t, r) : o && r(o)
      } else n && r(n)
    })
}
function Bn(e, t, r, n, o) {
  const i = e.$
  let l = ''
  if (!i || typeof i == 'string') zt(i) ? (l = i) : t.push(i)
  else if (typeof i == 'function') {
    const c = i({
      context: n.context,
      props: o,
    })
    zt(c) ? (l = c) : t.push(c)
  } else if ((i.before && i.before(n.context), !i.$ || typeof i.$ == 'string'))
    zt(i.$) ? (l = i.$) : t.push(i.$)
  else if (i.$) {
    const c = i.$({
      context: n.context,
      props: o,
    })
    zt(c) ? (l = c) : t.push(c)
  }
  const s = Oi(t),
    u = qr(s, e.props, n, o)
  l ? r.push(`${l} {`) : u.length && r.push(u),
    e.children &&
      wr(
        e.children,
        {
          context: n.context,
          props: o,
        },
        (c) => {
          if (typeof c == 'string') {
            const f = qr(s, { raw: c }, n, o)
            r.push(f)
          } else Bn(c, t, r, n, o)
        },
      ),
    t.pop(),
    l && r.push('}'),
    i && i.after && i.after(n.context)
}
function ki(e, t, r) {
  const n = []
  return (
    Bn(e, [], n, t, r),
    n.join(`

`)
  )
}
function xr(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    (r =
      (e.charCodeAt(n) & 255) |
      ((e.charCodeAt(++n) & 255) << 8) |
      ((e.charCodeAt(++n) & 255) << 16) |
      ((e.charCodeAt(++n) & 255) << 24)),
      (r =
        /* Math.imul(k, m): */
        (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
      (r ^= /* k >>> r: */ r >>> 24),
      (t =
        /* Math.imul(k, m): */
        ((r & 65535) * 1540483477 +
          (((r >>> 16) * 59797) << 16)) /* Math.imul(h, m): */ ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)))
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8
    case 1:
      ;(t ^= e.charCodeAt(n) & 255),
        (t =
          /* Math.imul(h, m): */
          (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16))
  }
  return (
    (t ^= t >>> 13),
    (t =
      /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  )
}
typeof window < 'u' && (window.__cssrContext = {})
function Wi(e, t, r, n) {
  const { els: o } = t
  if (r === void 0) o.forEach(Yr), (t.els = [])
  else {
    const i = Lt(r, n)
    i && o.includes(i) && (Yr(i), (t.els = o.filter((l) => l !== i)))
  }
}
function Kr(e, t) {
  e.push(t)
}
function ji(e, t, r, n, o, i, l, s, u) {
  let c
  if ((r === void 0 && ((c = t.render(n)), (r = xr(c))), u)) {
    u.adapter(r, c ?? t.render(n))
    return
  }
  s === void 0 && (s = document.head)
  const f = Lt(r, s)
  if (f !== null && !i) return f
  const g = f ?? Fi(r)
  if ((c === void 0 && (c = t.render(n)), (g.textContent = c), f !== null))
    return f
  if (l) {
    const $ = s.querySelector(`meta[name="${l}"]`)
    if ($) return s.insertBefore(g, $), Kr(t.els, g), g
  }
  return (
    o ? s.insertBefore(g, s.querySelector('style, link')) : s.appendChild(g),
    Kr(t.els, g),
    g
  )
}
function Li(e) {
  return ki(this, this.instance, e)
}
function Ni(e = {}) {
  const {
    id: t,
    ssr: r,
    props: n,
    head: o = !1,
    force: i = !1,
    anchorMetaName: l,
    parent: s,
  } = e
  return ji(this.instance, this, t, n, o, i, l, s, r)
}
function Vi(e = {}) {
  const { id: t, parent: r } = e
  Wi(this.instance, this, t, r)
}
const _t = function (e, t, r, n) {
    return {
      instance: e,
      $: t,
      props: r,
      children: n,
      els: [],
      render: Li,
      mount: Ni,
      unmount: Vi,
    }
  },
  Ui = function (e, t, r, n) {
    return Array.isArray(t)
      ? _t(e, { $: null }, null, t)
      : Array.isArray(r)
        ? _t(e, t, null, r)
        : Array.isArray(n)
          ? _t(e, t, r, n)
          : _t(e, t, r, null)
  }
function Xi(e = {}) {
  const t = {
    c: (...r) => Ui(t, ...r),
    use: (r, ...n) => r.install(t, ...n),
    find: Lt,
    context: {},
    config: e,
  }
  return t
}
function Yi(e, t) {
  if (e === void 0) return !1
  if (t) {
    const {
      context: { ids: r },
    } = t
    return r.has(e)
  }
  return Lt(e) !== null
}
function qi(e) {
  let t = '.',
    r = '__',
    n = '--',
    o
  if (e) {
    let p = e.blockPrefix
    p && (t = p),
      (p = e.elementPrefix),
      p && (r = p),
      (p = e.modifierPrefix),
      p && (n = p)
  }
  const i = {
    install(p) {
      o = p.c
      const M = p.context
      ;(M.bem = {}), (M.bem.b = null), (M.bem.els = null)
    },
  }
  function l(p) {
    let M, R
    return {
      before(P) {
        ;(M = P.bem.b), (R = P.bem.els), (P.bem.els = null)
      },
      after(P) {
        ;(P.bem.b = M), (P.bem.els = R)
      },
      $({ context: P, props: z }) {
        return (
          (p = typeof p == 'string' ? p : p({ context: P, props: z })),
          (P.bem.b = p),
          `${(z == null ? void 0 : z.bPrefix) || t}${P.bem.b}`
        )
      },
    }
  }
  function s(p) {
    let M
    return {
      before(R) {
        M = R.bem.els
      },
      after(R) {
        R.bem.els = M
      },
      $({ context: R, props: P }) {
        return (
          (p = typeof p == 'string' ? p : p({ context: R, props: P })),
          (R.bem.els = p.split(',').map((z) => z.trim())),
          R.bem.els
            .map(
              (z) =>
                `${(P == null ? void 0 : P.bPrefix) || t}${R.bem.b}${r}${z}`,
            )
            .join(', ')
        )
      },
    }
  }
  function u(p) {
    return {
      $({ context: M, props: R }) {
        p = typeof p == 'string' ? p : p({ context: M, props: R })
        const P = p.split(',').map((U) => U.trim())
        function z(U) {
          return P.map(
            (X) =>
              `&${(R == null ? void 0 : R.bPrefix) || t}${M.bem.b}${U !== void 0 ? `${r}${U}` : ''}${n}${X}`,
          ).join(', ')
        }
        const N = M.bem.els
        return N !== null ? z(N[0]) : z()
      },
    }
  }
  function c(p) {
    return {
      $({ context: M, props: R }) {
        p = typeof p == 'string' ? p : p({ context: M, props: R })
        const P = M.bem.els
        return `&:not(${(R == null ? void 0 : R.bPrefix) || t}${M.bem.b}${P !== null && P.length > 0 ? `${r}${P[0]}` : ''}${n}${p})`
      },
    }
  }
  return (
    Object.assign(i, {
      cB: (...p) => o(l(p[0]), p[1], p[2]),
      cE: (...p) => o(s(p[0]), p[1], p[2]),
      cM: (...p) => o(u(p[0]), p[1], p[2]),
      cNotM: (...p) => o(c(p[0]), p[1], p[2]),
    }),
    i
  )
}
const Ki = 'n',
  Gi = `.${Ki}-`,
  Ji = '__',
  Zi = '--',
  An = Xi(),
  On = qi({
    blockPrefix: Gi,
    elementPrefix: Ji,
    modifierPrefix: Zi,
  })
An.use(On)
const { c: E, find: od } = An,
  { cB: W, cE: T, cM: ae, cNotM: tt } = On
function dr(e, t) {
  return (
    e + (t === 'default' ? '' : t.replace(/^[a-z]/, (r) => r.toUpperCase()))
  )
}
const Or = typeof document < 'u' && typeof window < 'u'
function Gr(e) {
  const t = A(e),
    r = B(t.value)
  return (
    ut(t, (n) => {
      r.value = n
    }),
    typeof e == 'function'
      ? r
      : {
          __v_isRef: !0,
          get value() {
            return r.value
          },
          set value(n) {
            e.set(n)
          },
        }
  )
}
function Ft(e) {
  return e.composedPath()[0]
}
const Qi = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap(),
}
function ea(e, t, r) {
  if (e === 'mousemoveoutside') {
    const n = (o) => {
      t.contains(Ft(o)) || r(o)
    }
    return {
      mousemove: n,
      touchstart: n,
    }
  } else if (e === 'clickoutside') {
    let n = !1
    const o = (l) => {
        n = !t.contains(Ft(l))
      },
      i = (l) => {
        n && (t.contains(Ft(l)) || r(l))
      }
    return {
      mousedown: o,
      mouseup: i,
      touchstart: o,
      touchend: i,
    }
  }
  return (
    console.error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`,
    ),
    {}
  )
}
function Fn(e, t, r) {
  const n = Qi[e]
  let o = n.get(t)
  o === void 0 && n.set(t, (o = /* @__PURE__ */ new WeakMap()))
  let i = o.get(r)
  return i === void 0 && o.set(r, (i = ea(e, t, r))), i
}
function ta(e, t, r, n) {
  if (e === 'mousemoveoutside' || e === 'clickoutside') {
    const o = Fn(e, t, r)
    return (
      Object.keys(o).forEach((i) => {
        _e(i, document, o[i], n)
      }),
      !0
    )
  }
  return !1
}
function ra(e, t, r, n) {
  if (e === 'mousemoveoutside' || e === 'clickoutside') {
    const o = Fn(e, t, r)
    return (
      Object.keys(o).forEach((i) => {
        ge(i, document, o[i], n)
      }),
      !0
    )
  }
  return !1
}
function na() {
  if (typeof window > 'u')
    return {
      on: () => {},
      off: () => {},
    }
  const e = /* @__PURE__ */ new WeakMap(),
    t = /* @__PURE__ */ new WeakMap()
  function r() {
    e.set(this, !0)
  }
  function n() {
    e.set(this, !0), t.set(this, !0)
  }
  function o(b, m, x) {
    const _ = b[m]
    return (
      (b[m] = function () {
        return x.apply(b, arguments), _.apply(b, arguments)
      }),
      b
    )
  }
  function i(b, m) {
    b[m] = Event.prototype[m]
  }
  const l = /* @__PURE__ */ new WeakMap(),
    s = Object.getOwnPropertyDescriptor(Event.prototype, 'currentTarget')
  function u() {
    var b
    return (b = l.get(this)) !== null && b !== void 0 ? b : null
  }
  function c(b, m) {
    s !== void 0 &&
      Object.defineProperty(b, 'currentTarget', {
        configurable: !0,
        enumerable: !0,
        get: m ?? s.get,
      })
  }
  const f = {
      bubble: {},
      capture: {},
    },
    g = {}
  function $() {
    const b = function (m) {
      const { type: x, eventPhase: _, bubbles: F } = m,
        Y = Ft(m)
      if (_ === 2) return
      const Z = _ === 1 ? 'capture' : 'bubble'
      let K = Y
      const G = []
      for (; K === null && (K = window), G.push(K), K !== window; )
        K = K.parentNode || null
      const Q = f.capture[x],
        se = f.bubble[x]
      if (
        (o(m, 'stopPropagation', r),
        o(m, 'stopImmediatePropagation', n),
        c(m, u),
        Z === 'capture')
      ) {
        if (Q === void 0) return
        for (let ee = G.length - 1; ee >= 0 && !e.has(m); --ee) {
          const ce = G[ee],
            de = Q.get(ce)
          if (de !== void 0) {
            l.set(m, ce)
            for (const fe of de) {
              if (t.has(m)) break
              fe(m)
            }
          }
          if (ee === 0 && !F && se !== void 0) {
            const fe = se.get(ce)
            if (fe !== void 0)
              for (const Fe of fe) {
                if (t.has(m)) break
                Fe(m)
              }
          }
        }
      } else if (Z === 'bubble') {
        if (se === void 0) return
        for (let ee = 0; ee < G.length && !e.has(m); ++ee) {
          const ce = G[ee],
            de = se.get(ce)
          if (de !== void 0) {
            l.set(m, ce)
            for (const fe of de) {
              if (t.has(m)) break
              fe(m)
            }
          }
        }
      }
      i(m, 'stopPropagation'), i(m, 'stopImmediatePropagation'), c(m)
    }
    return (b.displayName = 'evtdUnifiedHandler'), b
  }
  function O() {
    const b = function (m) {
      const { type: x, eventPhase: _ } = m
      if (_ !== 2) return
      const F = g[x]
      F !== void 0 && F.forEach((Y) => Y(m))
    }
    return (b.displayName = 'evtdUnifiedWindowEventHandler'), b
  }
  const p = $(),
    M = O()
  function R(b, m) {
    const x = f[b]
    return (
      x[m] === void 0 &&
        ((x[m] = /* @__PURE__ */ new Map()),
        window.addEventListener(m, p, b === 'capture')),
      x[m]
    )
  }
  function P(b) {
    return (
      g[b] === void 0 &&
        ((g[b] = /* @__PURE__ */ new Set()), window.addEventListener(b, M)),
      g[b]
    )
  }
  function z(b, m) {
    let x = b.get(m)
    return x === void 0 && b.set(m, (x = /* @__PURE__ */ new Set())), x
  }
  function N(b, m, x, _) {
    const F = f[m][x]
    if (F !== void 0) {
      const Y = F.get(b)
      if (Y !== void 0 && Y.has(_)) return !0
    }
    return !1
  }
  function U(b, m) {
    const x = g[b]
    return !!(x !== void 0 && x.has(m))
  }
  function X(b, m, x, _) {
    let F
    if (
      (typeof _ == 'object' && _.once === !0
        ? (F = (Q) => {
            L(b, m, F, _), x(Q)
          })
        : (F = x),
      ta(b, m, F, _))
    )
      return
    const Z =
        _ === !0 || (typeof _ == 'object' && _.capture === !0)
          ? 'capture'
          : 'bubble',
      K = R(Z, b),
      G = z(K, m)
    if ((G.has(F) || G.add(F), m === window)) {
      const Q = P(b)
      Q.has(F) || Q.add(F)
    }
  }
  function L(b, m, x, _) {
    if (ra(b, m, x, _)) return
    const Y = _ === !0 || (typeof _ == 'object' && _.capture === !0),
      Z = Y ? 'capture' : 'bubble',
      K = R(Z, b),
      G = z(K, m)
    if (m === window && !N(m, Y ? 'bubble' : 'capture', b, x) && U(b, x)) {
      const se = g[b]
      se.delete(x),
        se.size === 0 && (window.removeEventListener(b, M), (g[b] = void 0))
    }
    G.has(x) && G.delete(x),
      G.size === 0 && K.delete(m),
      K.size === 0 &&
        (window.removeEventListener(b, p, Z === 'capture'), (f[Z][b] = void 0))
  }
  return {
    on: X,
    off: L,
  }
}
const { on: _e, off: ge } = na()
function oa(e, t) {
  return (
    ut(e, (r) => {
      r !== void 0 && (t.value = r)
    }),
    A(() => (e.value === void 0 ? t.value : e.value))
  )
}
function ia() {
  const e = B(!1)
  return (
    Wt(() => {
      e.value = !0
    }),
    di(e)
  )
}
const aa =
  (typeof window > 'u'
    ? !1
    : /iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream
function la() {
  return aa
}
const sa = '@css-render/vue3-ssr'
function ua(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`
}
function ca(e, t, r) {
  const { styles: n, ids: o } = r
  o.has(e) || (n !== null && (o.add(e), n.push(ua(e, t))))
}
const da = typeof document < 'u'
function Nt() {
  if (da) return
  const e = be(sa, null)
  if (e !== null)
    return {
      adapter: (t, r) => ca(t, r, e),
      context: e,
    }
}
function Jr(e, t) {
  console.error(`[vueuc/${e}]: ${t}`)
}
var Ee = [],
  fa = function () {
    return Ee.some(function (e) {
      return e.activeTargets.length > 0
    })
  },
  ha = function () {
    return Ee.some(function (e) {
      return e.skippedTargets.length > 0
    })
  },
  Zr = 'ResizeObserver loop completed with undelivered notifications.',
  va = function () {
    var e
    typeof ErrorEvent == 'function'
      ? (e = new ErrorEvent('error', {
          message: Zr,
        }))
      : ((e = document.createEvent('Event')),
        e.initEvent('error', !1, !1),
        (e.message = Zr)),
      window.dispatchEvent(e)
  },
  ft
;(function (e) {
  ;(e.BORDER_BOX = 'border-box'),
    (e.CONTENT_BOX = 'content-box'),
    (e.DEVICE_PIXEL_CONTENT_BOX = 'device-pixel-content-box')
})(ft || (ft = {}))
var Me = function (e) {
    return Object.freeze(e)
  },
  pa = /* @__PURE__ */ (function () {
    function e(t, r) {
      ;(this.inlineSize = t), (this.blockSize = r), Me(this)
    }
    return e
  })(),
  Dn = (function () {
    function e(t, r, n, o) {
      return (
        (this.x = t),
        (this.y = r),
        (this.width = n),
        (this.height = o),
        (this.top = this.y),
        (this.left = this.x),
        (this.bottom = this.top + this.height),
        (this.right = this.left + this.width),
        Me(this)
      )
    }
    return (
      (e.prototype.toJSON = function () {
        var t = this,
          r = t.x,
          n = t.y,
          o = t.top,
          i = t.right,
          l = t.bottom,
          s = t.left,
          u = t.width,
          c = t.height
        return {
          x: r,
          y: n,
          top: o,
          right: i,
          bottom: l,
          left: s,
          width: u,
          height: c,
        }
      }),
      (e.fromRect = function (t) {
        return new e(t.x, t.y, t.width, t.height)
      }),
      e
    )
  })(),
  Fr = function (e) {
    return e instanceof SVGElement && 'getBBox' in e
  },
  Hn = function (e) {
    if (Fr(e)) {
      var t = e.getBBox(),
        r = t.width,
        n = t.height
      return !r && !n
    }
    var o = e,
      i = o.offsetWidth,
      l = o.offsetHeight
    return !(i || l || e.getClientRects().length)
  },
  Qr = function (e) {
    var t
    if (e instanceof Element) return !0
    var r =
      (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0
        ? void 0
        : t.defaultView
    return !!(r && e instanceof r.Element)
  },
  ga = function (e) {
    switch (e.tagName) {
      case 'INPUT':
        if (e.type !== 'image') break
      case 'VIDEO':
      case 'AUDIO':
      case 'EMBED':
      case 'OBJECT':
      case 'CANVAS':
      case 'IFRAME':
      case 'IMG':
        return !0
    }
    return !1
  },
  lt = typeof window < 'u' ? window : {},
  Et = /* @__PURE__ */ new WeakMap(),
  en = /auto|scroll/,
  ba = /^tb|vertical/,
  ma = /msie|trident/i.test(lt.navigator && lt.navigator.userAgent),
  he = function (e) {
    return parseFloat(e || '0')
  },
  We = function (e, t, r) {
    return (
      e === void 0 && (e = 0),
      t === void 0 && (t = 0),
      r === void 0 && (r = !1),
      new pa((r ? t : e) || 0, (r ? e : t) || 0)
    )
  },
  tn = Me({
    devicePixelContentBoxSize: We(),
    borderBoxSize: We(),
    contentBoxSize: We(),
    contentRect: new Dn(0, 0, 0, 0),
  }),
  In = function (e, t) {
    if ((t === void 0 && (t = !1), Et.has(e) && !t)) return Et.get(e)
    if (Hn(e)) return Et.set(e, tn), tn
    var r = getComputedStyle(e),
      n = Fr(e) && e.ownerSVGElement && e.getBBox(),
      o = !ma && r.boxSizing === 'border-box',
      i = ba.test(r.writingMode || ''),
      l = !n && en.test(r.overflowY || ''),
      s = !n && en.test(r.overflowX || ''),
      u = n ? 0 : he(r.paddingTop),
      c = n ? 0 : he(r.paddingRight),
      f = n ? 0 : he(r.paddingBottom),
      g = n ? 0 : he(r.paddingLeft),
      $ = n ? 0 : he(r.borderTopWidth),
      O = n ? 0 : he(r.borderRightWidth),
      p = n ? 0 : he(r.borderBottomWidth),
      M = n ? 0 : he(r.borderLeftWidth),
      R = g + c,
      P = u + f,
      z = M + O,
      N = $ + p,
      U = s ? e.offsetHeight - N - e.clientHeight : 0,
      X = l ? e.offsetWidth - z - e.clientWidth : 0,
      L = o ? R + z : 0,
      b = o ? P + N : 0,
      m = n ? n.width : he(r.width) - L - X,
      x = n ? n.height : he(r.height) - b - U,
      _ = m + R + X + z,
      F = x + P + U + N,
      Y = Me({
        devicePixelContentBoxSize: We(
          Math.round(m * devicePixelRatio),
          Math.round(x * devicePixelRatio),
          i,
        ),
        borderBoxSize: We(_, F, i),
        contentBoxSize: We(m, x, i),
        contentRect: new Dn(g, u, m, x),
      })
    return Et.set(e, Y), Y
  },
  kn = function (e, t, r) {
    var n = In(e, r),
      o = n.borderBoxSize,
      i = n.contentBoxSize,
      l = n.devicePixelContentBoxSize
    switch (t) {
      case ft.DEVICE_PIXEL_CONTENT_BOX:
        return l
      case ft.BORDER_BOX:
        return o
      default:
        return i
    }
  },
  ya = /* @__PURE__ */ (function () {
    function e(t) {
      var r = In(t)
      ;(this.target = t),
        (this.contentRect = r.contentRect),
        (this.borderBoxSize = Me([r.borderBoxSize])),
        (this.contentBoxSize = Me([r.contentBoxSize])),
        (this.devicePixelContentBoxSize = Me([r.devicePixelContentBoxSize]))
    }
    return e
  })(),
  Wn = function (e) {
    if (Hn(e)) return 1 / 0
    for (var t = 0, r = e.parentNode; r; ) (t += 1), (r = r.parentNode)
    return t
  },
  wa = function () {
    var e = 1 / 0,
      t = []
    Ee.forEach(function (l) {
      if (l.activeTargets.length !== 0) {
        var s = []
        l.activeTargets.forEach(function (c) {
          var f = new ya(c.target),
            g = Wn(c.target)
          s.push(f),
            (c.lastReportedSize = kn(c.target, c.observedBox)),
            g < e && (e = g)
        }),
          t.push(function () {
            l.callback.call(l.observer, s, l.observer)
          }),
          l.activeTargets.splice(0, l.activeTargets.length)
      }
    })
    for (var r = 0, n = t; r < n.length; r++) {
      var o = n[r]
      o()
    }
    return e
  },
  rn = function (e) {
    Ee.forEach(function (r) {
      r.activeTargets.splice(0, r.activeTargets.length),
        r.skippedTargets.splice(0, r.skippedTargets.length),
        r.observationTargets.forEach(function (o) {
          o.isActive() &&
            (Wn(o.target) > e
              ? r.activeTargets.push(o)
              : r.skippedTargets.push(o))
        })
    })
  },
  xa = function () {
    var e = 0
    for (rn(e); fa(); ) (e = wa()), rn(e)
    return ha() && va(), e > 0
  },
  fr,
  jn = [],
  Ca = function () {
    return jn.splice(0).forEach(function (e) {
      return e()
    })
  },
  Sa = function (e) {
    if (!fr) {
      var t = 0,
        r = document.createTextNode(''),
        n = { characterData: !0 }
      new MutationObserver(function () {
        return Ca()
      }).observe(r, n),
        (fr = function () {
          r.textContent = ''.concat(t ? t-- : t++)
        })
    }
    jn.push(e), fr()
  },
  Ta = function (e) {
    Sa(function () {
      requestAnimationFrame(e)
    })
  },
  Dt = 0,
  Ra = function () {
    return !!Dt
  },
  $a = 250,
  Pa = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
  nn = [
    'resize',
    'load',
    'transitionend',
    'animationend',
    'animationstart',
    'animationiteration',
    'keyup',
    'keydown',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
    'blur',
    'focus',
  ],
  on = function (e) {
    return e === void 0 && (e = 0), Date.now() + e
  },
  hr = !1,
  za = (function () {
    function e() {
      var t = this
      ;(this.stopped = !0),
        (this.listener = function () {
          return t.schedule()
        })
    }
    return (
      (e.prototype.run = function (t) {
        var r = this
        if ((t === void 0 && (t = $a), !hr)) {
          hr = !0
          var n = on(t)
          Ta(function () {
            var o = !1
            try {
              o = xa()
            } finally {
              if (((hr = !1), (t = n - on()), !Ra())) return
              o ? r.run(1e3) : t > 0 ? r.run(t) : r.start()
            }
          })
        }
      }),
      (e.prototype.schedule = function () {
        this.stop(), this.run()
      }),
      (e.prototype.observe = function () {
        var t = this,
          r = function () {
            return t.observer && t.observer.observe(document.body, Pa)
          }
        document.body ? r() : lt.addEventListener('DOMContentLoaded', r)
      }),
      (e.prototype.start = function () {
        var t = this
        this.stopped &&
          ((this.stopped = !1),
          (this.observer = new MutationObserver(this.listener)),
          this.observe(),
          nn.forEach(function (r) {
            return lt.addEventListener(r, t.listener, !0)
          }))
      }),
      (e.prototype.stop = function () {
        var t = this
        this.stopped ||
          (this.observer && this.observer.disconnect(),
          nn.forEach(function (r) {
            return lt.removeEventListener(r, t.listener, !0)
          }),
          (this.stopped = !0))
      }),
      e
    )
  })(),
  Cr = new za(),
  an = function (e) {
    !Dt && e > 0 && Cr.start(), (Dt += e), !Dt && Cr.stop()
  },
  _a = function (e) {
    return !Fr(e) && !ga(e) && getComputedStyle(e).display === 'inline'
  },
  Ea = (function () {
    function e(t, r) {
      ;(this.target = t),
        (this.observedBox = r || ft.CONTENT_BOX),
        (this.lastReportedSize = {
          inlineSize: 0,
          blockSize: 0,
        })
    }
    return (
      (e.prototype.isActive = function () {
        var t = kn(this.target, this.observedBox, !0)
        return (
          _a(this.target) && (this.lastReportedSize = t),
          this.lastReportedSize.inlineSize !== t.inlineSize ||
            this.lastReportedSize.blockSize !== t.blockSize
        )
      }),
      e
    )
  })(),
  Ma = /* @__PURE__ */ (function () {
    function e(t, r) {
      ;(this.activeTargets = []),
        (this.skippedTargets = []),
        (this.observationTargets = []),
        (this.observer = t),
        (this.callback = r)
    }
    return e
  })(),
  Mt = /* @__PURE__ */ new WeakMap(),
  ln = function (e, t) {
    for (var r = 0; r < e.length; r += 1) if (e[r].target === t) return r
    return -1
  },
  Bt = (function () {
    function e() {}
    return (
      (e.connect = function (t, r) {
        var n = new Ma(t, r)
        Mt.set(t, n)
      }),
      (e.observe = function (t, r, n) {
        var o = Mt.get(t),
          i = o.observationTargets.length === 0
        ln(o.observationTargets, r) < 0 &&
          (i && Ee.push(o),
          o.observationTargets.push(new Ea(r, n && n.box)),
          an(1),
          Cr.schedule())
      }),
      (e.unobserve = function (t, r) {
        var n = Mt.get(t),
          o = ln(n.observationTargets, r),
          i = n.observationTargets.length === 1
        o >= 0 &&
          (i && Ee.splice(Ee.indexOf(n), 1),
          n.observationTargets.splice(o, 1),
          an(-1))
      }),
      (e.disconnect = function (t) {
        var r = this,
          n = Mt.get(t)
        n.observationTargets.slice().forEach(function (o) {
          return r.unobserve(t, o.target)
        }),
          n.activeTargets.splice(0, n.activeTargets.length)
      }),
      e
    )
  })(),
  Ba = (function () {
    function e(t) {
      if (arguments.length === 0)
        throw new TypeError(
          "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.",
        )
      if (typeof t != 'function')
        throw new TypeError(
          "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.",
        )
      Bt.connect(this, t)
    }
    return (
      (e.prototype.observe = function (t, r) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.",
          )
        if (!Qr(t))
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element",
          )
        Bt.observe(this, t, r)
      }),
      (e.prototype.unobserve = function (t) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.",
          )
        if (!Qr(t))
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element",
          )
        Bt.unobserve(this, t)
      }),
      (e.prototype.disconnect = function () {
        Bt.disconnect(this)
      }),
      (e.toString = function () {
        return 'function ResizeObserver () { [polyfill code] }'
      }),
      e
    )
  })()
class Aa {
  constructor() {
    ;(this.handleResize = this.handleResize.bind(this)),
      (this.observer = new ((typeof window < 'u' && window.ResizeObserver) ||
        Ba)(this.handleResize)),
      (this.elHandlersMap = /* @__PURE__ */ new Map())
  }
  handleResize(t) {
    for (const r of t) {
      const n = this.elHandlersMap.get(r.target)
      n !== void 0 && n(r)
    }
  }
  registerHandler(t, r) {
    this.elHandlersMap.set(t, r), this.observer.observe(t)
  }
  unregisterHandler(t) {
    this.elHandlersMap.has(t) &&
      (this.elHandlersMap.delete(t), this.observer.unobserve(t))
  }
}
const sn = new Aa(),
  Sr = le({
    name: 'ResizeObserver',
    props: {
      onResize: Function,
    },
    setup(e) {
      let t = !1
      const r = Pn().proxy
      function n(o) {
        const { onResize: i } = e
        i !== void 0 && i(o)
      }
      Wt(() => {
        const o = r.$el
        if (o === void 0) {
          Jr('resize-observer', '$el does not exist.')
          return
        }
        if (
          o.nextElementSibling !== o.nextSibling &&
          o.nodeType === 3 &&
          o.nodeValue !== ''
        ) {
          Jr(
            'resize-observer',
            '$el can not be observed (it may be a text node).',
          )
          return
        }
        o.nextElementSibling !== null &&
          (sn.registerHandler(o.nextElementSibling, n), (t = !0))
      }),
        Br(() => {
          t && sn.unregisterHandler(r.$el.nextElementSibling)
        })
    },
    render() {
      return fi(this.$slots, 'default')
    },
  })
function Oa(e) {
  const t = {
    isDeactivated: !1,
  }
  let r = !1
  return (
    hi(() => {
      if (((t.isDeactivated = !1), !r)) {
        r = !0
        return
      }
      e()
    }),
    vi(() => {
      ;(t.isDeactivated = !0), r || (r = !0)
    }),
    t
  )
}
const un = 'n-form-item'
function Fa(
  e,
  { defaultSize: t = 'medium', mergedSize: r, mergedDisabled: n } = {},
) {
  const o = be(un, null)
  zn(un, null)
  const i = A(
      r
        ? () => r(o)
        : () => {
            const { size: u } = e
            if (u) return u
            if (o) {
              const { mergedSize: c } = o
              if (c.value !== void 0) return c.value
            }
            return t
          },
    ),
    l = A(
      n
        ? () => n(o)
        : () => {
            const { disabled: u } = e
            return u !== void 0 ? u : o ? o.disabled.value : !1
          },
    ),
    s = A(() => {
      const { status: u } = e
      return u || (o == null ? void 0 : o.mergedValidationStatus.value)
    })
  return (
    Br(() => {
      o && o.restoreValidation()
    }),
    {
      mergedSizeRef: i,
      mergedDisabledRef: l,
      mergedStatusRef: s,
      nTriggerFormBlur() {
        o && o.handleContentBlur()
      },
      nTriggerFormChange() {
        o && o.handleContentChange()
      },
      nTriggerFormFocus() {
        o && o.handleContentFocus()
      },
      nTriggerFormInput() {
        o && o.handleContentInput()
      },
    }
  )
}
var Ln =
    typeof global == 'object' && global && global.Object === Object && global,
  Da = typeof self == 'object' && self && self.Object === Object && self,
  Ve = Ln || Da || Function('return this')(),
  je = Ve.Symbol,
  Nn = Object.prototype,
  Ha = Nn.hasOwnProperty,
  Ia = Nn.toString,
  rt = je ? je.toStringTag : void 0
function ka(e) {
  var t = Ha.call(e, rt),
    r = e[rt]
  try {
    e[rt] = void 0
    var n = !0
  } catch {}
  var o = Ia.call(e)
  return n && (t ? (e[rt] = r) : delete e[rt]), o
}
var Wa = Object.prototype,
  ja = Wa.toString
function La(e) {
  return ja.call(e)
}
var Na = '[object Null]',
  Va = '[object Undefined]',
  cn = je ? je.toStringTag : void 0
function pt(e) {
  return e == null
    ? e === void 0
      ? Va
      : Na
    : cn && cn in Object(e)
      ? ka(e)
      : La(e)
}
function Ue(e) {
  return e != null && typeof e == 'object'
}
var Ua = '[object Symbol]'
function Xa(e) {
  return typeof e == 'symbol' || (Ue(e) && pt(e) == Ua)
}
function Ya(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e)
  return o
}
var Ht = Array.isArray,
  qa = 1 / 0,
  dn = je ? je.prototype : void 0,
  fn = dn ? dn.toString : void 0
function Vn(e) {
  if (typeof e == 'string') return e
  if (Ht(e)) return Ya(e, Vn) + ''
  if (Xa(e)) return fn ? fn.call(e) : ''
  var t = e + ''
  return t == '0' && 1 / e == -qa ? '-0' : t
}
function Oe(e) {
  var t = typeof e
  return e != null && (t == 'object' || t == 'function')
}
function Un(e) {
  return e
}
var Ka = '[object AsyncFunction]',
  Ga = '[object Function]',
  Ja = '[object GeneratorFunction]',
  Za = '[object Proxy]'
function Dr(e) {
  if (!Oe(e)) return !1
  var t = pt(e)
  return t == Ga || t == Ja || t == Ka || t == Za
}
var vr = Ve['__core-js_shared__'],
  hn = (function () {
    var e = /[^.]+$/.exec((vr && vr.keys && vr.keys.IE_PROTO) || '')
    return e ? 'Symbol(src)_1.' + e : ''
  })()
function Qa(e) {
  return !!hn && hn in e
}
var el = Function.prototype,
  tl = el.toString
function rl(e) {
  if (e != null) {
    try {
      return tl.call(e)
    } catch {}
    try {
      return e + ''
    } catch {}
  }
  return ''
}
var nl = /[\\^$.*+?()[\]{}|]/g,
  ol = /^\[object .+?Constructor\]$/,
  il = Function.prototype,
  al = Object.prototype,
  ll = il.toString,
  sl = al.hasOwnProperty,
  ul = RegExp(
    '^' +
      ll
        .call(sl)
        .replace(nl, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?',
        ) +
      '$',
  )
function cl(e) {
  if (!Oe(e) || Qa(e)) return !1
  var t = Dr(e) ? ul : ol
  return t.test(rl(e))
}
function dl(e, t) {
  return e == null ? void 0 : e[t]
}
function Hr(e, t) {
  var r = dl(e, t)
  return cl(r) ? r : void 0
}
var vn = Object.create,
  fl = /* @__PURE__ */ (function () {
    function e() {}
    return function (t) {
      if (!Oe(t)) return {}
      if (vn) return vn(t)
      e.prototype = t
      var r = new e()
      return (e.prototype = void 0), r
    }
  })()
function hl(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t)
    case 1:
      return e.call(t, r[0])
    case 2:
      return e.call(t, r[0], r[1])
    case 3:
      return e.call(t, r[0], r[1], r[2])
  }
  return e.apply(t, r)
}
function vl(e, t) {
  var r = -1,
    n = e.length
  for (t || (t = Array(n)); ++r < n; ) t[r] = e[r]
  return t
}
var pl = 800,
  gl = 16,
  bl = Date.now
function ml(e) {
  var t = 0,
    r = 0
  return function () {
    var n = bl(),
      o = gl - (n - r)
    if (((r = n), o > 0)) {
      if (++t >= pl) return arguments[0]
    } else t = 0
    return e.apply(void 0, arguments)
  }
}
function yl(e) {
  return function () {
    return e
  }
}
var It = (function () {
    try {
      var e = Hr(Object, 'defineProperty')
      return e({}, '', {}), e
    } catch {}
  })(),
  wl = It
    ? function (e, t) {
        return It(e, 'toString', {
          configurable: !0,
          enumerable: !1,
          value: yl(t),
          writable: !0,
        })
      }
    : Un,
  xl = ml(wl),
  Cl = 9007199254740991,
  Sl = /^(?:0|[1-9]\d*)$/
function Xn(e, t) {
  var r = typeof e
  return (
    (t = t ?? Cl),
    !!t &&
      (r == 'number' || (r != 'symbol' && Sl.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  )
}
function Ir(e, t, r) {
  t == '__proto__' && It
    ? It(e, t, {
        configurable: !0,
        enumerable: !0,
        value: r,
        writable: !0,
      })
    : (e[t] = r)
}
function Vt(e, t) {
  return e === t || (e !== e && t !== t)
}
var Tl = Object.prototype,
  Rl = Tl.hasOwnProperty
function $l(e, t, r) {
  var n = e[t]
  ;(!(Rl.call(e, t) && Vt(n, r)) || (r === void 0 && !(t in e))) && Ir(e, t, r)
}
function Pl(e, t, r, n) {
  var o = !r
  r || (r = {})
  for (var i = -1, l = t.length; ++i < l; ) {
    var s = t[i],
      u = void 0
    u === void 0 && (u = e[s]), o ? Ir(r, s, u) : $l(r, s, u)
  }
  return r
}
var pn = Math.max
function zl(e, t, r) {
  return (
    (t = pn(t === void 0 ? e.length - 1 : t, 0)),
    function () {
      for (
        var n = arguments, o = -1, i = pn(n.length - t, 0), l = Array(i);
        ++o < i;

      )
        l[o] = n[t + o]
      o = -1
      for (var s = Array(t + 1); ++o < t; ) s[o] = n[o]
      return (s[t] = r(l)), hl(e, this, s)
    }
  )
}
function _l(e, t) {
  return xl(zl(e, t, Un), e + '')
}
var El = 9007199254740991
function Yn(e) {
  return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= El
}
function kr(e) {
  return e != null && Yn(e.length) && !Dr(e)
}
function Ml(e, t, r) {
  if (!Oe(r)) return !1
  var n = typeof t
  return (n == 'number' ? kr(r) && Xn(t, r.length) : n == 'string' && t in r)
    ? Vt(r[t], e)
    : !1
}
function Bl(e) {
  return _l(function (t, r) {
    var n = -1,
      o = r.length,
      i = o > 1 ? r[o - 1] : void 0,
      l = o > 2 ? r[2] : void 0
    for (
      i = e.length > 3 && typeof i == 'function' ? (o--, i) : void 0,
        l && Ml(r[0], r[1], l) && ((i = o < 3 ? void 0 : i), (o = 1)),
        t = Object(t);
      ++n < o;

    ) {
      var s = r[n]
      s && e(t, s, n, i)
    }
    return t
  })
}
var Al = Object.prototype
function qn(e) {
  var t = e && e.constructor,
    r = (typeof t == 'function' && t.prototype) || Al
  return e === r
}
function Ol(e, t) {
  for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r)
  return n
}
var Fl = '[object Arguments]'
function gn(e) {
  return Ue(e) && pt(e) == Fl
}
var Kn = Object.prototype,
  Dl = Kn.hasOwnProperty,
  Hl = Kn.propertyIsEnumerable,
  Tr = gn(
    /* @__PURE__ */ (function () {
      return arguments
    })(),
  )
    ? gn
    : function (e) {
        return Ue(e) && Dl.call(e, 'callee') && !Hl.call(e, 'callee')
      }
function Il() {
  return !1
}
var Gn = typeof exports == 'object' && exports && !exports.nodeType && exports,
  bn = Gn && typeof module == 'object' && module && !module.nodeType && module,
  kl = bn && bn.exports === Gn,
  mn = kl ? Ve.Buffer : void 0,
  Wl = mn ? mn.isBuffer : void 0,
  Jn = Wl || Il,
  jl = '[object Arguments]',
  Ll = '[object Array]',
  Nl = '[object Boolean]',
  Vl = '[object Date]',
  Ul = '[object Error]',
  Xl = '[object Function]',
  Yl = '[object Map]',
  ql = '[object Number]',
  Kl = '[object Object]',
  Gl = '[object RegExp]',
  Jl = '[object Set]',
  Zl = '[object String]',
  Ql = '[object WeakMap]',
  es = '[object ArrayBuffer]',
  ts = '[object DataView]',
  rs = '[object Float32Array]',
  ns = '[object Float64Array]',
  os = '[object Int8Array]',
  is = '[object Int16Array]',
  as = '[object Int32Array]',
  ls = '[object Uint8Array]',
  ss = '[object Uint8ClampedArray]',
  us = '[object Uint16Array]',
  cs = '[object Uint32Array]',
  j = {}
j[rs] = j[ns] = j[os] = j[is] = j[as] = j[ls] = j[ss] = j[us] = j[cs] = !0
j[jl] =
  j[Ll] =
  j[es] =
  j[Nl] =
  j[ts] =
  j[Vl] =
  j[Ul] =
  j[Xl] =
  j[Yl] =
  j[ql] =
  j[Kl] =
  j[Gl] =
  j[Jl] =
  j[Zl] =
  j[Ql] =
    !1
function ds(e) {
  return Ue(e) && Yn(e.length) && !!j[pt(e)]
}
function fs(e) {
  return function (t) {
    return e(t)
  }
}
var Zn = typeof exports == 'object' && exports && !exports.nodeType && exports,
  st = Zn && typeof module == 'object' && module && !module.nodeType && module,
  hs = st && st.exports === Zn,
  pr = hs && Ln.process,
  yn = (function () {
    try {
      var e = st && st.require && st.require('util').types
      return e || (pr && pr.binding && pr.binding('util'))
    } catch {}
  })(),
  wn = yn && yn.isTypedArray,
  Qn = wn ? fs(wn) : ds
function vs(e, t) {
  var r = Ht(e),
    n = !r && Tr(e),
    o = !r && !n && Jn(e),
    i = !r && !n && !o && Qn(e),
    l = r || n || o || i,
    s = l ? Ol(e.length, String) : [],
    u = s.length
  for (var c in e)
    (l && // Safari 9 has enumerable `arguments.length` in strict mode.
      (c == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
        (o && (c == 'offset' || c == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        (i && (c == 'buffer' || c == 'byteLength' || c == 'byteOffset')) || // Skip index properties.
        Xn(c, u))) ||
      s.push(c)
  return s
}
function ps(e, t) {
  return function (r) {
    return e(t(r))
  }
}
function gs(e) {
  var t = []
  if (e != null) for (var r in Object(e)) t.push(r)
  return t
}
var bs = Object.prototype,
  ms = bs.hasOwnProperty
function ys(e) {
  if (!Oe(e)) return gs(e)
  var t = qn(e),
    r = []
  for (var n in e) (n == 'constructor' && (t || !ms.call(e, n))) || r.push(n)
  return r
}
function eo(e) {
  return kr(e) ? vs(e) : ys(e)
}
var ht = Hr(Object, 'create')
function ws() {
  ;(this.__data__ = ht ? ht(null) : {}), (this.size = 0)
}
function xs(e) {
  var t = this.has(e) && delete this.__data__[e]
  return (this.size -= t ? 1 : 0), t
}
var Cs = '__lodash_hash_undefined__',
  Ss = Object.prototype,
  Ts = Ss.hasOwnProperty
function Rs(e) {
  var t = this.__data__
  if (ht) {
    var r = t[e]
    return r === Cs ? void 0 : r
  }
  return Ts.call(t, e) ? t[e] : void 0
}
var $s = Object.prototype,
  Ps = $s.hasOwnProperty
function zs(e) {
  var t = this.__data__
  return ht ? t[e] !== void 0 : Ps.call(t, e)
}
var _s = '__lodash_hash_undefined__'
function Es(e, t) {
  var r = this.__data__
  return (
    (this.size += this.has(e) ? 0 : 1),
    (r[e] = ht && t === void 0 ? _s : t),
    this
  )
}
function Ae(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.clear(); ++t < r; ) {
    var n = e[t]
    this.set(n[0], n[1])
  }
}
Ae.prototype.clear = ws
Ae.prototype.delete = xs
Ae.prototype.get = Rs
Ae.prototype.has = zs
Ae.prototype.set = Es
function Ms() {
  ;(this.__data__ = []), (this.size = 0)
}
function Ut(e, t) {
  for (var r = e.length; r--; ) if (Vt(e[r][0], t)) return r
  return -1
}
var Bs = Array.prototype,
  As = Bs.splice
function Os(e) {
  var t = this.__data__,
    r = Ut(t, e)
  if (r < 0) return !1
  var n = t.length - 1
  return r == n ? t.pop() : As.call(t, r, 1), --this.size, !0
}
function Fs(e) {
  var t = this.__data__,
    r = Ut(t, e)
  return r < 0 ? void 0 : t[r][1]
}
function Ds(e) {
  return Ut(this.__data__, e) > -1
}
function Hs(e, t) {
  var r = this.__data__,
    n = Ut(r, e)
  return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this
}
function me(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.clear(); ++t < r; ) {
    var n = e[t]
    this.set(n[0], n[1])
  }
}
me.prototype.clear = Ms
me.prototype.delete = Os
me.prototype.get = Fs
me.prototype.has = Ds
me.prototype.set = Hs
var to = Hr(Ve, 'Map')
function Is() {
  ;(this.size = 0),
    (this.__data__ = {
      hash: new Ae(),
      map: new (to || me)(),
      string: new Ae(),
    })
}
function ks(e) {
  var t = typeof e
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
    ? e !== '__proto__'
    : e === null
}
function Xt(e, t) {
  var r = e.__data__
  return ks(t) ? r[typeof t == 'string' ? 'string' : 'hash'] : r.map
}
function Ws(e) {
  var t = Xt(this, e).delete(e)
  return (this.size -= t ? 1 : 0), t
}
function js(e) {
  return Xt(this, e).get(e)
}
function Ls(e) {
  return Xt(this, e).has(e)
}
function Ns(e, t) {
  var r = Xt(this, e),
    n = r.size
  return r.set(e, t), (this.size += r.size == n ? 0 : 1), this
}
function Xe(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.clear(); ++t < r; ) {
    var n = e[t]
    this.set(n[0], n[1])
  }
}
Xe.prototype.clear = Is
Xe.prototype.delete = Ws
Xe.prototype.get = js
Xe.prototype.has = Ls
Xe.prototype.set = Ns
function Vs(e) {
  return e == null ? '' : Vn(e)
}
var ro = ps(Object.getPrototypeOf, Object),
  Us = '[object Object]',
  Xs = Function.prototype,
  Ys = Object.prototype,
  no = Xs.toString,
  qs = Ys.hasOwnProperty,
  Ks = no.call(Object)
function Gs(e) {
  if (!Ue(e) || pt(e) != Us) return !1
  var t = ro(e)
  if (t === null) return !0
  var r = qs.call(t, 'constructor') && t.constructor
  return typeof r == 'function' && r instanceof r && no.call(r) == Ks
}
function Js(e, t, r) {
  var n = -1,
    o = e.length
  t < 0 && (t = -t > o ? 0 : o + t),
    (r = r > o ? o : r),
    r < 0 && (r += o),
    (o = t > r ? 0 : (r - t) >>> 0),
    (t >>>= 0)
  for (var i = Array(o); ++n < o; ) i[n] = e[n + t]
  return i
}
function Zs(e, t, r) {
  var n = e.length
  return (r = r === void 0 ? n : r), !t && r >= n ? e : Js(e, t, r)
}
var Qs = '\\ud800-\\udfff',
  eu = '\\u0300-\\u036f',
  tu = '\\ufe20-\\ufe2f',
  ru = '\\u20d0-\\u20ff',
  nu = eu + tu + ru,
  ou = '\\ufe0e\\ufe0f',
  iu = '\\u200d',
  au = RegExp('[' + iu + Qs + nu + ou + ']')
function oo(e) {
  return au.test(e)
}
function lu(e) {
  return e.split('')
}
var io = '\\ud800-\\udfff',
  su = '\\u0300-\\u036f',
  uu = '\\ufe20-\\ufe2f',
  cu = '\\u20d0-\\u20ff',
  du = su + uu + cu,
  fu = '\\ufe0e\\ufe0f',
  hu = '[' + io + ']',
  Rr = '[' + du + ']',
  $r = '\\ud83c[\\udffb-\\udfff]',
  vu = '(?:' + Rr + '|' + $r + ')',
  ao = '[^' + io + ']',
  lo = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  so = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  pu = '\\u200d',
  uo = vu + '?',
  co = '[' + fu + ']?',
  gu = '(?:' + pu + '(?:' + [ao, lo, so].join('|') + ')' + co + uo + ')*',
  bu = co + uo + gu,
  mu = '(?:' + [ao + Rr + '?', Rr, lo, so, hu].join('|') + ')',
  yu = RegExp($r + '(?=' + $r + ')|' + mu + bu, 'g')
function wu(e) {
  return e.match(yu) || []
}
function xu(e) {
  return oo(e) ? wu(e) : lu(e)
}
function Cu(e) {
  return function (t) {
    t = Vs(t)
    var r = oo(t) ? xu(t) : void 0,
      n = r ? r[0] : t.charAt(0),
      o = r ? Zs(r, 1).join('') : t.slice(1)
    return n[e]() + o
  }
}
var Su = Cu('toUpperCase')
function Tu() {
  ;(this.__data__ = new me()), (this.size = 0)
}
function Ru(e) {
  var t = this.__data__,
    r = t.delete(e)
  return (this.size = t.size), r
}
function $u(e) {
  return this.__data__.get(e)
}
function Pu(e) {
  return this.__data__.has(e)
}
var zu = 200
function _u(e, t) {
  var r = this.__data__
  if (r instanceof me) {
    var n = r.__data__
    if (!to || n.length < zu - 1)
      return n.push([e, t]), (this.size = ++r.size), this
    r = this.__data__ = new Xe(n)
  }
  return r.set(e, t), (this.size = r.size), this
}
function Ye(e) {
  var t = (this.__data__ = new me(e))
  this.size = t.size
}
Ye.prototype.clear = Tu
Ye.prototype.delete = Ru
Ye.prototype.get = $u
Ye.prototype.has = Pu
Ye.prototype.set = _u
var fo = typeof exports == 'object' && exports && !exports.nodeType && exports,
  xn = fo && typeof module == 'object' && module && !module.nodeType && module,
  Eu = xn && xn.exports === fo,
  Cn = Eu ? Ve.Buffer : void 0
Cn && Cn.allocUnsafe
function Mu(e, t) {
  return e.slice()
}
var Sn = Ve.Uint8Array
function Bu(e) {
  var t = new e.constructor(e.byteLength)
  return new Sn(t).set(new Sn(e)), t
}
function Au(e, t) {
  var r = Bu(e.buffer)
  return new e.constructor(r, e.byteOffset, e.length)
}
function Ou(e) {
  return typeof e.constructor == 'function' && !qn(e) ? fl(ro(e)) : {}
}
function Fu(e) {
  return function (t, r, n) {
    for (var o = -1, i = Object(t), l = n(t), s = l.length; s--; ) {
      var u = l[++o]
      if (r(i[u], u, i) === !1) break
    }
    return t
  }
}
var Du = Fu()
function Pr(e, t, r) {
  ;((r !== void 0 && !Vt(e[t], r)) || (r === void 0 && !(t in e))) &&
    Ir(e, t, r)
}
function Hu(e) {
  return Ue(e) && kr(e)
}
function zr(e, t) {
  if (!(t === 'constructor' && typeof e[t] == 'function') && t != '__proto__')
    return e[t]
}
function Iu(e) {
  return Pl(e, eo(e))
}
function ku(e, t, r, n, o, i, l) {
  var s = zr(e, r),
    u = zr(t, r),
    c = l.get(u)
  if (c) {
    Pr(e, r, c)
    return
  }
  var f = i ? i(s, u, r + '', e, t, l) : void 0,
    g = f === void 0
  if (g) {
    var $ = Ht(u),
      O = !$ && Jn(u),
      p = !$ && !O && Qn(u)
    ;(f = u),
      $ || O || p
        ? Ht(s)
          ? (f = s)
          : Hu(s)
            ? (f = vl(s))
            : O
              ? ((g = !1), (f = Mu(u)))
              : p
                ? ((g = !1), (f = Au(u)))
                : (f = [])
        : Gs(u) || Tr(u)
          ? ((f = s), Tr(s) ? (f = Iu(s)) : (!Oe(s) || Dr(s)) && (f = Ou(u)))
          : (g = !1)
  }
  g && (l.set(u, f), o(f, u, n, i, l), l.delete(u)), Pr(e, r, f)
}
function ho(e, t, r, n, o) {
  e !== t &&
    Du(
      t,
      function (i, l) {
        if ((o || (o = new Ye()), Oe(i))) ku(e, t, l, r, ho, n, o)
        else {
          var s = n ? n(zr(e, l), i, l + '', e, t, o) : void 0
          s === void 0 && (s = i), Pr(e, l, s)
        }
      },
      eo,
    )
}
var At = Bl(function (e, t, r) {
  ho(e, t, r)
})
const Yt = {
    fontFamily:
      'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono:
      'v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace',
    fontWeight: '400',
    fontWeightStrong: '500',
    cubicBezierEaseInOut: 'cubic-bezier(.4, 0, .2, 1)',
    cubicBezierEaseOut: 'cubic-bezier(0, 0, .2, 1)',
    cubicBezierEaseIn: 'cubic-bezier(.4, 0, 1, 1)',
    borderRadius: '3px',
    borderRadiusSmall: '2px',
    fontSize: '14px',
    fontSizeMini: '12px',
    fontSizeTiny: '12px',
    fontSizeSmall: '14px',
    fontSizeMedium: '14px',
    fontSizeLarge: '15px',
    fontSizeHuge: '16px',
    lineHeight: '1.6',
    heightMini: '16px',
    // private now, it's too small
    heightTiny: '22px',
    heightSmall: '28px',
    heightMedium: '34px',
    heightLarge: '40px',
    heightHuge: '46px',
  },
  { fontSize: Wu, fontFamily: ju, lineHeight: Lu } = Yt,
  vo = E(
    'body',
    `
 margin: 0;
 font-size: ${Wu};
 font-family: ${ju};
 line-height: ${Lu};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`,
    [
      E(
        'input',
        `
 font-family: inherit;
 font-size: inherit;
 `,
      ),
    ],
  ),
  qe = 'n-config-provider',
  vt = 'naive-ui-style'
function gt(e, t, r, n, o, i) {
  const l = Nt(),
    s = be(qe, null)
  if (r) {
    const c = () => {
      const f = i == null ? void 0 : i.value
      r.mount({
        id: f === void 0 ? t : f + t,
        head: !0,
        props: {
          bPrefix: f ? `.${f}-` : void 0,
        },
        anchorMetaName: vt,
        ssr: l,
      }),
        (s != null && s.preflightStyleDisabled) ||
          vo.mount({
            id: 'n-global',
            head: !0,
            anchorMetaName: vt,
            ssr: l,
          })
    }
    l ? c() : Ar(c)
  }
  return A(() => {
    var c
    const {
        theme: { common: f, self: g, peers: $ = {} } = {},
        themeOverrides: O = {},
        builtinThemeOverrides: p = {},
      } = o,
      { common: M, peers: R } = O,
      {
        common: P = void 0,
        [e]: { common: z = void 0, self: N = void 0, peers: U = {} } = {},
      } = (s == null ? void 0 : s.mergedThemeRef.value) || {},
      { common: X = void 0, [e]: L = {} } =
        (s == null ? void 0 : s.mergedThemeOverridesRef.value) || {},
      { common: b, peers: m = {} } = L,
      x = At({}, f || z || P || n.common, X, b, M),
      _ = At(
        // {}, executed every time, no need for empty obj
        (c = g || N || n.self) === null || c === void 0 ? void 0 : c(x),
        p,
        L,
        O,
      )
    return {
      common: x,
      self: _,
      peers: At({}, n.peers, U, $),
      peerOverrides: At({}, p.peers, m, R),
    }
  })
}
gt.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object,
}
const Nu = 'n'
function po(
  e = {},
  t = {
    defaultBordered: !0,
  },
) {
  const r = be(qe, null)
  return {
    // NConfigProvider,
    inlineThemeDisabled: r == null ? void 0 : r.inlineThemeDisabled,
    mergedRtlRef: r == null ? void 0 : r.mergedRtlRef,
    mergedComponentPropsRef: r == null ? void 0 : r.mergedComponentPropsRef,
    mergedBreakpointsRef: r == null ? void 0 : r.mergedBreakpointsRef,
    mergedBorderedRef: A(() => {
      var n, o
      const { bordered: i } = e
      return i !== void 0
        ? i
        : (o =
              (n = r == null ? void 0 : r.mergedBorderedRef.value) !== null &&
              n !== void 0
                ? n
                : t.defaultBordered) !== null && o !== void 0
          ? o
          : !0
    }),
    mergedClsPrefixRef: r ? r.mergedClsPrefixRef : pi(Nu),
    namespaceRef: A(() => (r == null ? void 0 : r.mergedNamespaceRef.value)),
  }
}
const Vu = {
  name: 'en-US',
  global: {
    undo: 'Undo',
    redo: 'Redo',
    confirm: 'Confirm',
    clear: 'Clear',
  },
  Popconfirm: {
    positiveText: 'Confirm',
    negativeText: 'Cancel',
  },
  Cascader: {
    placeholder: 'Please Select',
    loading: 'Loading',
    loadingRequiredMessage: (e) =>
      `Please load all ${e}'s descendants before checking it.`,
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'yyyy-w',
    clear: 'Clear',
    now: 'Now',
    confirm: 'Confirm',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    datePlaceholder: 'Select Date',
    datetimePlaceholder: 'Select Date and Time',
    monthPlaceholder: 'Select Month',
    yearPlaceholder: 'Select Year',
    quarterPlaceholder: 'Select Quarter',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    startDatetimePlaceholder: 'Start Date and Time',
    endDatetimePlaceholder: 'End Date and Time',
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: !0,
    firstDayOfWeek: 6,
    today: 'Today',
  },
  DataTable: {
    checkTableAll: 'Select all in the table',
    uncheckTableAll: 'Unselect all in the table',
    confirm: 'Confirm',
    clear: 'Clear',
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target',
  },
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (e) => `Total ${e} items`,
    selected: (e) => `${e} items selected`,
  },
  Empty: {
    description: 'No Data',
  },
  Select: {
    placeholder: 'Please Select',
  },
  TimePicker: {
    placeholder: 'Select Time',
    positiveText: 'OK',
    negativeText: 'Cancel',
    now: 'Now',
    clear: 'Clear',
  },
  Pagination: {
    goto: 'Goto',
    selectionSuffix: 'page',
  },
  DynamicTags: {
    add: 'Add',
  },
  Log: {
    loading: 'Loading',
  },
  Input: {
    placeholder: 'Please Input',
  },
  InputNumber: {
    placeholder: 'Please Input',
  },
  DynamicInput: {
    create: 'Create',
  },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'Clear All Variables',
    clearSearch: 'Clear Search',
    filterCompName: 'Filter Component Name',
    filterVarName: 'Filter Variable Name',
    import: 'Import',
    export: 'Export',
    restore: 'Reset to Default',
  },
  Image: {
    tipPrevious: 'Previous picture (←)',
    tipNext: 'Next picture (→)',
    tipCounterclockwise: 'Counterclockwise',
    tipClockwise: 'Clockwise',
    tipZoomOut: 'Zoom out',
    tipZoomIn: 'Zoom in',
    tipDownload: 'Download',
    tipClose: 'Close (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size',
  },
}
function gr(e) {
  return function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.width ? String(t.width) : e.defaultWidth,
      n = e.formats[r] || e.formats[e.defaultWidth]
    return n
  }
}
function nt(e) {
  return function (t, r) {
    var n = r != null && r.context ? String(r.context) : 'standalone',
      o
    if (n === 'formatting' && e.formattingValues) {
      var i = e.defaultFormattingWidth || e.defaultWidth,
        l = r != null && r.width ? String(r.width) : i
      o = e.formattingValues[l] || e.formattingValues[i]
    } else {
      var s = e.defaultWidth,
        u = r != null && r.width ? String(r.width) : e.defaultWidth
      o = e.values[u] || e.values[s]
    }
    var c = e.argumentCallback ? e.argumentCallback(t) : t
    return o[c]
  }
}
function ot(e) {
  return function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = r.width,
      o = (n && e.matchPatterns[n]) || e.matchPatterns[e.defaultMatchWidth],
      i = t.match(o)
    if (!i) return null
    var l = i[0],
      s = (n && e.parsePatterns[n]) || e.parsePatterns[e.defaultParseWidth],
      u = Array.isArray(s)
        ? Xu(s, function (g) {
            return g.test(l)
          })
        : Uu(s, function (g) {
            return g.test(l)
          }),
      c
    ;(c = e.valueCallback ? e.valueCallback(u) : u),
      (c = r.valueCallback ? r.valueCallback(c) : c)
    var f = t.slice(l.length)
    return {
      value: c,
      rest: f,
    }
  }
}
function Uu(e, t) {
  for (var r in e) if (e.hasOwnProperty(r) && t(e[r])) return r
}
function Xu(e, t) {
  for (var r = 0; r < e.length; r++) if (t(e[r])) return r
}
function Yu(e) {
  return function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = t.match(e.matchPattern)
    if (!n) return null
    var o = n[0],
      i = t.match(e.parsePattern)
    if (!i) return null
    var l = e.valueCallback ? e.valueCallback(i[0]) : i[0]
    l = r.valueCallback ? r.valueCallback(l) : l
    var s = t.slice(o.length)
    return {
      value: l,
      rest: s,
    }
  }
}
var qu = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds',
    },
    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds',
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes',
    },
    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes',
    },
    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours',
    },
    xHours: {
      one: '1 hour',
      other: '{{count}} hours',
    },
    xDays: {
      one: '1 day',
      other: '{{count}} days',
    },
    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks',
    },
    xWeeks: {
      one: '1 week',
      other: '{{count}} weeks',
    },
    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months',
    },
    xMonths: {
      one: '1 month',
      other: '{{count}} months',
    },
    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years',
    },
    xYears: {
      one: '1 year',
      other: '{{count}} years',
    },
    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years',
    },
    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years',
    },
  },
  Ku = function (t, r, n) {
    var o,
      i = qu[t]
    return (
      typeof i == 'string'
        ? (o = i)
        : r === 1
          ? (o = i.one)
          : (o = i.other.replace('{{count}}', r.toString())),
      n != null && n.addSuffix
        ? n.comparison && n.comparison > 0
          ? 'in ' + o
          : o + ' ago'
        : o
    )
  },
  Gu = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy',
  },
  Ju = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a',
  },
  Zu = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}',
  },
  Qu = {
    date: gr({
      formats: Gu,
      defaultWidth: 'full',
    }),
    time: gr({
      formats: Ju,
      defaultWidth: 'full',
    }),
    dateTime: gr({
      formats: Zu,
      defaultWidth: 'full',
    }),
  },
  ec = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  },
  tc = function (t, r, n, o) {
    return ec[t]
  },
  rc = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini'],
  },
  nc = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  },
  oc = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    wide: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  ic = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  ac = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
  },
  lc = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
  },
  sc = function (t, r) {
    var n = Number(t),
      o = n % 100
    if (o > 20 || o < 10)
      switch (o % 10) {
        case 1:
          return n + 'st'
        case 2:
          return n + 'nd'
        case 3:
          return n + 'rd'
      }
    return n + 'th'
  },
  uc = {
    ordinalNumber: sc,
    era: nt({
      values: rc,
      defaultWidth: 'wide',
    }),
    quarter: nt({
      values: nc,
      defaultWidth: 'wide',
      argumentCallback: function (t) {
        return t - 1
      },
    }),
    month: nt({
      values: oc,
      defaultWidth: 'wide',
    }),
    day: nt({
      values: ic,
      defaultWidth: 'wide',
    }),
    dayPeriod: nt({
      values: ac,
      defaultWidth: 'wide',
      formattingValues: lc,
      defaultFormattingWidth: 'wide',
    }),
  },
  cc = /^(\d+)(th|st|nd|rd)?/i,
  dc = /\d+/i,
  fc = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  hc = {
    any: [/^b/i, /^(a|c)/i],
  },
  vc = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  pc = {
    any: [/1/i, /2/i, /3/i, /4/i],
  },
  gc = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  bc = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  mc = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  yc = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  wc = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  xc = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  Cc = {
    ordinalNumber: Yu({
      matchPattern: cc,
      parsePattern: dc,
      valueCallback: function (t) {
        return parseInt(t, 10)
      },
    }),
    era: ot({
      matchPatterns: fc,
      defaultMatchWidth: 'wide',
      parsePatterns: hc,
      defaultParseWidth: 'any',
    }),
    quarter: ot({
      matchPatterns: vc,
      defaultMatchWidth: 'wide',
      parsePatterns: pc,
      defaultParseWidth: 'any',
      valueCallback: function (t) {
        return t + 1
      },
    }),
    month: ot({
      matchPatterns: gc,
      defaultMatchWidth: 'wide',
      parsePatterns: bc,
      defaultParseWidth: 'any',
    }),
    day: ot({
      matchPatterns: mc,
      defaultMatchWidth: 'wide',
      parsePatterns: yc,
      defaultParseWidth: 'any',
    }),
    dayPeriod: ot({
      matchPatterns: wc,
      defaultMatchWidth: 'any',
      parsePatterns: xc,
      defaultParseWidth: 'any',
    }),
  },
  Sc = {
    code: 'en-US',
    formatDistance: Ku,
    formatLong: Qu,
    formatRelative: tc,
    localize: uc,
    match: Cc,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1,
    },
  }
const Tc = {
  name: 'en-US',
  locale: Sc,
}
function Rc(e) {
  const { mergedLocaleRef: t, mergedDateLocaleRef: r } = be(qe, null) || {},
    n = A(() => {
      var i, l
      return (l =
        (i = t == null ? void 0 : t.value) === null || i === void 0
          ? void 0
          : i[e]) !== null && l !== void 0
        ? l
        : Vu[e]
    })
  return {
    dateLocaleRef: A(() => {
      var i
      return (i = r == null ? void 0 : r.value) !== null && i !== void 0
        ? i
        : Tc
    }),
    localeRef: n,
  }
}
function qt(e, t, r) {
  if (!t) return
  const n = Nt(),
    o = be(qe, null),
    i = () => {
      const l = r.value
      t.mount({
        id: l === void 0 ? e : l + e,
        head: !0,
        anchorMetaName: vt,
        props: {
          bPrefix: l ? `.${l}-` : void 0,
        },
        ssr: n,
      }),
        (o != null && o.preflightStyleDisabled) ||
          vo.mount({
            id: 'n-global',
            head: !0,
            anchorMetaName: vt,
            ssr: n,
          })
    }
  n ? i() : Ar(i)
}
function go(e, t, r, n) {
  var o
  r || Pi('useThemeClass', 'cssVarsRef is not passed')
  const i =
      (o = be(qe, null)) === null || o === void 0
        ? void 0
        : o.mergedThemeHashRef,
    l = B(''),
    s = Nt()
  let u
  const c = `__${e}`,
    f = () => {
      let g = c
      const $ = t ? t.value : void 0,
        O = i == null ? void 0 : i.value
      O && (g += '-' + O), $ && (g += '-' + $)
      const { themeOverrides: p, builtinThemeOverrides: M } = n
      p && (g += '-' + xr(JSON.stringify(p))),
        M && (g += '-' + xr(JSON.stringify(M))),
        (l.value = g),
        (u = () => {
          const R = r.value
          let P = ''
          for (const z in R) P += `${z}: ${R[z]};`
          E(`.${g}`, P).mount({
            id: g,
            ssr: s,
          }),
            (u = void 0)
        })
    }
  return (
    ct(() => {
      f()
    }),
    {
      themeClass: l,
      onRender: () => {
        u == null || u()
      },
    }
  )
}
function bo(e, t, r) {
  if (!t) return
  const n = Nt(),
    o = A(() => {
      const { value: l } = t
      if (!l) return
      const s = l[e]
      if (s) return s
    }),
    i = () => {
      ct(() => {
        const { value: l } = r,
          s = `${l}${e}Rtl`
        if (Yi(s, n)) return
        const { value: u } = o
        u &&
          u.style.mount({
            id: s,
            head: !0,
            anchorMetaName: vt,
            props: {
              bPrefix: l ? `.${l}-` : void 0,
            },
            ssr: n,
          })
      })
    }
  return n ? i() : Ar(i), o
}
function $c(e, t) {
  return le({
    name: Su(e),
    setup() {
      var r
      const n =
        (r = be(qe, null)) === null || r === void 0 ? void 0 : r.mergedIconsRef
      return () => {
        var o
        const i =
          (o = n == null ? void 0 : n.value) === null || o === void 0
            ? void 0
            : o[e]
        return i ? i() : t
      }
    },
  })
}
const Pc = le({
    name: 'Eye',
    render() {
      return v(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
        },
        v('path', {
          d: 'M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '32',
        }),
        v('circle', {
          cx: '256',
          cy: '256',
          r: '80',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-miterlimit': '10',
          'stroke-width': '32',
        }),
      )
    },
  }),
  zc = le({
    name: 'EyeOff',
    render() {
      return v(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
        },
        v('path', {
          d: 'M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z',
          fill: 'currentColor',
        }),
        v('path', {
          d: 'M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z',
          fill: 'currentColor',
        }),
        v('path', {
          d: 'M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z',
          fill: 'currentColor',
        }),
        v('path', {
          d: 'M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z',
          fill: 'currentColor',
        }),
        v('path', {
          d: 'M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z',
          fill: 'currentColor',
        }),
      )
    },
  }),
  _c = le({
    name: 'ChevronDown',
    render() {
      return v(
        'svg',
        {
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        v('path', {
          d: 'M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z',
          fill: 'currentColor',
        }),
      )
    },
  }),
  Ec = $c(
    'clear',
    v(
      'svg',
      {
        viewBox: '0 0 16 16',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      v(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          fill: 'none',
          'fill-rule': 'evenodd',
        },
        v(
          'g',
          {
            fill: 'currentColor',
            'fill-rule': 'nonzero',
          },
          v('path', {
            d: 'M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z',
          }),
        ),
      ),
    ),
  ),
  mo = le({
    name: 'BaseIconSwitchTransition',
    setup(e, { slots: t }) {
      const r = ia()
      return () =>
        v(
          mr,
          {
            name: 'icon-switch-transition',
            appear: r.value,
          },
          t,
        )
    },
  }),
  Mc = W(
    'base-icon',
    `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,
    [
      E(
        'svg',
        `
 height: 1em;
 width: 1em;
 `,
      ),
    ],
  ),
  kt = le({
    name: 'BaseIcon',
    props: {
      role: String,
      ariaLabel: String,
      ariaDisabled: {
        type: Boolean,
        default: void 0,
      },
      ariaHidden: {
        type: Boolean,
        default: void 0,
      },
      clsPrefix: {
        type: String,
        required: !0,
      },
      onClick: Function,
      onMousedown: Function,
      onMouseup: Function,
    },
    setup(e) {
      qt('-base-icon', Mc, dt(e, 'clsPrefix'))
    },
    render() {
      return v(
        'i',
        {
          class: `${this.clsPrefix}-base-icon`,
          onClick: this.onClick,
          onMousedown: this.onMousedown,
          onMouseup: this.onMouseup,
          role: this.role,
          'aria-label': this.ariaLabel,
          'aria-hidden': this.ariaHidden,
          'aria-disabled': this.ariaDisabled,
        },
        this.$slots,
      )
    },
  }),
  { cubicBezierEaseInOut: Bc } = Yt
function _r({
  originalTransform: e = '',
  left: t = 0,
  top: r = 0,
  transition: n = `all .3s ${Bc} !important`,
} = {}) {
  return [
    E(
      '&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to',
      {
        transform: e + ' scale(0.75)',
        left: t,
        top: r,
        opacity: 0,
      },
    ),
    E(
      '&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from',
      {
        transform: `scale(1) ${e}`,
        left: t,
        top: r,
        opacity: 1,
      },
    ),
    E(
      '&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active',
      {
        transformOrigin: 'center',
        position: 'absolute',
        left: t,
        top: r,
        transition: n,
      },
    ),
  ]
}
const Ac = E([
    E(
      '@keyframes rotator',
      `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`,
    ),
    W(
      'base-loading',
      `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,
      [
        T(
          'transition-wrapper',
          `
 position: absolute;
 width: 100%;
 height: 100%;
 `,
          [_r()],
        ),
        T(
          'placeholder',
          `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,
          [
            _r({
              left: '50%',
              top: '50%',
              originalTransform: 'translateX(-50%) translateY(-50%)',
            }),
          ],
        ),
        T(
          'container',
          `
 animation: rotator 3s linear infinite both;
 `,
          [
            T(
              'icon',
              `
 height: 1em;
 width: 1em;
 `,
            ),
          ],
        ),
      ],
    ),
  ]),
  br = '1.6s',
  Oc = {
    strokeWidth: {
      type: Number,
      default: 28,
    },
    stroke: {
      type: String,
      default: void 0,
    },
  },
  Fc = le({
    name: 'BaseLoading',
    props: Object.assign(
      {
        clsPrefix: {
          type: String,
          required: !0,
        },
        show: {
          type: Boolean,
          default: !0,
        },
        scale: {
          type: Number,
          default: 1,
        },
        radius: {
          type: Number,
          default: 100,
        },
      },
      Oc,
    ),
    setup(e) {
      qt('-base-loading', Ac, dt(e, 'clsPrefix'))
    },
    render() {
      const {
          clsPrefix: e,
          radius: t,
          strokeWidth: r,
          stroke: n,
          scale: o,
        } = this,
        i = t / o
      return v(
        'div',
        {
          class: `${e}-base-loading`,
          role: 'img',
          'aria-label': 'loading',
        },
        v(mo, null, {
          default: () =>
            this.show
              ? v(
                  'div',
                  {
                    key: 'icon',
                    class: `${e}-base-loading__transition-wrapper`,
                  },
                  v(
                    'div',
                    {
                      class: `${e}-base-loading__container`,
                    },
                    v(
                      'svg',
                      {
                        class: `${e}-base-loading__icon`,
                        viewBox: `0 0 ${2 * i} ${2 * i}`,
                        xmlns: 'http://www.w3.org/2000/svg',
                        style: {
                          color: n,
                        },
                      },
                      v(
                        'g',
                        null,
                        v('animateTransform', {
                          attributeName: 'transform',
                          type: 'rotate',
                          values: `0 ${i} ${i};270 ${i} ${i}`,
                          begin: '0s',
                          dur: br,
                          fill: 'freeze',
                          repeatCount: 'indefinite',
                        }),
                        v(
                          'circle',
                          {
                            class: `${e}-base-loading__icon`,
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': r,
                            'stroke-linecap': 'round',
                            cx: i,
                            cy: i,
                            r: t - r / 2,
                            'stroke-dasharray': 5.67 * t,
                            'stroke-dashoffset': 18.48 * t,
                          },
                          v('animateTransform', {
                            attributeName: 'transform',
                            type: 'rotate',
                            values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
                            begin: '0s',
                            dur: br,
                            fill: 'freeze',
                            repeatCount: 'indefinite',
                          }),
                          v('animate', {
                            attributeName: 'stroke-dashoffset',
                            values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
                            begin: '0s',
                            dur: br,
                            fill: 'freeze',
                            repeatCount: 'indefinite',
                          }),
                        ),
                      ),
                    ),
                  ),
                )
              : v(
                  'div',
                  {
                    key: 'placeholder',
                    class: `${e}-base-loading__placeholder`,
                  },
                  this.$slots,
                ),
        }),
      )
    },
  }),
  w = {
    neutralBase: '#FFF',
    neutralInvertBase: '#000',
    neutralTextBase: '#000',
    neutralPopover: '#fff',
    neutralCard: '#fff',
    neutralModal: '#fff',
    neutralBody: '#fff',
    alpha1: '0.82',
    alpha2: '0.72',
    alpha3: '0.38',
    alpha4: '0.24',
    // disabled text, placeholder, icon
    alpha5: '0.18',
    // disabled placeholder
    alphaClose: '0.6',
    alphaDisabled: '0.5',
    alphaDisabledInput: '0.02',
    alphaPending: '0.05',
    alphaTablePending: '0.02',
    alphaPressed: '0.07',
    alphaAvatar: '0.2',
    alphaRail: '0.14',
    alphaProgressRail: '.08',
    alphaBorder: '0.12',
    alphaDivider: '0.06',
    alphaInput: '0',
    alphaAction: '0.02',
    alphaTab: '0.04',
    alphaScrollbar: '0.25',
    alphaScrollbarHover: '0.4',
    alphaCode: '0.05',
    alphaTag: '0.02',
    // primary
    primaryHover: '#36ad6a',
    primaryDefault: '#18a058',
    primaryActive: '#0c7a43',
    primarySuppl: '#36ad6a',
    // info
    infoHover: '#4098fc',
    infoDefault: '#2080f0',
    infoActive: '#1060c9',
    infoSuppl: '#4098fc',
    // error
    errorHover: '#de576d',
    errorDefault: '#d03050',
    errorActive: '#ab1f3f',
    errorSuppl: '#de576d',
    // warning
    warningHover: '#fcb040',
    warningDefault: '#f0a020',
    warningActive: '#c97c10',
    warningSuppl: '#fcb040',
    // success
    successHover: '#36ad6a',
    successDefault: '#18a058',
    successActive: '#0c7a43',
    successSuppl: '#36ad6a',
  },
  Dc = Be(w.neutralBase),
  yo = Be(w.neutralInvertBase),
  Hc = 'rgba(' + yo.slice(0, 3).join(', ') + ', '
function Tn(e) {
  return Hc + String(e) + ')'
}
function re(e) {
  const t = Array.from(yo)
  return (t[3] = Number(e)), Ri(Dc, t)
}
const wo = Object.assign(
    Object.assign(
      {
        name: 'common',
      },
      Yt,
    ),
    {
      baseColor: w.neutralBase,
      // primary color
      primaryColor: w.primaryDefault,
      primaryColorHover: w.primaryHover,
      primaryColorPressed: w.primaryActive,
      primaryColorSuppl: w.primarySuppl,
      // info color
      infoColor: w.infoDefault,
      infoColorHover: w.infoHover,
      infoColorPressed: w.infoActive,
      infoColorSuppl: w.infoSuppl,
      // success color
      successColor: w.successDefault,
      successColorHover: w.successHover,
      successColorPressed: w.successActive,
      successColorSuppl: w.successSuppl,
      // warning color
      warningColor: w.warningDefault,
      warningColorHover: w.warningHover,
      warningColorPressed: w.warningActive,
      warningColorSuppl: w.warningSuppl,
      // error color
      errorColor: w.errorDefault,
      errorColorHover: w.errorHover,
      errorColorPressed: w.errorActive,
      errorColorSuppl: w.errorSuppl,
      // text color
      textColorBase: w.neutralTextBase,
      textColor1: 'rgb(31, 34, 37)',
      textColor2: 'rgb(51, 54, 57)',
      textColor3: 'rgb(118, 124, 130)',
      // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
      // textColor5: neutral(base.alpha5),
      textColorDisabled: re(w.alpha4),
      placeholderColor: re(w.alpha4),
      placeholderColorDisabled: re(w.alpha5),
      iconColor: re(w.alpha4),
      iconColorHover: $t(re(w.alpha4), {
        lightness: 0.75,
      }),
      iconColorPressed: $t(re(w.alpha4), {
        lightness: 0.9,
      }),
      iconColorDisabled: re(w.alpha5),
      opacity1: w.alpha1,
      opacity2: w.alpha2,
      opacity3: w.alpha3,
      opacity4: w.alpha4,
      opacity5: w.alpha5,
      dividerColor: 'rgb(239, 239, 245)',
      borderColor: 'rgb(224, 224, 230)',
      // close
      closeIconColor: re(Number(w.alphaClose)),
      closeIconColorHover: re(Number(w.alphaClose)),
      closeIconColorPressed: re(Number(w.alphaClose)),
      closeColorHover: 'rgba(0, 0, 0, .09)',
      closeColorPressed: 'rgba(0, 0, 0, .13)',
      // clear
      clearColor: re(w.alpha4),
      clearColorHover: $t(re(w.alpha4), {
        lightness: 0.75,
      }),
      clearColorPressed: $t(re(w.alpha4), {
        lightness: 0.9,
      }),
      scrollbarColor: Tn(w.alphaScrollbar),
      scrollbarColorHover: Tn(w.alphaScrollbarHover),
      scrollbarWidth: '5px',
      scrollbarHeight: '5px',
      scrollbarBorderRadius: '5px',
      progressRailColor: re(w.alphaProgressRail),
      railColor: 'rgb(219, 219, 223)',
      popoverColor: w.neutralPopover,
      tableColor: w.neutralCard,
      cardColor: w.neutralCard,
      modalColor: w.neutralModal,
      bodyColor: w.neutralBody,
      tagColor: '#eee',
      avatarColor: re(w.alphaAvatar),
      invertedColor: 'rgb(0, 20, 40)',
      inputColor: re(w.alphaInput),
      codeColor: 'rgb(244, 244, 248)',
      tabColor: 'rgb(247, 247, 250)',
      actionColor: 'rgb(250, 250, 252)',
      tableHeaderColor: 'rgb(250, 250, 252)',
      hoverColor: 'rgb(243, 243, 245)',
      // use color with alpha since it can be nested with header filter & sorter effect
      tableColorHover: 'rgba(0, 0, 100, 0.03)',
      tableColorStriped: 'rgba(0, 0, 100, 0.02)',
      pressedColor: 'rgb(237, 237, 239)',
      opacityDisabled: w.alphaDisabled,
      inputColorDisabled: 'rgb(250, 250, 252)',
      // secondary button color
      // can also be used in tertiary button & quaternary button
      buttonColor2: 'rgba(46, 51, 56, .05)',
      buttonColor2Hover: 'rgba(46, 51, 56, .09)',
      buttonColor2Pressed: 'rgba(46, 51, 56, .13)',
      boxShadow1:
        '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
      boxShadow2:
        '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
      boxShadow3:
        '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
    },
  ),
  Ic = {
    railInsetHorizontal: 'auto 2px 4px 2px',
    railInsetVertical: '2px 4px 2px auto',
    railColor: 'transparent',
  },
  kc = (e) => {
    const {
      scrollbarColor: t,
      scrollbarColorHover: r,
      scrollbarHeight: n,
      scrollbarWidth: o,
      scrollbarBorderRadius: i,
    } = e
    return Object.assign(Object.assign({}, Ic), {
      height: n,
      width: o,
      borderRadius: i,
      color: t,
      colorHover: r,
    })
  },
  Wc = {
    name: 'Scrollbar',
    common: wo,
    self: kc,
  },
  { cubicBezierEaseInOut: Rn } = Yt
function jc({
  name: e = 'fade-in',
  enterDuration: t = '0.2s',
  leaveDuration: r = '0.2s',
  enterCubicBezier: n = Rn,
  leaveCubicBezier: o = Rn,
} = {}) {
  return [
    E(`&.${e}-transition-enter-active`, {
      transition: `all ${t} ${n}!important`,
    }),
    E(`&.${e}-transition-leave-active`, {
      transition: `all ${r} ${o}!important`,
    }),
    E(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
      opacity: 0,
    }),
    E(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
      opacity: 1,
    }),
  ]
}
const Lc = W(
    'scrollbar',
    `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,
    [
      E('>', [
        W(
          'scrollbar-container',
          `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `,
          [
            E(
              '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
              `
 width: 0;
 height: 0;
 display: none;
 `,
            ),
            E('>', [
              // We can't set overflow hidden since it affects positioning.
              W(
                'scrollbar-content',
                `
 box-sizing: border-box;
 min-width: 100%;
 `,
              ),
            ]),
          ],
        ),
      ]),
      E('>, +', [
        W(
          'scrollbar-rail',
          `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `,
          [
            ae(
              'horizontal',
              `
 inset: var(--n-scrollbar-rail-inset-horizontal);
 height: var(--n-scrollbar-height);
 `,
              [
                E('>', [
                  T(
                    'scrollbar',
                    `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `,
                  ),
                ]),
              ],
            ),
            ae(
              'vertical',
              `
 inset: var(--n-scrollbar-rail-inset-vertical);
 width: var(--n-scrollbar-width);
 `,
              [
                E('>', [
                  T(
                    'scrollbar',
                    `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `,
                  ),
                ]),
              ],
            ),
            ae('disabled', [E('>', [T('scrollbar', 'pointer-events: none;')])]),
            E('>', [
              T(
                'scrollbar',
                `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `,
                [
                  jc(),
                  E(
                    '&:hover',
                    'background-color: var(--n-scrollbar-color-hover);',
                  ),
                ],
              ),
            ]),
          ],
        ),
      ]),
    ],
  ),
  Nc = Object.assign(Object.assign({}, gt.props), {
    duration: {
      type: Number,
      default: 0,
    },
    scrollable: {
      type: Boolean,
      default: !0,
    },
    xScrollable: Boolean,
    trigger: {
      type: String,
      default: 'hover',
    },
    useUnifiedContainer: Boolean,
    triggerDisplayManually: Boolean,
    // If container is set, resize observer won't not attached
    container: Function,
    content: Function,
    containerClass: String,
    containerStyle: [String, Object],
    contentClass: [String, Array],
    contentStyle: [String, Object],
    horizontalRailStyle: [String, Object],
    verticalRailStyle: [String, Object],
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    internalOnUpdateScrollLeft: Function,
    internalHoistYRail: Boolean,
  }),
  Vc = le({
    name: 'Scrollbar',
    props: Nc,
    inheritAttrs: !1,
    setup(e) {
      const {
          mergedClsPrefixRef: t,
          inlineThemeDisabled: r,
          mergedRtlRef: n,
        } = po(e),
        o = bo('Scrollbar', n, t),
        i = B(null),
        l = B(null),
        s = B(null),
        u = B(null),
        c = B(null),
        f = B(null),
        g = B(null),
        $ = B(null),
        O = B(null),
        p = B(null),
        M = B(null),
        R = B(0),
        P = B(0),
        z = B(!1),
        N = B(!1)
      let U = !1,
        X = !1,
        L,
        b,
        m = 0,
        x = 0,
        _ = 0,
        F = 0
      const Y = la(),
        Z = gt('Scrollbar', '-scrollbar', Lc, Wc, e, t),
        K = A(() => {
          const { value: h } = $,
            { value: y } = f,
            { value: S } = p
          return h === null || y === null || S === null
            ? 0
            : Math.min(h, (S * h) / y + Vr(Z.value.self.width) * 1.5)
        }),
        G = A(() => `${K.value}px`),
        Q = A(() => {
          const { value: h } = O,
            { value: y } = g,
            { value: S } = M
          return h === null || y === null || S === null
            ? 0
            : (S * h) / y + Vr(Z.value.self.height) * 1.5
        }),
        se = A(() => `${Q.value}px`),
        ee = A(() => {
          const { value: h } = $,
            { value: y } = R,
            { value: S } = f,
            { value: D } = p
          if (h === null || S === null || D === null) return 0
          {
            const q = S - h
            return q ? (y / q) * (D - K.value) : 0
          }
        }),
        ce = A(() => `${ee.value}px`),
        de = A(() => {
          const { value: h } = O,
            { value: y } = P,
            { value: S } = g,
            { value: D } = M
          if (h === null || S === null || D === null) return 0
          {
            const q = S - h
            return q ? (y / q) * (D - Q.value) : 0
          }
        }),
        fe = A(() => `${de.value}px`),
        Fe = A(() => {
          const { value: h } = $,
            { value: y } = f
          return h !== null && y !== null && y > h
        }),
        bt = A(() => {
          const { value: h } = O,
            { value: y } = g
          return h !== null && y !== null && y > h
        }),
        De = A(() => {
          const { trigger: h } = e
          return h === 'none' || z.value
        }),
        He = A(() => {
          const { trigger: h } = e
          return h === 'none' || N.value
        }),
        ve = A(() => {
          const { container: h } = e
          return h ? h() : l.value
        }),
        Kt = A(() => {
          const { content: h } = e
          return h ? h() : s.value
        }),
        mt = Oa(() => {
          e.container ||
            yt({
              top: R.value,
              left: P.value,
            })
        }),
        Gt = () => {
          mt.isDeactivated || pe()
        },
        Jt = (h) => {
          if (mt.isDeactivated) return
          const { onResize: y } = e
          y && y(h), pe()
        },
        yt = (h, y) => {
          if (!e.scrollable) return
          if (typeof h == 'number') {
            ye(h, y ?? 0, 0, !1, 'auto')
            return
          }
          const {
            left: S,
            top: D,
            index: q,
            elSize: te,
            position: ue,
            behavior: I,
            el: oe,
            debounce: Ce = !0,
          } = h
          ;(S !== void 0 || D !== void 0) && ye(S ?? 0, D ?? 0, 0, !1, I),
            oe !== void 0
              ? ye(0, oe.offsetTop, oe.offsetHeight, Ce, I)
              : q !== void 0 && te !== void 0
                ? ye(0, q * te, te, Ce, I)
                : ue === 'bottom'
                  ? ye(0, Number.MAX_SAFE_INTEGER, 0, !1, I)
                  : ue === 'top' && ye(0, 0, 0, !1, I)
        },
        Zt = (h, y) => {
          if (!e.scrollable) return
          const { value: S } = ve
          S && (typeof h == 'object' ? S.scrollBy(h) : S.scrollBy(h, y || 0))
        }
      function ye(h, y, S, D, q) {
        const { value: te } = ve
        if (te) {
          if (D) {
            const { scrollTop: ue, offsetHeight: I } = te
            if (y > ue) {
              y + S <= ue + I ||
                te.scrollTo({
                  left: h,
                  top: y + S - I,
                  behavior: q,
                })
              return
            }
          }
          te.scrollTo({
            left: h,
            top: y,
            behavior: q,
          })
        }
      }
      function Qt() {
        rr(), nr(), pe()
      }
      function er() {
        Ke()
      }
      function Ke() {
        tr(), Ie()
      }
      function tr() {
        b !== void 0 && window.clearTimeout(b),
          (b = window.setTimeout(() => {
            N.value = !1
          }, e.duration))
      }
      function Ie() {
        L !== void 0 && window.clearTimeout(L),
          (L = window.setTimeout(() => {
            z.value = !1
          }, e.duration))
      }
      function rr() {
        L !== void 0 && window.clearTimeout(L), (z.value = !0)
      }
      function nr() {
        b !== void 0 && window.clearTimeout(b), (N.value = !0)
      }
      function or(h) {
        const { onScroll: y } = e
        y && y(h), wt()
      }
      function wt() {
        const { value: h } = ve
        h &&
          ((R.value = h.scrollTop),
          (P.value = h.scrollLeft * (o != null && o.value ? -1 : 1)))
      }
      function ir() {
        const { value: h } = Kt
        h && ((f.value = h.offsetHeight), (g.value = h.offsetWidth))
        const { value: y } = ve
        y && (($.value = y.offsetHeight), (O.value = y.offsetWidth))
        const { value: S } = c,
          { value: D } = u
        S && (M.value = S.offsetWidth), D && (p.value = D.offsetHeight)
      }
      function xe() {
        const { value: h } = ve
        h &&
          ((R.value = h.scrollTop),
          (P.value = h.scrollLeft * (o != null && o.value ? -1 : 1)),
          ($.value = h.offsetHeight),
          (O.value = h.offsetWidth),
          (f.value = h.scrollHeight),
          (g.value = h.scrollWidth))
        const { value: y } = c,
          { value: S } = u
        y && (M.value = y.offsetWidth), S && (p.value = S.offsetHeight)
      }
      function pe() {
        e.scrollable && (e.useUnifiedContainer ? xe() : (ir(), wt()))
      }
      function xt(h) {
        var y
        return !(!((y = i.value) === null || y === void 0) && y.contains(bi(h)))
      }
      function ar(h) {
        h.preventDefault(),
          h.stopPropagation(),
          (X = !0),
          _e('mousemove', window, Ge, !0),
          _e('mouseup', window, Ct, !0),
          (x = P.value),
          (_ = o != null && o.value ? window.innerWidth - h.clientX : h.clientX)
      }
      function Ge(h) {
        if (!X) return
        L !== void 0 && window.clearTimeout(L),
          b !== void 0 && window.clearTimeout(b)
        const { value: y } = O,
          { value: S } = g,
          { value: D } = Q
        if (y === null || S === null) return
        const te =
            ((o != null && o.value
              ? window.innerWidth - h.clientX - _
              : h.clientX - _) *
              (S - y)) /
            (y - D),
          ue = S - y
        let I = x + te
        ;(I = Math.min(ue, I)), (I = Math.max(I, 0))
        const { value: oe } = ve
        if (oe) {
          oe.scrollLeft = I * (o != null && o.value ? -1 : 1)
          const { internalOnUpdateScrollLeft: Ce } = e
          Ce && Ce(I)
        }
      }
      function Ct(h) {
        h.preventDefault(),
          h.stopPropagation(),
          ge('mousemove', window, Ge, !0),
          ge('mouseup', window, Ct, !0),
          (X = !1),
          pe(),
          xt(h) && Ke()
      }
      function lr(h) {
        h.preventDefault(),
          h.stopPropagation(),
          (U = !0),
          _e('mousemove', window, Je, !0),
          _e('mouseup', window, Ze, !0),
          (m = R.value),
          (F = h.clientY)
      }
      function Je(h) {
        if (!U) return
        L !== void 0 && window.clearTimeout(L),
          b !== void 0 && window.clearTimeout(b)
        const { value: y } = $,
          { value: S } = f,
          { value: D } = K
        if (y === null || S === null) return
        const te = ((h.clientY - F) * (S - y)) / (y - D),
          ue = S - y
        let I = m + te
        ;(I = Math.min(ue, I)), (I = Math.max(I, 0))
        const { value: oe } = ve
        oe && (oe.scrollTop = I)
      }
      function Ze(h) {
        h.preventDefault(),
          h.stopPropagation(),
          ge('mousemove', window, Je, !0),
          ge('mouseup', window, Ze, !0),
          (U = !1),
          pe(),
          xt(h) && Ke()
      }
      ct(() => {
        const { value: h } = bt,
          { value: y } = Fe,
          { value: S } = t,
          { value: D } = c,
          { value: q } = u
        D &&
          (h
            ? D.classList.remove(`${S}-scrollbar-rail--disabled`)
            : D.classList.add(`${S}-scrollbar-rail--disabled`)),
          q &&
            (y
              ? q.classList.remove(`${S}-scrollbar-rail--disabled`)
              : q.classList.add(`${S}-scrollbar-rail--disabled`))
      }),
        Wt(() => {
          e.container || pe()
        }),
        Br(() => {
          L !== void 0 && window.clearTimeout(L),
            b !== void 0 && window.clearTimeout(b),
            ge('mousemove', window, Je, !0),
            ge('mouseup', window, Ze, !0)
        })
      const St = A(() => {
          const {
            common: { cubicBezierEaseInOut: h },
            self: {
              color: y,
              colorHover: S,
              height: D,
              width: q,
              borderRadius: te,
              railInsetHorizontal: ue,
              railInsetVertical: I,
              railColor: oe,
            },
          } = Z.value
          return {
            '--n-scrollbar-bezier': h,
            '--n-scrollbar-color': y,
            '--n-scrollbar-color-hover': S,
            '--n-scrollbar-border-radius': te,
            '--n-scrollbar-width': q,
            '--n-scrollbar-height': D,
            '--n-scrollbar-rail-inset-horizontal': ue,
            '--n-scrollbar-rail-inset-vertical':
              o != null && o.value ? _i(I) : I,
            '--n-scrollbar-rail-color': oe,
          }
        }),
        we = r ? go('scrollbar', void 0, St, e) : void 0
      return Object.assign(
        Object.assign(
          {},
          {
            scrollTo: yt,
            scrollBy: Zt,
            sync: pe,
            syncUnifiedContainer: xe,
            handleMouseEnterWrapper: Qt,
            handleMouseLeaveWrapper: er,
          },
        ),
        {
          mergedClsPrefix: t,
          rtlEnabled: o,
          containerScrollTop: R,
          wrapperRef: i,
          containerRef: l,
          contentRef: s,
          yRailRef: u,
          xRailRef: c,
          needYBar: Fe,
          needXBar: bt,
          yBarSizePx: G,
          xBarSizePx: se,
          yBarTopPx: ce,
          xBarLeftPx: fe,
          isShowXBar: De,
          isShowYBar: He,
          isIos: Y,
          handleScroll: or,
          handleContentResize: Gt,
          handleContainerResize: Jt,
          handleYScrollMouseDown: lr,
          handleXScrollMouseDown: ar,
          cssVars: r ? void 0 : St,
          themeClass: we == null ? void 0 : we.themeClass,
          onRender: we == null ? void 0 : we.onRender,
        },
      )
    },
    render() {
      var e
      const {
        $slots: t,
        mergedClsPrefix: r,
        triggerDisplayManually: n,
        rtlEnabled: o,
        internalHoistYRail: i,
      } = this
      if (!this.scrollable)
        return (e = t.default) === null || e === void 0 ? void 0 : e.call(t)
      const l = this.trigger === 'none',
        s = (f, g) =>
          v(
            'div',
            {
              ref: 'yRailRef',
              class: [
                `${r}-scrollbar-rail`,
                `${r}-scrollbar-rail--vertical`,
                f,
              ],
              'data-scrollbar-rail': !0,
              style: [g || '', this.verticalRailStyle],
              'aria-hidden': !0,
            },
            v(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              l ? Xr : mr,
              l
                ? null
                : {
                    name: 'fade-in-transition',
                  },
              {
                default: () =>
                  this.needYBar && this.isShowYBar && !this.isIos
                    ? v('div', {
                        class: `${r}-scrollbar-rail__scrollbar`,
                        style: {
                          height: this.yBarSizePx,
                          top: this.yBarTopPx,
                        },
                        onMousedown: this.handleYScrollMouseDown,
                      })
                    : null,
              },
            ),
          ),
        u = () => {
          var f, g
          return (
            (f = this.onRender) === null || f === void 0 || f.call(this),
            v(
              'div',
              gi(this.$attrs, {
                role: 'none',
                ref: 'wrapperRef',
                class: [
                  `${r}-scrollbar`,
                  this.themeClass,
                  o && `${r}-scrollbar--rtl`,
                ],
                style: this.cssVars,
                onMouseenter: n ? void 0 : this.handleMouseEnterWrapper,
                onMouseleave: n ? void 0 : this.handleMouseLeaveWrapper,
              }),
              [
                this.container
                  ? (g = t.default) === null || g === void 0
                    ? void 0
                    : g.call(t)
                  : v(
                      'div',
                      {
                        role: 'none',
                        ref: 'containerRef',
                        class: [
                          `${r}-scrollbar-container`,
                          this.containerClass,
                        ],
                        style: this.containerStyle,
                        onScroll: this.handleScroll,
                        onWheel: this.onWheel,
                      },
                      v(
                        Sr,
                        {
                          onResize: this.handleContentResize,
                        },
                        {
                          default: () =>
                            v(
                              'div',
                              {
                                ref: 'contentRef',
                                role: 'none',
                                style: [
                                  {
                                    width: this.xScrollable
                                      ? 'fit-content'
                                      : null,
                                  },
                                  this.contentStyle,
                                ],
                                class: [
                                  `${r}-scrollbar-content`,
                                  this.contentClass,
                                ],
                              },
                              t,
                            ),
                        },
                      ),
                    ),
                i ? null : s(void 0, void 0),
                this.xScrollable &&
                  v(
                    'div',
                    {
                      ref: 'xRailRef',
                      class: [
                        `${r}-scrollbar-rail`,
                        `${r}-scrollbar-rail--horizontal`,
                      ],
                      style: this.horizontalRailStyle,
                      'data-scrollbar-rail': !0,
                      'aria-hidden': !0,
                    },
                    v(
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      l ? Xr : mr,
                      l
                        ? null
                        : {
                            name: 'fade-in-transition',
                          },
                      {
                        default: () =>
                          this.needXBar && this.isShowXBar && !this.isIos
                            ? v('div', {
                                class: `${r}-scrollbar-rail__scrollbar`,
                                style: {
                                  width: this.xBarSizePx,
                                  right: o ? this.xBarLeftPx : void 0,
                                  left: o ? void 0 : this.xBarLeftPx,
                                },
                                onMousedown: this.handleXScrollMouseDown,
                              })
                            : null,
                      },
                    ),
                  ),
              ],
            )
          )
        },
        c = this.container
          ? u()
          : v(
              Sr,
              {
                onResize: this.handleContainerResize,
              },
              {
                default: u,
              },
            )
      return i ? v(Mr, null, c, s(this.themeClass, this.cssVars)) : c
    },
  }),
  Uc = W(
    'base-clear',
    `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`,
    [
      E('>', [
        T(
          'clear',
          `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `,
          [
            E(
              '&:hover',
              `
 color: var(--n-clear-color-hover)!important;
 `,
            ),
            E(
              '&:active',
              `
 color: var(--n-clear-color-pressed)!important;
 `,
            ),
          ],
        ),
        T(
          'placeholder',
          `
 display: flex;
 `,
        ),
        T(
          'clear, placeholder',
          `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,
          [
            _r({
              originalTransform: 'translateX(-50%) translateY(-50%)',
              left: '50%',
              top: '50%',
            }),
          ],
        ),
      ]),
    ],
  ),
  Er = le({
    name: 'BaseClear',
    props: {
      clsPrefix: {
        type: String,
        required: !0,
      },
      show: Boolean,
      onClear: Function,
    },
    setup(e) {
      return (
        qt('-base-clear', Uc, dt(e, 'clsPrefix')),
        {
          handleMouseDown(t) {
            t.preventDefault()
          },
        }
      )
    },
    render() {
      const { clsPrefix: e } = this
      return v(
        'div',
        {
          class: `${e}-base-clear`,
        },
        v(mo, null, {
          default: () => {
            var t, r
            return this.show
              ? v(
                  'div',
                  {
                    key: 'dismiss',
                    class: `${e}-base-clear__clear`,
                    onClick: this.onClear,
                    onMousedown: this.handleMouseDown,
                    'data-clear': !0,
                  },
                  at(this.$slots.icon, () => [
                    v(
                      kt,
                      {
                        clsPrefix: e,
                      },
                      {
                        default: () => v(Ec, null),
                      },
                    ),
                  ]),
                )
              : v(
                  'div',
                  {
                    key: 'icon',
                    class: `${e}-base-clear__placeholder`,
                  },
                  (r = (t = this.$slots).placeholder) === null || r === void 0
                    ? void 0
                    : r.call(t),
                )
          },
        }),
      )
    },
  }),
  Xc = le({
    name: 'InternalSelectionSuffix',
    props: {
      clsPrefix: {
        type: String,
        required: !0,
      },
      showArrow: {
        type: Boolean,
        default: void 0,
      },
      showClear: {
        type: Boolean,
        default: void 0,
      },
      loading: {
        type: Boolean,
        default: !1,
      },
      onClear: Function,
    },
    setup(e, { slots: t }) {
      return () => {
        const { clsPrefix: r } = e
        return v(
          Fc,
          {
            clsPrefix: r,
            class: `${r}-base-suffix`,
            strokeWidth: 24,
            scale: 0.85,
            show: e.loading,
          },
          {
            default: () =>
              e.showArrow
                ? v(
                    Er,
                    {
                      clsPrefix: r,
                      show: e.showClear,
                      onClear: e.onClear,
                    },
                    {
                      placeholder: () =>
                        v(
                          kt,
                          {
                            clsPrefix: r,
                            class: `${r}-base-suffix__arrow`,
                          },
                          {
                            default: () => at(t.default, () => [v(_c, null)]),
                          },
                        ),
                    },
                  )
                : null,
          },
        )
      }
    },
  }),
  Yc = Or && 'chrome' in window
Or && navigator.userAgent.includes('Firefox')
const qc = Or && navigator.userAgent.includes('Safari') && !Yc,
  Kc = {
    paddingTiny: '0 8px',
    paddingSmall: '0 10px',
    paddingMedium: '0 12px',
    paddingLarge: '0 14px',
    clearSize: '16px',
  },
  Gc = (e) => {
    const {
      textColor2: t,
      textColor3: r,
      textColorDisabled: n,
      primaryColor: o,
      primaryColorHover: i,
      inputColor: l,
      inputColorDisabled: s,
      borderColor: u,
      warningColor: c,
      warningColorHover: f,
      errorColor: g,
      errorColorHover: $,
      borderRadius: O,
      lineHeight: p,
      fontSizeTiny: M,
      fontSizeSmall: R,
      fontSizeMedium: P,
      fontSizeLarge: z,
      heightTiny: N,
      heightSmall: U,
      heightMedium: X,
      heightLarge: L,
      actionColor: b,
      clearColor: m,
      clearColorHover: x,
      clearColorPressed: _,
      placeholderColor: F,
      placeholderColorDisabled: Y,
      iconColor: Z,
      iconColorDisabled: K,
      iconColorHover: G,
      iconColorPressed: Q,
    } = e
    return Object.assign(Object.assign({}, Kc), {
      countTextColorDisabled: n,
      countTextColor: r,
      heightTiny: N,
      heightSmall: U,
      heightMedium: X,
      heightLarge: L,
      fontSizeTiny: M,
      fontSizeSmall: R,
      fontSizeMedium: P,
      fontSizeLarge: z,
      lineHeight: p,
      lineHeightTextarea: p,
      borderRadius: O,
      iconSize: '16px',
      groupLabelColor: b,
      groupLabelTextColor: t,
      textColor: t,
      textColorDisabled: n,
      textDecorationColor: t,
      caretColor: o,
      placeholderColor: F,
      placeholderColorDisabled: Y,
      color: l,
      colorDisabled: s,
      colorFocus: l,
      groupLabelBorder: `1px solid ${u}`,
      border: `1px solid ${u}`,
      borderHover: `1px solid ${i}`,
      borderDisabled: `1px solid ${u}`,
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 0 2px ${cr(o, {
        alpha: 0.2,
      })}`,
      loadingColor: o,
      // warning
      loadingColorWarning: c,
      borderWarning: `1px solid ${c}`,
      borderHoverWarning: `1px solid ${f}`,
      colorFocusWarning: l,
      borderFocusWarning: `1px solid ${f}`,
      boxShadowFocusWarning: `0 0 0 2px ${cr(c, {
        alpha: 0.2,
      })}`,
      caretColorWarning: c,
      // error
      loadingColorError: g,
      borderError: `1px solid ${g}`,
      borderHoverError: `1px solid ${$}`,
      colorFocusError: l,
      borderFocusError: `1px solid ${$}`,
      boxShadowFocusError: `0 0 0 2px ${cr(g, {
        alpha: 0.2,
      })}`,
      caretColorError: g,
      clearColor: m,
      clearColorHover: x,
      clearColorPressed: _,
      iconColor: Z,
      iconColorDisabled: K,
      iconColorHover: G,
      iconColorPressed: Q,
      suffixTextColor: t,
    })
  },
  Jc = {
    name: 'Input',
    common: wo,
    self: Gc,
  },
  xo = 'n-input'
function Zc(e) {
  let t = 0
  for (const r of e) t++
  return t
}
function Ot(e) {
  return e === '' || e == null
}
function Qc(e) {
  const t = B(null)
  function r() {
    const { value: i } = e
    if (!(i != null && i.focus)) {
      o()
      return
    }
    const { selectionStart: l, selectionEnd: s, value: u } = i
    if (l == null || s == null) {
      o()
      return
    }
    t.value = {
      start: l,
      end: s,
      beforeText: u.slice(0, l),
      afterText: u.slice(s),
    }
  }
  function n() {
    var i
    const { value: l } = t,
      { value: s } = e
    if (!l || !s) return
    const { value: u } = s,
      { start: c, beforeText: f, afterText: g } = l
    let $ = u.length
    if (u.endsWith(g)) $ = u.length - g.length
    else if (u.startsWith(f)) $ = f.length
    else {
      const O = f[c - 1],
        p = u.indexOf(O, c - 1)
      p !== -1 && ($ = p + 1)
    }
    ;(i = s.setSelectionRange) === null || i === void 0 || i.call(s, $, $)
  }
  function o() {
    t.value = null
  }
  return (
    ut(e, o),
    {
      recordCursor: r,
      restoreCursor: n,
    }
  )
}
const $n = le({
    name: 'InputWordCount',
    setup(e, { slots: t }) {
      const {
          mergedValueRef: r,
          maxlengthRef: n,
          mergedClsPrefixRef: o,
          countGraphemesRef: i,
        } =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          be(xo),
        l = A(() => {
          const { value: s } = r
          return s === null || Array.isArray(s) ? 0 : (i.value || Zc)(s)
        })
      return () => {
        const { value: s } = n,
          { value: u } = r
        return v(
          'span',
          {
            class: `${o.value}-input-word-count`,
          },
          zi(
            t.default,
            {
              value: u === null || Array.isArray(u) ? '' : u,
            },
            () => [s === void 0 ? l.value : `${l.value} / ${s}`],
          ),
        )
      }
    },
  }),
  ed = W(
    'input',
    `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`,
    [
      // common
      T(
        'input, textarea',
        `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `,
      ),
      T(
        'input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder',
        `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `,
      ),
      T(
        'input-el, textarea-el',
        `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,
        [
          E(
            '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
            `
 width: 0;
 height: 0;
 display: none;
 `,
          ),
          E(
            '&::placeholder',
            `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `,
          ),
          E('&:-webkit-autofill ~', [T('placeholder', 'display: none;')]),
        ],
      ),
      ae('round', [
        tt('textarea', 'border-radius: calc(var(--n-height) / 2);'),
      ]),
      T(
        'placeholder',
        `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,
        [
          E(
            'span',
            `
 width: 100%;
 display: inline-block;
 `,
          ),
        ],
      ),
      ae('textarea', [T('placeholder', 'overflow: visible;')]),
      tt('autosize', 'width: 100%;'),
      ae('autosize', [
        T(
          'textarea-el, input-el',
          `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `,
        ),
      ]),
      // input
      W(
        'input-wrapper',
        `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `,
      ),
      T(
        'input-mirror',
        `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `,
      ),
      T(
        'input-el',
        `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,
        [
          E('&[type=password]::-ms-reveal', 'display: none;'),
          E('+', [
            T(
              'placeholder',
              `
 display: flex;
 align-items: center; 
 `,
            ),
          ]),
        ],
      ),
      tt('textarea', [T('placeholder', 'white-space: nowrap;')]),
      T(
        'eye',
        `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `,
      ),
      // textarea
      ae('textarea', 'width: 100%;', [
        W(
          'input-word-count',
          `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `,
        ),
        ae('resizable', [
          W(
            'input-wrapper',
            `
 resize: vertical;
 min-height: var(--n-height);
 `,
          ),
        ]),
        T(
          'textarea-el, textarea-mirror, placeholder',
          `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `,
        ),
        T(
          'textarea-mirror',
          `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `,
        ),
      ]),
      // pair
      ae('pair', [
        T('input-el, placeholder', 'text-align: center;'),
        T(
          'separator',
          `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,
          [
            W(
              'icon',
              `
 color: var(--n-icon-color);
 `,
            ),
            W(
              'base-icon',
              `
 color: var(--n-icon-color);
 `,
            ),
          ],
        ),
      ]),
      ae(
        'disabled',
        `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,
        [
          T('border', 'border: var(--n-border-disabled);'),
          T(
            'input-el, textarea-el',
            `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `,
          ),
          T('placeholder', 'color: var(--n-placeholder-color-disabled);'),
          T('separator', 'color: var(--n-text-color-disabled);', [
            W(
              'icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
            W(
              'base-icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
          ]),
          W(
            'input-word-count',
            `
 color: var(--n-count-text-color-disabled);
 `,
          ),
          T('suffix, prefix', 'color: var(--n-text-color-disabled);', [
            W(
              'icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
            W(
              'internal-icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
          ]),
        ],
      ),
      tt('disabled', [
        T(
          'eye',
          `
 color: var(--n-icon-color);
 cursor: pointer;
 `,
          [
            E(
              '&:hover',
              `
 color: var(--n-icon-color-hover);
 `,
            ),
            E(
              '&:active',
              `
 color: var(--n-icon-color-pressed);
 `,
            ),
          ],
        ),
        E('&:hover', [T('state-border', 'border: var(--n-border-hover);')]),
        ae('focus', 'background-color: var(--n-color-focus);', [
          T(
            'state-border',
            `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `,
          ),
        ]),
      ]),
      T(
        'border, state-border',
        `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,
      ),
      T(
        'state-border',
        `
 border-color: #0000;
 z-index: 1;
 `,
      ),
      T('prefix', 'margin-right: 4px;'),
      T(
        'suffix',
        `
 margin-left: 4px;
 `,
      ),
      T(
        'suffix, prefix',
        `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `,
        [
          W(
            'base-loading',
            `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `,
          ),
          W(
            'base-clear',
            `
 font-size: var(--n-icon-size);
 `,
            [
              T('placeholder', [
                W(
                  'base-icon',
                  `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `,
                ),
              ]),
            ],
          ),
          E('>', [
            W(
              'icon',
              `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `,
            ),
          ]),
          W(
            'base-icon',
            `
 font-size: var(--n-icon-size);
 `,
          ),
        ],
      ),
      W(
        'input-word-count',
        `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `,
      ),
      ['warning', 'error'].map((e) =>
        ae(`${e}-status`, [
          tt('disabled', [
            W(
              'base-loading',
              `
 color: var(--n-loading-color-${e})
 `,
            ),
            T(
              'input-el, textarea-el',
              `
 caret-color: var(--n-caret-color-${e});
 `,
            ),
            T(
              'state-border',
              `
 border: var(--n-border-${e});
 `,
            ),
            E('&:hover', [
              T(
                'state-border',
                `
 border: var(--n-border-hover-${e});
 `,
              ),
            ]),
            E(
              '&:focus',
              `
 background-color: var(--n-color-focus-${e});
 `,
              [
                T(
                  'state-border',
                  `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `,
                ),
              ],
            ),
            ae(
              'focus',
              `
 background-color: var(--n-color-focus-${e});
 `,
              [
                T(
                  'state-border',
                  `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `,
                ),
              ],
            ),
          ]),
        ]),
      ),
    ],
  ),
  td = W('input', [
    ae('disabled', [
      T(
        'input-el, textarea-el',
        `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `,
      ),
    ]),
  ]),
  rd = Object.assign(Object.assign({}, gt.props), {
    bordered: {
      type: Boolean,
      default: void 0,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: [Array, String],
    defaultValue: {
      type: [String, Array],
      default: null,
    },
    value: [String, Array],
    disabled: {
      type: Boolean,
      default: void 0,
    },
    size: String,
    rows: {
      type: [Number, String],
      default: 3,
    },
    round: Boolean,
    minlength: [String, Number],
    maxlength: [String, Number],
    clearable: Boolean,
    autosize: {
      type: [Boolean, Object],
      default: !1,
    },
    pair: Boolean,
    separator: String,
    readonly: {
      type: [String, Boolean],
      default: !1,
    },
    passivelyActivated: Boolean,
    showPasswordOn: String,
    stateful: {
      type: Boolean,
      default: !0,
    },
    autofocus: Boolean,
    inputProps: Object,
    resizable: {
      type: Boolean,
      default: !0,
    },
    showCount: Boolean,
    loading: {
      type: Boolean,
      default: void 0,
    },
    allowInput: Function,
    renderCount: Function,
    onMousedown: Function,
    onKeydown: Function,
    onKeyup: [Function, Array],
    onInput: [Function, Array],
    onFocus: [Function, Array],
    onBlur: [Function, Array],
    onClick: [Function, Array],
    onChange: [Function, Array],
    onClear: [Function, Array],
    countGraphemes: Function,
    status: String,
    'onUpdate:value': [Function, Array],
    onUpdateValue: [Function, Array],
    /** private */
    textDecoration: [String, Array],
    attrSize: {
      type: Number,
      default: 20,
    },
    onInputBlur: [Function, Array],
    onInputFocus: [Function, Array],
    onDeactivate: [Function, Array],
    onActivate: [Function, Array],
    onWrapperFocus: [Function, Array],
    onWrapperBlur: [Function, Array],
    internalDeactivateOnEnter: Boolean,
    internalForceFocus: Boolean,
    internalLoadingBeforeSuffix: {
      type: Boolean,
      default: !0,
    },
    /** deprecated */
    showPasswordToggle: Boolean,
  }),
  id = le({
    name: 'Input',
    props: rd,
    setup(e) {
      const {
          mergedClsPrefixRef: t,
          mergedBorderedRef: r,
          inlineThemeDisabled: n,
          mergedRtlRef: o,
        } = po(e),
        i = gt('Input', '-input', ed, Jc, e, t)
      qc && qt('-input-safari', td, t)
      const l = B(null),
        s = B(null),
        u = B(null),
        c = B(null),
        f = B(null),
        g = B(null),
        $ = B(null),
        O = Qc($),
        p = B(null),
        { localeRef: M } = Rc('Input'),
        R = B(e.defaultValue),
        P = dt(e, 'value'),
        z = oa(P, R),
        N = Fa(e),
        { mergedSizeRef: U, mergedDisabledRef: X, mergedStatusRef: L } = N,
        b = B(!1),
        m = B(!1),
        x = B(!1),
        _ = B(!1)
      let F = null
      const Y = A(() => {
          const { placeholder: a, pair: d } = e
          return d
            ? Array.isArray(a)
              ? a
              : a === void 0
                ? ['', '']
                : [a, a]
            : a === void 0
              ? [M.value.placeholder]
              : [a]
        }),
        Z = A(() => {
          const { value: a } = x,
            { value: d } = z,
            { value: C } = Y
          return !a && (Ot(d) || (Array.isArray(d) && Ot(d[0]))) && C[0]
        }),
        K = A(() => {
          const { value: a } = x,
            { value: d } = z,
            { value: C } = Y
          return !a && C[1] && (Ot(d) || (Array.isArray(d) && Ot(d[1])))
        }),
        G = Gr(() => e.internalForceFocus || b.value),
        Q = Gr(() => {
          if (X.value || e.readonly || !e.clearable || (!G.value && !m.value))
            return !1
          const { value: a } = z,
            { value: d } = G
          return e.pair
            ? !!(Array.isArray(a) && (a[0] || a[1])) && (m.value || d)
            : !!a && (m.value || d)
        }),
        se = A(() => {
          const { showPasswordOn: a } = e
          if (a) return a
          if (e.showPasswordToggle) return 'click'
        }),
        ee = B(!1),
        ce = A(() => {
          const { textDecoration: a } = e
          return a
            ? Array.isArray(a)
              ? a.map((d) => ({
                  textDecoration: d,
                }))
              : [
                  {
                    textDecoration: a,
                  },
                ]
            : ['', '']
        }),
        de = B(void 0),
        fe = () => {
          var a, d
          if (e.type === 'textarea') {
            const { autosize: C } = e
            if (
              (C &&
                (de.value =
                  (d =
                    (a = p.value) === null || a === void 0 ? void 0 : a.$el) ===
                    null || d === void 0
                    ? void 0
                    : d.offsetWidth),
              !s.value || typeof C == 'boolean')
            )
              return
            const {
                paddingTop: k,
                paddingBottom: V,
                lineHeight: H,
              } = window.getComputedStyle(s.value),
              Se = Number(k.slice(0, -2)),
              Te = Number(V.slice(0, -2)),
              Re = Number(H.slice(0, -2)),
              { value: Qe } = u
            if (!Qe) return
            if (C.minRows) {
              const et = Math.max(C.minRows, 1),
                sr = `${Se + Te + Re * et}px`
              Qe.style.minHeight = sr
            }
            if (C.maxRows) {
              const et = `${Se + Te + Re * C.maxRows}px`
              Qe.style.maxHeight = et
            }
          }
        },
        Fe = A(() => {
          const { maxlength: a } = e
          return a === void 0 ? void 0 : Number(a)
        })
      Wt(() => {
        const { value: a } = z
        Array.isArray(a) || oe(a)
      })
      const bt = Pn().proxy
      function De(a, d) {
        const { onUpdateValue: C, 'onUpdate:value': k, onInput: V } = e,
          { nTriggerFormInput: H } = N
        C && J(C, a, d), k && J(k, a, d), V && J(V, a, d), (R.value = a), H()
      }
      function He(a, d) {
        const { onChange: C } = e,
          { nTriggerFormChange: k } = N
        C && J(C, a, d), (R.value = a), k()
      }
      function ve(a) {
        const { onBlur: d } = e,
          { nTriggerFormBlur: C } = N
        d && J(d, a), C()
      }
      function Kt(a) {
        const { onFocus: d } = e,
          { nTriggerFormFocus: C } = N
        d && J(d, a), C()
      }
      function mt(a) {
        const { onClear: d } = e
        d && J(d, a)
      }
      function Gt(a) {
        const { onInputBlur: d } = e
        d && J(d, a)
      }
      function Jt(a) {
        const { onInputFocus: d } = e
        d && J(d, a)
      }
      function yt() {
        const { onDeactivate: a } = e
        a && J(a)
      }
      function Zt() {
        const { onActivate: a } = e
        a && J(a)
      }
      function ye(a) {
        const { onClick: d } = e
        d && J(d, a)
      }
      function Qt(a) {
        const { onWrapperFocus: d } = e
        d && J(d, a)
      }
      function er(a) {
        const { onWrapperBlur: d } = e
        d && J(d, a)
      }
      function Ke() {
        x.value = !0
      }
      function tr(a) {
        ;(x.value = !1), a.target === g.value ? Ie(a, 1) : Ie(a, 0)
      }
      function Ie(a, d = 0, C = 'input') {
        const k = a.target.value
        if (
          (oe(k),
          a instanceof InputEvent && !a.isComposing && (x.value = !1),
          e.type === 'textarea')
        ) {
          const { value: H } = p
          H && H.syncUnifiedContainer()
        }
        if (((F = k), x.value)) return
        O.recordCursor()
        const V = rr(k)
        if (V)
          if (!e.pair)
            C === 'input'
              ? De(k, {
                  source: d,
                })
              : He(k, {
                  source: d,
                })
          else {
            let { value: H } = z
            Array.isArray(H) ? (H = [H[0], H[1]]) : (H = ['', '']),
              (H[d] = k),
              C === 'input'
                ? De(H, {
                    source: d,
                  })
                : He(H, {
                    source: d,
                  })
          }
        bt.$forceUpdate(), V || Nr(O.restoreCursor)
      }
      function rr(a) {
        const { countGraphemes: d, maxlength: C, minlength: k } = e
        if (d) {
          let H
          if (
            (C !== void 0 && (H === void 0 && (H = d(a)), H > Number(C))) ||
            (k !== void 0 && (H === void 0 && (H = d(a)), H < Number(C)))
          )
            return !1
        }
        const { allowInput: V } = e
        return typeof V == 'function' ? V(a) : !0
      }
      function nr(a) {
        Gt(a),
          a.relatedTarget === l.value && yt(),
          (a.relatedTarget !== null &&
            (a.relatedTarget === f.value ||
              a.relatedTarget === g.value ||
              a.relatedTarget === s.value)) ||
            (_.value = !1),
          xe(a, 'blur'),
          ($.value = null)
      }
      function or(a, d) {
        Jt(a),
          (b.value = !0),
          (_.value = !0),
          Zt(),
          xe(a, 'focus'),
          d === 0
            ? ($.value = f.value)
            : d === 1
              ? ($.value = g.value)
              : d === 2 && ($.value = s.value)
      }
      function wt(a) {
        e.passivelyActivated && (er(a), xe(a, 'blur'))
      }
      function ir(a) {
        e.passivelyActivated && ((b.value = !0), Qt(a), xe(a, 'focus'))
      }
      function xe(a, d) {
        ;(a.relatedTarget !== null &&
          (a.relatedTarget === f.value ||
            a.relatedTarget === g.value ||
            a.relatedTarget === s.value ||
            a.relatedTarget === l.value)) ||
          (d === 'focus'
            ? (Kt(a), (b.value = !0))
            : d === 'blur' && (ve(a), (b.value = !1)))
      }
      function pe(a, d) {
        Ie(a, d, 'change')
      }
      function xt(a) {
        ye(a)
      }
      function ar(a) {
        mt(a), Ge()
      }
      function Ge() {
        e.pair
          ? (De(['', ''], {
              source: 'clear',
            }),
            He(['', ''], {
              source: 'clear',
            }))
          : (De('', {
              source: 'clear',
            }),
            He('', {
              source: 'clear',
            }))
      }
      function Ct(a) {
        const { onMousedown: d } = e
        d && d(a)
        const { tagName: C } = a.target
        if (C !== 'INPUT' && C !== 'TEXTAREA') {
          if (e.resizable) {
            const { value: k } = l
            if (k) {
              const {
                  left: V,
                  top: H,
                  width: Se,
                  height: Te,
                } = k.getBoundingClientRect(),
                Re = 14
              if (
                V + Se - Re < a.clientX &&
                a.clientX < V + Se &&
                H + Te - Re < a.clientY &&
                a.clientY < H + Te
              )
                return
            }
          }
          a.preventDefault(), b.value || S()
        }
      }
      function lr() {
        var a
        ;(m.value = !0),
          e.type === 'textarea' &&
            ((a = p.value) === null ||
              a === void 0 ||
              a.handleMouseEnterWrapper())
      }
      function Je() {
        var a
        ;(m.value = !1),
          e.type === 'textarea' &&
            ((a = p.value) === null ||
              a === void 0 ||
              a.handleMouseLeaveWrapper())
      }
      function Ze() {
        X.value || (se.value === 'click' && (ee.value = !ee.value))
      }
      function St(a) {
        if (X.value) return
        a.preventDefault()
        const d = (k) => {
          k.preventDefault(), ge('mouseup', document, d)
        }
        if ((_e('mouseup', document, d), se.value !== 'mousedown')) return
        ee.value = !0
        const C = () => {
          ;(ee.value = !1), ge('mouseup', document, C)
        }
        _e('mouseup', document, C)
      }
      function we(a) {
        e.onKeyup && J(e.onKeyup, a)
      }
      function Wr(a) {
        switch ((e.onKeydown && J(e.onKeydown, a), a.key)) {
          case 'Escape':
            y()
            break
          case 'Enter':
            h(a)
            break
        }
      }
      function h(a) {
        var d, C
        if (e.passivelyActivated) {
          const { value: k } = _
          if (k) {
            e.internalDeactivateOnEnter && y()
            return
          }
          a.preventDefault(),
            e.type === 'textarea'
              ? (d = s.value) === null || d === void 0 || d.focus()
              : (C = f.value) === null || C === void 0 || C.focus()
        }
      }
      function y() {
        e.passivelyActivated &&
          ((_.value = !1),
          Nr(() => {
            var a
            ;(a = l.value) === null || a === void 0 || a.focus()
          }))
      }
      function S() {
        var a, d, C
        X.value ||
          (e.passivelyActivated
            ? (a = l.value) === null || a === void 0 || a.focus()
            : ((d = s.value) === null || d === void 0 || d.focus(),
              (C = f.value) === null || C === void 0 || C.focus()))
      }
      function D() {
        var a
        !((a = l.value) === null || a === void 0) &&
          a.contains(document.activeElement) &&
          document.activeElement.blur()
      }
      function q() {
        var a, d
        ;(a = s.value) === null || a === void 0 || a.select(),
          (d = f.value) === null || d === void 0 || d.select()
      }
      function te() {
        X.value || (s.value ? s.value.focus() : f.value && f.value.focus())
      }
      function ue() {
        const { value: a } = l
        a != null &&
          a.contains(document.activeElement) &&
          a !== document.activeElement &&
          y()
      }
      function I(a) {
        if (e.type === 'textarea') {
          const { value: d } = s
          d == null || d.scrollTo(a)
        } else {
          const { value: d } = f
          d == null || d.scrollTo(a)
        }
      }
      function oe(a) {
        const { type: d, pair: C, autosize: k } = e
        if (!C && k)
          if (d === 'textarea') {
            const { value: V } = u
            V &&
              (V.textContent =
                (a ?? '') +
                `\r
`)
          } else {
            const { value: V } = c
            V && (a ? (V.textContent = a) : (V.innerHTML = '&nbsp;'))
          }
      }
      function Ce() {
        fe()
      }
      const jr = B({
        top: '0',
      })
      function Co(a) {
        var d
        const { scrollTop: C } = a.target
        ;(jr.value.top = `${-C}px`),
          (d = p.value) === null || d === void 0 || d.syncUnifiedContainer()
      }
      let Tt = null
      ct(() => {
        const { autosize: a, type: d } = e
        a && d === 'textarea'
          ? (Tt = ut(z, (C) => {
              !Array.isArray(C) && C !== F && oe(C)
            }))
          : Tt == null || Tt()
      })
      let Rt = null
      ct(() => {
        e.type === 'textarea'
          ? (Rt = ut(z, (a) => {
              var d
              !Array.isArray(a) &&
                a !== F &&
                ((d = p.value) === null ||
                  d === void 0 ||
                  d.syncUnifiedContainer())
            }))
          : Rt == null || Rt()
      }),
        zn(xo, {
          mergedValueRef: z,
          maxlengthRef: Fe,
          mergedClsPrefixRef: t,
          countGraphemesRef: dt(e, 'countGraphemes'),
        })
      const So = {
          wrapperElRef: l,
          inputElRef: f,
          textareaElRef: s,
          isCompositing: x,
          clear: Ge,
          focus: S,
          blur: D,
          select: q,
          deactivate: ue,
          activate: te,
          scrollTo: I,
        },
        To = bo('Input', o, t),
        Lr = A(() => {
          const { value: a } = U,
            {
              common: { cubicBezierEaseInOut: d },
              self: {
                color: C,
                borderRadius: k,
                textColor: V,
                caretColor: H,
                caretColorError: Se,
                caretColorWarning: Te,
                textDecorationColor: Re,
                border: Qe,
                borderDisabled: et,
                borderHover: sr,
                borderFocus: Ro,
                placeholderColor: $o,
                placeholderColorDisabled: Po,
                lineHeightTextarea: zo,
                colorDisabled: _o,
                colorFocus: Eo,
                textColorDisabled: Mo,
                boxShadowFocus: Bo,
                iconSize: Ao,
                colorFocusWarning: Oo,
                boxShadowFocusWarning: Fo,
                borderWarning: Do,
                borderFocusWarning: Ho,
                borderHoverWarning: Io,
                colorFocusError: ko,
                boxShadowFocusError: Wo,
                borderError: jo,
                borderFocusError: Lo,
                borderHoverError: No,
                clearSize: Vo,
                clearColor: Uo,
                clearColorHover: Xo,
                clearColorPressed: Yo,
                iconColor: qo,
                iconColorDisabled: Ko,
                suffixTextColor: Go,
                countTextColor: Jo,
                countTextColorDisabled: Zo,
                iconColorHover: Qo,
                iconColorPressed: ei,
                loadingColor: ti,
                loadingColorError: ri,
                loadingColorWarning: ni,
                [dr('padding', a)]: oi,
                [dr('fontSize', a)]: ii,
                [dr('height', a)]: ai,
              },
            } = i.value,
            { left: li, right: si } = _n(oi)
          return {
            '--n-bezier': d,
            '--n-count-text-color': Jo,
            '--n-count-text-color-disabled': Zo,
            '--n-color': C,
            '--n-font-size': ii,
            '--n-border-radius': k,
            '--n-height': ai,
            '--n-padding-left': li,
            '--n-padding-right': si,
            '--n-text-color': V,
            '--n-caret-color': H,
            '--n-text-decoration-color': Re,
            '--n-border': Qe,
            '--n-border-disabled': et,
            '--n-border-hover': sr,
            '--n-border-focus': Ro,
            '--n-placeholder-color': $o,
            '--n-placeholder-color-disabled': Po,
            '--n-icon-size': Ao,
            '--n-line-height-textarea': zo,
            '--n-color-disabled': _o,
            '--n-color-focus': Eo,
            '--n-text-color-disabled': Mo,
            '--n-box-shadow-focus': Bo,
            '--n-loading-color': ti,
            // form warning
            '--n-caret-color-warning': Te,
            '--n-color-focus-warning': Oo,
            '--n-box-shadow-focus-warning': Fo,
            '--n-border-warning': Do,
            '--n-border-focus-warning': Ho,
            '--n-border-hover-warning': Io,
            '--n-loading-color-warning': ni,
            // form error
            '--n-caret-color-error': Se,
            '--n-color-focus-error': ko,
            '--n-box-shadow-focus-error': Wo,
            '--n-border-error': jo,
            '--n-border-focus-error': Lo,
            '--n-border-hover-error': No,
            '--n-loading-color-error': ri,
            // clear-button
            '--n-clear-color': Uo,
            '--n-clear-size': Vo,
            '--n-clear-color-hover': Xo,
            '--n-clear-color-pressed': Yo,
            '--n-icon-color': qo,
            '--n-icon-color-hover': Qo,
            '--n-icon-color-pressed': ei,
            '--n-icon-color-disabled': Ko,
            '--n-suffix-text-color': Go,
          }
        }),
        ke = n
          ? go(
              'input',
              A(() => {
                const { value: a } = U
                return a[0]
              }),
              Lr,
              e,
            )
          : void 0
      return Object.assign(Object.assign({}, So), {
        // DOM ref
        wrapperElRef: l,
        inputElRef: f,
        inputMirrorElRef: c,
        inputEl2Ref: g,
        textareaElRef: s,
        textareaMirrorElRef: u,
        textareaScrollbarInstRef: p,
        // value
        rtlEnabled: To,
        uncontrolledValue: R,
        mergedValue: z,
        passwordVisible: ee,
        mergedPlaceholder: Y,
        showPlaceholder1: Z,
        showPlaceholder2: K,
        mergedFocus: G,
        isComposing: x,
        activated: _,
        showClearButton: Q,
        mergedSize: U,
        mergedDisabled: X,
        textDecorationStyle: ce,
        mergedClsPrefix: t,
        mergedBordered: r,
        mergedShowPasswordOn: se,
        placeholderStyle: jr,
        mergedStatus: L,
        textAreaScrollContainerWidth: de,
        // methods
        handleTextAreaScroll: Co,
        handleCompositionStart: Ke,
        handleCompositionEnd: tr,
        handleInput: Ie,
        handleInputBlur: nr,
        handleInputFocus: or,
        handleWrapperBlur: wt,
        handleWrapperFocus: ir,
        handleMouseEnter: lr,
        handleMouseLeave: Je,
        handleMouseDown: Ct,
        handleChange: pe,
        handleClick: xt,
        handleClear: ar,
        handlePasswordToggleClick: Ze,
        handlePasswordToggleMousedown: St,
        handleWrapperKeydown: Wr,
        handleWrapperKeyup: we,
        handleTextAreaMirrorResize: Ce,
        getTextareaScrollContainer: () => s.value,
        mergedTheme: i,
        cssVars: n ? void 0 : Lr,
        themeClass: ke == null ? void 0 : ke.themeClass,
        onRender: ke == null ? void 0 : ke.onRender,
      })
    },
    render() {
      var e, t
      const {
          mergedClsPrefix: r,
          mergedStatus: n,
          themeClass: o,
          type: i,
          countGraphemes: l,
          onRender: s,
        } = this,
        u = this.$slots
      return (
        s == null || s(),
        v(
          'div',
          {
            ref: 'wrapperElRef',
            class: [
              `${r}-input`,
              o,
              n && `${r}-input--${n}-status`,
              {
                [`${r}-input--rtl`]: this.rtlEnabled,
                [`${r}-input--disabled`]: this.mergedDisabled,
                [`${r}-input--textarea`]: i === 'textarea',
                [`${r}-input--resizable`]: this.resizable && !this.autosize,
                [`${r}-input--autosize`]: this.autosize,
                [`${r}-input--round`]: this.round && i !== 'textarea',
                [`${r}-input--pair`]: this.pair,
                [`${r}-input--focus`]: this.mergedFocus,
                [`${r}-input--stateful`]: this.stateful,
              },
            ],
            style: this.cssVars,
            tabindex:
              !this.mergedDisabled && this.passivelyActivated && !this.activated
                ? 0
                : void 0,
            onFocus: this.handleWrapperFocus,
            onBlur: this.handleWrapperBlur,
            onClick: this.handleClick,
            onMousedown: this.handleMouseDown,
            onMouseenter: this.handleMouseEnter,
            onMouseleave: this.handleMouseLeave,
            onCompositionstart: this.handleCompositionStart,
            onCompositionend: this.handleCompositionEnd,
            onKeyup: this.handleWrapperKeyup,
            onKeydown: this.handleWrapperKeydown,
          },
          v(
            'div',
            {
              class: `${r}-input-wrapper`,
            },
            Pt(
              u.prefix,
              (c) =>
                c &&
                v(
                  'div',
                  {
                    class: `${r}-input__prefix`,
                  },
                  c,
                ),
            ),
            i === 'textarea'
              ? v(
                  Vc,
                  {
                    ref: 'textareaScrollbarInstRef',
                    class: `${r}-input__textarea`,
                    container: this.getTextareaScrollContainer,
                    triggerDisplayManually: !0,
                    useUnifiedContainer: !0,
                    internalHoistYRail: !0,
                  },
                  {
                    default: () => {
                      var c, f
                      const { textAreaScrollContainerWidth: g } = this,
                        $ = {
                          width: this.autosize && g && `${g}px`,
                        }
                      return v(
                        Mr,
                        null,
                        v(
                          'textarea',
                          Object.assign({}, this.inputProps, {
                            ref: 'textareaElRef',
                            class: [
                              `${r}-input__textarea-el`,
                              (c = this.inputProps) === null || c === void 0
                                ? void 0
                                : c.class,
                            ],
                            autofocus: this.autofocus,
                            rows: Number(this.rows),
                            placeholder: this.placeholder,
                            value: this.mergedValue,
                            disabled: this.mergedDisabled,
                            maxlength: l ? void 0 : this.maxlength,
                            minlength: l ? void 0 : this.minlength,
                            readonly: this.readonly,
                            tabindex:
                              this.passivelyActivated && !this.activated
                                ? -1
                                : void 0,
                            style: [
                              this.textDecorationStyle[0],
                              (f = this.inputProps) === null || f === void 0
                                ? void 0
                                : f.style,
                              $,
                            ],
                            onBlur: this.handleInputBlur,
                            onFocus: (O) => {
                              this.handleInputFocus(O, 2)
                            },
                            onInput: this.handleInput,
                            onChange: this.handleChange,
                            onScroll: this.handleTextAreaScroll,
                          }),
                        ),
                        this.showPlaceholder1
                          ? v(
                              'div',
                              {
                                class: `${r}-input__placeholder`,
                                style: [this.placeholderStyle, $],
                                key: 'placeholder',
                              },
                              this.mergedPlaceholder[0],
                            )
                          : null,
                        this.autosize
                          ? v(
                              Sr,
                              {
                                onResize: this.handleTextAreaMirrorResize,
                              },
                              {
                                default: () =>
                                  v('div', {
                                    ref: 'textareaMirrorElRef',
                                    class: `${r}-input__textarea-mirror`,
                                    key: 'mirror',
                                  }),
                              },
                            )
                          : null,
                      )
                    },
                  },
                )
              : v(
                  'div',
                  {
                    class: `${r}-input__input`,
                  },
                  v(
                    'input',
                    Object.assign(
                      {
                        type:
                          i === 'password' &&
                          this.mergedShowPasswordOn &&
                          this.passwordVisible
                            ? 'text'
                            : i,
                      },
                      this.inputProps,
                      {
                        ref: 'inputElRef',
                        class: [
                          `${r}-input__input-el`,
                          (e = this.inputProps) === null || e === void 0
                            ? void 0
                            : e.class,
                        ],
                        style: [
                          this.textDecorationStyle[0],
                          (t = this.inputProps) === null || t === void 0
                            ? void 0
                            : t.style,
                        ],
                        tabindex:
                          this.passivelyActivated && !this.activated
                            ? -1
                            : void 0,
                        placeholder: this.mergedPlaceholder[0],
                        disabled: this.mergedDisabled,
                        maxlength: l ? void 0 : this.maxlength,
                        minlength: l ? void 0 : this.minlength,
                        value: Array.isArray(this.mergedValue)
                          ? this.mergedValue[0]
                          : this.mergedValue,
                        readonly: this.readonly,
                        autofocus: this.autofocus,
                        size: this.attrSize,
                        onBlur: this.handleInputBlur,
                        onFocus: (c) => {
                          this.handleInputFocus(c, 0)
                        },
                        onInput: (c) => {
                          this.handleInput(c, 0)
                        },
                        onChange: (c) => {
                          this.handleChange(c, 0)
                        },
                      },
                    ),
                  ),
                  this.showPlaceholder1
                    ? v(
                        'div',
                        {
                          class: `${r}-input__placeholder`,
                        },
                        v('span', null, this.mergedPlaceholder[0]),
                      )
                    : null,
                  this.autosize
                    ? v(
                        'div',
                        {
                          class: `${r}-input__input-mirror`,
                          key: 'mirror',
                          ref: 'inputMirrorElRef',
                        },
                        ' ',
                      )
                    : null,
                ),
            !this.pair &&
              Pt(u.suffix, (c) =>
                c ||
                this.clearable ||
                this.showCount ||
                this.mergedShowPasswordOn ||
                this.loading !== void 0
                  ? v(
                      'div',
                      {
                        class: `${r}-input__suffix`,
                      },
                      [
                        Pt(
                          u['clear-icon-placeholder'],
                          (f) =>
                            (this.clearable || f) &&
                            v(
                              Er,
                              {
                                clsPrefix: r,
                                show: this.showClearButton,
                                onClear: this.handleClear,
                              },
                              {
                                placeholder: () => f,
                                icon: () => {
                                  var g, $
                                  return ($ = (g = this.$slots)[
                                    'clear-icon'
                                  ]) === null || $ === void 0
                                    ? void 0
                                    : $.call(g)
                                },
                              },
                            ),
                        ),
                        this.internalLoadingBeforeSuffix ? null : c,
                        this.loading !== void 0
                          ? v(Xc, {
                              clsPrefix: r,
                              loading: this.loading,
                              showArrow: !1,
                              showClear: !1,
                              style: this.cssVars,
                            })
                          : null,
                        this.internalLoadingBeforeSuffix ? c : null,
                        this.showCount && this.type !== 'textarea'
                          ? v($n, null, {
                              default: (f) => {
                                var g
                                return (g = u.count) === null || g === void 0
                                  ? void 0
                                  : g.call(u, f)
                              },
                            })
                          : null,
                        this.mergedShowPasswordOn && this.type === 'password'
                          ? v(
                              'div',
                              {
                                class: `${r}-input__eye`,
                                onMousedown: this.handlePasswordToggleMousedown,
                                onClick: this.handlePasswordToggleClick,
                              },
                              this.passwordVisible
                                ? at(u['password-visible-icon'], () => [
                                    v(
                                      kt,
                                      {
                                        clsPrefix: r,
                                      },
                                      {
                                        default: () => v(Pc, null),
                                      },
                                    ),
                                  ])
                                : at(u['password-invisible-icon'], () => [
                                    v(
                                      kt,
                                      {
                                        clsPrefix: r,
                                      },
                                      {
                                        default: () => v(zc, null),
                                      },
                                    ),
                                  ]),
                            )
                          : null,
                      ],
                    )
                  : null,
              ),
          ),
          this.pair
            ? v(
                'span',
                {
                  class: `${r}-input__separator`,
                },
                at(u.separator, () => [this.separator]),
              )
            : null,
          this.pair
            ? v(
                'div',
                {
                  class: `${r}-input-wrapper`,
                },
                v(
                  'div',
                  {
                    class: `${r}-input__input`,
                  },
                  v('input', {
                    ref: 'inputEl2Ref',
                    type: this.type,
                    class: `${r}-input__input-el`,
                    tabindex:
                      this.passivelyActivated && !this.activated ? -1 : void 0,
                    placeholder: this.mergedPlaceholder[1],
                    disabled: this.mergedDisabled,
                    maxlength: l ? void 0 : this.maxlength,
                    minlength: l ? void 0 : this.minlength,
                    value: Array.isArray(this.mergedValue)
                      ? this.mergedValue[1]
                      : void 0,
                    readonly: this.readonly,
                    style: this.textDecorationStyle[1],
                    onBlur: this.handleInputBlur,
                    onFocus: (c) => {
                      this.handleInputFocus(c, 1)
                    },
                    onInput: (c) => {
                      this.handleInput(c, 1)
                    },
                    onChange: (c) => {
                      this.handleChange(c, 1)
                    },
                  }),
                  this.showPlaceholder2
                    ? v(
                        'div',
                        {
                          class: `${r}-input__placeholder`,
                        },
                        v('span', null, this.mergedPlaceholder[1]),
                      )
                    : null,
                ),
                Pt(
                  u.suffix,
                  (c) =>
                    (this.clearable || c) &&
                    v(
                      'div',
                      {
                        class: `${r}-input__suffix`,
                      },
                      [
                        this.clearable &&
                          v(
                            Er,
                            {
                              clsPrefix: r,
                              show: this.showClearButton,
                              onClear: this.handleClear,
                            },
                            {
                              icon: () => {
                                var f
                                return (f = u['clear-icon']) === null ||
                                  f === void 0
                                  ? void 0
                                  : f.call(u)
                              },
                              placeholder: () => {
                                var f
                                return (f = u['clear-icon-placeholder']) ===
                                  null || f === void 0
                                  ? void 0
                                  : f.call(u)
                              },
                            },
                          ),
                        c,
                      ],
                    ),
                ),
              )
            : null,
          this.mergedBordered
            ? v('div', {
                class: `${r}-input__border`,
              })
            : null,
          this.mergedBordered
            ? v('div', {
                class: `${r}-input__state-border`,
              })
            : null,
          this.showCount && i === 'textarea'
            ? v($n, null, {
                default: (c) => {
                  var f
                  const { renderCount: g } = this
                  return g
                    ? g(c)
                    : (f = u.count) === null || f === void 0
                      ? void 0
                      : f.call(u, c)
                },
              })
            : null,
        )
      )
    },
  })
export { id as NInput }
//# sourceMappingURL=naive-esm.js.map
