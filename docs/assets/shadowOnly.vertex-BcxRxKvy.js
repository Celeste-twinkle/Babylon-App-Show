import{v as e,ah as o,ai as t,am as r,aY as l,al as s,a$ as c,ap as d,aq as f,ar as m,as as V,b1 as x}from"./thinEngine-C6TEorKP.js";import{s as h}from"./sceneVertexDeclaration-Y65bMv4t.js";import{f as u,a as S}from"./fogVertex-B_8mntLI.js";import{l as p,a as v}from"./lightUboDeclaration-DEsGxupe.js";import{s as D}from"./shadowsVertex-CncdgkCJ.js";import"./index-gcnlu8d0.js";import"./publicPath-DFnRRUbl.js";const a="shadowOnlyVertexShader",n=`precision highp float;attribute vec3 position;
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
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying float vViewDepth;
#endif
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
`;e.ShadersStore[a]||(e.ShadersStore[a]=n);const g=[o,t,r,h,l,s,c,u,p,v,d,f,m,V,x,S,D];for(const i of g)e.IncludesShadersStore[i.name]||(e.IncludesShadersStore[i.name]=i.shader);const O={name:a,shader:n};export{O as shadowOnlyVertexShader};
