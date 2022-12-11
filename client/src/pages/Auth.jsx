import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userAPI';
import { Context } from '../main';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
  const { user } = React.useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <div className="card justify-center items-center m-auto w-2/3 p-12 mt-12 shadow-2xl ">
        <div className="card-body w-1/3">
          <h1 className="m-auto"> {isLogin ? 'Авторизация' : 'Регистрация'} </h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Введите email..."
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Пароль</span>
            </label>

            <input
              type="password"
              placeholder="Введите пароль..."
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6 justify-between ">
            {isLogin ? (
              <div>
                Нет Аккаунта?
                <NavLink className="label-alt link link-hover ml-4" to={REGISTRATION_ROUTE}>
                  Заругистрируйся!
                </NavLink>
              </div>
            ) : (
              <div>
                Есть Аккаунт?
                <NavLink className="label-alt link link-hover ml-4" to={LOGIN_ROUTE}>
                  Войдите!
                </NavLink>
              </div>
            )}
          </div>

          <div className="form-control mt-6">
            <button onClick={click} className="btn btn-primary">
              {isLogin ? 'Войти' : 'Регистрация'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Auth;
