import * as React from 'react';
import { Grid,Card,CardContent ,Typography,CardMedia, CardActionArea} from '@mui/material';
import DefectDescription from '../DefectDescription/DefectDescription';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slide from '@mui/material/Slide';
import './DefectCard.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const DefectCard = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Grid item  xs={6} sm={4} md={3}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,maxWidth: 445}} className='card-one'>
    <CardActionArea onClick={handleClickOpen}>
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_API_URL}${props.img}`}
        height="150"
        alt={props.DefectName}
        style={{objectFit:'contain'}}
      />
      <CardContent  sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.DefectName}
        </Typography>
      </CardContent>
    </CardActionArea>
    
  </Card>
  </Grid>
  <Dialog
  fullScreen
  open={open}
  onClose={handleClose}
  TransitionComponent={Transition}
>
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
      >
        <ArrowBackIcon />
      </IconButton>
    </Toolbar>
    <DefectDescription id={props.id} total={props.total}/>
   </Dialog>
   </>
  );
}

export default DefectCard;
