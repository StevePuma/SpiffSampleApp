let e,t,l=!1,n=!1,o=!1,s=!1;const r="undefined"!=typeof window?window:{},i=r.document||{head:{}},c={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,l,n)=>e.addEventListener(t,l,n),rel:(e,t,l,n)=>e.removeEventListener(t,l,n),ce:(e,t)=>new CustomEvent(e,t)},a=e=>Promise.resolve(e),u={},f=e=>"object"==(e=typeof e)||"function"===e,$=(e,t,...l)=>{let n=null,o=null,s=!1,r=!1,i=[];const c=t=>{for(let l=0;l<t.length;l++)n=t[l],Array.isArray(n)?c(n):null!=n&&"boolean"!=typeof n&&((s="function"!=typeof e&&!f(n))&&(n+=""),s&&r?i[i.length-1].o+=n:i.push(s?d(null,n):n),r=s)};c(l),t&&t.name&&(o=t.name);const a=d(e,null);return a.i=t,i.length>0&&(a.u=i),a.$=o,a},d=(e,t)=>({t:0,m:e,o:t,h:null,u:null,i:null,$:null}),m={},b=(e,t,l,n,o,s)=>{if(l!==n){let r=X(e,t);if(t.toLowerCase(),"style"===t){for(const t in l)n&&null!=n[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in n)l&&n[t]===l[t]||(t.includes("-")?e.style.setProperty(t,n[t]):e.style[t]=n[t])}else if("ref"===t)n&&n(e);else{const i=f(n);if((r||i&&null!==n)&&!o)try{if(e.tagName.includes("-"))e[t]=n;else{let o=null==n?"":n;"list"===t?r=!1:null!=l&&e[t]==o||(e[t]=o)}}catch(e){}null==n||!1===n?!1===n&&""!==e.getAttribute(t)||e.removeAttribute(t):(!r||4&s||o)&&!i&&e.setAttribute(t,n=!0===n?"":n)}}},h=(e,t,l,n)=>{const o=11===t.h.nodeType&&t.h.host?t.h.host:t.h,s=e&&e.i||u,r=t.i||u;for(n in s)n in r||b(o,n,s[n],void 0,l,t.t);for(n in r)b(o,n,s[n],r[n],l,t.t)},p=(n,s,r)=>{let c,a,u,f=s.u[r],$=0;if(l||(o=!0,"slot"===f.m&&(f.t|=f.u?2:1)),1&f.t)c=f.h=i.createTextNode("");else if(c=f.h=i.createElement(2&f.t?"slot-fb":f.m),h(null,f,!1),f.u)for($=0;$<f.u.length;++$)a=p(n,f,$),a&&c.appendChild(a);return c["s-hn"]=t,3&f.t&&(c["s-sr"]=!0,c["s-cr"]=e,c["s-sn"]=f.$||"",u=n&&n.u&&n.u[r],u&&u.m===f.m&&n.h&&y(n.h,!1)),c},y=(e,l)=>{c.t|=1;const n=e.childNodes;for(let e=n.length-1;e>=0;e--){const s=n[e];s["s-hn"]!==t&&s["s-ol"]&&(v(s).insertBefore(s,k(s)),s["s-ol"].remove(),s["s-ol"]=void 0,o=!0),l&&y(s,l)}c.t&=-2},w=(e,t,l,n,o,s)=>{let r,i=e["s-cr"]&&e["s-cr"].parentNode||e;for(;o<=s;++o)n[o]&&(r=p(null,l,o),r&&(n[o].h=r,i.insertBefore(r,k(t))))},g=(e,t,l,o,s)=>{for(;t<=l;++t)(o=e[t])&&(s=o.h,T(o),n=!0,s["s-ol"]?s["s-ol"].remove():y(s,!0),s.remove())},j=(e,t)=>e.m===t.m&&("slot"!==e.m||e.$===t.$),k=e=>e&&e["s-ol"]||e,v=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,M=(e,t)=>{const l=t.h=e.h,n=e.u,o=t.u;"slot"===t.m||h(e,t,!1),null!==n&&null!==o?((e,t,l,n)=>{let o,s=0,r=0,i=t.length-1,c=t[0],a=t[i],u=n.length-1,f=n[0],$=n[u];for(;s<=i&&r<=u;)null==c?c=t[++s]:null==a?a=t[--i]:null==f?f=n[++r]:null==$?$=n[--u]:j(c,f)?(M(c,f),c=t[++s],f=n[++r]):j(a,$)?(M(a,$),a=t[--i],$=n[--u]):j(c,$)?("slot"!==c.m&&"slot"!==$.m||y(c.h.parentNode,!1),M(c,$),e.insertBefore(c.h,a.h.nextSibling),c=t[++s],$=n[--u]):j(a,f)?("slot"!==c.m&&"slot"!==$.m||y(a.h.parentNode,!1),M(a,f),e.insertBefore(a.h,c.h),a=t[--i],f=n[++r]):(o=p(t&&t[r],l,r),f=n[++r],o&&v(c.h).insertBefore(o,k(c.h)));s>i?w(e,null==n[u+1]?null:n[u+1].h,l,n,r,u):r>u&&g(t,s,i)})(l,n,t,o):null!==o?w(l,null,t,o,0,o.length-1):null!==n&&g(n,0,n.length-1)},O=e=>{let t,l,n,o,s,r,i=e.childNodes;for(l=0,n=i.length;l<n;l++)if(t=i[l],1===t.nodeType){if(t["s-sr"])for(s=t["s-sn"],t.hidden=!1,o=0;o<n;o++)if(r=i[o].nodeType,i[o]["s-hn"]!==t["s-hn"]||""!==s){if(1===r&&s===i[o].getAttribute("slot")){t.hidden=!0;break}}else if(1===r||3===r&&""!==i[o].textContent.trim()){t.hidden=!0;break}O(t)}},C=[],P=e=>{let t,l,o,s,r,i,c=0,a=e.childNodes,u=a.length;for(;c<u;c++){if(t=a[c],t["s-sr"]&&(l=t["s-cr"])&&l.parentNode)for(o=l.parentNode.childNodes,s=t["s-sn"],i=o.length-1;i>=0;i--)l=o[i],l["s-cn"]||l["s-nr"]||l["s-hn"]===t["s-hn"]||(R(l,s)?(r=C.find((e=>e.p===l)),n=!0,l["s-sn"]=l["s-sn"]||s,r?r.g=t:C.push({g:t,p:l}),l["s-sr"]&&C.map((e=>{R(e.p,l["s-sn"])&&(r=C.find((e=>e.p===l)),r&&!e.g&&(e.g=r.g))}))):C.some((e=>e.p===l))||C.push({p:l}));1===t.nodeType&&P(t)}},R=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,T=e=>{e.i&&e.i.ref&&e.i.ref(null),e.u&&e.u.map(T)},N=e=>K(e).j,x=(e,t,l)=>{const n=N(e);return{emit:e=>E(n,t,{bubbles:!!(4&l),composed:!!(2&l),cancelable:!!(1&l),detail:e})}},E=(e,t,l)=>{const n=c.ce(t,l);return e.dispatchEvent(n),n},L=(e,t)=>{t&&!e.k&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.k=t)))},A=(e,t)=>{if(e.t|=16,!(4&e.t))return L(e,e.v),ie((()=>F(e,t)));e.t|=512},F=(e,t)=>{const l=e.M;let n;return t&&(n=V(l,"componentWillLoad")),_(n,(()=>U(e,l)))},U=async(e,t)=>{const l=e.j,n=l["s-rc"];W(e,t),n&&(n.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>q(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},W=(s,r)=>{try{r=r.render(),s.t&=-17,s.t|=2,((s,r)=>{const a=s.j,u=s.O,f=s.C||d(null,null),b=(e=>e&&e.m===m)(r)?r:$(null,null,r);if(t=a.tagName,b.m=null,b.t|=4,s.C=b,b.h=f.h=a,e=a["s-cr"],l=0!=(1&u.t),n=!1,M(f,b),c.t|=1,o){let e,t,l,n,o,s;P(b.h);let r=0;for(;r<C.length;r++)e=C[r],t=e.p,t["s-ol"]||(l=i.createTextNode(""),l["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=l,t));for(r=0;r<C.length;r++)if(e=C[r],t=e.p,e.g){for(n=e.g.parentNode,o=e.g.nextSibling,l=t["s-ol"];l=l.previousSibling;)if(s=l["s-nr"],s&&s["s-sn"]===t["s-sn"]&&n===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&n!==t.parentNode||t.nextSibling!==o)&&t!==o&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),n.insertBefore(t,o))}else 1===t.nodeType&&(t.hidden=!0)}n&&O(b.h),c.t&=-2,C.length=0})(s,r)}catch(e){Y(e,s.j)}return null},q=e=>{const t=e.j,l=e.v;64&e.t||(e.t|=64,z(t),e.P(t),l||H()),e.R(t),e.k&&(e.k(),e.k=void 0),512&e.t&&re((()=>A(e,!1))),e.t&=-517},H=()=>{z(i.documentElement),re((()=>E(r,"appload",{detail:{namespace:"sjs"}})))},V=(e,t,l)=>{if(e&&e[t])try{return e[t](l)}catch(e){Y(e)}},_=(e,t)=>e&&e.then?e.then(t):t(),z=e=>e.classList.add("hydrated"),B=(e,t,l)=>{if(t.T){e.watchers&&(t.N=e.watchers);const n=Object.entries(t.T),o=e.prototype;if(n.map((([e,[n]])=>{31&n||2&l&&32&n?Object.defineProperty(o,e,{get(){return((e,t)=>K(this).L.get(t))(0,e)},set(l){((e,t,l,n)=>{const o=K(e),s=o.j,r=o.L.get(t),i=o.t,c=o.M;if(l=((e,t)=>null==e||f(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(l,n.T[t][0]),(!(8&i)||void 0===r)&&l!==r&&(!Number.isNaN(r)||!Number.isNaN(l))&&(o.L.set(t,l),c)){if(n.N&&128&i){const e=n.N[t];e&&e.map((e=>{try{c[e](l,r,t)}catch(e){Y(e,s)}}))}2==(18&i)&&A(o,!1)}})(this,e,l,t)},configurable:!0,enumerable:!0}):1&l&&64&n&&Object.defineProperty(o,e,{value(...t){const l=K(this);return l.A.then((()=>l.M[e](...t)))}})})),1&l){const t=new Map;o.attributeChangedCallback=function(e,l,n){c.jmp((()=>{const l=t.get(e);if(this.hasOwnProperty(l))n=this[l],delete this[l];else if(o.hasOwnProperty(l)&&"number"==typeof this[l]&&this[l]==n)return;this[l]=(null!==n||"boolean"!=typeof this[l])&&n}))},e.observedAttributes=n.filter((([e,t])=>15&t[0])).map((([e,l])=>{const n=l[1]||e;return t.set(n,e),n}))}}return e},D=e=>{V(e,"connectedCallback")},G=e=>{const t=e["s-cr"]=i.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)},I=(e,t={})=>{const l=[],n=t.exclude||[],o=r.customElements,s=i.head,a=s.querySelector("meta[charset]"),u=i.createElement("style"),f=[];let $,d=!0;Object.assign(c,t),c.l=new URL(t.resourcesUrl||"./",i.baseURI).href,e.map((e=>{e[1].map((t=>{const s={t:t[0],F:t[1],T:t[2],U:t[3]};s.T=t[2],s.N={};const r=s.F,i=class extends HTMLElement{constructor(e){super(e),S(e=this,s)}connectedCallback(){$&&(clearTimeout($),$=null),d?f.push(this):c.jmp((()=>(e=>{if(0==(1&c.t)){const t=K(e),l=t.O,n=()=>{};if(1&t.t)D(t.M);else{t.t|=1,12&l.t&&G(e);{let l=e;for(;l=l.parentNode||l.host;)if(l["s-p"]){L(t,t.v=l);break}}l.T&&Object.entries(l.T).map((([t,[l]])=>{if(31&l&&e.hasOwnProperty(t)){const l=e[t];delete e[t],e[t]=l}})),(async(e,t,l,n,o)=>{if(0==(32&t.t)){if(t.t|=32,(o=ee(l)).then){const e=()=>{};o=await o,e()}o.isProxied||(l.N=o.watchers,B(o,l,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(e){Y(e)}t.t&=-9,t.t|=128,e(),D(t.M)}const s=t.v,r=()=>A(t,!0);s&&s["s-rc"]?s["s-rc"].push(r):r()})(0,t,l)}n()}})(this)))}disconnectedCallback(){c.jmp((()=>(()=>{0==(1&c.t)&&V(K(this).M,"disconnectedCallback")})()))}componentOnReady(){return K(this).W}};s.q=e[0],n.includes(r)||o.get(r)||(l.push(r),o.define(r,B(i,s,1)))}))})),u.innerHTML=l+"{visibility:hidden}.hydrated{visibility:inherit}",u.setAttribute("data-styles",""),s.insertBefore(u,a?a.nextSibling:s.firstChild),d=!1,f.length?f.map((e=>e.connectedCallback())):c.jmp((()=>$=setTimeout(H,30)))},J=new WeakMap,K=e=>J.get(e),Q=(e,t)=>J.set(t.M=e,t),S=(e,t)=>{const l={t:0,j:e,O:t,L:new Map};return l.A=new Promise((e=>l.R=e)),l.W=new Promise((e=>l.P=e)),e["s-p"]=[],e["s-rc"]=[],J.set(e,l)},X=(e,t)=>t in e,Y=(e,t)=>(0,console.error)(e,t),Z=new Map,ee=e=>{const t=e.F.replace(/-/g,"_"),l=e.q,n=Z.get(l);return n?n[t]:import(`./${l}.entry.js`).then((e=>(Z.set(l,e),e[t])),Y)},te=[],le=[],ne=(e,t)=>l=>{e.push(l),s||(s=!0,t&&4&c.t?re(se):c.raf(se))},oe=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){Y(e)}e.length=0},se=()=>{oe(te),oe(le),(s=te.length>0)&&c.raf(se)},re=e=>a().then(e),ie=ne(le,!0);export{I as b,x as c,N as g,$ as h,a as p,Q as r}