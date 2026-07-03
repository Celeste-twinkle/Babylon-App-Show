import{J as a,ap as r,af as i,b0 as o,a$ as l,b1 as s,aq as S}from"./thinEngine-BHwOTIeJ.js";import{f as g}from"./fogFragmentDeclaration-kZc8VRPq.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const n="gaussianSplattingPixelShader",t=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vColor: vec4f;varying vPosition: vec2f;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
var finalColor: vec4f=gaussianColor(input.vColor,input.vPosition);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
fragmentOutputs.color=finalColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;a.ShadersStoreWGSL[n]||(a.ShadersStoreWGSL[n]=t);const c=[r,i,g,o,l,s,S];for(const e of c)a.IncludesShadersStoreWGSL[e.name]||(a.IncludesShadersStoreWGSL[e.name]=e.shader);const u={name:n,shader:t};export{u as gaussianSplattingPixelShaderWGSL};
