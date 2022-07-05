import React, { useEffect, useState } from "react";

const getStoragedValue = (key, initialValue) => {
  const value = JSON.parse(localStorage.getItem(key));
  if (value) return value;

  return initialValue;
};

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getStoragedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
