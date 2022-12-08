import React, {useEffect, useState} from 'react'
import { Layout } from '../components'

import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div>
     <div className="wave"></div>
     <div className="wave"></div>
     <div className="wave"></div>
  </div>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
