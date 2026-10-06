import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Мои задачи',
  description: 'Список дел на каждый день',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <header>
          <Link href="/" className="logo">Мои задачи</Link>
          <nav><Link href="/">Список дел</Link><Link href="/about/">О проекте</Link></nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
