import React, { useContext,useEffect,useState} from 'react';
import { TextField,Button,Autocomplete,Grid,Accordion,AccordionSummary,AccordionDetails,Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { modelContext } from '../Context/Context';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const AddMiscellinous = (props) => {
const [renderKey, setRenderKey] = useState(0);
const context=useContext(modelContext);
const  [parts,setParts]=useState([]);


useEffect(()=>{
  const updatedParts = context.model.component.map((item, index) => ({
    name: item.name,
    index: index
  }));
  setParts(updatedParts);
},[context.model.component.length, JSON.stringify(context.model.component)])


const handleImageUpload =  (event,index) => {
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
      data.miscellinous[index].image=imageUrl;
      context.setModel(data);
    })
    
}
}
const handleFieldChange=(event,index)=>{
    let data={...context.model};
    data.miscellinous[index][event.target.name]=event.target.value;
    context.setModel(data);
}
const removeField=(index)=>{
  let data={...context.model};
  data.miscellinous.splice(index,1);
  context.setModel(data);
  setRenderKey(prevKey => prevKey + 1);  
}

const optionSelected = (event, value,index) => {
  if (value) {;
    let data={...context.model};
    data.component[value.index].factoryInfo=[...data.component[value.index].factoryInfo,data.miscellinous[index]];
    data.miscellinous.splice(index,1);
    context.setModel(data);
    setRenderKey(prevKey => prevKey + 1); 
  }
};
const addField = () => {
  let object = {
      Process: '',
      Color: '',
      Code: '',
      Description: '',
      "Item Type": '',
      Consumption: '',
      image:'',
      addInfo:''
    };
  
  let data = { ...context.model };
  data.miscellinous = [...data.miscellinous, object];
  context.setModel(data);
  
  setRenderKey(prevKey => prevKey + 1);
};

  return (
    <div style={{marginTop:4,marginBottom:4}}>
    <Accordion>
    <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
    >
    <Typography>Miscellaneous Parts</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <form key={props.reloadState}>
        
    {props.form.map((form,index)=>(
     <div key={index} style={{ marginBottom: 20 }}>
     <Grid container spacing={2} alignItems="flex-end">
      <Grid item xs={12} sm={12} md={12}>
        <Autocomplete
          disablePortal
          key={`options-${index}-${renderKey}`}
          options={parts}
          getOptionLabel={(option) => option.name|| "Unnamed Component"}
          isOptionEqualToValue={(option, value) => option.index=== value?.index}
          onChange={(event, value)=>optionSelected(event, value,index)} 
          sx={{ width: 300, marginBottom: '10px',marginTop:'1px' }}
          renderInput={(params) => <TextField variant='standard'   {...params} label="Component" />}
        />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
         <TextField
           key={`Process-${index}-${renderKey}`}
           name='Process'
           label='Process'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form.Process}
           fullWidth
         />
         </Grid>
         <Grid item  xs={12} sm={4} md={4}>
         <TextField
           key={`Color-${index}-${renderKey}`}
           name='Color'
           label='Color'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form.Color}
           fullWidth
         />
         </Grid>
         <Grid item  xs={12} sm={4} md={4}>
         <TextField
           key={`Code-${index}-${renderKey}`}
           name='Code'
           label='Code'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form.Code}
           fullWidth
         />
         </Grid>
         <Grid item  xs={12} sm={12} md={6}>
         <TextField
           key={`Description-${index}-${renderKey}`}
           name='Description'
           label='Description'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form.Description}
           fullWidth
         />
         </Grid>
         <Grid item  xs={12} sm={6} md={3}>
         <TextField
           key={`ItemType-${index}-${renderKey}`}
           name='Item Type'
           label='Item Type'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form['Item Type']}
           fullWidth
         />
         </Grid>
         <Grid item  xs={12} sm={6} md={3}>
         <TextField
           key={`Consumption-${index}-${renderKey}`}
           name='Consumption'
           label='Consumption'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form.Consumption}
           fullWidth
         />
         </Grid>
         <Grid item  xs={12} sm={12} md={12}>
         <TextField
           key={`addInfo-${index}-${renderKey}`}
           name='addInfo'
           label='Additional Information'
           variant="standard"
           onBlur={event => handleFieldChange(event,index)}
           defaultValue={form.addInfo}
           fullWidth
         />
         </Grid>
       <Grid item xs={12} sm={6} md={4} style={{ marginTop: 16 }}>
         <Button
           component="label"
           variant="outlined"
           startIcon={<CloudUploadIcon />}
           fullWidth
         >
           Upload Image
           <input 
           type="file" 
           hidden 
           accept="image/*"
           onChange={(event) => handleImageUpload(event, index)} />
         </Button>
       </Grid>
       <Grid item xs={12} sm={6} md={4} style={{ marginTop: 16 }}>
         <Button
           color="error"
           variant="contained"
           onClick={() => removeField(index)}
           fullWidth
         >
           Remove Part
         </Button>
       </Grid>
     </Grid>
     <div style={{ marginTop: 10, height: '1px', borderTop: '1.5px solid black', borderRadius: '5px' }} />
   </div>
        
        )
        )}
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div onClick={()=>addField()}>
    <AddCircleOutlineSharpIcon 
    style={{
      color:'black',
      cursor:'pointer',
      fontSize:'40px'
    }}
    />
    </div>
    </div>  
    </form> 
    </AccordionDetails>
    </Accordion>
    </div>
    
  )
}

export default AddMiscellinous;

