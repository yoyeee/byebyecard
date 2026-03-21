import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { DEFAULT_THEME_ID, applyTheme } from './themes'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [themeId, setThemeId] = useState(
    () => localStorage.getItem('theme') || DEFAULT_THEME_ID
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // 套用主題 CSS 變數
  useEffect(() => {
    applyTheme(themeId)
  }, [themeId])

  const handleThemeChange = (id) => {
    setThemeId(id)
    localStorage.setItem('theme', id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rage-bg">
        <div className="text-4xl animate-bounce">💢</div>
      </div>
    )
  }

  return user
    ? <HomePage user={user} themeId={themeId} onThemeChange={handleThemeChange} />
    : <LoginPage />
}
