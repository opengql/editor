"use strict";(self.webpackChunkgql_editor=self.webpackChunkgql_editor||[]).push([[590],{784:(e,t,a)=>{var r=a(504),n=a(352),s=a(947),i=a(132);const l={IDLE:"IDLE",INITIALIZING:"INITIALIZING",PARSING:"PARSING"},o=(0,i.is)({name:"editor",initialState:{state:l.IDLE,value:"MATCH (p:Person)-[:LIVES_IN]->(c:City) RETURN p"},reducers:{setValue:(e,t)=>({...e,value:t.payload}),setState:(e,t)=>({...e,state:t.payload})}}),c=o.actions,d=o.reducer,m=(0,i.is)({name:"caret-data",initialState:{position:{x:0,y:0},index:0,nextIndex:-1},reducers:{update:(e,t)=>{let{payload:a}=t;const r=a.selectionStart,n=a.value.substring(0,r).split("\n");return{...e,position:{x:n.length,y:n[n.length-1].length},index:r}},updateNextIndex:(e,t)=>{let{payload:a}=t;return{...e,nextIndex:a}}}}),u=m.actions,p=m.reducer,h={EDITOR:"EDITOR",PARSE_TREE:"PARSE_TREE"},g=(0,i.is)({name:"view",initialState:{type:h.EDITOR},reducers:{changeView:(e,t)=>{let{payload:a}=t;return{...e,type:a}}}}),E=g.actions,v=g.reducer,f=(0,i.is)({name:"parse-result",initialState:{errors:[],tree:[]},reducers:{update:(e,t)=>{let{payload:a}=t;return{...e,errors:a.errors,tree:a.parseTree}}}}),w=f.actions,b=f.reducer,y=(0,i.is)({name:"language",initialState:{grammarDefinition:{},examples:[],isInitialized:!1},reducers:{initialize:(e,t)=>{let{payload:a}=t;return{grammarDefinition:a.grammarDefinition,examples:a.examples,isInitialized:!0}}}}),x=y.actions,R=y.reducer,I=(0,i.is)({name:"examples-search",initialState:{options:{includeScore:!1,shouldSort:!0,keys:["name","code"]},phrase:"",result:[]},reducers:{setPhrase:(e,t)=>{let{payload:a}=t;return{...e,phrase:a}},setResult:(e,t)=>{let{payload:a}=t;return{...e,result:a}}}}),N=I.actions,C=I.reducer,T=(0,i.eS)({reducer:{caretData:p,editor:d,examplesSearch:C,language:R,parserResult:b,view:v}});var S=a(456),q=a(768),k=a(268),D=a.n(k);const O="am-editor-tooltip-GOMEV",L="am-editor-tooltip-separator-xy639",P="am-view-select-A9atI",A="am-select-option-hSIjP",V="am-selected-option-QiX9D",U="am-select-option-content-wrapper-eEkEo",M="am-select-option-icon-wrapper-LKrUH",z="am-select-option-label-wrapper-kmVe2",j={width:D().oneOfType([D().number,D().string]),height:D().oneOfType([D().number,D().string]),testId:D().string},H={width:16,height:16,testId:"ti-icon"},B=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",className:"bi bi-check-circle-fill",viewBox:"0 0 20 20"},r.createElement("path",{xmlns:"http://www.w3.org/2000/svg",d:"M9 6l-4 4 4 4-1 2-6-6 6-6zm2 8l4-4-4-4 1-2 6 6-6 6z"}))};B.propTypes=j,B.defaultProps=H;const F=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",className:"bi bi-check-circle-fill",viewBox:"0 0 48 48"},r.createElement("path",{xmlns:"http://www.w3.org/2000/svg",d:"M44,32H42V24a2,2,0,0,0-2-2H26V20h0V16h2a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2H20a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h2v6H8a2,2,0,0,0-2,2v8H4a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V34a2,2,0,0,0-2-2H10V26H22v6H20a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V34a2,2,0,0,0-2-2H26V26H38v6H36a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V34A2,2,0,0,0,44,32Z"}))};F.propTypes=j,F.defaultProps=H;const G=e=>{let{viewType:t,onViewSelectChange:a}=e;const n=(0,r.useCallback)((e=>t===e?"".concat(A," ").concat(V):A),[t]);return r.createElement("div",{className:P,"data-testid":"ti-view-select--wrapper"},r.createElement("button",{onClick:()=>a(h.EDITOR),className:n(h.EDITOR),"data-testid":"ti-view-select--editor-button"},r.createElement("div",{className:U,"data-testid":"ti-select-option--content"},r.createElement("div",{className:M,"data-testid":"ti-select-option--btn-icon-left"},r.createElement(B,null)),r.createElement("div",{className:z,"data-testid":"ti-select-option--btn-label"},"Editor"))),r.createElement("button",{onClick:()=>a(h.PARSE_TREE),className:n(h.PARSE_TREE),"data-testid":"ti-view-select--parse-tree"},r.createElement("div",{className:U,"data-testid":"ti-select-option--content"},r.createElement("div",{className:M,"data-testid":"ti-select-option--btn-icon-left"},r.createElement(F,null)),r.createElement("div",{className:z,"data-testid":"ti-select-option--btn-label"},"Parse Tree"))))};G.propTypes={viewType:D().oneOf(Object.values(h)).isRequired,onViewSelectChange:D().func.isRequired};const Z=(0,s.Ul)((e=>({viewType:e.view.type})),(e=>({onViewSelectChange:t=>e(E.changeView(t))})))(G);var _=a(704),W=a(692),J=a(884);const Y=()=>({decode:e=>{let t=e;if(t.length%4!==0){const e=t.length/4,a=4*(e-Math.floor(e));for(let r=0;r<a;r++)t+="="}const a=_.E$(t),r=W.cp.ungzip(a);return(new J.k).decode(r)},encode:e=>{const t=W.cp.gzip(e);return _.CA(t)}}),K="am-button-kWpRd",Q="am-button-content-wrapper-L__yF",X="am-button-label-wrapper-f9NFs",$="am-button-icon-wrapper-xMgJM",ee={LEFT:"LEFT",RIGHT:"RIGHT"},te="am-spinnerIcon-LS5X5",ae=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("div",{className:te},r.createElement("svg",{id:"loading-spinner",xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,viewBox:"0 0 48 48"},r.createElement("g",{fill:"none"},r.createElement("path",{id:"track",fill:"#C6CCD2",d:"M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"}),r.createElement("path",{id:"section",fill:"#3F4850",d:"M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"}))))};ae.propTypes=j,ae.defaultProps=H;const re=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",viewBox:"0 0 16 16"},r.createElement("path",{d:"M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"}),r.createElement("path",{d:"M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"}))};re.propTypes=j,re.defaultProps=H;const ne=e=>{let{label:t,icon:a,onClick:n,iconPlacement:s,isLoading:i,isCopied:l,testId:o}=e;const c=(e,t)=>{if(void 0===t)return r.createElement("div",{className:Q,"data-testid":"".concat(o,"--btn-content")},r.createElement("div",{className:X,"data-testid":"".concat(o,"--btn-label")},e));switch(s){case ee.LEFT:return r.createElement("div",{className:Q,"data-testid":"".concat(o,"--btn-content")},r.createElement("div",{className:$,"data-testid":"".concat(o,"--btn-icon-left")},t),r.createElement("div",{className:X,"data-testid":"".concat(o,"--btn-label")},e));case ee.RIGHT:return r.createElement("div",{className:Q,"data-testid":"".concat(o,"--btn-content")},r.createElement("div",{className:X,"data-testid":"".concat(o,"--btn-label")},e),r.createElement("div",{className:$,"data-testid":"".concat(o,"--btn-icon-right")},t));default:return r.createElement("div",{className:Q,"data-testid":"".concat(o,"--btn-content")},r.createElement("div",{className:X,"data-testid":"".concat(o,"--btn-label")},e))}};return r.createElement("button",{className:K,onClick:n,"data-testid":o},i?c("",r.createElement(ae,{testId:"ti-button-spinner-icon",width:"0.8rem",height:"0.8rem"})):l?c("Copied!",r.createElement(re,{testId:"ti-button-copy-success-icon",width:"0.8rem",height:"0.8rem"})):c(t,a))};ne.propTypes={label:D().string.isRequired,icon:D().element.isRequired,onClick:D().func.isRequired,iconPlacement:D().oneOf(Object.values(ee)),isLoading:D().bool,isCopied:D().bool,testId:D().string},ne.defaultProps={iconPlacement:ee.LEFT,isLoading:!1,isCopied:!1,testId:"ti-button"};const se=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",className:"bi bi-share-fill",viewBox:"0 0 16 16"},r.createElement("path",{d:"M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"}))};se.propTypes=j,se.defaultProps=H;const ie=e=>{let{code:t}=e;const{encode:a}=Y(),[n,s]=(0,r.useState)(!1),[i,l]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{setTimeout((()=>{l(!1)}),1e3)}),[i]),r.createElement(ne,{icon:r.createElement(se,{width:"0.8rem",height:"0.8rem"}),label:"Share",onClick:()=>{(async()=>{s(!0);const e=a(t),r=encodeURIComponent(e);let n=window.location.href;n.includes("code=")&&(n=n.replace(/([&?])code=[^&]*(&|$)/,"$1")),n.includes("?")?n+="&code=".concat(r):n+="?code=".concat(r);const i=await(async e=>await fetch("https://shorten.wilenskid.pl/api/shorten",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}).then((async e=>await e.json())))(n);await navigator.clipboard.writeText(i.url),s(!1),l(!0)})().catch(console.error)},isLoading:n,isCopied:i,testId:"ti-share-button"})};ie.propTypes={code:D().string.isRequired};const le=(0,s.Ul)((e=>({code:e.editor.value})))(ie),oe=()=>r.createElement("div",{className:O,"data-testid":"ti-code-editor-toolbar"},r.createElement(le,null),r.createElement("div",{className:L}),r.createElement(Z,null)),ce=e=>{let{condition:t,children:a}=e;return t?a:r.createElement(r.Fragment,null)};ce.propTypes={condition:D().bool.isRequired,children:D().oneOfType([D().element,D().arrayOf(D().element)]).isRequired};var de=a(84),me=a.n(de),ue=a(248);const pe="am-token-VQenn",he="am-keyword-zvuUz",ge="am-punctuation-p8ECY",Ee="am-comment-dvU9Z",ve="am-string-y0ek0",fe="am-boolean-u11jF",we="am-number-IJqf8",be="am-custom1-qphtb",ye="am-custom2-DRHlC",xe="am-custom3-oWhTs",Re="am-custom4-WUNZn",Ie=D().shape({lineIndex:D().number.isRequired,charPosition:D().number.isRequired,message:D().string.isRequired}),Ne="am-table-TFW_G",Ce="am-highlight-background-mVIqJ",Te="am-highlight-line-number-background-aM8pq",Se="am-highlight-line-background-uJbe3";var qe=a(568);const ke="am-line-number-cell-Egrrr",De="am-code-line-RmTtI",Oe="am-code-line-error-RTo3L",Le=e=>{let{line:t,index:a,hasError:n}=e;return r.createElement("tr",{key:"code-line-".concat(a),className:n?Oe:void 0,"data-testid":n?"ti-higlights-code-line-error":"ti-higlights-code-line"},r.createElement("td",{className:ke,"data-testid":"ti-higlights-code-line--number-cell"},a+1),r.createElement("td",{className:De,"data-testid":"ti-higlights-code-line--code-cell"},(0,qe.cp)(t)))};Le.propTypes={line:D().string.isRequired,index:D().number.isRequired,hasError:D().bool};const Pe=e=>{let{parserErrors:t,highlightResult:a}=e;const[n,s]=(0,r.useState)([]),i=(0,r.useCallback)(((e,a)=>{const n=a+1,s=(null!==t&&void 0!==t?t:[]).some((e=>e.lineIndex===n));return r.createElement(Le,{key:"line-".concat(n),line:e,index:a,hasError:s})}),[t]);return(0,r.useEffect)((()=>{const e=a.map(i);s(e)}),[a]),r.createElement(r.Fragment,null,r.createElement("div",{className:Ce,"data-testid":"ti-higlights--bg"},r.createElement("div",{className:Te,"data-testid":"ti-higlights--line-number-bg"}),r.createElement("div",{className:Se,"data-testid":"ti-higlights--line-bg"})),r.createElement("table",{className:Ne,"data-testid":"ti-higlights--code-table"},r.createElement("tbody",{"data-testid":"ti-higlights--code-table-body"},n)))};Pe.propTypes={parserErrors:D().arrayOf(Ie).isRequired,highlightResult:D().arrayOf(D().string).isRequired};const Ae={["KEYWORD"]:he,["PUNCTUATION"]:ge,["COMMENT"]:Ee,["STRING"]:ve,["BOOLEAN"]:fe,["NUMBER"]:we,["CUSTOM1"]:be,["CUSTOM2"]:ye,["CUSTOM3"]:xe,["CUSTOM4"]:Re},Ve=()=>{const[e,t]=(0,r.useState)({}),a=(0,s.w1)((e=>e.language.grammarDefinition)),n=e=>{const t=e.match(/\/(.+)\/([a-z]*)/);if(!t||t.length<3)throw new Error("Invalid regex pattern");return[t[1],t[2]]},i=e=>{if(void 0===e)return;const t=Ae[e.syntaxType];let a;if(Array.isArray(e.pattern))a=e.pattern.map((e=>{const[t,a]=n(e.pattern);return{pattern:new RegExp(t,a),greedy:e.greedy,lookbehind:e.lookbehind}}));else{const[t,r]=n(e.pattern.pattern);a={pattern:new RegExp(t,r),greedy:e.pattern.greedy,lookbehind:e.pattern.lookbehind}}return[t,a]};return(0,r.useEffect)((()=>{var e;if(void 0===a)return;const r=(null!==(e=a.syntax)&&void 0!==e?e:[]).map(i).reduce(((e,t)=>{let[a,r]=t;return{...e,[a]:r}}),{});t(r)}),[a]),e},Ue=/(<span[^>]*>)((.|\n)*?)(<\/span>)/gi,Me="am-autocomplete-modal-Z8XnQ",ze="am-autocomplete-modal-list-r3oTv",je=D().shape({x:D().number.isRequired,y:D().number.isRequired}),He=D().shape({position:je.isRequired,index:D().number.isRequired}),Be=()=>{const e=(e,t)=>{const a=e.toUpperCase(),r=t.toUpperCase();if(e.length>t.length&&a.startsWith(r))return t.length/e.length*2;const n=new Set(a),s=new Set(r),i=new Set([...n].filter((e=>s.has(e)))),l=new Set([...n,...s]);return i.size/l.size};return{getSimilarWords:(t,a)=>a.map((a=>{return{word:r=a,accuracy:e(r,t)};var r})).sort(((e,t)=>t.accuracy-e.accuracy)).filter((e=>e.accuracy>.75))}},Fe="am-autocomplete-modal-element-MSqD9",Ge="am-autocomplete-modal-selected-element-_x_OS",Ze=e=>{let{value:t,index:a,selectedIndex:n,onOptionClick:s}=e;const i=n===a?Ge:"";return r.createElement("li",{className:"".concat(Fe," ").concat(i),key:"autocomplete-option-".concat(a),"data-testid":"ti-autocomplete-option-".concat(a),onClick:()=>s(a)},t)};Ze.propTypes={value:D().string.isRequired,index:D().number.isRequired,selectedIndex:D().number.isRequired,onOptionClick:D().func.isRequired};const _e=()=>{const[e,t]=(0,r.useState)(void 0);return(0,r.useEffect)((()=>{const e=document.getElementById("code-textarea--input");null!==e&&t(e)}),[]),e},We=e=>{let{caretData:t,editorValue:a,keywords:n,onEditorValueChange:s,onUpdateCaretData:i}=e;const l=Be(),o=(()=>{const e=e=>/[\s \r\n]/.test(e);return{isWhiteSpace:e,getLastWordByIndex:(t,a)=>{let r="",n=a;for(let s=a-1;s>=0&&!e(t[s]);s--)r=t[s]+r,n=s;return{word:r,wordData:{startIndex:n,length:a-n}}}}})(),c=_e(),[d,m]=(0,r.useState)([]),[u,p]=(0,r.useState)(!1),[h,g]=(0,r.useState)(-1),[E,v]=(0,r.useState)(void 0),[f,w]=(0,r.useState)(void 0),b=(0,r.useRef)(null),y=e=>{const t=d[e],r={...f,length:t.length};let n=a;if(-1!==r.startIndex){const e=n.substring(0,r.startIndex),a=n.substring(r.startIndex+r.length);n="".concat(e).concat(t," ").concat(a)}s(n);const l=r.startIndex+t.length+1;c.setSelectionRange(l,l),i(l,c.value),w(void 0),g(-1),p(!1),null===c||void 0===c||c.focus()},x=(0,r.useCallback)((()=>{const e=null===c||void 0===c?void 0:c.getBoundingClientRect(),{top:a,left:r}=null!==e&&void 0!==e?e:{top:0,left:0};return{top:"calc(".concat(a+20*t.position.x,"px + 5px)"),left:"calc(".concat(r+7.2*t.position.y,"px + 50px)")}}),[c,t]),R=e=>{u?("Enter"===e.key&&(e=>{e.preventDefault(),y(h)})(e),"ArrowUp"===e.key&&(e=>{e.preventDefault();let t=h-1;t<0&&(t=d.length-1),g(t)})(e),"ArrowDown"===e.key&&(e=>{e.preventDefault();let t=h+1;t>d.length-1&&(t=0),g(t)})(e),"Escape"===e.key&&(e=>{e.preventDefault(),p(!1),null===c||void 0===c||c.focus()})(e)):e.ctrlKey&&"Enter"===e.key&&(e=>{e.preventDefault(),p(0!==d.length)})(e)};return(0,r.useEffect)((()=>(document.addEventListener("keydown",R),()=>{document.removeEventListener("keydown",R)})),[u,R]),(0,r.useEffect)((()=>{void 0===f&&m([])}),[f]),(0,r.useEffect)((()=>{const{word:e,wordData:r}=o.getLastWordByIndex(a,t.index);w(r),v(e)}),[a,t]),(0,r.useEffect)((()=>{if(void 0===E||E.length<=1||void 0===f)return;m([]),p(!1);const e=l.getSimilarWords(E,n).map((e=>e.word)).filter((e=>e!==E));m(e),g(0!==e.length?0:-1),p(0!==e.length)}),[n,E,f]),r.createElement("div",{hidden:!u,className:Me,style:x(),"data-testid":"ti-autocomplete-modal"},r.createElement("ul",{className:ze,ref:b,"data-testid":"ti-autocomplete-list"},d.map(((e,t)=>r.createElement(Ze,{key:"autocomplete-option-".concat(t),index:t,value:e,selectedIndex:h,onOptionClick:y})))))};We.propTypes={caretData:He.isRequired,editorValue:D().string.isRequired,keywords:D().arrayOf(D().string).isRequired,onEditorValueChange:D().func.isRequired,onUpdateCaretData:D().func.isRequired};const Je=(0,s.Ul)((e=>{var t,a;return{caretData:{position:e.caretData.position,index:e.caretData.index},editorValue:e.editor.value,keywords:null!==(t=null===(a=e.language.grammarDefinition)||void 0===a?void 0:a.keywords)&&void 0!==t?t:[]}}),(e=>({onEditorValueChange:t=>e(c.setValue(t)),onUpdateCaretData:(t,a)=>e(u.update({selectionStart:t,value:a}))})))(We),Ye="am-editor-wrapper-Ymw3B",Ke="am-editor-Y16Lc",Qe="am-code-area-ALTcW",Xe=e=>{let{value:t,nextCaretIndex:a,onValueChange:n,updateCaretData:i,updateNextCaretIndex:l}=e;const o=(()=>{const{decode:e}=Y(),[t,a]=(0,r.useState)(void 0);return(0,r.useEffect)((()=>{const t=window.location.search,r=new URLSearchParams(t).get("code");if(null===r)return;const n=decodeURIComponent(r),s=e(n);a(s)}),[]),t})(),c=_e(),{highlight:d}=(()=>{const e=(0,s.w1)((e=>e.parserResult.errors)),t=Ve(),a=(e,t,a,r,n)=>a.split("\n").map((e=>"".concat(t).concat(e).concat(n))).join("\n");return{highlight:(0,r.useCallback)((n=>{const s=(0,ue.highlight)(n,t,"lang").replace(Ue,a).replaceAll('class="token','class="'.concat(pe)).split("\n");return r.createElement(Pe,{highlightResult:s,parserErrors:e})}),[t,e]),grammar:t}})(),m=e=>{if(void 0===c||t===e)return;const a=c.selectionStart,r=c.value;n(e),i(a,r)};return(0,r.useEffect)((()=>{void 0!==o&&m(o)}),[o]),(0,r.useEffect)((()=>{-1!==a&&void 0!==c&&(c.setSelectionRange(a,a),i(a,c.value),l(-1))}),[c,a]),(0,r.useEffect)((()=>{if(void 0===c)return;const e=c.selectionStart,t=c.value;i(e,t)}),[]),r.createElement(r.Fragment,null,r.createElement("div",{className:Ye,"data-testid":"ti-code-editor-wrapper"},r.createElement(me(),{value:t,onValueChange:m,highlight:d,padding:0,textareaId:"code-textarea--input",textareaClassName:Qe,className:Ke,autoFocus:!0})),r.createElement(Je,null))};Xe.propTypes={value:D().string.isRequired,nextCaretIndex:D().number.isRequired,onValueChange:D().func.isRequired,updateCaretData:D().func.isRequired,updateNextCaretIndex:D().func.isRequired};const $e=(0,s.Ul)((e=>({value:e.editor.value,nextCaretIndex:e.caretData.nextIndex})),(e=>({onValueChange:t=>e(c.setValue(t)),updateCaretData:(t,a)=>e(u.update({selectionStart:t,value:a})),updateNextCaretIndex:t=>e(u.updateNextIndex(t))})))(Xe),et="am-error-wrapper-YIaam",tt="am-error-list-L8n5M",at=D().shape({lineIndex:D().number.isRequired,charPosition:D().number.isRequired,message:D().string.isRequired}),rt="am-error-list-element-MRi26",nt="am-error-position-label-f6dDM",st="am-error-message-YBAte",it=e=>{let{error:t,errorIndex:a}=e;return r.createElement("li",{key:"code-error-".concat(a),className:rt,"data-testid":"ti-parsing-status-errors--errors-list-element-".concat(a),onClick:()=>{const e=document.getElementById("code-textarea--input"),a=t.lineIndex-1,r=e.value.split("\n").filter(((e,t)=>t<a)).map((e=>""!==e?e.length:1)).reduce(((e,t)=>e+t),0)+t.charPosition;e.setSelectionRange(r,r),e.focus()}},r.createElement("div",{className:nt},"error at ".concat(t.lineIndex,":").concat(t.charPosition)),r.createElement("div",{className:st},t.message))};it.propTypes={errorIndex:D().number.isRequired,error:at.isRequired};const lt=e=>{let{parseErrors:t}=e;const[a,n]=(0,r.useState)([]);return(0,r.useEffect)((()=>{const e=t.map(((e,t)=>r.createElement(it,{key:"code-error-".concat(t+(new Date).getUTCDate()),errorIndex:t,error:e})));n(e)}),[t]),r.createElement("div",{className:et,"data-testid":"ti-parsing-status-errors--wrapper"},r.createElement("ul",{className:tt,"data-testid":"ti-parsing-status-errors--errors-list"},a))};lt.propTypes={parseErrors:D().arrayOf(at)};const ot=(0,s.Ul)((e=>({parseErrors:e.parserResult.errors})))(lt);var ct=a(168);const dt="am-parse-tree-view-hI0iK",mt="am-parse-tree-wRs7X",ut="am-parse-tree-loading-wrapper-hMVbU",pt="NORMAL",ht="TERMINAL",gt=D().shape({type:D().oneOf([ht]).isRequired,symbolName:D().string.isRequired,symbolValue:D().string.isRequired}),Et=D().shape({type:D().oneOf([pt]).isRequired,ruleName:D().string.isRequired,ruleChildren:D().arrayOf(D().object).isRequired}),vt=D().oneOfType([gt,Et]),ft=e=>{const[t,a]=(0,r.useState)(!1),[n,s]=(0,r.useState)({nodes:[],edges:[]});return(0,r.useEffect)((()=>{const t=[],r=[];0!==e.length?(a(!0),((e,t,a)=>{const r=[];for(r.push({treeNodes:a,level:0});r.length>0;){const a=r.pop();if(void 0===a)break;const{treeNodes:n,level:s,parent:i}=a;for(const l of n){const a=e.length;if(l.type===ht){if(void 0===i)continue;const t={id:a,label:"(terminal)\n".concat(l.symbolText),level:s,color:"#2270ff"};e.push(t)}if(l.type===pt){const t={id:a,label:"(non-terminal)\n".concat(l.ruleName),level:s,color:"#00b69d"};e.push(t),r.push({treeNodes:l.ruleChildren,level:s+1,parent:t})}if(void 0!==i){const e={from:i.id,to:a};t.push(e)}}}})(t,r,e),s({nodes:t,edges:r}),a(!1)):s({nodes:t,edges:r})}),[e]),{isConverting:t,convertResult:n}};ft.propTypes=D().arrayOf(vt);const wt={autoResize:!0,nodes:{shape:"box",borderWidth:.5,font:{multi:"html",face:"'JetBrains Mono', monospace",color:"#FFF"},shapeProperties:{borderRadius:0},physics:!1},edges:{physics:!1},layout:{improvedLayout:!0,clusterThreshold:150,hierarchical:{direction:"UD",nodeSpacing:150,parentCentralization:!1}},interaction:{dragNodes:!1,selectable:!1},manipulation:{enabled:!1}},bt=e=>{let{parseTree:t,isParsing:a}=e;const n=(0,r.useRef)(null),s=(0,r.useRef)(null),{isConverting:i,convertResult:l}=ft(t);return(0,r.useEffect)((()=>{var e,t,a;if(null===n.current)return;null===(e=s.current)||void 0===e||e.destroy();const r=n.current,{nodes:i,edges:o}=l;return s.current=new ct.Network(r,{nodes:i,edges:o},wt),null===(t=s.current)||void 0===t||t.fit(),null===(a=s.current)||void 0===a||a.redraw(),()=>{var e;null===(e=s.current)||void 0===e||e.destroy(),s.current=null}}),[a,l]),r.createElement("div",{className:mt},r.createElement("div",{className:ut,style:{display:a||i?"inherit":"none"}},r.createElement(ae,{testId:"ti-loading-parse-tree",width:"64",height:"64"})),r.createElement("div",{ref:n,className:dt,"data-testid":"ti-parse-tree--container",style:{display:a||i?"none":"inherit"}}))};bt.propTypes={isParsing:D().bool.isRequired,parseTree:D().arrayOf(vt)};const yt=(0,s.Ul)((e=>({isParsing:e.editor.state!==l.IDLE,parseTree:e.parserResult.tree})))(bt),xt="am-status-bar-jqQyf",Rt="am-status-bar-separator-O02WF",It="am-caret-data-wrapper-Zmo2g",Nt=e=>{let{position:t}=e;return r.createElement("div",{className:It,"data-testid":"ti-caret-data"},t.x,":",t.y)};Nt.propTypes={position:D().shape({x:D().number,y:D().number})},Nt.defaultProps={position:{x:0,y:0}};const Ct=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",className:"bi bi-check-circle-fill",viewBox:"0 0 16 16"},r.createElement("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"}))};Ct.propTypes=j,Ct.defaultProps=H;const Tt=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",viewBox:"0 0 16 16"},r.createElement("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"}))};Tt.propTypes=j,Tt.defaultProps=H;const St="am-parse-state-label-PjVmu",qt="am-parsing-label-hOloT",kt="am-no-errors-label-KRMAi",Dt="am-found-errors-label-aU2uz",Ot=12,Lt=e=>{let{parseState:t,parseErrors:a}=e;return r.createElement("span",{className:St,style:(()=>{let e;return e=t===l.IDLE&&0===a.length?"#009b1c":t===l.IDLE&&0!==a.length?"#9b1c00":"#484848",{color:e}})(),"data-testid":"ti-parsing-state"},r.createElement(ce,{condition:t===l.INITIALIZING},r.createElement(ae,{width:Ot,height:Ot}),r.createElement("span",{className:qt,"data-testid":"ti-parsing-status--label-init"},"Initializing...")),r.createElement(ce,{condition:t===l.PARSING},r.createElement(ae,{width:Ot,height:Ot}),r.createElement("span",{className:qt,"data-testid":"ti-parsing-status--label-parsing"},"Parsing...")),r.createElement(ce,{condition:t===l.IDLE&&0===a.length},r.createElement(Ct,{width:Ot,height:Ot}),r.createElement("span",{className:kt,"data-testid":"ti-parsing-status--label-no-errors"},"No errors!")),r.createElement(ce,{condition:t===l.IDLE&&0!==a.length},r.createElement(Tt,{width:Ot,height:Ot}),r.createElement("span",{className:Dt,"data-testid":"ti-parsing-status--label-errors"},"Found '".concat(a.length,"' parser errors"))))};Lt.propTypes={parseErrors:D().arrayOf(at),parseState:D().oneOf(Object.values(l))};const Pt=e=>{let{parseErrors:t,parseState:a,caretPosition:n}=e;return r.createElement("div",{className:xt,"data-testid":"ti-status-bar"},r.createElement(Lt,{parseErrors:t,parseState:a}),r.createElement("div",{className:Rt}),r.createElement(Nt,{position:n}))};Pt.propTypes={parseErrors:D().arrayOf(at),parseState:D().oneOf(Object.values(l)),caretPosition:D().shape({x:D().number,y:D().number})};const At=(0,s.Ul)((e=>({parseErrors:e.parserResult.errors,parseState:e.editor.state,caretPosition:e.caretData.position})))(Pt),Vt="am-editor-page-F0rfZ",Ut="am-app-container-ObC7o",Mt="am-sidebar-UGfjQ",zt="am-sidebar-menu-V1R1D",jt="am-sidebar-menu-item-mKvCJ",Ht="am-sidebar-menu-item-selected-Eu_ms",Bt="am-sidebar-menu-item-label-OO_9n",Ft=e=>{let{path:t,icon:a,label:n,testId:s}=e;const i=(0,S.IT)(),l=(0,S.i6)(),[o,c]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{c(i.pathname===t)}),[i,t]),r.createElement("li",{className:"".concat(jt," ").concat(o?Ht:""),onClick:e=>{l(t),e.preventDefault()},"data-testid":s},a,r.createElement("div",{className:Bt},n))};Ft.propTypes={path:D().string.isRequired,icon:D().element.isRequired,label:D().string.isRequired,testId:D().string.isRequired};const Gt=e=>{let{width:t,height:a,testId:n}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:t,height:a,"data-testid":n,fill:"currentColor",className:"bi bi-check-circle-fill",viewBox:"0 0 20 20"},r.createElement("path",{xmlns:"http://www.w3.org/2000/svg",d:"M2 3h16v2H2V3zm0 4h16v2H2V7zm0 4h16v2H2v-2zm0 4h16v2H2v-2z"}))};Gt.propTypes=j,Gt.defaultProps=H;const Zt=()=>r.createElement("ul",{className:zt,"data-testid":"ti-sidebar-menu"},r.createElement(Ft,{path:"/",label:"Editor",icon:r.createElement(B,null),testId:"ti-editor-page-button"}),r.createElement(Ft,{path:"/examples",label:"Examples",icon:r.createElement(Gt,null),testId:"ti-examples-page-button"})),_t="am-versions-wrapper-EujUG",Wt="am-version-element-yEC52",Jt="am-version-element-label-pJean",Yt="am-version-element-version-GwnnE",Kt=()=>r.createElement("div",{className:_t,"data-testid":"ti-versions"},r.createElement("div",{className:Wt},r.createElement("div",{className:Jt},"App Version"),r.createElement("div",{className:Yt,"data-testid":"ti-editor-version-label"},"v1.0.0")),r.createElement("div",{className:Wt},r.createElement("div",{className:Jt},"Grammar Version"),r.createElement("div",{className:Yt,"data-testid":"ti-grammar-version-label"},"v1.1.0"))),Qt=()=>r.createElement("div",{className:Mt,"data-testid":"ti-sidebar"},r.createElement(Zt,null),r.createElement("div",{style:{flex:1}}),r.createElement(Kt,null)),Xt="am-main-content-sUodn",$t=e=>{let{children:t}=e;if(void 0===t)throw new Error("MainContent element needs to have children element.");return r.createElement("div",{className:Xt,"data-testid":"ti-main-content"},t)};$t.propTypes={children:D().element.isRequired};const ea=e=>{let{children:t}=e;return r.createElement("div",{className:Ut,"data-testid":"app-container"},r.createElement(Qt,null),r.createElement($t,null,t))};ea.propTypes={children:D().element.isRequired};const ta=e=>{let{viewType:t,onUpdateCaretData:a}=e;return(0,r.useEffect)((()=>{if(t===h.PARSE_TREE)return;const e=document.getElementById("code-textarea--input");if(null===e)return;const r=e.selectionStart,n=e.value,s=()=>a(r,n);return e.addEventListener("click",s),e.addEventListener("contextmenu",s),e.addEventListener("keypress",s),()=>{e.removeEventListener("click",s),e.removeEventListener("contextmenu",s),e.removeEventListener("keypress",s)}}),[t]),r.createElement(ea,null,r.createElement("div",{className:Vt,"data-testid":"ti-code-editor-column"},r.createElement(oe,null),r.createElement(ce,{condition:t===h.EDITOR},r.createElement(r.Fragment,null,r.createElement($e,null),r.createElement(At,null),r.createElement(ot,null))),r.createElement(ce,{condition:t===h.PARSE_TREE},r.createElement(yt,null))))};ta.propTypes={viewType:D().oneOf(Object.values(h)).isRequired,onUpdateCaretData:D().func.isRequired};const aa=(0,s.Ul)((e=>({viewType:e.view.type})),(e=>({onUpdateCaretData:(t,a)=>e(u.update({selectionStart:t,value:a}))})))(ta),ra="am-examples-list-Iwcro",na="am-example-ZrJn0",sa="am-example-header-bdOv7",ia="am-examples-loading-wrapper-KznpI",la="am-example-code-YoAeB",oa=D().shape({name:D().string.isRequired,code:D().string.isRequired}),ca=/(<span[^>]*>)((.|\n)*?)(<\/span>)/gi,da=e=>{let{example:t,grammar:a}=e;const n=(e,t)=>r.createElement("tr",{key:"example-code-line-".concat(t),"data-testid":"ti-code-line-".concat(t)},r.createElement("td",{className:ke},t+1),r.createElement("td",{className:De},(0,qe.cp)(e))),s=(e,t,a,r,n)=>a.split("\n").map((e=>"".concat(t).concat(e).concat(n))).join("\n");return r.createElement("pre",{className:la,"data-testid":"ti-examples-list-item--code"},r.createElement("div",{className:Ce},r.createElement("div",{className:Te}),r.createElement("div",{className:Se})),r.createElement("table",{className:Ne},r.createElement("tbody",{"data-testid":"ti-code-lines"},(i=t.code.trim(),(0,ue.highlight)(i,a,"gql").replace(ca,s).split("\n").map(n)))));var i};da.propTypes={example:oa.isRequired,grammar:D().object.isRequired};const ma=e=>{let{example:t,grammar:a,onShowInEditorClick:n}=e;return r.createElement("li",{className:na,onClick:()=>n(t),"data-testid":"ti-examples-list-item"},r.createElement("div",{className:sa,"data-testid":"ti-examples-list-item--title"},t.name),r.createElement(da,{example:t,grammar:a}))};ma.propTypes={example:oa.isRequired,grammar:D().object.isRequired,onShowInEditorClick:D().func.isRequired};const ua=e=>{let{result:t,isLoading:a,setEditorValue:n}=e;const s=(0,S.i6)(),i=Ve();return r.createElement(r.Fragment,null,r.createElement(ce,{condition:a},r.createElement("div",{className:ia,"data-testid":"ti-loading-examples-wrapper"},r.createElement(ae,{testId:"ti-loading-examples",width:"64",height:"64"}))),r.createElement(ce,{condition:!a},r.createElement("ul",{className:ra,"data-testid":"ti-examples-list"},t.map(((e,t)=>r.createElement(ma,{key:"example-".concat(t+1),example:e,grammar:i,onShowInEditorClick:e=>(e=>{window.scrollTo(0,0),n(e.code),s("/")})(e)}))))))};ua.propTypes={result:D().arrayOf(oa).isRequired,isLoading:D().bool.isRequired,setEditorValue:D().func.isRequired};const pa=(0,s.Ul)((e=>({result:e.examplesSearch.result,options:e.examplesSearch.options,isLoading:e.editor.state===l.INITIALIZING})),(e=>({setEditorValue:t=>e(c.setValue(t))})))(ua),ha="am-examples-search-A4hlR";var ga=a(340);const Ea=e=>{let{examples:t,options:a,phrase:n,setPhrase:s,setResult:i}=e;const[l,o]=(0,r.useState)(new ga.c([],a)),c=(0,r.useCallback)((e=>l.search(e).map((e=>e.item))),[l]);return(0,r.useEffect)((()=>{o(new ga.c(t,a)),i(""!==n?c(n):t)}),[t,n]),r.createElement("input",{type:"text",className:ha,placeholder:"Search...",onChange:e=>s(e.target.value),"data-testid":"ti-examples-search-input"})};Ea.propTypes={examples:D().arrayOf(oa).isRequired,options:D().object.isRequired,phrase:D().string.isRequired,setPhrase:D().func.isRequired,setResult:D().func.isRequired};const va=(0,s.Ul)((e=>({examples:e.language.examples,options:e.examplesSearch.options,phrase:e.examplesSearch.phrase,isLoading:e.editor.state===l.INITIALIZING})),(e=>({setPhrase:t=>e(N.setPhrase(t)),setResult:t=>e(N.setResult(t))})))(Ea),fa="am-examples-page-wrapper-I_fAW",wa=()=>r.createElement(ea,null,r.createElement("div",{className:fa},r.createElement(va,null),r.createElement(pa,null))),ba=(0,S.Yj)([{path:"/",element:r.createElement(aa,null)},{path:"/examples",element:r.createElement(wa,null)}]),ya=document.getElementById("root");if(null===ya)throw new Error("Element with id='root' not found!");const xa=()=>((()=>{const e=(0,s.w1)((e=>e.editor.value)),t=(0,s.w1)((e=>e.language.isInitialized)),a=(0,s.OY)(),n=(0,r.useRef)(null),i=e=>{let{data:t}=e;if("errors"in t||"tree"in t)return;const{grammarDefinition:r,examples:n}=t;a(x.initialize({grammarDefinition:r,examples:n})),a(c.setState(l.IDLE))},o=e=>{let{data:t}=e;"grammarDefinition"in t||"examples"in t||(a(w.update(t)),a(c.setState(l.IDLE)))};(0,r.useEffect)((()=>{if(null!==n.current&&n.current.terminate(),!t)return a(c.setState(l.INITIALIZING)),n.current=new Worker("./js/worker.bundle.js"),n.current.postMessage({type:"initialize"}),n.current.onmessage=i,()=>{null!==n.current&&n.current.terminate()}}),[]),(0,r.useEffect)((()=>{null!==n.current&&t&&(a(c.setState(l.PARSING)),n.current.postMessage({type:"parse",payload:{text:e}}),n.current.onmessage=o)}),[e,t])})(),r.createElement(q.eT,{router:ba}));(0,n.C)(ya).render(r.createElement(r.StrictMode,null,r.createElement(s.C_,{store:T},r.createElement(xa,null))))}},e=>{e.O(0,[260,264],(()=>{return t=784,e(e.s=t);var t}));e.O()}]);