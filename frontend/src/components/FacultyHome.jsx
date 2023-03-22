import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useLayoutEffect, useState } from "react";
import verifyToken from "../utils/verifyToken";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FacultyHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen flex items-center bg-slate-900">
      <Nav />

      <div className="h-2/3 w-3/4 shadow-md shadow-black mt-2 ml-10 bg-sky-900">
        <Menu as="div" className="relative w-full inline-block text-left">
          <div className="">
            <Menu.Button className="mt-0.5 justify-between inline-flex w-full px-4 py-2 text-md font-semibold text-white bg-stone-500 border border-stone-500 shadow-lg">
              Upcoming Exams
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2  mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="flex text-white text-md font-semibold w-full mt-2 origin-top-right bg-stone-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Exam 1
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Exam 2
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="mt-2 w-full inline-block text-left">
          <div>
            <Menu.Button className="justify-between inline-flex w-full px-4 py-2 text-md font-semibold text-white bg-stone-500 border border-stone-500 shadow-lg">
              Previous Exams
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="flex text-white text-md font-semibold w-full mt-2 origin-top-right bg-stone-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Exam 1
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Exam 2
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="flex flex-col w-1/3 h-2/3 shadow-md shadow-black bg-sky-900 mt-2 ml-10 mr-10">
        <h1 className="text-xl p-1 mt-16- font-semibold text-white text-center">
          Create Exam
        </h1>
        <div className="flex flex-col mt-8 w-full">
          <label htmlFor="exam-date" className="flex items-center mt-4">
            <span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
              Enter Exam Date:
            </span>
            <input
              type="date"
              id="exam-date"
              name="exam-date"
              className="p-1.5 mr-1 w-48"
            />
          </label>
          <label htmlFor="exam-date" className="flex items-center mt-4">
            <span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
              Enter Exam Duration:
            </span>
            <input
              type="time"
              id="exam-date"
              name="exam-date"
              className="p-1.5 mr-1 w-48"
            />
          </label>
          <div className="flex justify-end mt-3 mr-3">
          <div
                    class="justify-end [word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer 
                    items-center rounded-[16px] border border-stone-500  
                    bg-stone-500 py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-sm">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                className="w-3 h-3"
                >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                  />
              </svg>
            </a>      
        </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;