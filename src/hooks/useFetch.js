import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

async function fetchData(uri, queryString) {
  // const defaultParams = {
  //   api_token: window.$user.api_token,
  // };
  const params = {
    // ...defaultParams,
    ...(queryString ? JSON.parse(queryString) : {}),
  };
  return await window.axios.get(BASE_URL + uri, {
    ...params,
    headers: { Authorization: `Bearer ${window.$api_token}` },
  });
}

/**
 * Simple hook to fetch data from an external api.It
 * passes the api token so you don't have to pass it manually
 * @param {string} uri - relative path to fetch data. e.g /patient-registration
 * @param {object} params - Query params e.g {registration_ID: 1}
 * @param {boolean} fetchOnMount - Determine if we should fetch data on component mount. The default value is true
 * @param {object} initialData - Default data
 * @param {Function} callback - Callback for response data
 * @returns {object}
 */
export function useFetch(
  uri,
  params = null,
  fetchOnMount = true,
  initialData = null,
  callback = null
) {
  const ignore = useRef();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryString = params ? JSON.stringify(params) : null;

  const doFetch = useCallback(() => {
    setLoading(true);
    setError(null);

    fetchData(uri, queryString)
      .then((response) => {
        if (!ignore.current) {
          const records = response.data;
          setData(
            typeof callback === "function" ? callback(response) : records
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!ignore.current) {
          setLoading(false);
          setError(error);
        }
      });
  }, [uri, queryString]);

  useEffect(() => {
    ignore.current = false;
    if (queryString || fetchOnMount) {
      doFetch();
    }

    return () => {
      ignore.current = true;
    };
  }, [uri, queryString, fetchOnMount]);

  return { data, loading, error, doFetch };
}

export default useFetch;
