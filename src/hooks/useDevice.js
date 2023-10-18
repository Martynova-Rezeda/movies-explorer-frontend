import { useEffect, useState } from "react";
import { DEVICE_PARAMS } from "../utils/constants";
import { filterMovies, shortFilterMovies } from "../utils/filter";

const useDevice = ({ movies, isChecked, initialName }) => {
  const [windowSize, setWindowsSize] = useState(window.innerWidth);
  const [numberMovies, setNumberMovies] = useState(0);
  const [isBtnMoreEnabled, setIsBtnMoreEnabled] = useState(false);

  const handleWindowSize = () => {
      setWindowsSize(window.innerWidth)}
  
  //прослушиватели событий изменения размеров окна
  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  //Меняем состояние количества  отрисованных фильмов при определенном разрешении экрана
  useEffect(() => {
    if (windowSize <= DEVICE_PARAMS.desktop.maxSize && 
      windowSize >= DEVICE_PARAMS.desktop.minSize) {
      setNumberMovies(DEVICE_PARAMS.desktop.maxMovies);
    } else if (
      windowSize < DEVICE_PARAMS.desktop.minSize&&
      windowSize > DEVICE_PARAMS.pad.maxSize
    ) {
      setNumberMovies(DEVICE_PARAMS.pad.maxMovies);
    } else {
      setNumberMovies(DEVICE_PARAMS.mobile.maxMovies);
    }
    
  }, [windowSize, movies]);

//Меняем состояние кнопки (есть/нет) на странице 
  useEffect(() => {
    const foundMovies = filterMovies(movies, initialName);
    const filterIsCheckedMovies = shortFilterMovies(foundMovies, isChecked);
    filterIsCheckedMovies.length > numberMovies
      ? setIsBtnMoreEnabled(true)
      : setIsBtnMoreEnabled(false);
  }, [numberMovies, movies, isChecked, initialName]);

//Функция клика по кнопке еще
  const handleBtnMore = () => {
    if (windowSize <= DEVICE_PARAMS.desktop.maxSize && windowSize >= DEVICE_PARAMS.desktop.minSize) {
      setNumberMovies(numberMovies + DEVICE_PARAMS.desktop.moreMovies);
    } else if (
      windowSize < DEVICE_PARAMS.desktop.minSize &&
      windowSize >= DEVICE_PARAMS.pad.maxSize
    ) {
      setNumberMovies(numberMovies + DEVICE_PARAMS.pad.moreMovies);
    } else {
      setNumberMovies(numberMovies + DEVICE_PARAMS.mobile.moreMovies);
    }
  };


   const resetMore = () => {
    if (windowSize <= DEVICE_PARAMS.desktop.maxSize && 
      windowSize >= DEVICE_PARAMS.desktop.minSize) {
      setNumberMovies(DEVICE_PARAMS.desktop.maxMovies);
    } else if (
      windowSize < DEVICE_PARAMS.desktop.minSize&&
      windowSize > DEVICE_PARAMS.pad.maxSize
    ) {
      setNumberMovies(DEVICE_PARAMS.pad.maxMovies);
    } else {
      setNumberMovies(DEVICE_PARAMS.mobile.maxMovies);
    }

   }

  return { numberMovies, setNumberMovies, isBtnMoreEnabled, handleBtnMore, resetMore};
};




export default useDevice;
