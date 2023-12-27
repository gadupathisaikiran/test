import { useContext } from "react";
import AppContext from "../context/AppContext/AppContext";

const useAppState = () => {
	return useContext(AppContext);
};

export default useAppState;
