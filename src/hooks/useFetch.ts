import React from "react";

export const useFetch = async () => {
  const data = await fetch("http://190.221.207.224:8090/empresas");
  const response = await data.json();

  const handleLog = async () => {
    console.log(response);
  };
  return {
    handleLog
  };
};
