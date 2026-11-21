import { useEffect, useState } from 'react'
import { getSkills, saveSkills } from '../services/frameworksSkillsService'
import './FrameworksSkills.css'

const predefinedSkills = [
  'React',
  'Angular',
  'Vue',
  'Node.js',
  'Express',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel',
  'Flutter',
  'TensorFlow',
  'PyTorch',
  'Pandas',
  'NumPy',
]

function normalizeCustomSkill(value) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function normalizeSkill(value) {
  const trimmedValue = value.trim()
  const predefinedMatch = predefinedSkills.find(
    (skill) => skill.toLowerCase() === trimmedValue.toLowerCase(),
  )

  return predefinedMatch || normalizeCustomSkill(trimmedValue)
}

function FrameworksSkills() {
  const [skills, setSkills] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadSkills() {
      setIsLoading(true)
      setSaveMessage('')

      try {
        const storedSkills = await getSkills()
        if (isMounted) {
          setSkills(storedSkills)
        }
      } catch {
        if (isMounted) {
          setSaveMessage("Erreur lors du chargement")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSkills()
    return () => {
      isMounted = false
    }
  }, [])

  function addSkill() {
    const normalizedSkill = normalizeSkill(inputValue)

    if (!normalizedSkill) {
      setValidationMessage("Veuillez saisir une compétence")
      return
    }

    if (normalizedSkill.length > 40) {
      setValidationMessage("La compétence ne doit pas dépasser 40 caractères")
      return
    }

    if (skills.some((skill) => skill.toLowerCase() === normalizedSkill.toLowerCase())) {
      setValidationMessage("Cette compétence existe déjà")
      return
    }

    if (skills.length >= 30) {
      setValidationMessage("Maximum 30 compétences")
      return
    }

    setSkills((currentSkills) => [...currentSkills, normalizedSkill])
    setInputValue('')
    setValidationMessage('')
  }

  function removeSkill(skillToRemove) {
    setSkills((currentSkills) =>
      currentSkills.filter((skill) => skill !== skillToRemove),
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    addSkill()
  }

  async function handleSave() {
    setIsSaving(true)
    setSaveMessage('')

    try {
      await saveSkills(skills)
      setSaveMessage("Compétences enregistrées")
    } catch {
      setSaveMessage("Erreur lors de l'enregistrement")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="frameworks-skills">
      <section className="frameworks-card" aria-labelledby="frameworks-title">
        <h1 id="frameworks-title">Frameworks et bibliothèques</h1>

        {isLoading ? (
          <p className="frameworks-status" role="status">Chargement...</p>
        ) : (
          <>
            <form className="frameworks-form" onSubmit={handleSubmit}>
              <label htmlFor="frameworks-input">Ajouter une compétence</label>
              <div className="frameworks-input-row">
                <input
                  id="frameworks-input"
                  name="framework"
                  type="text"
                  list="frameworks-suggestions"
                  value={inputValue}
                  maxLength={40}
                  placeholder="Exemple : React"
                  onChange={(event) => {
                    setInputValue(event.target.value)
                    setValidationMessage('')
                  }}
                />
                <datalist id="frameworks-suggestions">
                  {predefinedSkills.map((skill) => (
                    <option key={skill} value={skill} />
                  ))}
                </datalist>
                <button type="submit" className="frameworks-add-button">
                  Ajouter
                </button>
              </div>
            </form>

            {validationMessage && (
              <p className="frameworks-error" role="alert">
                {validationMessage}
              </p>
            )}

            {skills.length === 0 ? (
              <p className="frameworks-empty">
                Aucune compétence ajoutée
              </p>
            ) : (
              <ul className="frameworks-tags" aria-label="Compétences ajoutées">
                {skills.map((skill) => (
                  <li key={skill.toLowerCase()}>
                    <span>{skill}</span>
                    <button
                      type="button"
                      aria-label={`Supprimer ${skill}`}
                      onClick={() => removeSkill(skill)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              className="frameworks-save-button"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </button>

            {saveMessage && (
              <p
                className="frameworks-status"
                role={saveMessage === "Compétences enregistrées" ? "status" : "alert"}
              >
                {saveMessage}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default FrameworksSkills
