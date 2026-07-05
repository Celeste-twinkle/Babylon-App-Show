import{v as e,Z as n,$ as i,a3 as o,a4 as s,a0 as c,a7 as d,a8 as l,a9 as S,aa as p,ab as u}from"./thinEngine-C6TEorKP.js";import"./index-gcnlu8d0.js";import"./publicPath-DFnRRUbl.js";const a="pickingVertexShader",r=`attribute position: vec3f;
#if defined(INSTANCES)
attribute instanceMeshID: f32;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<instancesDeclaration>
uniform viewProjection: mat4x4f;
#if defined(INSTANCES)
flat varying vMeshID: f32;
#endif
@vertex
fn main(input : VertexInputs)->FragmentInputs {var positionUpdated: vec3f=vertexInputs.position;
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
var worldPos: vec4f=finalWorld*vec4f(positionUpdated,1.0);vertexOutputs.position=uniforms.viewProjection*worldPos;
#if defined(INSTANCES)
vertexOutputs.vMeshID=vertexInputs.instanceMeshID;
#endif
}
`;e.ShadersStoreWGSL[a]||(e.ShadersStoreWGSL[a]=r);const m=[n,i,o,s,c,d,l,S,p,u];for(const t of m)e.IncludesShadersStoreWGSL[t.name]||(e.IncludesShadersStoreWGSL[t.name]=t.shader);const G={name:a,shader:r};export{G as pickingVertexShaderWGSL};
