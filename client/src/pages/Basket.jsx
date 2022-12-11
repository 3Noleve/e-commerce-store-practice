import React from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { getBasket, deleteFromBasket, deleteAllFromBasket } from '../http/deviceAPI';

const Basket = observer(() => {
  const { device } = React.useContext(Context);

  React.useEffect(() => {
    getBasket().then((data) => device.setBasket(data));
  }, []);

  let total = 0;
  {
    device.basket.map((price) => (total += Number(price.device.price)));
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const removeFromCart = (id) => {
    deleteFromBasket(id)
      .then((res) => alert(`Товар` + device.name + `удален из корзины!`))
      .then((res) => refreshPage());
  };

  const removeAllFromCart = () => {
    deleteAllFromBasket()
      .then((res) => console.log(`Товаров было удалено!`))
      .then((res) => refreshPage());
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold align-end">Итого:</h1>
        <h3 className="text-3xl font-bold ml-2 ">{total + ' $'} </h3>
      </div>
      <h2 onClick={() => removeAllFromCart()}>Удалить карзину!</h2>

      <hr></hr>

      {device.basket.map((product) => (
        <div className="card card-side w-2/3 mt-4 bg-base-100 shadow-xl">
          <div className="flex">
            <img
              className="w-40"
              src={import.meta.env.VITE_REACT_APP_API_URL + product.device.img}
              alt="image"
            />
          </div>

          <div className="card-body">
            <div className="flex flex-row">
              <h2 className="card-title">{product.device.name}</h2>

              <div className="btn-group btn-group-vertical inline-block ml-4 lg:btn-group-horizontal">
                <button className="btn">-</button>
                <button className="btn no-animation">0</button>
                <button className="btn">+</button>
              </div>
            </div>

            <h2 className="text-2xl font-black card-title">{product.device.price + ' $'}</h2>

            <div className="card-actions justify-end items-center">
              <button onClick={() => removeFromCart(product.id)} className="btn btn-error">
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Basket;
