import { NavBar } from '$/components/navigation/navbar'
import '$/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='p-6 h-[1000px]'>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
