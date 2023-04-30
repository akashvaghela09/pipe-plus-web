import './App.css';
import { Header, Sidepanel } from './components';
import { AllRoutes } from './routes';

function App() {

  return (
    <div className="App flex flex-col">
      <Header />
      <div className='w-full flex grow'>
        <Sidepanel />
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
