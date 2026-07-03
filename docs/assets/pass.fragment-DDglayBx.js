import{J as r}from"./thinEngine-BHwOTIeJ.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const e="passPixelShader",a=`varying vec2 vUV;uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);}`;r.ShadersStore[e]||(r.ShadersStore[e]=a);const s={name:e,shader:a};export{s as passPixelShader};
