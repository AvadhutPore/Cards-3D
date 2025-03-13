import {
  OrbitControls,
  useGLTF,
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
  Instances, Instance, Environment
} from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

const Scene = () => {

  const [active, setActive] = useState();

  const meshPortalMtlRef = useRef();
  const cameraControlRef = useRef();

  const model = useGLTF("/model/ansh-new.glb");
  const texture = useTexture("texture/3.png");

  useFrame((_, delta) => {
    easing.damp(meshPortalMtlRef.current, 'blend', active ? 1 : 0, 0.2, delta )
  })

  useEffect(() => {
    if(active) {
      cameraControlRef.current.setLookAt(0,0,3,0,0,0,true);
    }else{
      cameraControlRef.current.setLookAt(0,0,5,0,0,0,true);
    }
  }, [active])

  const handleClick = () => {
    setActive(!active);
  }



  return (
    <>
      

      <CameraControls ref={cameraControlRef}/>
      <Text 
      font="./font/bold.ttf"
      position={[0, 1.6, 0.1]}
      fontSize={0.5}
      color={'black'}
      >
        Ansh
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <RoundedBox args={[3, 4, 0.1]} radius={0.1} onClick={handleClick}>

        <MeshPortalMaterial ref={meshPortalMtlRef}>
        <ambientLight intensity={1} />
          <primitive object={model.scene} scale={1.8} position-y={0} />
          <mesh>
            <sphereGeometry args={[8, 64, 64]}/>
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
     

      </RoundedBox>
    </>
  );



};




export default Scene;
