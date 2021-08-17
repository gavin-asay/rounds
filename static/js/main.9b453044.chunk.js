(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{22:function(t,e,n){},32:function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i),r=n(9),a=n.n(r),c=(n(22),n(1));var d,l,s,u=function(){return Object(c.jsxs)("header",{children:[Object(c.jsx)("h1",{children:"Rounds"}),Object(c.jsx)("hr",{})]})},f=n(3),m=n(8),p=n(4),b=n(2),g=n(6),h=Object(g.b)({name:"grid",initialState:{selectedCells:[],recentlySelected:[],deselectMode:!1,modalVisible:!1,modalOffset:[0,0],dropdownTime:"",timeDropdownOffset:[0,0]},reducers:{updateSelectedCells:function(t,e){console.log(e.payload),t.selectedCells=e.payload;var n=e.payload.sort((function(t,e){return e.left-t.left}));n.length&&(t.modalOffset=[n[0].top,n[0].left])},shiftToRecent:function(t){t.recentlySelected=t.selectedCells,t.selectedCells=[]},updateRecentlySelected:function(t,e){t.recentlySelected=e.payload},toggleDeselectMode:function(t,e){t.deselectMode=e.payload},toggleModal:function(t,e){t.modalVisible=e.payload},updateModalOffset:function(t,e){t.modalOffset=e.payload},updateDropdownTime:function(t,e){t.dropdownTime=e.payload},updateTimeDropdownOffset:function(t,e){t.timeDropdownOffset=e.payload}}}),j=h.actions,v=j.updateSelectedCells,x=j.shiftToRecent,O=j.updateRecentlySelected,w=j.toggleDeselectMode,y=j.toggleModal,S=j.updateModalOffset,T=j.updateDropdownTime,N=j.updateTimeDropdownOffset,k=h.reducer,C=Object(g.b)({name:"units",initialState:[{id:1,name:"Unit 01",location:1,data:{2200:{value:"S",user:"gavinasay",inputTime:""}}},{id:2,name:"Unit 02",location:2,data:{}}],reducers:{updateLocation:function(t,e){t.find((function(t){return t.id===e.payload.id})).location=e.payload.location},updateData:function(t,e){Object.entries(e.payload).forEach((function(e){var n=t.find((function(t){return t.name.replace(" ","")===e[0]}));n.data=Object.assign(n.data,e[1])}))}}}),D=C.actions,H=(D.updateLocation,D.updateData),E=C.reducer,M=n(5),L=n.n(M);function R(t){switch(t.value){case"S":return"lightskyblue";case"A":return"yellow";case"R":return"lightgreen";case"SN":case"ST":case"SW":return"rgb(0, 230, 230)";case"NM":return"white";case"GT":return"beige";case"B":case"ES":return"white";case"D":return"red";case"M":return"lightgray";case"I":return"rgb(173, 230, 61)";case"V":case"H":case"AW":case"DT":default:return"white"}}var z="";var B=p.a.div(d||(d=Object(f.a)(["\n\twidth: max-content;\n\tposition: absolute;\n\tbox-sizing: border-box;\n\t","\n\n\t.close {\n\t\ttext-align: center;\n\t\tfont-size: 1.2rem;\n\t\tbackground-color: #777777;\n\t\tborder-radius: 10px 10px 0 0;\n\t\tcolor: white;\n\t\tpadding: 10px 10px 0 10px;\n\t\twidth: min-content;\n\t\theight: min-content;\n\t\tborder: 0;\n\t\tcursor: pointer;\n\t}\n"])),(function(t){var e=t.modalOffset;return"top: ".concat(e[0],"px;\n\t\tleft: ").concat(e[1],"px;")})),U=p.a.div(l||(l=Object(f.a)(["\n\tbackground-color: #777777;\n\tborder-radius: 0 10px 10px 10px;\n\tcolor: white;\n\tpadding: 15px;\n\n\t.modal-body {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 35px 35px;\n\t\tgrid-auto-rows: 35px;\n\t}\n"]))),W=p.a.button(s||(s=Object(f.a)(["\n\tfont-size: 16px;\n\tfont-weight: bold;\n\tbackground-color: #282828;\n\tborder: 0.5px solid black;\n\theight: 100%;\n\twidth: 100%;\n\ttext-align: center;\n\toutline: none;\n\tbox-sizing: border-box;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-radius: 5px;\n\tcolor: ",";\n"])),(function(t){return R(t)}));var A,$,F=function(){var t=Object(b.c)((function(t){return t.grid.modalVisible})),e=Object(b.c)((function(t){return t.grid.modalOffset})),n=Object(b.c)((function(t){return t.grid.selectedCells})),o=Object(b.c)((function(t){return t.grid.recentlySelected})),r=/^[ABDHIMORSV]{1}$|^SN$|^ST$|^SW$|^NM$|^GT$|^AW$|^ES$/,a=Object(b.b)();function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.target.textContent;if(console.log(t),window.modalHide&&window.clearTimeout(window.modalHide),e.match(r)){if(n.length){var i=n.reduce((function(t,n){return t[n.unitName]||(t[n.unitName]={}),t[n.unitName][n.timestamp]={value:e,user:"gavinasay",inputTime:L()().format("HH:mm:ss.SSS")},t}),{});a(H(i)),a(x())}else{var c=o.reduce((function(t,n){return t[n.unitName]||(t[n.unitName]={}),t[n.unitName][n.timestamp]={value:e,user:"gavinasay",inputTime:L()().format("HH:mm:ss.SSS")},t}),{});a(H(c))}window.modalHide=setTimeout((function(){a(O([])),a(y(!1)),z=""}),5e3)}}return function(t,e,n){var o=Object(i.useRef)(n);Object(i.useEffect)((function(){o.current=n}),[n]),Object(i.useEffect)((function(){function i(i){e&&(i.metaKey||i.ctrlKey||("Backspace"!==i.key&&"Delete"!==i.key||(window.clearTimeout(window.modalHide),n(i,i.key)),0===z.length&&t.test(i.key.toUpperCase())||1===z.length&&t.test(z+i.key.toUpperCase())?z+=i.key.toUpperCase():1!==z.length||t.test(z+i.key.toUpperCase())?2===z.length&&t.test(i.key.toUpperCase())&&(z="",z+=i.key.toUpperCase()):z=i.key.toUpperCase(),window.clearTimeout(window.modalHide),n(i,z)))}return document.addEventListener("keydown",i),function(){document.removeEventListener("keydown",i)}}))}(r,t,d),Object(c.jsxs)(B,{modalOffset:e,modalVisible:t,children:[Object(c.jsx)("button",{className:"close",onClick:function(){a(y(!1)),a(v([]))},children:"X"}),Object(c.jsxs)(U,{children:[Object(c.jsx)("div",{className:"modal-info"}),Object(c.jsxs)("div",{className:"modal-body",onClick:d,children:[Object(c.jsx)(W,{value:"S",children:"S"}),Object(c.jsx)(W,{value:"A",children:"A"}),Object(c.jsx)(W,{value:"R",children:"R"}),Object(c.jsx)(W,{value:"B",children:"B"}),Object(c.jsx)(W,{value:"SN",children:"SN"}),Object(c.jsx)(W,{value:"ST",children:"ST"}),Object(c.jsx)(W,{value:"GT",children:"GT"}),Object(c.jsx)(W,{value:"NM",children:"NM"}),Object(c.jsx)(W,{value:"SW",children:"SW"}),Object(c.jsx)(W,{value:"D",children:"D"}),Object(c.jsx)(W,{value:"M",children:"M"}),Object(c.jsx)(W,{value:"I",children:"I"})]})]})]})},V=n(10),I=n.n(V);L.a.extend(I.a);var G=p.a.div(A||(A=Object(f.a)(["\n\tbackground-color: #777777;\n\tborder-radius: 10px;\n\tpadding: 10px;\n\tposition: absolute;\n\twidth: max-content;\n\tleft: ",";\n"])),(function(t){return"".concat(t.timeDropdownOffset[1],"px;")})),P=p.a.button($||($=Object(f.a)(["\n\tcolor: white;\n\tlist-style-type: none;\n\tbackground-color: #777777;\n\tborder: none;\n"])));var X,J,K,Y=function(){var t=Object(b.c)((function(t){return t.units})),e=Object(b.c)((function(t){return t.grid.selectedCells})),n=Object(b.c)((function(t){return t.grid.timeDropdownOffset})),i=Object(b.c)((function(t){return t.grid.dropdownTime})),o=Object(b.b)();return Object(c.jsx)(G,{timeDropdownOffset:n,children:Object(c.jsx)(P,{onClick:function(n){window.timeDropdownHide=null,o(O([]));var r=L()(i,"HHmm").subtract(15,"minute").format("HHmm"),a=e.reduce((function(e,n){var i,o,a=t.find((function(t){return t.name.replace(" ","")===n.unitName}));return e[n.unitName]||(e[n.unitName]={}),e[n.unitName][n.timestamp]={value:null===(i=a.data)||void 0===i||null===(o=i[r])||void 0===o?void 0:o.value,user:"gavinasay",inputTime:L()().format("HH:mm:ss.SSS")},e}),{});o(H(a)),o(x()),window.timeDropdownHide=setTimeout((function(){o(T("")),o(O([]))}),5e3)},children:"Repeat last check"})})};L.a.extend(I.a);var _=p.a.div(X||(X=Object(f.a)(["\n\tbackground-color: lightgray;\n\tborder: 0.5px solid black;\n\twriting-mode: vertical-lr;\n\ttext-align: center;\n\tfont-size: 1.5rem;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\talign-items: center;\n\tflex-wrap: wrap;\n\n\tdiv {\n\t\theight: min-content;\n\t\twidth: min-content;\n\t\tmargin-top: 0.5rem;\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t\twriting-mode: initial;\n\t\ttext-align: center;\n\t\tmargin: 0 auto;\n\t\tcursor: pointer;\n\t}\n"]))),q=p.a.section(J||(J=Object(f.a)(["\n\tdisplay: grid;\n\tgrid-column-start: 3;\n\tgrid-column-end: -1;\n\tgrid-row-start: 1;\n\tgrid-row-end: -1;\n\toverflow: scroll;\n\tborder: none;\n\tjustify-content: left;\n\tposition: relative;\n\t","\n\tgrid-template-rows: 100px repeat(10, 35px);\n"])),(function(t){var e=t.checks;return"grid-template-columns: repeat(".concat(e,", 35px);")})),Q=p.a.div(K||(K=Object(f.a)(["\n\ttext-align: center;\n\theight: 100%;\n\twidth: 100%;\n\tfont-size: 16px;\n\tfont-weight: bold;\n\tbackground-color: #282828;\n\tborder: 0.5px solid black;\n\tbox-sizing: border-box;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-radius: 5px;\n\tcolor: ",";\n\n\t&:hover {\n\t\tborder: white 2px dotted;\n\t}\n\n\t&.selected {\n\t\tborder: yellow 2px dashed;\n\t}\n\n\t&.selected:hover {\n\t\tborder: rgb(245, 199, 26) 1px dashed;\n\t}\n"])),(function(t){return R(t)}));var Z=function(){for(var t=Object(b.c)((function(t){return t.config.shiftStart})),e=Object(b.c)((function(t){return t.config.shiftEnd})),n=Object(b.c)((function(t){return t.units})),o=Object(b.c)((function(t){return t.grid.modalVisible})),r=Object(b.c)((function(t){return t.grid.deselectMode})),a=Object(b.c)((function(t){return t.grid.selectedCells})),d=Object(b.c)((function(t){return t.grid.recentlySelected})),l=Object(b.c)((function(t){return t.grid.dropdownTime})),s=Object(b.b)(),u=[],f=0;u.push(L()(t,"HHmm").add(15*f,"minute").format("HHmm")),u[u.length-1]!==e;)f++;function p(t){if(t.preventDefault(),1===t.buttons&&t.target.classList.contains("grid-item")){d.length&&(window.clearTimeout(window.modalHide),s(O([])));var e=t.target.dataset,n=e.unitName,i=e.timestamp;if(a.find((function(t){return t.unitName===n&&t.timestamp===i})))s(w(!0)),s(v(a.filter((function(t){return t.timestamp!==i||t.unitName!==n}))));else{var o=t.target.getBoundingClientRect(),r=window.innerWidth-o.right<350?t.target.offsetLeft-165:t.target.offsetLeft+110,c=t.target.offsetTop-50;s(v([].concat(Object(m.a)(a),[{unitName:n,timestamp:i,left:r,top:c}]))),s(w(!1))}}}function g(t,e){var n;if(e||(e=document.elementFromPoint(t.nativeEvent.changedTouches[0].clientX,t.nativeEvent.changedTouches[0].clientY)),1===t.nativeEvent.touches.length&&(null===(n=e)||void 0===n?void 0:n.classList.contains("grid-item"))){t.preventDefault(),window.modalHide&&(window.clearTimeout(window.modalHide),s(O([])));var i=e.dataset,o=i.unitName,c=i.timestamp,d=a.find((function(t){return t.unitName===o&&t.timestamp===c}));if(d&&r)s(v(a.filter((function(t){return t.unitName!==o&&t.timestamp!==c}))));else if(!d&&!r){var l=e.getBoundingClientRect(),u=window.innerWidth-l.right<350?e.offsetLeft-165:e.offsetLeft+110,f=e.offsetTop-50;s(v([].concat(Object(m.a)(a),[{unitName:o,timestamp:c,left:u,top:f}])))}}}Object(i.useEffect)((function(){if(a.length){var t=Object(m.a)(a).sort((function(t,e){return e.left-t.left}));s(S([t[0].top,t[0].left])),s(y(!0))}a.every((function(t){return t.timestamp===a[0].timestamp}))||s(T(""))}),[a,d,s]);var h=n.map((function(t){for(var e=t.name,n=t.data,i=[],o=function(t){var o,r,l=e.replace(" ","");i.push(Object(c.jsx)(Q,{className:"grid-item ".concat((a.find((function(e){return e.unitName===l&&e.timestamp===u[t]}))||d.find((function(e){return e.unitName===l&&e.timestamp===u[t]})))&&"selected"),"data-unit-name":l,"data-timestamp":u[t],value:null===n||void 0===n||null===(o=n[u[t]])||void 0===o?void 0:o.value,children:null===n||void 0===n||null===(r=n[u[t]])||void 0===r?void 0:r.value},"".concat(l,"-").concat(u[t])))},r=0;r<u.length;r++)o(r);return i}));return Object(c.jsxs)(q,{checks:u.length,onMouseDown:function(t){t.preventDefault(),t.target.classList.contains("selected")&&s(w(!0)),p(t)},onMouseOver:p,onTouchStart:function(t){t.preventDefault();var e=document.elementFromPoint(t.nativeEvent.changedTouches[0].clientX,t.nativeEvent.changedTouches[0].clientY);!e.classList.contains("grid-item")||t.touches.length>1||(console.log(t),e.classList.contains("selected")&&s(w(!0)),g(t,e))},onTouchMove:g,onTouchEnd:function(t){o||t.target.dataset.drop||(s(w(!1)),s(y(!0)),a.length||d.length||s(y(!1)))},onClick:function(t){var e,n=null===(e=t.target.dataset)||void 0===e?void 0:e.drop;if(n){var i=t.target.parentElement.getBoundingClientRect(),o=window.innerWidth-i.right<350?t.target.parentElement.offsetLeft-165:t.target.parentElement.offsetLeft+110,r=h.flat().filter((function(t){return t.props["data-timestamp"]===n})).map((function(t,e){return{unitName:t.props["data-unit-name"],timestamp:t.props["data-timestamp"],top:Math.round(35),left:o}}));console.log(t.target.offsetLeft),s(v(Object(m.a)(r))),s(N([0,t.target.offsetLeft+29])),s(T(n))}},children:[l&&Object(c.jsx)(Y,{}),o&&Object(c.jsx)(F,{}),u.map((function(t){return Object(c.jsxs)(_,{children:[Object(c.jsx)("div",{children:t}),Object(c.jsx)("p",{className:"material-icons","data-drop":"".concat(t),children:"arrow_drop_down"})]},t)})),h]})};var tt,et,nt=function(){return Object(b.c)((function(t){return t.units})).map((function(t){return Object(c.jsxs)(o.a.Fragment,{children:[Object(c.jsx)("div",{children:t.name},t.name),Object(c.jsx)("div",{children:t.location},t.location)]},t.name)}))},it=p.a.div(tt||(tt=Object(f.a)(["\n\tdisplay: grid;\n\twidth: 100%;\n\tgrid-template-columns: 200px 35px 1fr;\n\tgrid-template-rows: 100px repeat(10, 35px);\n\tbackground-color: #282828;\n\toverflow: scroll;\n\n\t& > div {\n\t\tborder: 0.5px solid white;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tbox-sizing: border-box;\n\t}\n"]))),ot=p.a.div(et||(et=Object(f.a)(["\n\tborder: 0.5px solid white;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbox-sizing: border-box;\n\tfont-size: 2.5rem;\n\t","\n"])),(function(t){return t.location&&"writing-mode: vertical-lr;\n        font-size: 1.3em;"}));var rt=function(){return Object(c.jsxs)(it,{children:[Object(c.jsx)(ot,{children:"Name"}),Object(c.jsx)(ot,{location:!0,children:"Location"}),Object(c.jsx)(Z,{}),Object(c.jsx)(nt,{})]})},at=Object(g.b)({name:"config",initialState:{shiftStart:"2200",shiftEnd:"0700",area:null},reducers:{setShift:function(t,e){t.shiftStart=e.payload.shiftStart||t.shiftStart,t.shiftEnd=e.payload.shiftEnd||t.shiftEnd},setArea:function(t,e){t.area=e.payload}}}),ct=at.actions,dt=(ct.setShift,ct.setArea,at.reducer),lt=Object(g.a)({reducer:{config:dt,grid:k,units:E}});var st=function(){return Object(c.jsxs)(b.a,{store:lt,children:[Object(c.jsx)(u,{}),Object(c.jsx)("main",{children:Object(c.jsx)(rt,{})})]})},ut=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,33)).then((function(e){var n=e.getCLS,i=e.getFID,o=e.getFCP,r=e.getLCP,a=e.getTTFB;n(t),i(t),o(t),r(t),a(t)}))};a.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(st,{})}),document.getElementById("root")),ut()}},[[32,1,2]]]);
//# sourceMappingURL=main.9b453044.chunk.js.map