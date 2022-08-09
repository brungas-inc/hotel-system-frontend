import React from "react";
import { BASE_URL } from "../utils/constants";

async function postData(uri, queryString) {
  const defaultParams = {
    api_token: window.$user.api_token,
  };
  const params = {
    ...defaultParams,
    ...(queryString ? JSON.parse(queryString) : {}),
  };
  return await window.axios.get(BASE_URL + uri, { params });
}

const usePost = () => {
  return <div>usePost</div>;
};

export default usePost;
