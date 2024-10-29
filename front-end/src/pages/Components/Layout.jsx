import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatButton from './ChatButton'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <ChatButton />
    <Footer />

    </>
  )
}

export default Layout
