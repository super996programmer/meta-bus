import type { FC } from 'react';
import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import theme from '@src/style/global-theme-variable';
import { SearchBusContext } from '@src/pages/searchBus/context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const ContentTitle = styled.p`
    font-size: ${theme.fontSize.S};
    color: #666666;
    margin-bottom: 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ResultContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const RouteNameBlock = styled.div`
    flex: 0 0 80px;
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
`;

const SearchContent: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { searchResult, setSearchResult } = useContext(SearchBusContext);


    useEffect(()=>{
        setSearchResult([
            {
                routeUID: "10132",
                routeName: "234",
                departureStopName: "板橋",
                destinationStopName: "西門"
            },
            {
                routeUID: "10133",
                routeName: "41",
                departureStopName: "板橋",
                destinationStopName: "西門"
            },
            {
                routeUID: "10134",
                routeName: "11",
                departureStopName: "板橋",
                destinationStopName: "西門"
            },
            {
                routeUID: "10135",
                routeName: "235",
                departureStopName: "板橋",
                destinationStopName: "西門"
            },
            {
                routeUID: "10136",
                routeName: "888",
                departureStopName: "板橋",
                destinationStopName: "西門"
            },
        ])
    }, [setSearchResult])

    return (
        <Container>
            <ContentTitle>
                搜尋結果
            </ContentTitle>
            <ContentContainer>
                {Array.isArray(searchResult) &&
                    searchResult.map(result => (
                        <ResultContainer key={result.routeUID}>
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
            </ContentContainer>
        </Container>
    )
}

export default SearchContent;