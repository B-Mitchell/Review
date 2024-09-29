import './globals.css'
import { Providers } from './globalRedux/Provider'
import Navbar from './components/Navbar'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export const metadata = {
  title: 'Online Review System',
  description: 'Your trusted platform for honest reviews',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>
            <Navbar />
            <div className="user-container">
              {children}
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
