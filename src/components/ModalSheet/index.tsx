/* eslint-disable no-console */
import { FC } from 'react';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';

const SheetContainer = styled(Sheet)`
  .react-modal-sheet-container {
    border-radius: 30px 30px 0 0 !important;
  }
`;

interface IModalSheet {
  isOpen: boolean;
  showBackdrop?: boolean;
  onClose: () => void;
}

/**
 *
 * @name ModalSheet
 * @param isOpen - 是否開啟 Modal Sheet
 * @param showBackdrop - 背面是否顯示灰色底
 * @param onClose - 關閉 Modal Sheet Callback
 */
const ModalSheet: FC<IModalSheet> = ({ children, ...props }) => {
  const { isOpen, showBackdrop, onClose } = props;

  return (
    <SheetContainer
      isOpen={isOpen}
      onClose={() => onClose}
      snapPoints={[0.95, 0.5, 0.2]}
      initialSnap={1}
      onSnap={(snapIndex) =>
        console.log('> Current snap point index:', snapIndex)
      }
    >
      <SheetContainer.Container>
        <SheetContainer.Content>{children}</SheetContainer.Content>
      </SheetContainer.Container>
      {showBackdrop ? <Sheet.Backdrop /> : <></>}
    </SheetContainer>
  );
};

ModalSheet.defaultProps = {
  showBackdrop: false,
};

export default ModalSheet;
