'use client'

export function NavBar() {
  return (
    <nav className="flex sticky top-0 py-3">
      <h1 className="mr-auto">Furry Friends</h1>
      <ul className="flex gap-4">
        <li>Inicio</li>
        <li>Sobre</li>
        <li>Adopción</li>
        <li>Contacto</li>
        <li>Donar</li>
      </ul>
    </nav>
  )
}
