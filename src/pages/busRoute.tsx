import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const BusRoute: FC = () => (
  <div>
    <div>This is Bus Route Page</div>
    <Outlet />
  </div>
);
export default BusRoute;
