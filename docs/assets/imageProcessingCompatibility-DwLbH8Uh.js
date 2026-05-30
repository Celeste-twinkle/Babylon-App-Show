import{S as r}from"./index-CHOJYSoc.js";const e="imageProcessingCompatibility",o=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;r.IncludesShadersStore[e]||(r.IncludesShadersStore[e]=o);
