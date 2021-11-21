import { FC, useState } from 'react'
import styled from 'styled-components';
import BusKeyBoard from '@src/components/KeyBoard';
import SearchHeader from './components/SearchHeader';

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 30px 30px 0 0;    
`;

const SearchInput = styled.div`
    padding: 2rem;
`;

const SearchBus: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchValue, setSearchValue] = useState('');

    const handleValueInput = (e: any) => {
        setSearchValue(e.target.value)
    }

    const handleClickKeyboard = (key: string) => {
        setSearchValue(key)
    }

    return (
        <PageContainer>
            <SearchHeader />
            <SearchInput>
                <input
                    type='text'
                    value={searchValue}
                    onChange={handleValueInput}
                />
            </SearchInput>
            <BusKeyBoard
                value={searchValue}
                setKeyValue={handleClickKeyboard}
            />
        </PageContainer>
    )
}
export default SearchBus;
