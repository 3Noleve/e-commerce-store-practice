import React from 'react';
import { useParams } from 'react-router-dom';
import { addToBasket, fetchOneDevice } from '../http/deviceAPI';

const DevicePage = () => {
  const [device, setDevice] = React.useState({ info: [] });

  const { id } = useParams();

  React.useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  const [showAlert, setShowAlert] = React.useState(false);

  const addedToCart = () => {
    const formData = new FormData();
    formData.append('deviceId', id);

    addToBasket(formData)
      .then((res) => setShowAlert(true))

      .then((res) =>
        setTimeout(() => {
          setShowAlert(false);
        }, 2000),
      );
  };

  return (
    <div className="flex flex-col gap-y-4 p-8">
      <div className="flex flex-col gap-x-8 gap-y-4 p-4 h-32 rounded-box ">
        <h2 className="text-2xl">{device.name}</h2>

        {showAlert && (
          <div className="toast toast-end toast-top">
            <div className="alert alert-info">
              <div>
                <span className="font-bold">
                  {`Товар ` + device.name + ` был добавлен в корзину`}
                </span>
              </div>
              <div className="flex-none">
                <button onClick={() => setShowAlert(false)} className="btn btn-sm">
                  Закрыть!
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="items-center justify-center">
          <div className="rating">
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" checked />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />

            <div className="ml-4">
              <h1>Всего отзывов: {device.rating}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <figure>
          <img
            className="w-96 h-96"
            src={import.meta.env.VITE_REACT_APP_API_URL + device.img}
            alt="GAZ"
          />
        </figure>

        <div className="flex flex-col items-center">
          <div className="card bg-base-300 ml-6 rounded-box">
            <div className="card-body">
              <h2 className="card-title text-5xl p-4">{device.price} / шт</h2>

              {/* <div className="card-actions flex">
                <button className="flex w-24 h-20 flex-col btn btn-outline ml-2 btn-secondary rounded">
                  <a>1</a>
                  <a className="mt-4 text-xs">159$ / шт</a>
                </button>

                <button className="flex w-24 h-20 flex-col btn btn-outline ml-2 btn-secondary rounded">
                  <a>2</a>
                  <a className="mt-4 text-xs">350$ / шт</a>
                </button>

                <button className="flex w-24 h-20 flex-col btn btn-outline ml-2 btn-secondary rounded">
                  <a>3</a>
                  <a className="mt-4 text-xs">500$ / шт</a>
                </button>
              </div>

              <h1 className="mt-2">Объем мл:</h1>

              <div className="card-actions flex mt-2">
                <button className="flex flex-row btn btn-sm btn-outline ml-2 btn-secondary rounded">
                  <a className="text-xs">330</a>
                </button>

                <button className="flex flex-row btn btn-sm btn-outline ml-2 btn-secondary rounded">
                  <a className="text-xs">500</a>
                </button>
              </div>

              <h1 className="mt-2">Название вкуса</h1>

              <div className="card-actions flex mt-2">
                <button className="flex flex-row btn btn-sm btn-outline ml-2 btn-secondary rounded">
                  <a className="text-xs">Coca-Cola</a>
                </button>

                <button className="flex flex-row btn btn-sm btn-outline ml-2 btn-secondary rounded">
                  <a className="text-xs">Vanilla</a>
                </button>

                <button className="flex flex-row btn btn-sm btn-outline ml-2 btn-secondary rounded">
                  <a className="text-xs">Zero</a>
                </button>
              </div> */}

              <button className="btn btn-primary mt-6" onClick={addedToCart}>
                Добавить в корзину
              </button>

              <div className="card-body">
                <h1 className="text-2xl">Описание</h1>
                {device.info.map((info) => (
                  <div key={info.id}>
                    {info.title} : {info.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-80 bg-base-300 ml-6 rounded-box gap-x-8 gap-y-4">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
