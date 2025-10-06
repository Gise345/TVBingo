import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

/*
  TVBingoHome3D component
  - Place assets into /public/assets/
    - ai-carnival-1.jpg
    - ai-carnival-2.jpg
    - confetti-png.png
    - swordfish.glb  (placeholder required)
    - logo-tvbingo.png (optional)
*/

function SwordfishModel({ url, swimSpeed = 0.5, hoverScale = 1.15 }) {
  const group = useRef();
  const { scene } = useGLTF(url);
  const t = useRef(0);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    t.current += delta * swimSpeed;
    if (group.current) {
      group.current.rotation.y = Math.sin(t.current * 0.6) * 0.25;
      group.current.rotation.x = Math.sin(t.current * 0.3) * 0.08;
      group.current.position.y = 0.3 + Math.sin(t.current * 1.1) * 0.12;
      group.current.position.z = Math.cos(t.current * 0.7) * 0.15;
      const s = hovered ? hoverScale : 1.0;
      group.current.scale.lerp({ x: s, y: s, z: s }, 0.05);
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (group.current) group.current.rotation.z += Math.PI * 0.9;
      }}
    >
      <primitive object={scene} dispose={null} />
    </group>
  );
}

function CameraControls() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1.6, 6.5);
  }, [camera]);
  return <OrbitControls enablePan={false} maxPolarAngle={1.6} minPolarAngle={0.6} />;
}

export default function TVBingoHome3D() {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ fov: 45, position: [0, 1.6, 6.5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.8} position={[10, 10, 5]} />
        <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={0.5} intensity={0.6} />

        <Suspense fallback={null}>
          <Html position={[0, 0.6, -8]} transform occlude zIndexRange={[0, -1]}>
            <div style={{ width: '2200px', height: '800px', transform: 'translateX(-50%) translateY(-50%)' }}>
              <img src="/assets/ai-carnival-1.jpg" alt="carnival bg" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
            </div>
          </Html>

          <group position={[0, 0.4, 0]}>
            <SwordfishModel url={'/assets/swordfish.glb'} swimSpeed={0.8} hoverScale={1.12} />
          </group>

          <ContactShadows position={[0, -0.5, 0]} opacity={0.5} blur={2} far={1.2} />
          <Environment preset="sunset" />
        </Suspense>

        <CameraControls />
      </Canvas>

      <div style={{ position: 'absolute', top: 28, left: 28, zIndex: 40 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src="/assets/logo-tvbingo.png" alt="TV Bingo" style={{ height: 56 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '25%', left: '5%', zIndex: 40, color: '#fff', maxWidth: 540 }}>
        <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 58, lineHeight: 1.02, margin: 0, fontWeight: 800, textShadow: '0 6px 18px rgba(0,0,0,0.45)' }}>
          Play Live <span style={{ color: '#ffd54a' }}>TV Bingo</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          style={{ marginTop: 12, fontSize: 18, color: 'rgba(255,255,255,0.9)' }}>
          Join the carnival — bingo, music, and instant wins. Tap the swordfish to interact and watch it swim across the screen.
        </motion.p>

        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          <a href="#play" style={{ padding: '12px 22px', background: '#ffd54a', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Play Now</a>
          <a href="#watch" style={{ padding: '12px 22px', border: '2px solid rgba(255,255,255,0.18)', borderRadius: 10, color: '#fff', textDecoration: 'none' }}>Watch Live</a>
        </div>
      </div>

      <img src="/assets/confetti-png.png" alt="confetti" style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '60%', zIndex: 30, pointerEvents: 'none', opacity: 0.85 }} />

      <div style={{ position: 'absolute', bottom: 42, left: '50%', transform: 'translateX(-50%)', zIndex: 40, width: '86%', maxWidth: 980 }}>
        <div style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.03)', padding: 18, borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: 18 }}>How it works</strong>
              <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.9)' }}>Download the app, pick a card, and join live draws hosted right here. Our swordfish mascot adds character and guidance to the experience.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '10px 14px', background: '#ffd54a', borderRadius: 10, border: 'none', fontWeight: 700 }}>Download</button>
              <button style={{ padding: '10px 14px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}>Contact</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', right: 18, bottom: 12, color: 'rgba(255,255,255,0.7)', zIndex: 50, fontSize: 12 }}>
        Tip: Hover / click on the swordfish to interact — perfect for engaging users on the hero.
      </div>
    </div>
  );
}

// useGLTF requires the GLB path to be served from the public folder.
