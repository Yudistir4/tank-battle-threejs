import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';
import { isHost } from 'playroomkit';
import * as React from 'react';
import { MeshBasicMaterial, Vector3 } from 'three';
import { BULLET_SPEED, WEAPON_OFFSET } from '../GameSetting';

export interface Bullet {
  id: string;
  player: string;
  position: Vector3;
  angle: number;
}
export interface UserData {
  player: string;
  damage: number;
  type: 'bullet' | 'person';
}
type BulletProps = Bullet & {
  onHit: (id: Vector3) => void;
};
const bulletMaterial = new MeshBasicMaterial({
  color: 'hotPink',
  toneMapped: false,
});
// to make blumEffect

bulletMaterial.color.multiplyScalar(42);

const BulletComponent: React.FunctionComponent<BulletProps> = ({
  angle,
  player,
  position,
  onHit,
}) => {
  const rigidBody = React.useRef<RapierRigidBody>(null);
  const shootAudio = React.useRef(new Audio('/audios/rifle.mp3'));

  React.useEffect(() => {
    shootAudio.current.play();
    const velocity = {
      x: Math.sin(angle) * BULLET_SPEED,
      y: 0,
      z: Math.cos(angle) * BULLET_SPEED,
    };

    rigidBody.current?.setLinvel(velocity, true);
    return () => {
      shootAudio.current.pause(); // Pause the audio
      shootAudio.current.currentTime = 0; // Reset the audio to start
    };
  }, []);

  return (
    <group position={[position.x, position.y, position.z]} rotation-y={angle}>
      <group
        position-x={WEAPON_OFFSET.x}
        position-y={WEAPON_OFFSET.y}
        position-z={WEAPON_OFFSET.z}
      >
        <RigidBody
          ref={rigidBody}
          gravityScale={0}
          sensor
          onIntersectionEnter={(e) => {
            console.log('🚀 ~ e:', e.other.rigidBody?.userData);

            if (
              isHost() &&
              rigidBody.current
              // &&
              // e.other.rigidBody?.userData &&
              // (e.other.rigidBody.userData as UserData).type !== 'bullet'
            ) {
              rigidBody.current.setEnabled(false); // mencegah kena kit lebih dari sekali
              onHit(vec3(rigidBody.current?.translation()));
            }
          }}
          userData={{
            player,
            damage: 10,
            type: 'bullet',
          }}
        >
          <mesh position-z={0.25} material={bulletMaterial} castShadow>
            <boxGeometry args={[0.05, 0.05, 0.5]} />
          </mesh>
        </RigidBody>
      </group>
    </group>
  );
};

export default BulletComponent;
