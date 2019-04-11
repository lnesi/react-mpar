module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=4)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-dom")},function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){module.exports=t(e)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==global?global:this,function(global){"use strict";global=global||{};var _Base64=global.Base64,version="2.5.1",buffer;if(module.exports)try{buffer=eval("require('buffer').Buffer")}catch(e){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var t={},r=0,n=e.length;r<n;r++)t[e.charAt(r)]=r;return t}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2)return(t=e.charCodeAt(0))<128?e:t<2048?fromCharCode(192|t>>>6)+fromCharCode(128|63&t):fromCharCode(224|t>>>12&15)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t);var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|t>>>18&7)+fromCharCode(128|t>>>12&63)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(e){return e.replace(re_utob,cb_utob)},cb_encode=function(e){var t=[0,2,1][e.length%3],r=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0);return[b64chars.charAt(r>>>18),b64chars.charAt(r>>>12&63),t>=2?"=":b64chars.charAt(r>>>6&63),t>=1?"=":b64chars.charAt(63&r)].join("")},btoa=global.btoa?function(e){return global.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e)).toString("base64")}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e)).toString("base64")}:function(e){return btoa(utob(e))},encode=function(e,t){return t?_encode(String(e)).replace(/[+\/]/g,function(e){return"+"==e?"-":"_"}).replace(/=/g,""):_encode(String(e))},encodeURI=function(e){return encode(e,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return fromCharCode(55296+(t>>>10))+fromCharCode(56320+(1023&t));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(e){return e.replace(re_btou,cb_btou)},cb_decode=function(e){var t=e.length,r=t%4,n=(t>0?b64tab[e.charAt(0)]<<18:0)|(t>1?b64tab[e.charAt(1)]<<12:0)|(t>2?b64tab[e.charAt(2)]<<6:0)|(t>3?b64tab[e.charAt(3)]:0),o=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(255&n)];return o.length-=[0,0,2,1][r],o.join("")},_atob=global.atob?function(e){return global.atob(e)}:function(e){return e.replace(/\S{1,4}/g,cb_decode)},atob=function(e){return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e,"base64")).toString()}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e,"base64")).toString()}:function(e){return btou(_atob(e))},decode=function(e){return _decode(String(e).replace(/[-_]/g,function(e){return"-"==e?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"==typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)})),Object.defineProperty(String.prototype,"toBase64",noEnum(function(e){return encode(this,e)})),Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,!0)}))}}return global.Meteor&&(Base64=global.Base64),module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),{Base64:global.Base64}})}).call(this,__webpack_require__(5))},function(e,t){e.exports=require("react-redux")},function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return l});var n=r(2),o=r(0),a=r.n(o),c=r(1),u=r.n(c),i=r(3);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=function(){function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.classSelector=t,this.dictonary=r,this.document=n,this.document.reactReduxMPA=this}var t,r,o;return t=e,(r=[{key:"createState",value:function(e){var t=this,r=e;return this.document.querySelectorAll(this.classSelector).forEach(function(e){var o=t.dictonary[e.dataset.component];if(o){if(o.reduxEnabled&&o.createState){var a;a=JSON.parse(n.Base64.decode(e.dataset.state)),r[e.dataset.component]||(r[e.dataset.component]={}),r[e.dataset.component][e.id]=a}}else s("Invalid component. Could not find '"+e.dataset.component+"' in dictionary.")}),r}},{key:"getStateBy",value:function(e){var t=this.getWrapperById(e);if(t){return JSON.parse(n.Base64.decode(t.dataset.state))}}},{key:"unmount",value:function(e){this.document.getElementById(e)&&u.a.unmountComponentAtNode(this.document.getElementById(e))}},{key:"unmountAll",value:function(){this.document.querySelectorAll(this.classSelector).forEach(function(e){u.a.unmountComponentAtNode(e)})}},{key:"getWrapperById",value:function(e){if(e){var t=this.document.getElementById(e);return t||(s("Invalid wrapper ID. Could not find '"+e+"' in DOM."),null)}return s("Invalid wrapper ID. is missing in the DOM."),null}},{key:"mount",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=this.getWrapperById(e);if(r){var o=this.dictonary[r.dataset.component];if(o){var a={};r.dataset.props&&(a=JSON.parse(n.Base64.decode(r.dataset.props))),this.render(o,r,a,t)}else s("Invalid component. Could not find '"+r.dataset.component)}}},{key:"render",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},o=e.class;console.log("Rendering",t.id),e.reduxEnabled?u.a.render(a.a.createElement(i.Provider,{store:this.store},a.a.createElement(o,d({id:t.id},r))),t,n):u.a.render(a.a.createElement(a.a.Fragment,null,a.a.createElement(o,d({id:t.id},r))),t,n)}},{key:"renderAll",value:function(){this.store&&this.store.dispatch({type:"REACT_REDUX_MPA_RENDER_ALL_START"}),document.dispatchEvent(new Event("REACT_REDUX_MPA_RENDER_ALL_START")),console.time("React/Redux MPA Render Start"),console.log("React/Redux MPA Render Start"),this.document.querySelectorAll(this.classSelector).length>0?this.renderStep(0):this.finishRender()}},{key:"finishRender",value:function(){this.store&&this.store.dispatch({type:"REACT_REDUX_MPA_RENDER_ALL_END"}),document.dispatchEvent(new Event("REACT_REDUX_MPA_RENDER_ALL_END")),console.time("React/Redux MPA Render End"),console.log("React/Redux MPA Render End")}},{key:"renderStep",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=this.document.querySelectorAll(this.classSelector)[t];this.mount(r.id,function(){t<e.document.querySelectorAll(e.classSelector).length-1?e.renderStep(t+1):e.finishRender()})}},{key:"setStore",value:function(e){this.store=e,this.store.dispatch({type:"REACT_REDUX_MPA_RENDER_SET_STORE"})}},{key:"resetById",value:function(e){this.unmount(e),this.mount(e)}}])&&f(t.prototype,r),o&&f(t,o),e}();function s(e){try{console.error("%c  React/Redux MPA Renderer ","background: #0483d8; color: #fff",e)}catch(t){throw Error(e)}}},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r}]);