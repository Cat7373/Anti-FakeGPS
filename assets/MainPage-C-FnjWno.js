import{r as Tt,a as wt,g as St,d as nt,c as bt,b as T,i as At,m as _t,F as Bt,e as Lt,f as xt,o as Ft,h as kt,w as Q,j as it,k as Gt,u as Ht}from"./index-CflMssCz.js";const jt=Object.assign,Ot=t=>t!==null&&typeof t=="object",F=t=>t!=null,Kt=t=>typeof t=="function",Dt=t=>typeof t=="number"||/^\d+(\.\d+)?$/.test(t);function dt(t,e){const n=e.split(".");let r=t;return n.forEach(g=>{var o;r=Ot(r)&&(o=r[g])!=null?o:""}),r}const ut=null,k=[Number,String],lt={type:Boolean,default:!0},et=t=>({type:String,default:t});function x(t){if(F(t))return Dt(t)?`${t}px`:String(t)}const Yt=/-(\w)/g,It=t=>t.replace(Yt,(e,n)=>n.toUpperCase()),{hasOwnProperty:Rt}=Object.prototype;function Ut(t,e,n){const r=e[n];F(r)&&(!Rt.call(t,n)||!Ot(r)?t[n]=r:t[n]=yt(Object(t[n]),r))}function yt(t,e){return Object.keys(e).forEach(n=>{Ut(t,e,n)}),t}var zt={name:"姓名",tel:"电话",save:"保存",clear:"清空",cancel:"取消",confirm:"确认",delete:"删除",loading:"加载中...",noCoupon:"暂无优惠券",nameEmpty:"请填写姓名",addContact:"添加联系人",telInvalid:"请填写正确的电话",vanCalendar:{end:"结束",start:"开始",title:"日期选择",weekdays:["日","一","二","三","四","五","六"],monthTitle:(t,e)=>`${t}年${e}月`,rangePrompt:t=>`最多选择 ${t} 天`},vanCascader:{select:"请选择"},vanPagination:{prev:"上一页",next:"下一页"},vanPullRefresh:{pulling:"下拉即可刷新...",loosing:"释放即可刷新..."},vanSubmitBar:{label:"合计:"},vanCoupon:{unlimited:"无门槛",discount:t=>`${t}折`,condition:t=>`满${t}元可用`},vanCouponCell:{title:"优惠券",count:t=>`${t}张可用`},vanCouponList:{exchange:"兑换",close:"不使用",enable:"可用",disabled:"不可用",placeholder:"输入优惠码"},vanAddressEdit:{area:"地区",areaEmpty:"请选择地区",addressEmpty:"请填写详细地址",addressDetail:"详细地址",defaultAddress:"设为默认收货地址"},vanAddressList:{add:"新增地址"}};const ft=Tt("zh-CN"),mt=wt({"zh-CN":zt}),Wt={messages(){return mt[ft.value]},use(t,e){ft.value=t,this.add({[t]:e})},add(t={}){yt(mt,t)}};var Vt=Wt;function Zt(t){const e=It(t)+".";return(n,...r)=>{const g=Vt.messages(),o=dt(g,e+n)||dt(g,n);return Kt(o)?o(...r):o}}function ot(t,e){return e?typeof e=="string"?` ${t}--${e}`:Array.isArray(e)?e.reduce((n,r)=>n+ot(t,r),""):Object.keys(e).reduce((n,r)=>n+(e[r]?ot(t,r):""),""):""}function qt(t){return(e,n)=>(e&&typeof e!="string"&&(n=e,e=""),e=e?`${t}__${e}`:t,`${e}${ot(e,n)}`)}function z(t){const e=`van-${t}`;return[e,qt(e),Zt(e)]}const Jt="van-hairline",Qt=`${Jt}--top-bottom`;function st(t){return t.install=e=>{const{name:n}=t;n&&(e.component(n,t),e.component(It(`-${n}`),t))},t}const Xt={to:[String,Object],url:String,replace:Boolean};function te({to:t,url:e,replace:n,$router:r}){t&&r?r[n?"replace":"push"](t):e&&(n?location.replace(e):location.href=e)}function ee(){const t=St().proxy;return()=>te(t)}const[ne,gt]=z("badge"),ie={dot:Boolean,max:k,tag:et("div"),color:String,offset:Array,content:k,showZero:lt,position:et("top-right")};var se=nt({name:ne,props:ie,setup(t,{slots:e}){const n=()=>{if(e.content)return!0;const{content:l,showZero:h}=t;return F(l)&&l!==""&&(h||l!==0&&l!=="0")},r=()=>{const{dot:l,max:h,content:v}=t;if(!l&&n())return e.content?e.content():F(h)&&Dt(v)&&+v>+h?`${h}+`:v},g=l=>l.startsWith("-")?l.replace("-",""):`-${l}`,o=bt(()=>{const l={background:t.color};if(t.offset){const[h,v]=t.offset,{position:I}=t,[S,M]=I.split("-");e.default?(typeof v=="number"?l[S]=x(S==="top"?v:-v):l[S]=S==="top"?x(v):g(v),typeof h=="number"?l[M]=x(M==="left"?h:-h):l[M]=M==="left"?x(h):g(h)):(l.marginTop=x(v),l.marginLeft=x(h))}return l}),m=()=>{if(n()||t.dot)return T("div",{class:gt([t.position,{dot:t.dot,fixed:!!e.default}]),style:o.value},[r()])};return()=>{if(e.default){const{tag:l}=t;return T(l,{class:gt("wrapper")},{default:()=>[e.default(),m()]})}return m()}}});const ae=st(se),[re,Ae]=z("config-provider"),ue=Symbol(re),[oe,vt]=z("icon"),le=t=>t==null?void 0:t.includes("/"),ce={dot:Boolean,tag:et("i"),name:String,size:k,badge:k,color:String,badgeProps:Object,classPrefix:String};var he=nt({name:oe,props:ce,setup(t,{slots:e}){const n=At(ue,null),r=bt(()=>t.classPrefix||(n==null?void 0:n.iconPrefix)||vt());return()=>{const{tag:g,dot:o,name:m,size:l,badge:h,color:v}=t,I=le(m);return T(ae,_t({dot:o,tag:g,class:[r.value,I?"":`${r.value}-${m}`],style:{color:v,fontSize:x(l)},content:h},t.badgeProps),{default:()=>{var S;return[(S=e.default)==null?void 0:S.call(e),I&&T("img",{class:vt("image"),src:m},null)]}})}}});const pt=st(he),de=()=>{var t;const{scopeId:e}=((t=St())==null?void 0:t.vnode)||{};return e?{[e]:""}:null},[fe,j]=z("cell"),me={tag:et("div"),icon:String,size:String,title:k,value:k,label:k,center:Boolean,isLink:Boolean,border:lt,iconPrefix:String,valueClass:ut,labelClass:ut,titleClass:ut,titleStyle:null,arrowDirection:String,required:{type:[Boolean,String],default:null},clickable:{type:Boolean,default:null}},ge=jt({},me,Xt);var ve=nt({name:fe,props:ge,setup(t,{slots:e}){const n=ee(),r=()=>{if(e.label||F(t.label))return T("div",{class:[j("label"),t.labelClass]},[e.label?e.label():t.label])},g=()=>{var h;if(e.title||F(t.title)){const v=(h=e.title)==null?void 0:h.call(e);return Array.isArray(v)&&v.length===0?void 0:T("div",{class:[j("title"),t.titleClass],style:t.titleStyle},[v||T("span",null,[t.title]),r()])}},o=()=>{const h=e.value||e.default;if(h||F(t.value))return T("div",{class:[j("value"),t.valueClass]},[h?h():T("span",null,[t.value])])},m=()=>{if(e.icon)return e.icon();if(t.icon)return T(pt,{name:t.icon,class:j("left-icon"),classPrefix:t.iconPrefix},null)},l=()=>{if(e["right-icon"])return e["right-icon"]();if(t.isLink){const h=t.arrowDirection&&t.arrowDirection!=="right"?`arrow-${t.arrowDirection}`:"arrow";return T(pt,{name:h,class:j("right-icon")},null)}};return()=>{var h;const{tag:v,size:I,center:S,border:M,isLink:P,required:N}=t,G=(h=t.clickable)!=null?h:P,W={center:S,required:!!N,clickable:G,borderless:!M};return I&&(W[I]=!!I),T(v,{class:j(W),role:G?"button":void 0,tabindex:G?0:void 0,onClick:n},{default:()=>{var V;return[m(),g(),o(),l(),(V=e.extra)==null?void 0:V.call(e)]}})}}});const pe=st(ve),[$e,$t]=z("cell-group"),Ee={title:String,inset:Boolean,border:lt};var Te=nt({name:$e,inheritAttrs:!1,props:Ee,setup(t,{slots:e,attrs:n}){const r=()=>{var o;return T("div",_t({class:[$t({inset:t.inset}),{[Qt]:t.border&&!t.inset}]},n,de()),[(o=e.default)==null?void 0:o.call(e)])},g=()=>T("div",{class:$t("title",{inset:t.inset})},[e.title?e.title():t.title]);return()=>t.title||e.title?T(Bt,null,[g(),r()]):r()}});const Se=st(Te);var Ct={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(Lt,function(){var n=1e3,r=6e4,g=36e5,o="millisecond",m="second",l="minute",h="hour",v="day",I="week",S="month",M="quarter",P="year",N="date",G="Invalid Date",W=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,V=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Mt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(c){var a=["th","st","nd","rd"],i=c%100;return"["+c+(a[(i-20)%10]||a[i]||a[0])+"]"}},at=function(c,a,i){var u=String(c);return!u||u.length>=a?c:""+Array(a+1-u.length).join(i)+c},Nt={s:at,z:function(c){var a=-c.utcOffset(),i=Math.abs(a),u=Math.floor(i/60),s=i%60;return(a<=0?"+":"-")+at(u,2,"0")+":"+at(s,2,"0")},m:function c(a,i){if(a.date()<i.date())return-c(i,a);var u=12*(i.year()-a.year())+(i.month()-a.month()),s=a.clone().add(u,S),d=i-s<0,f=a.clone().add(u+(d?-1:1),S);return+(-(u+(i-s)/(d?s-f:f-s))||0)},a:function(c){return c<0?Math.ceil(c)||0:Math.floor(c)},p:function(c){return{M:S,y:P,w:I,d:v,D:N,h,m:l,s:m,ms:o,Q:M}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(c){return c===void 0}},K="en",A={};A[K]=Mt;var ct="$isDayjsObject",rt=function(c){return c instanceof q||!(!c||!c[ct])},Z=function c(a,i,u){var s;if(!a)return K;if(typeof a=="string"){var d=a.toLowerCase();A[d]&&(s=d),i&&(A[d]=i,s=d);var f=a.split("-");if(!s&&f.length>1)return c(f[0])}else{var E=a.name;A[E]=a,s=E}return!u&&s&&(K=s),s||!u&&K},_=function(c,a){if(rt(c))return c.clone();var i=typeof a=="object"?a:{};return i.date=c,i.args=arguments,new q(i)},p=Nt;p.l=Z,p.i=rt,p.w=function(c,a){return _(c,{locale:a.$L,utc:a.$u,x:a.$x,$offset:a.$offset})};var q=function(){function c(i){this.$L=Z(i.locale,null,!0),this.parse(i),this.$x=this.$x||i.x||{},this[ct]=!0}var a=c.prototype;return a.parse=function(i){this.$d=function(u){var s=u.date,d=u.utc;if(s===null)return new Date(NaN);if(p.u(s))return new Date;if(s instanceof Date)return new Date(s);if(typeof s=="string"&&!/Z$/i.test(s)){var f=s.match(W);if(f){var E=f[2]-1||0,b=(f[7]||"0").substring(0,3);return d?new Date(Date.UTC(f[1],E,f[3]||1,f[4]||0,f[5]||0,f[6]||0,b)):new Date(f[1],E,f[3]||1,f[4]||0,f[5]||0,f[6]||0,b)}}return new Date(s)}(i),this.init()},a.init=function(){var i=this.$d;this.$y=i.getFullYear(),this.$M=i.getMonth(),this.$D=i.getDate(),this.$W=i.getDay(),this.$H=i.getHours(),this.$m=i.getMinutes(),this.$s=i.getSeconds(),this.$ms=i.getMilliseconds()},a.$utils=function(){return p},a.isValid=function(){return this.$d.toString()!==G},a.isSame=function(i,u){var s=_(i);return this.startOf(u)<=s&&s<=this.endOf(u)},a.isAfter=function(i,u){return _(i)<this.startOf(u)},a.isBefore=function(i,u){return this.endOf(u)<_(i)},a.$g=function(i,u,s){return p.u(i)?this[u]:this.set(s,i)},a.unix=function(){return Math.floor(this.valueOf()/1e3)},a.valueOf=function(){return this.$d.getTime()},a.startOf=function(i,u){var s=this,d=!!p.u(u)||u,f=p.p(i),E=function(L,y){var w=p.w(s.$u?Date.UTC(s.$y,y,L):new Date(s.$y,y,L),s);return d?w:w.endOf(v)},b=function(L,y){return p.w(s.toDate()[L].apply(s.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(y)),s)},O=this.$W,D=this.$M,C=this.$D,H="set"+(this.$u?"UTC":"");switch(f){case P:return d?E(1,0):E(31,11);case S:return d?E(1,D):E(0,D+1);case I:var B=this.$locale().weekStart||0,Y=(O<B?O+7:O)-B;return E(d?C-Y:C+(6-Y),D);case v:case N:return b(H+"Hours",0);case h:return b(H+"Minutes",1);case l:return b(H+"Seconds",2);case m:return b(H+"Milliseconds",3);default:return this.clone()}},a.endOf=function(i){return this.startOf(i,!1)},a.$set=function(i,u){var s,d=p.p(i),f="set"+(this.$u?"UTC":""),E=(s={},s[v]=f+"Date",s[N]=f+"Date",s[S]=f+"Month",s[P]=f+"FullYear",s[h]=f+"Hours",s[l]=f+"Minutes",s[m]=f+"Seconds",s[o]=f+"Milliseconds",s)[d],b=d===v?this.$D+(u-this.$W):u;if(d===S||d===P){var O=this.clone().set(N,1);O.$d[E](b),O.init(),this.$d=O.set(N,Math.min(this.$D,O.daysInMonth())).$d}else E&&this.$d[E](b);return this.init(),this},a.set=function(i,u){return this.clone().$set(i,u)},a.get=function(i){return this[p.p(i)]()},a.add=function(i,u){var s,d=this;i=Number(i);var f=p.p(u),E=function(D){var C=_(d);return p.w(C.date(C.date()+Math.round(D*i)),d)};if(f===S)return this.set(S,this.$M+i);if(f===P)return this.set(P,this.$y+i);if(f===v)return E(1);if(f===I)return E(7);var b=(s={},s[l]=r,s[h]=g,s[m]=n,s)[f]||1,O=this.$d.getTime()+i*b;return p.w(O,this)},a.subtract=function(i,u){return this.add(-1*i,u)},a.format=function(i){var u=this,s=this.$locale();if(!this.isValid())return s.invalidDate||G;var d=i||"YYYY-MM-DDTHH:mm:ssZ",f=p.z(this),E=this.$H,b=this.$m,O=this.$M,D=s.weekdays,C=s.months,H=s.meridiem,B=function(y,w,R,J){return y&&(y[w]||y(u,d))||R[w].slice(0,J)},Y=function(y){return p.s(E%12||12,y,"0")},L=H||function(y,w,R){var J=y<12?"AM":"PM";return R?J.toLowerCase():J};return d.replace(V,function(y,w){return w||function(R){switch(R){case"YY":return String(u.$y).slice(-2);case"YYYY":return p.s(u.$y,4,"0");case"M":return O+1;case"MM":return p.s(O+1,2,"0");case"MMM":return B(s.monthsShort,O,C,3);case"MMMM":return B(C,O);case"D":return u.$D;case"DD":return p.s(u.$D,2,"0");case"d":return String(u.$W);case"dd":return B(s.weekdaysMin,u.$W,D,2);case"ddd":return B(s.weekdaysShort,u.$W,D,3);case"dddd":return D[u.$W];case"H":return String(E);case"HH":return p.s(E,2,"0");case"h":return Y(1);case"hh":return Y(2);case"a":return L(E,b,!0);case"A":return L(E,b,!1);case"m":return String(b);case"mm":return p.s(b,2,"0");case"s":return String(u.$s);case"ss":return p.s(u.$s,2,"0");case"SSS":return p.s(u.$ms,3,"0");case"Z":return f}return null}(y)||f.replace(":","")})},a.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},a.diff=function(i,u,s){var d,f=this,E=p.p(u),b=_(i),O=(b.utcOffset()-this.utcOffset())*r,D=this-b,C=function(){return p.m(f,b)};switch(E){case P:d=C()/12;break;case S:d=C();break;case M:d=C()/3;break;case I:d=(D-O)/6048e5;break;case v:d=(D-O)/864e5;break;case h:d=D/g;break;case l:d=D/r;break;case m:d=D/n;break;default:d=D}return s?d:p.a(d)},a.daysInMonth=function(){return this.endOf(S).$D},a.$locale=function(){return A[this.$L]},a.locale=function(i,u){if(!i)return this.$L;var s=this.clone(),d=Z(i,u,!0);return d&&(s.$L=d),s},a.clone=function(){return p.w(this.$d,this)},a.toDate=function(){return new Date(this.valueOf())},a.toJSON=function(){return this.isValid()?this.toISOString():null},a.toISOString=function(){return this.$d.toISOString()},a.toString=function(){return this.$d.toUTCString()},c}(),ht=q.prototype;return _.prototype=ht,[["$ms",o],["$s",m],["$m",l],["$H",h],["$W",v],["$M",S],["$y",P],["$D",N]].forEach(function(c){ht[c[1]]=function(a){return this.$g(a,c[0],c[1])}}),_.extend=function(c,a){return c.$i||(c(a,q,_),c.$i=!0),_},_.locale=Z,_.isDayjs=rt,_.unix=function(c){return _(1e3*c)},_.en=A[K],_.Ls=A,_.p={},_})})(Ct);var be=Ct.exports;const _e=xt(be),Oe=6378137;function X(t){return t*Math.PI/180}function Pt([t,e],[n,r]){const g=X(e),o=X(r),m=g-o,l=X(t),h=X(n),v=l-h;return 2*Math.asin(Math.sqrt(Math.pow(Math.sin(m/2),2)+Math.cos(g)*Math.cos(o)*Math.pow(Math.sin(v/2),2)))*Oe}function Et(t,e=30,n=void 0){if(t.length<=1)return!1;let r=t;if(n){const l=t[t.length-1][0]-n;r=t.filter(h=>h[0]>=l)}if(r.length<=1)return!1;let g=0,o=0;for(const l of r)g+=l[1],o+=l[2];g/=r.length,o/=r.length;let m=0;for(const l of r)m+=Pt([l[1],l[2]],[g,o]);return m/=r.length,m>e}var $;(function(t){t.NOT_READY="NOT_READY",t.POSITIONING="POSITIONING",t.CHECKING="CHECKING",t.POSITION_FAILED="POSITION_FAILED",t.LONG_TIME_NOT_UPDATE="LONG_TIME_NOT_UPDATE",t.OK="OK"})($||($={}));class De extends EventTarget{constructor({startupTime:e=2e4,positionUpdateInterval:n=2e4,positionStableTimes:r=2,altitudeChangeThreshold:g=20,distanceChangeThreshold:o=200,checkInterval:m=500,pathSaveTime:l=3e4,moveThreshold:h=-1}={}){super(),this.initTime=-1,this.status=$.NOT_READY,this.lastTimerTime=null,this.lastPositionTime=null,this.lastLongitude=null,this.lastLatitude=null,this.lastAltitude=null,this.path=[],this.stableStartTime=null,this.stableTimes=0,this.startupTime=e,this.positionUpdateInterval=n,this.positionStableTimes=r,this.altitudeChangeThreshold=g,this.distanceChangeThreshold=o,this.pathSaveTime=l,this.checkInterval=m,this.moveThreshold=h<=0?null:h}init(){if(this.initTime>0)throw new Error("已经初始化过了");this.changeStatus($.POSITIONING),this.initTime=Date.now(),navigator.geolocation.watchPosition(e=>this.onPositionSuccess(e),e=>this.onPositionError(e),{enableHighAccuracy:!0,timeout:1e4}),navigator.geolocation.getCurrentPosition(e=>this.onPositionSuccess(e),e=>this.onPositionError(e),{enableHighAccuracy:!0,timeout:1e4}),setInterval(()=>this.onTimer(),this.checkInterval)}onPositionSuccess(e){this.dispatchEvent(new CustomEvent("position",{detail:{result:e}}));const{coords:n}=e;if(n.longitude==this.lastLongitude&&n.latitude==this.lastLatitude)return;this.dispatchEvent(new CustomEvent("positionChange",{detail:{result:e}})),(this.status==$.POSITIONING||this.status==$.POSITION_FAILED||this.status==$.LONG_TIME_NOT_UPDATE)&&this.changeStatus($.CHECKING);const r=this.lastPositionTime?e.timestamp-this.lastPositionTime:null;n.altitude&&this.lastAltitude&&r&&Math.abs(this.lastAltitude-n.altitude)/r*1e3>this.altitudeChangeThreshold&&this.changeStatus($.CHECKING),this.lastPositionTime&&r&&Pt([this.lastLongitude,this.lastLatitude],[n.longitude,n.latitude])/r*1e3>this.distanceChangeThreshold&&this.changeStatus($.CHECKING),r&&r<this.positionUpdateInterval&&(this.stableTimes==1&&(this.stableStartTime=e.timestamp),this.stableTimes+=1,this.status==$.CHECKING&&this.stableTimes>=this.positionStableTimes&&this.changeStatus($.OK)),this.lastPositionTime=e.timestamp,this.lastLongitude=n.longitude,this.lastLatitude=n.latitude,this.lastAltitude=n.altitude,this.path.push([e.timestamp,n.longitude,n.latitude]);const g=e.timestamp-this.pathSaveTime;this.path=this.path.filter(o=>o[0]>=g),this.moveThreshold&&Et(this.path,this.moveThreshold)&&this.changeStatus($.CHECKING),this.dispatchEvent(new CustomEvent("positionChangeEnd",{detail:{result:e}}))}onPositionError(e){this.dispatchEvent(new CustomEvent("positionError",{detail:{err:e}})),!(this.status==$.POSITIONING&&Date.now()-this.initTime<=this.startupTime)&&this.changeStatus($.POSITION_FAILED)}onTimer(){if(this.status==$.POSITIONING&&Date.now()-this.initTime>this.startupTime){this.changeStatus($.POSITION_FAILED);return}const e=Date.now();if(this.lastTimerTime&&e-this.lastTimerTime>this.checkInterval*3&&this.changeStatus($.CHECKING),this.lastTimerTime=e,(this.status==$.OK||this.status==$.CHECKING)&&Date.now()-this.lastPositionTime>this.positionUpdateInterval){this.changeStatus($.LONG_TIME_NOT_UPDATE);return}}changeStatus(e){switch(e){case $.CHECKING:case $.POSITION_FAILED:case $.LONG_TIME_NOT_UPDATE:this.stableStartTime=null,this.stableTimes=0;break}const n=this.status;this.status=e,this.dispatchEvent(new CustomEvent("statusChange",{detail:{oldStatus:n,newStatus:e}}))}check(){const e=this.lastPositionTime,n=this.path.filter(()=>!0),r=this.status==$.OK;return{status:this.status,longitude:this.lastLongitude,latitude:this.lastLatitude,altitude:this.lastAltitude,time:e,stableTime:this.lastPositionTime&&this.stableStartTime?this.lastPositionTime-this.stableStartTime:0,stableCount:this.stableTimes,path:n,pathMoved:(g=20,o=void 0)=>Et(n,g,o),isOk:()=>r}}isOk(){return this.status==$.OK}forgeCheckIfOk(){this.isOk()&&this.changeStatus($.CHECKING)}}let U;function tt(t){return U||(U=new De,U.init(),U)}const Ie={class:"p-4 min-h-full bg-slate-50 space-y-4"},ye=it("div",{class:"text-center text-2xl"},"Anti-FakeGPS",-1),Ce=it("span",{class:"ml-1"},"秒",-1),Pe=it("span",{class:"ml-1"},"次",-1),Me=it("span",{class:"ml-1"},"个",-1),Ne=Gt('<fieldset class="border rounded-md px-4 py-2"><legend>说明</legend><div class="text-sm leading-6"><p>1. 只依赖网页能访问到的数据，判定是否存在模拟定位</p><p>2. 适用巡逻打卡拍照等场景，可防市面上绝大部分模拟定位软件</p><p>3. 仅支持有物理 GPS 硬件的设备（通常是移动端）</p><p><span>4. 更多细节，请参阅</span><a class="text-sky-500" href="https://blog.cat73.org#TODO" target="_blank">博客文章</a><span>了解更多</span></p><p><span>5. </span><a class="text-sky-500" href="https://github.com/Cat7373/Anti-FakeGPS" target="_blank">Github Repo</a></p></div></fieldset>',1),Be={__name:"MainPage",setup(t){const e={NOT_READY:"等待初始化",POSITIONING:"正在定位",CHECKING:"正在检测",POSITION_FAILED:"定位失败",LONG_TIME_NOT_UPDATE:"检测到模拟定位",OK:"通过检测"},n=Tt({}),r=async g=>{const o=tt().check();o.pathMoved=o.pathMoved(),o.pathLength=o.path.length,n.value=o,console.log(`${g}: ${o.time}: ${o.longitude}, ${o.latitude}, ${o.altitude} => ${o.status}`)};return tt().addEventListener("statusChange",()=>r("statusChange")),tt().addEventListener("positionChangeEnd",()=>r("positionChange")),tt().addEventListener("positionError",()=>r("positionError")),r("init"),(g,o)=>{const m=pe,l=Se;return Ft(),kt("div",Ie,[ye,T(l,{inset:""},{default:Q(()=>[T(m,{title:"状态",value:n.value.status,label:e[n.value.status],"title-style":"flex: 0 1 auto;"},null,8,["value","label"]),T(m,{title:"经度",value:n.value.longitude},null,8,["value"]),T(m,{title:"纬度",value:n.value.latitude},null,8,["value"]),T(m,{title:"海拔",value:n.value.altitude},null,8,["value"]),T(m,{title:"定位时间",value:Ht(_e)(n.value.time).format("HH:mm:ss.SSS")},null,8,["value"]),T(m,{title:"已稳定",value:n.value.stableTime/1e3},{"right-icon":Q(()=>[Ce]),_:1},8,["value"]),T(m,{title:"已稳定",value:n.value.stableCount},{"right-icon":Q(()=>[Pe]),_:1},8,["value"]),T(m,{title:"轨迹点",value:n.value.pathLength},{"right-icon":Q(()=>[Me]),_:1},8,["value"]),T(m,{title:"轨迹移动",value:String(n.value.pathMoved)},null,8,["value"])]),_:1}),Ne])}}};export{Be as default};