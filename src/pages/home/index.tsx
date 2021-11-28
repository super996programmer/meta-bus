import { FC, useEffect, useState, useContext } from 'react';
import searchBusImg from '@img/searchBus.svg';
import searchStopImg from '@img/searchStop.svg';
import nearByStopImg from '@img/nearByStop.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CitySelectContext } from '@src/context/citySelect.context';
import ModalSheet from '../../components/ModalSheet';

const ActionImg = styled.img`
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  font-size: ${({ theme }) => theme.fontSize.XS};
`;

const SelectButton = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedCityDesc, openCityOptionsDialog } =
    useContext(CitySelectContext);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <ModalSheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MainContainer>
          <SelectButton
            onClick={() => {
              openCityOptionsDialog();
            }}
          >
            {selectedCityDesc}
            <span style={{ fontSize: '10px' }}>▼</span>
          </SelectButton>
          <ActionContainer>
            <Link to="SearchBus">
              <Action>
                <ActionImg
                  src={searchBusImg}
                  width="50px"
                  height="50px"
                  alt="img"
                />
                查詢公車
              </Action>
            </Link>
            <Link to="NearbyStops">
              <Action>
                <ActionImg
                  src={nearByStopImg}
                  width="50px"
                  height="50px"
                  alt="img"
                />
                附近站牌
              </Action>
            </Link>
            <Link to="SearchStop">
              <Action>
                <ActionImg
                  src={searchStopImg}
                  width="50px"
                  height="50px"
                  alt="img"
                />
                查詢站牌
              </Action>
            </Link>
          </ActionContainer>
        </MainContainer>
      </ModalSheet>
    </>
  );
};

export default Home;
