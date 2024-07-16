'use client'
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

export function NavBar() {
  return (
    <nav className="flex sticky top-0 py-3">
      <h1 className="mr-auto">Furry Friends</h1>
      <ul className="flex gap-4">
        <li>Inicio</li>
        <li>Sobre</li>
        <li>Adopción</li>
        <li>Contacto</li>
        <li>
          <Button>¡Donar!</Button>
        </li>
      </ul>
    </nav>
  )
}

const VARIANTS = [''] as const

type ButtonProps = {
  variant: number
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-slate-50 text-slate-500 font-semibold h-10 px-5"
      {...props}
    >
      {children}
    </button>
  )
}
