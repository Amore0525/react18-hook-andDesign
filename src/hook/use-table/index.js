import { useState } from "react";
export const useTable = (params = {}) => {
  const id = params.id || "render-body";
  const offset = params.offset || 40;
  const [tableHeight, setHeight] = useState();

  const getHeight = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const table = document.getElementById(id);
        setHeight(table.offsetHeight - offset);
        resolve();
      });
    });
  };

  return {
    tableHeight,
    getHeight,
  };
};
