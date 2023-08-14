import { useEffect } from 'react';
import './App.css';
import { Header, Sidepanel } from './components';
import { AllRoutes } from './routes';
import { useDispatch } from 'react-redux';
import { getUser, getSession, isValid, updateOnboardingStatus, saveData } from './utils';
import { setAuthStatus, setUser } from './redux/auth/actions';
import { setDeviceType } from './redux/app/actions';

function App() {
  const dispatch = useDispatch();

  const checkAuthStatus = async () => {

    const session = await getSession();

    if(!isValid(session)) {
      dispatch(setAuthStatus(false));
      console.log("User is not authenticated");
      return;
    }

    const user = await getUser();

    if (isValid(session) && isValid(user)) {
      const { aud, id, email, user_metadata } = user;

      if (!isValid(user_metadata.onboarded)) {
        console.log("Onboarding user");
        await updateOnboardingStatus(id, email);
      }

      if (aud === "authenticated") {
        dispatch(setAuthStatus(true));
        dispatch(setUser({ id: id, email: email }));
        saveData("user", { id: id, email: email });
        console.log("User authenticated");
      } else {
        dispatch(setAuthStatus(false));
        console.log("User is not authenticated");
      }
    } else {
      dispatch(setAuthStatus(false));
      console.log("User is not authenticated");
    }
  }

  const checkDeviceType = async () => {
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
      dispatch(setDeviceType("mobile"));
      saveData("deviceType", "mobile");
    } else {
      saveData("deviceType", "desktop");
    }
  }

  useEffect(() => {
    checkAuthStatus();
    checkDeviceType();
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
