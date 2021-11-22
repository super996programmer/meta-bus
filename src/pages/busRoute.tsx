import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-size: ${({ theme }) => theme.fontSize.L};
`;

const BusRoute: FC = () => (
  <div>
    <Container>This is Bus Route Page</Container>
    <Outlet />
  </div>
);
export default BusRoute;
