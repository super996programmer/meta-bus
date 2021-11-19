import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import StopDetail from './stopDetail';

const BusStop: FC = () => (
  <div>
    <div>This is Bus Stop Page</div>
    <Routes>
      <Route path="stopDetail" element={<StopDetail />} />
    </Routes>
  </div>
);

export default BusStop;
