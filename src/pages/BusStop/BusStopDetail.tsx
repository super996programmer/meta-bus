import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactModalSheet from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';
import { BusStationWithRoutesInfo } from '@src/model';
import Navbar from '@src/components/Navbar';
import BusStopInfo from '@src/components/BusStopInfo';

const Sheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

interface Props {
  busStationWithRoutesInfo: BusStationWithRoutesInfo;
}

const BusStopDetail: FC<Props> = ({ busStationWithRoutesInfo }) => {
  const navigate = useNavigate();
  const [isModalSheetOpen, setIsModalSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalSheetOpen(true);
  }, []);

  const { StationName } = busStationWithRoutesInfo;
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
            onClickBackToButtonAction={() => {
              navigate(-1);
            }}
            isShowCitySelectButton={false}
          />
        </Sheet.Header>
        <Sheet.Content disableDrag>
          <BusStopInfo busStationWithRoutesInfo={busStationWithRoutesInfo} />
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BusStopDetail;
