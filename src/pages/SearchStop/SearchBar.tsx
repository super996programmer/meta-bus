import { FC, ChangeEvent, CompositionEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '@src/components/Icon';
import searchIcon from '@img/searchIcon.svg';
import cancelIcon from '@img/grayCircleClose.svg';

const InputContainer = styled.div`
  flex: 1 0 100%;
  position: relative;
  background: #eeeeee;
  border-radius: 50px;
`;

const InputBar = styled.input`
  font-size: ${({ theme }) => theme.fontSize.S};
  width: 100%;
  padding: 10px 18px;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  cursor: none;
  height: 32px;
  width: 32px;
`;

const CancelIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 11px;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
`;

interface Props {
  setSearchValue: (value: string) => void;
}

const SearchBar: FC<Props> = ({ setSearchValue }) => {
  console.log('searchBar run');
  const [inputValue, setInputValue] = useState<string>('');
  const [isCompositionValue, setIsCompositionValue] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue && !isCompositionValue) {
      setSearchValue(inputValue);
    }
  }, [setSearchValue, inputValue, isCompositionValue]);

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCompositionInput = (e: CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionstart') {
      setIsCompositionValue(true);
    } else if (e.type === 'compositionend') {
      setIsCompositionValue(false);
    }
  };

  return (
    <InputContainer>
      <InputBar
        type="text"
        placeholder="請輸入公車站牌"
        value={inputValue}
        onChange={handleInputValueChange}
        onCompositionStart={handleCompositionInput}
        onCompositionEnd={handleCompositionInput}
      />
      {inputValue ? (
        <CancelIcon
          path={cancelIcon}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setInputValue('');
          }}
        />
      ) : (
        <SearchIcon path={searchIcon} />
      )}
    </InputContainer>
  );
};

export default SearchBar;
