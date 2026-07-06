import{v as e,W as r,O as i,af as t,a5 as l,ag as s,aU as c,aT as f}from"./thinEngine-B6AJuPpk.js";import{l as m,s as g}from"./clusteredLightingFunctions-otV62G7z.js";import{l as d}from"./lightsFragmentFunctions-Wd2CI8Va.js";import{f as u}from"./fogFragmentDeclaration-CwCan84O.js";import{l as S}from"./lightFragment-yNaNUvE1.js";import"./index-bTSCevfz.js";import"./publicPath-DFnRRUbl.js";const n="shadowOnlyPixelShader",o=`#include<sceneUboDeclaration>
uniform alpha: f32;uniform shadowColor: vec3f;varying vPositionW: vec3f;
#ifdef NORMAL
varying vNormalW: vec3f;
#endif
#include<helperFunctions>
#include<lightUboDeclaration>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying vViewDepth: f32;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
var viewDirectionW: vec3f=normalize(scene.vEyePosition.xyz-fragmentInputs.vPositionW);
#ifdef NORMAL
var normalW: vec3f=normalize(fragmentInputs.vNormalW);
#else
var normalW: vec3f= vec3f(1.0,1.0,1.0);
#endif
var diffuseBase: vec3f= vec3f(0.,0.,0.);var info: lightingInfo;var shadow: f32=1.;var glossiness: f32=0.;var aggShadow: f32=0.;var numLights: f32=0.;
#include<lightFragment>[0..1]
var color: vec4f= vec4f(uniforms.shadowColor,(1.0-clamp(shadow,0.,1.))*uniforms.alpha);
#include<logDepthFragment>
#include<fogFragment>
fragmentOutputs.color=color;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;e.ShadersStoreWGSL[n]||(e.ShadersStoreWGSL[n]=o);const h=[r,i,m,d,g,t,l,u,s,S,c,f];for(const a of h)e.IncludesShadersStoreWGSL[a.name]||(e.IncludesShadersStoreWGSL[a.name]=a.shader);const I={name:n,shader:o};export{I as shadowOnlyPixelShaderWGSL};
