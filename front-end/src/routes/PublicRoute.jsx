import React from "react";
import Header from "../layouts/client/Header/Header";
import{Outlet} from 'react-router-dom' 
import PlayBar from "../components/PlayBar/PlayBar";

export default function PublicRoute() {
  return (
    <>
      <div>
        <div className="fixed top-0 left-0 z-20 w-full">
          <Header />
        </div>
        <div className="p-5 mt-[70px]">
          <Outlet/>
        </div>
        <div className="fixed bottom-0 z-10 w-full">
            <PlayBar/>
        </div>
      </div>
    </>
  );
}
