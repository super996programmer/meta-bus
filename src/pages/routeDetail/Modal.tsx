import { FC } from 'react';
import styled from 'styled-components';
import arrowLeft from '@img/arrowLeft.svg';
import mapIcon from '@img/mapIcon.svg';
import { Link } from 'react-router-dom';

const ModalSection = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #faf7f7;
  border-radius: 30px 30px 0 0;
  height: 55px;
  padding: 0 30px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.L};
`;

const HeaderIcon = styled.img`
  width: 17px;
  height: 21px;
`;

export const ModalHeader: FC<{
  routeName: string;
}> = ({ routeName }) => (
  <HeaderContainer>
    <ModalSection>
      <Right>
        <Link to="/SearchBus">
          <img src={arrowLeft} alt="go back" width="21px" height="17px" />
        </Link>
      </Right>
    </ModalSection>
    <ModalSection>
      <Title>{routeName}</Title>
    </ModalSection>
    <ModalSection>
      <Left>
        <HeaderIcon src={mapIcon} alt="map" />
      </Left>
    </ModalSection>
  </HeaderContainer>
);
