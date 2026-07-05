import{v as e}from"./thinEngine-C6TEorKP.js";import"./index-gcnlu8d0.js";import"./publicPath-DFnRRUbl.js";const r="bloomMergePixelShader",o=`uniform sampler2D textureSampler;uniform sampler2D bloomBlur;varying vec2 vUV;uniform float bloomWeight;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{gl_FragColor=texture2D(textureSampler,vUV);vec3 blurred=texture2D(bloomBlur,vUV).rgb;gl_FragColor.rgb=gl_FragColor.rgb+(blurred.rgb*bloomWeight); }
`;e.ShadersStore[r]||(e.ShadersStore[r]=o);const a={name:r,shader:o};export{a as bloomMergePixelShader};
