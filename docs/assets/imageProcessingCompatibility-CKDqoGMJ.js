import{v as o}from"./thinEngine-B6AJuPpk.js";const e="imageProcessingCompatibility",r=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;o.IncludesShadersStore[e]||(o.IncludesShadersStore[e]=r);const s={name:e,shader:r};export{s as i};
