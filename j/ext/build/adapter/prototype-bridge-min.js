/*
 * Ext JS Library 1.0.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

(function(){var _1;Ext.lib.Dom={getViewWidth:function(_2){return _2?this.getDocumentWidth():this.getViewportWidth();},getViewHeight:function(_3){return _3?this.getDocumentHeight():this.getViewportHeight();},getDocumentHeight:function(){var _4=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;return Math.max(_4,this.getViewportHeight());},getDocumentWidth:function(){var _5=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;return Math.max(_5,this.getViewportWidth());},getViewportHeight:function(){var _6=self.innerHeight;var _7=document.compatMode;if((_7||Ext.isIE)&&!Ext.isOpera){_6=(_7=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;}return _6;},getViewportWidth:function(){var _8=self.innerWidth;var _9=document.compatMode;if(_9||Ext.isIE){_8=(_9=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth;}return _8;},isAncestor:function(p,c){p=Ext.getDom(p);c=Ext.getDom(c);if(!p||!c){return false;}if(p.contains&&!Ext.isSafari){return p.contains(c);}else{if(p.compareDocumentPosition){return !!(p.compareDocumentPosition(c)&16);}else{var _c=c.parentNode;while(_c){if(_c==p){return true;}else{if(!_c.tagName||_c.tagName.toUpperCase()=="HTML"){return false;}}_c=_c.parentNode;}return false;}}},getRegion:function(el){return Ext.lib.Region.getRegion(el);},getY:function(el){return this.getXY(el)[1];},getX:function(el){return this.getXY(el)[0];},getXY:function(el){var p,pe,b,_14,bd=document.body;el=Ext.getDom(el);if(el.getBoundingClientRect){b=el.getBoundingClientRect();_14=fly(document).getScroll();return [b.left+_14.left,b.top+_14.top];}else{var x=el.offsetLeft,y=el.offsetTop;p=el.offsetParent;var _18=false;if(p!=el){while(p){x+=p.offsetLeft;y+=p.offsetTop;if(Ext.isSafari&&!_18&&fly(p).getStyle("position")=="absolute"){_18=true;}if(Ext.isGecko){pe=fly(p);var bt=parseInt(pe.getStyle("borderTopWidth"),10)||0;var bl=parseInt(pe.getStyle("borderLeftWidth"),10)||0;x+=bl;y+=bt;if(p!=el&&pe.getStyle("overflow")!="visible"){x+=bl;y+=bt;}}p=p.offsetParent;}}if(Ext.isSafari&&(_18||fly(el).getStyle("position")=="absolute")){x-=bd.offsetLeft;y-=bd.offsetTop;}}p=el.parentNode;while(p&&p!=bd){if(!Ext.isOpera||(Ext.isOpera&&p.tagName!="TR"&&fly(p).getStyle("display")!="inline")){x-=p.scrollLeft;y-=p.scrollTop;}p=p.parentNode;}return [x,y];},setXY:function(el,xy){el=Ext.fly(el,"_setXY");el.position();var pts=el.translatePoints(xy);if(xy[0]!==false){el.dom.style.left=pts.left+"px";}if(xy[1]!==false){el.dom.style.top=pts.top+"px";}},setX:function(el,x){this.setXY(el,[x,false]);},setY:function(el,y){this.setXY(el,[false,y]);}};Ext.lib.Event={getPageX:function(e){return Event.pointerX(e.browserEvent||e);},getPageY:function(e){return Event.pointerY(e.browserEvent||e);},getXY:function(e){e=e.browserEvent||e;return [Event.pointerX(e),Event.pointerY(e)];},getTarget:function(e){return Event.element(e.browserEvent||e);},resolveTextNode:function(_26){if(_26&&3==_26.nodeType){return _26.parentNode;}else{return _26;}},getRelatedTarget:function(ev){ev=ev.browserEvent||ev;var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else{if(ev.type=="mouseover"){t=ev.fromElement;}}}return this.resolveTextNode(t);},on:function(el,_2a,fn){Event.observe(el,_2a,fn,false);},un:function(el,_2d,fn){Event.stopObserving(el,_2d,fn,false);},purgeElement:function(el){},preventDefault:function(e){e=e.browserEvent||e;if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}},stopPropagation:function(e){e=e.browserEvent||e;if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}},stopEvent:function(e){Event.stop(e.browserEvent||e);},onAvailable:function(el,fn,_35,_36){var _37=new Date(),iid;var f=function(){if(_37.getElapsed()>10000){clearInterval(iid);}var el=document.getElementById(id);if(el){clearInterval(iid);fn.call(_35||window,el);}};iid=setInterval(f,50);}};Ext.lib.Ajax=function(){var _3b=function(cb){return cb.success?function(xhr){cb.success.call(cb.scope||window,{responseText:xhr.responseText,responseXML:xhr.responseXML,argument:cb.argument});}:Ext.emptyFn;};var _3e=function(cb){return cb.failure?function(xhr){cb.failure.call(cb.scope||window,{responseText:xhr.responseText,responseXML:xhr.responseXML,argument:cb.argument});}:Ext.emptyFn;};return {request:function(_41,uri,cb,_44){new Ajax.Request(uri,{method:_41,parameters:_44||"",timeout:cb.timeout,onSuccess:_3b(cb),onFailure:_3e(cb)});},formRequest:function(_45,uri,cb,_48,_49,_4a){new Ajax.Request(uri,{method:Ext.getDom(_45).method||"POST",parameters:Form.serialize(_45)+(_48?"&"+_48:""),timeout:cb.timeout,onSuccess:_3b(cb),onFailure:_3e(cb)});},isCallInProgress:function(_4b){return false;},abort:function(_4c){return false;},serializeForm:function(_4d){return Form.serialize(_4d.dom||_4d,true);}};}();Ext.lib.Anim=function(){var _4e={easeOut:function(pos){return 1-Math.pow(1-pos,2);},easeIn:function(pos){return 1-Math.pow(1-pos,2);}};var _51=function(cb,_53){return {stop:function(_54){this.effect.cancel();},isAnimated:function(){return this.effect.state=="running";},proxyCallback:function(){Ext.callback(cb,_53);}};};return {scroll:function(el,_56,_57,_58,cb,_5a){var _5b=_51(cb,_5a);el=Ext.getDom(el);el.scrollLeft=_56.to[0];el.scrollTop=_56.to[1];_5b.proxyCallback();return _5b;},motion:function(el,_5d,_5e,_5f,cb,_61){return this.run(el,_5d,_5e,_5f,cb,_61);},color:function(el,_63,_64,_65,cb,_67){return this.run(el,_63,_64,_65,cb,_67);},run:function(el,_69,_6a,_6b,cb,_6d,_6e){var o={};for(var k in _69){switch(k){case "points":var by,pts,e=Ext.fly(el,"_animrun");e.position();if(by=_69.points.by){var xy=e.getXY();pts=e.translatePoints([xy[0]+by[0],xy[1]+by[1]]);}else{pts=e.translatePoints(_69.points.to);}o.left=pts.left+"px";o.top=pts.top+"px";break;case "width":o.width=_69.width.to+"px";break;case "height":o.height=_69.height.to+"px";break;case "opacity":o.opacity=String(_69.opacity.to);break;default:o[k]=String(_69[k].to);break;}}var _75=_51(cb,_6d);_75.effect=new Effect.Morph(Ext.id(el),{duration:_6a,afterFinish:_75.proxyCallback,transition:_4e[_6b]||Effect.Transitions.linear,style:o});return _75;}};}();function fly(el){if(!_1){_1=new Ext.Element.Flyweight();}_1.dom=el;return _1;}Ext.lib.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};Ext.lib.Region.prototype={contains:function(_7b){return (_7b.left>=this.left&&_7b.right<=this.right&&_7b.top>=this.top&&_7b.bottom<=this.bottom);},getArea:function(){return ((this.bottom-this.top)*(this.right-this.left));},intersect:function(_7c){var t=Math.max(this.top,_7c.top);var r=Math.min(this.right,_7c.right);var b=Math.min(this.bottom,_7c.bottom);var l=Math.max(this.left,_7c.left);if(b>=t&&r>=l){return new Ext.lib.Region(t,r,b,l);}else{return null;}},union:function(_81){var t=Math.min(this.top,_81.top);var r=Math.max(this.right,_81.right);var b=Math.max(this.bottom,_81.bottom);var l=Math.min(this.left,_81.left);return new Ext.lib.Region(t,r,b,l);},adjust:function(t,l,b,r){this.top+=t;this.left+=l;this.right+=r;this.bottom+=b;return this;}};Ext.lib.Region.getRegion=function(el){var p=Ext.lib.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new Ext.lib.Region(t,r,b,l);};Ext.lib.Point=function(x,y){if(x instanceof Array){y=x[1];x=x[0];}this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};Ext.lib.Point.prototype=new Ext.lib.Region();if(Ext.isIE){Event.observe(window,"unload",function(){var p=Function.prototype;delete p.createSequence;delete p.defer;delete p.createDelegate;delete p.createCallback;delete p.createInterceptor;});}})();
