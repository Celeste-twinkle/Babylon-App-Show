import{v as e,Z as i,$ as r,a0 as o,W as s,a2 as l,a5 as c,a9 as d,aa as f,ab as S,ad as x,ae as u}from"./thinEngine-C6TEorKP.js";import{f as m,a as L}from"./fogVertex-Dtyxkiw_.js";import{l as V}from"./lightVxFragmentDeclaration-DEhE7RKm.js";import{l as p,s as W}from"./shadowsVertex-g7Ms2qVt.js";import"./index-gcnlu8d0.js";import"./publicPath-DFnRRUbl.js";const n="shadowOnlyVertexShader",t=`attribute position: vec3f;
#ifdef NORMAL
attribute normal: vec3f;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<sceneUboDeclaration>
#ifdef POINTSIZE
uniform pointSize: f32;
#endif
varying vPositionW: vec3f;
#ifdef NORMAL
varying vNormalW: vec3f;
#endif
#ifdef VERTEXCOLOR
varying vColor: vec4f;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying vViewDepth: f32;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
var worldPos: vec4f=finalWorld* vec4f(vertexInputs.position,1.0);vertexOutputs.position=scene.viewProjection*worldPos;vertexOutputs.vPositionW= worldPos.xyz;
#ifdef NORMAL
vertexOutputs.vNormalW=normalize(( finalWorld* vec4f(vertexInputs.normal,0.0)).xyz);
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_MAIN_END
}
`;e.ShadersStoreWGSL[n]||(e.ShadersStoreWGSL[n]=t);const v=[i,r,o,s,l,c,m,V,p,d,f,S,x,u,L,W];for(const a of v)e.IncludesShadersStoreWGSL[a.name]||(e.IncludesShadersStoreWGSL[a.name]=a.shader);const T={name:n,shader:t};export{T as shadowOnlyVertexShaderWGSL};
