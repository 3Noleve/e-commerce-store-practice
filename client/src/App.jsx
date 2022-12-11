import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from './main';
import { check } from './http/userAPI';

const App = observer(() => {
  const { user } = React.useContext(Context);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center text-center h-96">
        <button className="btn btn-secondary btn-lg loading">Загрузка...</button>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
