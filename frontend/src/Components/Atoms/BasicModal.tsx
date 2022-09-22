import React from "react";
import { Button, Typography, Modal, Box } from "@material-ui/core";

interface Props{
  contents: any;
  buttonTexts: string;
}

export const BasicModal: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick = { handleOpen } > { props.buttonTexts } </Button>
      <Modal
        open              = { open }
        onClose           = { handleClose }
        aria-labelledby   = "modal-modal-title"
        aria-describedby  = "modal-modal-description"
      >
        <Box sx = { style }>
          <Typography id = "modal-modal-title" variant = "h6" component = "h2">
            { props.contents }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position  : 'absolute' as 'absolute',
  top       : '50%',
  left      : '50%',
  transform : 'translate(-50%, -50%)',
  width     : '50%',
  maxWidth  : 500,
  bgcolor   : 'background.paper',
  border    : '2px solid #000',
  boxShadow : 24,
  p         : 4,
};

export default Modal