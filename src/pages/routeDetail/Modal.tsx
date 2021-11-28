import { FC } from 'react';
import styled from 'styled-components';
import arrowLeft from '@img/arrowLeft.svg';
import mapIcon from '@img/mapIcon.svg';
import heart from '@img/heart.svg';
import heartOutline from '@img/heartOutline.svg';

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
  isFav: boolean;
}> = ({ routeName, isFav }) => (
  <HeaderContainer>
    <ModalSection>
      <Right>
        <img src={arrowLeft} alt="go back" width="21px" height="17px" />
      </Right>
    </ModalSection>
    <ModalSection>
      <Title>{routeName}</Title>
    </ModalSection>
    <ModalSection>
      <Left>
        <HeaderIcon src={mapIcon} alt="map" />
        <HeaderIcon src={isFav ? heart : heartOutline} alt="fav" />
      </Left>
    </ModalSection>
  </HeaderContainer>
);
