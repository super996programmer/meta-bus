import type { FC } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { SearchBusContext } from '@src/pages/searchBus/context';
import BusKeyBoard from '@src/components/KeyBoard';
import Icon from '@src/components/Icon';
import changeKeyBoard from '@icon/changeKeyBoard.svg';

const Container = styled.div`
    z-index: 99999999;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #F9F9F9;
`;

const ChangeKeyBoard = styled(Icon)`
    z-index: 999999999;
    position: absolute;
    top: -50px;
    right: 10px;
    width: 40px;
    height: 40px;
`;

const VirtualKeyBoard: FC= () => {
    const { isInputFocus, showBusKeyBoard, searchValue, setSearchValue, setShowBusKeyBoard } = useContext(SearchBusContext);

    if (isInputFocus && showBusKeyBoard) {
        return (
            <Container>
                <BusKeyBoard
                    value={searchValue}
                    setKeyValue={setSearchValue}                    
                />
                <ChangeKeyBoard path={changeKeyBoard} onClick={() => setShowBusKeyBoard(false)} />
            </Container>
        )
    } 
    
    return <></>
}

export default VirtualKeyBoard;