import React, { useContext, useState } from 'react';
import { TextField,Button,FormControl,InputLabel,Select,MenuItem,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { modelContext } from '../Context/Context';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
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
const AddInternalParts = (props) => {
const context=useContext(modelContext);
const [renderKey, setRenderKey] = useState(0);

const handleImageUpload = (event,index1,index2) => {
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
      data.component[index1].factoryInfo[index2].image=imageUrl;
      context.setModel(data);
    })
    
}
}
  
const handleFieldChange=(event,index,index1)=>{
    let data={...context.model};
    data.component[index].factoryInfo[index1][event.target.name]=event.target.value;
    context.setModel(data);
}

   const addField=(index)=>{
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
    let data={...context.model};
    data.component[index].factoryInfo=[...data.component[index].factoryInfo,object];
    context.setModel(data);
    setRenderKey(prevKey => prevKey + 1);  
   }

   const removeField=(index,index1)=>{
    let data={...context.model};
    data.component[index].factoryInfo.splice(index1,1);
    context.setModel(data);
    setRenderKey(prevKey => prevKey + 1);  
}

  return (
    <div style={{marginTop:4,marginBottom:4}}>
        
    <form>
        
    {props.form.map((form,index)=>(
     <div key={index} style={{ marginBottom: 20 }}>
     <Grid container spacing={2} alignItems="flex-end">
       <Grid item xs={12} sm={4} md={4}>
         <TextField
           key={`Process-${index}-${renderKey}`}
           name="Process"
           label="Process"
           variant="standard"
           onBlur={event => handleFieldChange(event, props.index,index)}
           defaultValue={form.Process}
           fullWidth
         />
       </Grid>
       <Grid item xs={12} sm={4} md={4}>
         <TextField
           key={`Color-${index}-${renderKey}`}
           name="Color"
           label="Color"
           variant="standard"
           onBlur={event => handleFieldChange(event , props.index, index)}
           defaultValue={form.Color}
           fullWidth
         />
       </Grid>

       <Grid item xs={12} sm={4} md={4}>
         <TextField
          key={`Code-${index}-${renderKey}`}
           name="Code"
           label="Code"
           variant="standard"
           onBlur={event => handleFieldChange(event, props.index , index)}
           defaultValue={form.Code}
           fullWidth
         />
       </Grid>
       <Grid item xs={12} sm={12} md={6}>
         <TextField
           name="Description"
           key={`Description-${index}-${renderKey}`}
           label="Description"
           variant="standard"
           onBlur={event => handleFieldChange(event, props.index, index)}
           defaultValue={form.Description}
           fullWidth
         /> 
         </Grid>
        <Grid item xs={12} sm={6} md={3}>
         <TextField
           name="Item Type"
           key={`ItemType-${index}-${renderKey}`}
           label="Item Type"
           variant="standard"
           onBlur={event => handleFieldChange(event, props.index, index)}
           defaultValue={form['Item Type']}
           fullWidth
         />
       </Grid>
       <Grid item xs={12} sm={6} md={3}>
         <TextField
           name="Consumption"
           key={`Consumption-${index}-${renderKey}`}
           label="Consumption"
           variant="standard"
           onBlur={event => handleFieldChange(event, props.index, index)}
           defaultValue={form.Consumption}
           fullWidth
         />
       </Grid>
       <Grid item xs={12} sm={12} md={12}>
         <TextField
           name="addInfo"
           key={`addInfo-${index}-${renderKey}`}
           label="Additonal Information"
           variant="standard"
           onBlur={event => handleFieldChange(event, props.index, index)}
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
           onChange={(event) => handleImageUpload(event, props.index, index)} />
         </Button>
       </Grid>
       <Grid item xs={12} sm={6} md={4} style={{ marginTop: 16 }}>
         <Button
           color="error"
           variant="contained"
           onClick={() => removeField(props.index,index)}
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
    <div onClick={()=>addField(props.index)}>
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
    </div>
    
  )
}

export default AddInternalParts;
