import { defineComponent as E, ref as y, onMounted as V, createElementBlock as l, openBlock as n, createElementVNode as o, createCommentVNode as w, withDirectives as g, withKeys as f, vModelText as I, Fragment as R, renderList as q, toDisplayString as h, createTextVNode as C, nextTick as S, createVNode as T } from "vue";
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
}, W = /* @__PURE__ */ E({
  __name: "KeyFactors",
  props: {
    symbolRoot: {},
    userId: {}
  },
  setup(p) {
    const u = p, _ = F(), i = y([]), d = y(null), a = y(""), b = y(null), c = y(!1), r = y(""), M = async () => {
      const { data: t, error: e } = await _.schema("hf").from("key_factors_with_users").select("*").eq("symbol_root", u.symbolRoot).order("created_at", { ascending: !1 });
      !e && t && (i.value = t);
    }, N = async () => {
      c.value = !0, r.value = "", await S();
      const t = document.querySelector(".new-factor-input");
      t == null || t.focus();
    }, x = async () => {
      if (!r.value.trim()) {
        c.value = !1;
        return;
      }
      const { data: t, error: e } = await _.schema("hf").from("key_factors").insert({
        symbol_root: u.symbolRoot,
        bullet_text: r.value.trim(),
        created_by: u.userId
      }).select();
      !e && t && (i.value.unshift(t[0]), r.value = "", c.value = !1);
    }, B = () => {
      c.value = !1, r.value = "";
    }, A = async (t) => {
      d.value = t.id, a.value = t.bullet_text, await S();
      const e = document.querySelector(`#edit-${t.id}`);
      e == null || e.focus(), e == null || e.select();
    }, k = async (t) => {
      if (!a.value.trim()) {
        $();
        return;
      }
      const { error: e } = await _.schema("hf").from("key_factors").update({
        bullet_text: a.value.trim(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", t);
      if (!e) {
        const s = i.value.find((v) => v.id === t);
        s && (s.bullet_text = a.value.trim()), d.value = null;
      }
    }, $ = () => {
      d.value = null, a.value = "";
    }, D = (t) => new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return V(() => {
      M();
    }), (t, e) => (n(), l("div", P, [
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
        c.value ? (n(), l("li", L, [
          e[5] || (e[5] = o("span", { class: "bullet" }, "•", -1)),
          g(o("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => r.value = s),
            onKeyup: [
              f(x, ["enter"]),
              f(B, ["esc"])
            ],
            onBlur: x,
            type: "text",
            placeholder: "Type new factor and press Enter...",
            class: "new-factor-input"
          }, null, 544), [
            [I, r.value]
          ])
        ])) : w("", !0),
        !c.value && i.value.length === 0 ? (n(), l("li", O, " No factors yet. Click the + button to add your first factor. ")) : w("", !0),
        (n(!0), l(R, null, q([...i.value].sort((s, v) => s.bullet_text.localeCompare(v.bullet_text)), (s) => {
          var v;
          return n(), l("li", {
            key: s.id,
            class: "factor-item",
            onMouseenter: (m) => b.value = s,
            onMouseleave: e[2] || (e[2] = (m) => b.value = null)
          }, [
            e[7] || (e[7] = o("span", { class: "bullet" }, "•", -1)),
            d.value === s.id ? (n(), l("div", j, [
              g(o("input", {
                id: `edit-${s.id}`,
                "onUpdate:modelValue": e[1] || (e[1] = (m) => a.value = m),
                onKeyup: [
                  f((m) => k(s.id), ["enter"]),
                  f($, ["esc"])
                ],
                onBlur: (m) => k(s.id),
                type: "text",
                class: "edit-input"
              }, null, 40, z), [
                [I, a.value]
              ])
            ])) : (n(), l("div", G, [
              o("span", {
                class: "factor-text",
                onClick: (m) => A(s)
              }, h(s.bullet_text), 9, J)
            ])),
            ((v = b.value) == null ? void 0 : v.id) === s.id && d.value !== s.id ? (n(), l("div", Q, [
              C(" Added by: " + h(s.user_name), 1),
              e[6] || (e[6] = o("br", null, null, -1)),
              C(" " + h(D(s.created_at)), 1)
            ])) : w("", !0)
          ], 40, H);
        }), 128))
      ])
    ]));
  }
}), K = (p, u) => {
  const _ = p.__vccOpts || p;
  for (const [i, d] of u)
    _[i] = d;
  return _;
}, X = /* @__PURE__ */ K(W, [["__scopeId", "data-v-8992fbb8"]]), Y = { class: "key-plans-box" }, Z = { class: "plans-list" }, ee = {
  key: 0,
  class: "plan-item new-plan"
}, te = {
  key: 1,
  class: "empty-state"
}, se = ["onMouseenter"], oe = {
  key: 0,
  class: "edit-mode"
}, le = ["id", "onKeyup", "onBlur"], ne = {
  key: 1,
  class: "view-mode"
}, ae = ["onClick"], re = {
  key: 2,
  class: "tooltip"
}, ue = /* @__PURE__ */ E({
  __name: "Plan",
  props: {
    symbolRoot: {},
    userId: {}
  },
  setup(p) {
    const u = p, _ = F(), i = y([]), d = y(null), a = y(""), b = y(null), c = y(!1), r = y(""), M = async () => {
      const { data: t, error: e } = await _.schema("hf").from("key_plan_with_users").select("*").eq("symbol_root", u.symbolRoot).order("created_at", { ascending: !1 });
      !e && t && (i.value = t);
    }, N = async () => {
      c.value = !0, r.value = "", await S();
      const t = document.querySelector(".new-plan-input");
      t == null || t.focus();
    }, x = async () => {
      if (!r.value.trim()) {
        c.value = !1;
        return;
      }
      const { data: t, error: e } = await _.schema("hf").from("key_plan").insert({
        symbol_root: u.symbolRoot,
        bullet_text: r.value.trim(),
        created_by: u.userId
      }).select();
      !e && t && (i.value.unshift(t[0]), r.value = "", c.value = !1);
    }, B = () => {
      c.value = !1, r.value = "";
    }, A = async (t) => {
      d.value = t.id, a.value = t.bullet_text, await S();
      const e = document.querySelector(`#edit-${t.id}`);
      e == null || e.focus(), e == null || e.select();
    }, k = async (t) => {
      if (!a.value.trim()) {
        $();
        return;
      }
      const { error: e } = await _.schema("hf").from("key_plan").update({
        bullet_text: a.value.trim(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", t);
      if (!e) {
        const s = i.value.find((v) => v.id === t);
        s && (s.bullet_text = a.value.trim()), d.value = null;
      }
    }, $ = () => {
      d.value = null, a.value = "";
    }, D = (t) => new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return V(() => {
      M();
    }), (t, e) => (n(), l("div", Y, [
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
        c.value ? (n(), l("li", ee, [
          e[5] || (e[5] = o("span", { class: "bullet" }, "•", -1)),
          g(o("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (s) => r.value = s),
            onKeyup: [
              f(x, ["enter"]),
              f(B, ["esc"])
            ],
            onBlur: x,
            type: "text",
            placeholder: "Type new plan and press Enter...",
            class: "new-plan-input"
          }, null, 544), [
            [I, r.value]
          ])
        ])) : w("", !0),
        !c.value && i.value.length === 0 ? (n(), l("li", te, " No plans yet. Click the + button to add your first plan. ")) : w("", !0),
        (n(!0), l(R, null, q([...i.value].sort((s, v) => s.bullet_text.localeCompare(v.bullet_text)), (s) => {
          var v;
          return n(), l("li", {
            key: s.id,
            class: "plan-item",
            onMouseenter: (m) => b.value = s,
            onMouseleave: e[2] || (e[2] = (m) => b.value = null)
          }, [
            e[7] || (e[7] = o("span", { class: "bullet" }, "•", -1)),
            d.value === s.id ? (n(), l("div", oe, [
              g(o("input", {
                id: `edit-${s.id}`,
                "onUpdate:modelValue": e[1] || (e[1] = (m) => a.value = m),
                onKeyup: [
                  f((m) => k(s.id), ["enter"]),
                  f($, ["esc"])
                ],
                onBlur: (m) => k(s.id),
                type: "text",
                class: "edit-input"
              }, null, 40, le), [
                [I, a.value]
              ])
            ])) : (n(), l("div", ne, [
              o("span", {
                class: "plan-text",
                onClick: (m) => A(s)
              }, h(s.bullet_text), 9, ae)
            ])),
            ((v = b.value) == null ? void 0 : v.id) === s.id && d.value !== s.id ? (n(), l("div", re, [
              C(" Added by: " + h(s.user_name), 1),
              e[6] || (e[6] = o("br", null, null, -1)),
              C(" " + h(D(s.created_at)), 1)
            ])) : w("", !0)
          ], 40, se);
        }), 128))
      ])
    ]));
  }
}), ie = /* @__PURE__ */ K(ue, [["__scopeId", "data-v-76bfbd19"]]), de = { class: "instrument-insights-for-single-instrument-view" }, ce = { class: "boxes-container" }, ve = /* @__PURE__ */ E({
  __name: "InstrumentInsight",
  props: {
    symbolRoot: { default: "IBIT" },
    userId: { default: "4fbec15d-2316-4805-b2a4-5cd2115a5ac8" }
  },
  setup(p) {
    const u = p;
    return (_, i) => (n(), l("div", de, [
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
}), _e = /* @__PURE__ */ K(ve, [["__scopeId", "data-v-79452f88"]]);
export {
  _e as InstrumentInsight,
  _e as default
};
