import { observer } from 'mobx-react-lite';
import React from 'react';
import { Context } from '../main';

const TypeBar = observer(() => {
  const { device } = React.useContext(Context);

  return (
    <>
      <ul className="menu p-6 overflow-y-auto mt-4 w-80 bg-base-100 rounded-box text-base-content">
        {device.types.map((type) => (
          <li className="p-1 bordered" onClick={() => device.setSelectedType(type)} key={type.id}>
            <a className={type.id === device.selectedType.id ? 'active' : 'bg-secondary'}>
              {type.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
});

export default TypeBar;
