import * as React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import ReactImageMagnify from 'react-image-magnify';
import axios from 'axios';
import './DefectDescription.css'

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};


const DefectDescription = (props) => {
  const [data,setData]=React.useState({});
  React.useEffect(()=>{
    axios
    .get(`http://localhost:5555/defects/${props.id}`)
    .then((res)=>{
     let data=res.data;
     setData(data);
    })
    .catch((error)=>{console.log(error)})
  },[])

  return (
    <div className='main-cont' style={{
      display:'flex',
      Height:'87vh',
      width:'100%',
    }}>
    <div className='left-cont' style={{width:'60vw',height:'87vh',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}> 
   
    <h2 >{data.name}</h2>

    <p style={{marginLeft:'10px',marginBottom:'10px'}}> {data.description}</p>

    <TableContainer className='table-cont' component={Paper} sx={{ maxWidth: "94%", margin: 'auto', boxShadow: 3, borderRadius: 2 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow >
            <TableCell align="left">
              <Typography variant="h6" component="div" sx={{fontWeight: 'bold' }}>
                Causes :
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.causes&&data.causes.map((item, index) => (
            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <TableCell align="left" sx={{ fontSize: '16px', padding: '16px' }}>{item}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
      </div>
    <div className='right-cont' style={{width:'40vw',display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column'}}>
     
     <div className='image-cont' style={{width:'90%',height:'300px !important',marginTop:'20px'}}>
     <ReactImageMagnify style={{objectFit:"scale-down"}} {...{
         smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: `${import.meta.env.VITE_API_URL}${data.image}`,
         },
        largeImage: {
           src: `${import.meta.env.VITE_API_URL}${data.image}` ,
           width: 1100,
           height: 1600,
         },
     enlargedImagePosition:'over',
     
    enlargedImageContainerDimensions: {
      width: "100% !important",
      height: "100% !important",
    },
    }} />
     </div>
      
    <div className='chart'>
      
       {props.total&&(<PieChart
      series={[
        {
          data: [
            { id: 0, value: data.quantity, label: data.name },
            { id: 1, value: props.total-data.quantity, label: 'Overall Defects' },
          ],
          innerRadius: 30,
          cornerRadius: 3,
          
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />)}
       </div>
      
      </div>
      
    </div>
  );
}

export default DefectDescription;






