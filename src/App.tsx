import { Loader, PerformanceMonitor, SoftShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
// import { Leva } from 'leva';
import { Suspense, useState } from 'react';

import { Experience } from './components/Experience';
import { GameOver } from './components/GameOver';
import Header from './components/Header';

export interface GameState {
  isPlaying: boolean;
  endAt: number;
}
function App() {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);

  return (
    <>
      <Loader />
      {/* <Leva /> */}

      <Header />

      <GameOver />
      <Canvas shadows camera={{ position: [0, 30, 0], fov: 30, near: 2 }}>
        <color attach="background" args={['#242424']} />
        <SoftShadows size={42} />

        <PerformanceMonitor
          // Detect low performance devices
          onDecline={() => {
            setDowngradedPerformance(true);
          }}
        />
        <Suspense>
          <Physics>
            <Experience downgradedPerformance={downgradedPerformance} />
          </Physics>
        </Suspense>
        {/* {!downgradedPerformance && (
          // disable the postprocessing on low-end devices
          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
          </EffectComposer>
        )} */}
      </Canvas>
    </>
  );
}

export default App;
