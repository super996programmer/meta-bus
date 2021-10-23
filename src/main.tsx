import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  color: #535353;
  font-size: 40px;
  border: 5px solid #5f5f5f;
`;

const Main: FC = () => (
  <Container>
    <span>Hello World! This is MetaBus!</span>
  </Container>
);

export default Main;
