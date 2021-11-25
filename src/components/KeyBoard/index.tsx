import { FC } from 'react';
import styled from 'styled-components';
import KeyButtonList, { IKeyButtonList } from './setting/keyButtonList';

const Container = styled.div`
  padding: 1rem;
  background: #f9f9f9;
`;

const KeyBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 4px 7px;
  max-width: 375px;
  margin: 0 auto;
`;

const KeyButton = styled.div<{ color?: string }>`
  cursor: pointer;
  background: #ffffff;
  border-radius: 10px;
  font-size: 20px;
  padding: 8px;
  text-align: center;
  color: ${({ color }) => color || '#000'};
`;

interface IBusKeyBoard {
  value: string;
  setKeyValue: (key: string) => void;
}

const BusKeyBoard: FC<IBusKeyBoard> = (props) => {
  const { value, setKeyValue } = props;

  const handleClickKey = (keySetting: IKeyButtonList) => {
    // eslint-disable-next-line no-console
    console.log(value);

    switch (keySetting.type) {
      case 'Line': {
        setKeyValue(keySetting.value);
        break;
      }
      case 'Text': {
        const newValue = value + keySetting.value;
        setKeyValue(newValue);
        break;
      }
      case 'Clear': {
        setKeyValue('');
        break;
      }
      default:
        setKeyValue(keySetting.value);
    }
  };

  return (
    <Container>
      <KeyBoardContainer>
        {KeyButtonList.map((keySetting) => (
          <KeyButton
            key={`key-button-${keySetting.value}`}
            color={keySetting.color}
            onClick={() => handleClickKey(keySetting)}
          >
            {keySetting.value}
          </KeyButton>
        ))}
      </KeyBoardContainer>
    </Container>
  );
};

export default BusKeyBoard;
