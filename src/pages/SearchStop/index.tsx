import { FC, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModalSheet from 'react-modal-sheet';
import Navbar from '@src/components/Navbar';
import useFetchTdxApi from '@src/api/useFetchTdxApi.hook';
import { fetchBusStation } from '@src/api/fetchBusStation';
import { CitySelectContext } from '@src/context/citySelect.context';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

const Sheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  border-radius: 30px 30px 0 0;
  background-color: #faf7f7;
`;

const SearchContainer = styled.div`
  display: flex;
  padding: 0 20px 20px;
  background: #faf7f7;
`;

const SearchStop: FC = () => {
  console.log('run');
  const { selectedCity } = useContext(CitySelectContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const { fetchData, data } = useFetchTdxApi(fetchBusStation);

  useEffect(() => {
    if (searchValue) {
      fetchData({
        city: selectedCity,
        queryOptions: {
          filter: { 'StationName/Zh_tw': { contains: searchValue } },
          top: 50,
        },
      });
    }
  }, [fetchData, searchValue, selectedCity]);

  const [isModalSheetOpen, setIsModalSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalSheetOpen(true);
  }, [isModalSheetOpen]);

  const handleSearchValueChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <Sheet
      isOpen={isModalSheetOpen}
      onClose={() => undefined}
      snapPoints={[0.95]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header disableDrag>
          <Header>
            <Navbar
              title="搜尋站牌"
              isShowBackToButton
              isShowCitySelectButton
            />
            <SearchContainer>
              <SearchBar setSearchValue={handleSearchValueChange} />
            </SearchContainer>
          </Header>
        </Sheet.Header>
        <Sheet.Content disableDrag>
          {data && data.length > 0 && (
            <SearchResult searchValue={searchValue} busStationData={data} />
          )}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default SearchStop;
