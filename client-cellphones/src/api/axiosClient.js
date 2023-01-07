import axios from "axios";

var baseURL = process.env.REACT_APP_BASE_URL;

function axiosCreate() {
    let token = JSON.parse(localStorage.getItem("USER_TOKEN")? localStorage.getItem("USER_TOKEN"): null);
    var axiosClient = axios.create({
      baseURL: baseURL,
      timeout: 300000,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : null,
      },
      // when read object stringify to url
    });
    axiosClient.interceptors.response.use(
      (response) => {
        if (response) {
          console.log(response.request.responseURL);
        }
        if (response && response.data) {
          return response.data;
        }
  
        return response;
      },
      (error) => {
        if (error.response) {
          return error.response.data;
        } else if (error.request) {
          return error.request;
        } else {
          return error.message;
        }
      }
    );
    return axiosClient;
  }

export default axiosCreate;