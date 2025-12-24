import './App.css'
import { Welcome } from './components/Welcome';
import { ProjectProvider } from './core/contexts/ProjectContext';
import { TasksProvider } from './core/contexts/TasksContex';
import { UserProvider } from './core/contexts/UserContext';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {

  return (
    <div id="app-container" className='app-container'>
      <StyledEngineProvider injectFirst>
        <UserProvider>
          <ProjectProvider>
            <TasksProvider>
              <Welcome></Welcome>
            </TasksProvider>
          </ProjectProvider>
        </UserProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
