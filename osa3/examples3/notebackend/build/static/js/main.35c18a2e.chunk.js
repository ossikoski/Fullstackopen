(this.webpackJsonpmoduulit=this.webpackJsonpmoduulit||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(13),c=n.n(r),u=n(14),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return o.a.createElement("li",{className:"note"},e.content,o.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},b=function(t){var e=t.message;return null===e?null:o.a.createElement("div",{className:"error"},e)},v=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],c=Object(a.useState)(""),m=Object(i.a)(c,2),f=m[0],v=m[1],E=Object(a.useState)(!0),g=Object(i.a)(E,2),h=g[0],O=g[1],j=Object(a.useState)(null),k=Object(i.a)(j,2),S=k[0],w=k[1];Object(a.useEffect)((function(){s().then((function(t){r(t)}))}),[]),console.log("render",n.length,"notes");var y=h?n:n.filter((function(t){return t.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(b,{message:S}),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return O(!h)}},"show ",h?"important":"all")),o.a.createElement("ul",null,y.map((function(t,e){return o.a.createElement(l,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)({},e,{important:!e.important});d(t,a).then((function(e){r(n.map((function(n){return n.id!==t?n:e.data})))})).catch((function(a){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),r(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random>.5};p(e).then((function(t){r(n.concat(t.data)),v("")}))}},o.a.createElement("input",{value:f,onChange:function(t){console.log(t.target.value),v(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};n(37);c.a.render(o.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.35c18a2e.chunk.js.map