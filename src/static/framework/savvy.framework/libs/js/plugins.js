/*

   .x+=:.                  _            _                      
  z`    ^%                u            u            ..         
     .   <k              88Nu.   u.   88Nu.   u.   @L          
   .@8Ned8"       u     '88888.o888c '88888.o888c 9888i   .dL  
 .@^%8888"     us888u.   ^8888  8888  ^8888  8888 `Y888k:*888. 
x88:  `)8b. .@88 "8888"   8888  8888   8888  8888   888E  888I 
8888N=*8888 9888  9888    8888  8888   8888  8888   888E  888I 
 %8"    R88 9888  9888    8888  8888   8888  8888   888E  888I 
  @8Wou 9%  9888  9888   .8888b.888P  .8888b.888P   888E  888I 
.888888P`   9888  9888    ^Y8888*""    ^Y8888*""   x888N><888' 
`   ^"F     "888*""888"     `Y"          `Y"        "88"  888  
             ^Y"   ^Y'                                    88F  
                                                         98"   
                                                       ./"     
                                                      ~`       

   Version: 0.3.0

   Copyright 2014 Oliver Moran

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

// Monkey patches for various JavaScript objects (required for older browsers)

// Create the console object if it doesn't exist
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

// Monkey patch window.addEventListener and window.removeEventListener on IE8
window.addEventListener||(window.addEventListener=function(a,b,c){window.attachEvent("on"+a,b,c)});
window.removeEventListener||(window.removeEventListener=function(a,b,c){window.detachEvent("on"+a,b,c)});

// Creates a standard JSON serialiser/de-serialiser, if it does not exist already:
// - https://github.com/douglascrockford/JSON-js
// - http://json.org/
"object"!==typeof JSON&&(JSON={});
(function(){function l(a){return 10>a?"0"+a:a}function q(a){r.lastIndex=0;return r.test(a)?'"'+a.replace(r,function(a){var c=t[a];return"string"===typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function n(a,k){var c,d,h,p,g=e,f,b=k[a];b&&("object"===typeof b&&"function"===typeof b.toJSON)&&(b=b.toJSON(a));"function"===typeof j&&(b=j.call(k,a,b));switch(typeof b){case "string":return q(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);
case "object":if(!b)return"null";e+=m;f=[];if("[object Array]"===Object.prototype.toString.apply(b)){p=b.length;for(c=0;c<p;c+=1)f[c]=n(c,b)||"null";h=0===f.length?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(j&&"object"===typeof j){p=j.length;for(c=0;c<p;c+=1)"string"===typeof j[c]&&(d=j[c],(h=n(d,b))&&f.push(q(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=n(d,b))&&f.push(q(d)+(e?": ":":")+h);h=0===f.length?"{}":e?"{\n"+e+f.join(",\n"+
e)+"\n"+g+"}":"{"+f.join(",")+"}";e=g;return h}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+l(this.getUTCMonth()+1)+"-"+l(this.getUTCDate())+"T"+l(this.getUTCHours())+":"+l(this.getUTCMinutes())+":"+l(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var s=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
r=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,m,t={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},j;"function"!==typeof JSON.stringify&&(JSON.stringify=function(a,k,c){var d;m=e="";if("number"===typeof c)for(d=0;d<c;d+=1)m+=" ";else"string"===typeof c&&(m=c);if((j=k)&&"function"!==typeof k&&("object"!==typeof k||"number"!==typeof k.length))throw Error("JSON.stringify");return n("",{"":a})});
"function"!==typeof JSON.parse&&(JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&"object"===typeof b)for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),void 0!==f?b[g]=f:delete b[g]);return e.call(a,d,b)}var d;a=String(a);s.lastIndex=0;s.test(a)&&(a=a.replace(s,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),"function"===typeof e?c({"":d},""):d;throw new SyntaxError("JSON.parse");})})();

// Animate.css.js: extends JS's HTMLElement prototype to enable Animate.css animations directly on HTML Elements
// https://github.com/oliver-moran/animate.css.js
// https://daneden.me/animate/
HTMLElement.prototype.animate=function(a,b,c){if("string"==typeof a){var d=this;this.className+=" animated "+a;setTimeout(function(){d.className=d.className.replace(" animated "+a,"");"function"==typeof b&&b.call(c?c:window)},"hinge"==a?2E3:1E3)}};

// prevent body scrolling on iOS standalone
if (window.navigator.standalone) {
    var start={x:0,y:0};document.addEventListener("touchstart",function(a){start.x=a.touches[0].screenX;start.y=a.touches[0].screenY}); document.addEventListener("touchmove",function(a){if("range"!==a.target.type){for(var c=a.touches[0].screenX-start.x,d=a.touches[0].screenY-start.y,b=a.target;b!=document.body&&!canScrollVertical(b)&&!canScrollHorizontal(b);)b=b.parentNode;b==document.body?a.preventDefault():Math.abs(d)>Math.abs(c)?0<d&&canScrollUp(b)||0>d&&canScrollDown(b)||a.preventDefault():0<c&&canScrollLeft(b)||0>c&&canScrollRight(b)||a.preventDefault()}}); function canScrollVertical(a){return a.scrollHeight>a.getBoundingClientRect().height}function canScrollHorizontal(a){return a.scrollWidth>a.getBoundingClientRect().width}function canScrollUp(a){return 0!=a.scrollTop}function canScrollDown(a){return a.scrollTop!=a.scrollHeight-a.getBoundingClientRect().height}function canScrollLeft(a){return 0!=a.scrollLeft}function canScrollRight(a){return a.scrollLeft!=a.scrollWidth-a.getBoundingClientRect().width};
}