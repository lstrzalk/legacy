webpackJsonp([1],{"/626":function(t,e){},"0z7B":function(t,e){},"3TcT":function(t,e){},FbEL:function(t,e){},"HNa/":function(t,e){},JtGZ:function(t,e){},LGiM:function(t,e){},"N+IJ":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),s={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("Rotaiton")])},staticRenderFns:[]};var r=n("VU/8")(null,s,!1,function(t){n("JtGZ")},"data-v-48f95e33",null).exports,a=n("Zrlr"),o=n.n(a),c=n("wxAW"),u=n.n(c),h={data:function(){return{model:null}},mounted:function(){var t=this;window.addEventListener("load",function(){var e=new l(t.$el),n=new v(e.widthCenter(),e.heightCenter(),.7*e.determineScreenOrientation(),"outer-circle",e,null,t.$refs.oc),i=new v(e.widthCenter(),e.heightCenter(),.3*e.determineScreenOrientation(),"inner-circle",e,n,t.$refs.ic);e.appendNewEventListener("mousemove",i.circleMouseMove,i),e.appendNewEventListener("mouseup",i.mouseMoveEnd,i)})},name:"Joystick"},l=function(){function t(e){o()(this,t),this.instance=e}return u()(t,[{key:"appendNewEventListener",value:function(t,e,n){this.instance.addEventListener(t,e.bind(n),!1)}},{key:"svgWidth",value:function(){return this.instance.clientWidth}},{key:"svgHeight",value:function(){return this.instance.clientHeight}},{key:"addElement",value:function(t){this.instance.appendChild(t)}},{key:"heightCenter",value:function(){return this.svgHeight()/2}},{key:"widthCenter",value:function(){return this.svgWidth()/2}},{key:"determineScreenOrientation",value:function(){return this.svgWidth()>this.svgHeight()?this.heightCenter():this.widthCenter()}}]),t}(),v=function(){function t(e,n,i,s,r,a,c){o()(this,t),this.cx=e,this.cy=n,this.r=i,this.id=s,this.svg=r,this.parent=a,this.offset=window.innerHeight-this.svg.svgHeight(),this.instance=this.createCircle(c)}return u()(t,[{key:"createCircle",value:function(t){var e=t;return e.setAttributeNS(null,"cx",this.cx),e.setAttributeNS(null,"cy",this.cy),e.setAttributeNS(null,"r",this.r),this.parent&&(this.appendNewEventListener("touchmove",this.circleTouch,e),this.appendNewEventListener("touchend",this.circleTouchEnd,e),this.appendNewEventListener("mousedown",this.circleMouseMoveStart,e),this.appendNewEventListener("mouseup",this.mouseMoveEnd,e),this.appendNewEventListener("mousemove",this.circleMouseMove,e)),e.id=this.id,e}},{key:"appendNewEventListener",value:function(t,e,n){n.addEventListener(t,e.bind(this),!1)}},{key:"circleMouseClickOrTouched",value:function(t,e){if(this.getDistance(t,e)<=this.parent.r)window.requestAnimationFrame(this.makeStepForward(t,e));else{var n=this.getCos(t,e,this.svg.widthCenter(),this.svg.heightCenter()),i=this.getSin(t,e,this.svg.widthCenter(),this.svg.heightCenter()),s=this.parent.r;window.requestAnimationFrame(this.makeStepForward(n*s+this.svg.widthCenter(),i*s+this.svg.heightCenter()))}}},{key:"circleTouch",value:function(t){this.circleMouseClickOrTouched(t.touches[0].clientX,t.touches[0].clientY-this.offset)}},{key:"circleMouseMove",value:function(t){this.enableCircleMove&&this.circleMouseClickOrTouched(t.x,t.y)}},{key:"circleTouchEnd",value:function(t){for(var e=this.getDistance(this.cx,this.cy);e>0;)window.requestAnimationFrame(this.makeStepBack(e)),e-=.1;e=0,window.requestAnimationFrame(this.makeStepBack(e))}},{key:"mouseMoveEnd",value:function(t){this.enableCircleMove&&(this.circleTouchEnd(t),this.enableCircleMove=!1)}},{key:"circleMouseMoveStart",value:function(t){this.enableCircleMove=!0}},{key:"getDistance",value:function(t,e){var n=this.svg.widthCenter()-t,i=this.svg.heightCenter()-e,s=Math.pow(n,2)+Math.pow(i,2);return Math.sqrt(s)}},{key:"getCos",value:function(t,e,n,i){return Math.cos(Math.atan2(e-i,t-n))}},{key:"getSin",value:function(t,e,n,i){return Math.sin(Math.atan2(e-i,t-n))}},{key:"makeStepForward",value:function(t,e){return function(){this.updateCoords(t,e)}.bind(this)}},{key:"makeStepBack",value:function(t){return function(){this.updateCoords(t*this.getCos(this.cx,this.cy,this.svg.widthCenter(),this.svg.heightCenter())+this.svg.widthCenter(),t*this.getSin(this.cx,this.cy,this.svg.widthCenter(),this.svg.heightCenter())+this.svg.heightCenter())}.bind(this)}},{key:"setAttr",value:function(t,e){this.instance.setAttributeNS(null,t,e)}},{key:"updateCx",value:function(t){this.cx=t,this.setAttr("cx",this.cx)}},{key:"updateCy",value:function(t){this.cy=t,this.setAttr("cy",this.cy)}},{key:"setR",value:function(t){this.r=t}},{key:"updateCoords",value:function(t,e){this.updateCx(t),this.updateCy(e)}}]),t}(),d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{id:"controller"}},[e("circle",{ref:"oc",attrs:{id:"outer-circle"}}),this._v(" "),e("circle",{ref:"ic",attrs:{id:"inner-circle"}})])},staticRenderFns:[]};var f={data:function(){return{model:null}},name:"App",components:{Rotation:r,Joystick:n("VU/8")(h,d,!1,function(t){n("SJJg")},"data-v-071a357a",null).exports}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-toolbar",{attrs:{dark:!0,tabs:""}},[n("v-toolbar-title",[t._v("Sphero Controller")]),t._v(" "),n("v-tabs",{attrs:{slot:"extension",grow:""},slot:"extension",model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[n("v-tab",{attrs:{href:"#joystick"}},[t._v("Joystick")]),t._v(" "),n("v-tab",{attrs:{href:"#rotation"}},[t._v("Rotation")])],1)],1),t._v(" "),n("v-tabs-items",{class:"tabs",model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[n("v-tab-item",{class:"tab",attrs:{id:"joystick"}},[n("Joystick")],1),t._v(" "),n("v-tab-item",{class:"tab",attrs:{id:"rotation"}},[n("Rotation")],1)],1),t._v(" "),n("v-footer",{attrs:{fixed:!0,dark:!0,app:""}},[n("span",[t._v("© 2018")]),t._v(" "),n("v-spacer"),t._v(" "),n("span",[t._v("Łukasz Strzałka")])],1)],1)},staticRenderFns:[]};var g=n("VU/8")(f,p,!1,function(t){n("0z7B")},"data-v-eef24b1a",null).exports,m=n("M+UZ"),k=n.n(m),w=n("IcMm"),C=n.n(w),y=n("rPQa"),b=n.n(y),M=n("TWha"),E=n.n(M),S=n("fYhH"),F=n.n(S),_=n("7Q1V"),x=n.n(_),N=n("7M7f"),A=n.n(N),V=n("JUsQ"),L=n.n(V),T=n("+9ps"),J=n.n(T),H=n("6/SM"),O=n.n(H),B=n("f/u0"),R=n.n(B),W=n("6VHA"),Z=n.n(W);n("s6ZO");i.a.use(k.a,{components:{VApp:C.a,VNavigationDrawer:b.a,VFooter:E.a,VList:F.a,VBtn:x.a,VIcon:A.a,VGrid:L.a,VToolbar:J.a,VTabs:O.a,VCard:R.a,transitions:Z.a},theme:{primary:"#52154E",secondary:"#323031",accent:"#FBFFF1",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}),i.a.config.productionTip=!1,i.a.config.devtools=!0,i.a.config.silent=!0,new i.a({el:"#app",components:{App:g},template:"<App/>"})},NOHZ:function(t,e){},P0ba:function(t,e){},SJJg:function(t,e){},"X05+":function(t,e){},XC5Q:function(t,e){},acBN:function(t,e){},kP4z:function(t,e){},kVeV:function(t,e){},pu2v:function(t,e){},s6ZO:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.e9b4dbcea8727c8d58e5.js.map