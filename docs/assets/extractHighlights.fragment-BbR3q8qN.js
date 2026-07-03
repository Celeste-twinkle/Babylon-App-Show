import{J as e,a4 as a}from"./thinEngine-BHwOTIeJ.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const o="extractHighlightsPixelShader",t=`#include<helperFunctions>
varying vec2 vUV;uniform sampler2D textureSampler;uniform float threshold;uniform float exposure;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);float luma=dot(LuminanceEncodeApprox,gl_FragColor.rgb*exposure);gl_FragColor.rgb=step(threshold,luma)*gl_FragColor.rgb;}`;e.ShadersStore[o]||(e.ShadersStore[o]=t);const l=[a];for(const r of l)e.IncludesShadersStore[r.name]||(e.IncludesShadersStore[r.name]=r.shader);const d={name:o,shader:t};export{d as extractHighlightsPixelShader};
