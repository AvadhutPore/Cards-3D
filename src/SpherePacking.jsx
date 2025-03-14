import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SpherePacking = ({ onTextureReady }) => {
  const { gl, scene, camera } = useThree();
  const renderTarget = useRef(new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight));

  useEffect(() => {
    const loadBackground = async () => {
      const module = await import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.8/build/backgrounds/spheres2.cdn.min.js");
      const background = module.default(gl.domElement, {
        count: 200,
        colors: [0xff0000, 0x0, 0xffffff],
        minSize: 0.5,
        maxSize: 1,
      });
      scene.add(background.scene);
    };

    loadBackground();

    return () => {
      scene.clear();
    };
  }, [gl, scene]);

  useFrame(() => {
    gl.setRenderTarget(renderTarget.current);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Pass texture once it's ready
    if (onTextureReady) {
      onTextureReady(renderTarget.current.texture);
    }
  });

  return null;
};

export default SpherePacking;
