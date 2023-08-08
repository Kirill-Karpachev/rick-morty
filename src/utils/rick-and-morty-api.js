import {
  RICK_AND_MORTY_API
} from "./const";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getCharacters(page) {
  return request(`${RICK_AND_MORTY_API}/character/?page=${page}`);
}

export function getCharacterById(id) {
  return request(`${RICK_AND_MORTY_API}/character/${id}`);
}