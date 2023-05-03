import { useEffect, useState } from "react";

function useBoundingClientRect(className) {
  const [BoundingRect, setBoundingRect] = useState(0);
  useEffect(() => {
    const calculateComponentRect = () => {
      const myComponent = document.querySelector(className);
      const componentRect = myComponent.getBoundingClientRect();
      setBoundingRect(componentRect);
    };
    calculateComponentRect();
    window.addEventListener("resize", calculateComponentRect);
    return () => {
      window.removeEventListener("resize", calculateComponentRect);
    };
  }, []);

  return BoundingRect;
}

export default useBoundingClientRect;
