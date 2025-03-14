import {
  OrbitControls,
  useGLTF,
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls
} from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import SpherePacking from "./SpherePacking";

const Scene = () => {
  const [active, setActive] = useState(false);
  const meshPortalMtlRef = useRef();
  const cameraControlRef = useRef();
  const model = useGLTF("/model/ansh-new.glb");
  const texture = useTexture("texture/3.png");
  const { camera } = useThree(); // Get camera reference

  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    // Move camera back to fit both elements
    camera.position.set(0, 0, 10);
  }, []);

  return (
    <>
      {/* ✅ Camera & Lighting */}
      <CameraControls ref={cameraControlRef} />
      <ambientLight intensity={1} />

      {/* ✅ SpherePacking (LEFT SIDE) */}
      <group position={[-3, 0, 0]}>
        <SpherePacking />
      </group>

      {/* ✅ 3D Model & RoundedBox (RIGHT SIDE) */}
      <group position={[3, 0, 0]}>
        <Text font="./font/bold.ttf" position={[0, 2, 0]} fontSize={0.5} color={"black"}>
          Ansh
        </Text>
        <RoundedBox args={[3, 4, 0.1]} radius={0.1} onClick={handleClick}>
          <MeshPortalMaterial ref={meshPortalMtlRef}>
            <primitive object={model.scene} scale={1.8} position-y={0} />
            <mesh>
              <sphereGeometry args={[8, 64, 64]} />
              <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
          </MeshPortalMaterial>
        </RoundedBox>
      </group>
    </>
  );
};

export default Scene;
