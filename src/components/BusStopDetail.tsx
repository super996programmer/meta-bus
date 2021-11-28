import { FC, useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';
import { BusStationWithRoutesInfo } from '@src/model';
import Navbar from '@src/components/Navbar';
import BusRoutesOfStationInfo from '@src/components/BusRoutesOfStationInfo';
import busStopIcon from '@icon/busStop.svg';
import busStopBgMap from '@icon/busStopBgMap.svg';
import navigateIcon from '@icon/navigate.svg';

interface Props {
  busStationWithRoutesInfo: BusStationWithRoutesInfo;
  goBackAction: () => void;
}

const Content = styled.div`
  padding: 20px;
  padding-bottom: 45vh;
`;

const BusStopInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
  background: #e9fbff url(${busStopBgMap});
`;

const BusStopTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.M};
  font-weight: bold;
  color: #18a8fa;
`;

const BusStopAddress = styled.div`
  font-size: ${({ theme }) => theme.fontSize.S};
  color: #666666;
`;

const NavigateButton = styled.a`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`;

const BusStopDetail: FC<Props> = ({
  busStationWithRoutesInfo,
  goBackAction,
}) => {
  const { StationName, StationAddress, StationPosition, BusRoutesOfStation } =
    busStationWithRoutesInfo;
  const { PositionLat, PositionLon } = StationPosition;

  const [isModalSheetOpen, setIsModalSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalSheetOpen(true);
  }, []);

  return (
    <Sheet
      isOpen={isModalSheetOpen}
      onClose={() => undefined}
      snapPoints={[0.95, 0.5, 0.2]}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header>
          <Navbar
            title={StationName.Zh_tw}
            isShowBackToButton
            onClickBackToButtonAction={goBackAction}
            isShowCitySelectButton={false}
          />
        </Sheet.Header>
        <Sheet.Content disableDrag>
          <Content>
            <BusStopInfo>
              <img src={busStopIcon} width="40" alt="Bus Stop" />
              <div>
                <BusStopTitle>{StationName.Zh_tw}</BusStopTitle>
                <BusStopAddress>{StationAddress}</BusStopAddress>
              </div>
              <NavigateButton
                href={
                  PositionLat && PositionLon
                    ? `https://www.google.com/maps/dir/?api=1&destination=${PositionLat},${PositionLon}`
                    : ''
                }
                target="_blank"
              >
                <img src={navigateIcon} width="35" alt="Navigate" />
              </NavigateButton>
            </BusStopInfo>
            <BusRoutesOfStationInfo busRoutesOfStation={BusRoutesOfStation} />
          </Content>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BusStopDetail;
