import React from 'react'
import { Grid,Card,CardContent ,Typography,CardMedia, CardActionArea} from '@mui/material';
import "./optionCards.css"
import { useNavigate } from 'react-router-dom';

const CardOne=(props)=>{   
  const navigate=useNavigate();
   return(
    <Grid item  xs={12} sm={6} md={6}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,maxWidth: 445}} className='card-one' >
      <CardActionArea onClick={()=>navigate(props.path)}>
        <CardMedia
          component="img"
          image={props.img}
        />
        <CardContent  sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.head}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.des}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    </Grid>
   );
}
const OptionCards = () => {
  
  return (
    <div  style={{marginBottom:'10px',width:'100%'}}>
    <Grid container spacing={5}  style={{marginTop:'20px'}} justifyContent='space-evenly'>
       <CardOne 
       img='/Models.png' 
       head='Models'
       des='Explore detailed information about various mobile models, including their components and specifications.'
       path='/models'
       />
       <CardOne  
       img='/Defects.svg' 
       head='Defects'
       des='Identify and understand the defects happens during manufacturing process to ensure quality control and continuous improvement.'
       path='/defects'
      />
       {/* <CardOne
       img='/AssemblyLines.png' 
       head='Assembly Lines'
       des='Gain insights into the assembly line processes and discover how different models are manufactured with precision.'
       path='/lines'
      />
       <CardOne
       img='/Manufacturing_flow.png' 
       head='Manufacturing Flow'
       des='Learn about the complete manufacturing flow from raw materials to the final product, ensuring efficiency and quality.'
       path='/flow'
       /> */}
    </Grid>
    </div>
  );
}

export default OptionCards;
