import { FC, useEffect, useState } from 'react';
import searchBusImg from '@img/searchBus.svg';
import searchStopImg from '@img/searchStop.svg';
import nearByStopImg from '@img/nearByStop.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ModalSheet from '../../components/ModalSheet';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
`;

const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <ModalSheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MainContainer>
          <ActionContainer>
            <Link to="SearchBus">
              <img src={searchBusImg} alt="img" />
              查詢公車
            </Link>
            <Link to="NearbyStops">
              <img src={searchStopImg} alt="img" />
              附近站牌
            </Link>
            <Link to="SearchStop">
              <img src={nearByStopImg} alt="img" />
              查詢站牌
            </Link>
          </ActionContainer>
        </MainContainer>
      </ModalSheet>
    </>
  );
};

export default Home;
