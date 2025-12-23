import './App.css'
import { Welcome } from './components/Welcome';
import { ProjectProvider } from './core/contexts/ProjectContext';
import { TasksProvider } from './core/contexts/TasksContex';
import { UserProvider } from './core/contexts/UserContext';

function App() {

  return (
    <div className='app-container'>
      <UserProvider>
        <ProjectProvider>
          <TasksProvider>
            <Welcome></Welcome>
          </TasksProvider>
        </ProjectProvider>
      </UserProvider>
    </div>
  )
}

export default App
