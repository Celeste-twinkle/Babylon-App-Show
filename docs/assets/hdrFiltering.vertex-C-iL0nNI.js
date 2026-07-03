import{J as i}from"./thinEngine-BHwOTIeJ.js";import"./index-B_x9s0rl.js";import"./publicPath-DFnRRUbl.js";const e="hdrFilteringVertexShader",r=`attribute vec2 position;varying vec3 direction;uniform vec3 up;uniform vec3 right;uniform vec3 front;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
mat3 view=mat3(up,right,front);direction=view*vec3(position,1.0);gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;i.ShadersStore[e]||(i.ShadersStore[e]=r);const d={name:e,shader:r};export{d as hdrFilteringVertexShader};
