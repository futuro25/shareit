import { NavLink, Navigate, Route, Routes, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import React, { useState } from "react";
import logo from './logo.png';
import './App.css';
import _, { capitalize } from 'lodash';
import Home from './components/Home';
import Share from './components/Share';
import { cn, tw } from './utils/utils';
import { config } from './config';

export default function App() {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") || null;

  if (phone?.length) {
    return (
      <Routes>
        <Route path="/share" element={<Share phone={phone} />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/">
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="bg-black">
              <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                  <div className="border-t border-gray-200 text-center pt-8">
                    <h1 className="text-9xl font-bold text-gray-400">404</h1>
                    <h1 className="text-6xl font-medium py-8">Pagina no encontrada</h1>
                    <p className="text-2xl pb-8 px-12 font-medium">Ups! La pagina que esta buscando no existe. Vuelva al inicio haciendo click en el boton.</p>
                    <button className="bg-black hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6" onClick={() => window.location.assign('/')}>
                      IR AL INICIO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}


function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function Layout({ children }) {
  return (
    <div className="flex flex-col w-full h-screen text-gray-700">
      <nav className={cn("flex justify-between items-center pr-6 w-full h-16 bg-gray-500 text-white", {isProduction: "bg-black"})}>
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => window.location.assign('/')}>
          <img src={logo} alt="logo" className="ml-4 w-10 h-10 object-cover" />
          <h1 className="inline-block text-2xl sm:text-3xl text-white pl-2 tracking-tight ">{config.brand}</h1>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        <main className="flex-1 bg-white w-full">{children}</main>
      </div>

      {/* Footer logo */}
      {
        isMobile ?
          <div className="flex gap-2 right-4 fixed bottom-6 z-20 justify-center items-center px-3 h-10 bg-white rounded-full shadow">
            <span className="text-xs tracking-widest leading-none text-gray-300">&copy; {new Date().getFullYear()}</span>
            <span className="text-xs">{config.brand}</span>
          </div>
          :
          <div className="flex gap-2 fixed bottom-6 z-20 justify-center items-center px-3 h-10 bg-white rounded-full shadow">
            <span className="text-xs tracking-widest leading-none text-gray-300">&copy; {new Date().getFullYear()}</span>
            <span className="text-xs">{config.brand}</span>
          </div>
      }
    </div>
  )
}

