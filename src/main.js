import * as THREE from 'three';
import fragmentShader from './frag.glsl?raw';

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
  -1, 1,
  1, -1,
  0, 1
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader,

  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,

  uniforms: {
    u_time: {
      value: 0.0
    },

    u_resolution: {
      value: new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      )
    },

    u_mouse: {
      value: new THREE.Vector2(0.0, 0.0)
    },
    u_mouseDown: {
    value: 0.0
  }
  }
});

window.addEventListener('pointermove', (event) => {
  material.uniforms.u_mouse.value.set(
    event.clientX / window.innerWidth,
    1.0 - event.clientY / window.innerHeight
  );
});

let mouseDown = false;

window.addEventListener('pointerdown', () => {
  mouseDown = true;
});

window.addEventListener('pointerup', () => {
  mouseDown = false;
});

window.addEventListener('pointercancel', () => {
  mouseDown = false;
});
const quad = new THREE.Mesh(
  geometry,
  material
);

scene.add(quad);

function animate(time) {
  material.uniforms.u_time.value = time * 0.001;
   const target = mouseDown ? 1.0 : 0.0;

  material.uniforms.u_mouseDown.value +=
    (target - material.uniforms.u_mouseDown.value) * 0.05

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);