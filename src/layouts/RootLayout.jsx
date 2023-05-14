import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

const RootLayout = () => {
  return (
    <div>
      <header>
        <nav className='flex justify-between p-5 h-16 gap-5 w-full bg-gray-100 outline -outline-offset-8 outline-[#31acbf] shadow'>
          <div className='flex gap-5'>
            <img className='w-7 h-7 object-contain' src={logo} alt="Logo" />
            <h3 className=''>Web Scraper</h3>
          </div>

          <p>Made for <a href='https://olx.ba' className='underline' target='_blank'>olx.ba</a>, in plan for better functionality</p>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

export default RootLayout