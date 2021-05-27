(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{26:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var i=n(0),r=n.n(i),c=n(9),a=n.n(c),o=(n(26),n(1));var l,d,s,u=function(){return Object(o.jsxs)("header",{children:[Object(o.jsx)("h1",{children:"Rounds"}),Object(o.jsx)("hr",{})]})},b=n(3),f=n(20),j=n(21),g=n(4),p=n(2),h=n(5),x=Object(h.b)({name:"grid",initialState:{selectedCells:[],recentlySelected:[],deselectMode:!1,modalVisible:!1,modalOffset:[0,0]},reducers:{updateSelectedCells:function(t,e){t.selectedCells=e.payload;var n=e.payload.sort((function(t,e){return e.left-t.left}));n.length&&(t.modalOffset=[n[0].top,n[0].left])},updateRecentlySelected:function(t,e){t.recentlySelected=e.payload},toggleDeselectMode:function(t,e){t.deselectMode=e.payload},toggleModal:function(t,e){t.modalVisible=e.payload},updateModalOffset:function(t,e){t.modalOffset=e.payload}}}),m=x.actions,O=m.updateSelectedCells,v=(m.updateRecentlySelected,m.toggleDeselectMode),y=m.toggleModal,w=(m.updateModalOffset,x.reducer),S=n(7),M=Object(h.b)({name:"units",initialState:[{id:1,name:"Unit 01",location:1,data:{2200:"S"}},{id:2,name:"Unit 02",location:2,data:{}}],reducers:{updateLocation:function(t,e){t.find((function(t){return t.id===e.payload.id})).location=e.payload.location},updateData:function(t,e){t.find((function(t){return t.id===e.payload.id})).data=Object(S.a)(Object(S.a)({},t.data),e.payload)}}}),k=M.actions,N=(k.setShift,k.setArea,M.reducer);var z=g.a.div(l||(l=Object(b.a)(["\n\tdisplay: ",";\n\twidth: max-content;\n\tposition: absolute;\n\tbox-sizing: border-box;\n\t","\n\n\t.close {\n\t\ttext-align: center;\n\t\tfont-size: 1.2rem;\n\t\tbackground-color: #777777;\n\t\tborder-radius: 10px 10px 0 0;\n\t\tcolor: white;\n\t\tpadding: 10px 10px 0 10px;\n\t\twidth: min-content;\n\t\theight: min-content;\n\t\tborder: 0;\n\t\tcursor: pointer;\n\t}\n"])),(function(t){return t.modalVisible?"block":"none"}),(function(t){var e=t.modalVisible,n=t.modalOffset;return e&&"top: ".concat(n[0],"px;\n\t\tleft: ").concat(n[1],"px;")})),C=g.a.div(d||(d=Object(b.a)(["\n\tbackground-color: #777777;\n\tborder-radius: 0 10px 10px 10px;\n\tcolor: white;\n\tpadding: 15px;\n\n\t.modal-body {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 35px 35px;\n\t\tgrid-auto-rows: 35px;\n\t}\n"]))),D=g.a.button(s||(s=Object(b.a)(["\n\tfont-size: 16px;\n\tfont-weight: bold;\n\tbackground-color: #282828;\n\tborder: 0.5px solid black;\n\theight: 100%;\n\twidth: 100%;\n\ttext-align: center;\n\toutline: none;\n\tbox-sizing: border-box;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-radius: 5px;\n\tcolor: ",";\n"])),(function(t){return function(t){switch(t.value){case"S":return"lightskyblue";case"A":return"yellow";case"R":return"lightgreen";case"SN":case"ST":case"SW":return"rgb(0, 230, 230)";case"NM":return"white";case"GT":return"beige";case"B":case"ES":return"white";case"D":return"red";case"M":return"lightgray";case"I":return"rgb(173, 230, 61)";case"V":case"H":case"AW":case"DT":default:return"white"}}(t)}));var T,L,V=function(){var t=Object(p.c)((function(t){return t.grid.modalVisible})),e=Object(p.c)((function(t){return t.grid.modalOffset})),n=(Object(p.c)((function(t){return t.grid.selectedCells})),Object(p.b)());return Object(o.jsxs)(z,{modalVisible:t,modalOffset:e,children:[Object(o.jsx)("button",{className:"close",onClick:function(){n(y(!1)),n(O([]))},children:"X"}),Object(o.jsxs)(C,{modalVisible:t,modalOffset:e,children:[Object(o.jsx)("div",{className:"modal-info"}),Object(o.jsxs)("div",{className:"modal-body",children:[Object(o.jsx)(D,{value:"S",children:"S"}),Object(o.jsx)(D,{value:"A",children:"A"}),Object(o.jsx)(D,{value:"R",children:"R"}),Object(o.jsx)(D,{value:"B",children:"B"}),Object(o.jsx)(D,{value:"SN",children:"SN"}),Object(o.jsx)(D,{value:"ST",children:"ST"}),Object(o.jsx)(D,{value:"GT",children:"GT"}),Object(o.jsx)(D,{value:"NM",children:"NM"}),Object(o.jsx)(D,{value:"SW",children:"SW"}),Object(o.jsx)(D,{value:"D",children:"D"}),Object(o.jsx)(D,{value:"M",children:"M"}),Object(o.jsx)(D,{value:"I",children:"I"})]})]})]})},E=n(13),A=n.n(E),R=n(19),B=n.n(R);A.a.extend(B.a);var F=g.a.div(T||(T=Object(b.a)(["\n\tbackground-color: lightgray;\n\tborder: 0.5px solid black;\n\twriting-mode: vertical-lr;\n\ttext-align: center;\n\tfont-size: 1.5em;\n\theight: 100%;\n\tbox-sizing: border-box;\n"]))),H=g.a.section(L||(L=Object(b.a)(["\n\tdisplay: grid;\n\tgrid-column-start: 3;\n\tgrid-column-end: -1;\n\tgrid-row-start: 1;\n\tgrid-row-end: -1;\n\toverflow: scroll;\n\tborder: none;\n\tjustify-content: left;\n\tposition: relative;\n\t","\n\tgrid-template-rows: 100px repeat(10, 35px);\n\n\t.grid-item {\n\t\ttext-align: center;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tbackground-color: #282828;\n\t\tborder: 0.5px solid black;\n\t\tbox-sizing: border-box;\n\t\tcursor: pointer;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tborder-radius: 5px;\n\t}\n\n\t.grid-item:hover {\n\t\tborder: white 2px dotted;\n\t}\n\n\t.selected {\n\t\tborder: yellow 2px dashed;\n\t}\n"])),(function(t){var e=t.checks;return"grid-template-columns: repeat(".concat(e,", 35px);")}));var I=function(){for(var t=Object(p.c)((function(t){return t.config.shiftStart})),e=Object(p.c)((function(t){return t.config.shiftEnd})),n=Object(p.c)((function(t){return t.units})),r=Object(p.c)((function(t){return t.modalVisible})),c=Object(p.c)((function(t){return t.grid.deselectMode})),a=Object(p.c)((function(t){return t.grid.selectedCells})),l=Object(p.b)(),d=[],s=Object(i.useState)([]),u=Object(j.a)(s,2),b=u[0],g=u[1],h=0;d.push(A()(t,"HHmm").add(15*h,"minute").format("HHmm")),d[d.length-1]!==e;)h++;function x(t){if(t.preventDefault(),1===t.buttons&&t.target.classList.contains("grid-item")){console.log(t.target),r&&(window.clearTimeout(r),b.forEach((function(t){return t.classList.remove("selected")})),g([]));var e=t.target.dataset,n=e.unitName,i=e.timestamp,o=a.find((function(t){return t.unitName===n&&t.timestamp===i}));if(o&&c)l(O(a.splice(a.indexOf([n,i]),1)));else if(!o&&!c){var d=t.target.getBoundingClientRect(),s=window.innerWidth-d.right<350?t.target.offsetLeft-165:t.target.offsetLeft+65,u=t.target.offsetTop-50;l(O([].concat(Object(f.a)(a),[{unitName:n,timestamp:i,left:s,top:u}])))}}}return Object(o.jsxs)(H,{checks:d.length,onMouseDown:function(t){t.preventDefault(),t.target.classList.contains("selected")&&l(v(!0)),x(t)},onMouseOver:x,onMouseUp:function(){r||(l(v(!1)),l(y(!0)),a.length||l(y(!1)))},children:[d.map((function(t){return Object(o.jsx)(F,{children:t},t)})),Object(o.jsx)(V,{}),n.map((function(t){for(var e=t.name,n=t.data,i=[],r=function(t){var r=e.replace(" ","");i.push(Object(o.jsx)("div",{className:"grid-item ".concat(n[d[t]]," ").concat(a.find((function(e){return e.unitName===r&&e.timestamp===d[t]}))&&"selected"),"data-unit-name":r,"data-timestamp":d[t],children:null===n||void 0===n?void 0:n[d[t]]},"".concat(r,"-").concat(d[t])))},c=0;c<d.length;c++)r(c);return i}))]})};var W,G,U=function(){return Object(p.c)((function(t){return t.units})).map((function(t){return Object(o.jsxs)(r.a.Fragment,{children:[Object(o.jsx)("div",{children:t.name},t.name),Object(o.jsx)("div",{children:t.location},t.location)]},t.name)}))},J=g.a.div(W||(W=Object(b.a)(["\n\tdisplay: grid;\n\twidth: 100%;\n\tgrid-template-columns: 200px 35px 1fr;\n\tgrid-template-rows: 100px repeat(10, 35px);\n\tbackground-color: #282828;\n\toverflow: scroll;\n\n\t& > div {\n\t\tborder: 0.5px solid white;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tbox-sizing: border-box;\n\t}\n"]))),P=g.a.div(G||(G=Object(b.a)(["\n\tborder: 0.5px solid white;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbox-sizing: border-box;\n\tfont-size: 2.5rem;\n\t","\n"])),(function(t){return t.location&&"writing-mode: vertical-lr;\n        font-size: 1.3em;"}));var X=function(){return Object(o.jsxs)(J,{children:[Object(o.jsx)(P,{children:"Name"}),Object(o.jsx)(P,{location:!0,children:"Location"}),Object(o.jsx)(I,{}),Object(o.jsx)(U,{})]})},q=Object(h.b)({name:"config",initialState:{shiftStart:"2200",shiftEnd:"0700",area:null},reducers:{setShift:function(t,e){t.shiftStart=e.payload.shiftStart||t.shiftStart,t.shiftEnd=e.payload.shiftEnd||t.shiftEnd},setArea:function(t,e){t.area=e.payload}}}),K=q.actions,Q=(K.setShift,K.setArea,q.reducer),Y=Object(h.a)({reducer:{config:Q,grid:w,units:N}});var Z=function(){return Object(o.jsxs)(p.a,{store:Y,children:[Object(o.jsx)(u,{}),Object(o.jsx)("main",{children:Object(o.jsx)(X,{})})]})},$=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,37)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,c=e.getLCP,a=e.getTTFB;n(t),i(t),r(t),c(t),a(t)}))};a.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(Z,{})}),document.getElementById("root")),$()}},[[36,1,2]]]);
//# sourceMappingURL=main.e5de817a.chunk.js.map