import React from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props{
  label     ?: any;
  contents  ?: any;
}

export const BasicAccordion: React.FC<Props> = (props: Props) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Accordion style = {{border: '1px solid rgba(0, 0, 0, .125)', boxShadow: 'none' }}>
        
        <AccordionSummary
          expandIcon    = { <ExpandMoreIcon /> }
          aria-controls = "panel1a-content"
          id            = "panel1a-header"
        >
          <Typography> { props.label } </Typography>
        </AccordionSummary>

        <AccordionDetails>
          { props.contents }
        </AccordionDetails>

      </Accordion>
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

export default BasicAccordion