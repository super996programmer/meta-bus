import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@style/global-theme-variable';
import { Routes, Route } from 'react-router-dom';
import RouteDetail from './pages/routeDetail';
import Home from './pages/home';

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="routeDetail/:routeName/:routeUID/:subRouteUID"
        element={<RouteDetail />}
      />
    </Routes>
  </ThemeProvider>
);
export default App;
