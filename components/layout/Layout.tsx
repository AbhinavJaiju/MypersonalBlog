import React, { Children } from 'react'
import Header from '../../components/header/Header'

const Layout = ({children} : any) => {
  return (
    <>
    <Header />
    {children}
    </>
  )
}

export default Layout