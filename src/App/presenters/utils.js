import { AdminToken, OrdinaryToken, ShareEvent } from "../../globals";

export const sendJsonRequest = (url, request, callback, admin = false) => {
  const authHeader =
    "Token " + admin
      ? localStorage.getItem(AdminToken)
      : localStorage.getItem(OrdinaryToken);

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "same-origin",
      Authorizaion: authHeader,
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else return null;
    })
    .then((data) => {
      callback(data);
    });
};
