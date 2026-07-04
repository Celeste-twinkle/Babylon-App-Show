import{J as e,a4 as o,bi as a,bj as t,bk as c}from"./thinEngine-DydGsXfS.js";import"./index-Dsfomhyb.js";import"./publicPath-DFnRRUbl.js";const n="hdrFilteringPixelShader",i=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;e.ShadersStore[n]||(e.ShadersStore[n]=i);const l=[o,a,t,c];for(const r of l)e.IncludesShadersStore[r.name]||(e.IncludesShadersStore[r.name]=r.shader);const h={name:n,shader:i};export{h as hdrFilteringPixelShader};
