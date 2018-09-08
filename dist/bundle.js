!function(e){var t={};function i(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);class r{constructor(e){this.details=e,this.typeExits=this.constructor.isRadiusOnly(this.details.type)||this.isGeometryOnly(this.details.type),this.typeExits||(this.details.type=this.constructor.randomShapeType()),this.createShape()}static randomShapeType(){const e=["Dodecahedron","Icosahedron","Octahedron","Tetrahedron","Box","Circle","Cone","Cylinder","Plane","Ring","Sphere","Torus","TorusKnot"];return e[Math.floor(Math.random()*e.length)]}static isRadiusOnly(e){return["Dodecahedron","Icosahedron","Octahedron","Tetrahedron"].includes(e)}static geometrySideLengths(e){return{Box:3,Circle:2,Cone:3,Cylinder:4,Plane:4,Ring:3,Sphere:3,Torus:4,TorusKnot:4}[e]}fillGeometry(e,t){const i=this.constructor.geometrySideLengths(this.details.type);let r=this.details.geometry.length>0?this.details.geometry:[];if(i>this.details.geometry.length){const a=i-this.details.geometry.length,n=Array(a).fill(0).map(()=>Math.floor(Math.random()*(e-t))+t);r=r.concat(n)}return r}isGeometryOnly(e){return void 0!==this.constructor.geometrySideLengths(e)}createShape(){const e={};if(this.details.materialCreator.updateFlatShape(this.details.type),e.material=this.details.materialCreator.meshMaterial,this.constructor.isRadiusOnly(this.details.type)&&(e.geometry=new THREE[`${this.details.type}BufferGeometry`](this.details.radius)),this.isGeometryOnly(this.details.type)){const t=this.constructor.geometrySideLengths(this.details.type)!==this.details.geometry.length?this.fillGeometry(this.details.size.max,this.details.size.min):this.details.geometry;e.geometry=new THREE[`${this.details.type}BufferGeometry`](...t)}void 0!==e.geometry&&(e.mesh=new THREE.Mesh(e.geometry,e.material),this.shape=e.mesh)}}class a{constructor(e,t,i){this.material=t,this.type=i,this.knownTypes=["Basic","Lambert","Normal","Phong","Physical","Standard"],e?(this.randomizeColor(),this.randomizeType()):this.hasKnownType(i)||this.randomizeType()}get meshMaterial(){return new THREE[`Mesh${this.type}Material`](this.material)}static isFlat(e){return["Plane","Circle","Ring"].includes(e)}addWireFrame(){this.material.wireframe=!0,this.material.wireframeLineWidth=5,this.material.wireframeLineJoin="round",this.material.wireframeLineCap="round"}addTransparency(){this.material.transparent=!0,this.material.opacity=.5}addEmissive(){this.material.emissive=16711680,this.material.emissiveIntensity=.2}addTexture(){void 0!==this.material.texture&&(this.material.map=(new THREE.TextureLoader).load(this.material.texture))}addNormalMap(){void 0!==this.material.normal&&(this.material.normalMap=(new THREE.TextureLoader).load(this.material.normal))}addShine(){this.material.specular=10066329,this.material.shininess=100}addMetalness(){this.material.roughness=.5,this.material.metalness=.5}hasKnownType(e){return this.knownTypes.includes(e)}updateFlatShape(e){this.constructor.isFlat(e)&&(this.material.side=THREE.DoubleSide)}randomizeColor(){this.material.color=16777215*Math.random()<<0}randomizeType(){this.type=this.knownTypes[Math.floor(Math.random()*this.knownTypes.length)]}}const n=new THREE.Scene,s=new THREE.Clock,o=window.innerWidth/window.innerHeight,l=new THREE.PerspectiveCamera(35,o,300,1e4),d=new THREE.PointLight(16777215,.5),h=new THREE.AmbientLight(16777215,.5),m=new THREE.WebGLRenderer,u={model:{type:"",geometry:[],materialCreator:new a(!0,{color:65535},"Basic"),size:{max:100,min:50},radius:100},ground:{type:"Plane",geometry:[1e4,1e4,100,100],materialCreator:new a(!1,{color:15990754},"Lambert")}},c=new r(u.model).shape,p=new r(u.ground).shape;l.position.y=160,l.position.z=400,n.add(l),d.position.set(0,300,200),n.add(d),n.add(h),m.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(m.domElement),c.position.z=-1e3,c.position.x=-100,n.add(c),p.rotation.x=-90*Math.PI/180,p.position.y=-150,console.log(function(e,t){e.updateMatrix(),e.updateMatrixWorld(),e.matrixWorldInverse.getInverse(e.matrixWorld),t.updateMatrix(),t.updateMatrixWorld();const i=new THREE.Frustum;return i.setFromMatrix((new THREE.Matrix4).multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse)),i.intersectsObject(t)}(l,c)),function e(){requestAnimationFrame(e),c.rotation.x-=.02,c.rotation.y-=s.getDelta(),c.rotation.z+=.02,m.render(n,l)}()}]);