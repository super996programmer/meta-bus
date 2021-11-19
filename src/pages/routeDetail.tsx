import { FC } from 'react';
import { useParams } from 'react-router-dom';

const RouteDetail: FC = () => {
  const params = useParams();
  const { routeId } = params;
  return <div>This is Bus Route {routeId} </div>;
};
export default RouteDetail;
