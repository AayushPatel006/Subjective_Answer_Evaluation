import React from 'react'
import Assess from '../assets/assessment.png'
const Nav = () => {

  return (
    <div className=' w-full absolute top-0 left-0'>
      <div className='md:flex shadow-md justify-between bg-sky-900 backdrop-blur py-6 md:px-10 px:7'>
        <div className='mx-10 flex font-bold text-1xl items-center font-[Arial] text-white'>
          <span>
            <img src={Assess} alt="assess" className='w-[25px] ht-[25px] ml-6 mx-1 flex' />
          </span>
          <h3 className='text-white font-semibold mt-1 hover:text-gray-300'>Assess</h3>
        </div>
        <ul className="mx-10 md:flex md:items-center md:pb-0 md:static bg-transparent
              md:w-auto md:pl-0 pl-4">
          <li className='md:ml-8 text-1xl md:my-0 my-7 mr-5 flex cursor-pointer'>
            <h3 className='text-white font-semibold mt-1 hover:text-gray-300'>Sign In</h3>
            <div
                    class="justify-end [word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer 
                    items-center rounded-[16px] border border-gray-200 border-dashed 
                    bg-[transparent] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-sm">
                    S
                </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav