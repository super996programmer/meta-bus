import type { FC, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import theme from '@src/style/global-theme-variable';
import ArrowLeft from '@img/arrowLeft.svg';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.fontSize.M};
    background-color: #FAF7F7;
`;

const Title = styled.div`
    font-size: ${theme.fontSize.M};
    font-weight: bolder;
`;

const GoBack = styled.div`
    width: ${theme.fontSize.M};
    height: ${theme.fontSize.M};
    cursor: pointer;
    background-image: url(${ArrowLeft});
    background-position: center;
    background-size: cover;
`;

interface ISearchHeader {
    selectedCity: string;
    setSelectedCity: Dispatch<SetStateAction<string>>;
}

const SearchHeader: FC<ISearchHeader> = (props) => {
    const { selectedCity, setSelectedCity } = props;

    const handleSelectCity = (cityName: string) => {
        setSelectedCity(cityName)
    }

    return (
        <Container>
            <GoBack />
            <Title>
                查詢公車
            </Title>
            {/* TODO: choose city component */}
            <button type="button" onClick={() => handleSelectCity('Taoyuan')}>
                {selectedCity}
            </button>
        </Container>
    )
}

export default SearchHeader
