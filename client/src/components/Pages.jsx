import React from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';

const Pages = observer(() => {
  const { device } = React.useContext(Context);

  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className="btn-group">
      {pages.map((page) => {
        <button
          key={page}
          className={device.page === page ? 'btn btn-active' : 'btn'}
          onClick={() => device.setPage(page)}>
          {page}
        </button>;
      })}
    </div>
  );
});

export default Pages;
