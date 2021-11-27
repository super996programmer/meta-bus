import { FC, useState, useEffect } from 'react'
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { SearchBusContextProvider } from './context';
import SearchHeader from './components/SearchHeader';
import SearchInput from './components/SearchInput';
import SearchContent from './components/SearchContent';
import VirtualKeyBoard from './components/VirtaulKeyBoard';

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
    const [selectedCity, setSelectedCity] = useState('Taipei');

    useEffect(() => {
        setIsOpenSheet(true);
    }, [])

    return (
        <SheetContainer
            isOpen={isOpenSheet}
            onClose={() => setIsOpenSheet(false)}
            snapPoints={[0.95, 0.5, 0.2]}
            initialSnap={0}
        >
            <SheetContainer.Container>
                <SearchBusContextProvider>
                    <SheetContainer.Header>
                        <SearchHeader
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                        />
                        <SearchInput />
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
