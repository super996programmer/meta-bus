import styled from 'styled-components';
import { IOption } from '@src/model';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  height: 100vh;
  width: 100vw;
`;

const Backdrop = styled.div`
  height: 100%;
  background: #00000033;
`;

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  padding: 10px;
  max-height: 200px;
  width: 200px;
  background: #ffffff;
  overflow: scroll;
  transform: translate(-50%, -50%);
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  & input {
    all: revert;
  }
`;

interface OptionDialogProps<T> {
  options: IOption<T>[];
  onSelectHandler: (value: T) => void;
  selectedValue: T;
}

const OptionDialog = <T,>({
  options,
  onSelectHandler,
  selectedValue,
}: OptionDialogProps<T>) => (
  <Container>
    <Backdrop
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelectHandler(selectedValue);
      }}
    />
    <Dialog>
      {options.map(({ text, value }) => (
        <Option key={text}>
          <input
            type="radio"
            name="options"
            id={`options-${value}`}
            checked={value === selectedValue}
            onChange={() => onSelectHandler(value)}
          />
          <label htmlFor={`options-${value}`}>{text}</label>
        </Option>
      ))}
    </Dialog>
  </Container>
);

export default OptionDialog;
