import { useAnimations, useGLTF } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Group, Mesh, SkinnedMesh } from 'three';
import { SkeletonUtils } from 'three-stdlib';

interface Props {
  animation: string;
}
export default function Tank({ animation }: Props) {
  const group = useRef<Group>(null);
  const { scene, animations, materials } = useGLTF('/models/Tank.glb');

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.2).play();

    return () => {
      actions[animation]?.fadeOut(0.2); // Jalankan fadeOut tanpa mengembalikan nilai
    };
  }, [animation]);

  return (
    <group ref={group} dispose={null}>
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="Tank_Turret">
            <mesh
              name="Cube"
              castShadow
              receiveShadow
              geometry={(nodes.Cube as Mesh).geometry}
              material={materials.Main}
            />
            <mesh
              name="Cube_1"
              castShadow
              receiveShadow
              geometry={(nodes.Cube_1 as Mesh).geometry}
              material={materials.Main_Dark}
            />
          </group>
          <group name="TankArmature">
            <group name="Tank_body">
              <skinnedMesh
                name="Cube009"
                geometry={(nodes.Cube009 as Mesh).geometry}
                material={materials.Main}
                skeleton={(nodes.Cube009 as SkinnedMesh).skeleton}
              />
              <skinnedMesh
                name="Cube009_1"
                geometry={(nodes.Cube009_1 as Mesh).geometry}
                material={materials.Main_Dark}
                skeleton={(nodes.Cube009_1 as SkinnedMesh).skeleton}
              />
              <skinnedMesh
                name="Cube009_2"
                geometry={(nodes.Cube009_2 as Mesh).geometry}
                material={materials.Main_Light}
                skeleton={(nodes.Cube009_2 as SkinnedMesh).skeleton}
              />
              <skinnedMesh
                name="Cube009_3"
                geometry={(nodes.Cube009_3 as Mesh).geometry}
                material={materials.Main_Details}
                skeleton={(nodes.Cube009_3 as SkinnedMesh).skeleton}
              />
              <skinnedMesh
                name="Cube009_4"
                geometry={(nodes.Cube009_4 as Mesh).geometry}
                material={materials.Wheels}
                skeleton={(nodes.Cube009_4 as SkinnedMesh).skeleton}
              />
            </group>
            <skinnedMesh
              name="TrackMeshL"
              geometry={(nodes.TrackMeshL as Mesh).geometry}
              material={materials.Main_Details}
              skeleton={(nodes.TrackMeshL as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="TrackMeshR"
              geometry={(nodes.TrackMeshR as Mesh).geometry}
              material={materials.Main_Details}
              skeleton={(nodes.TrackMeshR as SkinnedMesh).skeleton}
            />
            <primitive object={nodes.Root} />
          </group>
          <mesh
            name="Tank_Gun"
            castShadow
            receiveShadow
            geometry={(nodes.Tank_Gun as Mesh).geometry}
            material={materials.Main_Details}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/Tank.glb');
