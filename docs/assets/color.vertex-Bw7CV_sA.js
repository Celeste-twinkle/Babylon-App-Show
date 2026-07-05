import{v as e,ah as r,ai as a,al as t,am as d,ap as c,aq as l,ar as s,as as f}from"./thinEngine-C6TEorKP.js";import{f as V,a as m}from"./fogVertex-B_8mntLI.js";import{v as x}from"./vertexColorMixing-CVbTO3J3.js";import"./index-gcnlu8d0.js";import"./publicPath-DFnRRUbl.js";const o="colorVertexShader",n=`attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#ifdef FOG
uniform mat4 view;
#endif
#include<instancesDeclaration>
uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#ifdef VERTEXCOLOR
vec4 colorUpdated=color;
#endif
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}
#else
gl_Position=viewProjection*worldPos;
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`;e.ShadersStore[o]||(e.ShadersStore[o]=n);const u=[r,a,t,V,d,c,l,s,f,m,x];for(const i of u)e.IncludesShadersStore[i.name]||(e.IncludesShadersStore[i.name]=i.shader);const p={name:o,shader:n};export{p as colorVertexShader};
