import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from './services/firebase';
import { login, logout } from './slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <h2>It works</h2>
    </div>
  );
}

export default App;
