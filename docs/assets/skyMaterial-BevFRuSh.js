import{S as u,av as y,V as d,Q as m,aw as S,ax as T,ay as O,az as v,aA as R,aB as _,aC as D,ap as A,aD as I,z as L,al as g,aE as M,aF as a,aG as s,aH as p,h as x}from"./index-BxIDpZYW.js";import"./fogFragment-CNhnzQhB.js";import"./imageProcessingCompatibility-8hq8jtt8.js";import"./fogVertex-CnBvbT2r.js";const E="skyPixelShader",F=`precision highp float;varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneFragmentDeclaration>
uniform vec3 cameraPosition;uniform vec3 cameraOffset;uniform vec3 up;uniform float luminance;uniform float turbidity;uniform float rayleigh;uniform float mieCoefficient;uniform float mieDirectionalG;uniform vec3 sunPosition;
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
const float e=2.71828182845904523536028747135266249775724709369995957;const float pi=3.141592653589793238462643383279502884197169;const float n=1.0003;const float N=2.545E25;const float pn=0.035;const vec3 lambda=vec3(680E-9,550E-9,450E-9);const vec3 K=vec3(0.686,0.678,0.666);const float v=4.0;const float rayleighZenithLength=8.4E3;const float mieZenithLength=1.25E3;const float EE=1000.0;const float sunAngularDiameterCos=0.999956676946448443553574619906976478926848692873900859324;const float cutoffAngle=pi/1.95;const float steepness=1.5;vec3 totalRayleigh(vec3 lambda)
{return (8.0*pow(pi,3.0)*pow(pow(n,2.0)-1.0,2.0)*(6.0+3.0*pn))/(3.0*N*pow(lambda,vec3(4.0))*(6.0-7.0*pn));}
vec3 simplifiedRayleigh()
{return 0.0005/vec3(94,40,18);}
float rayleighPhase(float cosTheta)
{ 
return (3.0/(16.0*pi))*(1.0+pow(cosTheta,2.0));}
vec3 totalMie(vec3 lambda,vec3 K,float T)
{float c=(0.2*T )*10E-18;return 0.434*c*pi*pow((2.0*pi)/lambda,vec3(v-2.0))*K;}
float hgPhase(float cosTheta,float g)
{return (1.0/(4.0*pi))*((1.0-pow(g,2.0))/pow(1.0-2.0*g*cosTheta+pow(g,2.0),1.5));}
float sunIntensity(float zenithAngleCos)
{return EE*max(0.0,1.0-exp((-(cutoffAngle-acos(zenithAngleCos))/steepness)));}
float A=0.15;float B=0.50;float C=0.10;float D=0.20;float EEE=0.02;float F=0.30;float W=1000.0;vec3 Uncharted2Tonemap(vec3 x)
{return ((x*(A*x+C*B)+D*EEE)/(x*(A*x+B)+D*F))-EEE/F;}
#if DITHER
#include<helperFunctions>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
/**
*--------------------------------------------------------------------------------------------------
* Sky Color
*--------------------------------------------------------------------------------------------------
*/
float sunfade=1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);float rayleighCoefficient=rayleigh-(1.0*(1.0-sunfade));vec3 sunDirection=normalize(sunPosition);float sunE=sunIntensity(dot(sunDirection,up));vec3 betaR=simplifiedRayleigh()*rayleighCoefficient;vec3 betaM=totalMie(lambda,K,turbidity)*mieCoefficient;float zenithAngle=acos(max(0.0,dot(up,normalize(vPositionW-cameraPosition+cameraOffset))));float sR=rayleighZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));float sM=mieZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));vec3 Fex=exp(-(betaR*sR+betaM*sM));float cosTheta=dot(normalize(vPositionW-cameraPosition),sunDirection);float rPhase=rayleighPhase(cosTheta*0.5+0.5);vec3 betaRTheta=betaR*rPhase;float mPhase=hgPhase(cosTheta,mieDirectionalG);vec3 betaMTheta=betaM*mPhase;vec3 Lin=pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*(1.0-Fex),vec3(1.5));Lin*=mix(vec3(1.0),pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up,sunDirection),5.0),0.0,1.0));vec3 direction=normalize(vPositionW-cameraPosition);float theta=acos(direction.y);float phi=atan(direction.z,direction.x);vec2 uv=vec2(phi,theta)/vec2(2.0*pi,pi)+vec2(0.5,0.0);vec3 L0=vec3(0.1)*Fex;float sundisk=smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);L0+=(sunE*19000.0*Fex)*sundisk;vec3 whiteScale=1.0/Uncharted2Tonemap(vec3(W));vec3 texColor=(Lin+L0);texColor*=0.04 ;texColor+=vec3(0.0,0.001,0.0025)*0.3;float g_fMaxLuminance=1.0;float fLumScaled=0.1/luminance; 
float fLumCompressed=(fLumScaled*(1.0+(fLumScaled/(g_fMaxLuminance*g_fMaxLuminance))))/(1.0+fLumScaled); 
float ExposureBias=fLumCompressed;vec3 curr=Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);vec3 retColor=curr*whiteScale;/**
*--------------------------------------------------------------------------------------------------
* Sky Color
*--------------------------------------------------------------------------------------------------
*/
float alpha=1.0;
#ifdef VERTEXCOLOR
retColor.rgb*=vColor.rgb;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#if DITHER
retColor.rgb+=dither(gl_FragCoord.xy,0.5);
#endif
vec4 color=clamp(vec4(retColor.rgb,alpha),0.0,1.0);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;u.ShadersStore[E]||(u.ShadersStore[E]=F);const P="skyVertexShader",b=`precision highp float;attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
uniform mat4 world;uniform mat4 view;uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<logDepthDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
gl_Position=viewProjection*world*vec4(position,1.0);vec4 worldPos=world*vec4(position,1.0);vPositionW=vec3(worldPos);
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#ifdef VERTEXCOLOR
vColor=color;
#endif
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;u.ShadersStore[P]||(u.ShadersStore[P]=b);class w extends M{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.DITHER=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class i extends y{constructor(o,t){super(o,t),this.luminance=1,this.turbidity=10,this.rayleigh=2,this.mieCoefficient=.005,this.mieDirectionalG=.8,this.distance=500,this.inclination=.49,this.azimuth=.25,this.sunPosition=new d(0,100,0),this.useSunPosition=!1,this.cameraOffset=d.Zero(),this.up=d.Up(),this.dithering=!1,this._cameraPosition=d.Zero(),this._skyOrientation=new m}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(o,t){const n=t._drawWrapper;if(this.isFrozen&&n.effect&&n._wasPreviouslyReady)return!0;t.materialDefines||(t.materialDefines=new w);const e=t.materialDefines,r=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(S(o,r,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,!1,e,void 0,void 0,void 0,this._isVertexOutputInvariant),T(o,e,!0,!1),e.IMAGEPROCESSINGPOSTPROCESS!==r.imageProcessingConfiguration.applyByPostProcess&&e.markAsMiscDirty(),e.DITHER!==this.dithering&&e.markAsMiscDirty(),e.isDirty){e.markAsProcessed(),r.resetCachedMaterial();const l=new O;e.FOG&&l.addFallback(1,"FOG"),e.IMAGEPROCESSINGPOSTPROCESS=r.imageProcessingConfiguration.applyByPostProcess,e.DITHER=this.dithering;const f=[v.PositionKind];e.VERTEXCOLOR&&f.push(v.ColorKind);const c="sky",h=["world","viewProjection","view","vFogInfos","vFogColor","logarithmicDepthConstant","pointSize","luminance","turbidity","rayleigh","mieCoefficient","mieDirectionalG","sunPosition","cameraPosition","cameraOffset","up"];R(h);const C=e.toString();t.setEffect(r.getEngine().createEffect(c,f,h,[],C,l,this.onCompiled,this.onError),e,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(e._renderId=r.getRenderId(),n._wasPreviouslyReady=!0,!0)}bindForSubMesh(o,t,n){const e=this.getScene(),r=n.materialDefines;if(!r)return;const l=n.effect;if(!l)return;this._activeEffect=l,this.bindOnlyWorldMatrix(o),this._activeEffect.setMatrix("viewProjection",e.getTransformMatrix()),this._mustRebind(e,l,n)&&(_(l,this,e),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&D(r,l,e)),e.fogEnabled&&t.applyFog&&e.fogMode!==A.FOGMODE_NONE&&this._activeEffect.setMatrix("view",e.getViewMatrix()),I(e,t,this._activeEffect);const f=e.activeCamera;if(f){const c=f.getWorldMatrix();this._cameraPosition.x=c.m[12],this._cameraPosition.y=c.m[13],this._cameraPosition.z=c.m[14],this._activeEffect.setVector3("cameraPosition",L.Vector3[0].copyFrom(this._cameraPosition).subtractInPlace(e.floatingOriginOffset))}if(this._activeEffect.setVector3("cameraOffset",this.cameraOffset),this._activeEffect.setVector3("up",this.up),this.luminance>0&&this._activeEffect.setFloat("luminance",this.luminance),this._activeEffect.setFloat("turbidity",this.turbidity),this._activeEffect.setFloat("rayleigh",this.rayleigh),this._activeEffect.setFloat("mieCoefficient",this.mieCoefficient),this._activeEffect.setFloat("mieDirectionalG",this.mieDirectionalG),!this.useSunPosition){const c=Math.PI*(this.inclination-.5),h=2*Math.PI*(this.azimuth-.5);this.sunPosition.x=this.distance*Math.cos(h)*Math.cos(c),this.sunPosition.y=this.distance*Math.sin(-c),this.sunPosition.z=this.distance*Math.sin(h)*Math.cos(c),m.FromUnitVectorsToRef(d.UpReadOnly,this.up,this._skyOrientation),this.sunPosition.rotateByQuaternionToRef(this._skyOrientation,this.sunPosition)}this._activeEffect.setVector3("sunPosition",this.sunPosition),this._afterBind(t,this._activeEffect,n)}getAnimatables(){return[]}dispose(o){super.dispose(o)}clone(o){return g.Clone(()=>new i(o,this.getScene()),this)}serialize(){const o=super.serialize();return o.customType="BABYLON.SkyMaterial",o}getClassName(){return"SkyMaterial"}static Parse(o,t,n){return g.Parse(()=>new i(o.name,t),o,t,n)}}a([s()],i.prototype,"luminance",void 0);a([s()],i.prototype,"turbidity",void 0);a([s()],i.prototype,"rayleigh",void 0);a([s()],i.prototype,"mieCoefficient",void 0);a([s()],i.prototype,"mieDirectionalG",void 0);a([s()],i.prototype,"distance",void 0);a([s()],i.prototype,"inclination",void 0);a([s()],i.prototype,"azimuth",void 0);a([p()],i.prototype,"sunPosition",void 0);a([s()],i.prototype,"useSunPosition",void 0);a([p()],i.prototype,"cameraOffset",void 0);a([p()],i.prototype,"up",void 0);a([s()],i.prototype,"dithering",void 0);x("BABYLON.SkyMaterial",i);export{i as SkyMaterial};
