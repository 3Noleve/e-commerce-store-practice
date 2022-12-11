import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToBasket } from '../http/deviceAPI';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();

  const [rating, setRating] = React.useState(0);

  const addedToCart = () => {
    const formData = new FormData();
    formData.append('deviceId', device.id);
    addToBasket(formData).then((res) => alert(`Товар ` + device.name + ` был добавлен в корзину!`));
  };

  return (
    <>
      <div className="card card-bordered mb-4">
        <figure onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
          <img src={import.meta.env.VITE_REACT_APP_API_URL + device.img} alt="Cola" />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-base">{device.name}</h2>
          <h2 className="card-title">{`${device.price}` + '$'}</h2>

          <div className="card-actions justify-between items-center">
            <button onClick={addedToCart} className="btn btn-primary">
              В корзину
            </button>
            <div>{rating}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceItem;
