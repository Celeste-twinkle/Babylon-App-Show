import{J as r}from"./thinEngine-BHwOTIeJ.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const a="shadowMapFragmentSoftTransparentShadow",o=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM.x*alpha) discard;
#endif
`;r.IncludesShadersStore[a]||(r.IncludesShadersStore[a]=o);const s={name:a,shader:o};export{s as shadowMapFragmentSoftTransparentShadow};
