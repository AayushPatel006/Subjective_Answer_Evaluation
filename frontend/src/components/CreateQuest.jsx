import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useLayoutEffect, useState } from "react";
import verifyToken from "../utils/verifyToken";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const createExam = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen flex items-center bg-slate-900 justify-center">
      <Nav />
      <div className="flex flex-col w-[700px] h-[500px] shadow-md shadow-black bg-sky-900 mt-16 ml-10 mr-10">
        <h1 className="text-2xl p-1 mt-16 font-semibold text-white text-center">
          Create Exam
        </h1>
        <div className="flex flex-col  mt-8 w-full">
          <label htmlFor="exam-date" className="flex items-center mt-4">
            <span className="ml-1 w-48 mr-1 justify-between text-md font-semibold text-white">
              Enter Exam Name:
            </span>
            <input
              type="textarea"
              id="exam-date"
              name="exam-date"
              className="p-1.5 rounded-md w-full mr-1 shadow-md"
            />
          </label>
          <label htmlFor="exam-date" className="flex items-center mt-4">
            <span className="ml-1 w-48 mr-1 justify-between text-md font-semibold text-white">
              Enter Question:
            </span>
            <textarea
              type="textarea"
              id="exam-date"
              name="exam-date"
              className="p-1.5 rounded-md w-full mr-1 shadow-md"
            />
          </label>
          <label htmlFor="exam-date" className="flex items-center mt-4">
            <span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
              Enter Solution:
            </span>
            <textarea
              type="textarea"
              id="exam-date"
              name="exam-date"
              className="p-1.5 rounded-md w-full mr-1 shadow-md"
            />
          </label>
          <div className="flex justify-end mt-3 mr-3">
            <div
              class="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-stone-500  
                    bg-stone-500 py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
            >
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
            <div
              class="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-stone-500  
                    bg-stone-500 py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
            >
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
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

export default createExam;
