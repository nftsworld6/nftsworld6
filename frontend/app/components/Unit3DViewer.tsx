import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// مكون عرض ثلاثي الأبعاد للوحدة العقارية (سيتم ربطه لاحقًا بـ Three.js أو Babylon.js)
export default function Unit3DViewer({ modelUrl }: { modelUrl?: string }) {
  return (
    <div className="w-full h-96 rounded-2xl shadow-2xl mt-8 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 flex items-center justify-center relative overflow-hidden" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.10)',backdropFilter:'blur(16px) saturate(180%)'}}>
      {modelUrl ? (
        <Canvas camera={{ position: [2, 2, 2], fov: 50 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
          <Suspense fallback={<Html center><span className="text-blue-700 dark:text-blue-300">جارٍ تحميل النموذج...</span></Html>}>
            <Model url={modelUrl} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      ) : (
        <span className="text-gray-500 dark:text-gray-400 text-lg">يرجى رفع أو اختيار نموذج ثلاثي الأبعاد (glTF/GLB)</span>
      )}
    </div>
  );
}
