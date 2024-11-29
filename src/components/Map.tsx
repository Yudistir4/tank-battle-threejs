import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';

import { Mesh } from 'three';

const Map = () => {
  const map = useGLTF('models/map.glb');

  useEffect(() => {
    map.scene.traverse((child) => {

      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <primitive object={map.scene} />;
    </RigidBody>
  );
};

export default Map;

useGLTF.preload('models/map.glb');
