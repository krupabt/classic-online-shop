import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Link } from "react-router-dom";

// 3D Model Component
function ProductModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />; // Adjust scale if needed
}

// 3D Page Component
export default function ThreeDPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>3D Product Preview</h1>

      <Canvas style={{ height: 400, margin: "20px 0" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="gray" /></mesh>}>
          <ProductModel modelPath="/models/blue_headset.glb" />
        </Suspense>
        <OrbitControls />
      </Canvas>

      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}
