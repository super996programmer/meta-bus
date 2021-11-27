/* eslint-disable no-console */
import type { FC, ChangeEvent } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import theme from '@src/style/global-theme-variable';
import { SearchBusContext } from '@src/pages/searchBus/context';
import Icon from '@src/components/Icon';
import searchIconPath from '@img/searchIcon.svg';
import closeIconPath from '@img/grayCircleClose.svg';

const Container = styled.div`
    display: flex;
    padding: 20px;
    background: #FAF7F7;
`;

const InputContainer = styled.div`
    flex-grow: 1;
    position: relative;
    background: #EEEEEE;
    border-radius: 50px;
`;

const InputBar = styled.input`
    font-size: ${theme.fontSize.S};
    width: 100%;
    padding: 10px 18px;
`;

const InputIcon = styled(Icon)<{isFocus: boolean}>`
    position: absolute;
    right: ${({isFocus}) => isFocus ? '11px' : '4px'};
    top: ${({isFocus}) => isFocus ? '11px' : '4px'};
    width: ${({isFocus}) => isFocus ? '18px' : '32px'};
    height: ${({isFocus}) => isFocus ? '18px' : '32px'};
`;

const CancelText = styled.button`
    font-size: ${theme.fontSize.S};
    color: #666666;
    padding: 0 8px;
    cursor: pointer;
`;

const SearchInput: FC = () => {
    const {
        searchValue,
        setSearchValue,
        isInputFocus,
        setIsInputFocus,
        setSearchResult,
        setHasSearched,
    } = useContext(SearchBusContext);

    const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleBlur = (e: any) => {
        // if click outside the SearchInput Component, loses focus
        if(!e.currentTarget.contains(e.relatedTarget)) {
            // setIsFocus(false)
            // console.log('---- Lose Focus -----')
            // console.log(e.currentTarget)
            // console.log(e.relatedTarget)
        }
        // console.log('---- Focus -----')
        // console.log(e.currentTarget)
        // console.log(e.relatedTarget)
    }

    const handleIconClick = () => {
        if (isInputFocus) {
            setSearchValue('')
            return;
        }

        // TODO: Fire API
        // eslint-disable-next-line no-console
        console.log('Fire API')
        const fakedResult = [
            {
                routeUID: "10132",
                routeName: "234",
                departureStopName: "板橋",
                destinationStopName: "西門"
            }
        ];
        setSearchResult(fakedResult);
        setHasSearched(true);
    }

    const cancelInput = () => {
        setSearchValue('')
        setIsInputFocus(false)
    }

    return (
        <Container
            onBlur={handleBlur}>
            <InputContainer>
                <InputBar
                    type='text'
                    placeholder='請輸入公車號碼與關鍵字'
                    value={searchValue}
                    onChange={handleSetValue}
                    onFocus={() => setIsInputFocus(true)}
                />
                <InputIcon
                    isFocus={isInputFocus}
                    path={isInputFocus ? closeIconPath: searchIconPath}
                    onClick={handleIconClick}
                />
            </InputContainer>
            { isInputFocus &&
                <CancelText onClick={cancelInput}>
                    取消
                </CancelText>
            }
        </Container>
    )
}

export default SearchInput