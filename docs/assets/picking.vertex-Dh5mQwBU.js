import{O as e,a7 as i,a8 as r,aH as o,aI as s,aa as d,aJ as c,aK as l,ab as m,ac as h,ad as x}from"./index-CkLb9iAl.js";const t="pickingVertexShader",n=`attribute vec3 position;
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
`;e.ShadersStore[t]||(e.ShadersStore[t]=n);const p=[i,r,o,s,d,c,l,m,h,x];for(const a of p)e.IncludesShadersStore[a.name]||(e.IncludesShadersStore[a.name]=a.shader);const S={name:t,shader:n};export{S as pickingVertexShader};
