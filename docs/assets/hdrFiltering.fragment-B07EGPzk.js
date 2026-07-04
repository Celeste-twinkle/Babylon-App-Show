import{J as e,a3 as t,bg as a,a7 as o,bh as u}from"./thinEngine-DydGsXfS.js";import"./index-Dsfomhyb.js";import"./publicPath-DFnRRUbl.js";const n="hdrFilteringPixelShader",i=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform alphaG: f32;var inputTextureSampler: sampler;var inputTexture: texture_cube<f32>;uniform vFilteringInfo: vec2f;uniform hdrScale: f32;varying direction: vec3f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var color: vec3f=radiance(uniforms.alphaG,inputTexture,inputTextureSampler,input.direction,uniforms.vFilteringInfo);fragmentOutputs.color= vec4f(color*uniforms.hdrScale,1.0);}`;e.ShadersStoreWGSL[n]||(e.ShadersStoreWGSL[n]=i);const c=[t,a,o,u];for(const r of c)e.IncludesShadersStoreWGSL[r.name]||(e.IncludesShadersStoreWGSL[r.name]=r.shader);const p={name:n,shader:i};export{p as hdrFilteringPixelShaderWGSL};
