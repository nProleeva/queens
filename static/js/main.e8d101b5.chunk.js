(this.webpackJsonptask2___4_4=this.webpackJsonptask2___4_4||[]).push([[0],{13:function(n,t,e){},15:function(n,t,e){},17:function(n,t,e){"use strict";e.r(t);var r=e(0),c=e.n(r),a=e(6),o=e.n(a),u=(e(13),e(5)),i=e.n(u),s=e(7),l=e(8),f=e(2),h=(e(15),e(1));var v=function(){var n=Object(r.useState)(0),t=Object(f.a)(n,2),e=t[0],a=t[1],o=Object(r.useState)("8"),u=Object(f.a)(o,2),v=u[0],j=u[1],b=Object(r.useRef)(null),p=Object(r.useRef)({}),d=Object(r.useState)(""),O=Object(f.a)(d,2),g=O[0],m=O[1];function x(){return(x=Object(l.a)(i.a.mark((function n(){var t,r,c,a,o,u,s;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=Object.keys(p.current),r=0,c=p.current[t[r]],a=[t[r]],o=[],u={},!1,s=new Promise((function(n){function i(n,t){n.forEach((function(n){u[n][p.current[n].indexOf(t)]=!0,u[t][p.current[t].indexOf(n)]=!0}))}Object.entries(p.current).forEach((function(n){var t=Object(f.a)(n,2),e=t[0],r=t[1];return u[e]=new Array(r.length).fill(!1)})),function n(){var s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.concat();t.length!==r?(s.forEach((function(t){var r=p.current[t].filter((function(n,t){return s.includes(n)}));l.length+r.length+1-e>=0&&l.some((function(n){return!u[n][p.current[n].indexOf(t)]}))&&(l.length<2&&i(l,t),l.push(t),r.length?n(r,l):l.length===e&&o.push(l.concat()),l.pop())})),1===l.length&&(++r!==t.length?(c=p.current[t[r]],a=[t[r]]):(c=[],a=[]),n(c,a))):!0}(),n(o)})),n.abrupt("return",s);case 2:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(r.useEffect)((function(){if(e){var n=[[]];p.current={};for(var t=0;t<e;t++){n.push([]);for(var r=0;r<e;r++)n[t].push("".concat(t).concat(r))}n.forEach((function(n,t){n.forEach((function(n,r){p.current[n]=[];for(var c=0;c<e;c++)if(c!==t)for(var a=0;a<e;a++)a!==r&&Math.abs(a-r)!==Math.abs(c-t)&&p.current[n].push("".concat(c).concat(a))}))}));var c=[],a=+Date.now();(function(){return x.apply(this,arguments)})().then((function(t){var r,o=Object(s.a)(t);try{var u=function(){var t=r.value,e=null===n||void 0===n?void 0:n.map((function(n){return n.map((function(n){return t.includes(n)?String.fromCharCode(9819):"."})).join(" ")})).join("\n");c.includes(e)||c.push(e)};for(o.s();!(r=o.n()).done;)u()}catch(i){o.e(i)}finally{o.f()}console.log("n=".concat(e,", ").concat(+Date.now()-a,"ms - \u0432\u0440\u0435\u043c\u044f \u043d\u0430\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u044f \u0432\u0441\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u044b\u0445 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439")),c.length&&function(n,t,e){var r=new Blob([n],{type:e});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(r,t);else{var c=document.createElement("a"),a=URL.createObjectURL(r);c.href=a,c.download=t,c.click(),window.URL.revokeObjectURL(a)}}(c.join("\n"),"queens".concat(e,".txt"),"text/html"),m(c.length)}))}}),[e]),Object(h.jsxs)(c.a.Fragment,{children:[Object(h.jsx)("h3",{children:"\u0417\u0430\u0434\u0430\u0447\u0430 \u043e \u0424\u0435\u0440\u0437\u044f\u0445"}),Object(h.jsxs)("form",{onSubmit:function(n){var t;a(parseInt((null===(t=b.current)||void 0===t?void 0:t.elements).n.value)),m("\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),n.preventDefault(),n.stopPropagation()},ref:b,children:[Object(h.jsx)("label",{htmlFor:"n",children:"n ="}),Object(h.jsx)("input",{type:"text",value:v,name:"n",onChange:function(n){j(/[1-9][0-9]?/.exec(n.target.value)||"")},id:"n"}),Object(h.jsx)("input",{type:"submit",value:"\u041d\u0430\u0439\u0442\u0438"})]}),Object(h.jsx)("div",{className:"count",children:g})]})};o.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(v,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.e8d101b5.chunk.js.map