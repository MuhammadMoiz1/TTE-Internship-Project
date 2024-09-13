import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs,Tab,Box,Accordion,AccordionSummary,AccordionDetails,Typography,TextField,Button} from '@mui/material';
import AddUserInfo from '../AddUserInfo/AddUserInfo';
import AddInternalParts from '../AddInternalParts/AddInternalParts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloudUpload from '@mui/icons-material/CloudUpload';
import {modelContext} from '../Context/Context';
import axios from 'axios';
import AddModelDefects from '../AddModelDefects/AddModelDefects';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const AddComponent=(props)=> {
  const [value, setValue] = React.useState(0);
  const context=React.useContext(modelContext);
const handleImageUpload = (event,index) => {
  const formData= new FormData();
  const file = event.target.files[0];
  const token = localStorage.getItem('token');
  if (file) {
    formData.append('image',file);
    axios.post('http://localhost:5555/admin/upload',formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json', 
        }
      }
    )
    .then(res=>{
      const imageUrl=res.data.imageUrl;
      let data={...context.model};
      data.component[index].image=imageUrl;
      context.setModel(data);
    })
    
}
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleComponentChange=(event,index)=>{
    let data={...context.model};
    data.component[index][event.target.name]=event.target.value;
    context.setModel(data);
  }  

 return (
    <Accordion key={props.index}>
    <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
    >
    <Typography>{props.form.name?props.form.name:'New Component'}</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <Box sx={{ width: '100%' ,height:'100vh',overflow:'auto'}}>
      <TextField
           name="name"
           label="Component Name"
           variant="standard"
           defaultValue={props.form.name}
           onBlur={event => handleComponentChange(event,props.index)}
         />  
         <br />
         <Button
           style={{marginTop:7,marginBottom:7}}
           component="label"
           variant="outlined"
           startIcon={<CloudUpload />}
         >
           Upload Image
           <input type="file" hidden accept="image/*" onChange={(event) => handleImageUpload(event, props.index)} />
         </Button>
    
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="User Information" {...a11yProps(0)} />
          <Tab label="Internal Parts" {...a11yProps(1)} />
          <Tab label="Defects" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddUserInfo index={props.index} form={props.form.info}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddInternalParts index={props.index} form={props.form.factoryInfo}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AddModelDefects index={props.index} form={props.form.defects}/>
      </CustomTabPanel>
    </Box>
    </AccordionDetails>
    </Accordion>
  );
}

export default AddComponent;


        