import styled from 'styled-components';

interface IconProps {
    path: string;
    size?: string;
}

const Icon = styled.div<IconProps>`
    width: ${({size}) => size || '18px'};
    height: ${({size}) => size || '18px'};
    cursor: pointer;
    background-image: url(${({path}) => path});
    background-position: center;
    background-size: cover;
`;

export default Icon;