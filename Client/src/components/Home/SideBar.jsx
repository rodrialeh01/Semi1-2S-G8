import SmileOutlined from "@ant-design/icons/SmileOutlined";
import React from "react";
import { Outlet } from 'react-router-dom';

function SideBar() {
  return (
    <div className="flex fixed">
      <div className=" bg-black text-gray-500 p-5 text-xs lg:text-sm w-[16rem] scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[16rem] hidden md:inline-flex fixed border-r border-celeste">
        <div className="space-y-4">
          <div className="">
            <img
              className="h-32 w-32 rounded-full mx-auto"
              src="http://imgfz.com/i/0Oj6e3w.png"
            ></img>
          </div>

          <hr className="border-t-[0.1px] border-gray-900 w-[12rem]" />

          <div className="text-center">
            <button className="items-center space-x-2 hover:text-white">
              <img
                className="h-32 w-32 rounded-full mx-auto"
                src="http://imgfz.com/i/idQw9sx.png"
                alt=""
              />

              <h1 className="mt-2 text-xl font-semibold">Nombre Apellido</h1>
              <p className="mt-2">correo@correo.com</p>
            </button>
          </div>

          <hr className="border-t-[0.1px] border-gray-900 w-[12rem]" />
          <button className="flex items-center space-x-2 hover:text-celeste_claro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <p>Home</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-celeste_claro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>

            <p>Solicitudes de Amistad</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-celeste_claro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>

            <p>Chat</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-celeste_claro">
            <SmileOutlined style={{ fontSize: "20px" }} />
            <p>ChatBot</p>
          </button>

          <button className="flex items-center space-x-2 hover:text-celeste_claro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <p>Buscar Amigos</p>
          </button>
        </div>
      </div>
      <div className="flex justify-between"></div>
      <Outlet/>
    </div>
  );
}

export default SideBar;
