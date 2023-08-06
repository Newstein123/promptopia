import '@styles/global.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'
import Feeds from '@components/Feeds'

export const metadata = {
  title: 'Promptopia',
  description: 'Generated by Ai',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
       <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />      
            {children}
            
          </main>
       </Provider>
      </body>
    </html>
  )
}
