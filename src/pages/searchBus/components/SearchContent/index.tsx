import type { FC } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import theme from '@src/style/global-theme-variable';
import { SearchBusContext, ISearchResult } from '@src/pages/searchBus/context';

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
    color: #18A8FA;
    background: #F3F3F3;
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

    const GoToDetail = (routeInform: ISearchResult) => {
        // TODO: GO Detail Page
        // eslint-disable-next-line no-console
        console.log(routeInform)
    }

    return (
        <Container
            onClick={() => setIsInputFocus(false)}
            onTouchMove={() => setIsInputFocus(false)}>
            <ContentTitle>
                搜尋結果
            </ContentTitle>
            <ContentContainer>
                {Array.isArray(searchResult) && searchResult.length > 0 &&
                    searchResult.map(result => (
                        <ResultContainer
                            key={result.routeUID}
                            onClick={() => GoToDetail(result)}>
                            <RouteNameBlock>
                                <RouteName>
                                    {result.routeName}
                                </RouteName>
                            </RouteNameBlock>
                            <DepartureAndDestination>
                                {result.departureStopName} - {result.destinationStopName}
                            </DepartureAndDestination>
                        </ResultContainer>
                    ))
                }
                {Array.isArray(searchResult) && searchResult.length === 0 &&
                    <p>no result</p>
                } 
            </ContentContainer>
        </Container>
    )
}

export default SearchContent;