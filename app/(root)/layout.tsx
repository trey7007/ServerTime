import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import Topbar from '@/components/shared/Topbar'
import Leftsidebar from '@/components/shared/Leftsidebar'
import Bottombar from '@/components/shared/Bottombar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Server Time',
  description: 'A scheduling app for resturant owners'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head> */}
        <body className={inter.className}>
          <Topbar />

          <main className="flex ">
            <Leftsidebar />
              <section className="main-page">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
