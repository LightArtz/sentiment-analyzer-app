"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Line } from "@react-three/drei"
import * as THREE from "three"

function AnimatedNodes() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.Group>(null)

  // Generate random positions for nodes
  const positions = useMemo(() => {
    const positions = new Float32Array(150 * 3) // 50 nodes
    for (let i = 0; i < 150; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20 // x
      positions[i + 1] = (Math.random() - 0.5) * 15 // y
      positions[i + 2] = (Math.random() - 0.5) * 10 // z
    }
    return positions
  }, [])

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const connections = []
    const nodeCount = positions.length / 3

    for (let i = 0; i < nodeCount; i++) {
      const x1 = positions[i * 3]
      const y1 = positions[i * 3 + 1]
      const z1 = positions[i * 3 + 2]

      for (let j = i + 1; j < nodeCount; j++) {
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]

        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)

        if (distance < 4 && Math.random() > 0.7) {
          connections.push([new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2)])
        }
      }
    }
    return connections
  }, [positions])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      <Points ref={pointsRef} positions={positions}>
        <PointMaterial size={0.1} color="#60a5fa" transparent opacity={0.8} sizeAttenuation={true} />
      </Points>

      <group ref={linesRef}>
        {connections.map((connection, index) => (
          <Line key={index} points={connection} color="#8b5cf6" transparent opacity={0.3} lineWidth={1} />
        ))}
      </group>
    </>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <AnimatedNodes />
      </Canvas>
    </div>
  )
}
