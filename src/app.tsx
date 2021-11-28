import { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '@style/global-theme-variable';
import { Routes, Route, Navigate } from 'react-router-dom';
import NearbyStops from './pages/NearbyStops';
import SearchBus from './pages/searchBus';
import { CitySelectProvider } from './context/citySelect.context';
import { GoogleMapProvider } from './context/googleMap.context';
import RouteDetail from './pages/routeDetail';
import Home from './pages/home';
import BusStop from './pages/BusStop';
import SearchStop from './pages/SearchStop';

const Container = styled.div`
  font-size: 14px;
`;

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <CitySelectProvider>
        <GoogleMapProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="NearbyStops" element={<NearbyStops />} />
            <Route path="SearchBus" element={<SearchBus />} />
            <Route
              path="RouteDetail/:routeName/:routeUID"
              element={<RouteDetail />}
            />
            <Route path="SearchStop" element={<SearchStop />} />
            <Route path="BusStop/:stationID" element={<BusStop />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </GoogleMapProvider>
      </CitySelectProvider>
    </Container>
  </ThemeProvider>
);

export default App;
