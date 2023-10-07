import React from 'react';

const Publicación = ({}) => {
    <div className=" px-4 py-4 rounded-lg border border-black mb-4 bg-white">
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1611095779068-9c2d3b6b6c5e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwY29sb3JmdWwlMjBjb2RlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          <p>Personita XD</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          correo@correo.com
                        </p>
                        <p className="text-sm text-gray-500">
                          10 de Febrero de 2021
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-start">
                        <button className="rounded-full p-2 bg-celeste">
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
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-700">
                      <img class="object-cover h-48 w-96 "></img>
                      <p>Esta es una descripción de la publicación xd</p>
                    </div>
                  </div>
                  
}
export default Publicación;