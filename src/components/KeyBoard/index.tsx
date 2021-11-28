import type { FC, Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { CitySelectContext } from '@src/context/citySelect.context';
import { SearchBusContext, ISearchResult } from '@src/pages/searchBus/context';
import KeyButtonList, { IKeyButtonList } from './setting/keyButtonList';

const Container = styled.div`
  padding: 1rem;
  background: #f9f9f9;
`;

const KeyBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 4px 7px;
  max-width: 375px;
  margin: 0 auto;
`;

const KeyButton = styled.div<{ color?: string }>`
  cursor: pointer;
  background: #ffffff;
  border-radius: 10px;
  font-size: 20px;
  padding: 8px;
  text-align: center;
  color: ${({ color }) => color || '#000'};
`;

interface IBusKeyBoard {
  value: string;
  setKeyValue: Dispatch<SetStateAction<string>>;
}

const BusKeyBoard: FC<IBusKeyBoard> = (props) => {
  const { value, setKeyValue } = props;
  const { selectedCity } = useContext(CitySelectContext);
  const { setSearchResult } = useContext(SearchBusContext);

  const handleClickKey = (keySetting: IKeyButtonList) => {
    switch (keySetting.type) {
      case 'Line': {
        setKeyValue(keySetting.value);

        // TODO: 待抽 Hook
        fetch(
          `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${selectedCity}/${keySetting.value}?$top=30&$format=JSON`
        )
          .then((res) => res.json())
          .then((res) => {
            const searchResult: ISearchResult[] = res.map((result: any) => ({
              routeUID: result.RouteUID,
              routeName: result.RouteName.Zh_tw,
              departureStopName: result.DepartureStopNameZh,
              destinationStopName: result.DestinationStopNameZh,
            })) as ISearchResult[];

            setSearchResult(searchResult);
          })
          .catch(() => {
            setSearchResult([]);
          });

        break;
      }
      case 'Text': {
        const newValue = value + keySetting.value;
        setKeyValue(newValue);

        // TODO: 待抽 Hook
        fetch(
          `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${selectedCity}/${newValue}?$top=30&$format=JSON`
        )
          .then((res) => res.json())
          .then((res) => {
            const searchResult: ISearchResult[] = res.map((result: any) => ({
              routeUID: result.RouteUID,
              routeName: result.RouteName.Zh_tw,
              departureStopName: result.DepartureStopNameZh,
              destinationStopName: result.DestinationStopNameZh,
            })) as ISearchResult[];

            setSearchResult(searchResult);
          })
          .catch(() => {
            setSearchResult([]);
          });

        break;
      }
      case 'Clear': {
        setKeyValue('');
        setSearchResult([]);
        break;
      }
      default:
        setKeyValue(keySetting.value);
    }
  };

  return (
    <Container>
      <KeyBoardContainer>
        {KeyButtonList.map((keySetting) => (
          <KeyButton
            key={`key-button-${keySetting.value}`}
            color={keySetting.color}
            onClick={() => handleClickKey(keySetting)}
          >
            {keySetting.value}
          </KeyButton>
        ))}
      </KeyBoardContainer>
    </Container>
  );
};

export default BusKeyBoard;
