import React from 'react';
import CreateBrand from '../components/modals/CreateBrand';
import CreateProduct from '../components/modals/CreateProduct';
import CreateType from '../components/modals/CreateType';

const Admin = () => {
  const [brandVisible, setBrandVisible] = React.useState(false);
  const [typeVisible, setTypeVisible] = React.useState(false);
  const [productVisible, setProductVisible] = React.useState(false);

  return (
    <div className="flex flex-row p-4">
      <button onClick={() => setTypeVisible(true)} className="btn btn-wide ml-4">
        Добавить Тип
      </button>

      <button onClick={() => setBrandVisible(true)} className="btn btn-wide ml-4">
        Добавить Бренд
      </button>

      <button onClick={() => setProductVisible(true)} className="btn btn-wide ml-4">
        Добавить Товар
      </button>

      <CreateBrand show={brandVisible} onClickHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onClickHide={() => setTypeVisible(false)} />
      <CreateProduct show={productVisible} onClickHide={() => setProductVisible(false)} />
    </div>
  );
};

export default Admin;
