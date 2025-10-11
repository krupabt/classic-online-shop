import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function ProductModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />; // Adjust scale if needed
}

export default function ThreeDModel({ modelPath = "/models/blue_headset.glb" }) {
  return (
    <Canvas style={{ height: 400 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="gray" /></mesh>}>
        <ProductModel modelPath={modelPath} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
