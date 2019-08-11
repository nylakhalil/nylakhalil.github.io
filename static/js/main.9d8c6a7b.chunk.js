(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t){},120:function(e,t,n){},122:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(28),o=n.n(c),l=n(50),i=(n(77),n(78),n(24)),s=n(15),u=n(16),m=n(18),h=n(17),d=n(19),f=n(32),p=n.n(f),E=n(41),v=n.n(E),b=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(v.a,{collapseOnSelect:!0,expand:"lg",bg:"light"},r.a.createElement(v.a.Toggle,null),r.a.createElement(v.a.Collapse,{className:"justify-content-end"},r.a.createElement(p.a,null,r.a.createElement(p.a.Link,{eventKey:1,href:"/"},"About"),r.a.createElement(p.a.Link,{eventKey:2,href:"/code"},"Develop"),r.a.createElement(p.a.Link,{eventKey:3,href:"/photography"},"Photograpy"))))}}]),t}(a.Component),y=n(31),j=n.n(y),k=n(35),g=n.n(k),O=n(30),w=n(53),N=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("footer",{className:"fixed-bottom"},r.a.createElement(j.a,{className:"justify-content-md-center"},r.a.createElement(g.a,null,r.a.createElement("ul",{className:"list-unstyled list-inline mb-1"},r.a.createElement("li",{className:"list-inline-item"},r.a.createElement("a",{href:"https://github.com/nylakhalil"},r.a.createElement(O.a,{icon:w.a,color:"black"}))),r.a.createElement("li",{className:"list-inline-item"},r.a.createElement("a",{href:"https://www.linkedin.com/in/nylakhalil/"},r.a.createElement(O.a,{icon:w.b,color:"black"})))))),r.a.createElement(j.a,{className:"justify-content-center"},r.a.createElement("p",{className:"text-center small"},"Copyright \xa9 Nyla Khalil ",(new Date).getFullYear())))}}]),t}(a.Component),C=n(127),x=n(128),S=n(126),L=n(129),M=n(130),I=n(7),z=n.n(I),B=(n(105),C.a.BaseLayer),D=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={data:{zoom:14,center:[38.889931,-77.009003],baselayers:[],markers:[]}},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/json/map.json").then(function(e){return e.json()}).then(function(t){return e.setState({data:t})}).catch(function(e){return console.error("Error: ",e)})}},{key:"getBaselayers",value:function(e){if(e)return r.a.createElement(B,{checked:"true"===e.on,key:e.id,name:e.name},r.a.createElement(x.a,{attribution:e.attribution,url:e.url}))}},{key:"getMarkerIcon",value:function(e){var t='<i class="fa fa-{}" />'.replace("{}",e);return z.a.divIcon({className:"div-icon",html:t,iconAnchor:[0,0],iconSize:null,popupAnchor:[0,0]})}},{key:"getMarkers",value:function(e){if(e){var t=this.getMarkerIcon(e.icon);return r.a.createElement(S.a,{key:e.id,position:e.position,icon:t},r.a.createElement(L.a,null,e.text))}}},{key:"render",value:function(){var e=this;return r.a.createElement(M.a,{center:this.state.data.center,zoom:this.state.data.zoom},r.a.createElement(C.a,{position:"topright"},this.state.data.baselayers.map(function(t){return e.getBaselayers(t)})),this.state.data.markers.map(function(t){return e.getMarkers(t)}))}}]),t}(r.a.Component),W=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"about",className:"p-5"},r.a.createElement("div",{className:"jumbotron-fluid"},r.a.createElement("h1",{className:"display-5"},"Nyla Khalil"),r.a.createElement("p",{className:"lead"},"Full Stack Software Engineer")),r.a.createElement(D,null))}}]),t}(a.Component),A=n(71),K=n(33),T=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={data:{title:"",content:"",icons:[{title:"design",icon:K.c},{title:"develop",icon:K.a},{title:"test",icon:K.d},{title:"deploy",icon:K.b}]},words:{},options:{colors:["PLUM","LIGHTSTEELBLUE","YELLOWGREEN","LIGHTSALMON"],enableTooltip:!1,fontFamily:"impact",fontSizes:[5,60],fontStyle:"normal",fontWeight:"normal",padding:1,rotations:3,rotationAngles:[0,90],scale:"sqrt",spiral:"archimedean",transitionDuration:1e3}},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/json/words.json").then(function(e){return e.json()}).then(function(t){return e.setState({words:t})}).catch(function(e){return console.error("Error: ",e)})}},{key:"getCol",value:function(e){return r.a.createElement(g.a,{key:e.title},r.a.createElement("a",{href:"#"+e.title,className:"icon-circle",onClick:this.setContent.bind(this,e.title)},r.a.createElement(O.a,{icon:e.icon,color:"black"})),r.a.createElement("p",{class:"h4",className:"p-1 text-capitalize"},e.title))}},{key:"getWorldCloud",value:function(e){if(void 0===e||0===Object.keys(this.state.words).length)return null;var t=this.state.words[e];return r.a.createElement("div",{className:"word-cloud"},r.a.createElement(A.a,{options:this.state.options,words:t}))}},{key:"setContent",value:function(e){this.setState({content:e})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container text-center flex-grow-1 p-5"},r.a.createElement(j.a,null,this.state.data.icons.map(function(t){return e.getCol(t)})),r.a.createElement("div",{id:"#content",className:this.state.content?"visible d-flex justify-content-center":"invisible"},this.getWorldCloud(this.state.content)))}}]),t}(a.Component),F=n(42),G=n.n(F),H=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={images:[],interval:null,error:{}},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/json/photos.json").then(function(e){return e.json()}).then(function(t){e.setState({images:t})},function(t){e.setState({error:t})}).catch(function(e){return console.error("Error: ",e)})}},{key:"getCarousel",value:function(e,t){return r.a.createElement("div",{className:"p-2"},r.a.createElement(G.a,{className:"w-100 h-100 mx-auto",interval:t,indicators:!0,controls:!1},e.map(function(e){return r.a.createElement(G.a.Item,{key:e.key},r.a.createElement("img",{className:"d-block w-50 mx-auto",src:e.url,alt:e.title}),r.a.createElement(G.a.Caption,null,r.a.createElement("small",null,e.title)))})))}},{key:"render",value:function(){var e=this.state,t=e.images,n=e.interval;return t&&t.length>0?this.getCarousel(t,n):null}}]),t}(a.Component);n(120);var J=function(){return r.a.createElement("div",{id:"app"},r.a.createElement(b,null),r.a.createElement("div",null,r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/",component:W}),r.a.createElement(i.a,{exact:!0,path:"/code",component:T}),r.a.createElement(i.a,{exact:!0,path:"/photography",component:H}))),r.a.createElement(N,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(l.a,null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},72:function(e,t,n){e.exports=n(122)},78:function(e,t,n){}},[[72,1,2]]]);
//# sourceMappingURL=main.9d8c6a7b.chunk.js.map