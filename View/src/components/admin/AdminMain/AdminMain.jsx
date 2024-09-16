import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid,Card,CardActionArea,CardMedia,Typography,CardContent } from '@mui/material';
import dashimage from '../../user/Dashboard/assets/one.jpeg'
const CardOne=(props)=>{   
    const navigate=useNavigate();
     return(
      <Grid item  xs={12} sm={12} md={6}>
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
          </CardContent>
        </CardActionArea>
        
      </Card>
      </Grid>
     );
  }

const AdminMain = () => {
  return (
    <div  style={{marginBottom:'10px',width:'100%'}}>
    <Grid container spacing={5}  style={{marginTop:'20px'}} justifyContent='space-evenly'>
       <CardOne 
       img='/Models.png' 
       head='Manage Models'
       path='/admin/models'
       />
       <CardOne  
       img='/Defects.svg' 
       head='Manage Defects'
       des='Identify and understand the defects happens during manufacturing process to ensure quality control and continuous improvement.'
       path='/admin/defects'
      />
      <CardOne  
       img={dashimage}
       head='Upload Defects Data'
       des='Easily manage and upload defect data by importing an Excel file. Click here to add defect records, ensuring accurate tracking and reporting across all mobile models and components.'
       path='/dashboard/fileupload'
      />
    </Grid>
      
    </div>
  )
}

export default AdminMain;
