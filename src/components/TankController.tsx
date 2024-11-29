import { Billboard, CameraControls, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';
import { Joystick, PlayerState, isHost } from 'playroomkit';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Bullet, UserData } from './Bullet';
import Tank from './Tank';
import { FIRE_RATE, ROTATION_SPEED, RUNNING_SPEED } from '../GameSetting';
let render = 0;
interface ICharacterControllerProps {
  state: PlayerState;
  joystick: Joystick;
  userPlayer: boolean;
  'position-x': number;
  onFire: (bullet: Bullet) => void;
  onKilled: (id: string, player: string) => void;
  downgradedPerformance: boolean;
}

export const spawnkoordinate = [
  new THREE.Vector3(4, 1, 10),
  new THREE.Vector3(20, 1, 10),
  new THREE.Vector3(20, 1, -20),
  new THREE.Vector3(-15, 1, -15),
  new THREE.Vector3(-20, 1, 22),
];
const TankController2 = ({
  state,
  joystick,
  userPlayer,
  onFire,
  onKilled,
  downgradedPerformance,
  ...props
}: ICharacterControllerProps) => {
  const tankRef = useRef<RapierRigidBody>(null);

  const [animation, setAnimation] = React.useState<
    | 'Tank_Backwards'
    | 'Tank_Forward'
    | 'Tank_TurningLeft'
    | 'Tank_TurningRight'
    | ''
  >('');

  const controls = useRef<CameraControls>(null);
  const lastShoot = useRef(0);
  // const deadAudio = useRef(new Audio('/audios/explosion2.mp3'));
  const hitAudio = useRef(new Audio('/audios/shoot.mp3'));
  render++;
  console.log('Rendered:', render);

  const spawnRandomly = () => {
    const randomIndex = Math.floor(Math.random() * spawnkoordinate.length);
    tankRef.current?.setTranslation(spawnkoordinate[randomIndex], true);
  };

  useEffect(() => {
    if (isHost()) {
      spawnRandomly();
    }
  }, []);

  useFrame(() => {
    if (!tankRef.current) return;

    if (controls.current) {
      const cameraDistanceY = 24;
      const cameraDistanceZ = 20;
      const playerWorldPos = vec3(tankRef.current?.translation());

      controls.current.setLookAt(
        playerWorldPos.x,
        playerWorldPos.y + (state.getState('dead') ? 12 : cameraDistanceY),
        playerWorldPos.z + (state.getState('dead') ? 2 : cameraDistanceZ),
        playerWorldPos.x,
        playerWorldPos.y + 1.5,
        playerWorldPos.z,
        true
      );
    }
    // if (state.getState('health')) hitAudio.current.play();

    if (state.getState('dead')) {
      setAnimation('Tank_Backwards');
      setAnimation('');
      return;
    }

    const rotation = tankRef.current.rotation();
    // console.log('🚀 ~ useFrame ~ rotation:', rotation);
    const quaternion = new THREE.Quaternion(
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );

    const dpad = joystick.dpad();
    const keyboardMajuMundur = state.getState('keyboard-maju-mundur');
    const keyboardKiriKanan = state.getState('keyboard-kiri-kanan');
    const keyboardFire = state.getState('fire');

    if (joystick.isJoystickPressed() || keyboardMajuMundur) {
      setAnimation('Tank_Forward');

      let speed = 0;

      if (dpad.y === 'up' || keyboardMajuMundur == 'maju')
        speed = RUNNING_SPEED;
      if (dpad.y === 'down' || keyboardMajuMundur == 'mundur')
        speed = -RUNNING_SPEED;

      const forwardVector = new THREE.Vector3(0, 0, -1);
      forwardVector.applyQuaternion(quaternion);

      const velocity = new THREE.Vector3(
        forwardVector.x * speed,
        0,
        forwardVector.z * speed
      );

      tankRef.current.setLinvel(velocity, true);
    } else {
      setAnimation('');
    }

    if (joystick.isPressed('left') || keyboardKiriKanan === 'kiri') {
      const isPressMundurDanKiriBersamaan =
        keyboardKiriKanan === 'kiri' && keyboardMajuMundur === 'mundur';
      const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        isPressMundurDanKiriBersamaan ? -ROTATION_SPEED : ROTATION_SPEED
      );
      quaternion.multiply(rotationQuaternion);
      tankRef.current.setRotation(
        { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w },
        true
      );
    }
    if (joystick.isPressed('right') || keyboardKiriKanan === 'kanan') {
      // Rotasi
      const isPressMundurDanKananBersamaan =
        keyboardKiriKanan === 'kanan' && keyboardMajuMundur === 'mundur';
      const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        isPressMundurDanKananBersamaan ? ROTATION_SPEED : -ROTATION_SPEED
      );
      quaternion.multiply(rotationQuaternion);
      tankRef.current.setRotation(
        { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w },
        true
      );
    }

    if (isHost()) {
      state.setState('pos', tankRef.current.translation());

      state.setState('rot', tankRef.current.rotation());
    } else {
      const pos = state.getState('pos');
      if (pos) {
        tankRef.current.setTranslation(pos, true);

        tankRef.current.setRotation(state.getState('rot'), true);
      }
    }

    if (joystick.isPressed('fire') || keyboardFire) {
      if (isHost()) {
        if (Date.now() - lastShoot.current > FIRE_RATE) {
          const rotation = tankRef.current.rotation();
          const quaternion = new THREE.Quaternion(
            rotation.x,
            rotation.y,
            rotation.z,
            rotation.w
          );

          // Ambil arah depan (forward vector)
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
            quaternion
          );

          // Hitung radian arah relatif terhadap sumbu Z (global)
          const radians = Math.atan2(forward.x, forward.z);

          lastShoot.current = Date.now();
          const newBullet = {
            id: state.id + '-' + +new Date(),
            player: state.id,
            position: vec3(tankRef.current?.translation()),
            angle: radians,
          };
          console.log('BulletID: ', newBullet.id);
          onFire(newBullet);
        }
      }
    }
  });

  return (
    <group position-x={props['position-x']}>
      {userPlayer && <CameraControls ref={controls} />}

      <RigidBody
        ref={tankRef}
        colliders="cuboid"
        mass={0}
        linearDamping={0.5}
        angularDamping={0.5}
        lockRotations
        scale={[0.1, 0.1, 0.1]}
        type={isHost() ? 'dynamic' : 'kinematicPosition'}
        onIntersectionEnter={({ other }) => {
          console.log('🚀 ~ other:', other.rigidBody?.userData);
          if (
            isHost() &&
            other &&
            other.rigidBody &&
            (other.rigidBody.userData as UserData).type === 'bullet' &&
            state.getState('health') > 0
          ) {
            hitAudio.current.play();
            const newHealth =
              state.getState('health') -
              (other.rigidBody.userData as UserData).damage;
            if (newHealth <= 0) {
              state.setState('deaths', state.getState('deaths') + 1);
              state.setState('dead', true);
              state.setState('health', 0);
              tankRef.current?.setEnabled(false);

              setTimeout(() => {
                spawnRandomly();
                console.log('spawning');
                tankRef.current?.setEnabled(true);
                state.setState('health', 100);
                state.setState('dead', false);
              }, 500);
              onKilled(state.id, (other.rigidBody.userData as UserData).player);
            } else {
              state.setState('health', newHealth);
            }
          }
        }}
      >
        <PlayerInfo state={state} />

        <group>
          <Tank animation={animation} />
        </group>
      </RigidBody>
      {userPlayer && <KeyboardController player={state} />}
    </group>
  );
};

export default TankController2;

const PlayerInfo = ({ state }: { state: PlayerState }) => {
  const health = state.getState('health');
  const name = state.getProfile().name;
  console.log('rendered -------------');
  // console.log('🚀 ~ PlayerInfo ~ name:', name);
  const healthColor = `hsl(${(health / 100) * 120}, 100%, 50%)`;

  return (
    <Billboard position-y={8} scale={[6, 6, 6]}>
      <Text
        position-y={0.5}
        fontSize={0.35}
        color="white"
        outlineColor="black"
        outlineWidth={0.05}
      >
        {name}
      </Text>
      <mesh position-z={-0.1}>
        <planeGeometry args={[1, 0.2]} />
        <meshBasicMaterial color="black" transparent opacity={0.5} />
      </mesh>
      <mesh scale-x={health / 100} position-x={-0.5 * (1 - health / 100)}>
        <planeGeometry args={[1, 0.2]} />
        <meshBasicMaterial color={healthColor} />
      </mesh>
    </Billboard>
  );
};

const KeyboardController = ({ player }: { player: PlayerState }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          player.setState('keyboard-maju-mundur', 'maju');
          break;
        case 's':
          player.setState('keyboard-maju-mundur', 'mundur');
          break;
        case 'd':
          player.setState('keyboard-kiri-kanan', 'kanan');
          break;
        case 'a':
          player.setState('keyboard-kiri-kanan', 'kiri');

          break;
        case ' ':
          player.setState('fire', true);
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
        case 's':
          player.setState('keyboard-maju-mundur', false);

          break;
        case 'a':
        case 'd':
          player.setState('keyboard-kiri-kanan', false);
          break;
        case ' ':
          player.setState('fire', false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <></>;
};
