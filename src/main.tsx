import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalSheet from '@src/components/ModalSheet';
import SearchBus from '@src/pages/searchBus';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #535353;
  font-size: 40px;
  border: 5px solid #5f5f5f;
`;

const Main: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <Container>
      <span>Hello World! This is MetaBus!</span>
      <p>~ To the Moon ~</p>
      <button type="button" onClick={() => setIsOpen(true)}>
        Click
      </button>
      <ModalSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SearchBus />
      </ModalSheet>
    </Container>
  )
};

export default Main;
