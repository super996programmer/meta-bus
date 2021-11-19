import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BusRoute from '@src/pages/busRoute';
import BusStop from '@src/pages/busStop';
import RouteDetail from '@src/pages/routeDetail';
import { fetchBusRoute } from './api/fetchBusRoute';
import useFetchTdxApi from './api/useFetchTdxApi.hook';

const Container = styled.div`
  height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #535353;
  font-size: 32px;
  margin: 20px 0;
`;

const Button = styled.button`
  border: 2px solid #a1a1a1;
  border-radius: 5px;
  padding: 5px 10px;
`;

const Page = styled.div`
  margin: 30px auto;
  font-size: 28px;
  text-align: center;
`;

const App: FC = () => {
  const nevigate = useNavigate();
  const {
    fetchData: fetchBusRouteData,
    isLoading: isFetchBusRouteDataLoading,
    data: BusRouteData,
  } = useFetchTdxApi(fetchBusRoute);
  const {
    fetchData: fetchSpecificBusRouteData,
    isLoading: isFetchSpecificBusRouteDataLoading,
    data: specificBusRouteData,
  } = useFetchTdxApi(fetchBusRoute);
  useEffect(() => {
    fetchBusRouteData();
    fetchSpecificBusRouteData({
      queryOptions: {
        filter: { 'RouteName/Zh_tw': { contains: '306' } },
      },
    });
  }, [fetchBusRouteData, fetchSpecificBusRouteData]);
  return (
    <Container>
      <Nav>
        <div>Hello World! This is MetaBus!</div>
        <Button onClick={() => nevigate('route')}>To BusRoute!</Button>
        <Button onClick={() => nevigate('stop')}>To BusStop!</Button>
      </Nav>
      <Page>
        <div>
          <span>BusRoutes: </span>
          {isFetchBusRouteDataLoading
            ? 'Loading'
            : BusRouteData?.map((route) => route.RouteID).join(', ')}
        </div>
        <span>
          Specific Bus Route:{' '}
          {isFetchSpecificBusRouteDataLoading
            ? 'Loading'
            : specificBusRouteData
                ?.map((route) => route.RouteName.Zh_tw)
                .join(', ')}
        </span>
        <Routes>
          <Route path="route" element={<BusRoute />}>
            <Route path=":routeId" element={<RouteDetail />} />
          </Route>
          <Route path="stop/*" element={<BusStop />} />
        </Routes>
      </Page>
    </Container>
  );
};

export default App;
