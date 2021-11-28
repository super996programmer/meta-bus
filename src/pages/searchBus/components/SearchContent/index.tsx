import type { FC } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import theme from '@src/style/global-theme-variable';
import { SearchBusContext, ISearchResult } from '@src/pages/searchBus/context';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100%;
`;

const ContentTitle = styled.p`
  font-size: ${theme.fontSize.S};
  color: #666666;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RouteNameBlock = styled.div`
  flex: 0 0 80px;
  margin-right: 20px;
`;

const RouteName = styled.div`
  display: inline-block;
  font-size: ${theme.fontSize.S};
  font-weight: bolder;
  color: #18a8fa;
  background: #f3f3f3;
  padding: 8px;
`;

const DepartureAndDestination = styled.div`
  flex: 1 0 auto;
  font-size: ${theme.fontSize.S};
  color: #000000;
  max-width: calc(100% - 100px);
`;

const SearchContent: FC = () => {
  const { searchResult, setIsInputFocus } = useContext(SearchBusContext);
  const navigate = useNavigate();

  const GoToDetail = (routeInform: ISearchResult) => {
    const { routeName, routeUID } = routeInform;
    navigate(`/RouteDetail/${routeName}/${routeUID}`);
  };

  return (
    <Container
      onClick={() => setIsInputFocus(false)}
      onTouchMove={() => setIsInputFocus(false)}
    >
      <ContentTitle>搜尋結果</ContentTitle>
      <ContentContainer>
        {Array.isArray(searchResult) &&
          searchResult.length > 0 &&
          searchResult.map((result) => (
            <ResultContainer
              key={result.routeUID}
              onClick={() => GoToDetail(result)}
            >
              <RouteNameBlock>
                <RouteName>{result.routeName}</RouteName>
              </RouteNameBlock>
              <DepartureAndDestination>
                {result.departureStopName} - {result.destinationStopName}
              </DepartureAndDestination>
            </ResultContainer>
          ))}
      </ContentContainer>
    </Container>
  );
};

export default SearchContent;
