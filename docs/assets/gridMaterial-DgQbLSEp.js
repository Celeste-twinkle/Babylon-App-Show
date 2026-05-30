import{S as d,av as P,d as u,V as x,H as I,aI as h,aw as T,aJ as _,ax as C,az as c,aK as E,aA as S,aB as N,aC as O,aD as L,al as m,aE as R,aF as a,aL as v,aG as l,aH as M,aM as V,aN as U,h as b}from"./index-B-DAChdi.js";import"./fogFragment-DEaIb0tt.js";import"./imageProcessingCompatibility-MhS5pBrr.js";import"./sceneVertexDeclaration-B39zVUjF.js";import"./fogVertex-5a_0xYcB.js";const y="gridPixelShader",F=`#extension GL_OES_standard_derivatives : enable
#define SQRT2 1.41421356
#define PI 3.14159
precision highp float;uniform float visibility;uniform vec3 mainColor;uniform vec3 lineColor;uniform vec4 gridControl;uniform vec3 gridOffset;varying vec3 vPosition;varying vec3 vNormal;
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#ifdef OPACITY
varying vec2 vOpacityUV;uniform sampler2D opacitySampler;uniform vec2 vOpacityInfos;
#endif
float getDynamicVisibility(float position) {float majorGridFrequency=gridControl.y;if (floor(position+0.5)==floor(position/majorGridFrequency+0.5)*majorGridFrequency)
{return 1.0;}
return gridControl.z;}
float getAnisotropicAttenuation(float differentialLength) {const float maxNumberOfLines=10.0;return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);}
float isPointOnLine(float position,float differentialLength) {float fractionPartOfPosition=position-floor(position+0.5); 
fractionPartOfPosition/=differentialLength; 
#ifdef ANTIALIAS
fractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);float result=0.5+0.5*cos(fractionPartOfPosition*PI); 
return result;
#else
return abs(fractionPartOfPosition)<SQRT2/4. ? 1. : 0.;
#endif
}
float contributionOnAxis(float position) {float differentialLength=length(vec2(dFdx(position),dFdy(position)));differentialLength*=SQRT2; 
float result=isPointOnLine(position,differentialLength);float dynamicVisibility=getDynamicVisibility(position);result*=dynamicVisibility;float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);result*=anisotropicAttenuation;return result;}
float normalImpactOnAxis(float x) {float normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);return normalImpact;}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
float gridRatio=gridControl.x;vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;float x=contributionOnAxis(gridPos.x);float y=contributionOnAxis(gridPos.y);float z=contributionOnAxis(gridPos.z);vec3 normal=normalize(vNormal);x*=normalImpactOnAxis(normal.x);y*=normalImpactOnAxis(normal.y);z*=normalImpactOnAxis(normal.z);
#ifdef MAX_LINE
float grid=clamp(max(max(x,y),z),0.,1.);
#else
float grid=clamp(x+y+z,0.,1.);
#endif
vec3 color=mix(mainColor,lineColor,grid);
#ifdef FOG
#include<fogFragment>
#endif
float opacity=1.0;
#ifdef TRANSPARENT
opacity=clamp(grid,0.08,gridControl.w*grid);
#endif
#ifdef OPACITY
opacity*=texture2D(opacitySampler,vOpacityUV).a;
#endif
gl_FragColor=vec4(color.rgb,opacity*visibility);
#ifdef TRANSPARENT
#ifdef PREMULTIPLYALPHA
gl_FragColor.rgb*=opacity;
#endif
#else
#endif
#include<logDepthFragment>
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;d.ShadersStore[y]||(d.ShadersStore[y]=F);const g="gridVertexShader",D=`precision highp float;attribute vec3 position;attribute vec3 normal;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#include<instancesDeclaration>
#include<__decl__sceneVertex>
varying vec3 vPosition;varying vec3 vNormal;
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#ifdef OPACITY
varying vec2 vOpacityUV;uniform mat4 opacityMatrix;uniform vec2 vOpacityInfos;
#endif
#include<clipPlaneVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
#include<fogVertex>
vec4 cameraSpacePosition=view*worldPos;gl_Position=projection*cameraSpacePosition;
#ifdef OPACITY
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
if (vOpacityInfos.x==0.)
{vOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));}
else
{vOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));}
#endif 
#include<clipPlaneVertex>
#include<logDepthVertex>
vPosition=position;vNormal=normal;
#define CUSTOM_VERTEX_MAIN_END
}`;d.ShadersStore[g]||(d.ShadersStore[g]=D);class G extends R{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.OPACITY=!1,this.ANTIALIAS=!1,this.TRANSPARENT=!1,this.FOG=!1,this.PREMULTIPLYALPHA=!1,this.MAX_LINE=!1,this.UV1=!1,this.UV2=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class r extends P{constructor(e,t){super(e,t),this.mainColor=u.Black(),this.lineColor=u.Teal(),this.gridRatio=1,this.gridOffset=x.Zero(),this.majorUnitFrequency=10,this.minorUnitVisibility=.33,this.opacity=1,this.antialias=!0,this.preMultiplyAlpha=!1,this.useMaxLine=!1,this._gridControl=new I(this.gridRatio,this.majorUnitFrequency,this.minorUnitVisibility,this.opacity)}needAlphaBlending(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()}needAlphaBlendingForMesh(e){return e.visibility<1||this.needAlphaBlending()}isReadyForSubMesh(e,t,n){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===n)return!0;t.materialDefines||(t.materialDefines=new G);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(i.TRANSPARENT!==this.opacity<1&&(i.TRANSPARENT=!i.TRANSPARENT,i.markAsUnprocessed()),i.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(i.PREMULTIPLYALPHA=!i.PREMULTIPLYALPHA,i.markAsUnprocessed()),i.MAX_LINE!==this.useMaxLine&&(i.MAX_LINE=!i.MAX_LINE,i.markAsUnprocessed()),i.ANTIALIAS!==this.antialias&&(i.ANTIALIAS=!i.ANTIALIAS,i.markAsUnprocessed()),i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._opacityTexture&&h.OpacityTextureEnabled))if(this._opacityTexture.isReady())i._needUVs=!0,i.OPACITY=!0;else return!1;if(T(e,o,this._useLogarithmicDepth,!1,this.fogEnabled,!1,i,void 0,void 0,void 0,this._isVertexOutputInvariant),_(o,o.getEngine(),this,i,!!n),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial(),C(e,i,!1,!1);const f=[c.PositionKind,c.NormalKind];i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess,E(f,i);const p=["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos","visibility","logarithmicDepthConstant"],A=i.toString();S(p),t.setEffect(o.getEngine().createEffect("grid",{attributes:f,uniformsNames:p,uniformBuffersNames:["Scene"],samplers:["opacitySampler"],defines:A,fallbacks:null,onCompiled:this.onCompiled,onError:this.onError},o.getEngine()),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!n,!0)}bindForSubMesh(e,t,n){const s=this.getScene(),i=n.materialDefines;if(!i)return;const o=n.effect;o&&(this._activeEffect=o,this._activeEffect.setFloat("visibility",t.visibility),(!i.INSTANCES||i.THIN_INSTANCE)&&this.bindOnlyWorldMatrix(e),this.bindView(o),this.bindViewProjection(o),this._mustRebind(s,o,n)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&h.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix())),N(o,this,s),this._useLogarithmicDepth&&O(i,o,s)),L(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,n))}dispose(e){super.dispose(e)}clone(e){return m.Clone(()=>new r(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GridMaterial",e}getClassName(){return"GridMaterial"}static Parse(e,t,n){return m.Parse(()=>new r(e.name,t),e,t,n)}}a([v()],r.prototype,"mainColor",void 0);a([v()],r.prototype,"lineColor",void 0);a([l()],r.prototype,"gridRatio",void 0);a([M()],r.prototype,"gridOffset",void 0);a([l()],r.prototype,"majorUnitFrequency",void 0);a([l()],r.prototype,"minorUnitVisibility",void 0);a([l()],r.prototype,"opacity",void 0);a([l()],r.prototype,"antialias",void 0);a([l()],r.prototype,"preMultiplyAlpha",void 0);a([l()],r.prototype,"useMaxLine",void 0);a([V("opacityTexture")],r.prototype,"_opacityTexture",void 0);a([U("_markAllSubMeshesAsTexturesDirty")],r.prototype,"opacityTexture",void 0);b("BABYLON.GridMaterial",r);export{r as GridMaterial};
