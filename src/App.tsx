import { AppShell } from './app/AppShell'
import { RealmProvider } from './context/RealmContext'

export function App() {
  return (
    <RealmProvider>
      <AppShell />
    </RealmProvider>
  )
}

export default App
