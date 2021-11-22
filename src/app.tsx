import { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '@style/global-theme-variable';

const Container = styled.div`
  font-size: 14px;
`;

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <div>This is MetaBus - 公車地圖動態資訊</div>
    </Container>
  </ThemeProvider>
);
export default App;
