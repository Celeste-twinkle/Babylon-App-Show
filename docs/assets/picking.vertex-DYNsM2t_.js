import{v as e,ah as n,ai as r,aj as o,ak as s,am as d,an as c,ao as l,ap as m,aq as h,ar as p}from"./thinEngine-B6AJuPpk.js";import"./index-bTSCevfz.js";import"./publicPath-DFnRRUbl.js";const t="pickingVertexShader",i=`attribute vec3 position;
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
`;e.ShadersStore[t]||(e.ShadersStore[t]=i);const x=[n,r,o,s,d,c,l,m,h,p];for(const a of x)e.IncludesShadersStore[a.name]||(e.IncludesShadersStore[a.name]=a.shader);const V={name:t,shader:i};export{V as pickingVertexShader};
