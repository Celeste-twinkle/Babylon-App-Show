import{O as e,bn as o,b5 as t,W as l,af as r,b8 as s,ag as c,bm as m}from"./index-YATPwAeJ.js";import{l as g,a as d}from"./lightUboDeclaration-BPeeUZcX.js";import{l as f}from"./lightsFragmentFunctions-D0Fal6O5.js";import{s as h}from"./ltcHelperFunctions-DBP3Xu27.js";import{f as F,a as u}from"./fogFragment-Bt1Z-Iu3.js";import{l as p}from"./lightFragment-D3jIHxh1.js";import{i as v}from"./imageProcessingCompatibility-CfqnQRh2.js";const n="shadowOnlyPixelShader",i=`precision highp float;
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
}`;e.ShadersStore[n]||(e.ShadersStore[n]=i);const _=[o,t,l,g,d,f,h,r,s,F,c,p,m,u,v];for(const a of _)e.IncludesShadersStore[a.name]||(e.IncludesShadersStore[a.name]=a.shader);const w={name:n,shader:i};export{w as shadowOnlyPixelShader};
