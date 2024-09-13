import React, { Component, useContext, useState } from 'react';
import { TextField,Button } from '@mui/material';
import { modelContext } from '../Context/Context';

const AddUserInfo = (props) => {
const context=useContext(modelContext);
const [catKey,setCatkey]=useState(0);
const [fieldKey,setFieldkey]=useState(0);

const handleCategoryChange=(event,index,index1)=>{
    let data={...context.model};
    data.component[index].info[index1][event.target.name]=event.target.value;
    context.setModel(data);
}
const handleFieldChange=(event,index,index1,index2)=>{
    let data={...context.model};
    data.component[index].info[index1].field[index2][event.target.name]=event.target.value;
    context.setModel(data);
}


   const addCategory=(index)=>{
    let object={
        category:'',
        field:[
            {name:'',specs:''},
        ]
        }
    let data={...context.model}
    data.component[index].info=[...data.component[index].info,object]
    context.setModel(data);
   }
   const addField=(index,index1)=>{
    let object={
        name:'',specs:''
        };
        let data={...context.model}
        data.component[index].info[index1].field=[...data.component[index].info[index1].field,object]
        context.setModel(data);
   }

   const removeCategory=(index,index1)=>{
       let data={...context.model};
       data.component[index].info.splice(index1,1);
       context.setModel(data);
       setCatkey(prevKey => prevKey + 1);
       setFieldkey(prevKey => prevKey + 1);
   }
   const removeField=(index,index1,index2)=>{
    let data={...context.model};
    data.component[index].info[index1].field.splice(index2,1);
    context.setModel(data);
    setFieldkey(prevKey => prevKey + 1);
}

  return (
    <div style={{marginTop:4,marginBottom:4}}>
        
    <form >
        
    {props.form.map((form,index)=>(
     <div key={index} style={{marginBottom:10}}>
        <TextField
        key={`cat-${index}-${catKey}`}
        name='category' 
        label='category' 
        variant='standard'
        onBlur={event=> handleCategoryChange(event,props.index,index)}
        defaultValue={form.category}
        sx={{marginRight:2}}
        />
        {form.field.map((form2,index2)=>(
        <div key={index2} style={{marginBottom:2}}>
        <TextField
        key={`name-${index}-${index2}-${fieldKey}`}
        name='name' 
        label='name' 
        variant='standard'
        onBlur={event=> handleFieldChange(event,props.index,index,index2)}
        defaultValue={form2.name}
        sx={{marginRight:2}}
        />
        <TextField
        key={`specs-${index}-${index2}-${fieldKey}`}
        name='specs' 
        label='specs'
        variant='standard'
        onBlur={event=> handleFieldChange(event,props.index,index,index2)} 
        defaultValue={form2.specs}
       />
       <Button style={{margin:2}} color='error' size='small' variant="contained" type='button' onClick={()=>removeField(props.index,index,index2)} sx={{marginLeft:2}}>-</Button>
        </div> 
        ))}
        <br />
        <Button style={{margin:2}} color='info' size='small' variant="contained" type='button' onClick={()=>addField(props.index,index)} sx={{marginBottom:"4px !important"}}>+</Button>
        <br />
        <Button color='error' size='small' variant="contained" type='button' onClick={()=>removeCategory(props.index,index)} >Remove Category</Button>
        <br/>
        <div style={{marginTop:5,display:'block',height:'1px',borderTop:'1.5px solid black',borderRadius:'5px'}}>
        </div>
        </div> 
      
        
        )
        )}
        
        </form>
        
        <Button color='info' variant="contained" type='button' onClick={()=>addCategory(props.index)} sx={{marginBottom:2,marginTop:2}}>Add Category</Button>
  
    </div>
    
  )
}

export default AddUserInfo;
