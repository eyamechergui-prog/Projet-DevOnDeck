import { request } from "./api";

export function getMyProfile() {
  return request("/api/developpeur/me/profile");
}

export function updateProfile(profile) {
  return request("/api/developpeur/me/profile", {
    method: "PUT",
    body: profile,
  });
}
