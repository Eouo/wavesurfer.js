"use strict";class t{constructor(){this.listeners={}}on(t,e,i){if(this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),null==i?void 0:i.once){const i=()=>{this.un(t,i),this.un(t,e)};return this.on(t,i),i}return()=>this.un(t,e)}un(t,e){var i;null===(i=this.listeners[t])||void 0===i||i.delete(e)}once(t,e){return this.on(t,e,{once:!0})}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t}onInit(){}_init(t){this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()))}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function i(t,e,i,n){return new(i||(i=Promise))((function(s,r){function o(t){try{h(n.next(t))}catch(t){r(t)}}function a(t){try{h(n.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((n=n.apply(t,e||[])).next())}))}const n={decode:function(t,e){return i(this,void 0,void 0,(function*(){const i=new AudioContext({sampleRate:e});return i.decodeAudioData(t).finally((()=>i.close()))}))},createBuffer:function(t,e){return"number"==typeof t[0]&&(t=[t]),function(t){const e=t[0];if(e.some((t=>t>1||t<-1))){const i=e.length;let n=0;for(let t=0;t<i;t++){const i=Math.abs(e[t]);i>n&&(n=i)}for(const e of t)for(let t=0;t<i;t++)e[t]/=n}}(t),{duration:e,length:t[0].length,sampleRate:t[0].length/e,numberOfChannels:t.length,getChannelData:e=>null==t?void 0:t[e],copyFromChannel:AudioBuffer.prototype.copyFromChannel,copyToChannel:AudioBuffer.prototype.copyToChannel}}};const s={fetchBlob:function(t,e,n){return i(this,void 0,void 0,(function*(){const s=yield fetch(t,n);if(s.status>=400)throw new Error(`Failed to fetch ${t}: ${s.status} (${s.statusText})`);return function(t,e){i(this,void 0,void 0,(function*(){if(!t.body||!t.headers)return;const n=t.body.getReader(),s=Number(t.headers.get("Content-Length"))||0;let r=0;const o=t=>i(this,void 0,void 0,(function*(){r+=(null==t?void 0:t.length)||0;const i=Math.round(r/s*100);e(i)})),a=()=>i(this,void 0,void 0,(function*(){let t;try{t=yield n.read()}catch(t){return}t.done||(o(t.value),yield a())}));a()}))}(s.clone(),e),s.blob()}))}};class r extends t{constructor(t){super(),this.isExternalMedia=!1,t.media?(this.media=t.media,this.isExternalMedia=!0):this.media=document.createElement("audio"),t.mediaControls&&(this.media.controls=!0),t.autoplay&&(this.media.autoplay=!0),null!=t.playbackRate&&this.onceMediaEvent("canplay",(()=>{null!=t.playbackRate&&(this.media.playbackRate=t.playbackRate)}))}onMediaEvent(t,e,i){return this.media.addEventListener(t,e,i),()=>this.media.removeEventListener(t,e)}onceMediaEvent(t,e){return this.onMediaEvent(t,e,{once:!0})}getSrc(){return this.media.currentSrc||this.media.src||""}revokeSrc(){const t=this.getSrc();t.startsWith("blob:")&&URL.revokeObjectURL(t)}canPlayType(t){return""!==this.media.canPlayType(t)}setSrc(t,e){if(this.getSrc()===t)return;this.revokeSrc();const i=e instanceof Blob&&this.canPlayType(e.type)?URL.createObjectURL(e):t;this.media.src=i}destroy(){this.media.pause(),this.isExternalMedia||(this.media.remove(),this.revokeSrc(),this.media.src="",this.media.load())}setMediaElement(t){this.media=t}play(){return this.media.play()}pause(){this.media.pause()}isPlaying(){return!this.media.paused&&!this.media.ended}setTime(t){this.media.currentTime=t}getDuration(){return this.media.duration}getCurrentTime(){return this.media.currentTime}getVolume(){return this.media.volume}setVolume(t){this.media.volume=t}getMuted(){return this.media.muted}setMuted(t){this.media.muted=t}getPlaybackRate(){return this.media.playbackRate}setPlaybackRate(t,e){null!=e&&(this.media.preservesPitch=e),this.media.playbackRate=t}getMediaElement(){return this.media}setSinkId(t){return this.media.setSinkId(t)}}class o extends t{constructor(t,e){super(),this.timeouts=[],this.isScrollable=!1,this.audioData=null,this.resizeObserver=null,this.lastContainerWidth=0,this.isDragging=!1,this.options=t;const i=this.parentFromOptionsContainer(t.container);this.parent=i;const[n,s]=this.initHtml();i.appendChild(n),this.container=n,this.scrollContainer=s.querySelector(".scroll"),this.wrapper=s.querySelector(".wrapper"),this.canvasWrapper=s.querySelector(".canvases"),this.progressWrapper=s.querySelector(".progress"),this.cursor=s.querySelector(".cursor"),e&&s.appendChild(e),this.initEvents()}parentFromOptionsContainer(t){let e;if("string"==typeof t?e=document.querySelector(t):t instanceof HTMLElement&&(e=t),!e)throw new Error("Container not found");return e}initEvents(){const t=t=>{const e=this.wrapper.getBoundingClientRect(),i=t.clientX-e.left,n=t.clientX-e.left;return[i/e.width,n/e.height]};this.wrapper.addEventListener("click",(e=>{const[i,n]=t(e);this.emit("click",i,n)})),this.wrapper.addEventListener("dblclick",(e=>{const[i,n]=t(e);this.emit("dblclick",i,n)})),this.options.dragToSeek&&this.initDrag(),this.scrollContainer.addEventListener("scroll",(()=>{const{scrollLeft:t,scrollWidth:e,clientWidth:i}=this.scrollContainer,n=t/e,s=(t+i)/e;this.emit("scroll",n,s)}));const e=this.createDelay(100);this.resizeObserver=new ResizeObserver((()=>{e().then((()=>this.onContainerResize())).catch((()=>{}))})),this.resizeObserver.observe(this.scrollContainer)}onContainerResize(){const t=this.parent.clientWidth;t===this.lastContainerWidth&&"auto"!==this.options.height||(this.lastContainerWidth=t,this.reRender())}initDrag(){!function(t,e,i,n,s=3,r=0){if(!t)return()=>{};let o=()=>{};const a=a=>{if(a.button!==r)return;a.preventDefault(),a.stopPropagation();let h=a.clientX,l=a.clientY,d=!1;const c=n=>{n.preventDefault(),n.stopPropagation();const r=n.clientX,o=n.clientY,a=r-h,c=o-l;if(d||Math.abs(a)>s||Math.abs(c)>s){const n=t.getBoundingClientRect(),{left:s,top:u}=n;d||(null==i||i(h-s,l-u),d=!0),e(a,c,r-s,o-u),h=r,l=o}},u=()=>{d&&(null==n||n()),o()},p=t=>{t.relatedTarget&&t.relatedTarget!==document.documentElement||u()},m=t=>{d&&(t.stopPropagation(),t.preventDefault())},v=t=>{d&&t.preventDefault()};document.addEventListener("pointermove",c),document.addEventListener("pointerup",u),document.addEventListener("pointerout",p),document.addEventListener("pointercancel",p),document.addEventListener("touchmove",v,{passive:!1}),document.addEventListener("click",m,{capture:!0}),o=()=>{document.removeEventListener("pointermove",c),document.removeEventListener("pointerup",u),document.removeEventListener("pointerout",p),document.removeEventListener("pointercancel",p),document.removeEventListener("touchmove",v),setTimeout((()=>{document.removeEventListener("click",m,{capture:!0})}),10)}};t.addEventListener("pointerdown",a)}(this.wrapper,((t,e,i)=>{this.emit("drag",Math.max(0,Math.min(1,i/this.wrapper.getBoundingClientRect().width)))}),(()=>this.isDragging=!0),(()=>this.isDragging=!1))}getHeight(t){return null==t?128:isNaN(Number(t))?"auto"===t&&this.parent.clientHeight||128:Number(t)}initHtml(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"});return e.innerHTML=`\n      <style>\n        :host {\n          user-select: none;\n          min-width: 1px;\n        }\n        :host audio {\n          display: block;\n          width: 100%;\n        }\n        :host .scroll {\n          overflow-x: auto;\n          overflow-y: hidden;\n          width: 100%;\n          position: relative;\n        }\n        :host .noScrollbar {\n          scrollbar-color: transparent;\n          scrollbar-width: none;\n        }\n        :host .noScrollbar::-webkit-scrollbar {\n          display: none;\n          -webkit-appearance: none;\n        }\n        :host .wrapper {\n          position: relative;\n          overflow: visible;\n          z-index: 2;\n        }\n        :host .canvases {\n          min-height: ${this.getHeight(this.options.height)}px;\n        }\n        :host .canvases > div {\n          position: relative;\n        }\n        :host canvas {\n          display: block;\n          position: absolute;\n          top: 0;\n          image-rendering: pixelated;\n        }\n        :host .progress {\n          pointer-events: none;\n          position: absolute;\n          z-index: 2;\n          top: 0;\n          left: 0;\n          width: 0;\n          height: 100%;\n          overflow: hidden;\n        }\n        :host .progress > div {\n          position: relative;\n        }\n        :host .cursor {\n          pointer-events: none;\n          position: absolute;\n          z-index: 5;\n          top: 0;\n          left: 0;\n          height: 100%;\n          border-radius: 2px;\n        }\n      </style>\n\n      <div class="scroll" part="scroll">\n        <div class="wrapper" part="wrapper">\n          <div class="canvases"></div>\n          <div class="progress" part="progress"></div>\n          <div class="cursor" part="cursor"></div>\n        </div>\n      </div>\n    `,[t,e]}setOptions(t){if(this.options.container!==t.container){const e=this.parentFromOptionsContainer(t.container);e.appendChild(this.container),this.parent=e}t.dragToSeek&&!this.options.dragToSeek&&this.initDrag(),this.options=t,this.reRender()}getWrapper(){return this.wrapper}getScroll(){return this.scrollContainer.scrollLeft}destroy(){var t;this.container.remove(),null===(t=this.resizeObserver)||void 0===t||t.disconnect()}createDelay(t=10){let e,i;const n=()=>{e&&clearTimeout(e),i&&i()};return this.timeouts.push(n),()=>new Promise(((s,r)=>{n(),i=r,e=setTimeout((()=>{e=void 0,i=void 0,s()}),t)}))}convertColorValues(t){if(!Array.isArray(t))return t||"";if(t.length<2)return t[0]||"";const e=document.createElement("canvas"),i=e.getContext("2d"),n=e.height*(window.devicePixelRatio||1),s=i.createLinearGradient(0,0,0,n),r=1/(t.length-1);return t.forEach(((t,e)=>{const i=e*r;s.addColorStop(i,t)})),s}renderBarWaveform(t,e,i,n){const s=t[0],r=t[1]||t[0],o=s.length,{width:a,height:h}=i.canvas,l=h/2,d=window.devicePixelRatio||1,c=e.barWidth?e.barWidth*d:1,u=e.barStartHeight?e.barStartHeight*d:1,p=e.barGap?e.barGap*d:e.barWidth?c/2:0,m=e.barRadius||0,v=a/(c+p)/o,f=m&&"roundRect"in i?"roundRect":"rect";i.beginPath();let g=0,y=0,b=0;for(let t=0;t<=o;t++){const o=Math.round(t*v);if(o>g){const t=Math.round(y*l*n);let s=t+Math.round(b*l*n)+u,r=l-t;"top"===e.barAlign?r=0:"bottom"===e.barAlign&&(r=h-s),i[f](g*(c+p),r,c,s,m),g=o,y=0,b=0}const a=Math.abs(s[t]||0),d=Math.abs(r[t]||0);a>y&&(y=a),d>b&&(b=d)}i.fill(),i.closePath()}renderLineWaveform(t,e,i,n){const s=e=>{const s=t[e]||t[0],r=s.length,{height:o}=i.canvas,a=o/2,h=i.canvas.width/r;i.moveTo(0,a);let l=0,d=0;for(let t=0;t<=r;t++){const r=Math.round(t*h);if(r>l){const t=a+(Math.round(d*a*n)||1)*(0===e?-1:1);i.lineTo(l,t),l=r,d=0}const o=Math.abs(s[t]||0);o>d&&(d=o)}i.lineTo(l,a)};i.beginPath(),s(0),s(1),i.fill(),i.closePath()}renderWaveform(t,e,i){if(i.fillStyle=this.convertColorValues(e.waveColor),e.renderFunction)return void e.renderFunction(t,i);let n=e.barHeight||1;if(e.normalize){const e=Array.from(t[0]).reduce(((t,e)=>Math.max(t,Math.abs(e))),0);n=e?1/e:1}e.barWidth||e.barGap||e.barAlign?this.renderBarWaveform(t,e,i,n):this.renderLineWaveform(t,e,i,n)}renderSingleCanvas(t,e,i,n,s,r,o,a){const h=window.devicePixelRatio||1,l=document.createElement("canvas"),d=t[0].length;l.width=Math.round(i*(r-s)/d),l.height=n*h,l.style.width=`${Math.floor(l.width/h)}px`,l.style.height=`${n}px`,l.style.left=`${Math.floor(s*i/h/d)}px`,o.appendChild(l);const c=l.getContext("2d");if(this.renderWaveform(t.map((t=>t.slice(s,r))),e,c),l.width>0&&l.height>0){const t=l.cloneNode(),i=t.getContext("2d");i.drawImage(l,0,0),i.globalCompositeOperation="source-in",i.fillStyle=this.convertColorValues(e.progressColor),i.fillRect(0,0,l.width,l.height),a.appendChild(t)}}renderChannel(t,e,n){return i(this,void 0,void 0,(function*(){const s=document.createElement("div"),r=this.getHeight(e.height);s.style.height=`${r}px`,this.canvasWrapper.style.minHeight=`${r}px`,this.canvasWrapper.appendChild(s);const a=s.cloneNode();this.progressWrapper.appendChild(a);const h=t[0].length,l=(i,o)=>{this.renderSingleCanvas(t,e,n,r,Math.max(0,i),Math.min(o,h),s,a)};if(!this.isScrollable)return void l(0,h);const{scrollLeft:d,scrollWidth:c,clientWidth:u}=this.scrollContainer,p=h/c;let m=Math.min(o.MAX_CANVAS_WIDTH,u);if(e.barWidth||e.barGap){const t=e.barWidth||.5,i=t+(e.barGap||t/2);m%i!=0&&(m=Math.floor(m/i)*i)}const v=Math.floor(Math.abs(d)*p),f=Math.floor(v+m*p),g=f-v;l(v,f),yield Promise.all([(()=>i(this,void 0,void 0,(function*(){if(0===v)return;const t=this.createDelay();for(let e=v;e>=0;e-=g)yield t(),l(Math.max(0,e-g),e)})))(),(()=>i(this,void 0,void 0,(function*(){if(f===h)return;const t=this.createDelay();for(let e=f;e<h;e+=g)yield t(),l(e,Math.min(h,e+g))})))()])}))}render(t){return i(this,void 0,void 0,(function*(){this.timeouts.forEach((t=>t())),this.timeouts=[],this.canvasWrapper.innerHTML="",this.progressWrapper.innerHTML="",null!=this.options.width&&(this.scrollContainer.style.width="number"==typeof this.options.width?`${this.options.width}px`:this.options.width);const e=window.devicePixelRatio||1,i=this.scrollContainer.clientWidth,n=Math.ceil(t.duration*(this.options.minPxPerSec||0));this.isScrollable=n>i;const s=this.options.fillParent&&!this.isScrollable,r=(s?i:n)*e;this.wrapper.style.width=s?"100%":`${n}px`,this.scrollContainer.style.overflowX=this.isScrollable?"auto":"hidden",this.scrollContainer.classList.toggle("noScrollbar",!!this.options.hideScrollbar),this.cursor.style.backgroundColor=`${this.options.cursorColor||this.options.progressColor}`,this.cursor.style.width=`${this.options.cursorWidth}px`,this.audioData=t,this.emit("render");try{if(this.options.splitChannels)yield Promise.all(Array.from({length:t.numberOfChannels}).map(((e,i)=>{var n;const s=Object.assign(Object.assign({},this.options),null===(n=this.options.splitChannels)||void 0===n?void 0:n[i]);return this.renderChannel([t.getChannelData(i)],s,r)})));else{const e=[t.getChannelData(0)];t.numberOfChannels>1&&e.push(t.getChannelData(1)),yield this.renderChannel(e,this.options,r)}}catch(t){return}this.emit("rendered")}))}reRender(){if(!this.audioData)return;const{scrollWidth:t}=this.scrollContainer,e=this.progressWrapper.clientWidth;if(this.render(this.audioData),this.isScrollable&&t!==this.scrollContainer.scrollWidth){const t=this.progressWrapper.clientWidth;this.scrollContainer.scrollLeft+=t-e}}zoom(t){this.options.minPxPerSec=t,this.reRender()}scrollIntoView(t,e=!1){const{scrollLeft:i,scrollWidth:n,clientWidth:s}=this.scrollContainer,r=t*n,o=i,a=i+s,h=s/2;if(this.isDragging){const t=30;r+t>a?this.scrollContainer.scrollLeft+=t:r-t<o&&(this.scrollContainer.scrollLeft-=t)}else{(r<o||r>a)&&(this.scrollContainer.scrollLeft=r-(this.options.autoCenter?h:0));const t=r-i-h;e&&this.options.autoCenter&&t>0&&(this.scrollContainer.scrollLeft+=Math.min(t,10))}{const t=this.scrollContainer.scrollLeft,e=t/n,i=(t+s)/n;this.emit("scroll",e,i)}}renderProgress(t,e){if(isNaN(t))return;const i=100*t;this.canvasWrapper.style.clipPath=`polygon(${i}% 0, 100% 0, 100% 100%, ${i}% 100%)`,this.progressWrapper.style.width=`${i}%`,this.cursor.style.left=`${i}%`,this.cursor.style.marginLeft=100===Math.round(i)?`-${this.options.cursorWidth}px`:"",this.isScrollable&&this.options.autoScroll&&this.scrollIntoView(t,e)}exportImage(t,e,n){return i(this,void 0,void 0,(function*(){const i=this.canvasWrapper.querySelectorAll("canvas");if(!i.length)throw new Error("No waveform data");if("dataURL"===n){const n=Array.from(i).map((i=>i.toDataURL(t,e)));return Promise.resolve(n)}return Promise.all(Array.from(i).map((i=>new Promise(((n,s)=>{i.toBlob((t=>{t?n(t):s(new Error("Could not export image"))}),t,e)})))))}))}}o.MAX_CANVAS_WIDTH=4e3;class a extends t{constructor(){super(...arguments),this.unsubscribe=()=>{}}start(){this.unsubscribe=this.on("tick",(()=>{requestAnimationFrame((()=>{this.emit("tick")}))})),this.emit("tick")}stop(){this.unsubscribe()}destroy(){this.unsubscribe()}}class h extends t{constructor(t=new AudioContext){super(),this.bufferNode=null,this.autoplay=!1,this.playStartTime=0,this.playedDuration=0,this._muted=!1,this.buffer=null,this.currentSrc="",this.paused=!0,this.crossOrigin=null,this.addEventListener=this.on,this.removeEventListener=this.un,this.audioContext=t,this.gainNode=this.audioContext.createGain(),this.gainNode.connect(this.audioContext.destination)}load(){return i(this,void 0,void 0,(function*(){}))}get src(){return this.currentSrc}set src(t){if(this.currentSrc=t,!t)return this.buffer=null,void this.emit("emptied");fetch(t).then((t=>t.arrayBuffer())).then((e=>this.currentSrc!==t?null:this.audioContext.decodeAudioData(e))).then((e=>{this.currentSrc===t&&(this.buffer=e,this.emit("loadedmetadata"),this.emit("canplay"),this.autoplay&&this.play())}))}_play(){var t;this.paused&&(this.paused=!1,null===(t=this.bufferNode)||void 0===t||t.disconnect(),this.bufferNode=this.audioContext.createBufferSource(),this.bufferNode.buffer=this.buffer,this.bufferNode.connect(this.gainNode),this.playedDuration>=this.duration&&(this.playedDuration=0),this.bufferNode.start(this.audioContext.currentTime,this.playedDuration),this.playStartTime=this.audioContext.currentTime,this.bufferNode.onended=()=>{this.currentTime>=this.duration&&(this.pause(),this.emit("ended"))})}_pause(){var t;this.paused||(this.paused=!0,null===(t=this.bufferNode)||void 0===t||t.stop(),this.playedDuration+=this.audioContext.currentTime-this.playStartTime)}play(){return i(this,void 0,void 0,(function*(){this._play(),this.emit("play")}))}pause(){this._pause(),this.emit("pause")}stopAt(t){var e,i;const n=t-this.currentTime;null===(e=this.bufferNode)||void 0===e||e.stop(this.audioContext.currentTime+n),null===(i=this.bufferNode)||void 0===i||i.addEventListener("ended",(()=>{this.bufferNode=null,this.pause()}),{once:!0})}setSinkId(t){return i(this,void 0,void 0,(function*(){return this.audioContext.setSinkId(t)}))}get playbackRate(){var t,e;return null!==(e=null===(t=this.bufferNode)||void 0===t?void 0:t.playbackRate.value)&&void 0!==e?e:1}set playbackRate(t){this.bufferNode&&(this.bufferNode.playbackRate.value=t)}get currentTime(){return this.paused?this.playedDuration:this.playedDuration+this.audioContext.currentTime-this.playStartTime}set currentTime(t){this.emit("seeking"),this.paused?this.playedDuration=t:(this._pause(),this.playedDuration=t,this._play()),this.emit("timeupdate")}get duration(){var t;return(null===(t=this.buffer)||void 0===t?void 0:t.duration)||0}get volume(){return this.gainNode.gain.value}set volume(t){this.gainNode.gain.value=t,this.emit("volumechange")}get muted(){return this._muted}set muted(t){this._muted!==t&&(this._muted=t,this._muted?this.gainNode.disconnect():this.gainNode.connect(this.audioContext.destination))}canPlayType(t){return/^(audio|video)\//.test(t)}getGainNode(){return this.gainNode}getChannelData(){const t=[];if(!this.buffer)return t;const e=this.buffer.numberOfChannels;for(let i=0;i<e;i++)t.push(this.buffer.getChannelData(i));return t}}const l={waveColor:"#999",progressColor:"#555",cursorWidth:1,minPxPerSec:0,fillParent:!0,interact:!0,dragToSeek:!1,autoScroll:!0,autoCenter:!0,sampleRate:8e3};class d extends r{static create(t){return new d(t)}constructor(t){const e=t.media||("WebAudio"===t.backend?new h:void 0);super({media:e,mediaControls:t.mediaControls,autoplay:t.autoplay,playbackRate:t.audioRate}),this.plugins=[],this.decodedData=null,this.subscriptions=[],this.mediaSubscriptions=[],this.options=Object.assign({},l,t),this.timer=new a;const i=e?void 0:this.getMediaElement();this.renderer=new o(this.options,i),this.initPlayerEvents(),this.initRendererEvents(),this.initTimerEvents(),this.initPlugins(),Promise.resolve().then((()=>{this.emit("init");const t=this.options.url||this.getSrc()||"";(t||this.options.peaks&&this.options.duration)&&this.load(t,this.options.peaks,this.options.duration)}))}initTimerEvents(){this.subscriptions.push(this.timer.on("tick",(()=>{const t=this.getCurrentTime();this.renderer.renderProgress(t/this.getDuration(),!0),this.emit("timeupdate",t),this.emit("audioprocess",t)})))}initPlayerEvents(){this.isPlaying()&&(this.emit("play"),this.timer.start()),this.mediaSubscriptions.push(this.onMediaEvent("timeupdate",(()=>{const t=this.getCurrentTime();this.renderer.renderProgress(t/this.getDuration(),this.isPlaying()),this.emit("timeupdate",t)})),this.onMediaEvent("play",(()=>{this.emit("play"),this.timer.start()})),this.onMediaEvent("pause",(()=>{this.emit("pause"),this.timer.stop()})),this.onMediaEvent("emptied",(()=>{this.timer.stop()})),this.onMediaEvent("ended",(()=>{this.emit("finish")})),this.onMediaEvent("seeking",(()=>{this.emit("seeking",this.getCurrentTime())})))}initRendererEvents(){this.subscriptions.push(this.renderer.on("click",((t,e)=>{this.options.interact&&(this.seekTo(t),this.emit("interaction",t*this.getDuration()),this.emit("click",t,e))})),this.renderer.on("dblclick",((t,e)=>{this.emit("dblclick",t,e)})),this.renderer.on("scroll",((t,e)=>{const i=this.getDuration();this.emit("scroll",t*i,e*i)})),this.renderer.on("render",(()=>{this.emit("redraw")})),this.renderer.on("rendered",(()=>{this.emit("redrawcomplete")})));{let t;this.subscriptions.push(this.renderer.on("drag",(e=>{this.options.interact&&(this.renderer.renderProgress(e),clearTimeout(t),t=setTimeout((()=>{this.seekTo(e)}),this.isPlaying()?0:200),this.emit("interaction",e*this.getDuration()),this.emit("drag",e))})))}}initPlugins(){var t;(null===(t=this.options.plugins)||void 0===t?void 0:t.length)&&this.options.plugins.forEach((t=>{this.registerPlugin(t)}))}unsubscribePlayerEvents(){this.mediaSubscriptions.forEach((t=>t())),this.mediaSubscriptions=[]}setOptions(t){this.options=Object.assign({},this.options,t),this.renderer.setOptions(this.options),t.audioRate&&this.setPlaybackRate(t.audioRate),null!=t.mediaControls&&(this.getMediaElement().controls=t.mediaControls)}registerPlugin(t){return t._init(this),this.plugins.push(t),this.subscriptions.push(t.once("destroy",(()=>{this.plugins=this.plugins.filter((e=>e!==t))}))),t}getWrapper(){return this.renderer.getWrapper()}getScroll(){return this.renderer.getScroll()}getActivePlugins(){return this.plugins}loadAudio(t,e,r,o){return i(this,void 0,void 0,(function*(){if(this.emit("load",t),!this.options.media&&this.isPlaying()&&this.pause(),this.decodedData=null,!e&&!r){const i=t=>this.emit("loading",t);e=yield s.fetchBlob(t,i,this.options.fetchParams)}this.setSrc(t,e);const i=o||this.getDuration()||(yield new Promise((t=>{this.onceMediaEvent("loadedmetadata",(()=>t(this.getDuration())))})));if(r)this.decodedData=n.createBuffer(r,i||0);else if(e){const t=yield e.arrayBuffer();this.decodedData=yield n.decode(t,this.options.sampleRate)}this.decodedData&&(this.emit("decode",this.getDuration()),this.renderer.render(this.decodedData)),this.emit("ready",this.getDuration())}))}load(t,e,n){return i(this,void 0,void 0,(function*(){yield this.loadAudio(t,void 0,e,n)}))}loadBlob(t,e,n){return i(this,void 0,void 0,(function*(){yield this.loadAudio("blob",t,e,n)}))}zoom(t){if(!this.decodedData)throw new Error("No audio loaded");this.renderer.zoom(t),this.emit("zoom",t)}getDecodedData(){return this.decodedData}exportPeaks({channels:t=2,maxLength:e=8e3,precision:i=1e4}={}){if(!this.decodedData)throw new Error("The audio has not been decoded yet");const n=Math.min(t,this.decodedData.numberOfChannels),s=[];for(let t=0;t<n;t++){const n=this.decodedData.getChannelData(t),r=[],o=Math.round(n.length/e);for(let t=0;t<e;t++){const e=n.slice(t*o,(t+1)*o);let s=0;for(let t=0;t<e.length;t++){const i=e[t];Math.abs(i)>Math.abs(s)&&(s=i)}r.push(Math.round(s*i)/i)}s.push(r)}return s}getDuration(){let t=super.getDuration()||0;return 0!==t&&t!==1/0||!this.decodedData||(t=this.decodedData.duration),t}toggleInteraction(t){this.options.interact=t}seekTo(t){const e=this.getDuration()*t;this.setTime(e)}playPause(){return i(this,void 0,void 0,(function*(){return this.isPlaying()?this.pause():this.play()}))}stop(){this.pause(),this.setTime(0)}skip(t){this.setTime(this.getCurrentTime()+t)}empty(){this.load("",[[0]],.001)}setMediaElement(t){this.unsubscribePlayerEvents(),super.setMediaElement(t),this.initPlayerEvents()}exportImage(t="image/png",e=1,n="dataURL"){return i(this,void 0,void 0,(function*(){return this.renderer.exportImage(t,e,n)}))}destroy(){this.emit("destroy"),this.plugins.forEach((t=>t.destroy())),this.subscriptions.forEach((t=>t())),this.unsubscribePlayerEvents(),this.timer.destroy(),this.renderer.destroy(),super.destroy()}}function c(t,e){const i=e.xmlns?document.createElementNS(e.xmlns,t):document.createElement(t);for(const[t,n]of Object.entries(e))if("children"===t)for(const[t,n]of Object.entries(e))"string"==typeof n?i.appendChild(document.createTextNode(n)):i.appendChild(c(t,n));else"style"===t?Object.assign(i.style,n):"textContent"===t?i.textContent=n:i.setAttribute(t,n.toString());return i}function u(t,e,i){const n=c(t,e||{});return null==i||i.appendChild(n),n}const p={height:50,overlayColor:"rgba(100, 100, 100, 0.1)",insertPosition:"afterend"};class m extends e{constructor(t){super(t),this.miniWavesurfer=null,this.container=null,this.options=Object.assign({},p,t),this.minimapWrapper=this.initMinimapWrapper(),this.overlay=this.initOverlay()}static create(t){return new m(t)}onInit(){var t,e;if(!this.wavesurfer)throw Error("WaveSurfer is not initialized");this.options.container?("string"==typeof this.options.container?this.container=document.querySelector(this.options.container):this.options.container instanceof HTMLElement&&(this.container=this.options.container),null===(t=this.container)||void 0===t||t.appendChild(this.minimapWrapper)):(this.container=this.wavesurfer.getWrapper().parentElement,null===(e=this.container)||void 0===e||e.insertAdjacentElement(this.options.insertPosition,this.minimapWrapper)),this.initWaveSurferEvents()}initMinimapWrapper(){return u("div",{part:"minimap",style:{position:"relative"}})}initOverlay(){return u("div",{part:"minimap-overlay",style:{position:"absolute",zIndex:"2",left:"0",top:"0",bottom:"0",transition:"left 100ms ease-out",pointerEvents:"none",backgroundColor:this.options.overlayColor}},this.minimapWrapper)}initMinimap(){if(this.miniWavesurfer&&(this.miniWavesurfer.destroy(),this.miniWavesurfer=null),!this.wavesurfer)return;const t=this.wavesurfer.getDecodedData(),e=this.wavesurfer.getMediaElement();if(!t||!e)return;const i=[];for(let e=0;e<t.numberOfChannels;e++)i.push(t.getChannelData(e));this.miniWavesurfer=d.create(Object.assign(Object.assign({},this.options),{container:this.minimapWrapper,minPxPerSec:0,fillParent:!0,media:e,peaks:i,duration:t.duration})),this.subscriptions.push(this.miniWavesurfer.on("ready",(()=>{this.emit("ready")})),this.miniWavesurfer.on("interaction",(()=>{this.emit("interaction")})))}getOverlayWidth(){var t;const e=(null===(t=this.wavesurfer)||void 0===t?void 0:t.getWrapper().clientWidth)||1;return Math.round(this.minimapWrapper.clientWidth/e*100)}onRedraw(){const t=this.getOverlayWidth();this.overlay.style.width=`${t}%`}onScroll(t){if(!this.wavesurfer)return;const e=this.wavesurfer.getDuration();this.overlay.style.left=t/e*100+"%"}initWaveSurferEvents(){this.wavesurfer&&this.subscriptions.push(this.wavesurfer.on("decode",(()=>{this.initMinimap()})),this.wavesurfer.on("scroll",(t=>{this.onScroll(t)})),this.wavesurfer.on("redraw",(()=>{this.onRedraw()})))}destroy(){var t;null===(t=this.miniWavesurfer)||void 0===t||t.destroy(),this.minimapWrapper.remove(),super.destroy()}}module.exports=m;
