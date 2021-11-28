import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactModalSheet from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';
import { BusStationWithRoutesInfo } from '@src/model';
import Navbar from '@src/components/Navbar';
import BusStopInfo from '@src/components/BusStopInfo';
import { BusStation } from '@src/api/model';

const Sheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

interface Props {
  busStationInfo: BusStation;
  busStationWithRoutesInfo?: BusStationWithRoutesInfo;
}

const BusStopDetail: FC<Props> = ({
  busStationInfo,
  busStationWithRoutesInfo,
}) => {
  const navigate = useNavigate();
  const [isModalSheetOpen, setIsModalSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalSheetOpen(true);
  }, []);

  const { StationName } = busStationInfo;

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
          {busStationWithRoutesInfo && (
            <BusStopInfo busStationWithRoutesInfo={busStationWithRoutesInfo} />
          )}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BusStopDetail;
