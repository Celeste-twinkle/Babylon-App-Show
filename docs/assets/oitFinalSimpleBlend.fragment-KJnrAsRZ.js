import{J as o}from"./thinEngine-BHwOTIeJ.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const r="oitFinalSimpleBlendPixelShader",t=`var uFrontColor: texture_2d<f32>;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var fragCoord: vec2i=vec2i(fragmentInputs.position.xy);var frontColor: vec4f=textureLoad(uFrontColor,fragCoord,0);fragmentOutputs.color=frontColor;}
`;o.ShadersStoreWGSL[r]||(o.ShadersStoreWGSL[r]=t);const i={name:r,shader:t};export{i as oitFinalSimpleBlendPixelShaderWGSL};
