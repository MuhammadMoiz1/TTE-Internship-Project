import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt';
import { Box,Button,Typography,Accordion,AccordionSummary,AccordionDetails,AppBar,Tabs,Tab,Slide,Toolbar,Dialog} from '@mui/material';
import PropTypes from 'prop-types';
import CustomTable from './CustomTable';
import './Parts.css';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';
import { blueGrey } from '@mui/material/colors';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Details from './Details';
import axios from 'axios';
import AllParts from './AllParts';
import ModelDefects from '../ModelDefects/ModelDefects';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function a11yProps2(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Parts = (props) => {
    const theme = useTheme();
    const [components,setComponent]=useState([]);
    const [miscellinous,setMiscellinous]=useState([]);
    const [info, setInfo] = useState([]);
    const [factoryInfo, setFactoryInfo] = useState([]);
    const [defects, setDefects] = useState([]);
    const [imag, setImage] = useState('');
    const [value, setValue] = React.useState(0);
    const [scrollvalue, setScrollvalue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
   

    useEffect(()=>{
      axios
      .get(`${import.meta.env.VITE_API_URL}/models/${props.index}`)
      .then((res)=>{
       let data=res.data;
       setComponent(data.component);
       setMiscellinous(data.miscellinous);
       console.log("image",data.component[0].image);
       setImage(data.component[0].image);
       setInfo(data.component[0].info);
       setFactoryInfo(data.component[0].factoryInfo);
       setDefects(data.component[0].defects);
      })
      .catch((error)=>{console.log(error)})
    },[])

  const handlescrollChange = (event, newValue) => {
    setScrollvalue(newValue);
  };

    const handleChange = (event, newValue) => {
    setValue(newValue);
     };
     const handleChangeIndex = (index) => {
      setValue(index);
    };
     const handleChange2 = (event, newValue) => {
      setValue2(newValue);
       };
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
         setOpen(true);
       };
     
    const handleClose = () => {
         setOpen(false);
       };
   
  return (

    <>
  <Box marginTop={0}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value2} onChange={handleChange2} centered >
          <Tab label="Components" {...a11yProps2(0)}/>
          <Tab label="Internal Parts" {...a11yProps2(1)}/>
          <Tab label="All Parts" {...a11yProps2(2)}/>
        </Tabs>
    </Box>
    <CustomTabPanel value={value2} index={0}>
    <Tabs
        className='white'
        sx={{margin:'auto',width:'100%'}}
        value={scrollvalue}
        onChange={handlescrollChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >

        {components.map(({name,image, info, factoryInfo, defects})=>(
          <Tab label={name} onClick={()=>{console.log(components);setInfo(info);setFactoryInfo(factoryInfo);setDefects(defects);setImage(image)}}/>
        ))}
        
        
      </Tabs>
  <div className='upper-main-div'>

   <Box className='parts-description' sx={{ bgcolor: 'background.paper', width:'65%',borderRadius:'10px'}}>
      <AppBar position="static" style={{backgroundColor:blueGrey[800]}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor=""
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Internal Parts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{overflowY:'auto',height:'300px',backgroundColor:''}}
        className='table-container'
      >
        <CustomTabPanel value={value} index={0} dir={theme.direction}>
           {
           info.map(({category,field},index)=>
            (
            <CustomTable data={field} category={category} index={index}/>
           )
           )}
        </CustomTabPanel>
        <CustomTabPanel>
        {factoryInfo.map((item, index) => (
        <Details 
          data={item} 
          key={index} 
        />
      ))}
        </CustomTabPanel>
      </SwipeableViews>
    </Box>




   <div className='upper-div'>
    <Tilt>
        <div>
        <img src={`${import.meta.env.VITE_API_URL}${imag}`} style={{height:'300px',objectFit:'scale-down'}} />
        </div>
    </Tilt>
      <Box>
      <Button
      variant="contained"
      sx={{
        marginTop: '1rem',
        backgroundColor: '#D61A3C !important',
        marginLeft: '0.3rem',
        '&:hover': {
          backgroundColor: 'darkred',
        },
      }}
      onClick={handleClickOpen}
    >
     View Defects
    </Button>
      </Box>
    </div>

   </div>
    </CustomTabPanel>
    <CustomTabPanel value={value2} index={1}>
    <Accordion key={props.index}>
    <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
    >
    <Typography>Miscellinous</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Box sx={{ width: '100%',overflow:'auto'}}>
    {miscellinous.map((item, index) => (
        <Details 
          data={item} 
          key={index} 
        />
      ))}

    </Box>
    </AccordionDetails>
    </Accordion>  
    {components.map(({name,image, info, factoryInfo, defects},index)=>(
    <Accordion key={index}>
    <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
    >
    <Typography>{name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Box sx={{ width: '100%',overflow:'auto'}}>
    {factoryInfo.map((item, index) => (
        <Details 
          data={item} 
          key={index} 
        />
      ))}

    </Box>
    </AccordionDetails>
    </Accordion>))}
    </CustomTabPanel>
    <CustomTabPanel value={value2} index={2}>
      <AllParts  miscellinous={miscellinous} components={components} />
    </CustomTabPanel>
    </Box> 
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
    <ModelDefects defects={defects}/>
   </Dialog> 
  
   </>
  );
}

export default Parts;




