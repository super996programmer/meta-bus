import { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '@style/global-theme-variable';
import { Routes, Route } from 'react-router-dom';
import NearbyStops from './pages/NearbyStops';
import { CitySelectProvider } from './context/citySelect.context';
import { GoogleMapProvider } from './context/googleMap.context';

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
          </Routes>
        </GoogleMapProvider>
      </CitySelectProvider>
    </Container>
  </ThemeProvider>
);

export default App;
