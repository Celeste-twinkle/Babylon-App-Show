import{J as e,ar as r,as as n,at as o,au as s,aw as d,ax as c,ay as l,az as m,aA as h,aB as p}from"./thinEngine-DydGsXfS.js";import"./index-Dsfomhyb.js";import"./publicPath-DFnRRUbl.js";const t="pickingVertexShader",i=`attribute vec3 position;
#if defined(INSTANCES)
attribute float instanceMeshID;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<instancesDeclaration>
uniform mat4 viewProjection;
#if defined(INSTANCES)
flat varying float vMeshID;
#endif
void main(void) {vec3 positionUpdated=position;
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);gl_Position=viewProjection*worldPos;
#if defined(INSTANCES)
vMeshID=instanceMeshID;
#endif
}
`;e.ShadersStore[t]||(e.ShadersStore[t]=i);const x=[r,n,o,s,d,c,l,m,h,p];for(const a of x)e.IncludesShadersStore[a.name]||(e.IncludesShadersStore[a.name]=a.shader);const V={name:t,shader:i};export{V as pickingVertexShader};
