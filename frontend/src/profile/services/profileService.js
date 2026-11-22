import { request } from "./api";

export function getMyProfile() {
  return request("/profile/me");
}

export function updatePersonalInfo(personalInfo) {
  return request("/profile/me", {
    method: "PUT",
    body: personalInfo,
  });
}

export function updateLanguages(languages) {
  return request("/profile/me/languages", {
    method: "PUT",
    body: { languages },
  });
}
