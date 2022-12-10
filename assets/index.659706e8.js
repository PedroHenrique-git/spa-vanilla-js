var ge=Object.defineProperty;var me=(e,t,i)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var I=(e,t,i)=>(me(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const G="/spa-vanilla-js/";function ae(){const e=new CustomEvent("changeRoute",{bubbles:!0,cancelable:!0,composed:!0,detail:{url:new URL(window.location.href)}});dispatchEvent(e)}function be(e){for(var t=[],i=0;i<e.length;){var n=e[i];if(n==="*"||n==="+"||n==="?"){t.push({type:"MODIFIER",index:i,value:e[i++]});continue}if(n==="\\"){t.push({type:"ESCAPED_CHAR",index:i++,value:e[i++]});continue}if(n==="{"){t.push({type:"OPEN",index:i,value:e[i++]});continue}if(n==="}"){t.push({type:"CLOSE",index:i,value:e[i++]});continue}if(n===":"){for(var r="",o=i+1;o<e.length;){var l=e.charCodeAt(o);if(l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||l===95){r+=e[o++];continue}break}if(!r)throw new TypeError("Missing parameter name at ".concat(i));t.push({type:"NAME",index:i,value:r}),i=o;continue}if(n==="("){var a=1,s="",o=i+1;if(e[o]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(o));for(;o<e.length;){if(e[o]==="\\"){s+=e[o++]+e[o++];continue}if(e[o]===")"){if(a--,a===0){o++;break}}else if(e[o]==="("&&(a++,e[o+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(o));s+=e[o++]}if(a)throw new TypeError("Unbalanced pattern at ".concat(i));if(!s)throw new TypeError("Missing pattern at ".concat(i));t.push({type:"PATTERN",index:i,value:s}),i=o;continue}t.push({type:"CHAR",index:i,value:e[i++]})}return t.push({type:"END",index:i,value:""}),t}function Se(e,t){t===void 0&&(t={});for(var i=be(e),n=t.prefixes,r=n===void 0?"./":n,o="[^".concat(_(t.delimiter||"/#?"),"]+?"),l=[],a=0,s=0,d="",h=function(y){if(s<i.length&&i[s].type===y)return i[s++].value},g=function(y){var R=h(y);if(R!==void 0)return R;var w=i[s],C=w.type,$=w.index;throw new TypeError("Unexpected ".concat(C," at ").concat($,", expected ").concat(y))},u=function(){for(var y="",R;R=h("CHAR")||h("ESCAPED_CHAR");)y+=R;return y};s<i.length;){var p=h("CHAR"),m=h("NAME"),x=h("PATTERN");if(m||x){var S=p||"";r.indexOf(S)===-1&&(d+=S,S=""),d&&(l.push(d),d=""),l.push({name:m||a++,prefix:S,suffix:"",pattern:x||o,modifier:h("MODIFIER")||""});continue}var f=p||h("ESCAPED_CHAR");if(f){d+=f;continue}d&&(l.push(d),d="");var k=h("OPEN");if(k){var S=u(),T=h("NAME")||"",b=h("PATTERN")||"",B=u();g("CLOSE"),l.push({name:T||(b?a++:""),pattern:T&&!b?o:b,prefix:S,suffix:B,modifier:h("MODIFIER")||""});continue}g("END")}return l}function _(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function le(e){return e&&e.sensitive?"":"i"}function ye(e,t){if(!t)return e;for(var i=/\((?:\?<(.*?)>)?(?!\?)/g,n=0,r=i.exec(e.source);r;)t.push({name:r[1]||n++,prefix:"",suffix:"",modifier:"",pattern:""}),r=i.exec(e.source);return e}function ve(e,t,i){var n=e.map(function(r){return ce(r,t,i).source});return new RegExp("(?:".concat(n.join("|"),")"),le(i))}function xe(e,t,i){return ke(Se(e,i),t,i)}function ke(e,t,i){i===void 0&&(i={});for(var n=i.strict,r=n===void 0?!1:n,o=i.start,l=o===void 0?!0:o,a=i.end,s=a===void 0?!0:a,d=i.encode,h=d===void 0?function($){return $}:d,g=i.delimiter,u=g===void 0?"/#?":g,p=i.endsWith,m=p===void 0?"":p,x="[".concat(_(m),"]|$"),S="[".concat(_(u),"]"),f=l?"^":"",k=0,T=e;k<T.length;k++){var b=T[k];if(typeof b=="string")f+=_(h(b));else{var B=_(h(b.prefix)),y=_(h(b.suffix));if(b.pattern)if(t&&t.push(b),B||y)if(b.modifier==="+"||b.modifier==="*"){var R=b.modifier==="*"?"?":"";f+="(?:".concat(B,"((?:").concat(b.pattern,")(?:").concat(y).concat(B,"(?:").concat(b.pattern,"))*)").concat(y,")").concat(R)}else f+="(?:".concat(B,"(").concat(b.pattern,")").concat(y,")").concat(b.modifier);else b.modifier==="+"||b.modifier==="*"?f+="((?:".concat(b.pattern,")").concat(b.modifier,")"):f+="(".concat(b.pattern,")").concat(b.modifier);else f+="(?:".concat(B).concat(y,")").concat(b.modifier)}}if(s)r||(f+="".concat(S,"?")),f+=i.endsWith?"(?=".concat(x,")"):"$";else{var w=e[e.length-1],C=typeof w=="string"?S.indexOf(w[w.length-1])>-1:w===void 0;r||(f+="(?:".concat(S,"(?=").concat(x,"))?")),C||(f+="(?=".concat(S,"|").concat(x,")"))}return new RegExp(f,le(i))}function ce(e,t,i){return e instanceof RegExp?ye(e,t):Array.isArray(e)?ve(e,t,i):xe(e,t,i)}function de(e){return ce(e)}function Re(e,t){return t.match(de(e))}function we(){window.componentRegistry={},window.nextId=0}function $e(e){window.componentRegistry||(window.componentRegistry={}),window.nextId||(window.nextId=0),window.componentRegistry[++window.nextId]=e}class Ee{constructor(t,i){I(this,"_routeData",{params:[],queryParams:new URLSearchParams});this.routes=t,this.root=i,this.routes=t,this.root=i,this.handleRoutes(),this.handleRoute(),this.handlePopState(),this.init()}init(){this.dispatchNavigationEvent()}handlePopState(){window.addEventListener("popstate",this.dispatchNavigationEvent.bind(this))}handleRoutes(){document.addEventListener("click",this.onNavigation.bind(this))}handleRoute(){window.addEventListener("changeRoute",this.onRouteChange.bind(this))}onRouteChange(t){var r;const{detail:{url:i}}=t;(r=this.root)==null||r.replaceChildren();const n=Object.keys(this.routes).find(o=>Re(o,i.pathname));if(n){const o=i.pathname.split(de(n)).filter(l=>l);this._routeData={params:o,queryParams:i.searchParams},we(),this.routes[n](this._routeData)}}onNavigation(t){t.preventDefault();const i=t.target;if(!i.hasAttribute("route"))return;const n=i.getAttribute("href");window.history.pushState({},"",n),this.dispatchNavigationEvent()}dispatchNavigationEvent(){ae()}}class q{constructor(t){I(this,"observers",[]);I(this,"_state",null);this._state=t||null}getState(){return this._state}setState(t){this._state=t,this.notify()}subscribe(...t){t.forEach(i=>{this.observers.includes(i)||this.observers.push(i)})}unsubscribe(t){const i=this.observers.indexOf(t);if(i!==-1){const n=this.observers.filter((r,o)=>o!==i);this.observers=n}}notify(){this.observers.forEach(t=>{t.update(this)})}}function Ie(){const e=document.getElementById("app");if(e)return e;const t=document.createElement("div");return t.id="app",document.body.appendChild(t),t}function Be(e){return document.createRange().createContextualFragment(e)}class J{constructor(t,i,n,r){I(this,"_state",null);I(this,"_props",null);I(this,"template",new DocumentFragment);I(this,"reference",null);I(this,"childrenReference",[]);I(this,"root");I(this,"key");this.children=r,$e(this),t?this.root=t:this.root=Ie(),this.key=window.nextId,this.updateReference(),n&&(this._props=n),r&&(this.children=r),i?this.initializeWithState(i):this.initializeWithoutState()}initializeWithState(t){this.firstRender(),this._state=t,this._state.subscribe(this),this._state.notify()}initializeWithoutState(){this.firstRender()}mountChildren(t=!1){if(!!this.children){if(t){this.rerenderChildren(),this.clearOldChildren();return}this.renderChildren()}}initializeEventsAndSelectors(){this.selectors&&this.selectors(),this.events&&this.events()}getProps(){return this._props}setState(t){var i;if(!this._state){const n=new q(t);this._state=n,this._state.subscribe(this),this._state.notify()}(i=this._state)==null||i.setState(t)}getState(){var t;return(t=this._state)==null?void 0:t.getState()}update(t){t instanceof q&&this.rerender()}renderChildren(){if(!!this.children)for(const t of this.children){const[i,n,r]=t;if(this.reference){const o=new i(this.reference,n,r);this.childrenReference.push(o)}}}rerenderChildren(){!this.children||this.children.forEach((t,i)=>{var s;const[n,r,o]=t,l=(s=this.childrenReference[i])==null?void 0:s.getState(),a=l?new q(l):r;if(this.reference){const d=new n(this.reference,a,o);this.childrenReference.push(d)}})}firstRender(){this.updateTemplate(),this.root.append(this.template),this.updateReference(),this.initializeEventsAndSelectors(),this.mountChildren()}updateTemplate(){var t;if(this.template=Be(this.render()),this.template.children.length>1)throw new Error("a component must have a parent element");(t=this.template.children.item(0))==null||t.setAttribute("key",String(this.key))}rerender(){this.updateTemplate(),this.updateReference(),this.root.children.length&&this.reference&&this.root.replaceChild(this.template,this.reference),this.updateReference(),this.mountChildren(!0),this.initializeEventsAndSelectors()}clearOldChildren(){if(!!this.children)for(;this.childrenReference.length!==this.children.length;)this.childrenReference.shift()}updateReference(){this.reference=this.root.querySelector(`[key='${this.key}']`)}}function Ce(e){window.history.pushState({},"",e),ae()}var v="colors",E="sizes",c="space",Te={gap:c,gridGap:c,columnGap:c,gridColumnGap:c,rowGap:c,gridRowGap:c,inset:c,insetBlock:c,insetBlockEnd:c,insetBlockStart:c,insetInline:c,insetInlineEnd:c,insetInlineStart:c,margin:c,marginTop:c,marginRight:c,marginBottom:c,marginLeft:c,marginBlock:c,marginBlockEnd:c,marginBlockStart:c,marginInline:c,marginInlineEnd:c,marginInlineStart:c,padding:c,paddingTop:c,paddingRight:c,paddingBottom:c,paddingLeft:c,paddingBlock:c,paddingBlockEnd:c,paddingBlockStart:c,paddingInline:c,paddingInlineEnd:c,paddingInlineStart:c,top:c,right:c,bottom:c,left:c,scrollMargin:c,scrollMarginTop:c,scrollMarginRight:c,scrollMarginBottom:c,scrollMarginLeft:c,scrollMarginX:c,scrollMarginY:c,scrollMarginBlock:c,scrollMarginBlockEnd:c,scrollMarginBlockStart:c,scrollMarginInline:c,scrollMarginInlineEnd:c,scrollMarginInlineStart:c,scrollPadding:c,scrollPaddingTop:c,scrollPaddingRight:c,scrollPaddingBottom:c,scrollPaddingLeft:c,scrollPaddingX:c,scrollPaddingY:c,scrollPaddingBlock:c,scrollPaddingBlockEnd:c,scrollPaddingBlockStart:c,scrollPaddingInline:c,scrollPaddingInlineEnd:c,scrollPaddingInlineStart:c,fontSize:"fontSizes",background:v,backgroundColor:v,backgroundImage:v,borderImage:v,border:v,borderBlock:v,borderBlockEnd:v,borderBlockStart:v,borderBottom:v,borderBottomColor:v,borderColor:v,borderInline:v,borderInlineEnd:v,borderInlineStart:v,borderLeft:v,borderLeftColor:v,borderRight:v,borderRightColor:v,borderTop:v,borderTopColor:v,caretColor:v,color:v,columnRuleColor:v,fill:v,outline:v,outlineColor:v,stroke:v,textDecorationColor:v,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:E,minBlockSize:E,maxBlockSize:E,inlineSize:E,minInlineSize:E,maxInlineSize:E,width:E,minWidth:E,maxWidth:E,height:E,minHeight:E,maxHeight:E,flexBasis:E,gridTemplateColumns:E,gridTemplateRows:E,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},ze=(e,t)=>typeof t=="function"?{"()":Function.prototype.toString.call(t)}:t,D=()=>{const e=Object.create(null);return(t,i,...n)=>{const r=(o=>JSON.stringify(o,ze))(t);return r in e?e[r]:e[r]=i(t,...n)}},U=Symbol.for("sxs.internal"),ee=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),ie=e=>{for(const t in e)return!0;return!1},{hasOwnProperty:We}=Object.prototype,Q=e=>e.includes("-")?e:e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase()),je=/\s+(?![^()]*\))/,A=e=>t=>e(...typeof t=="string"?String(t).split(je):[t]),ne={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:A((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e})),marginInline:A((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e})),maxSize:A((e,t)=>({maxBlockSize:e,maxInlineSize:t||e})),minSize:A((e,t)=>({minBlockSize:e,minInlineSize:t||e})),paddingBlock:A((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e})),paddingInline:A((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e}))},K=/([\d.]+)([^]*)/,Pe=(e,t)=>e.length?e.reduce((i,n)=>(i.push(...t.map(r=>r.includes("&")?r.replace(/&/g,/[ +>|~]/.test(n)&&/&.*&/.test(r)?`:is(${n})`:n):n+" "+r)),i),[]):t,Me=(e,t)=>e in Ae&&typeof t=="string"?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(i,n,r,o)=>n+(r==="stretch"?`-moz-available${o};${Q(e)}:${n}-webkit-fill-available`:`-moz-fit-content${o};${Q(e)}:${n}fit-content`)+o):String(t),Ae={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},W=e=>e?e+"-":"",ue=(e,t,i)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(n,r,o,l,a)=>l=="$"==!!o?n:(r||l=="--"?"calc(":"")+"var(--"+(l==="$"?W(t)+(a.includes("$")?"":W(i))+a.replace(/\$/g,"-"):a)+")"+(r||l=="--"?"*"+(r||"")+(o||"1")+")":"")),_e=/\s*,\s*(?![^()]*\))/,Le=Object.prototype.toString,L=(e,t,i,n,r)=>{let o,l,a;const s=(d,h,g)=>{let u,p;const m=x=>{for(u in x){const k=u.charCodeAt(0)===64,T=k&&Array.isArray(x[u])?x[u]:[x[u]];for(p of T){const b=/[A-Z]/.test(f=u)?f:f.replace(/-[^]/g,y=>y[1].toUpperCase()),B=typeof p=="object"&&p&&p.toString===Le&&(!n.utils[b]||!h.length);if(b in n.utils&&!B){const y=n.utils[b];if(y!==l){l=y,m(y(p)),l=null;continue}}else if(b in ne){const y=ne[b];if(y!==a){a=y,m(y(p)),a=null;continue}}if(k&&(S=u.slice(1)in n.media?"@media "+n.media[u.slice(1)]:u,u=S.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(y,R,w,C,$,z)=>{const M=K.test(R),H=.0625*(M?-1:1),[F,te]=M?[C,R]:[R,C];return"("+(w[0]==="="?"":w[0]===">"===M?"max-":"min-")+F+":"+(w[0]!=="="&&w.length===1?te.replace(K,(fe,X,Y)=>Number(X)+H*(w===">"?1:-1)+Y):te)+($?") and ("+($[0]===">"?"min-":"max-")+F+":"+($.length===1?z.replace(K,(fe,X,Y)=>Number(X)+H*($===">"?-1:1)+Y):z):"")+")"})),B){const y=k?g.concat(u):[...g],R=k?[...h]:Pe(h,u.split(_e));o!==void 0&&r(re(...o)),o=void 0,s(p,R,y)}else o===void 0&&(o=[[],h,g]),u=k||u.charCodeAt(0)!==36?u:`--${W(n.prefix)}${u.slice(1).replace(/\$/g,"-")}`,p=B?p:typeof p=="number"?p&&b in Oe?String(p)+"px":String(p):ue(Me(b,p==null?"":p),n.prefix,n.themeMap[b]),o[0].push(`${k?`${u} `:`${Q(u)}:`}${p}`)}}var S,f};m(d),o!==void 0&&r(re(...o)),o=void 0};s(e,t,i)},re=(e,t,i)=>`${i.map(n=>`${n}{`).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(i.length?i.length+1:0).join("}")}`,Oe={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},oe=e=>String.fromCharCode(e+(e>25?39:97)),j=e=>(t=>{let i,n="";for(i=Math.abs(t);i>52;i=i/52|0)n=oe(i%52)+n;return oe(i%52)+n})(((t,i)=>{let n=i.length;for(;n;)t=33*t^i.charCodeAt(--n);return t})(5381,JSON.stringify(e))>>>0),N=["themed","global","styled","onevar","resonevar","allvar","inline"],Ne=e=>{if(e.href&&!e.href.startsWith(location.origin))return!1;try{return!!e.cssRules}catch{return!1}},De=e=>{let t;const i=()=>{const{cssRules:r}=t.sheet;return[].map.call(r,(o,l)=>{const{cssText:a}=o;let s="";if(a.startsWith("--sxs"))return"";if(r[l-1]&&(s=r[l-1].cssText).startsWith("--sxs")){if(!o.cssRules.length)return"";for(const d in t.rules)if(t.rules[d].group===o)return`--sxs{--sxs:${[...t.rules[d].cache].join(" ")}}${a}`;return o.cssRules.length?`${s}${a}`:""}return a}).join("")},n=()=>{if(t){const{rules:a,sheet:s}=t;if(!s.deleteRule){for(;Object(Object(s.cssRules)[0]).type===3;)s.cssRules.splice(0,1);s.cssRules=[]}for(const d in a)delete a[d]}const r=Object(e).styleSheets||[];for(const a of r)if(Ne(a)){for(let s=0,d=a.cssRules;d[s];++s){const h=Object(d[s]);if(h.type!==1)continue;const g=Object(d[s+1]);if(g.type!==4)continue;++s;const{cssText:u}=h;if(!u.startsWith("--sxs"))continue;const p=u.slice(14,-3).trim().split(/\s+/),m=N[p[0]];m&&(t||(t={sheet:a,reset:n,rules:{},toString:i}),t.rules[m]={group:g,index:s,cache:new Set(p)})}if(t)break}if(!t){const a=(s,d)=>({type:d,cssRules:[],insertRule(h,g){this.cssRules.splice(g,0,a(h,{import:3,undefined:1}[(h.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return s==="@media{}"?`@media{${[].map.call(this.cssRules,h=>h.cssText).join("")}}`:s}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:a("","text/css"),rules:{},reset:n,toString:i}}const{sheet:o,rules:l}=t;for(let a=N.length-1;a>=0;--a){const s=N[a];if(!l[s]){const d=N[a+1],h=l[d]?l[d].index:o.cssRules.length;o.insertRule("@media{}",h),o.insertRule(`--sxs{--sxs:${a}}`,h),l[s]={group:o.cssRules[h+1],index:h,cache:new Set([a])}}He(l[s])}};return n(),t},He=e=>{const t=e.group;let i=t.cssRules.length;e.apply=n=>{try{t.insertRule(n,i),++i}catch{}}},O=Symbol(),Fe=D(),qe=(e,t)=>Fe(e,()=>(...i)=>{let n={type:null,composers:new Set};for(const r of i)if(r!=null)if(r[U]){n.type==null&&(n.type=r[U].type);for(const o of r[U].composers)n.composers.add(o)}else r.constructor!==Object||r.$$typeof?n.type==null&&(n.type=r):n.composers.add(Ue(r,e));return n.type==null&&(n.type="span"),n.composers.size||n.composers.add(["PJLV",{},[],[],{},[]]),Ve(e,n,t)}),Ue=({variants:e,compoundVariants:t,defaultVariants:i,...n},r)=>{const o=`${W(r.prefix)}c-${j(n)}`,l=[],a=[],s=Object.create(null),d=[];for(const u in i)s[u]=String(i[u]);if(typeof e=="object"&&e)for(const u in e){h=s,g=u,We.call(h,g)||(s[u]="undefined");const p=e[u];for(const m in p){const x={[u]:String(m)};String(m)==="undefined"&&d.push(u);const S=p[m],f=[x,S,!ie(S)];l.push(f)}}var h,g;if(typeof t=="object"&&t)for(const u of t){let{css:p,...m}=u;p=typeof p=="object"&&p||{};for(const S in m)m[S]=String(m[S]);const x=[m,p,!ie(p)];a.push(x)}return[o,n,l,a,s,d]},Ve=(e,t,i)=>{const[n,r,o,l]=Ge(t.composers),a=typeof t.type=="function"||t.type.$$typeof?(g=>{function u(){for(let p=0;p<u[O].length;p++){const[m,x]=u[O][p];g.rules[m].apply(x)}return u[O]=[],null}return u[O]=[],u.rules={},N.forEach(p=>u.rules[p]={apply:m=>u[O].push([p,m])}),u})(i):null,s=(a||i).rules,d=`.${n}${r.length>1?`:where(.${r.slice(1).join(".")})`:""}`,h=g=>{g=typeof g=="object"&&g||Je;const{css:u,...p}=g,m={};for(const f in o)if(delete p[f],f in g){let k=g[f];typeof k=="object"&&k?m[f]={"@initial":o[f],...k}:(k=String(k),m[f]=k!=="undefined"||l.has(f)?k:o[f])}else m[f]=o[f];const x=new Set([...r]);for(const[f,k,T,b]of t.composers){i.rules.styled.cache.has(f)||(i.rules.styled.cache.add(f),L(k,[`.${f}`],[],e,R=>{s.styled.apply(R)}));const B=se(T,m,e.media),y=se(b,m,e.media,!0);for(const R of B)if(R!==void 0)for(const[w,C,$]of R){const z=`${f}-${j(C)}-${w}`;x.add(z);const M=($?i.rules.resonevar:i.rules.onevar).cache,H=$?s.resonevar:s.onevar;M.has(z)||(M.add(z),L(C,[`.${z}`],[],e,F=>{H.apply(F)}))}for(const R of y)if(R!==void 0)for(const[w,C]of R){const $=`${f}-${j(C)}-${w}`;x.add($),i.rules.allvar.cache.has($)||(i.rules.allvar.cache.add($),L(C,[`.${$}`],[],e,z=>{s.allvar.apply(z)}))}}if(typeof u=="object"&&u){const f=`${n}-i${j(u)}-css`;x.add(f),i.rules.inline.cache.has(f)||(i.rules.inline.cache.add(f),L(u,[`.${f}`],[],e,k=>{s.inline.apply(k)}))}for(const f of String(g.className||"").trim().split(/\s+/))f&&x.add(f);const S=p.className=[...x].join(" ");return{type:t.type,className:S,selector:d,props:p,toString:()=>S,deferredInjector:a}};return ee(h,{className:n,selector:d,[U]:t,toString:()=>(i.rules.styled.cache.has(n)||h(),n)})},Ge=e=>{let t="";const i=[],n={},r=[];for(const[o,,,,l,a]of e){t===""&&(t=o),i.push(o),r.push(...a);for(const s in l){const d=l[s];(n[s]===void 0||d!=="undefined"||a.includes(d))&&(n[s]=d)}}return[t,i,n,new Set(r)]},se=(e,t,i,n)=>{const r=[];e:for(let[o,l,a]of e){if(a)continue;let s,d=0,h=!1;for(s in o){const g=o[s];let u=t[s];if(u!==g){if(typeof u!="object"||!u)continue e;{let p,m,x=0;for(const S in u){if(g===String(u[S])){if(S!=="@initial"){const f=S.slice(1);(m=m||[]).push(f in i?i[f]:S.replace(/^@media ?/,"")),h=!0}d+=x,p=!0}++x}if(m&&m.length&&(l={["@media "+m.join(", ")]:l}),!p)continue e}}}(r[d]=r[d]||[]).push([n?"cv":`${s}-${o[s]}`,l,h])}return r},Je={},Ze=D(),Xe=(e,t)=>Ze(e,()=>(...i)=>{const n=()=>{for(let r of i){r=typeof r=="object"&&r||{};let o=j(r);if(!t.rules.global.cache.has(o)){if(t.rules.global.cache.add(o),"@import"in r){let l=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let a of[].concat(r["@import"]))a=a.includes('"')||a.includes("'")?a:`"${a}"`,t.sheet.insertRule(`@import ${a};`,l++);delete r["@import"]}L(r,[],[],e,l=>{t.rules.global.apply(l)})}}return""};return ee(n,{toString:n})}),Ye=D(),Ke=(e,t)=>Ye(e,()=>i=>{const n=`${W(e.prefix)}k-${j(i)}`,r=()=>{if(!t.rules.global.cache.has(n)){t.rules.global.cache.add(n);const o=[];L(i,[],[],e,a=>o.push(a));const l=`@keyframes ${n}{${o.join("")}}`;t.rules.global.apply(l)}return n};return ee(r,{get name(){return r()},toString:r})}),Qe=class{constructor(e,t,i,n){this.token=e==null?"":String(e),this.value=t==null?"":String(t),this.scale=i==null?"":String(i),this.prefix=n==null?"":String(n)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+W(this.prefix)+W(this.scale)+this.token}toString(){return this.computedValue}},et=D(),tt=(e,t)=>et(e,()=>(i,n)=>{n=typeof i=="object"&&i||Object(n);const r=`.${i=(i=typeof i=="string"?i:"")||`${W(e.prefix)}t-${j(n)}`}`,o={},l=[];for(const s in n){o[s]={};for(const d in n[s]){const h=`--${W(e.prefix)}${s}-${d}`,g=ue(String(n[s][d]),e.prefix,s);o[s][d]=new Qe(d,g,s,e.prefix),l.push(`${h}:${g}`)}}const a=()=>{if(l.length&&!t.rules.themed.cache.has(i)){t.rules.themed.cache.add(i);const s=`${n===e.theme?":root,":""}.${i}{${l.join(";")}}`;t.rules.themed.apply(s)}return i};return{...o,get className(){return a()},selector:r,toString:a}}),it=D(),nt=e=>{let t=!1;const i=it(e,n=>{t=!0;const r="prefix"in(n=typeof n=="object"&&n||{})?String(n.prefix):"",o=typeof n.media=="object"&&n.media||{},l=typeof n.root=="object"?n.root||null:globalThis.document||null,a=typeof n.theme=="object"&&n.theme||{},s={prefix:r,media:o,theme:a,themeMap:typeof n.themeMap=="object"&&n.themeMap||{...Te},utils:typeof n.utils=="object"&&n.utils||{}},d=De(l),h={css:qe(s,d),globalCss:Xe(s,d),keyframes:Ke(s,d),createTheme:tt(s,d),reset(){d.reset(),h.theme.toString()},theme:{},sheet:d,config:s,prefix:r,getCssText:d.toString,toString:d.toString};return String(h.theme=h.createTheme(a)),h});return t||i.reset(),i};const{css:Z,globalCss:rt}=nt({media:{mobile:"(max-width: 1024px)",tablet:"(max-width: 768px)",notebook:"(max-width: 1366px)"},theme:{colors:{white:"#fff",black:"#000",gray:"#ccc"},fonts:{principal:"Roboto, sans-serif"},space:{sp1:"1rem"},fontWeights:{regular:400,medium:500,thin:100}}}),ot=Z({".edit-task__container":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",width:"100%",marginTop:"25px"},".form":{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start",gap:"30px",".input_container":{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"10px",'input[type="text"]':{outline:"none",border:"1px solid #cecece",borderRadius:"20px",padding:"10px 20px"},'input[type="checkbox"]':{width:"15px",height:"15px"}}}});class st extends J{constructor(){super(...arguments);I(this,"statusSelect",null);I(this,"saveButton",null);I(this,"taskName",null)}selectors(){this.statusSelect=this.root.querySelector("#status"),this.taskName=this.root.querySelector("#task_name"),this.saveButton=this.root.querySelector("#save_task")}events(){var i;(i=this.saveButton)==null||i.addEventListener("click",this.saveEdition.bind(this))}saveEdition(){var r;this.selectors();const i=(r=this.getState())!=null?r:{},n=i.tasks.map((o,l)=>{var a,s,d,h,g;return l===((a=i.selectedTask)==null?void 0:a.id)?{name:(d=(s=this.taskName)==null?void 0:s.value)!=null?d:"",status:(g=(h=this.statusSelect)==null?void 0:h.value)!=null?g:""}:o});this.setState({...i,tasks:n}),Ce(G)}render(){var i,n,r,o,l,a,s,d,h;return String.raw`
        <main class='content ${ot()}'>
            <div class='edit-task__container'>
                <div class="form">
                    <div class="input_container">
                        <input type='text' value='${(r=(n=(i=this.getState())==null?void 0:i.selectedTask)==null?void 0:n.task)==null?void 0:r.name}' id="task_name"/>
                    </div>
                    <div class="input_container">
                        <label for="status">Status</label>
                        <select id="status">
                            <option value="done" ${((a=(l=(o=this.getState())==null?void 0:o.selectedTask)==null?void 0:l.task)==null?void 0:a.status)==="done"?"selected":""}>Done</option>
                            <option value="In progress" ${((h=(d=(s=this.getState())==null?void 0:s.selectedTask)==null?void 0:d.task)==null?void 0:h.status)==="In progress"?"selected":""}>In progress</option>
                        </select>
                    </div>
                    <button id="save_task">Save</button>
                </div>
            </div>
        </main>
    `}}const at=Z({borderTop:"1px solid #cecece",padding:"$sp1",display:"flex",alignItems:"center",justifyContent:"center"});class he extends J{render(){var t,i;return String.raw`
        <footer class='${at()}'>
            <h1>${(i=(t=this.getProps())==null?void 0:t.title)!=null?i:"Footer"}</h1>
        </footer>    
    `}}const lt=Z({borderBottom:"1px solid #cecece",padding:"$sp1",display:"flex",alignItems:"center",justifyContent:"center"});class pe extends J{render(){var t,i;return String.raw`
        <header class='${lt()}'>
            <h1>${(i=(t=this.getProps())==null?void 0:t.title)!=null?i:"Header"}</h1>
        </header>    
    `}}const ct=e=>{var n,r,o;const[t]=(n=e==null?void 0:e.params)!=null?n:[],i=(r=V.getState())!=null?r:{};V.setState({...i,selectedTask:{task:(o=i==null?void 0:i.tasks)==null?void 0:o.find((l,a)=>a===Number(t)),id:Number(t)}}),new pe(P,void 0,{title:"My Header"}),new st(P,V),new he(P,void 0,{title:"My Footer"})},dt=Z({".list__container":{display:"flex",justifyContent:"center",alignItems:"center",width:"100%","& > ul":{"& li":{marginBottom:"10px",display:"flex",justifyContent:"center",alignItems:"center",gap:"20px","& .actions":{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px","[route]":{color:"blue"}},"&.done p":{textDecoration:"line-through"}}}}});class ut extends J{events(){document.querySelectorAll(".delete_task").forEach(t=>{t.addEventListener("click",this.deleteTask.bind(this,t))})}deleteTask(t){var o;if(!t.getAttribute("task"))return;const i=Number(t.getAttribute("task")),n=(o=this.getState())!=null?o:{},r=n==null?void 0:n.tasks.filter((l,a)=>a!==i);this.setState({...n,tasks:r!=null?r:[]})}render(){var t;return String.raw`
        <main class='content ${dt}'>
            <div class='list__container'>
                <ul>
                    ${(t=this.getState())==null?void 0:t.tasks.map((i,n)=>String.raw`
                            <li class='${i.status==="done"?"done":""}'>
                                <p>${i.name}</p>
                                <div class='actions'>
                                    <a href='${G}task/${n}' route>edit</a>
                                    <button class="delete_task" task='${n}'>delete</button>
                                </div>
                            </li>
                        `).join("")}
                </ul>        
            </div>
        </main>
    `}}const ht=()=>{new pe(P,void 0,{title:"My Header"}),new ut(P,V),new he(P,void 0,{title:"My Footer"})},pt=rt({"*":{padding:"0",margin:"0",boxSizing:"border-box",color:"$black",fontFamily:"$principal",fontWeight:"$medium",fontSize:"medium"},html:{fontSize:"62.5%"},button:{border:"none",background:"#cecece",padding:".5rem",cursor:"pointer","&:hover":{opacity:".4",transition:"opacity 300ms ease-in-out"}},".content":{maxWidth:"1440px",minHeight:"100vh",width:"100%",margin:"0 auto",padding:"$sp1"}});pt();const ft={tasks:[{name:"buy rice",status:"In progress"},{name:"study english",status:"done"},{name:"go to the gym",status:"In progress"},{name:"walk the dog",status:"done"}],selectedTask:null},P=document.getElementById("app"),V=new q(ft);new Ee({[`${G}`]:ht,[`${G}task/:id`]:ct},P);
