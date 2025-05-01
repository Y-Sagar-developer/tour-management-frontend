import React from 'react'
import Header from '../Header/Header'
import Footer from './../Footer/Footer'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  )
}

export default Layout