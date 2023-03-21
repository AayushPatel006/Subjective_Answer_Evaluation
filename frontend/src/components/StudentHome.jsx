import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useLayoutEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const StudHome = () => {

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
              Current Exams
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
        <div className="w-full">
          <div class="flex justify-center">
            <div class="mt-0.5 mb-1 xl:w-96">
              <div class="relative mb-1 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-black outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                />
                <button
                  class="relative z-[2] flex items-center bg-stone-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-sm shadow-gray-600 transition duration-150 ease-in-out hover:bg-zinc-900 hover:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class=" flex flex-col justify-center">
          <div className="mb-2 rounded-sm w-full bg-stone-500  p-1 items-center shadow-md">
            <h1 className="ml-2 text-lg text-white font-semibold">
              Previous Exams:
            </h1>
          </div>
          <div>
          <ul className="bg-stone-500 shadow-sm text-semibold text-md p-1 text-white">
            <li className="flex justify-between mb-1">
                <h1 className="mt-0.5 ml-2 text-white font-semibold">
                Exam 1
                </h1>
                <div
                    class="justify-end [word-wrap: break-word] mr-2 flex h-[32px] cursor-pointer 
                    items-center rounded-[16px] border border-white border-dashed 
                    bg-[transparent] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-sm">
                    Score
                </div>
            </li>
            <li className="flex justify-between">
                <h1 className="mt-0.5 ml-2 text-white font-semibold">
                Exam 2
                </h1>
                <div
                    class="justify-end [word-wrap: break-word] mr-2 flex h-[32px] cursor-pointer 
                    items-center rounded-[16px] border border-white border-dashed 
                    bg-[transparent] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-sm">
                    Score
                </div>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudHome;