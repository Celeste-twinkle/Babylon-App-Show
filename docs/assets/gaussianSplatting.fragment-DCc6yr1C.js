import{O as a,a4 as r,an as i,b1 as o,a6 as l,b2 as s,a5 as S}from"./index-DGdTqOvU.js";import{f as g}from"./fogFragmentDeclaration-DcOmOK7t.js";const e="gaussianSplattingPixelShader",t=`#include<clipPlaneFragmentDeclaration>
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
`;a.ShadersStoreWGSL[e]||(a.ShadersStoreWGSL[e]=t);const c=[r,i,g,o,l,s,S];for(const n of c)a.IncludesShadersStoreWGSL[n.name]||(a.IncludesShadersStoreWGSL[n.name]=n.shader);const d={name:e,shader:t};export{d as gaussianSplattingPixelShaderWGSL};
