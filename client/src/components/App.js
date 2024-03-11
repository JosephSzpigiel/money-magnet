import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const context = {}
  return(
    <div>
      <h1>COOL BEANS</h1>
      <Outlet context = {context}/>
    </div>
  )
}

export default App;
