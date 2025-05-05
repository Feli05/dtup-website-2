import React from 'react'
import './styles.css'

export const metadata = {
  description: 'DTUP Website CMS',
  title: 'DTUP Website CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
