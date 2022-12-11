import React from 'react';
import { observer } from 'mobx-react-lite';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { Context } from '../../main';

const CreateProduct = observer(({ show, onClickHide }) => {
  const { device } = React.useContext(Context);

  const [info, setInfo] = React.useState([]);

  const [name, setName] = React.useState('');

  const [price, setPrice] = React.useState('');

  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    try {
      formData.append('name', name);
      formData.append('price', `${price}`);
      formData.append('brandId', device.selectedBrand.id);
      formData.append('typeId', device.selectedType.id);
      formData.append('img', file);
      formData.append('info', JSON.stringify(info));
      createDevice(formData).then((data) => onClickHide());
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div show={show} onClickHide={onClickHide} className={show ? 'modal modal-open' : 'modal'}>
      <div className="modal-box w-11/12 max-w-2xl h-3/6">
        <h3 className="text-3xl font-bold items-center">Добавить Товар</h3>

        <div className="dropdown dropdown-bottom mr-6">
          <label tabIndex={0} className="btn mt-4">
            {device.selectedType.name || 'Выберите тип'}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-200 mt-2 rounded-box w-52">
            {device.types.map((type) => (
              <li onClick={() => device.setSelectedType(type)} key={type.id}>
                <a>{type.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="dropdown dropdown-bottom">
          <label tabIndex={0} className="btn mt-4">
            {device.selectedBrand.name || 'Выберите брэнд'}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-200 mt-2 rounded-box w-52">
            {device.brands.map((brand) => (
              <li onClick={() => device.setSelectedBrand(brand)} key={brand.id}>
                <a>{brand.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-4 mt-4 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Название..."
            className="input input-bordered input-primary w-full max-w-xs"
          />

          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            placeholder="Число..."
            className="input input-bordered input-primary w-full max-w-xs"
          />

          <input
            onChange={selectFile}
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <hr />

        <button onClick={addInfo} className="btn btn-outline btn-secondary mt-4">
          Добавить новое свойство!
        </button>

        {info.map((i) => (
          <div className="flex flex-row gap-3 mt-4" key={i.number}>
            <div className="flex flex-col">
              <input
                value={i.title}
                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                type="text"
                placeholder="Hазвание свойства..."
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col">
              <input
                value={i.description}
                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                type="text"
                placeholder="Описание свойства..."
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </div>

            <div className="flex flex-col">
              <button onClick={() => removeInfo(i.number)} className="btn btn-outline btn-error">
                Удалить!
              </button>
            </div>
          </div>
        ))}

        <div className="flex modal-action">
          <button onClick={addDevice} className="btn btn-outline btn-success">
            Добавить!
          </button>
          <button onClick={onClickHide} className="btn btn-outline btn-error">
            Закрыть!
          </button>
        </div>
      </div>
    </div>
  );
});

export default CreateProduct;
