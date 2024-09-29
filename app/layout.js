import './globals.css'
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
            <Navbar />
            <div className="user-container">
              {children}
            </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
