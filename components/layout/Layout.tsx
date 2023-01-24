import Head from 'next/head';
import React, { Children } from 'react'
import Header from '../../components/header/Header';
import './Layout.module.scss'
const Layout = ({children} : any) => {
  return (
    <>
    <Header />
    
    {children}
    </>
  )
}

export default Layout