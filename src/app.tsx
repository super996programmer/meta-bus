import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BusRoute from '@src/pages/busRoute';
import BusStop from '@src/pages/busStop';
import RouteDetail from '@src/pages/routeDetail';
import useFetchTdxApi from './api/useFetchTdxApi.hook';
import { fetchBusRoute } from './api/fetchBusRoute';
import { BusRouteDirectionEnum } from './api/constants';

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
  const { fetchData, isLoading, data } = useFetchTdxApi(fetchBusRoute);
  useEffect(() => {
    fetchData({
      routeName: '306',
    });
  }, [fetchData]);
  return (
    <Container>
      <Nav>
        <div>Hello World! This is MetaBus!</div>
        <Button onClick={() => nevigate('route')}>To BusRoute!</Button>
        <Button onClick={() => nevigate('stop')}>To BusStop!</Button>
      </Nav>
      <Page>
        <div>
          <span>Bus: </span>
          {isLoading
            ? 'Loading'
            : data?.map((item) => (
                <div>
                  <span>
                    StopName:{' '}
                    {item.SubRoutes?.map((route) =>
                      route.Direction === BusRouteDirectionEnum.Departure
                        ? '去程'
                        : '返程'
                    ).join(', ')}{' '}
                  </span>
                </div>
              ))}
        </div>
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
