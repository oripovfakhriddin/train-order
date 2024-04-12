import { useEffect,useState } from "react";

const useScreenSize = (): number => {
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    setScreenSize(window.innerWidth);

    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
