import{v as e,b9 as o,aY as t,Q as r,at as l,a$ as s,au as c,b8 as m}from"./thinEngine-B6AJuPpk.js";import{l as g,a as d}from"./lightUboDeclaration-B5xay1DY.js";import{l as f}from"./lightsFragmentFunctions-CWH4jYPG.js";import{s as h}from"./ltcHelperFunctions-D2zN7sKf.js";import{f as F,a as p}from"./fogFragment-D2GwtUoF.js";import{l as u}from"./lightFragment-D69Z8rEK.js";import{i as v}from"./imageProcessingCompatibility-CKDqoGMJ.js";import"./index-bTSCevfz.js";import"./publicPath-DFnRRUbl.js";const i="shadowOnlyPixelShader",n=`precision highp float;
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
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying float vViewDepth;
#endif
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
}`;e.ShadersStore[i]||(e.ShadersStore[i]=n);const _=[o,t,r,g,d,f,h,l,s,F,c,u,m,p,v];for(const a of _)e.IncludesShadersStore[a.name]||(e.IncludesShadersStore[a.name]=a.shader);const A={name:i,shader:n};export{A as shadowOnlyPixelShader};
