import './App.css'
import { Welcome } from './components/Welcome';
import { ProjectProvider } from './core/contexts/ProjectContext';
import { UserProvider } from './core/contexts/UserContext';

function App() {

  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <Welcome></Welcome>
        </ProjectProvider>
      </UserProvider>
    </>
  )
}

export default App
