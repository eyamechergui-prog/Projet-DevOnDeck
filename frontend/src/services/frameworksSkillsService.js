import { getMockSkills, saveMockSkills } from './mockFrameworksSkillsService'

const useMockApi = true

function getToken() {
  return window.localStorage.getItem('token')
}

async function requestSkills(url, options = {}) {
  const token = getToken()

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error("Erreur lors de l'appel à l'API")
  }

  return response.status === 204 ? [] : response.json()
}

export async function getSkills() {
  if (useMockApi) {
    return getMockSkills()
  }

  return requestSkills('/api/developers/me/skills')
}

export async function saveSkills(skills) {
  if (useMockApi) {
    return saveMockSkills(skills)
  }

  return requestSkills('/api/developers/me/skills', {
    method: 'PUT',
    body: JSON.stringify({ skills }),
  })
}
