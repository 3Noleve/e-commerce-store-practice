import { observer } from 'mobx-react-lite';
import React from 'react';
import { Context } from '../main';

const BrandBar = observer(() => {
  const { device } = React.useContext(Context);

  return (
    <>
      <div className="content">
        <ul className="menu menu-horizontal w-auto rouded-box p-6 mt-4 text-base-content">
          {device.brands.map((brand) => (
            <li
              className="p-1 bordered"
              onClick={() => device.setSelectedBrand(brand)}
              key={brand.id}>
              <a
                className={
                  brand.id === device.selectedBrand.id ? 'active' : 'bg-success-content bg-outline'
                }>
                {brand.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default BrandBar;
