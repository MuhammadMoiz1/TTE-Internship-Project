import * as React from 'react';
import { Grid,Card,CardContent ,Typography,CardMedia, CardActionArea} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slide from '@mui/material/Slide';
import Parts from '../Pages/Parts/Parts';
import './Model.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Model = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
  <React.Fragment>
    <Grid item  xs={6} sm={4} md={3}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,maxWidth: 445}} className='card-one'>
    <CardActionArea onClick={handleClickOpen}>
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_API_URL}${props.img}`}
        height="150"
        style={{objectFit:'contain'}}
      />
      <CardContent  sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.factoryName}
        </Typography>
        <Typography variant="span" color="text.secondary">
          {props.customerName}
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
    <Parts index={props.index}/>
   </Dialog>
  </React.Fragment> 
  )
}

export default Model;

