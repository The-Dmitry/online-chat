(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var s=e.g.document;if(!t&&s&&(s.currentScript&&(t=s.currentScript.src),!t)){var i=s.getElementsByTagName("script");i.length&&(t=i[i.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();class t{constructor(e){this.node=this.createNode(e)}getNode(){return this.node}createNode(e){return this.node=document.createElement(e.tag),this.setClassNames(e.css),this.setTextContent(e.text),this.setId(e.id),e.callback&&this.setCallback(e.callback),e.href&&this.setHref(e.href),e.type&&this.setType(e.type),this.node}setType(e){this.node.type=e}setHref(e){this.node.href=e}setClassNames(e){e&&(this.node.className="",this.node.classList.add(...e))}addClassName(e){e&&this.node.classList.add(e)}removeCLassName(e){e&&this.node.classList.remove(e)}setTextContent(e){e&&(this.node.textContent=e)}setCallback(e,t="click"){this.node.addEventListener(t,e)}setId(e){e&&(this.node.id=e)}setAttribute(e,t){this.node.setAttribute(e,t)}addInnerNode(...e){e.forEach((e=>{e instanceof t?this.node.append(e.getNode()):this.node.append(e)}))}prependInnerNode(...e){e.forEach((e=>{e instanceof t?this.node.prepend(e.getNode()):this.node.prepend(e)}))}removeAllChildren(){for(;this.node.firstChild;)this.node.removeChild(this.node.firstChild)}removeNode(){this.node.remove()}}class s{constructor(e){this.viewNode=new t(e)}getElement(){return this.viewNode.getNode()}addViewInside(...e){e.forEach((e=>this.viewNode.addInnerNode(e.getElement())))}blockView(e){e?this.viewNode.addClassName("blocked"):this.viewNode.removeCLassName("blocked")}playSound(e){const t=new Audio;t.src=e,t.play()}}class i{static observerInstance=new i;#e=new Map;static getInstance(){return this.observerInstance}subscribe(e,t){const s=this.#e.get(e)||new Set;s.add(t),this.#e.set(e,s)}unsubscribe(e,t){const s=this.#e.get(e);s&&s.delete(t)}dispatch(e,...t){const s=this.#e.get(e);s&&s.size&&s.forEach((e=>e(...t)))}}const a="start-timer",o="stop-game",n="victory",r="block-field",d="close=greeting",l="mute-sound",c={fanfare:e.p+"src/assets/sounds/fanfare.mp3",popdown:e.p+"src/assets/sounds/pop-down.mp3",popup:e.p+"src/assets/sounds/pop-up-off.mp3",solution:e.p+"src/assets/sounds/solution.mp3"};class h extends s{#t=!1;#s=!1;#i;#a=!1;#o=i.getInstance();constructor(e,t,s){super({tag:"div",css:["cell"],callback:()=>{this.setMark(),this.#a||this.playSound(c.popdown),t()}}),this.viewNode.setCallback((e=>{this.#a||this.playSound(c.popup),this.setFlag(e)}),"contextmenu"),this.#a=s,this.#i=e,this.#o.subscribe(l,(e=>{this.#a=e}))}setMark(){if(this.#t)return this.viewNode.removeCLassName("cell_marked"),void(this.#t=!1);this.viewNode.addClassName("cell_marked"),this.#t=!0,this.#s=!0,this.setFlag()}setFlag(){if(this.#s)return this.viewNode.removeCLassName("cell_flagged"),void(this.#s=!1);this.viewNode.addClassName("cell_flagged"),this.#t=!0,this.#s=!0,this.setMark()}isMarkedCorrectly(){return this.#t&&this.#i||!this.#t&&!this.#i}resetCell(){this.#t=!1,this.#s=!1,this.viewNode.setClassNames(["cell"])}showSolution(){this.#i||!this.#t?this.#i&&(this.viewNode.removeCLassName("cell_flagged"),this.viewNode.addClassName("cell_marked")):this.viewNode.removeCLassName("cell_marked")}getStatus(){return this.#t?"marked":!!this.#s&&"flagged"}setStatus(e){"marked"!==e?"flagged"===e&&this.setFlag():this.setMark()}}class g extends s{#n=[];#r=!1;#o=i.getInstance();#a=!1;constructor(){super({tag:"div",css:["field","field_10","puzzle__item"]}),this.configureView(),this.#o.subscribe(r,((e,t="solution")=>{e?this.viewNode.addClassName(t):this.viewNode.removeCLassName(t)})),this.#o.subscribe(l,(e=>{this.#a=e}))}configureView(){}generateField(e,t){this.#r=!1,this.viewNode.removeAllChildren(),this.viewNode.setClassNames(["field",`field_${e.length}`]),this.#n=e.map((e=>e.map((e=>new h(e,this.isVictory.bind(this),this.#a))))),this.#n.forEach((e=>this.addViewInside(...e))),this.#n=this.#n.flat(5),t&&this.loadSavedField(t)}isVictory(){this.#r||(this.#r=!0,this.#o.dispatch(a));for(let e=0;e<this.#n.length;e+=1)if(!this.#n[e].isMarkedCorrectly())return!1;return this.viewNode.addClassName("solution"),this.#a||this.playSound(c.fanfare),this.#o.dispatch(n),!0}resetGame(){this.viewNode.removeCLassName("solution"),this.#r=!1,this.#n.forEach((e=>e.resetCell()))}showSolution(){this.viewNode.addClassName("solution"),this.#a||this.playSound(c.solution),this.#n.forEach((e=>e.showSolution()))}saveGame(){return this.#n.map((e=>e.getStatus()))}loadSavedField(e){this.#n.forEach(((t,s)=>t.setStatus(e[s])))}}class u extends s{constructor(e=""){super({tag:"div",css:["bar-cell"],text:e})}}class m extends s{constructor(){super({tag:"div",css:["left-bar","bar"]})}generateGame(e){this.viewNode.removeAllChildren();const{length:s}=e;this.viewNode.setClassNames(["left-bar",`left-bar_${s}`]);const i=[];for(let t=0;t<s;t+=1){let a=0;const o=[];for(let i=0;i<s;i+=1)e[t][i]?a+=1:(a&&o.push(a),a=0),i===s-1&&a&&o.push(a);i.push(o)}const a=Math.max(...i.map((e=>e.length)));i.map((e=>[...new Array(a-e.length).fill(""),...e])).forEach((e=>{const s=new t({tag:"div",css:["left-bar__row"]});s.addInnerNode(...e.map((e=>new u(e).getElement()))),this.viewNode.addInnerNode(s)}))}}const p="upper-bar";class w extends s{constructor(){super({tag:"div",css:[p,"bar"]}),this.configureView()}configureView(){}generateGame(e){this.viewNode.removeAllChildren();const{length:s}=e;this.viewNode.setClassNames([p,`upper-bar_${s}`]);const i=[];for(let t=0;t<s;t+=1){let a=0;const o=[];for(let i=0;i<s;i+=1)e[i][t]?a+=1:(a&&o.push(a),a=0),i===s-1&&a&&o.push(a);i.push(o)}const a=Math.max(...i.map((e=>e.length)));i.map((e=>[...new Array(a-e.length).fill(""),...e])).forEach((e=>{const s=new t({tag:"div",css:["upper-bar__column"]});s.addInnerNode(...e.map((e=>new u(e).getElement()))),this.viewNode.addInnerNode(s)}))}}const b="puzzle";class v extends s{constructor(){super({tag:"div",css:[b]}),this.viewNode.setCallback((e=>e.preventDefault()),"contextmenu"),this.field=new g,this.leftList=new m,this.upperList=new w,this.gameTitle=new t({tag:"p",text:"",css:["puzzle__title"]}),this.viewNode.addInnerNode(this.gameTitle),this.addViewInside(this.field,this.leftList,this.upperList)}generateGame(e,t,s){this.viewNode.setClassNames([b,`puzzle_${t}`,`puzzle_${e.length}`]),this.gameTitle.setTextContent(t),this.field.generateField(e,s),this.leftList.generateGame(e),this.upperList.generateGame(e)}resetGame(){this.field.resetGame()}showSolution(){this.field.showSolution()}saveGame(){return this.field.saveGame()}}const N={five:{chicken:[[!1,!0,!1,!1,!1],[!0,!0,!1,!0,!0],[!1,!0,!0,!0,!1],[!1,!0,!0,!0,!1],[!1,!1,!0,!1,!1]],dog:[[!1,!1,!1,!0,!0],[!0,!1,!1,!0,!0],[!0,!0,!0,!0,!1],[!1,!0,!1,!0,!1],[!1,!0,!1,!0,!1]],fountain:[[!1,!0,!1,!0,!1],[!0,!1,!0,!1,!0],[!1,!1,!0,!1,!1],[!0,!0,!0,!0,!0],[!1,!0,!0,!0,!1]],clock:[[!1,!0,!0,!0,!1],[!0,!1,!0,!1,!0],[!0,!1,!0,!0,!0],[!0,!1,!1,!1,!0],[!1,!0,!0,!0,!1]],heart:[[!1,!0,!1,!0,!1],[!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0],[!1,!0,!0,!0,!1],[!1,!1,!0,!1,!1]]},ten:{helicopter:[[!0,!0,!0,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!0,!1,!1,!1,!1,!1,!1],[!1,!0,!0,!0,!0,!0,!1,!1,!1,!1],[!0,!0,!1,!0,!0,!0,!0,!1,!1,!0],[!0,!1,!1,!0,!0,!0,!0,!0,!0,!0],[!0,!1,!1,!0,!0,!0,!0,!0,!1,!0],[!0,!0,!0,!0,!0,!0,!0,!1,!1,!1],[!1,!0,!0,!0,!0,!0,!1,!1,!1,!1],[!0,!1,!0,!1,!0,!1,!1,!1,!1,!1],[!0,!0,!0,!0,!0,!0,!0,!1,!1,!1]],fish:[[!1,!1,!1,!1,!1,!0,!0,!0,!0,!1],[!1,!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!0,!0,!0,!0,!0,!1,!1,!1],[!1,!0,!0,!0,!0,!0,!0,!0,!1,!0],[!1,!0,!1,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!1,!0,!1,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!1,!0,!0,!0,!0,!0],[!1,!0,!0,!1,!0,!0,!0,!0,!1,!0],[!1,!1,!0,!0,!0,!0,!1,!1,!1,!0],[!1,!1,!1,!1,!0,!0,!0,!0,!1,!1]],kettle:[[!1,!1,!1,!1,!1,!0,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!0,!0,!1,!1],[!1,!1,!1,!0,!0,!0,!0,!0,!1,!1],[!0,!0,!1,!0,!1,!0,!0,!0,!0,!0],[!1,!0,!1,!0,!0,!0,!0,!0,!1,!0],[!1,!0,!1,!0,!1,!0,!0,!0,!1,!0],[!1,!0,!0,!0,!1,!0,!0,!0,!1,!0],[!1,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!1,!1,!1,!0,!0,!0,!0,!0,!1,!1],[!1,!1,!1,!0,!0,!0,!0,!0,!1,!1]],cocktail:[[!1,!1,!1,!1,!1,!1,!1,!1,!0,!1],[!1,!1,!1,!1,!1,!1,!1,!0,!1,!1],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!1,!1,!1,!1,!0,!1,!0,!0],[!1,!0,!0,!1,!1,!0,!1,!0,!0,!1],[!1,!1,!0,!0,!0,!0,!0,!0,!1,!1],[!1,!1,!1,!1,!0,!0,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!0,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!0,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!0,!1,!1,!1]],worm:[[!1,!0,!0,!0,!1,!1,!1,!1,!1,!1],[!0,!1,!0,!1,!0,!1,!1,!1,!1,!1],[!0,!0,!0,!0,!0,!1,!1,!1,!1,!1],[!0,!0,!1,!0,!1,!1,!1,!1,!1,!1],[!1,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!1,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!1,!0,!0,!1,!1,!1,!0,!0,!0,!1],[!1,!0,!0,!0,!1,!0,!0,!0,!0,!0],[!1,!0,!0,!0,!0,!0,!0,!1,!0,!0],[!1,!1,!0,!0,!0,!0,!1,!1,!1,!1]]},fifteen:{bee:[[!0,!0,!0,!1,!0,!0,!1,!1,!0,!0,!0,!0,!1,!1,!1],[!1,!1,!0,!1,!1,!0,!1,!0,!0,!1,!1,!0,!0,!0,!0],[!1,!1,!0,!1,!1,!0,!1,!0,!1,!1,!0,!0,!1,!1,!0],[!1,!0,!0,!0,!0,!0,!1,!0,!1,!0,!0,!1,!1,!1,!0],[!0,!1,!1,!1,!0,!0,!0,!0,!1,!0,!1,!1,!1,!1,!0],[!0,!0,!1,!0,!1,!1,!0,!0,!1,!0,!1,!1,!1,!0,!0],[!0,!1,!1,!1,!1,!0,!0,!0,!0,!0,!1,!0,!0,!0,!1],[!0,!0,!1,!1,!0,!0,!1,!1,!0,!0,!0,!0,!1,!1,!1],[!1,!0,!0,!0,!0,!0,!0,!1,!1,!0,!0,!0,!0,!1,!1],[!1,!1,!1,!1,!1,!1,!0,!0,!0,!0,!1,!1,!0,!0,!0],[!0,!1,!1,!0,!0,!0,!0,!0,!1,!1,!1,!0,!0,!0,!0],[!0,!0,!1,!0,!1,!0,!1,!0,!1,!0,!0,!0,!0,!1,!0],[!0,!0,!1,!0,!1,!0,!1,!0,!0,!0,!0,!0,!1,!1,!0],[!0,!0,!0,!1,!1,!1,!1,!1,!0,!0,!0,!1,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0]],cat:[[!1,!0,!1,!1,!1,!1,!1,!1,!1,!0,!1,!1,!0,!0,!0],[!1,!0,!0,!1,!1,!1,!1,!1,!0,!0,!1,!1,!1,!1,!0],[!1,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!0,!1],[!1,!0,!1,!0,!0,!1,!0,!0,!1,!0,!1,!1,!1,!0,!1],[!0,!0,!0,!0,!1,!0,!1,!0,!0,!0,!0,!1,!0,!0,!1],[!1,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!0,!1,!1],[!1,!1,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!0,!0,!1],[!1,!1,!1,!1,!0,!0,!0,!0,!1,!1,!1,!1,!1,!0,!1],[!1,!1,!1,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1,!0,!1],[!1,!1,!1,!0,!0,!0,!0,!0,!0,!1,!1,!1,!0,!0,!1],[!1,!1,!0,!0,!0,!0,!0,!0,!0,!0,!1,!0,!0,!1,!1],[!1,!1,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1],[!1,!1,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1],[!1,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1]],camera:[[!1,!1,!1,!1,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!1,!1,!1,!1,!1,!0,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!1,!1,!1,!1,!1,!0,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1],[!1,!0,!0,!1,!1,!1,!0,!0,!0,!1,!1,!0,!0,!0,!1],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!1,!1,!1,!1,!0,!0,!0,!0,!0,!1,!1,!1,!1,!0],[!0,!1,!1,!1,!0,!0,!1,!1,!1,!0,!0,!1,!1,!1,!0],[!0,!0,!0,!0,!0,!1,!0,!0,!0,!1,!0,!0,!0,!0,!0],[!0,!0,!1,!0,!1,!0,!0,!1,!0,!0,!1,!0,!0,!0,!0],[!0,!0,!1,!0,!1,!0,!1,!0,!0,!0,!1,!0,!0,!0,!0],[!0,!0,!1,!0,!1,!0,!1,!0,!0,!0,!1,!0,!0,!0,!0],[!0,!0,!1,!0,!0,!1,!0,!0,!0,!1,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!1,!1,!1,!0,!0,!0,!0,!0,!0],[!1,!1,!1,!1,!1,!0,!0,!0,!0,!0,!1,!1,!1,!1,!1]],bike:[[!1,!1,!1,!1,!1,!1,!1,!0,!0,!0,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!0,!1,!0,!0,!0,!0,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1,!0,!0,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!0,!1,!1,!0,!1],[!1,!1,!1,!0,!0,!0,!0,!1,!1,!1,!0,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1,!1,!0,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1],[!1,!0,!0,!0,!0,!0,!1,!1,!1,!0,!0,!0,!0,!0,!1],[!0,!0,!1,!1,!0,!0,!0,!1,!0,!0,!1,!0,!1,!0,!0],[!0,!1,!1,!0,!0,!1,!0,!1,!0,!1,!1,!0,!1,!1,!0],[!0,!1,!0,!0,!1,!1,!0,!0,!0,!1,!1,!0,!0,!1,!0],[!0,!1,!0,!0,!1,!1,!0,!0,!0,!1,!1,!0,!1,!1,!0],[!0,!0,!1,!1,!1,!0,!0,!1,!0,!0,!1,!1,!1,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0]],scales:[[!1,!1,!1,!1,!1,!1,!0,!0,!0,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!0,!0,!0,!1,!1,!1,!1,!1,!1],[!0,!0,!1,!1,!1,!1,!1,!0,!1,!1,!1,!1,!1,!0,!0],[!1,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0,!1],[!1,!1,!0,!1,!1,!1,!1,!0,!1,!1,!1,!1,!0,!1,!1],[!1,!1,!0,!1,!1,!1,!1,!0,!1,!1,!1,!1,!0,!1,!1],[!1,!0,!0,!0,!1,!1,!1,!0,!1,!1,!1,!0,!0,!0,!1],[!1,!0,!1,!0,!1,!1,!1,!0,!1,!1,!1,!0,!1,!0,!1],[!1,!0,!1,!0,!1,!1,!1,!0,!1,!1,!1,!0,!1,!0,!1],[!0,!0,!0,!0,!0,!1,!1,!0,!1,!1,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!1,!0,!0,!0,!1,!0,!1,!1,!1,!0],[!1,!0,!0,!0,!1,!1,!0,!1,!0,!1,!1,!0,!0,!0,!1],[!1,!1,!1,!1,!1,!0,!0,!0,!0,!0,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1]]}};class f extends s{constructor(e,t){super({tag:"div",css:["new-game"]}),this.configureView(e,t)}configureView(e,s){const i=new t({tag:"h2",css:["new-game__title"],text:"New Game"}),a=Object.entries(e),o=a.map((([e,t])=>this.generateCategory(t,s))),n=new t({tag:"button",css:["new-game__random","new-game__button"],text:"random game",callback:()=>{const e=a[Math.floor(Math.random()*a.length)][1],[t,i]=Object.entries(e)[Math.floor(5*Math.random())];s(i,t)}});this.viewNode.addInnerNode(i,...o,n)}generateCategory(e,s){const i=Object.entries(e),a=i[0][1][0].length,o=new t({tag:"div",css:["new-game__container"]}),n=new t({tag:"h3",css:["new-game__subtitle"],text:`${a}x${a}`}),r=i.map((([e,i])=>new t({tag:"button",css:["new-game__button"],text:`${e}`,callback:()=>s(i,e)})));return o.addInnerNode(n,...r),o}}class k extends s{#d=0;#l;#o=i.getInstance();constructor(){super({tag:"p",css:["stopwatch"],text:"00:00"}),this.#o.subscribe(a,(()=>this.startTimer())),this.#o.subscribe(o,(()=>this.stopTimer()))}startTimer(){this.#l=setTimeout((()=>{this.#d+=1,this.updateText(),this.startTimer()}),1e3)}stopTimer(){clearTimeout(this.#l)}updateText(e=this.#d){this.viewNode.setTextContent(`${new Date(1e3*e).toISOString().slice(14,19)}`||"00:00")}set setSeconds(e){this.#d=e,this.updateText()}get getSeconds(){return this.#d}}class _ extends s{#o=i.getInstance();constructor(e,t,s){super({tag:"div",css:["greeting"]}),this.configureView(e,t,s)}configureView(e,s,i){const a=new t({tag:"button",css:["close","greeting__close"],callback:()=>this.viewNode.removeNode()}),o=new t({tag:"p",css:["greeting__text"],text:`Great! You have solved the ${s}x${s} ${e} nonogram in ${i} seconds!`});this.viewNode.addInnerNode(a,o),document.body.append(this.viewNode.getNode()),this.saveResult(e,`${s}x${s}`,i),this.#o.subscribe(d,(()=>this.viewNode.removeNode()))}saveResult(e,t,s){const i=JSON.parse(localStorage.getItem("nonogram-result"))||[];i.push({gameName:e,fieldSize:t,seconds:s}),localStorage.setItem("nonogram-result",JSON.stringify(i.slice(-5)))}}class y extends s{resultNode=null;#c=!1;#o=i.getInstance();constructor(){super({tag:"div",css:["settings"]}),window.addEventListener("load",(()=>{this.#c=JSON.parse(localStorage.getItem("darkMode"))||!1,this.switchDarkMode(),this.configureView()})),window.addEventListener("beforeunload",(()=>{localStorage.setItem("darkMode",JSON.stringify(this.#c))}))}configureView(){const e=new t({tag:"label",css:["result__label"]}),s=new t({tag:"label",css:["sound__label"]}),i=new t({tag:"input",css:["result__input"],type:"checkbox",callback:()=>this.handleDarkMode(i)}),a=new t({tag:"input",css:["sound__input"],type:"checkbox",callback:()=>{this.#o.dispatch(l,a.getNode().checked)}});s.addInnerNode(a),e.addInnerNode(i),i.getNode().checked=this.#c;const o=new t({tag:"button",css:["result__button"],text:"score",callback:()=>{this.resultNode&&this.resultNode.removeNode(),this.showBestResult(),this.#o.dispatch(d)}});this.viewNode.addInnerNode(s,e,o)}showBestResult(){const e=new t({tag:"div",css:["result"]});this.resultNode=e;const s=new t({tag:"button",css:["close"],callback:()=>{e.removeNode(),this.#o.dispatch(r,!1,"block-for-score")}}),i=JSON.parse(localStorage.getItem("nonogram-result"))||[],a=this.generateResultList(i.sort(((e,t)=>e.seconds-t.seconds)));e.addInnerNode(s,a),document.body.append(e.getNode()),this.#o.dispatch(r,!0,"block-for-score")}generateResultList(e){if(!e.length)return new t({tag:"p",text:"Win at least one game"});const s=new t({tag:"ul",css:["result__list"]});return s.addInnerNode(this.generateHead("№","Name","Mode","Time"),...e.map(((e,t)=>this.generateResultRow(t+1,...Object.values(e))))),s}generateResultRow(...e){const s=e;s[s.length-1]=`${new Date(1e3*s[s.length-1]).toISOString().slice(14,19)}`;const i=new t({tag:"li",css:["result-item"]}),a=e.map((e=>new t({tag:"p",css:["result-item__text"],text:e})));return i.addInnerNode(...a),i}generateHead(...e){const s=new t({tag:"li",css:["result-item"]}),i=e.map((e=>new t({tag:"p",css:["result-item__text"],text:e})));return s.addInnerNode(...i),s}handleDarkMode(e){const t=e;this.#c=!this.#c,t.getNode().checked=this.#c,this.switchDarkMode()}switchDarkMode(){this.#c?document.body.classList.add("dark"):document.body.classList.remove("dark")}}class S extends s{#h;#g=0;#o=i.getInstance();constructor(){super({tag:"div",css:["main"]}),this.newGame=new f(N,this.generateGame.bind(this)),this.puzzle=new v(this.showVictory.bind(this)),this.timer=new k,this.controls=this.createControls(),this.settings=new y,this.configureView(),this.#o.subscribe(n,(()=>this.showVictory()))}configureView(){this.addViewInside(this.settings),this.generateGame(N.five.chicken,"chicken")}generateGame(e,t,s=null){this.#g=e.length,this.#h=t,this.puzzle.generateGame(e,t,s),this.newGame.viewNode.removeNode(),this.viewNode.addInnerNode(this.controls),this.addViewInside(this.puzzle,this.timer)}pickNewGame(){this.puzzle.getElement().remove(),this.timer.getElement().remove(),this.controls.removeNode(),this.addViewInside(this.newGame)}saveGame(){const e={field:this.puzzle.saveGame(),gameName:this.#h,time:this.timer.getSeconds};localStorage.setItem("saved-game",JSON.stringify(e))}loadGame(){const e=JSON.parse(localStorage.getItem("saved-game"))||null,t=Object.values(N).find((t=>t[e.gameName]))[e.gameName];this.generateGame(t,e.gameName,e.field),this.timer.stopTimer(),this.timer.setSeconds=e.time}createControls(){let e;const s=new t({tag:"button",text:"load game",css:["controls__button"],callback:()=>{this.loadGame(),e.getNode().disabled=!1}});localStorage.getItem("saved-game")||(s.getNode().disabled=!0);const i=new t({tag:"button",text:"save game",css:["controls__button"],callback:()=>{this.saveGame(),s.getNode().disabled=!1}});e=i;const a=new t({tag:"button",text:"reset",css:["controls__button"],callback:()=>{this.puzzle.resetGame(),this.timer.stopTimer(),this.timer.setSeconds=0,i.getNode().disabled=!1}}),r=new t({tag:"button",text:"new game",css:["controls__button"],callback:()=>{this.pickNewGame(),this.timer.stopTimer(),this.timer.setSeconds=0,i.getNode().disabled=!1}}),d=new t({tag:"button",text:"solution",css:["controls__button"],callback:()=>{i.getNode().disabled=!0,this.puzzle.showSolution(),this.#o.dispatch(o)}});this.#o.subscribe(n,(()=>{i.getNode().disabled=!0}));const l=new t({tag:"div",css:["controls"]});return l.addInnerNode(r,a,i,s,d),l}showVictory(){new _(this.#h,this.#g,this.timer.getSeconds),this.timer.stopTimer()}}new class{constructor(){document.body.append((new S).getElement())}}})();