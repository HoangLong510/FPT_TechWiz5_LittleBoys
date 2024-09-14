import React from "react";
import Backtotop from "~/components/Backtotop/Backtotop";


export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      {children}
      <Backtotop/>
    </div>
  );
}
