import{r as x}from"./index.Cd_vQiNd.js";var d={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p;function h(){if(p)return l;p=1;var s=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function n(c,t,a){var u=null;if(a!==void 0&&(u=""+a),t.key!==void 0&&(u=""+t.key),"key"in t){a={};for(var e in t)e!=="key"&&(a[e]=t[e])}else a=t;return t=a.ref,{$$typeof:s,type:c,key:u,ref:t!==void 0?t:null,props:a}}return l.Fragment=o,l.jsx=n,l.jsxs=n,l}var m;function j(){return m||(m=1,d.exports=h()),d.exports}var r=j();const R=()=>{const[s,o]=x.useState(()=>typeof window<"u"?JSON.parse(localStorage.getItem("listaTareas"))||[]:[]),[n,c]=x.useState("");x.useEffect(()=>{localStorage.setItem("listaTareas",JSON.stringify(s))},[s]);const t=e=>{e.preventDefault(),n.trim()&&(o([...s,{text:n,completed:!1}]),c(""))},a=e=>{o(s.map((i,f)=>f===e?{...i,completed:!i.completed}:i))},u=()=>{o(s.filter(e=>!e.completed))};return r.jsxs("div",{children:[r.jsx("h3",{children:"Lista de Tareas con LocalStorage"}),r.jsx("h5",{children:"Introduce una tarea:"}),r.jsxs("form",{onSubmit:t,children:[r.jsx("input",{type:"text",value:n,onChange:e=>c(e.target.value)}),r.jsx("button",{type:"submit",children:"Agregar tarea"})]}),r.jsx("ul",{className:"listaSinPuntos",children:s.map((e,i)=>r.jsxs("li",{children:[r.jsx("input",{type:"checkbox",checked:e.completed,onChange:()=>a(i)}),e.text]},i))}),r.jsx("button",{onClick:u,children:"Limpiar tareas completadas"})]})};export{R as default};
