import React from 'react'
import Assess from '../assets/assessment.png'
const Nav = () => {

  return (
    <div className=' w-full absolute top-0 left-0'>
      <div className='md:flex justify-between bg-gray-400 backdrop-blur py-6 md:px-10 px:7'>
        <div className='mx-10 flex font-bold text-1xl items-center font-[Arial] text-white'>
          <span>
            <img src={Assess} alt="assess" className='w-[25px] ht-[25px] ml-6 mx-1 flex' />
          </span>
          Assess
        </div>
        <ul className="mx-10 md:flex md:items-center md:pb-0 md:static bg-transparent
              md:w-auto md:pl-0 pl-4">
          <li className='md:ml-8 text-1xl md:my-0 my-7 mr-5 flex cursor-pointer'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="mx-1 w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <h3 className='text-white font-semibold hover:text-gray-300'>Sign In</h3>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav