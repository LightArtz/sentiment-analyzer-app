"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create subtle particle network
    const particleCount = 80
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    // Create particles in a more spread out pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 15
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    // Very subtle particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Create subtle connecting lines
    const connections = []
    for (let i = 0; i < particleCount; i++) {
      const x1 = positions[i * 3]
      const y1 = positions[i * 3 + 1]
      const z1 = positions[i * 3 + 2]

      for (let j = i + 1; j < particleCount; j++) {
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]

        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)

        if (distance < 8 && Math.random() > 0.85) {
          const lineGeometry = new THREE.BufferGeometry()
          const linePositions = new Float32Array([x1, y1, z1, x2, y2, z2])
          lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.1,
          })

          const line = new THREE.Line(lineGeometry, lineMaterial)
          scene.add(line)
          connections.push(line)
        }
      }
    }

    camera.position.z = 15

    // Very slow, subtle animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Mouse interaction - subtle particle attraction
      const mouseInfluence = 0.0002
      particleSystem.rotation.x += 0.0005 + mouseRef.current.y * mouseInfluence
      particleSystem.rotation.y += 0.0008 + mouseRef.current.x * mouseInfluence

      connections.forEach((line) => {
        line.rotation.x += 0.0005 + mouseRef.current.y * mouseInfluence
        line.rotation.y += 0.0008 + mouseRef.current.x * mouseInfluence
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particles.dispose()
      particleMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 70%, #020617 100%)",
      }}
    />
  )
}
