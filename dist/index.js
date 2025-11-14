import { defineComponent as D, ref as m, onMounted as V, createElementBlock as n, openBlock as l, createElementVNode as o, createCommentVNode as w, withDirectives as g, withKeys as f, vModelText as I, Fragment as R, renderList as q, toDisplayString as h, createTextVNode as S, nextTick as M, createVNode as T } from "vue";
import { useSupabase as F } from "@y2kfund/core";
const P = { class: "key-factors-box" }, U = { class: "factors-list" }, L = {
  key: 0,
  class: "factor-item new-factor"
}, O = {
  key: 1,
  class: "empty-state"
}, H = ["onMouseenter"], j = {
  key: 0,
  class: "edit-mode"
}, z = ["id", "onKeyup", "onBlur"], G = {
  key: 1,
  class: "view-mode"
}, J = ["onClick"], Q = {
  key: 2,
  class: "tooltip"
}, W = /* @__PURE__ */ D({
  __name: "KeyFactors",
  props: {
    symbolRoot: {},
    userId: {}
  },
  setup(p) {
    const u = p, y = F(), i = m([]), d = m(null), a = m(""), b = m(null), c = m(!1), r = m(""), C = async () => {
      const { data: t, error: e } = await y.schema("hf").from("key_factors_with_users").select("*").eq("symbol_root", u.symbolRoot).order("created_at", { ascending: !1 });
      !e && t && (i.value = t);
    }, N = async () => {
      c.value = !0, r.value = "", await M();
      const t = document.querySelector(".new-factor-input");
      t == null || t.focus();
    }, k = async () => {
      if (!r.value.trim()) {
        c.value = !1;
        return;
      }
      const { data: t, error: e } = await y.schema("hf").from("key_factors").insert({
        symbol_root: u.symbolRoot,
        bullet_text: r.value.trim(),
        created_by: u.userId
      }).select();
      !e && t && (i.value.unshift(t[0]), r.value = "", c.value = !1);
    }, A = () => {
      c.value = !1, r.value = "";
    }, E = async (t) => {
      d.value = t.id, a.value = t.bullet_text, await M();
      const e = document.querySelector(`#edit-${t.id}`);
      e == null || e.focus(), e == null || e.select();
    }, x = async (t) => {
      if (!a.value.trim()) {
        $();
        return;
      }
      const { error: e } = await y.schema("hf").from("key_factors").update({
        bullet_text: a.value.trim(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", t);
      if (!e) {
        const s = i.value.find((_) => _.id === t);
        s && (s.bullet_text = a.value.trim()), d.value = null;
      }
    }, $ = () => {
      d.value = null, a.value = "";
    }, B = (t) => new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return V(() => {
      C();
    }), (t, e) => (l(), n("div", P, [
      o("div", { class: "header" }, [
        e[4] || (e[4] = o("h3", { class: "box-title" }, "Key Factors", -1)),
        o("button", {
          onClick: N,
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
        c.value ? (l(), n("li", L, [
          e[5] || (e[5] = o("span", { class: "bullet" }, "•", -1)),
          g(o("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => r.value = s),
            onKeyup: [
              f(k, ["enter"]),
              f(A, ["esc"])
            ],
            onBlur: k,
            type: "text",
            placeholder: "Type new factor and press Enter...",
            class: "new-factor-input"
          }, null, 544), [
            [I, r.value]
          ])
        ])) : w("", !0),
        !c.value && i.value.length === 0 ? (l(), n("li", O, " No factors yet. Click the + button to add your first factor. ")) : w("", !0),
        (l(!0), n(R, null, q(i.value, (s) => {
          var _;
          return l(), n("li", {
            key: s.id,
            class: "factor-item",
            onMouseenter: (v) => b.value = s,
            onMouseleave: e[2] || (e[2] = (v) => b.value = null)
          }, [
            e[7] || (e[7] = o("span", { class: "bullet" }, "•", -1)),
            d.value === s.id ? (l(), n("div", j, [
              g(o("input", {
                id: `edit-${s.id}`,
                "onUpdate:modelValue": e[1] || (e[1] = (v) => a.value = v),
                onKeyup: [
                  f((v) => x(s.id), ["enter"]),
                  f($, ["esc"])
                ],
                onBlur: (v) => x(s.id),
                type: "text",
                class: "edit-input"
              }, null, 40, z), [
                [I, a.value]
              ])
            ])) : (l(), n("div", G, [
              o("span", {
                class: "factor-text",
                onClick: (v) => E(s)
              }, h(s.bullet_text), 9, J)
            ])),
            ((_ = b.value) == null ? void 0 : _.id) === s.id && d.value !== s.id ? (l(), n("div", Q, [
              S(" Added by: " + h(s.user_name), 1),
              e[6] || (e[6] = o("br", null, null, -1)),
              S(" " + h(B(s.created_at)), 1)
            ])) : w("", !0)
          ], 40, H);
        }), 128))
      ])
    ]));
  }
}), K = (p, u) => {
  const y = p.__vccOpts || p;
  for (const [i, d] of u)
    y[i] = d;
  return y;
}, X = /* @__PURE__ */ K(W, [["__scopeId", "data-v-c5fae2e1"]]), Y = { class: "key-plans-box" }, Z = { class: "plans-list" }, ee = {
  key: 0,
  class: "plan-item new-plan"
}, te = {
  key: 1,
  class: "empty-state"
}, se = ["onMouseenter"], oe = {
  key: 0,
  class: "edit-mode"
}, ne = ["id", "onKeyup", "onBlur"], le = {
  key: 1,
  class: "view-mode"
}, ae = ["onClick"], re = {
  key: 2,
  class: "tooltip"
}, ue = /* @__PURE__ */ D({
  __name: "Plan",
  props: {
    symbolRoot: {},
    userId: {}
  },
  setup(p) {
    const u = p, y = F(), i = m([]), d = m(null), a = m(""), b = m(null), c = m(!1), r = m(""), C = async () => {
      const { data: t, error: e } = await y.schema("hf").from("key_plan_with_users").select("*").eq("symbol_root", u.symbolRoot).order("created_at", { ascending: !1 });
      !e && t && (i.value = t);
    }, N = async () => {
      c.value = !0, r.value = "", await M();
      const t = document.querySelector(".new-plan-input");
      t == null || t.focus();
    }, k = async () => {
      if (!r.value.trim()) {
        c.value = !1;
        return;
      }
      const { data: t, error: e } = await y.schema("hf").from("key_plan").insert({
        symbol_root: u.symbolRoot,
        bullet_text: r.value.trim(),
        created_by: u.userId
      }).select();
      !e && t && (i.value.unshift(t[0]), r.value = "", c.value = !1);
    }, A = () => {
      c.value = !1, r.value = "";
    }, E = async (t) => {
      d.value = t.id, a.value = t.bullet_text, await M();
      const e = document.querySelector(`#edit-${t.id}`);
      e == null || e.focus(), e == null || e.select();
    }, x = async (t) => {
      if (!a.value.trim()) {
        $();
        return;
      }
      const { error: e } = await y.schema("hf").from("key_plan").update({
        bullet_text: a.value.trim(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", t);
      if (!e) {
        const s = i.value.find((_) => _.id === t);
        s && (s.bullet_text = a.value.trim()), d.value = null;
      }
    }, $ = () => {
      d.value = null, a.value = "";
    }, B = (t) => new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return V(() => {
      C();
    }), (t, e) => (l(), n("div", Y, [
      o("div", { class: "header" }, [
        e[4] || (e[4] = o("h3", { class: "box-title" }, "Plan", -1)),
        o("button", {
          onClick: N,
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
      o("ul", Z, [
        c.value ? (l(), n("li", ee, [
          e[5] || (e[5] = o("span", { class: "bullet" }, "•", -1)),
          g(o("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => r.value = s),
            onKeyup: [
              f(k, ["enter"]),
              f(A, ["esc"])
            ],
            onBlur: k,
            type: "text",
            placeholder: "Type new plan and press Enter...",
            class: "new-plan-input"
          }, null, 544), [
            [I, r.value]
          ])
        ])) : w("", !0),
        !c.value && i.value.length === 0 ? (l(), n("li", te, " No plans yet. Click the + button to add your first plan. ")) : w("", !0),
        (l(!0), n(R, null, q(i.value, (s) => {
          var _;
          return l(), n("li", {
            key: s.id,
            class: "plan-item",
            onMouseenter: (v) => b.value = s,
            onMouseleave: e[2] || (e[2] = (v) => b.value = null)
          }, [
            e[7] || (e[7] = o("span", { class: "bullet" }, "•", -1)),
            d.value === s.id ? (l(), n("div", oe, [
              g(o("input", {
                id: `edit-${s.id}`,
                "onUpdate:modelValue": e[1] || (e[1] = (v) => a.value = v),
                onKeyup: [
                  f((v) => x(s.id), ["enter"]),
                  f($, ["esc"])
                ],
                onBlur: (v) => x(s.id),
                type: "text",
                class: "edit-input"
              }, null, 40, ne), [
                [I, a.value]
              ])
            ])) : (l(), n("div", le, [
              o("span", {
                class: "plan-text",
                onClick: (v) => E(s)
              }, h(s.bullet_text), 9, ae)
            ])),
            ((_ = b.value) == null ? void 0 : _.id) === s.id && d.value !== s.id ? (l(), n("div", re, [
              S(" Added by: " + h(s.user_name), 1),
              e[6] || (e[6] = o("br", null, null, -1)),
              S(" " + h(B(s.created_at)), 1)
            ])) : w("", !0)
          ], 40, se);
        }), 128))
      ])
    ]));
  }
}), ie = /* @__PURE__ */ K(ue, [["__scopeId", "data-v-369049b3"]]), de = { class: "instrument-insights-for-single-instrument-view" }, ce = { class: "boxes-container" }, ve = /* @__PURE__ */ D({
  __name: "InstrumentInsight",
  props: {
    symbolRoot: { default: "META" },
    userId: { default: "67e578fd-2cf7-48a4-b028-a11a3f89bb9b" }
  },
  setup(p) {
    const u = p;
    return (y, i) => (l(), n("div", de, [
      o("div", ce, [
        T(X, {
          "symbol-root": u.symbolRoot,
          "user-id": u.userId || ""
        }, null, 8, ["symbol-root", "user-id"]),
        T(ie, {
          "symbol-root": u.symbolRoot,
          "user-id": u.userId || ""
        }, null, 8, ["symbol-root", "user-id"])
      ])
    ]));
  }
}), _e = /* @__PURE__ */ K(ve, [["__scopeId", "data-v-c6688f6e"]]);
export {
  _e as InstrumentInsight,
  _e as default
};
