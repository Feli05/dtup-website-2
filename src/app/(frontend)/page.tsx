import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="/DTUP-logo-RGB-01.png" />
          <Image
            alt="DTUP Logo"
            height={750}
            src="/DTUP-logo-RGB-01.png"
            width={750}
          />
        </picture>
        {!user && <h1>Welcome to the DTUP Admin Dashboard!</h1>}
        {user && <h1>Welcome back, {user.email}!</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
        </div>
      </div>
    </div>
  )
}
