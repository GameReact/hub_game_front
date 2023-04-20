import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

const useAxios = () => {
  const navigate = useNavigate();

  // const userState = useSelector((state: RootState) => state.user);
  // const token = userState.token;
  const { state } = useContext(UserContext);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const token = state.token;
      axios.defaults.baseURL = "http://" + window.location.hostname + ":8080";
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const result = await axios.request(params);
      return result;
    } catch (err) {
      const error = err as AxiosError;
      const errorCode = error.response?.status;
      if (errorCode === 401) {
        navigate("/auth");
      }
    }
  };

  return { fetchData };
};

export default useAxios;
