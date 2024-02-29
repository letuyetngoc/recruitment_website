"use client";

import axios from "../../config/axios/axios-customize";
import React from "react";

const HomePage = () => {
  const handleClick = async() => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/account`)
    console.log(result)
  }
  return (

    <div>Home page
      <button onClick={handleClick}>click</button>
    </div>
  );
}


export default HomePage;
