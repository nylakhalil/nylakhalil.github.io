(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t){},120:function(e,t,a){},122:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(24),r=a.n(l),i=(a(76),a(77),a(78),a(66)),s=a(20),c=a(69),m=a(15);m.a.initialize("UA-140687992-1");const h=(e,t={})=>{return a=>(Object(n.useEffect)(()=>(e=>{m.a.set(Object(c.a)({page:e},t)),m.a.pageview(e)})(a.location.pathname),[a.location.pathname]),o.a.createElement(e,a))};var p=a(28),d=a.n(p),u=a(36),g=a.n(u);class E extends n.Component{render(){return o.a.createElement("header",{id:"header"},o.a.createElement(g.a,{collapseOnSelect:!0,expand:"lg"},o.a.createElement(g.a.Toggle,null),o.a.createElement(g.a.Collapse,{className:"justify-content-end"},o.a.createElement(d.a,null,o.a.createElement(d.a.Link,{eventKey:1,href:"/#"},"About"),o.a.createElement(d.a.Link,{eventKey:2,href:"/#/develop"},"Develop"),o.a.createElement(d.a.Link,{eventKey:3,href:"/#/photography"},"Photography")))))}}var f=a(25),k=a(37);class y extends n.Component{constructor(e){super(e),this.handleClick=this.handleClick.bind(this)}handleClick(e){m.a.event({category:"Site Footer",action:"Selected Social Icon: "+e,label:"Navigation"})}render(){return o.a.createElement("footer",{id:"footer",className:"d-flex justify-content-between pl-4 pr-4 pt-2"},o.a.createElement("ul",{className:"list-unstyled list-inline mb-1"},o.a.createElement("li",{className:"list-inline-item footer-icons"},o.a.createElement("a",{href:"https://500px.com/nyla",title:"500px Profile",onClick:()=>this.handleClick("500px")},o.a.createElement(f.a,{icon:k.a,color:"Black"}))),o.a.createElement("li",{className:"list-inline-item footer-icons",title:"LinkedIn Profile",onClick:()=>this.handleClick("LinkedIn")},o.a.createElement("a",{href:"https://www.linkedin.com/in/nylakhalil/"},o.a.createElement(f.a,{icon:k.c,color:"Black"}))),o.a.createElement("li",{className:"list-inline-item footer-icons",title:"GitHub Profile",onClick:()=>this.handleClick("GitHub")},o.a.createElement("a",{href:"https://github.com/nylakhalil"},o.a.createElement(f.a,{icon:k.b,color:"Black"})))),o.a.createElement("p",{className:"small"},"Copyright \xa9 Nyla Khalil ",(new Date).getFullYear()))}}var w=a(125),v=a(127),b=a(126),C=a(128),N=a(129),x=a(7),L=a.n(x);class S extends n.Component{getContent(e,t,a,n,l,r,i){const s=JSON.stringify([e,t]);return o.a.createElement("div",{className:"text-center text-muted"},o.a.createElement("p",null,"Your location resolved to ",o.a.createElement("span",{className:"font-italic"},a,", ",n,", ",l),". The geographic coordinates for this location are ",o.a.createElement("span",{className:"font-italic"},s),". The IP Address is ",o.a.createElement("span",{className:"font-italic"},r)," and ",o.a.createElement("span",{className:"font-italic"},i)," is the provider. This information was provided by "," ",o.a.createElement("a",{href:"https://ipapi.co/json",target:"_blank",rel:"noopener noreferrer"},o.a.createElement("cite",{title:"Data Provider"},"https://ipapi.co/json")),"."))}render(){const e=this.props,t=e.lat,a=e.lon,n=e.city,o=e.region,l=e.country,r=e.ip,i=e.isp;return this.getContent(t,a,n,o,l,r,i)}}S.defaultProps={lat:0,lon:0,city:"Unknown",region:"Unknown",country:"Unknown",ip:"Unknown",isp:"Unknown"};a(105);var j=a(62),M=a(11),I=a(1),D=a.n(I);class T extends j.a{createWeatherHTML(){return"<span>"+this.props.temperature+" "+this.props.forecast+" "+this.props.wind+"</span>"}createLeafletElement(){return new(L.a.Control.extend({onAdd:e=>(this.div=L.a.DomUtil.create("div","weather"),this.div.innerHTML=this.createWeatherHTML(),this.div)}))({position:this.props.position})}componentDidMount(){const e=this.props.leaflet.map;this.leafletElement.addTo(e)}}T.propTypes={forecast:D.a.string,temperature:D.a.string,wind:D.a.string,position:D.a.string},T.defaultProps={forecast:"",temperature:"",wind:"",position:"bottomleft"};var B=Object(M.b)(T);class O extends o.a.Component{constructor(e){super(e),this.state={data:{zoom:14,center:[38.889931,-77.009003],baselayers:[],markers:[]},latlng:null,popupMsg:"",weather:null,location:{latitude:null,longitude:null,city:null,region:null,country_name:null,ip:null,org:null}},this.handleClick=this.handleClick.bind(this)}parseLocation(e){if(e&&(this.setState({location:e}),e.latitude&&e.longitude)){let t="https://api.weather.gov/points/LATITUDE,LONGITUDE/forecast/hourly";t=(t=t.replace("LATITUDE",e.latitude)).replace("LONGITUDE",e.longitude),fetch(t).then(e=>e.json()).then(e=>this.parseWeather(e)).catch(e=>console.error("Weather Data Error: ",e))}}parseWeather(e){if(e&&e.properties&&e.properties.periods.length>0){let t=e.properties.periods[0];this.setState({weather:{forecast:t.shortForecast,temperature:t.temperature+t.temperatureUnit,wind:t.windSpeed+" "+t.windDirection}})}}componentWillMount(){fetch("/json/map.json").then(e=>e.json()).then(e=>this.setState({data:e})).catch(e=>console.error("Map Config Error: ",e)),fetch("https://ipapi.co/json").then(e=>e.json()).then(e=>this.parseLocation(e)).catch(e=>console.error("Location Data Error: ",e))}getBaselayers(e){if(e)return o.a.createElement(w.a.BaseLayer,{checked:"true"===e.on,key:e.id,name:e.name},o.a.createElement(v.a,{attribution:e.attribution,url:e.url}))}getMarkerIcon(e,t){let a='<i class="fa fa-NAME fa-lg" style="color: COLOR;" />';return a=(a=a.replace(/COLOR/g,t)).replace(/NAME/g,e),L.a.divIcon({className:"div-icon",html:a,iconAnchor:[0,0],iconSize:null,popupAnchor:[0,0]})}getMarkers(e){if(e){let t=this.getMarkerIcon(e.icon,e.color);return o.a.createElement(b.a,{key:e.id,position:e.position,icon:t},o.a.createElement(C.a,null,e.text))}}handleClick(e){const t=this.parseLatLng(e.latlng);this.setState({latlng:e.latlng,popupMsg:t}),m.a.event({category:"Map Page",action:"Selected Marker Location",label:"Interaction"})}parseLatLng(e){if(!e)return"Marker Location Error";return"Lat Lon: "+e.lat.toFixed(5)+", "+e.lng.toFixed(5)}render(){let e=null;this.state.location.latitude&&this.state.location.longitude&&(e=[this.state.location.latitude,this.state.location.longitude]);const t=e||this.state.data.center;return o.a.createElement(N.a,{center:t,zoom:this.state.data.zoom,onClick:this.handleClick},o.a.createElement(w.a,{position:"topright"},this.state.data.baselayers.map(e=>this.getBaselayers(e))),this.state.data.markers.map(e=>this.getMarkers(e)),this.state.latlng&&o.a.createElement(b.a,{position:this.state.latlng,icon:this.getMarkerIcon("map-marker","limegreen"),draggable:!0},o.a.createElement(C.a,null,this.state.popupMsg)),e&&o.a.createElement(b.a,{position:e,icon:this.getMarkerIcon("location-arrow","tomato"),draggable:!1},o.a.createElement(C.a,null,o.a.createElement(S,{lat:this.state.location.latitude,lon:this.state.location.longitude,city:this.state.location.city,region:this.state.location.region,country:this.state.location.country_name,ip:this.state.location.ip,isp:this.state.location.org}))),this.state.weather&&o.a.createElement(B,{forecast:this.state.weather.forecast,temperature:this.state.weather.temperature,wind:this.state.weather.wind}))}}class P extends n.Component{render(){const e=this.props,t=e.name,a=e.description;return o.a.createElement("div",{id:"about",className:"flex-grow-1 p-5"},o.a.createElement("div",{className:"jumbotron-fluid"},o.a.createElement("h1",{className:"display-5"},t),o.a.createElement("p",{className:"lead"},a)),o.a.createElement(O,null))}}P.defaultProps={name:"Nyla Khalil",description:"Full Stack Software Engineer"};var A=a(38),U=a.n(A),W=a(27),G=a.n(W),z=a(68),F=a(29);class H extends n.Component{constructor(e){super(e),this.state={icons:[{name:"design",color:"SeaGreen",icon:F.c},{name:"develop",color:"Black",icon:F.a},{name:"test",color:"Black",icon:F.d},{name:"deploy",color:"Black",icon:F.b}],content:{},title:"",options:{colors:["#B5BABE"],enableTooltip:!1,fontFamily:"impact",fontSizes:[5,40],fontStyle:"normal",fontWeight:"normal",padding:10,rotations:1,rotationAngles:[0,90],scale:"sqrt",spiral:"archimedean",transitionDuration:1e3}},this.handleClick=this.handleClick.bind(this)}componentDidMount(){fetch("/json/words.json").then(e=>e.json()).then(e=>this.setState({content:e})).catch(e=>console.error("Error: ",e))}handleClick(e){this.setState({title:e}),this.state.icons.forEach(function(t){t.name===e?t.color="SeaGreen":t.color="Black"}),m.a.event({category:"Develop Page",action:"Selected Icon: "+e,label:"Navigation"})}getIconCol(e){return o.a.createElement(G.a,{className:"text-center",key:e.name},o.a.createElement("span",{className:"cursor-pointer icon-circle",onClick:()=>this.handleClick(e.name),title:e.name},o.a.createElement(f.a,{icon:e.icon,color:e.color})),o.a.createElement("p",{className:"h4 p-1 text-capitalize"},e.name))}getWorldCloud(e,t){return e&&0!==Object.keys(e).length?o.a.createElement(z.a,{options:t,words:e}):null}getDescription(e){return o.a.createElement("blockquote",{className:"mr-5 blockquote pl-5 pt-4"},o.a.createElement("p",{className:"text-muted"},e.content),o.a.createElement("footer",{className:"blockquote-footer text-center"},o.a.createElement("small",{className:"text-muted mr-5"},o.a.createElement("a",{href:e.link},o.a.createElement("cite",{title:"Source Link"},e.source)))))}render(){if(!this.state.content||0===Object.keys(this.state.content).length)return null;const e=this.state.title||"design";return o.a.createElement("div",{className:"d-block p-5"},o.a.createElement(U.a,{className:"p-3 d-flex justify-content-between",noGutters:!0},this.state.icons.map(e=>this.getIconCol(e))),o.a.createElement(U.a,{className:"align-self-start",noGutters:!0},o.a.createElement(G.a,{className:"bg-light"},this.getWorldCloud(this.state.content[e].words,this.state.options)),o.a.createElement(G.a,{className:"d-none d-lg-block"})),o.a.createElement(U.a,{className:"align-self-end",noGutters:!0},o.a.createElement(G.a,{className:"d-none d-lg-block"}),o.a.createElement(G.a,{className:"bg-light"},this.getDescription(this.state.content[e]))),o.a.createElement("p",null))}}var K=a(39),q=a.n(K);class J extends n.Component{constructor(e){super(e),this.state={images:[],interval:null},this.handleClick=this.handleClick.bind(this)}componentDidMount(){fetch("/json/photos.json").then(e=>e.json()).then(e=>this.setState({images:e})).catch(e=>console.error("Error: ",e))}handleClick(e){m.a.event({category:"Photography Page",action:"Selected Image: "+e,label:"Navigation"})}getCarousel(e,t){return o.a.createElement("div",{id:"photo-view"},o.a.createElement(q.a,{interval:t,indicators:!0,controls:!1,slide:!1,fade:!0},e.map(e=>o.a.createElement(q.a.Item,{key:e.key},o.a.createElement("img",{className:"img-fluid",src:e.url,alt:e.title}),o.a.createElement(q.a.Caption,{onClick:()=>this.handleClick(e.title)},o.a.createElement("a",{href:e.link,className:"text-light"},o.a.createElement("small",null,e.title)))))))}render(){const e=this.state,t=e.images,a=e.interval;return t&&t.length>0?this.getCarousel(t,a):null}}a(120);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(function(){return o.a.createElement("div",{id:"app"},o.a.createElement(E,null),o.a.createElement("main",{id:"main",className:"flex-grow-1"},o.a.createElement(i.a,{basename:""},o.a.createElement(s.a,{exact:!0,path:"/",component:h(P)}),o.a.createElement(s.a,{path:"/develop",component:h(H)}),o.a.createElement(s.a,{path:"/photography",component:h(J)}))),o.a.createElement(y,null))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},71:function(e,t,a){e.exports=a(122)},78:function(e,t,a){}},[[71,1,2]]]);