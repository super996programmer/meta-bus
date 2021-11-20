import { FC, useState } from 'react'
import styled from 'styled-components'
import ArrowLeft from '@img/arrowLeft.svg'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    background-color: #FAF7F7;
    border-radius: 30px 30px 0 0;
`;

const Title = styled.div`
    font-size: 1.15rem;
    font-weight: bolder;
`;

const GoBack = styled.div`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    background-image: url(${ArrowLeft});
    background-position: center;
    background-size: cover;
`;

const SearchHeader: FC = () => {
    const [selectedCity, setSelectedCity] = useState('Taipei')

    const handleSelectCity = (cityName: string) => {
        setSelectedCity(cityName)
    }

    return (
        <Container>
            <GoBack />
            <Title>
                查詢公車
            </Title>
            <button type="button" onClick={() => handleSelectCity('Taoyuan')}>
                {selectedCity}
            </button>
        </Container>
    )
}

export default SearchHeader
