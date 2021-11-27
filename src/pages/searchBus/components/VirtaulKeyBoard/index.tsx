import type { FC } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { SearchBusContext } from '@src/pages/searchBus/context';
import BusKeyBoard from '@src/components/KeyBoard';

const Container = styled.div`
    z-index: 99999999;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #F9F9F9;
`;

const VirtualKeyBoard: FC= () => {
    const { isInputFocus, searchValue, setSearchValue } = useContext(SearchBusContext);

    if (isInputFocus) {
        return (
            <Container>
                <BusKeyBoard
                    value={searchValue}
                    setKeyValue={setSearchValue}                    
                />
            </Container>
        )
    } 
    
    return <></>
}

export default VirtualKeyBoard;