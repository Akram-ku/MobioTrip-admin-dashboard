import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function useFetch(url, { method = "GET", headers, body } = {}) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  async function request() {
    try {
      const response = await axios({
        url,
        method,
        headers,
        data: body,
      });

      setData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      } else if (error.response) {
        setErrorStatus(error.response.status);
      } else {
        setErrorStatus(error.message);
      }
    }
  }

  async function appendData(newData) {
    try {
      const response = await axios.post(url, newData, { headers });

      const submitted = Object.values(response.data)[0];

      const newState = { ...data };
      Object.values(newState)[0].push(submitted);

      setData(newState);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login", {
          state: {
            previousUrl: location.pathname,
          },
        });
      } else if (error.response) {
        setErrorStatus(error.response.status);
      } else {
        setErrorStatus(error.message);
      }
    }
  }

  return { request, appendData, data, errorStatus };
}
