import { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '@style/global-theme-variable';
import { Routes, Route } from 'react-router-dom';
import NearbyStops from './pages/NearbyStops';
import SearchBus from './pages/searchBus';
import { CitySelectProvider } from './context/citySelect.context';
import { GoogleMapProvider } from './context/googleMap.context';
import BusStop from './pages/BusStop';

const Container = styled.div`
  font-size: 14px;
`;

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <CitySelectProvider>
        <GoogleMapProvider>
          <Routes>
            <Route path="NearbyStops" element={<NearbyStops />} />
            <Route path="SearchBus" element={<SearchBus />} />
			<Route path="BusStop/:stationID" element={<BusStop />} />
          </Routes>
        </GoogleMapProvider>
      </CitySelectProvider>
    </Container>
  </ThemeProvider>
);

export default App;
