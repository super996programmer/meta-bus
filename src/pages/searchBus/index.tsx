import { FC, useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Sheet, { SheetRef } from 'react-modal-sheet';
import Navbar from '@src/components/Navbar';
import { SearchBusContextProvider } from '@src/pages/searchBus/context';
import SearchInput from '@src/pages/searchBus/components/SearchInput';
import SearchContent from '@src/pages/searchBus/components/SearchContent';
import VirtualKeyBoard from '@src/pages/searchBus/components/VirtaulKeyBoard';

const SheetContainer = styled(Sheet)`
    border-radius: 30px 30px 0 0;    

    .react-modal-sheet-container {
        border-radius: 30px 30px 0 0 !important;
        display: flex;
    }

    .react-modal-sheet-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
`;

export interface ISearchResult {
    routeUID: string;
    routeName: string;
    departureStopName: string;
    destinationStopName: string;
}

const SearchBus: FC = () => {
    const [isOpenSheet, setIsOpenSheet] = useState(false);
    const ref = useRef<SheetRef>();

    const snapToTop = () => {
        // eslint-disable-next-line no-console
        console.log(ref.current)
        ref.current?.snapTo(0);
    }

    useEffect(() => {
        setIsOpenSheet(true);
    }, [])

    return (
        <SheetContainer
            isOpen={isOpenSheet}
            onClose={() => setIsOpenSheet(false)}
            snapPoints={[0.95, 0.5, 0.2]}
            initialSnap={0}
            ref={ref}
        >
            <SheetContainer.Container>
                <SearchBusContextProvider>
                    <SheetContainer.Header>
                        <Navbar
                            title="查詢公車"
                            isShowBackToButton
                            isShowCitySelectButton
                        />
                        <SearchInput snapToTop={snapToTop} />
                    </SheetContainer.Header>
                    <SheetContainer.Content disableDrag>
                        <SearchContent />
                    </SheetContainer.Content>
                    <VirtualKeyBoard />
                </SearchBusContextProvider>
            </SheetContainer.Container>
        </SheetContainer>
    )
}
export default SearchBus;
