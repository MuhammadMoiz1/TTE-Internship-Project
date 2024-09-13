import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import DefectCard from '../../DefectCard/DefectCard';

const ModelDefects = (props) => {
  const data = props.defects;
  useEffect(()=>{
    console.log(props)
  },[])
  
  return (
    <div style={{marginLeft:"20px",marginRight:"20px"}}>
    <Grid container spacing={3}  style={{marginTop:'20px',height:'auto',width:'100%',marginBottom:'10px'}} justifyContent='space-evenly' >
        {
          data.map((defect,index)=>(
            <DefectCard img={defect.image} DefectName={defect.name}  id={defect.id}/>
          ))
        }
        
    </Grid>
    </div>
  )
}

export default ModelDefects;
