(this.webpackJsonptask2___4_4=this.webpackJsonptask2___4_4||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(4),o=n.n(a),u=(n(9),n(3)),i=function(e){var t=[];(function(e){var t=Object.keys(e),n=Math.sqrt(t.length),c=0,r=[],a={};function o(t,n){t.forEach((function(t){a[t][e[t].indexOf(n)]=!0,a[n][e[n].indexOf(t)]=!0}))}Object.entries(e).forEach((function(e){a[e[0]]=new Array(e[1].length).fill(!1)}));return function u(){var i,s,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e[t[c]],f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[t[c]];t.length!==c?(l.forEach((function(t){var c=e[t].filter((function(e,t){return l.includes(e)}));f.length+c.length+1-n>=0&&f.some((function(n){return!a[n][e[n].indexOf(t)]}))&&(f.length<2&&o(f,t),f.push(t),c.length?u(c,f):f.length===n&&r.push(f.concat()),f.pop())})),1===f.length&&(1===n&&r.push(f.concat()),++c!==t.length?(i=e[t[c]],s=[t[c]]):(i=[],s=[]),u(i,s))):!0}(),r})(e.data[0]).forEach((function(n){var c=e.data[1].map((function(e){return e.map((function(e){return n.includes(e)?String.fromCharCode(9819):"."})).join(" ")})).join("\n");t.includes(c)||t.push(c)})),e.ports&&e.ports[0].postMessage(t),e.data[2]&&e.data[2](t)};var s=function(e){var t=new Blob(["onmessage = ".concat(e.toString().replace(/e\.ports\[0\]\.|window\./g,""))],{type:"application/javascript"});return URL.createObjectURL(t)}(i),l=(n(10),n(1)),f="\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...";var d=function(){var e=Object(c.useRef)(0),t=Object(c.useRef)(0),n=Object(c.useState)("8"),a=Object(u.a)(n,2),o=a[0],d=a[1],h=Object(c.useRef)(null),b=Object(c.useState)(),j=Object(u.a)(b,2),p=j[0],v=j[1],O=Object(c.useRef)();function g(n){console.log("n = ".concat(e.current,", ").concat(+Date.now()-t.current,"ms - \u0432\u0440\u0435\u043c\u044f \u043d\u0430\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u044f \u0432\u0441\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u044b\u0445 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439")),n.data.length&&function(e,t,n){var c=new Blob([e],{type:n});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(c,t);else{var r=document.createElement("a"),a=URL.createObjectURL(c);r.href=a,r.download=t,r.click(),window.URL.revokeObjectURL(a)}}(n.data.join("\n"),"queens".concat(e.current,".txt"),"text/html"),e.current=0,v(n.data.length)}return Object(c.useEffect)((function(){window.Worker&&!O.current&&(O.current=new Worker(s),O.current.addEventListener("message",g,!1))}),[]),Object(c.useEffect)((function(){if(e.current){t.current=+Date.now();for(var n=[],c={},r=0;r<e.current;r++){n.push([]);for(var a=0;a<e.current;a++)n[r].push("".concat(r).concat(a))}if(n.forEach((function(t,n){t.forEach((function(t,r){c[t]=[];for(var a=0;a<e.current;a++)if(a!==n)for(var o=0;o<e.current;o++)o!==r&&Math.abs(o-r)!==Math.abs(a-n)&&c[t].push("".concat(a).concat(o))}))})),O.current)O.current.postMessage([c,n]);else i({data:[c,n,function(e){g({data:e})}]})}else p===f&&v("\u0434\u043e\u0441\u043a\u0438 NaN * NaN \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442")}),[p]),Object(l.jsxs)(r.a.Fragment,{children:[Object(l.jsx)("h3",{children:"\u0417\u0430\u0434\u0430\u0447\u0430 \u043e \u0424\u0435\u0440\u0437\u044f\u0445"}),Object(l.jsxs)("form",{onSubmit:function(t){var n;e.current=parseInt((null===(n=h.current)||void 0===n?void 0:n.elements).n.value),v(f),t.preventDefault(),t.stopPropagation()},ref:h,children:[Object(l.jsx)("label",{htmlFor:"n",children:"n ="}),Object(l.jsx)("input",{type:"text",value:o,name:"n",onChange:function(e){d(/[1-9][0-9]?/.exec(e.target.value)||"")},id:"n",disabled:p===f}),Object(l.jsx)("input",{type:"submit",value:"\u041d\u0430\u0439\u0442\u0438",disabled:p===f})]}),Object(l.jsx)("div",{className:"count","data-testid":"count-element",children:p})]})};o.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("root"))},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.be154360.chunk.js.map