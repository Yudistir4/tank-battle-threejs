import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { isHost } from 'playroomkit';
import { useEffect, useMemo, useRef } from 'react';
import { Color, MathUtils, Vector3 } from 'three';

const bulletHitcolor = new Color('red');
bulletHitcolor.multiplyScalar(12);

interface AnimatedBoxProps {
  scale: number;
  target: Vector3;
  speed: number;
}
const AnimatedBox = ({ scale, target, speed }: AnimatedBoxProps) => {
  const ref = useRef<any>(null);
  useFrame((_, delta) => {
    if (ref.current.scale.x > 0) {
      ref.current.scale.x =
        ref.current.scale.y =
        ref.current.scale.z -=
          speed * delta;
    }
    ref.current.position.lerp(target, speed);
  });
  return <Instance ref={ref} scale={scale} position={[0, 0, 0]} />;
};

interface BulletHitProps {
  nb?: number;
  position: Vector3;
  onEnded: () => void;
}
export const BulletHit = ({ nb = 50, position, onEnded }: BulletHitProps) => {
  const boxes = useMemo(
    () =>
      Array.from({ length: nb }, () => ({
        target: new Vector3(
          MathUtils.randFloat(-0.6, 0.6),
          MathUtils.randFloat(-0.6, 0.6),
          MathUtils.randFloat(-0.6, 0.6)
        ),
        scale: 0.1, //MathUtils.randFloat(0.03, 0.09),
        speed: MathUtils.randFloat(0.1, 0.3),
      })),
    [nb]
  );

  useEffect(() => {
    setTimeout(() => {
      if (isHost()) {
        onEnded();
      }
    }, 500);
  }, []);

  return (
    <group position={[position.x, position.y, position.z]}>
      <Instances>
        <boxGeometry />
        <meshStandardMaterial toneMapped={false} color={bulletHitcolor} />
        {boxes.map((box, i) => (
          <AnimatedBox key={i} {...box} />
        ))}
      </Instances>
    </group>
  );
};
