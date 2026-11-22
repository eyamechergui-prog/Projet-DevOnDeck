let storedSkills = []

export async function getMockSkills() {
  await Promise.resolve()
  return [...storedSkills]
}

export async function saveMockSkills(skills) {
  await Promise.resolve()
  storedSkills = [...skills]
  return [...storedSkills]
}
