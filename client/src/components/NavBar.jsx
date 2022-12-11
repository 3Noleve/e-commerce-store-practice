import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  const { user } = React.useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <NavLink to={SHOP_ROUTE} className="btn btn-ghost normal-case text-xl">
            SHBS
          </NavLink>
        </div>
        {user.isAuth ? (
          <div className="navbar-end">
            <button onClick={() => navigate(ADMIN_ROUTE)} className="btn ml-2">
              Админ панель
            </button>
            <button onClick={() => logOut()} className="btn ml-2">
              Выйти
            </button>

            <button onClick={() => navigate(BASKET_ROUTE)} className="btn btn-primary ml-2">
              Корзина
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            <a onClick={() => navigate(LOGIN_ROUTE)} className="btn btn-success ml-2">
              Авторизация
            </a>
          </div>
        )}
      </div>
    </>
  );
});

export default NavBar;
