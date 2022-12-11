import React from 'react';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, onClickHide }) => {
  const [value, setValue] = React.useState('');

  const addBrand = () => {
    if (value === '') {
      alert('Введите значение!');
      return null;
    } else {
      createBrand({ name: value }).then((data) => {
        setValue('');
        onClickHide();
      });
    }
  };

  return (
    <div show={show} onClickHide={onClickHide} className={show ? 'modal modal-open' : 'modal'}>
      <div className="modal-box relative">
        <h3 className="text-xl font-bold">Добавить Бренд</h3>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Название бренда..."
          className="input input-bordered input-primary w-full max-w-sm mt-4"
        />

        <div className="modal-action">
          <button onClick={addBrand} className="btn btn-outline btn-success">
            Добавить!
          </button>
          <button onClick={onClickHide} className="btn btn-outline btn-error">
            Закрыть!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
