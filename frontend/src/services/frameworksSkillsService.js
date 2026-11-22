import { getMockSkills, saveMockSkills } from './mockFrameworksSkillsService'

const useMockApi =
  (import.meta.env.VITE_USE_MOCK_API ?? 'false').toLowerCase() === 'true'
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ??
  'http://localhost:8080').replace(/\/$/, '')

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
    let message = "Erreur lors de l'appel à l'API"

    try {
      const body = await response.json()
      if (body.message) {
        message = body.message
      }
    } catch {
      if (response.status === 401) {
        message = "Authentification requise"
      }
    }

    throw new Error(message)
  }

  return response.status === 204 ? [] : response.json()
}

export async function getSkills() {
  if (useMockApi) {
    return getMockSkills()
  }

  return requestSkills(`${apiBaseUrl}/api/developpeur/me/skills`)
}

export async function saveSkills(skills) {
  if (useMockApi) {
    return saveMockSkills(skills)
  }

  return requestSkills(`${apiBaseUrl}/api/developpeur/me/skills`, {
    method: 'PUT',
    body: JSON.stringify({ skills }),
  })
}
