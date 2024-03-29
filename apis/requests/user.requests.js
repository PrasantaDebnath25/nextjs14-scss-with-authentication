import { TOKEN_KEY } from "../../utils/constants";
import axios from "axios";
import { getCookie } from "cookies-next";
import api from "../../utils/Axios";

export const updateUserProfile = (payload) => {
  return axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/updateProfile`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(TOKEN_KEY),
    },
  });
};

export const fetchMe = () => {
  const header = {
    headers: { 'Authorization': `Bearer ${getCookie(TOKEN_KEY)}` }
  }
  return api.get('user/me', header).then(response => response)
    .catch(err => err);
};
