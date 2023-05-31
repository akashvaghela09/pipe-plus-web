import { useEffect } from 'react';
import './App.css';
import { Header, Sidepanel } from './components';
import { AllRoutes } from './routes';
import { useDispatch } from 'react-redux';
import { getUser, getSession } from './utils';
import { setAuthStatus, setUser } from './redux/auth/actions';

function App() {
  const dispatch = useDispatch();

  const checkAuthStatus = async () => {

    const session = await getSession();
    if (session !== null) {
      const { aud, id, email } = await getUser();

      if (aud === "authenticated") {
        dispatch(setAuthStatus(true));
        dispatch(setUser({ id: id, email: email }));
      } else {
        dispatch(setAuthStatus(false));
        console.log("User is not authenticated");
      }
    } else {
      dispatch(setAuthStatus(false));
      console.log("User is not authenticated");
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <div className="App flex flex-col">
      <Header />
      <Sidepanel />
      <AllRoutes />
    </div>
  );
}

export default App;
