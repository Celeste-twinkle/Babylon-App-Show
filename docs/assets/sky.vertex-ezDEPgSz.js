import{J as e,b7 as t,av as n,aC as a,b9 as d}from"./thinEngine-BHwOTIeJ.js";import{f as l,a as c}from"./fogVertex-BKEUoOKv.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const o="skyVertexShader",r=`precision highp float;attribute vec3 position;
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
`;e.ShadersStore[o]||(e.ShadersStore[o]=r);const f=[t,n,l,a,d,c];for(const i of f)e.IncludesShadersStore[i.name]||(e.IncludesShadersStore[i.name]=i.shader);const E={name:o,shader:r};export{E as skyVertexShader};
