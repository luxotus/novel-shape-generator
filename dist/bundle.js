!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=new THREE.Scene,o=new THREE.Clock,i=window.innerWidth/window.innerHeight,s=new THREE.PerspectiveCamera(45,i,.1,1e4);s.position.y=160,s.position.z=400,r.add(s);const a=new THREE.PointLight(16777215);a.position.set(0,300,200),r.add(a);const d=new THREE.WebGLRenderer;d.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(d.domElement);const u=new class{constructor(e,t){this.details=e,this.shapes=void 0!==t?t:[],this.createShape()}static isRadiusOnly(e){return["Dodecahedron","Icosahedron","Octahedron","Tetrahedron"].includes(e)}static isGeometryOnly(e){return["Box","Circle","Cone","Cylinder","Plane","Ring","Sphere","Torus","TorusKnot"].includes(e)}createShape(){const e={material:new THREE.MeshLambertMaterial(this.details.material)};this.constructor.isRadiusOnly(this.details.type)&&(e.geometry=new THREE[`${this.details.type}BufferGeometry`](this.details.radius)),this.constructor.isGeometryOnly(this.details.type)&&(e.geometry=new THREE[`${this.details.type}BufferGeometry`](...this.details.geometry)),void 0!==e.geometry&&(e.mesh=new THREE.Mesh(e.geometry,e.material),this.shapes.push(e))}}({type:"Box",geometry:[100,100,100],material:{color:65535},radius:100});r.add(u.shapes[0].mesh),s.lookAt(u.shapes[0].mesh.position),function e(){requestAnimationFrame(e),u.shapes[0].mesh.rotation.x-=.01,u.shapes[0].mesh.rotation.y-=o.getDelta(),d.render(r,s)}()}]);