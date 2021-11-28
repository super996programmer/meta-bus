/* eslint-disable no-console */
import type { FC, ChangeEvent } from 'react';
import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '@src/style/global-theme-variable';
import { CitySelectContext } from '@src/context/citySelect.context';
import { SearchBusContext, ISearchResult } from '@src/pages/searchBus/context';
import Icon from '@src/components/Icon';
import searchIconPath from '@img/searchIcon.svg';
import closeIconPath from '@img/grayCircleClose.svg';

const Container = styled.div`
  display: flex;
  padding: 0 20px 20px;
  background: #faf7f7;
`;

const InputContainer = styled.div`
  flex-grow: 1;
  position: relative;
  background: #eeeeee;
  border-radius: 50px;
`;

const InputBar = styled.input`
  font-size: ${theme.fontSize.S};
  width: 100%;
  padding: 10px 18px;
`;

const InputIcon = styled(Icon)<{ isFocus: boolean }>`
  position: absolute;
  right: ${({ isFocus }) => (isFocus ? '11px' : '4px')};
  top: ${({ isFocus }) => (isFocus ? '11px' : '4px')};
  width: ${({ isFocus }) => (isFocus ? '18px' : '32px')};
  height: ${({ isFocus }) => (isFocus ? '18px' : '32px')};
`;

const CancelText = styled.button`
  flex-basis: 50px;
  font-size: ${theme.fontSize.S};
  color: #666666;
  padding: 0 8px;
  cursor: pointer;
`;

interface ISearchInput {
  snapToTop: () => void | undefined;
}

const SearchInput: FC<ISearchInput> = (props) => {
  const { snapToTop } = props;
  const inputEl = useRef<HTMLInputElement>(null);

  const {
    searchValue,
    setSearchValue,
    isInputFocus,
    setIsInputFocus,
    showBusKeyBoard,
    setShowBusKeyBoard,
    setSearchResult,
  } = useContext(SearchBusContext);

  const { selectedCity } = useContext(CitySelectContext);

  const handleInputFocus = () => {
    if (showBusKeyBoard && !!inputEl.current) {
      inputEl.current.blur();
    }

    setIsInputFocus(true);
    snapToTop();
  };

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    // TODO: 待抽 Hook
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${selectedCity}/${e.target.value}?$top=30&$format=JSON`
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
  };

  const handleIconClick = () => {
    if (isInputFocus) {
      setSearchValue('');
      return;
    }

    // TODO: 待抽 Hook
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${selectedCity}/${searchValue}?$top=30&$format=JSON`
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
  };

  const cancelInput = () => {
    setSearchValue('');
    setIsInputFocus(false);
    setShowBusKeyBoard(true);
  };

  useEffect(() => {
    setSearchResult([]);
  }, [selectedCity, setSearchResult]);

  return (
    <Container>
      <InputContainer>
        <InputBar
          ref={inputEl}
          type="text"
          placeholder="請輸入公車號碼與關鍵字"
          value={searchValue}
          onChange={handleSetValue}
          onFocus={handleInputFocus}
        />
        <InputIcon
          isFocus={isInputFocus}
          path={isInputFocus ? closeIconPath : searchIconPath}
          onClick={handleIconClick}
        />
      </InputContainer>
      {isInputFocus && <CancelText onClick={cancelInput}>取消</CancelText>}
    </Container>
  );
};

export default SearchInput;
