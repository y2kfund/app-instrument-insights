import { defineComponent as K, ref as v, onMounted as V, createElementBlock as a, openBlock as r, createElementVNode as o, createCommentVNode as $, withDirectives as g, withKeys as f, vModelText as I, Fragment as R, renderList as q, toDisplayString as w, createTextVNode as S, nextTick as M, createVNode as T } from "vue";
import { useSupabase as F } from "@y2kfund/core";
const P = { class: "key-factors-box" }, U = { class: "factors-list" }, L = {
  key: 0,
  class: "factor-item new-factor"
}, O = ["onMouseenter"], H = {
  key: 0,
  class: "edit-mode"
}, j = ["id", "onKeyup", "onBlur"], z = {
  key: 1,
  class: "view-mode"
}, G = ["onClick"], J = {
  key: 2,
  class: "tooltip"
}, Q = /* @__PURE__ */ K({
  __name: "KeyFactors",
  props: {
    symbolRoot: {},
    userId: {}
  },
  setup(p) {
    const i = p, m = F(), c = v([]), u = v(null), n = v(""), b = v(null), y = v(!1), l = v(""), A = async () => {
      const { data: t, error: e } = await m.schema("hf").from("key_factors_with_users").select("*").eq("symbol_root", i.symbolRoot).order("created_at", { ascending: !1 });
      !e && t && (c.value = t);
    }, E = async () => {
      y.value = !0, l.value = "", await M();
      const t = document.querySelector(".new-factor-input");
      t == null || t.focus();
    }, h = async () => {
      if (!l.value.trim()) {
        y.value = !1;
        return;
      }
      const { data: t, error: e } = await m.schema("hf").from("key_factors").insert({
        symbol_root: i.symbolRoot,
        bullet_text: l.value.trim(),
        created_by: i.userId
      }).select();
      !e && t && (c.value.unshift(t[0]), l.value = "", y.value = !1);
    }, B = () => {
      y.value = !1, l.value = "";
    }, C = async (t) => {
      u.value = t.id, n.value = t.bullet_text, await M();
      const e = document.querySelector(`#edit-${t.id}`);
      e == null || e.focus(), e == null || e.select();
    }, x = async (t) => {
      if (!n.value.trim()) {
        k();
        return;
      }
      const { error: e } = await m.schema("hf").from("key_factors").update({
        bullet_text: n.value.trim(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", t);
      if (!e) {
        const s = c.value.find((_) => _.id === t);
        s && (s.bullet_text = n.value.trim()), u.value = null;
      }
    }, k = () => {
      u.value = null, n.value = "";
    }, D = (t) => new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return V(() => {
      A();
    }), (t, e) => (r(), a("div", P, [
      o("div", { class: "header" }, [
        e[4] || (e[4] = o("h3", { class: "box-title" }, "Key Factors", -1)),
        o("button", {
          onClick: E,
          class: "add-icon-button",
          title: "Add new factor"
        }, [...e[3] || (e[3] = [
          o("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 20 20",
            fill: "none"
          }, [
            o("path", {
              d: "M10 4V16M4 10H16",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round"
            })
          ], -1)
        ])])
      ]),
      o("ul", U, [
        y.value ? (r(), a("li", L, [
          e[5] || (e[5] = o("span", { class: "bullet" }, "•", -1)),
          g(o("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => l.value = s),
            onKeyup: [
              f(h, ["enter"]),
              f(B, ["esc"])
            ],
            onBlur: h,
            type: "text",
            placeholder: "Type new factor and press Enter...",
            class: "new-factor-input"
          }, null, 544), [
            [I, l.value]
          ])
        ])) : $("", !0),
        (r(!0), a(R, null, q(c.value, (s) => {
          var _;
          return r(), a("li", {
            key: s.id,
            class: "factor-item",
            onMouseenter: (d) => b.value = s,
            onMouseleave: e[2] || (e[2] = (d) => b.value = null)
          }, [
            e[7] || (e[7] = o("span", { class: "bullet" }, "•", -1)),
            u.value === s.id ? (r(), a("div", H, [
              g(o("input", {
                id: `edit-${s.id}`,
                "onUpdate:modelValue": e[1] || (e[1] = (d) => n.value = d),
                onKeyup: [
                  f((d) => x(s.id), ["enter"]),
                  f(k, ["esc"])
                ],
                onBlur: (d) => x(s.id),
                type: "text",
                class: "edit-input"
              }, null, 40, j), [
                [I, n.value]
              ])
            ])) : (r(), a("div", z, [
              o("span", {
                class: "factor-text",
                onClick: (d) => C(s)
              }, w(s.bullet_text), 9, G)
            ])),
            ((_ = b.value) == null ? void 0 : _.id) === s.id && u.value !== s.id ? (r(), a("div", J, [
              S(" Added by: " + w(s.user_name), 1),
              e[6] || (e[6] = o("br", null, null, -1)),
              S(" " + w(D(s.created_at)), 1)
            ])) : $("", !0)
          ], 40, O);
        }), 128))
      ])
    ]));
  }
}), N = (p, i) => {
  const m = p.__vccOpts || p;
  for (const [c, u] of i)
    m[c] = u;
  return m;
}, W = /* @__PURE__ */ N(Q, [["__scopeId", "data-v-2b9a719d"]]), X = { class: "key-plans-box" }, Y = { class: "plans-list" }, Z = {
  key: 0,
  class: "plan-item new-plan"
}, ee = ["onMouseenter"], te = {
  key: 0,
  class: "edit-mode"
}, se = ["id", "onKeyup", "onBlur"], oe = {
  key: 1,
  class: "view-mode"
}, ne = ["onClick"], le = {
  key: 2,
  class: "tooltip"
}, ae = /* @__PURE__ */ K({
  __name: "Plan",
  props: {
    symbolRoot: {},
    userId: {}
  },
  setup(p) {
    const i = p, m = F(), c = v([]), u = v(null), n = v(""), b = v(null), y = v(!1), l = v(""), A = async () => {
      const { data: t, error: e } = await m.schema("hf").from("key_plan_with_users").select("*").eq("symbol_root", i.symbolRoot).order("created_at", { ascending: !1 });
      !e && t && (c.value = t);
    }, E = async () => {
      y.value = !0, l.value = "", await M();
      const t = document.querySelector(".new-plan-input");
      t == null || t.focus();
    }, h = async () => {
      if (!l.value.trim()) {
        y.value = !1;
        return;
      }
      const { data: t, error: e } = await m.schema("hf").from("key_plan").insert({
        symbol_root: i.symbolRoot,
        bullet_text: l.value.trim(),
        created_by: i.userId
      }).select();
      !e && t && (c.value.unshift(t[0]), l.value = "", y.value = !1);
    }, B = () => {
      y.value = !1, l.value = "";
    }, C = async (t) => {
      u.value = t.id, n.value = t.bullet_text, await M();
      const e = document.querySelector(`#edit-${t.id}`);
      e == null || e.focus(), e == null || e.select();
    }, x = async (t) => {
      if (!n.value.trim()) {
        k();
        return;
      }
      const { error: e } = await m.schema("hf").from("key_plan").update({
        bullet_text: n.value.trim(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", t);
      if (!e) {
        const s = c.value.find((_) => _.id === t);
        s && (s.bullet_text = n.value.trim()), u.value = null;
      }
    }, k = () => {
      u.value = null, n.value = "";
    }, D = (t) => new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return V(() => {
      A();
    }), (t, e) => (r(), a("div", X, [
      o("div", { class: "header" }, [
        e[4] || (e[4] = o("h3", { class: "box-title" }, "Plan", -1)),
        o("button", {
          onClick: E,
          class: "add-icon-button",
          title: "Add new plan"
        }, [...e[3] || (e[3] = [
          o("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 20 20",
            fill: "none"
          }, [
            o("path", {
              d: "M10 4V16M4 10H16",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round"
            })
          ], -1)
        ])])
      ]),
      o("ul", Y, [
        y.value ? (r(), a("li", Z, [
          e[5] || (e[5] = o("span", { class: "bullet" }, "•", -1)),
          g(o("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => l.value = s),
            onKeyup: [
              f(h, ["enter"]),
              f(B, ["esc"])
            ],
            onBlur: h,
            type: "text",
            placeholder: "Type new plan and press Enter...",
            class: "new-plan-input"
          }, null, 544), [
            [I, l.value]
          ])
        ])) : $("", !0),
        (r(!0), a(R, null, q(c.value, (s) => {
          var _;
          return r(), a("li", {
            key: s.id,
            class: "plan-item",
            onMouseenter: (d) => b.value = s,
            onMouseleave: e[2] || (e[2] = (d) => b.value = null)
          }, [
            e[7] || (e[7] = o("span", { class: "bullet" }, "•", -1)),
            u.value === s.id ? (r(), a("div", te, [
              g(o("input", {
                id: `edit-${s.id}`,
                "onUpdate:modelValue": e[1] || (e[1] = (d) => n.value = d),
                onKeyup: [
                  f((d) => x(s.id), ["enter"]),
                  f(k, ["esc"])
                ],
                onBlur: (d) => x(s.id),
                type: "text",
                class: "edit-input"
              }, null, 40, se), [
                [I, n.value]
              ])
            ])) : (r(), a("div", oe, [
              o("span", {
                class: "plan-text",
                onClick: (d) => C(s)
              }, w(s.bullet_text), 9, ne)
            ])),
            ((_ = b.value) == null ? void 0 : _.id) === s.id && u.value !== s.id ? (r(), a("div", le, [
              S(" Added by: " + w(s.user_name), 1),
              e[6] || (e[6] = o("br", null, null, -1)),
              S(" " + w(D(s.created_at)), 1)
            ])) : $("", !0)
          ], 40, ee);
        }), 128))
      ])
    ]));
  }
}), re = /* @__PURE__ */ N(ae, [["__scopeId", "data-v-1505e9e2"]]), ie = { class: "instrument-insights-for-single-instrument-view" }, ue = { class: "boxes-container" }, de = /* @__PURE__ */ K({
  __name: "InstrumentInsight",
  props: {
    symbolRoot: { default: "META" },
    userId: { default: "67e578fd-2cf7-48a4-b028-a11a3f89bb9b" }
  },
  setup(p) {
    const i = p;
    return (m, c) => (r(), a("div", ie, [
      o("div", ue, [
        T(W, {
          "symbol-root": i.symbolRoot,
          "user-id": i.userId || ""
        }, null, 8, ["symbol-root", "user-id"]),
        T(re, {
          "symbol-root": i.symbolRoot,
          "user-id": i.userId || ""
        }, null, 8, ["symbol-root", "user-id"])
      ])
    ]));
  }
}), me = /* @__PURE__ */ N(de, [["__scopeId", "data-v-c6688f6e"]]);
export {
  me as InstrumentInsight,
  me as default
};
