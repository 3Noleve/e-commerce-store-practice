import React from 'react';
import { observer } from 'mobx-react-lite';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { Context } from '../main';

const Shop = observer(() => {
  const { device } = React.useContext(Context);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, device.page, device.limit).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  React.useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <>
      <div className="flex">
        <div className="flex">
          <TypeBar />
        </div>

        <div className="flex flex-col">
          <BrandBar />

          <div className="container">
            <DeviceList />
          </div>

          <div className="flex justify-start">
            <Pages />
          </div>
        </div>
      </div>
    </>
  );
});

export default Shop;
