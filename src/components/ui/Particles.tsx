'use client'

import { useEffect, useRef } from 'react'

interface ParticlesProps {
  count?: number
  opacity?: number
  size?: [number, number]
  speed?: [number, number]
  color?: string
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
  maxLife: number
}

export function Particles({
  count = 30,
  opacity = 0.4,
  size = [1, 3],
  speed = [0.1, 0.4],
  color = '#C9A96E',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: size[0] + Math.random() * (size[1] - size[0]),
      speedX: (Math.random() - 0.5) * speed[0],
      speedY: -(Math.random() * speed[1] + 0.05), // Float upward
      opacity: Math.random() * opacity,
      life: 0,
      maxLife: 200 + Math.random() * 400,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.life++

        // Fade based on life
        const lifeRatio = 1 - p.life / p.maxLife
        const currentOpacity = p.opacity * lifeRatio

        // Reset if out of bounds or dead
        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.life = 0
          p.speedX = (Math.random() - 0.5) * speed[0]
          p.speedY = -(Math.random() * speed[1] + 0.05)
        }

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Subtle glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.floor(currentOpacity * 30).toString(16).padStart(2, '0')
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [count, opacity, size, speed, color])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
