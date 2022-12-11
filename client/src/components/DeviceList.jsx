import React from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = React.useContext(Context);

  return (
    <ul className="grid grid-cols-5 gap-x-8 p-6">
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </ul>
  );
});

export default DeviceList;
