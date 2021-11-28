import { FC, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '@img/arrowLeft.svg';
import { CitySelectContext } from '@src/context/citySelect.context';

const Container = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #faf7f7;
  border-radius: 30px 30px 0 0;
`;

const GoBackButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 25px;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.M};
  font-weight: bold;
`;

const SelectButton = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface Props {
  title: string;
  isShowBackToButton?: boolean;
  onClickBackToButtonAction?: () => void;
  isShowCitySelectButton?: boolean;
}

const Navbar: FC<Props> = ({
  title,
  isShowBackToButton = true,
  onClickBackToButtonAction,
  isShowCitySelectButton = true,
}) => {
  const navigate = useNavigate();
  const { selectedCityDesc, openCityOptionsDialog } =
    useContext(CitySelectContext);

  return (
    <Container>
      {isShowBackToButton && (
        <GoBackButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onClickBackToButtonAction) {
              onClickBackToButtonAction();
            } else {
              navigate(-1);
            }
          }}
        >
          <img src={arrowLeft} alt="Go Back" />
        </GoBackButton>
      )}
      <Title>{title}</Title>
      {isShowCitySelectButton && (
        <SelectButton
          onClick={() => {
            openCityOptionsDialog();
          }}
        >
          <span>{selectedCityDesc}</span>
          <span style={{ fontSize: '10px' }}>▼</span>
        </SelectButton>
      )}
    </Container>
  );
};

export default Navbar;
