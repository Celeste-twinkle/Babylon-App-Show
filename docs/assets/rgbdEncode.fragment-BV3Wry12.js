import{v as e,Q as t}from"./thinEngine-B6AJuPpk.js";import"./index-bTSCevfz.js";import"./publicPath-DFnRRUbl.js";const o="rgbdEncodePixelShader",n=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`;e.ShadersStore[o]||(e.ShadersStore[o]=n);const a=[t];for(const r of a)e.IncludesShadersStore[r.name]||(e.IncludesShadersStore[r.name]=r.shader);const S={name:o,shader:n};export{S as rgbdEncodePixelShader};
