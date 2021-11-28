import { FC, useEffect, useState } from 'react';
import searchBusImg from '@img/searchBus.svg';
import searchStopImg from '@img/searchStop.svg';
import nearByStopImg from '@img/nearByStop.svg';
import styled from 'styled-components';
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
            <img src={searchBusImg} alt="img" />
            <img src={searchStopImg} alt="img" />
            <img src={nearByStopImg} alt="img" />
          </ActionContainer>
        </MainContainer>
      </ModalSheet>
    </>
  );
};

export default Home;
