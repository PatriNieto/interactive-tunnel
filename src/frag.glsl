#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_mouseDown;

void main() {

    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    vec3 c;

    float l;
    float z = u_time;

    float progress = u_mouseDown;

    for(int i = 0; i < 3; i++) {
vec2 p = gl_FragCoord.xy / u_resolution.xy;

st = p;

p -= u_mouse;

p.x *= u_resolution.x / u_resolution.y;

z += 0.07;

l = length(p);

        st += abs(
            sin(
                l * 9.0 -
                z -
                z * progress * 0.5
            )
        );

        c[i] = 0.01 / length(
            mod(st * progress, 1.0) - 0.5
        );
    }

    gl_FragColor = vec4(c / l, 1.0);
}