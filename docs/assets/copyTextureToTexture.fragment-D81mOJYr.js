import{S as r}from"./index-Bt0wH6Vo.js";const e="copyTextureToTexturePixelShader",t=`uniform conversion: f32;
#ifndef NO_SAMPLER
var textureSamplerSampler: sampler;
#endif
var textureSampler: texture_2d<f32>;varying vUV: vec2f;
#include<helperFunctions>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#ifdef NO_SAMPLER
var color: vec4f=textureLoad(textureSampler,vec2u(fragmentInputs.position.xy),0);
#else
var color: vec4f=textureSample(textureSampler,textureSamplerSampler,input.vUV);
#endif
#ifdef DEPTH_TEXTURE
fragmentOutputs.fragDepth=color.r;
#else
if (uniforms.conversion==1.) {color=toLinearSpaceVec4(color);} else if (uniforms.conversion==2.) {color=toGammaSpace(color);}
fragmentOutputs.color=color;
#endif
}
`;r.ShadersStoreWGSL[e]||(r.ShadersStoreWGSL[e]=t);const a={name:e,shader:t};export{a as copyTextureToTexturePixelShaderWGSL};
