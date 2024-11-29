import { Environment } from '@react-three/drei';
import {
  Joystick,
  PlayerState,
  getState,
  insertCoin,
  isHost,
  myPlayer,
  onPlayerJoin,
  setState,
  useMultiplayerState,
} from 'playroomkit';
import { useEffect, useState } from 'react';
import Map from './Map';

import { Vector3 } from 'three';
import BulletComponent, { Bullet } from './Bullet';

import { BulletHit } from './BulletHit';
import TankController from './TankController';
import { GAME_TIME } from '../GameSetting';

interface Player {
  state: PlayerState;
  joystick: Joystick;
}

interface Hit {
  id: string;
  position: any;
}
interface Props {
  downgradedPerformance: boolean;
}

export const Experience = ({ downgradedPerformance }: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const [bullets, setBullets] = useState<Bullet[]>([]);

  const [networkBullets, setnetworkBullets] = useMultiplayerState<Bullet[]>(
    'bullets',
    []
  );

  const [hits, setHits] = useState<Hit[]>([]);

  const [networkHits, setNetworkHits] = useMultiplayerState<Hit[]>('hits', []);

  useEffect(() => setnetworkBullets(bullets), [bullets]);
  useEffect(() => {
    setNetworkHits(hits);
  }, [hits]);

  const onFire = (bullet: Bullet) => {
    setBullets((bullets) => [...bullets, bullet]);
  };
  const onHit = (bulletID: string, position: Vector3) => {
    // Hapus Bullet
    setBullets((bullets) => bullets.filter((bullet) => bullet.id !== bulletID));
    setHits((hits) => [...hits, { id: bulletID, position }]);
  };
  const start = async () => {
    await insertCoin(
      {
        defaultStates: {
          status: 'waiting', //waiting, playing, finish
          endAt: 0,
        },
      },
      () => {
        if (isHost() && getState('status') === 'waiting') {
          setState('endAt', Date.now() + GAME_TIME * 60 * 1000, true);
          setState('status', 'playing', true);
        }
      }
    );

    onPlayerJoin((state) => {
      const joystick = new Joystick(state, {
        type: 'dpad',
        buttons: [
          { id: 'fire', label: 'Fire' },
          { id: 'left', label: 'Left' },
          { id: 'right', label: 'Right' },
        ],
      });
      const newPlayer = { state, joystick };
      state.setState('health', 100);
      state.setState('kills', 0);
      state.setState('deaths', 0);
      setPlayers((prev) => [...prev, newPlayer]);
      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id !== state.id));
      });
    });
  };
  const onHitEnded = (hitId: string) => {
    setHits((hits) => hits.filter((h) => h.id !== hitId));
  };
  const onKilled = (_victim: string, killer: string) => {
    const killerState = players.find((p) => p.state.id === killer)?.state;
    killerState?.setState('kills', killerState.getState('kills') + 1);
  };
  useEffect(() => {
    start();
  }, []);

  return (
    <>
      {/* <directionalLight
        position={[25, 18, -25]}
        intensity={0.3}
        castShadow
        shadow-camera-near={0}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      /> */}
      {/* <OrbitControls /> */}
      <Map />
      <Environment preset="sunset" />

      {players.map((player, idx) => (
        <TankController
          key={player.state.id}
          {...player}
          userPlayer={player.state.id === myPlayer().id}
          position-x={idx * 5}
          onFire={onFire}
          onKilled={onKilled}
          downgradedPerformance={downgradedPerformance}
        />
      ))}
      {(isHost() ? bullets : networkBullets).map((bullet) => (
        <BulletComponent
          key={bullet.id}
          {...bullet}
          onHit={(position) => onHit(bullet.id, position)}
        />
      ))}

      {(isHost() ? hits : networkHits).map((hit) => (
        <BulletHit
          key={hit.id + 'wkwkw'}
          {...hit}
          onEnded={() => onHitEnded(hit.id)}
        />
      ))}
    </>
  );
};
