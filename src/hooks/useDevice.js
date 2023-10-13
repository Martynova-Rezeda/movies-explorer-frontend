import { useEffect, useState } from "react";
import { DEVICE_PARAMS } from "../utils/constants";
import { filterMovies, shortFilterMovies } from "../utils/filter";

const useDevice = ({ movies, isChecked, initialName }) => {
  const [windowSize, setWindowsSize] = useState(window.screen.width);
  const [numberMovies, setNumberMovies] = useState(0);
  const [isBtnMoreEnabled, setIsBtnMoreEnabled] = useState(false);

  const handleWindowSize = () => {
    setWindowsSize(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  useEffect(() => {
    if (windowSize >= DEVICE_PARAMS.desktop.maxSize) {
      setNumberMovies(DEVICE_PARAMS.desktop.maxMovies);
    } else if (
      windowSize < DEVICE_PARAMS.desktop.maxSize &&
      windowSize >= DEVICE_PARAMS.pad.maxSize
    ) {
      setNumberMovies(DEVICE_PARAMS.pad.maxMovies);
    } else {
      setNumberMovies(DEVICE_PARAMS.mobile.maxMovies);
    }
  }, [windowSize, movies]);


  useEffect(() => {
    const foundMovies = filterMovies(movies, initialName);
    const filterIsCheckedMovies = shortFilterMovies(foundMovies, isChecked);
    filterIsCheckedMovies.length > numberMovies
      ? setIsBtnMoreEnabled(true)
      : setIsBtnMoreEnabled(false);
  }, [numberMovies, movies, isChecked, initialName]);

  const handleBtnMore = () => {
    if (windowSize >= DEVICE_PARAMS.desktop.maxSize) {
      setNumberMovies(numberMovies + DEVICE_PARAMS.desktop.moreMovies);
    } else if (
      windowSize < DEVICE_PARAMS.desktop.maxSize &&
      windowSize >= DEVICE_PARAMS.pad.maxSize
    ) {
      setNumberMovies(numberMovies + DEVICE_PARAMS.pad.moreMovies);
    } else {
      setNumberMovies(numberMovies + DEVICE_PARAMS.mobile.moreMovies);
    }
  };

  return { numberMovies, isBtnMoreEnabled, handleBtnMore };
};

export default useDevice;
