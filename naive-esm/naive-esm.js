import {
  isVNode as xi,
  Comment as yi,
  Fragment as Wt,
  defineComponent as ce,
  computed as O,
  ref as W,
  watch as _r,
  onMounted as ct,
  readonly as wi,
  inject as me,
  getCurrentInstance as ko,
  onBeforeUnmount as ut,
  renderSlot as Ci,
  onActivated as Si,
  onDeactivated as Pi,
  provide as kt,
  onBeforeMount as jt,
  shallowRef as Ti,
  watchEffect as Or,
  h as b,
  Transition as ot,
  TransitionGroup as $i,
  toRef as ir,
  mergeProps as Ri,
  nextTick as zt,
  markRaw as to,
} from 'vue'
function zi(e) {
  return e.composedPath()[0] || null
}
function oo(e) {
  return typeof e == 'string'
    ? e.endsWith('px')
      ? Number(e.slice(0, e.length - 2))
      : Number(e)
    : e
}
function jo(e, r) {
  const t = e.trim().split(/\s+/g),
    o = {
      top: t[0],
    }
  switch (t.length) {
    case 1:
      ;(o.right = t[0]), (o.bottom = t[0]), (o.left = t[0])
      break
    case 2:
      ;(o.right = t[1]), (o.left = t[1]), (o.bottom = t[0])
      break
    case 3:
      ;(o.right = t[1]), (o.bottom = t[2]), (o.left = t[1])
      break
    case 4:
      ;(o.right = t[1]), (o.bottom = t[2]), (o.left = t[3])
      break
    default:
      throw new Error('[seemly/getMargin]:' + e + ' is not a valid value.')
  }
  return o
}
const no = {
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
  lr = '^\\s*',
  sr = '\\s*$',
  Ve = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*',
  Ge = '([0-9A-Fa-f])',
  Ue = '([0-9A-Fa-f]{2})',
  Ei = new RegExp(`${lr}rgb\\s*\\(${Ve},${Ve},${Ve}\\)${sr}`),
  Bi = new RegExp(`${lr}rgba\\s*\\(${Ve},${Ve},${Ve},${Ve}\\)${sr}`),
  _i = new RegExp(`${lr}#${Ge}${Ge}${Ge}${sr}`),
  Oi = new RegExp(`${lr}#${Ue}${Ue}${Ue}${sr}`),
  Mi = new RegExp(`${lr}#${Ge}${Ge}${Ge}${Ge}${sr}`),
  Hi = new RegExp(`${lr}#${Ue}${Ue}${Ue}${Ue}${sr}`)
function pe(e) {
  return parseInt(e, 16)
}
function Je(e) {
  try {
    let r
    if ((r = Oi.exec(e))) return [pe(r[1]), pe(r[2]), pe(r[3]), 1]
    if ((r = Ei.exec(e))) return [fe(r[1]), fe(r[5]), fe(r[9]), 1]
    if ((r = Bi.exec(e))) return [fe(r[1]), fe(r[5]), fe(r[9]), Rr(r[13])]
    if ((r = _i.exec(e)))
      return [pe(r[1] + r[1]), pe(r[2] + r[2]), pe(r[3] + r[3]), 1]
    if ((r = Hi.exec(e)))
      return [pe(r[1]), pe(r[2]), pe(r[3]), Rr(pe(r[4]) / 255)]
    if ((r = Mi.exec(e)))
      return [
        pe(r[1] + r[1]),
        pe(r[2] + r[2]),
        pe(r[3] + r[3]),
        Rr(pe(r[4] + r[4]) / 255),
      ]
    if (e in no) return Je(no[e])
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`)
  } catch (r) {
    throw r
  }
}
function Ai(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e
}
function Et(e, r, t, o) {
  return `rgba(${fe(e)}, ${fe(r)}, ${fe(t)}, ${Ai(o)})`
}
function wt(e, r, t, o, n) {
  return fe((e * r * (1 - o) + t * o) / n)
}
function Lt(e, r) {
  Array.isArray(e) || (e = Je(e)), Array.isArray(r) || (r = Je(r))
  const t = e[3],
    o = r[3],
    n = Rr(t + o - t * o)
  return Et(
    wt(e[0], t, r[0], o, n),
    wt(e[1], t, r[1], o, n),
    wt(e[2], t, r[2], o, n),
    n,
  )
}
function Xe(e, r) {
  const [t, o, n, i = 1] = Array.isArray(e) ? e : Je(e)
  return r.alpha ? Et(t, o, n, r.alpha) : Et(t, o, n, i)
}
function Xr(e, r) {
  const [t, o, n, i = 1] = Array.isArray(e) ? e : Je(e),
    { lightness: s = 1, alpha: a = 1 } = r
  return Di([t * s, o * s, n * s, i * a])
}
function Rr(e) {
  const r = Math.round(Number(e) * 100) / 100
  return r > 1 ? 1 : r < 0 ? 0 : r
}
function fe(e) {
  const r = Math.round(Number(e))
  return r > 255 ? 255 : r < 0 ? 0 : r
}
function Di(e) {
  const [r, t, o] = e
  return 3 in e
    ? `rgba(${fe(r)}, ${fe(t)}, ${fe(o)}, ${Rr(e[3])})`
    : `rgba(${fe(r)}, ${fe(t)}, ${fe(o)}, 1)`
}
function se(e, ...r) {
  if (Array.isArray(e)) e.forEach((t) => se(t, ...r))
  else return e(...r)
}
function Fi(e, r) {
  console.error(`[naive/${e}]: ${r}`)
}
function Ii(e, r) {
  throw new Error(`[naive/${e}]: ${r}`)
}
function Ir(e) {
  return e.some((r) =>
    xi(r) ? !(r.type === yi || (r.type === Wt && !Ir(r.children))) : !0,
  )
    ? e
    : null
}
function zr(e, r) {
  return (e && Ir(e())) || r()
}
function Wi(e, r, t) {
  return (e && Ir(e(r))) || t(r)
}
function or(e, r) {
  const t = e && Ir(e())
  return r(t || null)
}
function ki(e) {
  return !(e && Ir(e()))
}
const io = ce({
  render() {
    var e, r
    return (r = (e = this.$slots).default) === null || r === void 0
      ? void 0
      : r.call(e)
  },
})
function ao(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, '_')
}
function ji(e) {
  const { left: r, right: t, top: o, bottom: n } = jo(e)
  return `${o} ${t} ${n} ${r}`
}
function Li(e) {
  let r = 0
  for (let t = 0; t < e.length; ++t) e[t] === '&' && ++r
  return r
}
const Lo = /\s*,(?![^(]*\))\s*/g,
  Ni = /\s+/g
function Vi(e, r) {
  const t = []
  return (
    r.split(Lo).forEach((o) => {
      let n = Li(o)
      if (n) {
        if (n === 1) {
          e.forEach((s) => {
            t.push(o.replace('&', s))
          })
          return
        }
      } else {
        e.forEach((s) => {
          t.push(
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (s && s + ' ') + o,
          )
        })
        return
      }
      let i = [o]
      for (; n--; ) {
        const s = []
        i.forEach((a) => {
          e.forEach((d) => {
            s.push(a.replace('&', d))
          })
        }),
          (i = s)
      }
      i.forEach((s) => t.push(s))
    }),
    t
  )
}
function Gi(e, r) {
  const t = []
  return (
    r.split(Lo).forEach((o) => {
      e.forEach((n) => {
        t.push((n && n + ' ') + o)
      })
    }),
    t
  )
}
function Ui(e) {
  let r = ['']
  return (
    e.forEach((t) => {
      ;(t = t && t.trim()), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        t && (t.includes('&') ? (r = Vi(r, t)) : (r = Gi(r, t)))
    }),
    r.join(', ').replace(Ni, ' ')
  )
}
function lo(e) {
  if (!e) return
  const r = e.parentElement
  r && r.removeChild(e)
}
function dt(e, r) {
  return (r ?? document.head).querySelector(`style[cssr-id="${e}"]`)
}
function Xi(e) {
  const r = document.createElement('style')
  return r.setAttribute('cssr-id', e), r
}
function Yr(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1
}
const Yi = /[A-Z]/g
function No(e) {
  return e.replace(Yi, (r) => '-' + r.toLowerCase())
}
function qi(e, r = '  ') {
  return typeof e == 'object' && e !== null
    ? ` {
` +
        Object.entries(e).map((t) => r + `  ${No(t[0])}: ${t[1]};`).join(`
`) +
        `
` +
        r +
        '}'
    : `: ${e};`
}
function Ki(e, r, t) {
  return typeof e == 'function'
    ? e({
        context: r.context,
        props: t,
      })
    : e
}
function so(e, r, t, o) {
  if (!r) return ''
  const n = Ki(r, t, o)
  if (!n) return ''
  if (typeof n == 'string')
    return `${e} {
${n}
}`
  const i = Object.keys(n)
  if (i.length === 0)
    return t.config.keepEmptyBlock
      ? e +
          ` {
}`
      : ''
  const s = e ? [e + ' {'] : []
  return (
    i.forEach((a) => {
      const d = n[a]
      if (a === 'raw') {
        s.push(
          `
` +
            d +
            `
`,
        )
        return
      }
      ;(a = No(a)), d != null && s.push(`  ${a}${qi(d)}`)
    }),
    e && s.push('}'),
    s.join(`
`)
  )
}
function Bt(e, r, t) {
  e &&
    e.forEach((o) => {
      if (Array.isArray(o)) Bt(o, r, t)
      else if (typeof o == 'function') {
        const n = o(r)
        Array.isArray(n) ? Bt(n, r, t) : n && t(n)
      } else o && t(o)
    })
}
function Vo(e, r, t, o, n) {
  const i = e.$
  let s = ''
  if (!i || typeof i == 'string') Yr(i) ? (s = i) : r.push(i)
  else if (typeof i == 'function') {
    const f = i({
      context: o.context,
      props: n,
    })
    Yr(f) ? (s = f) : r.push(f)
  } else if ((i.before && i.before(o.context), !i.$ || typeof i.$ == 'string'))
    Yr(i.$) ? (s = i.$) : r.push(i.$)
  else if (i.$) {
    const f = i.$({
      context: o.context,
      props: n,
    })
    Yr(f) ? (s = f) : r.push(f)
  }
  const a = Ui(r),
    d = so(a, e.props, o, n)
  s ? t.push(`${s} {`) : d.length && t.push(d),
    e.children &&
      Bt(
        e.children,
        {
          context: o.context,
          props: n,
        },
        (f) => {
          if (typeof f == 'string') {
            const v = so(a, { raw: f }, o, n)
            t.push(v)
          } else Vo(f, r, t, o, n)
        },
      ),
    r.pop(),
    s && t.push('}'),
    i && i.after && i.after(o.context)
}
function Ji(e, r, t) {
  const o = []
  return (
    Vo(e, [], o, r, t),
    o.join(`

`)
  )
}
function Mr(e) {
  for (var r = 0, t, o = 0, n = e.length; n >= 4; ++o, n -= 4)
    (t =
      (e.charCodeAt(o) & 255) |
      ((e.charCodeAt(++o) & 255) << 8) |
      ((e.charCodeAt(++o) & 255) << 16) |
      ((e.charCodeAt(++o) & 255) << 24)),
      (t =
        /* Math.imul(k, m): */
        (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
      (t ^= /* k >>> r: */ t >>> 24),
      (r =
        /* Math.imul(k, m): */
        ((t & 65535) * 1540483477 +
          (((t >>> 16) * 59797) << 16)) /* Math.imul(h, m): */ ^
        ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)))
  switch (n) {
    case 3:
      r ^= (e.charCodeAt(o + 2) & 255) << 16
    case 2:
      r ^= (e.charCodeAt(o + 1) & 255) << 8
    case 1:
      ;(r ^= e.charCodeAt(o) & 255),
        (r =
          /* Math.imul(h, m): */
          (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16))
  }
  return (
    (r ^= r >>> 13),
    (r =
      /* Math.imul(h, m): */
      (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
    ((r ^ (r >>> 15)) >>> 0).toString(36)
  )
}
typeof window < 'u' && (window.__cssrContext = {})
function Qi(e, r, t, o) {
  const { els: n } = r
  if (t === void 0) n.forEach(lo), (r.els = [])
  else {
    const i = dt(t, o)
    i && n.includes(i) && (lo(i), (r.els = n.filter((s) => s !== i)))
  }
}
function co(e, r) {
  e.push(r)
}
function Zi(e, r, t, o, n, i, s, a, d) {
  let f
  if ((t === void 0 && ((f = r.render(o)), (t = Mr(f))), d)) {
    d.adapter(t, f ?? r.render(o))
    return
  }
  a === void 0 && (a = document.head)
  const v = dt(t, a)
  if (v !== null && !i) return v
  const p = v ?? Xi(t)
  if ((f === void 0 && (f = r.render(o)), (p.textContent = f), v !== null))
    return v
  if (s) {
    const $ = a.querySelector(`meta[name="${s}"]`)
    if ($) return a.insertBefore(p, $), co(r.els, p), p
  }
  return (
    n ? a.insertBefore(p, a.querySelector('style, link')) : a.appendChild(p),
    co(r.els, p),
    p
  )
}
function ea(e) {
  return Ji(this, this.instance, e)
}
function ra(e = {}) {
  const {
    id: r,
    ssr: t,
    props: o,
    head: n = !1,
    force: i = !1,
    anchorMetaName: s,
    parent: a,
  } = e
  return Zi(this.instance, this, r, o, n, i, s, a, t)
}
function ta(e = {}) {
  const { id: r, parent: t } = e
  Qi(this.instance, this, r, t)
}
const qr = function (e, r, t, o) {
    return {
      instance: e,
      $: r,
      props: t,
      children: o,
      els: [],
      render: ea,
      mount: ra,
      unmount: ta,
    }
  },
  oa = function (e, r, t, o) {
    return Array.isArray(r)
      ? qr(e, { $: null }, null, r)
      : Array.isArray(t)
        ? qr(e, r, null, t)
        : Array.isArray(o)
          ? qr(e, r, t, o)
          : qr(e, r, t, null)
  }
function na(e = {}) {
  const r = {
    c: (...t) => oa(r, ...t),
    use: (t, ...o) => t.install(r, ...o),
    find: dt,
    context: {},
    config: e,
  }
  return r
}
function ia(e, r) {
  if (e === void 0) return !1
  if (r) {
    const {
      context: { ids: t },
    } = r
    return t.has(e)
  }
  return dt(e) !== null
}
function aa(e) {
  let r = '.',
    t = '__',
    o = '--',
    n
  if (e) {
    let u = e.blockPrefix
    u && (r = u),
      (u = e.elementPrefix),
      u && (t = u),
      (u = e.modifierPrefix),
      u && (o = u)
  }
  const i = {
    install(u) {
      n = u.c
      const R = u.context
      ;(R.bem = {}), (R.bem.b = null), (R.bem.els = null)
    },
  }
  function s(u) {
    let R, y
    return {
      before(x) {
        ;(R = x.bem.b), (y = x.bem.els), (x.bem.els = null)
      },
      after(x) {
        ;(x.bem.b = R), (x.bem.els = y)
      },
      $({ context: x, props: T }) {
        return (
          (u = typeof u == 'string' ? u : u({ context: x, props: T })),
          (x.bem.b = u),
          `${(T == null ? void 0 : T.bPrefix) || r}${x.bem.b}`
        )
      },
    }
  }
  function a(u) {
    let R
    return {
      before(y) {
        R = y.bem.els
      },
      after(y) {
        y.bem.els = R
      },
      $({ context: y, props: x }) {
        return (
          (u = typeof u == 'string' ? u : u({ context: y, props: x })),
          (y.bem.els = u.split(',').map((T) => T.trim())),
          y.bem.els
            .map(
              (T) =>
                `${(x == null ? void 0 : x.bPrefix) || r}${y.bem.b}${t}${T}`,
            )
            .join(', ')
        )
      },
    }
  }
  function d(u) {
    return {
      $({ context: R, props: y }) {
        u = typeof u == 'string' ? u : u({ context: R, props: y })
        const x = u.split(',').map((S) => S.trim())
        function T(S) {
          return x
            .map(
              (M) =>
                `&${(y == null ? void 0 : y.bPrefix) || r}${R.bem.b}${S !== void 0 ? `${t}${S}` : ''}${o}${M}`,
            )
            .join(', ')
        }
        const L = R.bem.els
        return L !== null ? T(L[0]) : T()
      },
    }
  }
  function f(u) {
    return {
      $({ context: R, props: y }) {
        u = typeof u == 'string' ? u : u({ context: R, props: y })
        const x = R.bem.els
        return `&:not(${(y == null ? void 0 : y.bPrefix) || r}${R.bem.b}${x !== null && x.length > 0 ? `${t}${x[0]}` : ''}${o}${u})`
      },
    }
  }
  return (
    Object.assign(i, {
      cB: (...u) => n(s(u[0]), u[1], u[2]),
      cE: (...u) => n(a(u[0]), u[1], u[2]),
      cM: (...u) => n(d(u[0]), u[1], u[2]),
      cNotM: (...u) => n(f(u[0]), u[1], u[2]),
    }),
    i
  )
}
const la = 'n',
  sa = `.${la}-`,
  ca = '__',
  ua = '--',
  Go = na(),
  Uo = aa({
    blockPrefix: sa,
    elementPrefix: ca,
    modifierPrefix: ua,
  })
Go.use(Uo)
const { c: B, find: Pd } = Go,
  { cB: U, cE: C, cM: te, cNotM: Ne } = Uo
function j(e, r) {
  return (
    e + (r === 'default' ? '' : r.replace(/^[a-z]/, (t) => t.toUpperCase()))
  )
}
const ft = typeof document < 'u' && typeof window < 'u'
function Hr(e) {
  const r = O(e),
    t = W(r.value)
  return (
    _r(r, (o) => {
      t.value = o
    }),
    typeof e == 'function'
      ? t
      : {
          __v_isRef: !0,
          get value() {
            return t.value
          },
          set value(o) {
            e.set(o)
          },
        }
  )
}
function rt(e) {
  return e.composedPath()[0]
}
const da = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap(),
}
function fa(e, r, t) {
  if (e === 'mousemoveoutside') {
    const o = (n) => {
      r.contains(rt(n)) || t(n)
    }
    return {
      mousemove: o,
      touchstart: o,
    }
  } else if (e === 'clickoutside') {
    let o = !1
    const n = (s) => {
        o = !r.contains(rt(s))
      },
      i = (s) => {
        o && (r.contains(rt(s)) || t(s))
      }
    return {
      mousedown: n,
      mouseup: i,
      touchstart: n,
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
function Xo(e, r, t) {
  const o = da[e]
  let n = o.get(r)
  n === void 0 && o.set(r, (n = /* @__PURE__ */ new WeakMap()))
  let i = n.get(t)
  return i === void 0 && n.set(t, (i = fa(e, r, t))), i
}
function ha(e, r, t, o) {
  if (e === 'mousemoveoutside' || e === 'clickoutside') {
    const n = Xo(e, r, t)
    return (
      Object.keys(n).forEach((i) => {
        Ye(i, document, n[i], o)
      }),
      !0
    )
  }
  return !1
}
function va(e, r, t, o) {
  if (e === 'mousemoveoutside' || e === 'clickoutside') {
    const n = Xo(e, r, t)
    return (
      Object.keys(n).forEach((i) => {
        Pe(i, document, n[i], o)
      }),
      !0
    )
  }
  return !1
}
function pa() {
  if (typeof window > 'u')
    return {
      on: () => {},
      off: () => {},
    }
  const e = /* @__PURE__ */ new WeakMap(),
    r = /* @__PURE__ */ new WeakMap()
  function t() {
    e.set(this, !0)
  }
  function o() {
    e.set(this, !0), r.set(this, !0)
  }
  function n(c, m, w) {
    const A = c[m]
    return (
      (c[m] = function () {
        return w.apply(c, arguments), A.apply(c, arguments)
      }),
      c
    )
  }
  function i(c, m) {
    c[m] = Event.prototype[m]
  }
  const s = /* @__PURE__ */ new WeakMap(),
    a = Object.getOwnPropertyDescriptor(Event.prototype, 'currentTarget')
  function d() {
    var c
    return (c = s.get(this)) !== null && c !== void 0 ? c : null
  }
  function f(c, m) {
    a !== void 0 &&
      Object.defineProperty(c, 'currentTarget', {
        configurable: !0,
        enumerable: !0,
        get: m ?? a.get,
      })
  }
  const v = {
      bubble: {},
      capture: {},
    },
    p = {}
  function $() {
    const c = function (m) {
      const { type: w, eventPhase: A, bubbles: F } = m,
        I = rt(m)
      if (A === 2) return
      const Z = A === 1 ? 'capture' : 'bubble'
      let G = I
      const Y = []
      for (; G === null && (G = window), Y.push(G), G !== window; )
        G = G.parentNode || null
      const X = v.capture[w],
        k = v.bubble[w]
      if (
        (n(m, 'stopPropagation', t),
        n(m, 'stopImmediatePropagation', o),
        f(m, d),
        Z === 'capture')
      ) {
        if (X === void 0) return
        for (let ne = Y.length - 1; ne >= 0 && !e.has(m); --ne) {
          const ve = Y[ne],
            le = X.get(ve)
          if (le !== void 0) {
            s.set(m, ve)
            for (const ge of le) {
              if (r.has(m)) break
              ge(m)
            }
          }
          if (ne === 0 && !F && k !== void 0) {
            const ge = k.get(ve)
            if (ge !== void 0)
              for (const we of ge) {
                if (r.has(m)) break
                we(m)
              }
          }
        }
      } else if (Z === 'bubble') {
        if (k === void 0) return
        for (let ne = 0; ne < Y.length && !e.has(m); ++ne) {
          const ve = Y[ne],
            le = k.get(ve)
          if (le !== void 0) {
            s.set(m, ve)
            for (const ge of le) {
              if (r.has(m)) break
              ge(m)
            }
          }
        }
      }
      i(m, 'stopPropagation'), i(m, 'stopImmediatePropagation'), f(m)
    }
    return (c.displayName = 'evtdUnifiedHandler'), c
  }
  function E() {
    const c = function (m) {
      const { type: w, eventPhase: A } = m
      if (A !== 2) return
      const F = p[w]
      F !== void 0 && F.forEach((I) => I(m))
    }
    return (c.displayName = 'evtdUnifiedWindowEventHandler'), c
  }
  const u = $(),
    R = E()
  function y(c, m) {
    const w = v[c]
    return (
      w[m] === void 0 &&
        ((w[m] = /* @__PURE__ */ new Map()),
        window.addEventListener(m, u, c === 'capture')),
      w[m]
    )
  }
  function x(c) {
    return (
      p[c] === void 0 &&
        ((p[c] = /* @__PURE__ */ new Set()), window.addEventListener(c, R)),
      p[c]
    )
  }
  function T(c, m) {
    let w = c.get(m)
    return w === void 0 && c.set(m, (w = /* @__PURE__ */ new Set())), w
  }
  function L(c, m, w, A) {
    const F = v[m][w]
    if (F !== void 0) {
      const I = F.get(c)
      if (I !== void 0 && I.has(A)) return !0
    }
    return !1
  }
  function S(c, m) {
    const w = p[c]
    return !!(w !== void 0 && w.has(m))
  }
  function M(c, m, w, A) {
    let F
    if (
      (typeof A == 'object' && A.once === !0
        ? (F = (X) => {
            D(c, m, F, A), w(X)
          })
        : (F = w),
      ha(c, m, F, A))
    )
      return
    const Z =
        A === !0 || (typeof A == 'object' && A.capture === !0)
          ? 'capture'
          : 'bubble',
      G = y(Z, c),
      Y = T(G, m)
    if ((Y.has(F) || Y.add(F), m === window)) {
      const X = x(c)
      X.has(F) || X.add(F)
    }
  }
  function D(c, m, w, A) {
    if (va(c, m, w, A)) return
    const I = A === !0 || (typeof A == 'object' && A.capture === !0),
      Z = I ? 'capture' : 'bubble',
      G = y(Z, c),
      Y = T(G, m)
    if (m === window && !L(m, I ? 'bubble' : 'capture', c, w) && S(c, w)) {
      const k = p[c]
      k.delete(w),
        k.size === 0 && (window.removeEventListener(c, R), (p[c] = void 0))
    }
    Y.has(w) && Y.delete(w),
      Y.size === 0 && G.delete(m),
      G.size === 0 &&
        (window.removeEventListener(c, u, Z === 'capture'), (v[Z][c] = void 0))
  }
  return {
    on: M,
    off: D,
  }
}
const { on: Ye, off: Pe } = pa()
function ba(e, r) {
  return (
    _r(e, (t) => {
      t !== void 0 && (r.value = t)
    }),
    O(() => (e.value === void 0 ? r.value : e.value))
  )
}
function ga() {
  const e = W(!1)
  return (
    ct(() => {
      e.value = !0
    }),
    wi(e)
  )
}
const ma =
  (typeof window > 'u'
    ? !1
    : /iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream
function xa() {
  return ma
}
const ya = '@css-render/vue3-ssr'
function wa(e, r) {
  return `<style cssr-id="${e}">
${r}
</style>`
}
function Ca(e, r, t) {
  const { styles: o, ids: n } = t
  n.has(e) || (o !== null && (n.add(e), o.push(wa(e, r))))
}
const Sa = typeof document < 'u'
function ht() {
  if (Sa) return
  const e = me(ya, null)
  if (e !== null)
    return {
      adapter: (r, t) => Ca(r, t, e),
      context: e,
    }
}
function uo(e, r) {
  console.error(`[vueuc/${e}]: ${r}`)
}
var qe = [],
  Pa = function () {
    return qe.some(function (e) {
      return e.activeTargets.length > 0
    })
  },
  Ta = function () {
    return qe.some(function (e) {
      return e.skippedTargets.length > 0
    })
  },
  fo = 'ResizeObserver loop completed with undelivered notifications.',
  $a = function () {
    var e
    typeof ErrorEvent == 'function'
      ? (e = new ErrorEvent('error', {
          message: fo,
        }))
      : ((e = document.createEvent('Event')),
        e.initEvent('error', !1, !1),
        (e.message = fo)),
      window.dispatchEvent(e)
  },
  Ar
;(function (e) {
  ;(e.BORDER_BOX = 'border-box'),
    (e.CONTENT_BOX = 'content-box'),
    (e.DEVICE_PIXEL_CONTENT_BOX = 'device-pixel-content-box')
})(Ar || (Ar = {}))
var Ke = function (e) {
    return Object.freeze(e)
  },
  Ra = /* @__PURE__ */ (function () {
    function e(r, t) {
      ;(this.inlineSize = r), (this.blockSize = t), Ke(this)
    }
    return e
  })(),
  Yo = (function () {
    function e(r, t, o, n) {
      return (
        (this.x = r),
        (this.y = t),
        (this.width = o),
        (this.height = n),
        (this.top = this.y),
        (this.left = this.x),
        (this.bottom = this.top + this.height),
        (this.right = this.left + this.width),
        Ke(this)
      )
    }
    return (
      (e.prototype.toJSON = function () {
        var r = this,
          t = r.x,
          o = r.y,
          n = r.top,
          i = r.right,
          s = r.bottom,
          a = r.left,
          d = r.width,
          f = r.height
        return {
          x: t,
          y: o,
          top: n,
          right: i,
          bottom: s,
          left: a,
          width: d,
          height: f,
        }
      }),
      (e.fromRect = function (r) {
        return new e(r.x, r.y, r.width, r.height)
      }),
      e
    )
  })(),
  Nt = function (e) {
    return e instanceof SVGElement && 'getBBox' in e
  },
  qo = function (e) {
    if (Nt(e)) {
      var r = e.getBBox(),
        t = r.width,
        o = r.height
      return !t && !o
    }
    var n = e,
      i = n.offsetWidth,
      s = n.offsetHeight
    return !(i || s || e.getClientRects().length)
  },
  ho = function (e) {
    var r
    if (e instanceof Element) return !0
    var t =
      (r = e == null ? void 0 : e.ownerDocument) === null || r === void 0
        ? void 0
        : r.defaultView
    return !!(t && e instanceof t.Element)
  },
  za = function (e) {
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
  Er = typeof window < 'u' ? window : {},
  Kr = /* @__PURE__ */ new WeakMap(),
  vo = /auto|scroll/,
  Ea = /^tb|vertical/,
  Ba = /msie|trident/i.test(Er.navigator && Er.navigator.userAgent),
  ye = function (e) {
    return parseFloat(e || '0')
  },
  nr = function (e, r, t) {
    return (
      e === void 0 && (e = 0),
      r === void 0 && (r = 0),
      t === void 0 && (t = !1),
      new Ra((t ? r : e) || 0, (t ? e : r) || 0)
    )
  },
  po = Ke({
    devicePixelContentBoxSize: nr(),
    borderBoxSize: nr(),
    contentBoxSize: nr(),
    contentRect: new Yo(0, 0, 0, 0),
  }),
  Ko = function (e, r) {
    if ((r === void 0 && (r = !1), Kr.has(e) && !r)) return Kr.get(e)
    if (qo(e)) return Kr.set(e, po), po
    var t = getComputedStyle(e),
      o = Nt(e) && e.ownerSVGElement && e.getBBox(),
      n = !Ba && t.boxSizing === 'border-box',
      i = Ea.test(t.writingMode || ''),
      s = !o && vo.test(t.overflowY || ''),
      a = !o && vo.test(t.overflowX || ''),
      d = o ? 0 : ye(t.paddingTop),
      f = o ? 0 : ye(t.paddingRight),
      v = o ? 0 : ye(t.paddingBottom),
      p = o ? 0 : ye(t.paddingLeft),
      $ = o ? 0 : ye(t.borderTopWidth),
      E = o ? 0 : ye(t.borderRightWidth),
      u = o ? 0 : ye(t.borderBottomWidth),
      R = o ? 0 : ye(t.borderLeftWidth),
      y = p + f,
      x = d + v,
      T = R + E,
      L = $ + u,
      S = a ? e.offsetHeight - L - e.clientHeight : 0,
      M = s ? e.offsetWidth - T - e.clientWidth : 0,
      D = n ? y + T : 0,
      c = n ? x + L : 0,
      m = o ? o.width : ye(t.width) - D - M,
      w = o ? o.height : ye(t.height) - c - S,
      A = m + y + M + T,
      F = w + x + S + L,
      I = Ke({
        devicePixelContentBoxSize: nr(
          Math.round(m * devicePixelRatio),
          Math.round(w * devicePixelRatio),
          i,
        ),
        borderBoxSize: nr(A, F, i),
        contentBoxSize: nr(m, w, i),
        contentRect: new Yo(p, d, m, w),
      })
    return Kr.set(e, I), I
  },
  Jo = function (e, r, t) {
    var o = Ko(e, t),
      n = o.borderBoxSize,
      i = o.contentBoxSize,
      s = o.devicePixelContentBoxSize
    switch (r) {
      case Ar.DEVICE_PIXEL_CONTENT_BOX:
        return s
      case Ar.BORDER_BOX:
        return n
      default:
        return i
    }
  },
  _a = /* @__PURE__ */ (function () {
    function e(r) {
      var t = Ko(r)
      ;(this.target = r),
        (this.contentRect = t.contentRect),
        (this.borderBoxSize = Ke([t.borderBoxSize])),
        (this.contentBoxSize = Ke([t.contentBoxSize])),
        (this.devicePixelContentBoxSize = Ke([t.devicePixelContentBoxSize]))
    }
    return e
  })(),
  Qo = function (e) {
    if (qo(e)) return 1 / 0
    for (var r = 0, t = e.parentNode; t; ) (r += 1), (t = t.parentNode)
    return r
  },
  Oa = function () {
    var e = 1 / 0,
      r = []
    qe.forEach(function (s) {
      if (s.activeTargets.length !== 0) {
        var a = []
        s.activeTargets.forEach(function (f) {
          var v = new _a(f.target),
            p = Qo(f.target)
          a.push(v),
            (f.lastReportedSize = Jo(f.target, f.observedBox)),
            p < e && (e = p)
        }),
          r.push(function () {
            s.callback.call(s.observer, a, s.observer)
          }),
          s.activeTargets.splice(0, s.activeTargets.length)
      }
    })
    for (var t = 0, o = r; t < o.length; t++) {
      var n = o[t]
      n()
    }
    return e
  },
  bo = function (e) {
    qe.forEach(function (t) {
      t.activeTargets.splice(0, t.activeTargets.length),
        t.skippedTargets.splice(0, t.skippedTargets.length),
        t.observationTargets.forEach(function (n) {
          n.isActive() &&
            (Qo(n.target) > e
              ? t.activeTargets.push(n)
              : t.skippedTargets.push(n))
        })
    })
  },
  Ma = function () {
    var e = 0
    for (bo(e); Pa(); ) (e = Oa()), bo(e)
    return Ta() && $a(), e > 0
  },
  Ct,
  Zo = [],
  Ha = function () {
    return Zo.splice(0).forEach(function (e) {
      return e()
    })
  },
  Aa = function (e) {
    if (!Ct) {
      var r = 0,
        t = document.createTextNode(''),
        o = { characterData: !0 }
      new MutationObserver(function () {
        return Ha()
      }).observe(t, o),
        (Ct = function () {
          t.textContent = ''.concat(r ? r-- : r++)
        })
    }
    Zo.push(e), Ct()
  },
  Da = function (e) {
    Aa(function () {
      requestAnimationFrame(e)
    })
  },
  tt = 0,
  Fa = function () {
    return !!tt
  },
  Ia = 250,
  Wa = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
  go = [
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
  mo = function (e) {
    return e === void 0 && (e = 0), Date.now() + e
  },
  St = !1,
  ka = (function () {
    function e() {
      var r = this
      ;(this.stopped = !0),
        (this.listener = function () {
          return r.schedule()
        })
    }
    return (
      (e.prototype.run = function (r) {
        var t = this
        if ((r === void 0 && (r = Ia), !St)) {
          St = !0
          var o = mo(r)
          Da(function () {
            var n = !1
            try {
              n = Ma()
            } finally {
              if (((St = !1), (r = o - mo()), !Fa())) return
              n ? t.run(1e3) : r > 0 ? t.run(r) : t.start()
            }
          })
        }
      }),
      (e.prototype.schedule = function () {
        this.stop(), this.run()
      }),
      (e.prototype.observe = function () {
        var r = this,
          t = function () {
            return r.observer && r.observer.observe(document.body, Wa)
          }
        document.body ? t() : Er.addEventListener('DOMContentLoaded', t)
      }),
      (e.prototype.start = function () {
        var r = this
        this.stopped &&
          ((this.stopped = !1),
          (this.observer = new MutationObserver(this.listener)),
          this.observe(),
          go.forEach(function (t) {
            return Er.addEventListener(t, r.listener, !0)
          }))
      }),
      (e.prototype.stop = function () {
        var r = this
        this.stopped ||
          (this.observer && this.observer.disconnect(),
          go.forEach(function (t) {
            return Er.removeEventListener(t, r.listener, !0)
          }),
          (this.stopped = !0))
      }),
      e
    )
  })(),
  _t = new ka(),
  xo = function (e) {
    !tt && e > 0 && _t.start(), (tt += e), !tt && _t.stop()
  },
  ja = function (e) {
    return !Nt(e) && !za(e) && getComputedStyle(e).display === 'inline'
  },
  La = (function () {
    function e(r, t) {
      ;(this.target = r),
        (this.observedBox = t || Ar.CONTENT_BOX),
        (this.lastReportedSize = {
          inlineSize: 0,
          blockSize: 0,
        })
    }
    return (
      (e.prototype.isActive = function () {
        var r = Jo(this.target, this.observedBox, !0)
        return (
          ja(this.target) && (this.lastReportedSize = r),
          this.lastReportedSize.inlineSize !== r.inlineSize ||
            this.lastReportedSize.blockSize !== r.blockSize
        )
      }),
      e
    )
  })(),
  Na = /* @__PURE__ */ (function () {
    function e(r, t) {
      ;(this.activeTargets = []),
        (this.skippedTargets = []),
        (this.observationTargets = []),
        (this.observer = r),
        (this.callback = t)
    }
    return e
  })(),
  Jr = /* @__PURE__ */ new WeakMap(),
  yo = function (e, r) {
    for (var t = 0; t < e.length; t += 1) if (e[t].target === r) return t
    return -1
  },
  Qr = (function () {
    function e() {}
    return (
      (e.connect = function (r, t) {
        var o = new Na(r, t)
        Jr.set(r, o)
      }),
      (e.observe = function (r, t, o) {
        var n = Jr.get(r),
          i = n.observationTargets.length === 0
        yo(n.observationTargets, t) < 0 &&
          (i && qe.push(n),
          n.observationTargets.push(new La(t, o && o.box)),
          xo(1),
          _t.schedule())
      }),
      (e.unobserve = function (r, t) {
        var o = Jr.get(r),
          n = yo(o.observationTargets, t),
          i = o.observationTargets.length === 1
        n >= 0 &&
          (i && qe.splice(qe.indexOf(o), 1),
          o.observationTargets.splice(n, 1),
          xo(-1))
      }),
      (e.disconnect = function (r) {
        var t = this,
          o = Jr.get(r)
        o.observationTargets.slice().forEach(function (n) {
          return t.unobserve(r, n.target)
        }),
          o.activeTargets.splice(0, o.activeTargets.length)
      }),
      e
    )
  })(),
  Va = (function () {
    function e(r) {
      if (arguments.length === 0)
        throw new TypeError(
          "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.",
        )
      if (typeof r != 'function')
        throw new TypeError(
          "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.",
        )
      Qr.connect(this, r)
    }
    return (
      (e.prototype.observe = function (r, t) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.",
          )
        if (!ho(r))
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element",
          )
        Qr.observe(this, r, t)
      }),
      (e.prototype.unobserve = function (r) {
        if (arguments.length === 0)
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.",
          )
        if (!ho(r))
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element",
          )
        Qr.unobserve(this, r)
      }),
      (e.prototype.disconnect = function () {
        Qr.disconnect(this)
      }),
      (e.toString = function () {
        return 'function ResizeObserver () { [polyfill code] }'
      }),
      e
    )
  })()
class Ga {
  constructor() {
    ;(this.handleResize = this.handleResize.bind(this)),
      (this.observer = new ((typeof window < 'u' && window.ResizeObserver) ||
        Va)(this.handleResize)),
      (this.elHandlersMap = /* @__PURE__ */ new Map())
  }
  handleResize(r) {
    for (const t of r) {
      const o = this.elHandlersMap.get(t.target)
      o !== void 0 && o(t)
    }
  }
  registerHandler(r, t) {
    this.elHandlersMap.set(r, t), this.observer.observe(r)
  }
  unregisterHandler(r) {
    this.elHandlersMap.has(r) &&
      (this.elHandlersMap.delete(r), this.observer.unobserve(r))
  }
}
const wo = new Ga(),
  Ot = ce({
    name: 'ResizeObserver',
    props: {
      onResize: Function,
    },
    setup(e) {
      let r = !1
      const t = ko().proxy
      function o(n) {
        const { onResize: i } = e
        i !== void 0 && i(n)
      }
      ct(() => {
        const n = t.$el
        if (n === void 0) {
          uo('resize-observer', '$el does not exist.')
          return
        }
        if (
          n.nextElementSibling !== n.nextSibling &&
          n.nodeType === 3 &&
          n.nodeValue !== ''
        ) {
          uo(
            'resize-observer',
            '$el can not be observed (it may be a text node).',
          )
          return
        }
        n.nextElementSibling !== null &&
          (wo.registerHandler(n.nextElementSibling, o), (r = !0))
      }),
        ut(() => {
          r && wo.unregisterHandler(t.$el.nextElementSibling)
        })
    },
    render() {
      return Ci(this.$slots, 'default')
    },
  })
function Ua(e) {
  const r = {
    isDeactivated: !1,
  }
  let t = !1
  return (
    Si(() => {
      if (((r.isDeactivated = !1), !t)) {
        t = !0
        return
      }
      e()
    }),
    Pi(() => {
      ;(r.isDeactivated = !0), t || (t = !0)
    }),
    r
  )
}
const Co = 'n-form-item'
function en(
  e,
  { defaultSize: r = 'medium', mergedSize: t, mergedDisabled: o } = {},
) {
  const n = me(Co, null)
  kt(Co, null)
  const i = O(
      t
        ? () => t(n)
        : () => {
            const { size: d } = e
            if (d) return d
            if (n) {
              const { mergedSize: f } = n
              if (f.value !== void 0) return f.value
            }
            return r
          },
    ),
    s = O(
      o
        ? () => o(n)
        : () => {
            const { disabled: d } = e
            return d !== void 0 ? d : n ? n.disabled.value : !1
          },
    ),
    a = O(() => {
      const { status: d } = e
      return d || (n == null ? void 0 : n.mergedValidationStatus.value)
    })
  return (
    ut(() => {
      n && n.restoreValidation()
    }),
    {
      mergedSizeRef: i,
      mergedDisabledRef: s,
      mergedStatusRef: a,
      nTriggerFormBlur() {
        n && n.handleContentBlur()
      },
      nTriggerFormChange() {
        n && n.handleContentChange()
      },
      nTriggerFormFocus() {
        n && n.handleContentFocus()
      },
      nTriggerFormInput() {
        n && n.handleContentInput()
      },
    }
  )
}
var rn =
    typeof global == 'object' && global && global.Object === Object && global,
  Xa = typeof self == 'object' && self && self.Object === Object && self,
  cr = rn || Xa || Function('return this')(),
  ar = cr.Symbol,
  tn = Object.prototype,
  Ya = tn.hasOwnProperty,
  qa = tn.toString,
  Sr = ar ? ar.toStringTag : void 0
function Ka(e) {
  var r = Ya.call(e, Sr),
    t = e[Sr]
  try {
    e[Sr] = void 0
    var o = !0
  } catch {}
  var n = qa.call(e)
  return o && (r ? (e[Sr] = t) : delete e[Sr]), n
}
var Ja = Object.prototype,
  Qa = Ja.toString
function Za(e) {
  return Qa.call(e)
}
var el = '[object Null]',
  rl = '[object Undefined]',
  So = ar ? ar.toStringTag : void 0
function Wr(e) {
  return e == null
    ? e === void 0
      ? rl
      : el
    : So && So in Object(e)
      ? Ka(e)
      : Za(e)
}
function ur(e) {
  return e != null && typeof e == 'object'
}
var tl = '[object Symbol]'
function ol(e) {
  return typeof e == 'symbol' || (ur(e) && Wr(e) == tl)
}
function nl(e, r) {
  for (var t = -1, o = e == null ? 0 : e.length, n = Array(o); ++t < o; )
    n[t] = r(e[t], t, e)
  return n
}
var nt = Array.isArray,
  il = 1 / 0,
  Po = ar ? ar.prototype : void 0,
  To = Po ? Po.toString : void 0
function on(e) {
  if (typeof e == 'string') return e
  if (nt(e)) return nl(e, on) + ''
  if (ol(e)) return To ? To.call(e) : ''
  var r = e + ''
  return r == '0' && 1 / e == -il ? '-0' : r
}
function Ze(e) {
  var r = typeof e
  return e != null && (r == 'object' || r == 'function')
}
function nn(e) {
  return e
}
var al = '[object AsyncFunction]',
  ll = '[object Function]',
  sl = '[object GeneratorFunction]',
  cl = '[object Proxy]'
function Vt(e) {
  if (!Ze(e)) return !1
  var r = Wr(e)
  return r == ll || r == sl || r == al || r == cl
}
var Pt = cr['__core-js_shared__'],
  $o = (function () {
    var e = /[^.]+$/.exec((Pt && Pt.keys && Pt.keys.IE_PROTO) || '')
    return e ? 'Symbol(src)_1.' + e : ''
  })()
function ul(e) {
  return !!$o && $o in e
}
var dl = Function.prototype,
  fl = dl.toString
function hl(e) {
  if (e != null) {
    try {
      return fl.call(e)
    } catch {}
    try {
      return e + ''
    } catch {}
  }
  return ''
}
var vl = /[\\^$.*+?()[\]{}|]/g,
  pl = /^\[object .+?Constructor\]$/,
  bl = Function.prototype,
  gl = Object.prototype,
  ml = bl.toString,
  xl = gl.hasOwnProperty,
  yl = RegExp(
    '^' +
      ml
        .call(xl)
        .replace(vl, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?',
        ) +
      '$',
  )
function wl(e) {
  if (!Ze(e) || ul(e)) return !1
  var r = Vt(e) ? yl : pl
  return r.test(hl(e))
}
function Cl(e, r) {
  return e == null ? void 0 : e[r]
}
function Gt(e, r) {
  var t = Cl(e, r)
  return wl(t) ? t : void 0
}
var Ro = Object.create,
  Sl = /* @__PURE__ */ (function () {
    function e() {}
    return function (r) {
      if (!Ze(r)) return {}
      if (Ro) return Ro(r)
      e.prototype = r
      var t = new e()
      return (e.prototype = void 0), t
    }
  })()
function Pl(e, r, t) {
  switch (t.length) {
    case 0:
      return e.call(r)
    case 1:
      return e.call(r, t[0])
    case 2:
      return e.call(r, t[0], t[1])
    case 3:
      return e.call(r, t[0], t[1], t[2])
  }
  return e.apply(r, t)
}
function Tl(e, r) {
  var t = -1,
    o = e.length
  for (r || (r = Array(o)); ++t < o; ) r[t] = e[t]
  return r
}
var $l = 800,
  Rl = 16,
  zl = Date.now
function El(e) {
  var r = 0,
    t = 0
  return function () {
    var o = zl(),
      n = Rl - (o - t)
    if (((t = o), n > 0)) {
      if (++r >= $l) return arguments[0]
    } else r = 0
    return e.apply(void 0, arguments)
  }
}
function Bl(e) {
  return function () {
    return e
  }
}
var it = (function () {
    try {
      var e = Gt(Object, 'defineProperty')
      return e({}, '', {}), e
    } catch {}
  })(),
  _l = it
    ? function (e, r) {
        return it(e, 'toString', {
          configurable: !0,
          enumerable: !1,
          value: Bl(r),
          writable: !0,
        })
      }
    : nn,
  Ol = El(_l),
  Ml = 9007199254740991,
  Hl = /^(?:0|[1-9]\d*)$/
function an(e, r) {
  var t = typeof e
  return (
    (r = r ?? Ml),
    !!r &&
      (t == 'number' || (t != 'symbol' && Hl.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < r
  )
}
function Ut(e, r, t) {
  r == '__proto__' && it
    ? it(e, r, {
        configurable: !0,
        enumerable: !0,
        value: t,
        writable: !0,
      })
    : (e[r] = t)
}
function vt(e, r) {
  return e === r || (e !== e && r !== r)
}
var Al = Object.prototype,
  Dl = Al.hasOwnProperty
function Fl(e, r, t) {
  var o = e[r]
  ;(!(Dl.call(e, r) && vt(o, t)) || (t === void 0 && !(r in e))) && Ut(e, r, t)
}
function Il(e, r, t, o) {
  var n = !t
  t || (t = {})
  for (var i = -1, s = r.length; ++i < s; ) {
    var a = r[i],
      d = void 0
    d === void 0 && (d = e[a]), n ? Ut(t, a, d) : Fl(t, a, d)
  }
  return t
}
var zo = Math.max
function Wl(e, r, t) {
  return (
    (r = zo(r === void 0 ? e.length - 1 : r, 0)),
    function () {
      for (
        var o = arguments, n = -1, i = zo(o.length - r, 0), s = Array(i);
        ++n < i;

      )
        s[n] = o[r + n]
      n = -1
      for (var a = Array(r + 1); ++n < r; ) a[n] = o[n]
      return (a[r] = t(s)), Pl(e, this, a)
    }
  )
}
function kl(e, r) {
  return Ol(Wl(e, r, nn), e + '')
}
var jl = 9007199254740991
function ln(e) {
  return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= jl
}
function Xt(e) {
  return e != null && ln(e.length) && !Vt(e)
}
function Ll(e, r, t) {
  if (!Ze(t)) return !1
  var o = typeof r
  return (o == 'number' ? Xt(t) && an(r, t.length) : o == 'string' && r in t)
    ? vt(t[r], e)
    : !1
}
function Nl(e) {
  return kl(function (r, t) {
    var o = -1,
      n = t.length,
      i = n > 1 ? t[n - 1] : void 0,
      s = n > 2 ? t[2] : void 0
    for (
      i = e.length > 3 && typeof i == 'function' ? (n--, i) : void 0,
        s && Ll(t[0], t[1], s) && ((i = n < 3 ? void 0 : i), (n = 1)),
        r = Object(r);
      ++o < n;

    ) {
      var a = t[o]
      a && e(r, a, o, i)
    }
    return r
  })
}
var Vl = Object.prototype
function sn(e) {
  var r = e && e.constructor,
    t = (typeof r == 'function' && r.prototype) || Vl
  return e === t
}
function Gl(e, r) {
  for (var t = -1, o = Array(e); ++t < e; ) o[t] = r(t)
  return o
}
var Ul = '[object Arguments]'
function Eo(e) {
  return ur(e) && Wr(e) == Ul
}
var cn = Object.prototype,
  Xl = cn.hasOwnProperty,
  Yl = cn.propertyIsEnumerable,
  Mt = Eo(
    /* @__PURE__ */ (function () {
      return arguments
    })(),
  )
    ? Eo
    : function (e) {
        return ur(e) && Xl.call(e, 'callee') && !Yl.call(e, 'callee')
      }
function ql() {
  return !1
}
var un = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Bo = un && typeof module == 'object' && module && !module.nodeType && module,
  Kl = Bo && Bo.exports === un,
  _o = Kl ? cr.Buffer : void 0,
  Jl = _o ? _o.isBuffer : void 0,
  dn = Jl || ql,
  Ql = '[object Arguments]',
  Zl = '[object Array]',
  es = '[object Boolean]',
  rs = '[object Date]',
  ts = '[object Error]',
  os = '[object Function]',
  ns = '[object Map]',
  is = '[object Number]',
  as = '[object Object]',
  ls = '[object RegExp]',
  ss = '[object Set]',
  cs = '[object String]',
  us = '[object WeakMap]',
  ds = '[object ArrayBuffer]',
  fs = '[object DataView]',
  hs = '[object Float32Array]',
  vs = '[object Float64Array]',
  ps = '[object Int8Array]',
  bs = '[object Int16Array]',
  gs = '[object Int32Array]',
  ms = '[object Uint8Array]',
  xs = '[object Uint8ClampedArray]',
  ys = '[object Uint16Array]',
  ws = '[object Uint32Array]',
  re = {}
re[hs] =
  re[vs] =
  re[ps] =
  re[bs] =
  re[gs] =
  re[ms] =
  re[xs] =
  re[ys] =
  re[ws] =
    !0
re[Ql] =
  re[Zl] =
  re[ds] =
  re[es] =
  re[fs] =
  re[rs] =
  re[ts] =
  re[os] =
  re[ns] =
  re[is] =
  re[as] =
  re[ls] =
  re[ss] =
  re[cs] =
  re[us] =
    !1
function Cs(e) {
  return ur(e) && ln(e.length) && !!re[Wr(e)]
}
function Ss(e) {
  return function (r) {
    return e(r)
  }
}
var fn = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Br = fn && typeof module == 'object' && module && !module.nodeType && module,
  Ps = Br && Br.exports === fn,
  Tt = Ps && rn.process,
  Oo = (function () {
    try {
      var e = Br && Br.require && Br.require('util').types
      return e || (Tt && Tt.binding && Tt.binding('util'))
    } catch {}
  })(),
  Mo = Oo && Oo.isTypedArray,
  hn = Mo ? Ss(Mo) : Cs
function Ts(e, r) {
  var t = nt(e),
    o = !t && Mt(e),
    n = !t && !o && dn(e),
    i = !t && !o && !n && hn(e),
    s = t || o || n || i,
    a = s ? Gl(e.length, String) : [],
    d = a.length
  for (var f in e)
    (s && // Safari 9 has enumerable `arguments.length` in strict mode.
      (f == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
        (n && (f == 'offset' || f == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        (i && (f == 'buffer' || f == 'byteLength' || f == 'byteOffset')) || // Skip index properties.
        an(f, d))) ||
      a.push(f)
  return a
}
function $s(e, r) {
  return function (t) {
    return e(r(t))
  }
}
function Rs(e) {
  var r = []
  if (e != null) for (var t in Object(e)) r.push(t)
  return r
}
var zs = Object.prototype,
  Es = zs.hasOwnProperty
function Bs(e) {
  if (!Ze(e)) return Rs(e)
  var r = sn(e),
    t = []
  for (var o in e) (o == 'constructor' && (r || !Es.call(e, o))) || t.push(o)
  return t
}
function vn(e) {
  return Xt(e) ? Ts(e) : Bs(e)
}
var Dr = Gt(Object, 'create')
function _s() {
  ;(this.__data__ = Dr ? Dr(null) : {}), (this.size = 0)
}
function Os(e) {
  var r = this.has(e) && delete this.__data__[e]
  return (this.size -= r ? 1 : 0), r
}
var Ms = '__lodash_hash_undefined__',
  Hs = Object.prototype,
  As = Hs.hasOwnProperty
function Ds(e) {
  var r = this.__data__
  if (Dr) {
    var t = r[e]
    return t === Ms ? void 0 : t
  }
  return As.call(r, e) ? r[e] : void 0
}
var Fs = Object.prototype,
  Is = Fs.hasOwnProperty
function Ws(e) {
  var r = this.__data__
  return Dr ? r[e] !== void 0 : Is.call(r, e)
}
var ks = '__lodash_hash_undefined__'
function js(e, r) {
  var t = this.__data__
  return (
    (this.size += this.has(e) ? 0 : 1),
    (t[e] = Dr && r === void 0 ? ks : r),
    this
  )
}
function Qe(e) {
  var r = -1,
    t = e == null ? 0 : e.length
  for (this.clear(); ++r < t; ) {
    var o = e[r]
    this.set(o[0], o[1])
  }
}
Qe.prototype.clear = _s
Qe.prototype.delete = Os
Qe.prototype.get = Ds
Qe.prototype.has = Ws
Qe.prototype.set = js
function Ls() {
  ;(this.__data__ = []), (this.size = 0)
}
function pt(e, r) {
  for (var t = e.length; t--; ) if (vt(e[t][0], r)) return t
  return -1
}
var Ns = Array.prototype,
  Vs = Ns.splice
function Gs(e) {
  var r = this.__data__,
    t = pt(r, e)
  if (t < 0) return !1
  var o = r.length - 1
  return t == o ? r.pop() : Vs.call(r, t, 1), --this.size, !0
}
function Us(e) {
  var r = this.__data__,
    t = pt(r, e)
  return t < 0 ? void 0 : r[t][1]
}
function Xs(e) {
  return pt(this.__data__, e) > -1
}
function Ys(e, r) {
  var t = this.__data__,
    o = pt(t, e)
  return o < 0 ? (++this.size, t.push([e, r])) : (t[o][1] = r), this
}
function Te(e) {
  var r = -1,
    t = e == null ? 0 : e.length
  for (this.clear(); ++r < t; ) {
    var o = e[r]
    this.set(o[0], o[1])
  }
}
Te.prototype.clear = Ls
Te.prototype.delete = Gs
Te.prototype.get = Us
Te.prototype.has = Xs
Te.prototype.set = Ys
var pn = Gt(cr, 'Map')
function qs() {
  ;(this.size = 0),
    (this.__data__ = {
      hash: new Qe(),
      map: new (pn || Te)(),
      string: new Qe(),
    })
}
function Ks(e) {
  var r = typeof e
  return r == 'string' || r == 'number' || r == 'symbol' || r == 'boolean'
    ? e !== '__proto__'
    : e === null
}
function bt(e, r) {
  var t = e.__data__
  return Ks(r) ? t[typeof r == 'string' ? 'string' : 'hash'] : t.map
}
function Js(e) {
  var r = bt(this, e).delete(e)
  return (this.size -= r ? 1 : 0), r
}
function Qs(e) {
  return bt(this, e).get(e)
}
function Zs(e) {
  return bt(this, e).has(e)
}
function ec(e, r) {
  var t = bt(this, e),
    o = t.size
  return t.set(e, r), (this.size += t.size == o ? 0 : 1), this
}
function dr(e) {
  var r = -1,
    t = e == null ? 0 : e.length
  for (this.clear(); ++r < t; ) {
    var o = e[r]
    this.set(o[0], o[1])
  }
}
dr.prototype.clear = qs
dr.prototype.delete = Js
dr.prototype.get = Qs
dr.prototype.has = Zs
dr.prototype.set = ec
function rc(e) {
  return e == null ? '' : on(e)
}
var bn = $s(Object.getPrototypeOf, Object),
  tc = '[object Object]',
  oc = Function.prototype,
  nc = Object.prototype,
  gn = oc.toString,
  ic = nc.hasOwnProperty,
  ac = gn.call(Object)
function lc(e) {
  if (!ur(e) || Wr(e) != tc) return !1
  var r = bn(e)
  if (r === null) return !0
  var t = ic.call(r, 'constructor') && r.constructor
  return typeof t == 'function' && t instanceof t && gn.call(t) == ac
}
function sc(e, r, t) {
  var o = -1,
    n = e.length
  r < 0 && (r = -r > n ? 0 : n + r),
    (t = t > n ? n : t),
    t < 0 && (t += n),
    (n = r > t ? 0 : (t - r) >>> 0),
    (r >>>= 0)
  for (var i = Array(n); ++o < n; ) i[o] = e[o + r]
  return i
}
function cc(e, r, t) {
  var o = e.length
  return (t = t === void 0 ? o : t), !r && t >= o ? e : sc(e, r, t)
}
var uc = '\\ud800-\\udfff',
  dc = '\\u0300-\\u036f',
  fc = '\\ufe20-\\ufe2f',
  hc = '\\u20d0-\\u20ff',
  vc = dc + fc + hc,
  pc = '\\ufe0e\\ufe0f',
  bc = '\\u200d',
  gc = RegExp('[' + bc + uc + vc + pc + ']')
function mn(e) {
  return gc.test(e)
}
function mc(e) {
  return e.split('')
}
var xn = '\\ud800-\\udfff',
  xc = '\\u0300-\\u036f',
  yc = '\\ufe20-\\ufe2f',
  wc = '\\u20d0-\\u20ff',
  Cc = xc + yc + wc,
  Sc = '\\ufe0e\\ufe0f',
  Pc = '[' + xn + ']',
  Ht = '[' + Cc + ']',
  At = '\\ud83c[\\udffb-\\udfff]',
  Tc = '(?:' + Ht + '|' + At + ')',
  yn = '[^' + xn + ']',
  wn = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  Cn = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  $c = '\\u200d',
  Sn = Tc + '?',
  Pn = '[' + Sc + ']?',
  Rc = '(?:' + $c + '(?:' + [yn, wn, Cn].join('|') + ')' + Pn + Sn + ')*',
  zc = Pn + Sn + Rc,
  Ec = '(?:' + [yn + Ht + '?', Ht, wn, Cn, Pc].join('|') + ')',
  Bc = RegExp(At + '(?=' + At + ')|' + Ec + zc, 'g')
function _c(e) {
  return e.match(Bc) || []
}
function Oc(e) {
  return mn(e) ? _c(e) : mc(e)
}
function Mc(e) {
  return function (r) {
    r = rc(r)
    var t = mn(r) ? Oc(r) : void 0,
      o = t ? t[0] : r.charAt(0),
      n = t ? cc(t, 1).join('') : r.slice(1)
    return o[e]() + n
  }
}
var Hc = Mc('toUpperCase')
function Ac() {
  ;(this.__data__ = new Te()), (this.size = 0)
}
function Dc(e) {
  var r = this.__data__,
    t = r.delete(e)
  return (this.size = r.size), t
}
function Fc(e) {
  return this.__data__.get(e)
}
function Ic(e) {
  return this.__data__.has(e)
}
var Wc = 200
function kc(e, r) {
  var t = this.__data__
  if (t instanceof Te) {
    var o = t.__data__
    if (!pn || o.length < Wc - 1)
      return o.push([e, r]), (this.size = ++t.size), this
    t = this.__data__ = new dr(o)
  }
  return t.set(e, r), (this.size = t.size), this
}
function fr(e) {
  var r = (this.__data__ = new Te(e))
  this.size = r.size
}
fr.prototype.clear = Ac
fr.prototype.delete = Dc
fr.prototype.get = Fc
fr.prototype.has = Ic
fr.prototype.set = kc
var Tn = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Ho = Tn && typeof module == 'object' && module && !module.nodeType && module,
  jc = Ho && Ho.exports === Tn,
  Ao = jc ? cr.Buffer : void 0
Ao && Ao.allocUnsafe
function Lc(e, r) {
  return e.slice()
}
var Do = cr.Uint8Array
function Nc(e) {
  var r = new e.constructor(e.byteLength)
  return new Do(r).set(new Do(e)), r
}
function Vc(e, r) {
  var t = Nc(e.buffer)
  return new e.constructor(t, e.byteOffset, e.length)
}
function Gc(e) {
  return typeof e.constructor == 'function' && !sn(e) ? Sl(bn(e)) : {}
}
function Uc(e) {
  return function (r, t, o) {
    for (var n = -1, i = Object(r), s = o(r), a = s.length; a--; ) {
      var d = s[++n]
      if (t(i[d], d, i) === !1) break
    }
    return r
  }
}
var Xc = Uc()
function Dt(e, r, t) {
  ;((t !== void 0 && !vt(e[r], t)) || (t === void 0 && !(r in e))) &&
    Ut(e, r, t)
}
function Yc(e) {
  return ur(e) && Xt(e)
}
function Ft(e, r) {
  if (!(r === 'constructor' && typeof e[r] == 'function') && r != '__proto__')
    return e[r]
}
function qc(e) {
  return Il(e, vn(e))
}
function Kc(e, r, t, o, n, i, s) {
  var a = Ft(e, t),
    d = Ft(r, t),
    f = s.get(d)
  if (f) {
    Dt(e, t, f)
    return
  }
  var v = i ? i(a, d, t + '', e, r, s) : void 0,
    p = v === void 0
  if (p) {
    var $ = nt(d),
      E = !$ && dn(d),
      u = !$ && !E && hn(d)
    ;(v = d),
      $ || E || u
        ? nt(a)
          ? (v = a)
          : Yc(a)
            ? (v = Tl(a))
            : E
              ? ((p = !1), (v = Lc(d)))
              : u
                ? ((p = !1), (v = Vc(d)))
                : (v = [])
        : lc(d) || Mt(d)
          ? ((v = a), Mt(a) ? (v = qc(a)) : (!Ze(a) || Vt(a)) && (v = Gc(d)))
          : (p = !1)
  }
  p && (s.set(d, v), n(v, d, o, i, s), s.delete(d)), Dt(e, t, v)
}
function $n(e, r, t, o, n) {
  e !== r &&
    Xc(
      r,
      function (i, s) {
        if ((n || (n = new fr()), Ze(i))) Kc(e, r, s, t, $n, o, n)
        else {
          var a = o ? o(Ft(e, s), i, s + '', e, r, n) : void 0
          a === void 0 && (a = i), Dt(e, s, a)
        }
      },
      vn,
    )
}
var $r = Nl(function (e, r, t) {
  $n(e, r, t)
})
const kr = {
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
  { fontSize: Jc, fontFamily: Qc, lineHeight: Zc } = kr,
  Rn = B(
    'body',
    `
 margin: 0;
 font-size: ${Jc};
 font-family: ${Qc};
 line-height: ${Zc};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`,
    [
      B(
        'input',
        `
 font-family: inherit;
 font-size: inherit;
 `,
      ),
    ],
  ),
  Me = 'n-config-provider',
  Fr = 'naive-ui-style'
function er(e, r, t, o, n, i) {
  const s = ht(),
    a = me(Me, null)
  if (t) {
    const f = () => {
      const v = i == null ? void 0 : i.value
      t.mount({
        id: v === void 0 ? r : v + r,
        head: !0,
        props: {
          bPrefix: v ? `.${v}-` : void 0,
        },
        anchorMetaName: Fr,
        ssr: s,
      }),
        (a != null && a.preflightStyleDisabled) ||
          Rn.mount({
            id: 'n-global',
            head: !0,
            anchorMetaName: Fr,
            ssr: s,
          })
    }
    s ? f() : jt(f)
  }
  return O(() => {
    var f
    const {
        theme: { common: v, self: p, peers: $ = {} } = {},
        themeOverrides: E = {},
        builtinThemeOverrides: u = {},
      } = n,
      { common: R, peers: y } = E,
      {
        common: x = void 0,
        [e]: { common: T = void 0, self: L = void 0, peers: S = {} } = {},
      } = (a == null ? void 0 : a.mergedThemeRef.value) || {},
      { common: M = void 0, [e]: D = {} } =
        (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {},
      { common: c, peers: m = {} } = D,
      w = $r({}, v || T || x || o.common, M, c, R),
      A = $r(
        // {}, executed every time, no need for empty obj
        (f = p || L || o.self) === null || f === void 0 ? void 0 : f(w),
        u,
        D,
        E,
      )
    return {
      common: w,
      self: A,
      peers: $r({}, o.peers, S, $),
      peerOverrides: $r({}, u.peers, m, y),
    }
  })
}
er.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object,
}
const at = 'n'
function Yt(
  e = {},
  r = {
    defaultBordered: !0,
  },
) {
  const t = me(Me, null)
  return {
    // NConfigProvider,
    inlineThemeDisabled: t == null ? void 0 : t.inlineThemeDisabled,
    mergedRtlRef: t == null ? void 0 : t.mergedRtlRef,
    mergedComponentPropsRef: t == null ? void 0 : t.mergedComponentPropsRef,
    mergedBreakpointsRef: t == null ? void 0 : t.mergedBreakpointsRef,
    mergedBorderedRef: O(() => {
      var o, n
      const { bordered: i } = e
      return i !== void 0
        ? i
        : (n =
              (o = t == null ? void 0 : t.mergedBorderedRef.value) !== null &&
              o !== void 0
                ? o
                : r.defaultBordered) !== null && n !== void 0
          ? n
          : !0
    }),
    mergedClsPrefixRef: t ? t.mergedClsPrefixRef : Ti(at),
    namespaceRef: O(() => (t == null ? void 0 : t.mergedNamespaceRef.value)),
  }
}
const eu = {
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
function $t(e) {
  return function () {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = r.width ? String(r.width) : e.defaultWidth,
      o = e.formats[t] || e.formats[e.defaultWidth]
    return o
  }
}
function Pr(e) {
  return function (r, t) {
    var o = t != null && t.context ? String(t.context) : 'standalone',
      n
    if (o === 'formatting' && e.formattingValues) {
      var i = e.defaultFormattingWidth || e.defaultWidth,
        s = t != null && t.width ? String(t.width) : i
      n = e.formattingValues[s] || e.formattingValues[i]
    } else {
      var a = e.defaultWidth,
        d = t != null && t.width ? String(t.width) : e.defaultWidth
      n = e.values[d] || e.values[a]
    }
    var f = e.argumentCallback ? e.argumentCallback(r) : r
    return n[f]
  }
}
function Tr(e) {
  return function (r) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      o = t.width,
      n = (o && e.matchPatterns[o]) || e.matchPatterns[e.defaultMatchWidth],
      i = r.match(n)
    if (!i) return null
    var s = i[0],
      a = (o && e.parsePatterns[o]) || e.parsePatterns[e.defaultParseWidth],
      d = Array.isArray(a)
        ? tu(a, function (p) {
            return p.test(s)
          })
        : ru(a, function (p) {
            return p.test(s)
          }),
      f
    ;(f = e.valueCallback ? e.valueCallback(d) : d),
      (f = t.valueCallback ? t.valueCallback(f) : f)
    var v = r.slice(s.length)
    return {
      value: f,
      rest: v,
    }
  }
}
function ru(e, r) {
  for (var t in e) if (e.hasOwnProperty(t) && r(e[t])) return t
}
function tu(e, r) {
  for (var t = 0; t < e.length; t++) if (r(e[t])) return t
}
function ou(e) {
  return function (r) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      o = r.match(e.matchPattern)
    if (!o) return null
    var n = o[0],
      i = r.match(e.parsePattern)
    if (!i) return null
    var s = e.valueCallback ? e.valueCallback(i[0]) : i[0]
    s = t.valueCallback ? t.valueCallback(s) : s
    var a = r.slice(n.length)
    return {
      value: s,
      rest: a,
    }
  }
}
var nu = {
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
  iu = function (r, t, o) {
    var n,
      i = nu[r]
    return (
      typeof i == 'string'
        ? (n = i)
        : t === 1
          ? (n = i.one)
          : (n = i.other.replace('{{count}}', t.toString())),
      o != null && o.addSuffix
        ? o.comparison && o.comparison > 0
          ? 'in ' + n
          : n + ' ago'
        : n
    )
  },
  au = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy',
  },
  lu = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a',
  },
  su = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}',
  },
  cu = {
    date: $t({
      formats: au,
      defaultWidth: 'full',
    }),
    time: $t({
      formats: lu,
      defaultWidth: 'full',
    }),
    dateTime: $t({
      formats: su,
      defaultWidth: 'full',
    }),
  },
  uu = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  },
  du = function (r, t, o, n) {
    return uu[r]
  },
  fu = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini'],
  },
  hu = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  },
  vu = {
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
  pu = {
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
  bu = {
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
  gu = {
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
  mu = function (r, t) {
    var o = Number(r),
      n = o % 100
    if (n > 20 || n < 10)
      switch (n % 10) {
        case 1:
          return o + 'st'
        case 2:
          return o + 'nd'
        case 3:
          return o + 'rd'
      }
    return o + 'th'
  },
  xu = {
    ordinalNumber: mu,
    era: Pr({
      values: fu,
      defaultWidth: 'wide',
    }),
    quarter: Pr({
      values: hu,
      defaultWidth: 'wide',
      argumentCallback: function (r) {
        return r - 1
      },
    }),
    month: Pr({
      values: vu,
      defaultWidth: 'wide',
    }),
    day: Pr({
      values: pu,
      defaultWidth: 'wide',
    }),
    dayPeriod: Pr({
      values: bu,
      defaultWidth: 'wide',
      formattingValues: gu,
      defaultFormattingWidth: 'wide',
    }),
  },
  yu = /^(\d+)(th|st|nd|rd)?/i,
  wu = /\d+/i,
  Cu = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  Su = {
    any: [/^b/i, /^(a|c)/i],
  },
  Pu = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  Tu = {
    any: [/1/i, /2/i, /3/i, /4/i],
  },
  $u = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  Ru = {
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
  zu = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  Eu = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  Bu = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  _u = {
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
  Ou = {
    ordinalNumber: ou({
      matchPattern: yu,
      parsePattern: wu,
      valueCallback: function (r) {
        return parseInt(r, 10)
      },
    }),
    era: Tr({
      matchPatterns: Cu,
      defaultMatchWidth: 'wide',
      parsePatterns: Su,
      defaultParseWidth: 'any',
    }),
    quarter: Tr({
      matchPatterns: Pu,
      defaultMatchWidth: 'wide',
      parsePatterns: Tu,
      defaultParseWidth: 'any',
      valueCallback: function (r) {
        return r + 1
      },
    }),
    month: Tr({
      matchPatterns: $u,
      defaultMatchWidth: 'wide',
      parsePatterns: Ru,
      defaultParseWidth: 'any',
    }),
    day: Tr({
      matchPatterns: zu,
      defaultMatchWidth: 'wide',
      parsePatterns: Eu,
      defaultParseWidth: 'any',
    }),
    dayPeriod: Tr({
      matchPatterns: Bu,
      defaultMatchWidth: 'any',
      parsePatterns: _u,
      defaultParseWidth: 'any',
    }),
  },
  Mu = {
    code: 'en-US',
    formatDistance: iu,
    formatLong: cu,
    formatRelative: du,
    localize: xu,
    match: Ou,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1,
    },
  }
const Hu = {
  name: 'en-US',
  locale: Mu,
}
function Au(e) {
  const { mergedLocaleRef: r, mergedDateLocaleRef: t } = me(Me, null) || {},
    o = O(() => {
      var i, s
      return (s =
        (i = r == null ? void 0 : r.value) === null || i === void 0
          ? void 0
          : i[e]) !== null && s !== void 0
        ? s
        : eu[e]
    })
  return {
    dateLocaleRef: O(() => {
      var i
      return (i = t == null ? void 0 : t.value) !== null && i !== void 0
        ? i
        : Hu
    }),
    localeRef: o,
  }
}
function jr(e, r, t) {
  if (!r) return
  const o = ht(),
    n = me(Me, null),
    i = () => {
      const s = t.value
      r.mount({
        id: s === void 0 ? e : s + e,
        head: !0,
        anchorMetaName: Fr,
        props: {
          bPrefix: s ? `.${s}-` : void 0,
        },
        ssr: o,
      }),
        (n != null && n.preflightStyleDisabled) ||
          Rn.mount({
            id: 'n-global',
            head: !0,
            anchorMetaName: Fr,
            ssr: o,
          })
    }
  o ? i() : jt(i)
}
function qt(e, r, t, o) {
  var n
  t || Ii('useThemeClass', 'cssVarsRef is not passed')
  const i =
      (n = me(Me, null)) === null || n === void 0
        ? void 0
        : n.mergedThemeHashRef,
    s = W(''),
    a = ht()
  let d
  const f = `__${e}`,
    v = () => {
      let p = f
      const $ = r ? r.value : void 0,
        E = i == null ? void 0 : i.value
      E && (p += '-' + E), $ && (p += '-' + $)
      const { themeOverrides: u, builtinThemeOverrides: R } = o
      u && (p += '-' + Mr(JSON.stringify(u))),
        R && (p += '-' + Mr(JSON.stringify(R))),
        (s.value = p),
        (d = () => {
          const y = t.value
          let x = ''
          for (const T in y) x += `${T}: ${y[T]};`
          B(`.${p}`, x).mount({
            id: p,
            ssr: a,
          }),
            (d = void 0)
        })
    }
  return (
    Or(() => {
      v()
    }),
    {
      themeClass: s,
      onRender: () => {
        d == null || d()
      },
    }
  )
}
function Kt(e, r, t) {
  if (!r) return
  const o = ht(),
    n = O(() => {
      const { value: s } = r
      if (!s) return
      const a = s[e]
      if (a) return a
    }),
    i = () => {
      Or(() => {
        const { value: s } = t,
          a = `${s}${e}Rtl`
        if (ia(a, o)) return
        const { value: d } = n
        d &&
          d.style.mount({
            id: a,
            head: !0,
            anchorMetaName: Fr,
            props: {
              bPrefix: s ? `.${s}-` : void 0,
            },
            ssr: o,
          })
      })
    }
  return o ? i() : jt(i), n
}
function Du(e, r) {
  return ce({
    name: Hc(e),
    setup() {
      var t
      const o =
        (t = me(Me, null)) === null || t === void 0 ? void 0 : t.mergedIconsRef
      return () => {
        var n
        const i =
          (n = o == null ? void 0 : o.value) === null || n === void 0
            ? void 0
            : n[e]
        return i ? i() : r
      }
    },
  })
}
const Fu = ce({
    name: 'Eye',
    render() {
      return b(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
        },
        b('path', {
          d: 'M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '32',
        }),
        b('circle', {
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
  Iu = ce({
    name: 'EyeOff',
    render() {
      return b(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
        },
        b('path', {
          d: 'M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z',
          fill: 'currentColor',
        }),
        b('path', {
          d: 'M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z',
          fill: 'currentColor',
        }),
        b('path', {
          d: 'M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z',
          fill: 'currentColor',
        }),
        b('path', {
          d: 'M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z',
          fill: 'currentColor',
        }),
        b('path', {
          d: 'M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z',
          fill: 'currentColor',
        }),
      )
    },
  }),
  Wu = ce({
    name: 'ChevronDown',
    render() {
      return b(
        'svg',
        {
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        b('path', {
          d: 'M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z',
          fill: 'currentColor',
        }),
      )
    },
  }),
  ku = Du(
    'clear',
    b(
      'svg',
      {
        viewBox: '0 0 16 16',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      b(
        'g',
        {
          stroke: 'none',
          'stroke-width': '1',
          fill: 'none',
          'fill-rule': 'evenodd',
        },
        b(
          'g',
          {
            fill: 'currentColor',
            'fill-rule': 'nonzero',
          },
          b('path', {
            d: 'M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z',
          }),
        ),
      ),
    ),
  ),
  Jt = ce({
    name: 'BaseIconSwitchTransition',
    setup(e, { slots: r }) {
      const t = ga()
      return () =>
        b(
          ot,
          {
            name: 'icon-switch-transition',
            appear: t.value,
          },
          r,
        )
    },
  }),
  ju = ce({
    name: 'FadeInExpandTransition',
    props: {
      appear: Boolean,
      group: Boolean,
      mode: String,
      onLeave: Function,
      onAfterLeave: Function,
      onAfterEnter: Function,
      width: Boolean,
      // reverse mode is only used in tree
      // it make it from expanded to collapsed after mounted
      reverse: Boolean,
    },
    setup(e, { slots: r }) {
      function t(a) {
        e.width
          ? (a.style.maxWidth = `${a.offsetWidth}px`)
          : (a.style.maxHeight = `${a.offsetHeight}px`),
          a.offsetWidth
      }
      function o(a) {
        e.width ? (a.style.maxWidth = '0') : (a.style.maxHeight = '0'),
          a.offsetWidth
        const { onLeave: d } = e
        d && d()
      }
      function n(a) {
        e.width ? (a.style.maxWidth = '') : (a.style.maxHeight = '')
        const { onAfterLeave: d } = e
        d && d()
      }
      function i(a) {
        if (((a.style.transition = 'none'), e.width)) {
          const d = a.offsetWidth
          ;(a.style.maxWidth = '0'),
            a.offsetWidth,
            (a.style.transition = ''),
            (a.style.maxWidth = `${d}px`)
        } else if (e.reverse)
          (a.style.maxHeight = `${a.offsetHeight}px`),
            a.offsetHeight,
            (a.style.transition = ''),
            (a.style.maxHeight = '0')
        else {
          const d = a.offsetHeight
          ;(a.style.maxHeight = '0'),
            a.offsetWidth,
            (a.style.transition = ''),
            (a.style.maxHeight = `${d}px`)
        }
        a.offsetWidth
      }
      function s(a) {
        var d
        e.width
          ? (a.style.maxWidth = '')
          : e.reverse || (a.style.maxHeight = ''),
          (d = e.onAfterEnter) === null || d === void 0 || d.call(e)
      }
      return () => {
        const { group: a, width: d, appear: f, mode: v } = e,
          p = a ? $i : ot,
          $ = {
            name: d
              ? 'fade-in-width-expand-transition'
              : 'fade-in-height-expand-transition',
            appear: f,
            onEnter: i,
            onAfterEnter: s,
            onBeforeLeave: t,
            onLeave: o,
            onAfterLeave: n,
          }
        return a || ($.mode = v), b(p, $, r)
      }
    },
  }),
  Lu = U(
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
      B(
        'svg',
        `
 height: 1em;
 width: 1em;
 `,
      ),
    ],
  ),
  lt = ce({
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
      jr('-base-icon', Lu, ir(e, 'clsPrefix'))
    },
    render() {
      return b(
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
  { cubicBezierEaseInOut: Nu } = kr
function st({
  originalTransform: e = '',
  left: r = 0,
  top: t = 0,
  transition: o = `all .3s ${Nu} !important`,
} = {}) {
  return [
    B(
      '&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to',
      {
        transform: e + ' scale(0.75)',
        left: r,
        top: t,
        opacity: 0,
      },
    ),
    B(
      '&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from',
      {
        transform: `scale(1) ${e}`,
        left: r,
        top: t,
        opacity: 1,
      },
    ),
    B(
      '&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active',
      {
        transformOrigin: 'center',
        position: 'absolute',
        left: r,
        top: t,
        transition: o,
      },
    ),
  ]
}
const Vu = B([
    B(
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
    U(
      'base-loading',
      `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,
      [
        C(
          'transition-wrapper',
          `
 position: absolute;
 width: 100%;
 height: 100%;
 `,
          [st()],
        ),
        C(
          'placeholder',
          `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,
          [
            st({
              left: '50%',
              top: '50%',
              originalTransform: 'translateX(-50%) translateY(-50%)',
            }),
          ],
        ),
        C(
          'container',
          `
 animation: rotator 3s linear infinite both;
 `,
          [
            C(
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
  Rt = '1.6s',
  Gu = {
    strokeWidth: {
      type: Number,
      default: 28,
    },
    stroke: {
      type: String,
      default: void 0,
    },
  },
  zn = ce({
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
      Gu,
    ),
    setup(e) {
      jr('-base-loading', Vu, ir(e, 'clsPrefix'))
    },
    render() {
      const {
          clsPrefix: e,
          radius: r,
          strokeWidth: t,
          stroke: o,
          scale: n,
        } = this,
        i = r / n
      return b(
        'div',
        {
          class: `${e}-base-loading`,
          role: 'img',
          'aria-label': 'loading',
        },
        b(Jt, null, {
          default: () =>
            this.show
              ? b(
                  'div',
                  {
                    key: 'icon',
                    class: `${e}-base-loading__transition-wrapper`,
                  },
                  b(
                    'div',
                    {
                      class: `${e}-base-loading__container`,
                    },
                    b(
                      'svg',
                      {
                        class: `${e}-base-loading__icon`,
                        viewBox: `0 0 ${2 * i} ${2 * i}`,
                        xmlns: 'http://www.w3.org/2000/svg',
                        style: {
                          color: o,
                        },
                      },
                      b(
                        'g',
                        null,
                        b('animateTransform', {
                          attributeName: 'transform',
                          type: 'rotate',
                          values: `0 ${i} ${i};270 ${i} ${i}`,
                          begin: '0s',
                          dur: Rt,
                          fill: 'freeze',
                          repeatCount: 'indefinite',
                        }),
                        b(
                          'circle',
                          {
                            class: `${e}-base-loading__icon`,
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': t,
                            'stroke-linecap': 'round',
                            cx: i,
                            cy: i,
                            r: r - t / 2,
                            'stroke-dasharray': 5.67 * r,
                            'stroke-dashoffset': 18.48 * r,
                          },
                          b('animateTransform', {
                            attributeName: 'transform',
                            type: 'rotate',
                            values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
                            begin: '0s',
                            dur: Rt,
                            fill: 'freeze',
                            repeatCount: 'indefinite',
                          }),
                          b('animate', {
                            attributeName: 'stroke-dashoffset',
                            values: `${5.67 * r};${1.42 * r};${5.67 * r}`,
                            begin: '0s',
                            dur: Rt,
                            fill: 'freeze',
                            repeatCount: 'indefinite',
                          }),
                        ),
                      ),
                    ),
                  ),
                )
              : b(
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
  z = {
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
  Uu = Je(z.neutralBase),
  En = Je(z.neutralInvertBase),
  Xu = 'rgba(' + En.slice(0, 3).join(', ') + ', '
function Fo(e) {
  return Xu + String(e) + ')'
}
function de(e) {
  const r = Array.from(En)
  return (r[3] = Number(e)), Lt(Uu, r)
}
const Qt = Object.assign(
    Object.assign(
      {
        name: 'common',
      },
      kr,
    ),
    {
      baseColor: z.neutralBase,
      // primary color
      primaryColor: z.primaryDefault,
      primaryColorHover: z.primaryHover,
      primaryColorPressed: z.primaryActive,
      primaryColorSuppl: z.primarySuppl,
      // info color
      infoColor: z.infoDefault,
      infoColorHover: z.infoHover,
      infoColorPressed: z.infoActive,
      infoColorSuppl: z.infoSuppl,
      // success color
      successColor: z.successDefault,
      successColorHover: z.successHover,
      successColorPressed: z.successActive,
      successColorSuppl: z.successSuppl,
      // warning color
      warningColor: z.warningDefault,
      warningColorHover: z.warningHover,
      warningColorPressed: z.warningActive,
      warningColorSuppl: z.warningSuppl,
      // error color
      errorColor: z.errorDefault,
      errorColorHover: z.errorHover,
      errorColorPressed: z.errorActive,
      errorColorSuppl: z.errorSuppl,
      // text color
      textColorBase: z.neutralTextBase,
      textColor1: 'rgb(31, 34, 37)',
      textColor2: 'rgb(51, 54, 57)',
      textColor3: 'rgb(118, 124, 130)',
      // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
      // textColor5: neutral(base.alpha5),
      textColorDisabled: de(z.alpha4),
      placeholderColor: de(z.alpha4),
      placeholderColorDisabled: de(z.alpha5),
      iconColor: de(z.alpha4),
      iconColorHover: Xr(de(z.alpha4), {
        lightness: 0.75,
      }),
      iconColorPressed: Xr(de(z.alpha4), {
        lightness: 0.9,
      }),
      iconColorDisabled: de(z.alpha5),
      opacity1: z.alpha1,
      opacity2: z.alpha2,
      opacity3: z.alpha3,
      opacity4: z.alpha4,
      opacity5: z.alpha5,
      dividerColor: 'rgb(239, 239, 245)',
      borderColor: 'rgb(224, 224, 230)',
      // close
      closeIconColor: de(Number(z.alphaClose)),
      closeIconColorHover: de(Number(z.alphaClose)),
      closeIconColorPressed: de(Number(z.alphaClose)),
      closeColorHover: 'rgba(0, 0, 0, .09)',
      closeColorPressed: 'rgba(0, 0, 0, .13)',
      // clear
      clearColor: de(z.alpha4),
      clearColorHover: Xr(de(z.alpha4), {
        lightness: 0.75,
      }),
      clearColorPressed: Xr(de(z.alpha4), {
        lightness: 0.9,
      }),
      scrollbarColor: Fo(z.alphaScrollbar),
      scrollbarColorHover: Fo(z.alphaScrollbarHover),
      scrollbarWidth: '5px',
      scrollbarHeight: '5px',
      scrollbarBorderRadius: '5px',
      progressRailColor: de(z.alphaProgressRail),
      railColor: 'rgb(219, 219, 223)',
      popoverColor: z.neutralPopover,
      tableColor: z.neutralCard,
      cardColor: z.neutralCard,
      modalColor: z.neutralModal,
      bodyColor: z.neutralBody,
      tagColor: '#eee',
      avatarColor: de(z.alphaAvatar),
      invertedColor: 'rgb(0, 20, 40)',
      inputColor: de(z.alphaInput),
      codeColor: 'rgb(244, 244, 248)',
      tabColor: 'rgb(247, 247, 250)',
      actionColor: 'rgb(250, 250, 252)',
      tableHeaderColor: 'rgb(250, 250, 252)',
      hoverColor: 'rgb(243, 243, 245)',
      // use color with alpha since it can be nested with header filter & sorter effect
      tableColorHover: 'rgba(0, 0, 100, 0.03)',
      tableColorStriped: 'rgba(0, 0, 100, 0.02)',
      pressedColor: 'rgb(237, 237, 239)',
      opacityDisabled: z.alphaDisabled,
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
  Yu = {
    railInsetHorizontal: 'auto 2px 4px 2px',
    railInsetVertical: '2px 4px 2px auto',
    railColor: 'transparent',
  },
  qu = (e) => {
    const {
      scrollbarColor: r,
      scrollbarColorHover: t,
      scrollbarHeight: o,
      scrollbarWidth: n,
      scrollbarBorderRadius: i,
    } = e
    return Object.assign(Object.assign({}, Yu), {
      height: o,
      width: n,
      borderRadius: i,
      color: r,
      colorHover: t,
    })
  },
  Ku = {
    name: 'Scrollbar',
    common: Qt,
    self: qu,
  },
  { cubicBezierEaseInOut: Io } = kr
function Ju({
  name: e = 'fade-in',
  enterDuration: r = '0.2s',
  leaveDuration: t = '0.2s',
  enterCubicBezier: o = Io,
  leaveCubicBezier: n = Io,
} = {}) {
  return [
    B(`&.${e}-transition-enter-active`, {
      transition: `all ${r} ${o}!important`,
    }),
    B(`&.${e}-transition-leave-active`, {
      transition: `all ${t} ${n}!important`,
    }),
    B(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
      opacity: 0,
    }),
    B(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
      opacity: 1,
    }),
  ]
}
const Qu = U(
    'scrollbar',
    `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,
    [
      B('>', [
        U(
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
            B(
              '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
              `
 width: 0;
 height: 0;
 display: none;
 `,
            ),
            B('>', [
              // We can't set overflow hidden since it affects positioning.
              U(
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
      B('>, +', [
        U(
          'scrollbar-rail',
          `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `,
          [
            te(
              'horizontal',
              `
 inset: var(--n-scrollbar-rail-inset-horizontal);
 height: var(--n-scrollbar-height);
 `,
              [
                B('>', [
                  C(
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
            te(
              'vertical',
              `
 inset: var(--n-scrollbar-rail-inset-vertical);
 width: var(--n-scrollbar-width);
 `,
              [
                B('>', [
                  C(
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
            te('disabled', [B('>', [C('scrollbar', 'pointer-events: none;')])]),
            B('>', [
              C(
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
                  Ju(),
                  B(
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
  Zu = Object.assign(Object.assign({}, er.props), {
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
  ed = ce({
    name: 'Scrollbar',
    props: Zu,
    inheritAttrs: !1,
    setup(e) {
      const {
          mergedClsPrefixRef: r,
          inlineThemeDisabled: t,
          mergedRtlRef: o,
        } = Yt(e),
        n = Kt('Scrollbar', o, r),
        i = W(null),
        s = W(null),
        a = W(null),
        d = W(null),
        f = W(null),
        v = W(null),
        p = W(null),
        $ = W(null),
        E = W(null),
        u = W(null),
        R = W(null),
        y = W(0),
        x = W(0),
        T = W(!1),
        L = W(!1)
      let S = !1,
        M = !1,
        D,
        c,
        m = 0,
        w = 0,
        A = 0,
        F = 0
      const I = xa(),
        Z = er('Scrollbar', '-scrollbar', Qu, Ku, e, r),
        G = O(() => {
          const { value: g } = $,
            { value: P } = v,
            { value: H } = u
          return g === null || P === null || H === null
            ? 0
            : Math.min(g, (H * g) / P + oo(Z.value.self.width) * 1.5)
        }),
        Y = O(() => `${G.value}px`),
        X = O(() => {
          const { value: g } = E,
            { value: P } = p,
            { value: H } = R
          return g === null || P === null || H === null
            ? 0
            : (H * g) / P + oo(Z.value.self.height) * 1.5
        }),
        k = O(() => `${X.value}px`),
        ne = O(() => {
          const { value: g } = $,
            { value: P } = y,
            { value: H } = v,
            { value: q } = u
          if (g === null || H === null || q === null) return 0
          {
            const ie = H - g
            return ie ? (P / ie) * (q - G.value) : 0
          }
        }),
        ve = O(() => `${ne.value}px`),
        le = O(() => {
          const { value: g } = E,
            { value: P } = x,
            { value: H } = p,
            { value: q } = R
          if (g === null || H === null || q === null) return 0
          {
            const ie = H - g
            return ie ? (P / ie) * (q - X.value) : 0
          }
        }),
        ge = O(() => `${le.value}px`),
        we = O(() => {
          const { value: g } = $,
            { value: P } = v
          return g !== null && P !== null && P > g
        }),
        rr = O(() => {
          const { value: g } = E,
            { value: P } = p
          return g !== null && P !== null && P > g
        }),
        $e = O(() => {
          const { trigger: g } = e
          return g === 'none' || T.value
        }),
        Re = O(() => {
          const { trigger: g } = e
          return g === 'none' || L.value
        }),
        V = O(() => {
          const { container: g } = e
          return g ? g() : s.value
        }),
        ze = O(() => {
          const { content: g } = e
          return g ? g() : a.value
        }),
        He = Ua(() => {
          e.container ||
            Ee({
              top: y.value,
              left: x.value,
            })
        }),
        N = () => {
          He.isDeactivated || Se()
        },
        Ae = (g) => {
          if (He.isDeactivated) return
          const { onResize: P } = e
          P && P(g), Se()
        },
        Ee = (g, P) => {
          if (!e.scrollable) return
          if (typeof g == 'number') {
            xe(g, P ?? 0, 0, !1, 'auto')
            return
          }
          const {
            left: H,
            top: q,
            index: ie,
            elSize: ue,
            position: be,
            behavior: J,
            el: he,
            debounce: Ie = !0,
          } = g
          ;(H !== void 0 || q !== void 0) && xe(H ?? 0, q ?? 0, 0, !1, J),
            he !== void 0
              ? xe(0, he.offsetTop, he.offsetHeight, Ie, J)
              : ie !== void 0 && ue !== void 0
                ? xe(0, ie * ue, ue, Ie, J)
                : be === 'bottom'
                  ? xe(0, Number.MAX_SAFE_INTEGER, 0, !1, J)
                  : be === 'top' && xe(0, 0, 0, !1, J)
        },
        hr = (g, P) => {
          if (!e.scrollable) return
          const { value: H } = V
          H && (typeof g == 'object' ? H.scrollBy(g) : H.scrollBy(g, P || 0))
        }
      function xe(g, P, H, q, ie) {
        const { value: ue } = V
        if (ue) {
          if (q) {
            const { scrollTop: be, offsetHeight: J } = ue
            if (P > be) {
              P + H <= be + J ||
                ue.scrollTo({
                  left: g,
                  top: P + H - J,
                  behavior: ie,
                })
              return
            }
          }
          ue.scrollTo({
            left: g,
            top: P,
            behavior: ie,
          })
        }
      }
      function vr() {
        gr(), ee(), Se()
      }
      function pr() {
        De()
      }
      function De() {
        br(), Be()
      }
      function br() {
        c !== void 0 && window.clearTimeout(c),
          (c = window.setTimeout(() => {
            L.value = !1
          }, e.duration))
      }
      function Be() {
        D !== void 0 && window.clearTimeout(D),
          (D = window.setTimeout(() => {
            T.value = !1
          }, e.duration))
      }
      function gr() {
        D !== void 0 && window.clearTimeout(D), (T.value = !0)
      }
      function ee() {
        c !== void 0 && window.clearTimeout(c), (L.value = !0)
      }
      function ae(g) {
        const { onScroll: P } = e
        P && P(g), Ce()
      }
      function Ce() {
        const { value: g } = V
        g &&
          ((y.value = g.scrollTop),
          (x.value = g.scrollLeft * (n != null && n.value ? -1 : 1)))
      }
      function gt() {
        const { value: g } = ze
        g && ((v.value = g.offsetHeight), (p.value = g.offsetWidth))
        const { value: P } = V
        P && (($.value = P.offsetHeight), (E.value = P.offsetWidth))
        const { value: H } = f,
          { value: q } = d
        H && (R.value = H.offsetWidth), q && (u.value = q.offsetHeight)
      }
      function Fe() {
        const { value: g } = V
        g &&
          ((y.value = g.scrollTop),
          (x.value = g.scrollLeft * (n != null && n.value ? -1 : 1)),
          ($.value = g.offsetHeight),
          (E.value = g.offsetWidth),
          (v.value = g.scrollHeight),
          (p.value = g.scrollWidth))
        const { value: P } = f,
          { value: H } = d
        P && (R.value = P.offsetWidth), H && (u.value = H.offsetHeight)
      }
      function Se() {
        e.scrollable && (e.useUnifiedContainer ? Fe() : (gt(), Ce()))
      }
      function Lr(g) {
        var P
        return !(!((P = i.value) === null || P === void 0) && P.contains(zi(g)))
      }
      function mt(g) {
        g.preventDefault(),
          g.stopPropagation(),
          (M = !0),
          Ye('mousemove', window, mr, !0),
          Ye('mouseup', window, Nr, !0),
          (w = x.value),
          (A = n != null && n.value ? window.innerWidth - g.clientX : g.clientX)
      }
      function mr(g) {
        if (!M) return
        D !== void 0 && window.clearTimeout(D),
          c !== void 0 && window.clearTimeout(c)
        const { value: P } = E,
          { value: H } = p,
          { value: q } = X
        if (P === null || H === null) return
        const ue =
            ((n != null && n.value
              ? window.innerWidth - g.clientX - A
              : g.clientX - A) *
              (H - P)) /
            (P - q),
          be = H - P
        let J = w + ue
        ;(J = Math.min(be, J)), (J = Math.max(J, 0))
        const { value: he } = V
        if (he) {
          he.scrollLeft = J * (n != null && n.value ? -1 : 1)
          const { internalOnUpdateScrollLeft: Ie } = e
          Ie && Ie(J)
        }
      }
      function Nr(g) {
        g.preventDefault(),
          g.stopPropagation(),
          Pe('mousemove', window, mr, !0),
          Pe('mouseup', window, Nr, !0),
          (M = !1),
          Se(),
          Lr(g) && De()
      }
      function xt(g) {
        g.preventDefault(),
          g.stopPropagation(),
          (S = !0),
          Ye('mousemove', window, xr, !0),
          Ye('mouseup', window, yr, !0),
          (m = y.value),
          (F = g.clientY)
      }
      function xr(g) {
        if (!S) return
        D !== void 0 && window.clearTimeout(D),
          c !== void 0 && window.clearTimeout(c)
        const { value: P } = $,
          { value: H } = v,
          { value: q } = G
        if (P === null || H === null) return
        const ue = ((g.clientY - F) * (H - P)) / (P - q),
          be = H - P
        let J = m + ue
        ;(J = Math.min(be, J)), (J = Math.max(J, 0))
        const { value: he } = V
        he && (he.scrollTop = J)
      }
      function yr(g) {
        g.preventDefault(),
          g.stopPropagation(),
          Pe('mousemove', window, xr, !0),
          Pe('mouseup', window, yr, !0),
          (S = !1),
          Se(),
          Lr(g) && De()
      }
      Or(() => {
        const { value: g } = rr,
          { value: P } = we,
          { value: H } = r,
          { value: q } = f,
          { value: ie } = d
        q &&
          (g
            ? q.classList.remove(`${H}-scrollbar-rail--disabled`)
            : q.classList.add(`${H}-scrollbar-rail--disabled`)),
          ie &&
            (P
              ? ie.classList.remove(`${H}-scrollbar-rail--disabled`)
              : ie.classList.add(`${H}-scrollbar-rail--disabled`))
      }),
        ct(() => {
          e.container || Se()
        }),
        ut(() => {
          D !== void 0 && window.clearTimeout(D),
            c !== void 0 && window.clearTimeout(c),
            Pe('mousemove', window, xr, !0),
            Pe('mouseup', window, yr, !0)
        })
      const Vr = O(() => {
          const {
            common: { cubicBezierEaseInOut: g },
            self: {
              color: P,
              colorHover: H,
              height: q,
              width: ie,
              borderRadius: ue,
              railInsetHorizontal: be,
              railInsetVertical: J,
              railColor: he,
            },
          } = Z.value
          return {
            '--n-scrollbar-bezier': g,
            '--n-scrollbar-color': P,
            '--n-scrollbar-color-hover': H,
            '--n-scrollbar-border-radius': ue,
            '--n-scrollbar-width': ie,
            '--n-scrollbar-height': q,
            '--n-scrollbar-rail-inset-horizontal': be,
            '--n-scrollbar-rail-inset-vertical':
              n != null && n.value ? ji(J) : J,
            '--n-scrollbar-rail-color': he,
          }
        }),
        _e = t ? qt('scrollbar', void 0, Vr, e) : void 0
      return Object.assign(
        Object.assign(
          {},
          {
            scrollTo: Ee,
            scrollBy: hr,
            sync: Se,
            syncUnifiedContainer: Fe,
            handleMouseEnterWrapper: vr,
            handleMouseLeaveWrapper: pr,
          },
        ),
        {
          mergedClsPrefix: r,
          rtlEnabled: n,
          containerScrollTop: y,
          wrapperRef: i,
          containerRef: s,
          contentRef: a,
          yRailRef: d,
          xRailRef: f,
          needYBar: we,
          needXBar: rr,
          yBarSizePx: Y,
          xBarSizePx: k,
          yBarTopPx: ve,
          xBarLeftPx: ge,
          isShowXBar: $e,
          isShowYBar: Re,
          isIos: I,
          handleScroll: ae,
          handleContentResize: N,
          handleContainerResize: Ae,
          handleYScrollMouseDown: xt,
          handleXScrollMouseDown: mt,
          cssVars: t ? void 0 : Vr,
          themeClass: _e == null ? void 0 : _e.themeClass,
          onRender: _e == null ? void 0 : _e.onRender,
        },
      )
    },
    render() {
      var e
      const {
        $slots: r,
        mergedClsPrefix: t,
        triggerDisplayManually: o,
        rtlEnabled: n,
        internalHoistYRail: i,
      } = this
      if (!this.scrollable)
        return (e = r.default) === null || e === void 0 ? void 0 : e.call(r)
      const s = this.trigger === 'none',
        a = (v, p) =>
          b(
            'div',
            {
              ref: 'yRailRef',
              class: [
                `${t}-scrollbar-rail`,
                `${t}-scrollbar-rail--vertical`,
                v,
              ],
              'data-scrollbar-rail': !0,
              style: [p || '', this.verticalRailStyle],
              'aria-hidden': !0,
            },
            b(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              s ? io : ot,
              s
                ? null
                : {
                    name: 'fade-in-transition',
                  },
              {
                default: () =>
                  this.needYBar && this.isShowYBar && !this.isIos
                    ? b('div', {
                        class: `${t}-scrollbar-rail__scrollbar`,
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
        d = () => {
          var v, p
          return (
            (v = this.onRender) === null || v === void 0 || v.call(this),
            b(
              'div',
              Ri(this.$attrs, {
                role: 'none',
                ref: 'wrapperRef',
                class: [
                  `${t}-scrollbar`,
                  this.themeClass,
                  n && `${t}-scrollbar--rtl`,
                ],
                style: this.cssVars,
                onMouseenter: o ? void 0 : this.handleMouseEnterWrapper,
                onMouseleave: o ? void 0 : this.handleMouseLeaveWrapper,
              }),
              [
                this.container
                  ? (p = r.default) === null || p === void 0
                    ? void 0
                    : p.call(r)
                  : b(
                      'div',
                      {
                        role: 'none',
                        ref: 'containerRef',
                        class: [
                          `${t}-scrollbar-container`,
                          this.containerClass,
                        ],
                        style: this.containerStyle,
                        onScroll: this.handleScroll,
                        onWheel: this.onWheel,
                      },
                      b(
                        Ot,
                        {
                          onResize: this.handleContentResize,
                        },
                        {
                          default: () =>
                            b(
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
                                  `${t}-scrollbar-content`,
                                  this.contentClass,
                                ],
                              },
                              r,
                            ),
                        },
                      ),
                    ),
                i ? null : a(void 0, void 0),
                this.xScrollable &&
                  b(
                    'div',
                    {
                      ref: 'xRailRef',
                      class: [
                        `${t}-scrollbar-rail`,
                        `${t}-scrollbar-rail--horizontal`,
                      ],
                      style: this.horizontalRailStyle,
                      'data-scrollbar-rail': !0,
                      'aria-hidden': !0,
                    },
                    b(
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      s ? io : ot,
                      s
                        ? null
                        : {
                            name: 'fade-in-transition',
                          },
                      {
                        default: () =>
                          this.needXBar && this.isShowXBar && !this.isIos
                            ? b('div', {
                                class: `${t}-scrollbar-rail__scrollbar`,
                                style: {
                                  width: this.xBarSizePx,
                                  right: n ? this.xBarLeftPx : void 0,
                                  left: n ? void 0 : this.xBarLeftPx,
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
        f = this.container
          ? d()
          : b(
              Ot,
              {
                onResize: this.handleContainerResize,
              },
              {
                default: d,
              },
            )
      return i ? b(Wt, null, f, a(this.themeClass, this.cssVars)) : f
    },
  }),
  rd = U(
    'base-wave',
    `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`,
  ),
  td = ce({
    name: 'BaseWave',
    props: {
      clsPrefix: {
        type: String,
        required: !0,
      },
    },
    setup(e) {
      jr('-base-wave', rd, ir(e, 'clsPrefix'))
      const r = W(null),
        t = W(!1)
      let o = null
      return (
        ut(() => {
          o !== null && window.clearTimeout(o)
        }),
        {
          active: t,
          selfRef: r,
          play() {
            o !== null && (window.clearTimeout(o), (t.value = !1), (o = null)),
              zt(() => {
                var n
                ;(n = r.value) === null || n === void 0 || n.offsetHeight,
                  (t.value = !0),
                  (o = window.setTimeout(() => {
                    ;(t.value = !1), (o = null)
                  }, 1e3))
              })
          },
        }
      )
    },
    render() {
      const { clsPrefix: e } = this
      return b('div', {
        ref: 'selfRef',
        'aria-hidden': !0,
        class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`],
      })
    },
  }),
  od = U(
    'base-clear',
    `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`,
    [
      B('>', [
        C(
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
            B(
              '&:hover',
              `
 color: var(--n-clear-color-hover)!important;
 `,
            ),
            B(
              '&:active',
              `
 color: var(--n-clear-color-pressed)!important;
 `,
            ),
          ],
        ),
        C(
          'placeholder',
          `
 display: flex;
 `,
        ),
        C(
          'clear, placeholder',
          `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,
          [
            st({
              originalTransform: 'translateX(-50%) translateY(-50%)',
              left: '50%',
              top: '50%',
            }),
          ],
        ),
      ]),
    ],
  ),
  It = ce({
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
        jr('-base-clear', od, ir(e, 'clsPrefix')),
        {
          handleMouseDown(r) {
            r.preventDefault()
          },
        }
      )
    },
    render() {
      const { clsPrefix: e } = this
      return b(
        'div',
        {
          class: `${e}-base-clear`,
        },
        b(Jt, null, {
          default: () => {
            var r, t
            return this.show
              ? b(
                  'div',
                  {
                    key: 'dismiss',
                    class: `${e}-base-clear__clear`,
                    onClick: this.onClear,
                    onMousedown: this.handleMouseDown,
                    'data-clear': !0,
                  },
                  zr(this.$slots.icon, () => [
                    b(
                      lt,
                      {
                        clsPrefix: e,
                      },
                      {
                        default: () => b(ku, null),
                      },
                    ),
                  ]),
                )
              : b(
                  'div',
                  {
                    key: 'icon',
                    class: `${e}-base-clear__placeholder`,
                  },
                  (t = (r = this.$slots).placeholder) === null || t === void 0
                    ? void 0
                    : t.call(r),
                )
          },
        }),
      )
    },
  }),
  nd = ce({
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
    setup(e, { slots: r }) {
      return () => {
        const { clsPrefix: t } = e
        return b(
          zn,
          {
            clsPrefix: t,
            class: `${t}-base-suffix`,
            strokeWidth: 24,
            scale: 0.85,
            show: e.loading,
          },
          {
            default: () =>
              e.showArrow
                ? b(
                    It,
                    {
                      clsPrefix: t,
                      show: e.showClear,
                      onClear: e.onClear,
                    },
                    {
                      placeholder: () =>
                        b(
                          lt,
                          {
                            clsPrefix: t,
                            class: `${t}-base-suffix__arrow`,
                          },
                          {
                            default: () => zr(r.default, () => [b(Wu, null)]),
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
  { cubicBezierEaseInOut: Oe } = kr
function id({ duration: e = '.2s', delay: r = '.1s' } = {}) {
  return [
    B(
      '&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to',
      {
        opacity: 1,
      },
    ),
    B(
      '&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from',
      `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `,
    ),
    B(
      '&.fade-in-width-expand-transition-leave-active',
      `
 overflow: hidden;
 transition:
 opacity ${e} ${Oe},
 max-width ${e} ${Oe} ${r},
 margin-left ${e} ${Oe} ${r},
 margin-right ${e} ${Oe} ${r};
 `,
    ),
    B(
      '&.fade-in-width-expand-transition-enter-active',
      `
 overflow: hidden;
 transition:
 opacity ${e} ${Oe} ${r},
 max-width ${e} ${Oe},
 margin-left ${e} ${Oe},
 margin-right ${e} ${Oe};
 `,
    ),
  ]
}
const ad = ft && 'chrome' in window
ft && navigator.userAgent.includes('Firefox')
const Bn = ft && navigator.userAgent.includes('Safari') && !ad,
  ld = {
    paddingTiny: '0 8px',
    paddingSmall: '0 10px',
    paddingMedium: '0 12px',
    paddingLarge: '0 14px',
    clearSize: '16px',
  },
  sd = (e) => {
    const {
      textColor2: r,
      textColor3: t,
      textColorDisabled: o,
      primaryColor: n,
      primaryColorHover: i,
      inputColor: s,
      inputColorDisabled: a,
      borderColor: d,
      warningColor: f,
      warningColorHover: v,
      errorColor: p,
      errorColorHover: $,
      borderRadius: E,
      lineHeight: u,
      fontSizeTiny: R,
      fontSizeSmall: y,
      fontSizeMedium: x,
      fontSizeLarge: T,
      heightTiny: L,
      heightSmall: S,
      heightMedium: M,
      heightLarge: D,
      actionColor: c,
      clearColor: m,
      clearColorHover: w,
      clearColorPressed: A,
      placeholderColor: F,
      placeholderColorDisabled: I,
      iconColor: Z,
      iconColorDisabled: G,
      iconColorHover: Y,
      iconColorPressed: X,
    } = e
    return Object.assign(Object.assign({}, ld), {
      countTextColorDisabled: o,
      countTextColor: t,
      heightTiny: L,
      heightSmall: S,
      heightMedium: M,
      heightLarge: D,
      fontSizeTiny: R,
      fontSizeSmall: y,
      fontSizeMedium: x,
      fontSizeLarge: T,
      lineHeight: u,
      lineHeightTextarea: u,
      borderRadius: E,
      iconSize: '16px',
      groupLabelColor: c,
      groupLabelTextColor: r,
      textColor: r,
      textColorDisabled: o,
      textDecorationColor: r,
      caretColor: n,
      placeholderColor: F,
      placeholderColorDisabled: I,
      color: s,
      colorDisabled: a,
      colorFocus: s,
      groupLabelBorder: `1px solid ${d}`,
      border: `1px solid ${d}`,
      borderHover: `1px solid ${i}`,
      borderDisabled: `1px solid ${d}`,
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 0 2px ${Xe(n, {
        alpha: 0.2,
      })}`,
      loadingColor: n,
      // warning
      loadingColorWarning: f,
      borderWarning: `1px solid ${f}`,
      borderHoverWarning: `1px solid ${v}`,
      colorFocusWarning: s,
      borderFocusWarning: `1px solid ${v}`,
      boxShadowFocusWarning: `0 0 0 2px ${Xe(f, {
        alpha: 0.2,
      })}`,
      caretColorWarning: f,
      // error
      loadingColorError: p,
      borderError: `1px solid ${p}`,
      borderHoverError: `1px solid ${$}`,
      colorFocusError: s,
      borderFocusError: `1px solid ${$}`,
      boxShadowFocusError: `0 0 0 2px ${Xe(p, {
        alpha: 0.2,
      })}`,
      caretColorError: p,
      clearColor: m,
      clearColorHover: w,
      clearColorPressed: A,
      iconColor: Z,
      iconColorDisabled: G,
      iconColorHover: Y,
      iconColorPressed: X,
      suffixTextColor: r,
    })
  },
  cd = {
    name: 'Input',
    common: Qt,
    self: sd,
  },
  _n = 'n-input'
function ud(e) {
  let r = 0
  for (const t of e) r++
  return r
}
function Zr(e) {
  return e === '' || e == null
}
function dd(e) {
  const r = W(null)
  function t() {
    const { value: i } = e
    if (!(i != null && i.focus)) {
      n()
      return
    }
    const { selectionStart: s, selectionEnd: a, value: d } = i
    if (s == null || a == null) {
      n()
      return
    }
    r.value = {
      start: s,
      end: a,
      beforeText: d.slice(0, s),
      afterText: d.slice(a),
    }
  }
  function o() {
    var i
    const { value: s } = r,
      { value: a } = e
    if (!s || !a) return
    const { value: d } = a,
      { start: f, beforeText: v, afterText: p } = s
    let $ = d.length
    if (d.endsWith(p)) $ = d.length - p.length
    else if (d.startsWith(v)) $ = v.length
    else {
      const E = v[f - 1],
        u = d.indexOf(E, f - 1)
      u !== -1 && ($ = u + 1)
    }
    ;(i = a.setSelectionRange) === null || i === void 0 || i.call(a, $, $)
  }
  function n() {
    r.value = null
  }
  return (
    _r(e, n),
    {
      recordCursor: t,
      restoreCursor: o,
    }
  )
}
const Wo = ce({
    name: 'InputWordCount',
    setup(e, { slots: r }) {
      const {
          mergedValueRef: t,
          maxlengthRef: o,
          mergedClsPrefixRef: n,
          countGraphemesRef: i,
        } =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          me(_n),
        s = O(() => {
          const { value: a } = t
          return a === null || Array.isArray(a) ? 0 : (i.value || ud)(a)
        })
      return () => {
        const { value: a } = o,
          { value: d } = t
        return b(
          'span',
          {
            class: `${n.value}-input-word-count`,
          },
          Wi(
            r.default,
            {
              value: d === null || Array.isArray(d) ? '' : d,
            },
            () => [a === void 0 ? s.value : `${s.value} / ${a}`],
          ),
        )
      }
    },
  }),
  fd = U(
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
      C(
        'input, textarea',
        `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `,
      ),
      C(
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
      C(
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
          B(
            '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
            `
 width: 0;
 height: 0;
 display: none;
 `,
          ),
          B(
            '&::placeholder',
            `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `,
          ),
          B('&:-webkit-autofill ~', [C('placeholder', 'display: none;')]),
        ],
      ),
      te('round', [
        Ne('textarea', 'border-radius: calc(var(--n-height) / 2);'),
      ]),
      C(
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
          B(
            'span',
            `
 width: 100%;
 display: inline-block;
 `,
          ),
        ],
      ),
      te('textarea', [C('placeholder', 'overflow: visible;')]),
      Ne('autosize', 'width: 100%;'),
      te('autosize', [
        C(
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
      U(
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
      C(
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
      C(
        'input-el',
        `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,
        [
          B('&[type=password]::-ms-reveal', 'display: none;'),
          B('+', [
            C(
              'placeholder',
              `
 display: flex;
 align-items: center; 
 `,
            ),
          ]),
        ],
      ),
      Ne('textarea', [C('placeholder', 'white-space: nowrap;')]),
      C(
        'eye',
        `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `,
      ),
      // textarea
      te('textarea', 'width: 100%;', [
        U(
          'input-word-count',
          `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `,
        ),
        te('resizable', [
          U(
            'input-wrapper',
            `
 resize: vertical;
 min-height: var(--n-height);
 `,
          ),
        ]),
        C(
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
        C(
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
      te('pair', [
        C('input-el, placeholder', 'text-align: center;'),
        C(
          'separator',
          `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,
          [
            U(
              'icon',
              `
 color: var(--n-icon-color);
 `,
            ),
            U(
              'base-icon',
              `
 color: var(--n-icon-color);
 `,
            ),
          ],
        ),
      ]),
      te(
        'disabled',
        `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,
        [
          C('border', 'border: var(--n-border-disabled);'),
          C(
            'input-el, textarea-el',
            `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `,
          ),
          C('placeholder', 'color: var(--n-placeholder-color-disabled);'),
          C('separator', 'color: var(--n-text-color-disabled);', [
            U(
              'icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
            U(
              'base-icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
          ]),
          U(
            'input-word-count',
            `
 color: var(--n-count-text-color-disabled);
 `,
          ),
          C('suffix, prefix', 'color: var(--n-text-color-disabled);', [
            U(
              'icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
            U(
              'internal-icon',
              `
 color: var(--n-icon-color-disabled);
 `,
            ),
          ]),
        ],
      ),
      Ne('disabled', [
        C(
          'eye',
          `
 color: var(--n-icon-color);
 cursor: pointer;
 `,
          [
            B(
              '&:hover',
              `
 color: var(--n-icon-color-hover);
 `,
            ),
            B(
              '&:active',
              `
 color: var(--n-icon-color-pressed);
 `,
            ),
          ],
        ),
        B('&:hover', [C('state-border', 'border: var(--n-border-hover);')]),
        te('focus', 'background-color: var(--n-color-focus);', [
          C(
            'state-border',
            `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `,
          ),
        ]),
      ]),
      C(
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
      C(
        'state-border',
        `
 border-color: #0000;
 z-index: 1;
 `,
      ),
      C('prefix', 'margin-right: 4px;'),
      C(
        'suffix',
        `
 margin-left: 4px;
 `,
      ),
      C(
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
          U(
            'base-loading',
            `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `,
          ),
          U(
            'base-clear',
            `
 font-size: var(--n-icon-size);
 `,
            [
              C('placeholder', [
                U(
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
          B('>', [
            U(
              'icon',
              `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `,
            ),
          ]),
          U(
            'base-icon',
            `
 font-size: var(--n-icon-size);
 `,
          ),
        ],
      ),
      U(
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
        te(`${e}-status`, [
          Ne('disabled', [
            U(
              'base-loading',
              `
 color: var(--n-loading-color-${e})
 `,
            ),
            C(
              'input-el, textarea-el',
              `
 caret-color: var(--n-caret-color-${e});
 `,
            ),
            C(
              'state-border',
              `
 border: var(--n-border-${e});
 `,
            ),
            B('&:hover', [
              C(
                'state-border',
                `
 border: var(--n-border-hover-${e});
 `,
              ),
            ]),
            B(
              '&:focus',
              `
 background-color: var(--n-color-focus-${e});
 `,
              [
                C(
                  'state-border',
                  `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `,
                ),
              ],
            ),
            te(
              'focus',
              `
 background-color: var(--n-color-focus-${e});
 `,
              [
                C(
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
  hd = U('input', [
    te('disabled', [
      C(
        'input-el, textarea-el',
        `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `,
      ),
    ]),
  ]),
  vd = Object.assign(Object.assign({}, er.props), {
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
  Td = ce({
    name: 'Input',
    props: vd,
    setup(e) {
      const {
          mergedClsPrefixRef: r,
          mergedBorderedRef: t,
          inlineThemeDisabled: o,
          mergedRtlRef: n,
        } = Yt(e),
        i = er('Input', '-input', fd, cd, e, r)
      Bn && jr('-input-safari', hd, r)
      const s = W(null),
        a = W(null),
        d = W(null),
        f = W(null),
        v = W(null),
        p = W(null),
        $ = W(null),
        E = dd($),
        u = W(null),
        { localeRef: R } = Au('Input'),
        y = W(e.defaultValue),
        x = ir(e, 'value'),
        T = ba(x, y),
        L = en(e),
        { mergedSizeRef: S, mergedDisabledRef: M, mergedStatusRef: D } = L,
        c = W(!1),
        m = W(!1),
        w = W(!1),
        A = W(!1)
      let F = null
      const I = O(() => {
          const { placeholder: l, pair: h } = e
          return h
            ? Array.isArray(l)
              ? l
              : l === void 0
                ? ['', '']
                : [l, l]
            : l === void 0
              ? [R.value.placeholder]
              : [l]
        }),
        Z = O(() => {
          const { value: l } = w,
            { value: h } = T,
            { value: _ } = I
          return !l && (Zr(h) || (Array.isArray(h) && Zr(h[0]))) && _[0]
        }),
        G = O(() => {
          const { value: l } = w,
            { value: h } = T,
            { value: _ } = I
          return !l && _[1] && (Zr(h) || (Array.isArray(h) && Zr(h[1])))
        }),
        Y = Hr(() => e.internalForceFocus || c.value),
        X = Hr(() => {
          if (M.value || e.readonly || !e.clearable || (!Y.value && !m.value))
            return !1
          const { value: l } = T,
            { value: h } = Y
          return e.pair
            ? !!(Array.isArray(l) && (l[0] || l[1])) && (m.value || h)
            : !!l && (m.value || h)
        }),
        k = O(() => {
          const { showPasswordOn: l } = e
          if (l) return l
          if (e.showPasswordToggle) return 'click'
        }),
        ne = W(!1),
        ve = O(() => {
          const { textDecoration: l } = e
          return l
            ? Array.isArray(l)
              ? l.map((h) => ({
                  textDecoration: h,
                }))
              : [
                  {
                    textDecoration: l,
                  },
                ]
            : ['', '']
        }),
        le = W(void 0),
        ge = () => {
          var l, h
          if (e.type === 'textarea') {
            const { autosize: _ } = e
            if (
              (_ &&
                (le.value =
                  (h =
                    (l = u.value) === null || l === void 0 ? void 0 : l.$el) ===
                    null || h === void 0
                    ? void 0
                    : h.offsetWidth),
              !a.value || typeof _ == 'boolean')
            )
              return
            const {
                paddingTop: Q,
                paddingBottom: oe,
                lineHeight: K,
              } = window.getComputedStyle(a.value),
              We = Number(Q.slice(0, -2)),
              ke = Number(oe.slice(0, -2)),
              je = Number(K.slice(0, -2)),
              { value: wr } = d
            if (!wr) return
            if (_.minRows) {
              const Cr = Math.max(_.minRows, 1),
                yt = `${We + ke + je * Cr}px`
              wr.style.minHeight = yt
            }
            if (_.maxRows) {
              const Cr = `${We + ke + je * _.maxRows}px`
              wr.style.maxHeight = Cr
            }
          }
        },
        we = O(() => {
          const { maxlength: l } = e
          return l === void 0 ? void 0 : Number(l)
        })
      ct(() => {
        const { value: l } = T
        Array.isArray(l) || he(l)
      })
      const rr = ko().proxy
      function $e(l, h) {
        const { onUpdateValue: _, 'onUpdate:value': Q, onInput: oe } = e,
          { nTriggerFormInput: K } = L
        _ && se(_, l, h),
          Q && se(Q, l, h),
          oe && se(oe, l, h),
          (y.value = l),
          K()
      }
      function Re(l, h) {
        const { onChange: _ } = e,
          { nTriggerFormChange: Q } = L
        _ && se(_, l, h), (y.value = l), Q()
      }
      function V(l) {
        const { onBlur: h } = e,
          { nTriggerFormBlur: _ } = L
        h && se(h, l), _()
      }
      function ze(l) {
        const { onFocus: h } = e,
          { nTriggerFormFocus: _ } = L
        h && se(h, l), _()
      }
      function He(l) {
        const { onClear: h } = e
        h && se(h, l)
      }
      function N(l) {
        const { onInputBlur: h } = e
        h && se(h, l)
      }
      function Ae(l) {
        const { onInputFocus: h } = e
        h && se(h, l)
      }
      function Ee() {
        const { onDeactivate: l } = e
        l && se(l)
      }
      function hr() {
        const { onActivate: l } = e
        l && se(l)
      }
      function xe(l) {
        const { onClick: h } = e
        h && se(h, l)
      }
      function vr(l) {
        const { onWrapperFocus: h } = e
        h && se(h, l)
      }
      function pr(l) {
        const { onWrapperBlur: h } = e
        h && se(h, l)
      }
      function De() {
        w.value = !0
      }
      function br(l) {
        ;(w.value = !1), l.target === p.value ? Be(l, 1) : Be(l, 0)
      }
      function Be(l, h = 0, _ = 'input') {
        const Q = l.target.value
        if (
          (he(Q),
          l instanceof InputEvent && !l.isComposing && (w.value = !1),
          e.type === 'textarea')
        ) {
          const { value: K } = u
          K && K.syncUnifiedContainer()
        }
        if (((F = Q), w.value)) return
        E.recordCursor()
        const oe = gr(Q)
        if (oe)
          if (!e.pair)
            _ === 'input'
              ? $e(Q, {
                  source: h,
                })
              : Re(Q, {
                  source: h,
                })
          else {
            let { value: K } = T
            Array.isArray(K) ? (K = [K[0], K[1]]) : (K = ['', '']),
              (K[h] = Q),
              _ === 'input'
                ? $e(K, {
                    source: h,
                  })
                : Re(K, {
                    source: h,
                  })
          }
        rr.$forceUpdate(), oe || zt(E.restoreCursor)
      }
      function gr(l) {
        const { countGraphemes: h, maxlength: _, minlength: Q } = e
        if (h) {
          let K
          if (
            (_ !== void 0 && (K === void 0 && (K = h(l)), K > Number(_))) ||
            (Q !== void 0 && (K === void 0 && (K = h(l)), K < Number(_)))
          )
            return !1
        }
        const { allowInput: oe } = e
        return typeof oe == 'function' ? oe(l) : !0
      }
      function ee(l) {
        N(l),
          l.relatedTarget === s.value && Ee(),
          (l.relatedTarget !== null &&
            (l.relatedTarget === v.value ||
              l.relatedTarget === p.value ||
              l.relatedTarget === a.value)) ||
            (A.value = !1),
          Fe(l, 'blur'),
          ($.value = null)
      }
      function ae(l, h) {
        Ae(l),
          (c.value = !0),
          (A.value = !0),
          hr(),
          Fe(l, 'focus'),
          h === 0
            ? ($.value = v.value)
            : h === 1
              ? ($.value = p.value)
              : h === 2 && ($.value = a.value)
      }
      function Ce(l) {
        e.passivelyActivated && (pr(l), Fe(l, 'blur'))
      }
      function gt(l) {
        e.passivelyActivated && ((c.value = !0), vr(l), Fe(l, 'focus'))
      }
      function Fe(l, h) {
        ;(l.relatedTarget !== null &&
          (l.relatedTarget === v.value ||
            l.relatedTarget === p.value ||
            l.relatedTarget === a.value ||
            l.relatedTarget === s.value)) ||
          (h === 'focus'
            ? (ze(l), (c.value = !0))
            : h === 'blur' && (V(l), (c.value = !1)))
      }
      function Se(l, h) {
        Be(l, h, 'change')
      }
      function Lr(l) {
        xe(l)
      }
      function mt(l) {
        He(l), mr()
      }
      function mr() {
        e.pair
          ? ($e(['', ''], {
              source: 'clear',
            }),
            Re(['', ''], {
              source: 'clear',
            }))
          : ($e('', {
              source: 'clear',
            }),
            Re('', {
              source: 'clear',
            }))
      }
      function Nr(l) {
        const { onMousedown: h } = e
        h && h(l)
        const { tagName: _ } = l.target
        if (_ !== 'INPUT' && _ !== 'TEXTAREA') {
          if (e.resizable) {
            const { value: Q } = s
            if (Q) {
              const {
                  left: oe,
                  top: K,
                  width: We,
                  height: ke,
                } = Q.getBoundingClientRect(),
                je = 14
              if (
                oe + We - je < l.clientX &&
                l.clientX < oe + We &&
                K + ke - je < l.clientY &&
                l.clientY < K + ke
              )
                return
            }
          }
          l.preventDefault(), c.value || H()
        }
      }
      function xt() {
        var l
        ;(m.value = !0),
          e.type === 'textarea' &&
            ((l = u.value) === null ||
              l === void 0 ||
              l.handleMouseEnterWrapper())
      }
      function xr() {
        var l
        ;(m.value = !1),
          e.type === 'textarea' &&
            ((l = u.value) === null ||
              l === void 0 ||
              l.handleMouseLeaveWrapper())
      }
      function yr() {
        M.value || (k.value === 'click' && (ne.value = !ne.value))
      }
      function Vr(l) {
        if (M.value) return
        l.preventDefault()
        const h = (Q) => {
          Q.preventDefault(), Pe('mouseup', document, h)
        }
        if ((Ye('mouseup', document, h), k.value !== 'mousedown')) return
        ne.value = !0
        const _ = () => {
          ;(ne.value = !1), Pe('mouseup', document, _)
        }
        Ye('mouseup', document, _)
      }
      function _e(l) {
        e.onKeyup && se(e.onKeyup, l)
      }
      function Zt(l) {
        switch ((e.onKeydown && se(e.onKeydown, l), l.key)) {
          case 'Escape':
            P()
            break
          case 'Enter':
            g(l)
            break
        }
      }
      function g(l) {
        var h, _
        if (e.passivelyActivated) {
          const { value: Q } = A
          if (Q) {
            e.internalDeactivateOnEnter && P()
            return
          }
          l.preventDefault(),
            e.type === 'textarea'
              ? (h = a.value) === null || h === void 0 || h.focus()
              : (_ = v.value) === null || _ === void 0 || _.focus()
        }
      }
      function P() {
        e.passivelyActivated &&
          ((A.value = !1),
          zt(() => {
            var l
            ;(l = s.value) === null || l === void 0 || l.focus()
          }))
      }
      function H() {
        var l, h, _
        M.value ||
          (e.passivelyActivated
            ? (l = s.value) === null || l === void 0 || l.focus()
            : ((h = a.value) === null || h === void 0 || h.focus(),
              (_ = v.value) === null || _ === void 0 || _.focus()))
      }
      function q() {
        var l
        !((l = s.value) === null || l === void 0) &&
          l.contains(document.activeElement) &&
          document.activeElement.blur()
      }
      function ie() {
        var l, h
        ;(l = a.value) === null || l === void 0 || l.select(),
          (h = v.value) === null || h === void 0 || h.select()
      }
      function ue() {
        M.value || (a.value ? a.value.focus() : v.value && v.value.focus())
      }
      function be() {
        const { value: l } = s
        l != null &&
          l.contains(document.activeElement) &&
          l !== document.activeElement &&
          P()
      }
      function J(l) {
        if (e.type === 'textarea') {
          const { value: h } = a
          h == null || h.scrollTo(l)
        } else {
          const { value: h } = v
          h == null || h.scrollTo(l)
        }
      }
      function he(l) {
        const { type: h, pair: _, autosize: Q } = e
        if (!_ && Q)
          if (h === 'textarea') {
            const { value: oe } = d
            oe &&
              (oe.textContent =
                (l ?? '') +
                `\r
`)
          } else {
            const { value: oe } = f
            oe && (l ? (oe.textContent = l) : (oe.innerHTML = '&nbsp;'))
          }
      }
      function Ie() {
        ge()
      }
      const eo = W({
        top: '0',
      })
      function On(l) {
        var h
        const { scrollTop: _ } = l.target
        ;(eo.value.top = `${-_}px`),
          (h = u.value) === null || h === void 0 || h.syncUnifiedContainer()
      }
      let Gr = null
      Or(() => {
        const { autosize: l, type: h } = e
        l && h === 'textarea'
          ? (Gr = _r(T, (_) => {
              !Array.isArray(_) && _ !== F && he(_)
            }))
          : Gr == null || Gr()
      })
      let Ur = null
      Or(() => {
        e.type === 'textarea'
          ? (Ur = _r(T, (l) => {
              var h
              !Array.isArray(l) &&
                l !== F &&
                ((h = u.value) === null ||
                  h === void 0 ||
                  h.syncUnifiedContainer())
            }))
          : Ur == null || Ur()
      }),
        kt(_n, {
          mergedValueRef: T,
          maxlengthRef: we,
          mergedClsPrefixRef: r,
          countGraphemesRef: ir(e, 'countGraphemes'),
        })
      const Mn = {
          wrapperElRef: s,
          inputElRef: v,
          textareaElRef: a,
          isCompositing: w,
          clear: mr,
          focus: H,
          blur: q,
          select: ie,
          deactivate: be,
          activate: ue,
          scrollTo: J,
        },
        Hn = Kt('Input', n, r),
        ro = O(() => {
          const { value: l } = S,
            {
              common: { cubicBezierEaseInOut: h },
              self: {
                color: _,
                borderRadius: Q,
                textColor: oe,
                caretColor: K,
                caretColorError: We,
                caretColorWarning: ke,
                textDecorationColor: je,
                border: wr,
                borderDisabled: Cr,
                borderHover: yt,
                borderFocus: An,
                placeholderColor: Dn,
                placeholderColorDisabled: Fn,
                lineHeightTextarea: In,
                colorDisabled: Wn,
                colorFocus: kn,
                textColorDisabled: jn,
                boxShadowFocus: Ln,
                iconSize: Nn,
                colorFocusWarning: Vn,
                boxShadowFocusWarning: Gn,
                borderWarning: Un,
                borderFocusWarning: Xn,
                borderHoverWarning: Yn,
                colorFocusError: qn,
                boxShadowFocusError: Kn,
                borderError: Jn,
                borderFocusError: Qn,
                borderHoverError: Zn,
                clearSize: ei,
                clearColor: ri,
                clearColorHover: ti,
                clearColorPressed: oi,
                iconColor: ni,
                iconColorDisabled: ii,
                suffixTextColor: ai,
                countTextColor: li,
                countTextColorDisabled: si,
                iconColorHover: ci,
                iconColorPressed: ui,
                loadingColor: di,
                loadingColorError: fi,
                loadingColorWarning: hi,
                [j('padding', l)]: vi,
                [j('fontSize', l)]: pi,
                [j('height', l)]: bi,
              },
            } = i.value,
            { left: gi, right: mi } = jo(vi)
          return {
            '--n-bezier': h,
            '--n-count-text-color': li,
            '--n-count-text-color-disabled': si,
            '--n-color': _,
            '--n-font-size': pi,
            '--n-border-radius': Q,
            '--n-height': bi,
            '--n-padding-left': gi,
            '--n-padding-right': mi,
            '--n-text-color': oe,
            '--n-caret-color': K,
            '--n-text-decoration-color': je,
            '--n-border': wr,
            '--n-border-disabled': Cr,
            '--n-border-hover': yt,
            '--n-border-focus': An,
            '--n-placeholder-color': Dn,
            '--n-placeholder-color-disabled': Fn,
            '--n-icon-size': Nn,
            '--n-line-height-textarea': In,
            '--n-color-disabled': Wn,
            '--n-color-focus': kn,
            '--n-text-color-disabled': jn,
            '--n-box-shadow-focus': Ln,
            '--n-loading-color': di,
            // form warning
            '--n-caret-color-warning': ke,
            '--n-color-focus-warning': Vn,
            '--n-box-shadow-focus-warning': Gn,
            '--n-border-warning': Un,
            '--n-border-focus-warning': Xn,
            '--n-border-hover-warning': Yn,
            '--n-loading-color-warning': hi,
            // form error
            '--n-caret-color-error': We,
            '--n-color-focus-error': qn,
            '--n-box-shadow-focus-error': Kn,
            '--n-border-error': Jn,
            '--n-border-focus-error': Qn,
            '--n-border-hover-error': Zn,
            '--n-loading-color-error': fi,
            // clear-button
            '--n-clear-color': ri,
            '--n-clear-size': ei,
            '--n-clear-color-hover': ti,
            '--n-clear-color-pressed': oi,
            '--n-icon-color': ni,
            '--n-icon-color-hover': ci,
            '--n-icon-color-pressed': ui,
            '--n-icon-color-disabled': ii,
            '--n-suffix-text-color': ai,
          }
        }),
        tr = o
          ? qt(
              'input',
              O(() => {
                const { value: l } = S
                return l[0]
              }),
              ro,
              e,
            )
          : void 0
      return Object.assign(Object.assign({}, Mn), {
        // DOM ref
        wrapperElRef: s,
        inputElRef: v,
        inputMirrorElRef: f,
        inputEl2Ref: p,
        textareaElRef: a,
        textareaMirrorElRef: d,
        textareaScrollbarInstRef: u,
        // value
        rtlEnabled: Hn,
        uncontrolledValue: y,
        mergedValue: T,
        passwordVisible: ne,
        mergedPlaceholder: I,
        showPlaceholder1: Z,
        showPlaceholder2: G,
        mergedFocus: Y,
        isComposing: w,
        activated: A,
        showClearButton: X,
        mergedSize: S,
        mergedDisabled: M,
        textDecorationStyle: ve,
        mergedClsPrefix: r,
        mergedBordered: t,
        mergedShowPasswordOn: k,
        placeholderStyle: eo,
        mergedStatus: D,
        textAreaScrollContainerWidth: le,
        // methods
        handleTextAreaScroll: On,
        handleCompositionStart: De,
        handleCompositionEnd: br,
        handleInput: Be,
        handleInputBlur: ee,
        handleInputFocus: ae,
        handleWrapperBlur: Ce,
        handleWrapperFocus: gt,
        handleMouseEnter: xt,
        handleMouseLeave: xr,
        handleMouseDown: Nr,
        handleChange: Se,
        handleClick: Lr,
        handleClear: mt,
        handlePasswordToggleClick: yr,
        handlePasswordToggleMousedown: Vr,
        handleWrapperKeydown: Zt,
        handleWrapperKeyup: _e,
        handleTextAreaMirrorResize: Ie,
        getTextareaScrollContainer: () => a.value,
        mergedTheme: i,
        cssVars: o ? void 0 : ro,
        themeClass: tr == null ? void 0 : tr.themeClass,
        onRender: tr == null ? void 0 : tr.onRender,
      })
    },
    render() {
      var e, r
      const {
          mergedClsPrefix: t,
          mergedStatus: o,
          themeClass: n,
          type: i,
          countGraphemes: s,
          onRender: a,
        } = this,
        d = this.$slots
      return (
        a == null || a(),
        b(
          'div',
          {
            ref: 'wrapperElRef',
            class: [
              `${t}-input`,
              n,
              o && `${t}-input--${o}-status`,
              {
                [`${t}-input--rtl`]: this.rtlEnabled,
                [`${t}-input--disabled`]: this.mergedDisabled,
                [`${t}-input--textarea`]: i === 'textarea',
                [`${t}-input--resizable`]: this.resizable && !this.autosize,
                [`${t}-input--autosize`]: this.autosize,
                [`${t}-input--round`]: this.round && i !== 'textarea',
                [`${t}-input--pair`]: this.pair,
                [`${t}-input--focus`]: this.mergedFocus,
                [`${t}-input--stateful`]: this.stateful,
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
          b(
            'div',
            {
              class: `${t}-input-wrapper`,
            },
            or(
              d.prefix,
              (f) =>
                f &&
                b(
                  'div',
                  {
                    class: `${t}-input__prefix`,
                  },
                  f,
                ),
            ),
            i === 'textarea'
              ? b(
                  ed,
                  {
                    ref: 'textareaScrollbarInstRef',
                    class: `${t}-input__textarea`,
                    container: this.getTextareaScrollContainer,
                    triggerDisplayManually: !0,
                    useUnifiedContainer: !0,
                    internalHoistYRail: !0,
                  },
                  {
                    default: () => {
                      var f, v
                      const { textAreaScrollContainerWidth: p } = this,
                        $ = {
                          width: this.autosize && p && `${p}px`,
                        }
                      return b(
                        Wt,
                        null,
                        b(
                          'textarea',
                          Object.assign({}, this.inputProps, {
                            ref: 'textareaElRef',
                            class: [
                              `${t}-input__textarea-el`,
                              (f = this.inputProps) === null || f === void 0
                                ? void 0
                                : f.class,
                            ],
                            autofocus: this.autofocus,
                            rows: Number(this.rows),
                            placeholder: this.placeholder,
                            value: this.mergedValue,
                            disabled: this.mergedDisabled,
                            maxlength: s ? void 0 : this.maxlength,
                            minlength: s ? void 0 : this.minlength,
                            readonly: this.readonly,
                            tabindex:
                              this.passivelyActivated && !this.activated
                                ? -1
                                : void 0,
                            style: [
                              this.textDecorationStyle[0],
                              (v = this.inputProps) === null || v === void 0
                                ? void 0
                                : v.style,
                              $,
                            ],
                            onBlur: this.handleInputBlur,
                            onFocus: (E) => {
                              this.handleInputFocus(E, 2)
                            },
                            onInput: this.handleInput,
                            onChange: this.handleChange,
                            onScroll: this.handleTextAreaScroll,
                          }),
                        ),
                        this.showPlaceholder1
                          ? b(
                              'div',
                              {
                                class: `${t}-input__placeholder`,
                                style: [this.placeholderStyle, $],
                                key: 'placeholder',
                              },
                              this.mergedPlaceholder[0],
                            )
                          : null,
                        this.autosize
                          ? b(
                              Ot,
                              {
                                onResize: this.handleTextAreaMirrorResize,
                              },
                              {
                                default: () =>
                                  b('div', {
                                    ref: 'textareaMirrorElRef',
                                    class: `${t}-input__textarea-mirror`,
                                    key: 'mirror',
                                  }),
                              },
                            )
                          : null,
                      )
                    },
                  },
                )
              : b(
                  'div',
                  {
                    class: `${t}-input__input`,
                  },
                  b(
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
                          `${t}-input__input-el`,
                          (e = this.inputProps) === null || e === void 0
                            ? void 0
                            : e.class,
                        ],
                        style: [
                          this.textDecorationStyle[0],
                          (r = this.inputProps) === null || r === void 0
                            ? void 0
                            : r.style,
                        ],
                        tabindex:
                          this.passivelyActivated && !this.activated
                            ? -1
                            : void 0,
                        placeholder: this.mergedPlaceholder[0],
                        disabled: this.mergedDisabled,
                        maxlength: s ? void 0 : this.maxlength,
                        minlength: s ? void 0 : this.minlength,
                        value: Array.isArray(this.mergedValue)
                          ? this.mergedValue[0]
                          : this.mergedValue,
                        readonly: this.readonly,
                        autofocus: this.autofocus,
                        size: this.attrSize,
                        onBlur: this.handleInputBlur,
                        onFocus: (f) => {
                          this.handleInputFocus(f, 0)
                        },
                        onInput: (f) => {
                          this.handleInput(f, 0)
                        },
                        onChange: (f) => {
                          this.handleChange(f, 0)
                        },
                      },
                    ),
                  ),
                  this.showPlaceholder1
                    ? b(
                        'div',
                        {
                          class: `${t}-input__placeholder`,
                        },
                        b('span', null, this.mergedPlaceholder[0]),
                      )
                    : null,
                  this.autosize
                    ? b(
                        'div',
                        {
                          class: `${t}-input__input-mirror`,
                          key: 'mirror',
                          ref: 'inputMirrorElRef',
                        },
                        ' ',
                      )
                    : null,
                ),
            !this.pair &&
              or(d.suffix, (f) =>
                f ||
                this.clearable ||
                this.showCount ||
                this.mergedShowPasswordOn ||
                this.loading !== void 0
                  ? b(
                      'div',
                      {
                        class: `${t}-input__suffix`,
                      },
                      [
                        or(
                          d['clear-icon-placeholder'],
                          (v) =>
                            (this.clearable || v) &&
                            b(
                              It,
                              {
                                clsPrefix: t,
                                show: this.showClearButton,
                                onClear: this.handleClear,
                              },
                              {
                                placeholder: () => v,
                                icon: () => {
                                  var p, $
                                  return ($ = (p = this.$slots)[
                                    'clear-icon'
                                  ]) === null || $ === void 0
                                    ? void 0
                                    : $.call(p)
                                },
                              },
                            ),
                        ),
                        this.internalLoadingBeforeSuffix ? null : f,
                        this.loading !== void 0
                          ? b(nd, {
                              clsPrefix: t,
                              loading: this.loading,
                              showArrow: !1,
                              showClear: !1,
                              style: this.cssVars,
                            })
                          : null,
                        this.internalLoadingBeforeSuffix ? f : null,
                        this.showCount && this.type !== 'textarea'
                          ? b(Wo, null, {
                              default: (v) => {
                                var p
                                return (p = d.count) === null || p === void 0
                                  ? void 0
                                  : p.call(d, v)
                              },
                            })
                          : null,
                        this.mergedShowPasswordOn && this.type === 'password'
                          ? b(
                              'div',
                              {
                                class: `${t}-input__eye`,
                                onMousedown: this.handlePasswordToggleMousedown,
                                onClick: this.handlePasswordToggleClick,
                              },
                              this.passwordVisible
                                ? zr(d['password-visible-icon'], () => [
                                    b(
                                      lt,
                                      {
                                        clsPrefix: t,
                                      },
                                      {
                                        default: () => b(Fu, null),
                                      },
                                    ),
                                  ])
                                : zr(d['password-invisible-icon'], () => [
                                    b(
                                      lt,
                                      {
                                        clsPrefix: t,
                                      },
                                      {
                                        default: () => b(Iu, null),
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
            ? b(
                'span',
                {
                  class: `${t}-input__separator`,
                },
                zr(d.separator, () => [this.separator]),
              )
            : null,
          this.pair
            ? b(
                'div',
                {
                  class: `${t}-input-wrapper`,
                },
                b(
                  'div',
                  {
                    class: `${t}-input__input`,
                  },
                  b('input', {
                    ref: 'inputEl2Ref',
                    type: this.type,
                    class: `${t}-input__input-el`,
                    tabindex:
                      this.passivelyActivated && !this.activated ? -1 : void 0,
                    placeholder: this.mergedPlaceholder[1],
                    disabled: this.mergedDisabled,
                    maxlength: s ? void 0 : this.maxlength,
                    minlength: s ? void 0 : this.minlength,
                    value: Array.isArray(this.mergedValue)
                      ? this.mergedValue[1]
                      : void 0,
                    readonly: this.readonly,
                    style: this.textDecorationStyle[1],
                    onBlur: this.handleInputBlur,
                    onFocus: (f) => {
                      this.handleInputFocus(f, 1)
                    },
                    onInput: (f) => {
                      this.handleInput(f, 1)
                    },
                    onChange: (f) => {
                      this.handleChange(f, 1)
                    },
                  }),
                  this.showPlaceholder2
                    ? b(
                        'div',
                        {
                          class: `${t}-input__placeholder`,
                        },
                        b('span', null, this.mergedPlaceholder[1]),
                      )
                    : null,
                ),
                or(
                  d.suffix,
                  (f) =>
                    (this.clearable || f) &&
                    b(
                      'div',
                      {
                        class: `${t}-input__suffix`,
                      },
                      [
                        this.clearable &&
                          b(
                            It,
                            {
                              clsPrefix: t,
                              show: this.showClearButton,
                              onClear: this.handleClear,
                            },
                            {
                              icon: () => {
                                var v
                                return (v = d['clear-icon']) === null ||
                                  v === void 0
                                  ? void 0
                                  : v.call(d)
                              },
                              placeholder: () => {
                                var v
                                return (v = d['clear-icon-placeholder']) ===
                                  null || v === void 0
                                  ? void 0
                                  : v.call(d)
                              },
                            },
                          ),
                        f,
                      ],
                    ),
                ),
              )
            : null,
          this.mergedBordered
            ? b('div', {
                class: `${t}-input__border`,
              })
            : null,
          this.mergedBordered
            ? b('div', {
                class: `${t}-input__state-border`,
              })
            : null,
          this.showCount && i === 'textarea'
            ? b(Wo, null, {
                default: (f) => {
                  var v
                  const { renderCount: p } = this
                  return p
                    ? p(f)
                    : (v = d.count) === null || v === void 0
                      ? void 0
                      : v.call(d, f)
                },
              })
            : null,
        )
      )
    },
  })
function Le(e) {
  return Lt(e, [255, 255, 255, 0.16])
}
function et(e) {
  return Lt(e, [0, 0, 0, 0.12])
}
const pd = 'n-button-group',
  bd = {
    paddingTiny: '0 6px',
    paddingSmall: '0 10px',
    paddingMedium: '0 14px',
    paddingLarge: '0 18px',
    paddingRoundTiny: '0 10px',
    paddingRoundSmall: '0 14px',
    paddingRoundMedium: '0 18px',
    paddingRoundLarge: '0 22px',
    iconMarginTiny: '6px',
    iconMarginSmall: '6px',
    iconMarginMedium: '6px',
    iconMarginLarge: '6px',
    iconSizeTiny: '14px',
    iconSizeSmall: '18px',
    iconSizeMedium: '18px',
    iconSizeLarge: '20px',
    rippleDuration: '.6s',
  },
  gd = (e) => {
    const {
      heightTiny: r,
      heightSmall: t,
      heightMedium: o,
      heightLarge: n,
      borderRadius: i,
      fontSizeTiny: s,
      fontSizeSmall: a,
      fontSizeMedium: d,
      fontSizeLarge: f,
      opacityDisabled: v,
      textColor2: p,
      textColor3: $,
      primaryColorHover: E,
      primaryColorPressed: u,
      borderColor: R,
      primaryColor: y,
      baseColor: x,
      infoColor: T,
      infoColorHover: L,
      infoColorPressed: S,
      successColor: M,
      successColorHover: D,
      successColorPressed: c,
      warningColor: m,
      warningColorHover: w,
      warningColorPressed: A,
      errorColor: F,
      errorColorHover: I,
      errorColorPressed: Z,
      fontWeight: G,
      buttonColor2: Y,
      buttonColor2Hover: X,
      buttonColor2Pressed: k,
      fontWeightStrong: ne,
    } = e
    return Object.assign(Object.assign({}, bd), {
      heightTiny: r,
      heightSmall: t,
      heightMedium: o,
      heightLarge: n,
      borderRadiusTiny: i,
      borderRadiusSmall: i,
      borderRadiusMedium: i,
      borderRadiusLarge: i,
      fontSizeTiny: s,
      fontSizeSmall: a,
      fontSizeMedium: d,
      fontSizeLarge: f,
      opacityDisabled: v,
      // secondary
      colorOpacitySecondary: '0.16',
      colorOpacitySecondaryHover: '0.22',
      colorOpacitySecondaryPressed: '0.28',
      colorSecondary: Y,
      colorSecondaryHover: X,
      colorSecondaryPressed: k,
      // tertiary
      colorTertiary: Y,
      colorTertiaryHover: X,
      colorTertiaryPressed: k,
      // quaternary
      colorQuaternary: '#0000',
      colorQuaternaryHover: X,
      colorQuaternaryPressed: k,
      // default type
      color: '#0000',
      colorHover: '#0000',
      colorPressed: '#0000',
      colorFocus: '#0000',
      colorDisabled: '#0000',
      textColor: p,
      textColorTertiary: $,
      textColorHover: E,
      textColorPressed: u,
      textColorFocus: E,
      textColorDisabled: p,
      textColorText: p,
      textColorTextHover: E,
      textColorTextPressed: u,
      textColorTextFocus: E,
      textColorTextDisabled: p,
      textColorGhost: p,
      textColorGhostHover: E,
      textColorGhostPressed: u,
      textColorGhostFocus: E,
      textColorGhostDisabled: p,
      border: `1px solid ${R}`,
      borderHover: `1px solid ${E}`,
      borderPressed: `1px solid ${u}`,
      borderFocus: `1px solid ${E}`,
      borderDisabled: `1px solid ${R}`,
      rippleColor: y,
      // primary
      colorPrimary: y,
      colorHoverPrimary: E,
      colorPressedPrimary: u,
      colorFocusPrimary: E,
      colorDisabledPrimary: y,
      textColorPrimary: x,
      textColorHoverPrimary: x,
      textColorPressedPrimary: x,
      textColorFocusPrimary: x,
      textColorDisabledPrimary: x,
      textColorTextPrimary: y,
      textColorTextHoverPrimary: E,
      textColorTextPressedPrimary: u,
      textColorTextFocusPrimary: E,
      textColorTextDisabledPrimary: p,
      textColorGhostPrimary: y,
      textColorGhostHoverPrimary: E,
      textColorGhostPressedPrimary: u,
      textColorGhostFocusPrimary: E,
      textColorGhostDisabledPrimary: y,
      borderPrimary: `1px solid ${y}`,
      borderHoverPrimary: `1px solid ${E}`,
      borderPressedPrimary: `1px solid ${u}`,
      borderFocusPrimary: `1px solid ${E}`,
      borderDisabledPrimary: `1px solid ${y}`,
      rippleColorPrimary: y,
      // info
      colorInfo: T,
      colorHoverInfo: L,
      colorPressedInfo: S,
      colorFocusInfo: L,
      colorDisabledInfo: T,
      textColorInfo: x,
      textColorHoverInfo: x,
      textColorPressedInfo: x,
      textColorFocusInfo: x,
      textColorDisabledInfo: x,
      textColorTextInfo: T,
      textColorTextHoverInfo: L,
      textColorTextPressedInfo: S,
      textColorTextFocusInfo: L,
      textColorTextDisabledInfo: p,
      textColorGhostInfo: T,
      textColorGhostHoverInfo: L,
      textColorGhostPressedInfo: S,
      textColorGhostFocusInfo: L,
      textColorGhostDisabledInfo: T,
      borderInfo: `1px solid ${T}`,
      borderHoverInfo: `1px solid ${L}`,
      borderPressedInfo: `1px solid ${S}`,
      borderFocusInfo: `1px solid ${L}`,
      borderDisabledInfo: `1px solid ${T}`,
      rippleColorInfo: T,
      // success
      colorSuccess: M,
      colorHoverSuccess: D,
      colorPressedSuccess: c,
      colorFocusSuccess: D,
      colorDisabledSuccess: M,
      textColorSuccess: x,
      textColorHoverSuccess: x,
      textColorPressedSuccess: x,
      textColorFocusSuccess: x,
      textColorDisabledSuccess: x,
      textColorTextSuccess: M,
      textColorTextHoverSuccess: D,
      textColorTextPressedSuccess: c,
      textColorTextFocusSuccess: D,
      textColorTextDisabledSuccess: p,
      textColorGhostSuccess: M,
      textColorGhostHoverSuccess: D,
      textColorGhostPressedSuccess: c,
      textColorGhostFocusSuccess: D,
      textColorGhostDisabledSuccess: M,
      borderSuccess: `1px solid ${M}`,
      borderHoverSuccess: `1px solid ${D}`,
      borderPressedSuccess: `1px solid ${c}`,
      borderFocusSuccess: `1px solid ${D}`,
      borderDisabledSuccess: `1px solid ${M}`,
      rippleColorSuccess: M,
      // warning
      colorWarning: m,
      colorHoverWarning: w,
      colorPressedWarning: A,
      colorFocusWarning: w,
      colorDisabledWarning: m,
      textColorWarning: x,
      textColorHoverWarning: x,
      textColorPressedWarning: x,
      textColorFocusWarning: x,
      textColorDisabledWarning: x,
      textColorTextWarning: m,
      textColorTextHoverWarning: w,
      textColorTextPressedWarning: A,
      textColorTextFocusWarning: w,
      textColorTextDisabledWarning: p,
      textColorGhostWarning: m,
      textColorGhostHoverWarning: w,
      textColorGhostPressedWarning: A,
      textColorGhostFocusWarning: w,
      textColorGhostDisabledWarning: m,
      borderWarning: `1px solid ${m}`,
      borderHoverWarning: `1px solid ${w}`,
      borderPressedWarning: `1px solid ${A}`,
      borderFocusWarning: `1px solid ${w}`,
      borderDisabledWarning: `1px solid ${m}`,
      rippleColorWarning: m,
      // error
      colorError: F,
      colorHoverError: I,
      colorPressedError: Z,
      colorFocusError: I,
      colorDisabledError: F,
      textColorError: x,
      textColorHoverError: x,
      textColorPressedError: x,
      textColorFocusError: x,
      textColorDisabledError: x,
      textColorTextError: F,
      textColorTextHoverError: I,
      textColorTextPressedError: Z,
      textColorTextFocusError: I,
      textColorTextDisabledError: p,
      textColorGhostError: F,
      textColorGhostHoverError: I,
      textColorGhostPressedError: Z,
      textColorGhostFocusError: I,
      textColorGhostDisabledError: F,
      borderError: `1px solid ${F}`,
      borderHoverError: `1px solid ${I}`,
      borderPressedError: `1px solid ${Z}`,
      borderFocusError: `1px solid ${I}`,
      borderDisabledError: `1px solid ${F}`,
      rippleColorError: F,
      waveOpacity: '0.6',
      fontWeight: G,
      fontWeightStrong: ne,
    })
  },
  md = {
    name: 'Button',
    common: Qt,
    self: gd,
  },
  xd = B([
    U(
      'button',
      `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,
      [
        te('color', [
          C('border', {
            borderColor: 'var(--n-border-color)',
          }),
          te('disabled', [
            C('border', {
              borderColor: 'var(--n-border-color-disabled)',
            }),
          ]),
          Ne('disabled', [
            B('&:focus', [
              C('state-border', {
                borderColor: 'var(--n-border-color-focus)',
              }),
            ]),
            B('&:hover', [
              C('state-border', {
                borderColor: 'var(--n-border-color-hover)',
              }),
            ]),
            B('&:active', [
              C('state-border', {
                borderColor: 'var(--n-border-color-pressed)',
              }),
            ]),
            te('pressed', [
              C('state-border', {
                borderColor: 'var(--n-border-color-pressed)',
              }),
            ]),
          ]),
        ]),
        te(
          'disabled',
          {
            backgroundColor: 'var(--n-color-disabled)',
            color: 'var(--n-text-color-disabled)',
          },
          [
            C('border', {
              border: 'var(--n-border-disabled)',
            }),
          ],
        ),
        Ne('disabled', [
          B(
            '&:focus',
            {
              backgroundColor: 'var(--n-color-focus)',
              color: 'var(--n-text-color-focus)',
            },
            [
              C('state-border', {
                border: 'var(--n-border-focus)',
              }),
            ],
          ),
          B(
            '&:hover',
            {
              backgroundColor: 'var(--n-color-hover)',
              color: 'var(--n-text-color-hover)',
            },
            [
              C('state-border', {
                border: 'var(--n-border-hover)',
              }),
            ],
          ),
          B(
            '&:active',
            {
              backgroundColor: 'var(--n-color-pressed)',
              color: 'var(--n-text-color-pressed)',
            },
            [
              C('state-border', {
                border: 'var(--n-border-pressed)',
              }),
            ],
          ),
          te(
            'pressed',
            {
              backgroundColor: 'var(--n-color-pressed)',
              color: 'var(--n-text-color-pressed)',
            },
            [
              C('state-border', {
                border: 'var(--n-border-pressed)',
              }),
            ],
          ),
        ]),
        te('loading', 'cursor: wait;'),
        U(
          'base-wave',
          `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,
          [
            te('active', {
              zIndex: 1,
              animationName: 'button-wave-spread, button-wave-opacity',
            }),
          ],
        ),
        ft && 'MozBoxSizing' in document.createElement('div').style
          ? B('&::moz-focus-inner', {
              border: 0,
            })
          : null,
        C(
          'border, state-border',
          `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `,
        ),
        C('border', {
          border: 'var(--n-border)',
        }),
        C('state-border', {
          border: 'var(--n-border)',
          borderColor: '#0000',
          zIndex: 1,
        }),
        C(
          'icon',
          `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,
          [
            U(
              'icon-slot',
              `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,
              [
                st({
                  top: '50%',
                  originalTransform: 'translateY(-50%)',
                }),
              ],
            ),
            id(),
          ],
        ),
        C(
          'content',
          `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,
          [
            B('~', [
              C('icon', {
                margin: 'var(--n-icon-margin)',
                marginRight: 0,
              }),
            ]),
          ],
        ),
        te(
          'block',
          `
 display: flex;
 width: 100%;
 `,
        ),
        te('dashed', [
          C('border, state-border', {
            borderStyle: 'dashed !important',
          }),
        ]),
        te('disabled', {
          cursor: 'not-allowed',
          opacity: 'var(--n-opacity-disabled)',
        }),
      ],
    ),
    B('@keyframes button-wave-spread', {
      from: {
        boxShadow: '0 0 0.5px 0 var(--n-ripple-color)',
      },
      to: {
        // don't use exact 5px since chrome will display the animation with glitches
        boxShadow: '0 0 0.5px 4.5px var(--n-ripple-color)',
      },
    }),
    B('@keyframes button-wave-opacity', {
      from: {
        opacity: 'var(--n-wave-opacity)',
      },
      to: {
        opacity: 0,
      },
    }),
  ]),
  yd = Object.assign(Object.assign({}, er.props), {
    color: String,
    textColor: String,
    text: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    circle: Boolean,
    size: String,
    ghost: Boolean,
    round: Boolean,
    secondary: Boolean,
    tertiary: Boolean,
    quaternary: Boolean,
    strong: Boolean,
    focusable: {
      type: Boolean,
      default: !0,
    },
    keyboard: {
      type: Boolean,
      default: !0,
    },
    tag: {
      type: String,
      default: 'button',
    },
    type: {
      type: String,
      default: 'default',
    },
    dashed: Boolean,
    renderIcon: Function,
    iconPlacement: {
      type: String,
      default: 'left',
    },
    attrType: {
      type: String,
      default: 'button',
    },
    bordered: {
      type: Boolean,
      default: !0,
    },
    onClick: [Function, Array],
    nativeFocusBehavior: {
      type: Boolean,
      default: !Bn,
    },
  }),
  wd = ce({
    name: 'Button',
    props: yd,
    setup(e) {
      const r = W(null),
        t = W(null),
        o = W(!1),
        n = Hr(
          () =>
            !e.quaternary &&
            !e.tertiary &&
            !e.secondary &&
            !e.text &&
            (!e.color || e.ghost || e.dashed) &&
            e.bordered,
        ),
        i = me(pd, {}),
        { mergedSizeRef: s } = en(
          {},
          {
            defaultSize: 'medium',
            mergedSize: (S) => {
              const { size: M } = e
              if (M) return M
              const { size: D } = i
              if (D) return D
              const { mergedSize: c } = S || {}
              return c ? c.value : 'medium'
            },
          },
        ),
        a = O(() => e.focusable && !e.disabled),
        d = (S) => {
          var M
          a.value || S.preventDefault(),
            !e.nativeFocusBehavior &&
              (S.preventDefault(),
              !e.disabled &&
                a.value &&
                ((M = r.value) === null ||
                  M === void 0 ||
                  M.focus({
                    preventScroll: !0,
                  })))
        },
        f = (S) => {
          var M
          if (!e.disabled && !e.loading) {
            const { onClick: D } = e
            D && se(D, S),
              e.text || (M = t.value) === null || M === void 0 || M.play()
          }
        },
        v = (S) => {
          switch (S.key) {
            case 'Enter':
              if (!e.keyboard) return
              o.value = !1
          }
        },
        p = (S) => {
          switch (S.key) {
            case 'Enter':
              if (!e.keyboard || e.loading) {
                S.preventDefault()
                return
              }
              o.value = !0
          }
        },
        $ = () => {
          o.value = !1
        },
        {
          inlineThemeDisabled: E,
          mergedClsPrefixRef: u,
          mergedRtlRef: R,
        } = Yt(e),
        y = er('Button', '-button', xd, md, e, u),
        x = Kt('Button', R, u),
        T = O(() => {
          const S = y.value,
            {
              common: { cubicBezierEaseInOut: M, cubicBezierEaseOut: D },
              self: c,
            } = S,
            {
              rippleDuration: m,
              opacityDisabled: w,
              fontWeight: A,
              fontWeightStrong: F,
            } = c,
            I = s.value,
            {
              dashed: Z,
              type: G,
              ghost: Y,
              text: X,
              color: k,
              round: ne,
              circle: ve,
              textColor: le,
              secondary: ge,
              tertiary: we,
              quaternary: rr,
              strong: $e,
            } = e,
            Re = {
              'font-weight': $e ? F : A,
            }
          let V = {
            '--n-color': 'initial',
            '--n-color-hover': 'initial',
            '--n-color-pressed': 'initial',
            '--n-color-focus': 'initial',
            '--n-color-disabled': 'initial',
            '--n-ripple-color': 'initial',
            '--n-text-color': 'initial',
            '--n-text-color-hover': 'initial',
            '--n-text-color-pressed': 'initial',
            '--n-text-color-focus': 'initial',
            '--n-text-color-disabled': 'initial',
          }
          const ze = G === 'tertiary',
            He = G === 'default',
            N = ze ? 'default' : G
          if (X) {
            const ee = le || k
            V = {
              '--n-color': '#0000',
              '--n-color-hover': '#0000',
              '--n-color-pressed': '#0000',
              '--n-color-focus': '#0000',
              '--n-color-disabled': '#0000',
              '--n-ripple-color': '#0000',
              '--n-text-color': ee || c[j('textColorText', N)],
              '--n-text-color-hover': ee
                ? Le(ee)
                : c[j('textColorTextHover', N)],
              '--n-text-color-pressed': ee
                ? et(ee)
                : c[j('textColorTextPressed', N)],
              '--n-text-color-focus': ee
                ? Le(ee)
                : c[j('textColorTextHover', N)],
              '--n-text-color-disabled': ee || c[j('textColorTextDisabled', N)],
            }
          } else if (Y || Z) {
            const ee = le || k
            V = {
              '--n-color': '#0000',
              '--n-color-hover': '#0000',
              '--n-color-pressed': '#0000',
              '--n-color-focus': '#0000',
              '--n-color-disabled': '#0000',
              '--n-ripple-color': k || c[j('rippleColor', N)],
              '--n-text-color': ee || c[j('textColorGhost', N)],
              '--n-text-color-hover': ee
                ? Le(ee)
                : c[j('textColorGhostHover', N)],
              '--n-text-color-pressed': ee
                ? et(ee)
                : c[j('textColorGhostPressed', N)],
              '--n-text-color-focus': ee
                ? Le(ee)
                : c[j('textColorGhostHover', N)],
              '--n-text-color-disabled':
                ee || c[j('textColorGhostDisabled', N)],
            }
          } else if (ge) {
            const ee = He
                ? c.textColor
                : ze
                  ? c.textColorTertiary
                  : c[j('color', N)],
              ae = k || ee,
              Ce = G !== 'default' && G !== 'tertiary'
            V = {
              '--n-color': Ce
                ? Xe(ae, {
                    alpha: Number(c.colorOpacitySecondary),
                  })
                : c.colorSecondary,
              '--n-color-hover': Ce
                ? Xe(ae, {
                    alpha: Number(c.colorOpacitySecondaryHover),
                  })
                : c.colorSecondaryHover,
              '--n-color-pressed': Ce
                ? Xe(ae, {
                    alpha: Number(c.colorOpacitySecondaryPressed),
                  })
                : c.colorSecondaryPressed,
              '--n-color-focus': Ce
                ? Xe(ae, {
                    alpha: Number(c.colorOpacitySecondaryHover),
                  })
                : c.colorSecondaryHover,
              '--n-color-disabled': c.colorSecondary,
              '--n-ripple-color': '#0000',
              '--n-text-color': ae,
              '--n-text-color-hover': ae,
              '--n-text-color-pressed': ae,
              '--n-text-color-focus': ae,
              '--n-text-color-disabled': ae,
            }
          } else if (we || rr) {
            const ee = He
                ? c.textColor
                : ze
                  ? c.textColorTertiary
                  : c[j('color', N)],
              ae = k || ee
            we
              ? ((V['--n-color'] = c.colorTertiary),
                (V['--n-color-hover'] = c.colorTertiaryHover),
                (V['--n-color-pressed'] = c.colorTertiaryPressed),
                (V['--n-color-focus'] = c.colorSecondaryHover),
                (V['--n-color-disabled'] = c.colorTertiary))
              : ((V['--n-color'] = c.colorQuaternary),
                (V['--n-color-hover'] = c.colorQuaternaryHover),
                (V['--n-color-pressed'] = c.colorQuaternaryPressed),
                (V['--n-color-focus'] = c.colorQuaternaryHover),
                (V['--n-color-disabled'] = c.colorQuaternary)),
              (V['--n-ripple-color'] = '#0000'),
              (V['--n-text-color'] = ae),
              (V['--n-text-color-hover'] = ae),
              (V['--n-text-color-pressed'] = ae),
              (V['--n-text-color-focus'] = ae),
              (V['--n-text-color-disabled'] = ae)
          } else
            V = {
              '--n-color': k || c[j('color', N)],
              '--n-color-hover': k ? Le(k) : c[j('colorHover', N)],
              '--n-color-pressed': k ? et(k) : c[j('colorPressed', N)],
              '--n-color-focus': k ? Le(k) : c[j('colorFocus', N)],
              '--n-color-disabled': k || c[j('colorDisabled', N)],
              '--n-ripple-color': k || c[j('rippleColor', N)],
              '--n-text-color':
                le ||
                (k
                  ? c.textColorPrimary
                  : ze
                    ? c.textColorTertiary
                    : c[j('textColor', N)]),
              '--n-text-color-hover':
                le || (k ? c.textColorHoverPrimary : c[j('textColorHover', N)]),
              '--n-text-color-pressed':
                le ||
                (k ? c.textColorPressedPrimary : c[j('textColorPressed', N)]),
              '--n-text-color-focus':
                le || (k ? c.textColorFocusPrimary : c[j('textColorFocus', N)]),
              '--n-text-color-disabled':
                le ||
                (k ? c.textColorDisabledPrimary : c[j('textColorDisabled', N)]),
            }
          let Ae = {
            '--n-border': 'initial',
            '--n-border-hover': 'initial',
            '--n-border-pressed': 'initial',
            '--n-border-focus': 'initial',
            '--n-border-disabled': 'initial',
          }
          X
            ? (Ae = {
                '--n-border': 'none',
                '--n-border-hover': 'none',
                '--n-border-pressed': 'none',
                '--n-border-focus': 'none',
                '--n-border-disabled': 'none',
              })
            : (Ae = {
                '--n-border': c[j('border', N)],
                '--n-border-hover': c[j('borderHover', N)],
                '--n-border-pressed': c[j('borderPressed', N)],
                '--n-border-focus': c[j('borderFocus', N)],
                '--n-border-disabled': c[j('borderDisabled', N)],
              })
          const {
              [j('height', I)]: Ee,
              [j('fontSize', I)]: hr,
              [j('padding', I)]: xe,
              [j('paddingRound', I)]: vr,
              [j('iconSize', I)]: pr,
              [j('borderRadius', I)]: De,
              [j('iconMargin', I)]: br,
              waveOpacity: Be,
            } = c,
            gr = {
              '--n-width': ve && !X ? Ee : 'initial',
              '--n-height': X ? 'initial' : Ee,
              '--n-font-size': hr,
              '--n-padding': ve || X ? 'initial' : ne ? vr : xe,
              '--n-icon-size': pr,
              '--n-icon-margin': br,
              '--n-border-radius': X ? 'initial' : ve || ne ? Ee : De,
            }
          return Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  {
                    '--n-bezier': M,
                    '--n-bezier-ease-out': D,
                    '--n-ripple-duration': m,
                    '--n-opacity-disabled': w,
                    '--n-wave-opacity': Be,
                  },
                  Re,
                ),
                V,
              ),
              Ae,
            ),
            gr,
          )
        }),
        L = E
          ? qt(
              'button',
              O(() => {
                let S = ''
                const {
                  dashed: M,
                  type: D,
                  ghost: c,
                  text: m,
                  color: w,
                  round: A,
                  circle: F,
                  textColor: I,
                  secondary: Z,
                  tertiary: G,
                  quaternary: Y,
                  strong: X,
                } = e
                M && (S += 'a'),
                  c && (S += 'b'),
                  m && (S += 'c'),
                  A && (S += 'd'),
                  F && (S += 'e'),
                  Z && (S += 'f'),
                  G && (S += 'g'),
                  Y && (S += 'h'),
                  X && (S += 'i'),
                  w && (S += 'j' + ao(w)),
                  I && (S += 'k' + ao(I))
                const { value: k } = s
                return (S += 'l' + k[0]), (S += 'm' + D[0]), S
              }),
              T,
              e,
            )
          : void 0
      return {
        selfElRef: r,
        waveElRef: t,
        mergedClsPrefix: u,
        mergedFocusable: a,
        mergedSize: s,
        showBorder: n,
        enterPressed: o,
        rtlEnabled: x,
        handleMousedown: d,
        handleKeydown: p,
        handleBlur: $,
        handleKeyup: v,
        handleClick: f,
        customColorCssVars: O(() => {
          const { color: S } = e
          if (!S) return null
          const M = Le(S)
          return {
            '--n-border-color': S,
            '--n-border-color-hover': M,
            '--n-border-color-pressed': et(S),
            '--n-border-color-focus': M,
            '--n-border-color-disabled': S,
          }
        }),
        cssVars: E ? void 0 : T,
        themeClass: L == null ? void 0 : L.themeClass,
        onRender: L == null ? void 0 : L.onRender,
      }
    },
    render() {
      const { mergedClsPrefix: e, tag: r, onRender: t } = this
      t == null || t()
      const o = or(
        this.$slots.default,
        (n) =>
          n &&
          b(
            'span',
            {
              class: `${e}-button__content`,
            },
            n,
          ),
      )
      return b(
        r,
        {
          ref: 'selfElRef',
          class: [
            this.themeClass,
            `${e}-button`,
            `${e}-button--${this.type}-type`,
            `${e}-button--${this.mergedSize}-type`,
            this.rtlEnabled && `${e}-button--rtl`,
            this.disabled && `${e}-button--disabled`,
            this.block && `${e}-button--block`,
            this.enterPressed && `${e}-button--pressed`,
            !this.text && this.dashed && `${e}-button--dashed`,
            this.color && `${e}-button--color`,
            this.secondary && `${e}-button--secondary`,
            this.loading && `${e}-button--loading`,
            this.ghost && `${e}-button--ghost`,
            // required for button group border collapse
          ],
          tabindex: this.mergedFocusable ? 0 : -1,
          type: this.attrType,
          style: this.cssVars,
          disabled: this.disabled,
          onClick: this.handleClick,
          onBlur: this.handleBlur,
          onMousedown: this.handleMousedown,
          onKeyup: this.handleKeyup,
          onKeydown: this.handleKeydown,
        },
        this.iconPlacement === 'right' && o,
        b(
          ju,
          {
            width: !0,
          },
          {
            default: () =>
              or(
                this.$slots.icon,
                (n) =>
                  (this.loading || this.renderIcon || n) &&
                  b(
                    'span',
                    {
                      class: `${e}-button__icon`,
                      style: {
                        margin: ki(this.$slots.default) ? '0' : '',
                      },
                    },
                    b(Jt, null, {
                      default: () =>
                        this.loading
                          ? b(zn, {
                              clsPrefix: e,
                              key: 'loading',
                              class: `${e}-icon-slot`,
                              strokeWidth: 20,
                            })
                          : b(
                              'div',
                              {
                                key: 'icon',
                                class: `${e}-icon-slot`,
                                role: 'none',
                              },
                              this.renderIcon ? this.renderIcon() : n,
                            ),
                    }),
                  ),
              ),
          },
        ),
        this.iconPlacement === 'left' && o,
        this.text
          ? null
          : b(td, {
              ref: 'waveElRef',
              clsPrefix: e,
            }),
        this.showBorder
          ? b('div', {
              'aria-hidden': !0,
              class: `${e}-button__border`,
              style: this.customColorCssVars,
            })
          : null,
        this.showBorder
          ? b('div', {
              'aria-hidden': !0,
              class: `${e}-button__state-border`,
              style: this.customColorCssVars,
            })
          : null,
      )
    },
  }),
  $d = wd,
  Cd = {
    abstract: Boolean,
    bordered: {
      type: Boolean,
      default: void 0,
    },
    clsPrefix: {
      type: String,
      default: at,
    },
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: {
      type: String,
      default: 'div',
    },
    hljs: Object,
    katex: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    preflightStyleDisabled: Boolean,
    inlineThemeDisabled: {
      type: Boolean,
      default: void 0,
    },
    // deprecated
    as: {
      type: String,
      validator: () => (
        Fi('config-provider', '`as` is deprecated, please use `tag` instead.'),
        !0
      ),
      default: void 0,
    },
  },
  Rd = ce({
    name: 'ConfigProvider',
    alias: ['App'],
    props: Cd,
    setup(e) {
      const r = me(Me, null),
        t = O(() => {
          const { theme: u } = e
          if (u === null) return
          const R = r == null ? void 0 : r.mergedThemeRef.value
          return u === void 0 ? R : R === void 0 ? u : Object.assign({}, R, u)
        }),
        o = O(() => {
          const { themeOverrides: u } = e
          if (u !== null) {
            if (u === void 0)
              return r == null ? void 0 : r.mergedThemeOverridesRef.value
            {
              const R = r == null ? void 0 : r.mergedThemeOverridesRef.value
              return R === void 0 ? u : $r({}, R, u)
            }
          }
        }),
        n = Hr(() => {
          const { namespace: u } = e
          return u === void 0
            ? r == null
              ? void 0
              : r.mergedNamespaceRef.value
            : u
        }),
        i = Hr(() => {
          const { bordered: u } = e
          return u === void 0
            ? r == null
              ? void 0
              : r.mergedBorderedRef.value
            : u
        }),
        s = O(() => {
          const { icons: u } = e
          return u === void 0
            ? r == null
              ? void 0
              : r.mergedIconsRef.value
            : u
        }),
        a = O(() => {
          const { componentOptions: u } = e
          return u !== void 0
            ? u
            : r == null
              ? void 0
              : r.mergedComponentPropsRef.value
        }),
        d = O(() => {
          const { clsPrefix: u } = e
          return u !== void 0 ? u : r ? r.mergedClsPrefixRef.value : at
        }),
        f = O(() => {
          var u
          const { rtl: R } = e
          if (R === void 0) return r == null ? void 0 : r.mergedRtlRef.value
          const y = {}
          for (const x of R)
            (y[x.name] = to(x)),
              (u = x.peers) === null ||
                u === void 0 ||
                u.forEach((T) => {
                  T.name in y || (y[T.name] = to(T))
                })
          return y
        }),
        v = O(
          () =>
            e.breakpoints ||
            (r == null ? void 0 : r.mergedBreakpointsRef.value),
        ),
        p =
          e.inlineThemeDisabled || (r == null ? void 0 : r.inlineThemeDisabled),
        $ =
          e.preflightStyleDisabled ||
          (r == null ? void 0 : r.preflightStyleDisabled),
        E = O(() => {
          const { value: u } = t,
            { value: R } = o,
            y = R && Object.keys(R).length !== 0,
            x = u == null ? void 0 : u.name
          return x
            ? y
              ? `${x}-${Mr(JSON.stringify(o.value))}`
              : x
            : y
              ? Mr(JSON.stringify(o.value))
              : ''
        })
      return (
        kt(Me, {
          mergedThemeHashRef: E,
          mergedBreakpointsRef: v,
          mergedRtlRef: f,
          mergedIconsRef: s,
          mergedComponentPropsRef: a,
          mergedBorderedRef: i,
          mergedNamespaceRef: n,
          mergedClsPrefixRef: d,
          mergedLocaleRef: O(() => {
            const { locale: u } = e
            if (u !== null)
              return u === void 0
                ? r == null
                  ? void 0
                  : r.mergedLocaleRef.value
                : u
          }),
          mergedDateLocaleRef: O(() => {
            const { dateLocale: u } = e
            if (u !== null)
              return u === void 0
                ? r == null
                  ? void 0
                  : r.mergedDateLocaleRef.value
                : u
          }),
          mergedHljsRef: O(() => {
            const { hljs: u } = e
            return u === void 0
              ? r == null
                ? void 0
                : r.mergedHljsRef.value
              : u
          }),
          mergedKatexRef: O(() => {
            const { katex: u } = e
            return u === void 0
              ? r == null
                ? void 0
                : r.mergedKatexRef.value
              : u
          }),
          mergedThemeRef: t,
          mergedThemeOverridesRef: o,
          inlineThemeDisabled: p || !1,
          preflightStyleDisabled: $ || !1,
        }),
        {
          mergedClsPrefix: d,
          mergedBordered: i,
          mergedNamespace: n,
          mergedTheme: t,
          mergedThemeOverrides: o,
        }
      )
    },
    render() {
      var e, r, t, o
      return this.abstract
        ? (o = (t = this.$slots).default) === null || o === void 0
          ? void 0
          : o.call(t)
        : b(
            this.as || this.tag,
            {
              class: `${this.mergedClsPrefix || at}-config-provider`,
            },
            (r = (e = this.$slots).default) === null || r === void 0
              ? void 0
              : r.call(e),
          )
    },
  })
export { $d as NButton, Rd as NConfigProvider, Td as NInput }
//# sourceMappingURL=naive-esm.js.map
