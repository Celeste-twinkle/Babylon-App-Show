import{O as e,W as o,bj as a,bk as t,bl as c}from"./index-B3u3-0r1.js";const r="hdrFilteringPixelShader",i=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;e.ShadersStore[r]||(e.ShadersStore[r]=i);const l=[o,a,t,c];for(const n of l)e.IncludesShadersStore[n.name]||(e.IncludesShadersStore[n.name]=n.shader);const s={name:r,shader:i};export{s as hdrFilteringPixelShader};
