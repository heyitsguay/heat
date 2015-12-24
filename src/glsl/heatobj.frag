#version 120

precision highp float;

// Fragment heat value.
varying float v_heat;

// HEATOFFSET: heat offset term, value filled in before shader compilation.
// Regular: 5000.
// Mobile: 128.
const float heat_offset = HEATOFFSET;

// HEATSCALE: heat scaling term, value filled in before shader compilation.
// Regular: 0.0001
// Mobile: 1/255
 const float heat_scale = HEATSCALE;

void main() {
	glFragColor = vec4(heat_scale * (v_heat + heat_offset), 0., 0., 1.);
}
