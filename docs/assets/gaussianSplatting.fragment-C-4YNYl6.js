import{v as a,at as t,a$ as l,b8 as s,au as c}from"./thinEngine-B6AJuPpk.js";import{f as g,a as d}from"./fogFragment-D2GwtUoF.js";import"./index-bTSCevfz.js";import"./publicPath-DFnRRUbl.js";const n="gaussianSplattingFragmentDeclaration",r=`vec4 gaussianColor(vec4 inColor)
{float A=-dot(vPosition,vPosition);if (A<-4.0) discard;float B=exp(A)*inColor.a;
#include<logDepthFragment>
vec3 color=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4(color,B);}
`;a.IncludesShadersStore[n]||(a.IncludesShadersStore[n]=r);const S={name:n,shader:r},o="gaussianSplattingPixelShader",i=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
void main () {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec4 finalColor=gaussianColor(vColor);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
gl_FragColor=finalColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;a.ShadersStore[o]||(a.ShadersStore[o]=i);const m=[t,l,g,s,d,S,c];for(const e of m)a.IncludesShadersStore[e.name]||(a.IncludesShadersStore[e.name]=e.shader);const h={name:o,shader:i};export{h as gaussianSplattingPixelShader};
