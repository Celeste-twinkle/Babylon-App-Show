import{S as c,r as E,a as N,u as F,t as C,$ as L,v as O,a0 as w,a1 as A,a2 as I,x as S,w as D,A as M,a3 as y,a4 as B,y as R,z as T,a5 as x,a6 as b,E as V,H as p,I as G,Z as W}from"./index-alCys-bq.js";const _="shadowOnlyPixelShader",z=`precision highp float;
#include<__decl__sceneFragment>
uniform float alpha;uniform vec3 shadowColor;varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0..1]
vec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;c.ShadersStore[_]||(c.ShadersStore[_]=z);const m="shadowOnlyVertexShader",U=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<__decl__sceneVertex>
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;c.ShadersStore[m]||(c.ShadersStore[m]=U);class k extends G{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class f extends E{constructor(e,i){super(e,i),this._needAlphaBlending=!0,this.shadowColor=N.Black()}needAlphaBlending(){return this._needAlphaBlending}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}get activeLight(){return this._activeLight}set activeLight(e){this._activeLight=e}_getFirstShadowLightForMesh(e){for(const i of e.lightSources)if(i.shadowEnabled)return i;return null}isReadyForSubMesh(e,i,s){const n=i._drawWrapper;if(this.isFrozen&&n.effect&&n._wasPreviouslyReady&&n._wasPreviouslyUsingInstances===s)return!0;i.materialDefines||(i.materialDefines=new k);const t=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(this._activeLight){for(const o of e.lightSources)if(o.shadowEnabled){if(this._activeLight===o)break;const r=e.lightSources.indexOf(this._activeLight);r!==-1&&(e.lightSources.splice(r,1),e.lightSources.splice(0,0,this._activeLight));break}}F(a,l,this,t,!!s),C(e,a,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this.needAlphaTestingForMesh(e),t,void 0,void 0,void 0,this._isVertexOutputInvariant),t._needNormals=L(a,e,t,!1,1);const d=this._getFirstShadowLightForMesh(e)?.getShadowGenerator();if(this._needAlphaBlending=!0,d&&d.getClassName&&d.getClassName()==="CascadedShadowGenerator"){const o=d;this._needAlphaBlending=!o.autoCalcDepthBounds}if(O(e,t,!1,!0),t.isDirty){t.markAsProcessed(),a.resetCachedMaterial();const o=new w;t.FOG&&o.addFallback(1,"FOG"),A(t,o,1),t.NUM_BONE_INFLUENCERS>0&&o.addCPUSkinningFallback(0,e),t.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const r=[S.PositionKind];t.NORMAL&&r.push(S.NormalKind),I(r,e,t,o),D(r,t);const P="shadowOnly",v=t.toString(),h=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","alpha","shadowColor","mBones","logarithmicDepthConstant"],g=[],u=["Scene"];M(h),y({uniformsNames:h,uniformBuffersNames:u,samplers:g,defines:t,maxSimultaneousLights:1}),i.setEffect(a.getEngine().createEffect(P,{attributes:r,uniformsNames:h,uniformBuffersNames:u,samplers:g,defines:v,fallbacks:o,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:1}},l),t,this._materialContext)}return!i.effect||!i.effect.isReady()?!1:(t._renderId=a.getRenderId(),n._wasPreviouslyReady=!0,n._wasPreviouslyUsingInstances=!!s,!0)}bindForSubMesh(e,i,s){const n=this.getScene(),t=s.materialDefines;if(!t)return;const a=s.effect;if(a){if(this._activeEffect=a,this.bindOnlyWorldMatrix(e),this.bindViewProjection(a),B(i,this._activeEffect),this._mustRebind(n,a,s)&&(R(a,this,n),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._activeEffect.setFloat("alpha",this.alpha),this._activeEffect.setColor3("shadowColor",this.shadowColor),this._useLogarithmicDepth&&T(t,a,n),n.bindEyePosition(a)),n.lightsEnabled){x(n,i,this._activeEffect,t,1);const l=this._getFirstShadowLightForMesh(i);l&&(l._renderId=-1)}(n.fogEnabled&&i.applyFog&&n.fogMode!==b.FOGMODE_NONE||t.SHADOWCSM0)&&this.bindView(a),V(n,i,this._activeEffect),this._afterBind(i,this._activeEffect,s)}}clone(e){return p.Clone(()=>new f(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.ShadowOnlyMaterial",e}getClassName(){return"ShadowOnlyMaterial"}static Parse(e,i,s){return p.Parse(()=>new f(e.name,i),e,i,s)}}W("BABYLON.ShadowOnlyMaterial",f);export{f as ShadowOnlyMaterial};
