import{v as r}from"./thinEngine-B6AJuPpk.js";import"./index-bTSCevfz.js";import"./publicPath-DFnRRUbl.js";const e="passPixelShader",a=`varying vec2 vUV;uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);}`;r.ShadersStore[e]||(r.ShadersStore[e]=a);const s={name:e,shader:a};export{s as passPixelShader};
