import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { setUserInformation } from "../../store/slices/UserSlice";
// import { RootState } from "../../store/store";

const useAxios = () => {
  const navigate = useNavigate();

  // const userState = useSelector((state: RootState) => state.user);
  // const token = userState.token;

  const fetchData = async (
    params: AxiosRequestConfig,
    bLocal: boolean = true,
    query: string = ""
  ) => {
    try {
      if (bLocal) {
        axios.defaults.baseURL = "http://" + window.location.hostname + ":8080";
      } else {
        axios.defaults.baseURL = "https://api.themoviedb.org/3";
        params.url +=
          `?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR` + query;
      }
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const result = await axios.request(params);
      return result;
    } catch (err) {
      const error = err as AxiosError;
      const errorCode = error.response?.status;
      // if (errorCode === 401) {
      //   navigate("/auth");
      // }
    }
  };

  return { fetchData };
};

export default useAxios;
