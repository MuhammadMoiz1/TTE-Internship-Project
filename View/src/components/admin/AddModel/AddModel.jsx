import React, { useContext, useEffect, useState } from 'react';
import AddComponent from '../AddComponents/AddComponent';
import { TextField, Button, Grid, Snackbar, Alert,Autocomplete } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import AddMiscellinous from '../AddMiscellinous/AddMiscellinous';
import { modelContext } from '../Context/Context';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddBOMData from '../addBOM/AddBOMData';

const AddModel = () => {
  const context = useContext(modelContext);
  const [name,setName]=useState([]);
  const [renderKey, setRenderKey] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [mi_reload,setMi_reload]=useState(0);
  
  useEffect(() => {
    axios.get('http://localhost:5555/models')
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    const token = localStorage.getItem('token');
    if (file) {
      
      formData.append('image', file);
      
      axios.post('http://localhost:5555/admin/upload', formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json', 
          }
        }
      )
        .then(res => {
          const imageUrl = res.data.imageUrl;
          let data = { ...context.model };
          data.image = imageUrl;
          context.setModel(data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  };
  

  const submit = async (e) => {
    let data = { ...context.model };
    console.log(data);
    const token = localStorage.getItem('token');
    try {

      await axios.post(`${import.meta.env.VITE_API_URL}/admin/addModel`, data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        }
      );
      setSnackbarMessage('Model saved successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to save model. Please try again.');
      setSnackbarSeverity('error');
    }
    setOpenSnackbar(true);
  };

  const handleChange = (event) => {
    let data = { ...context.model };
    data[event.target.name] = event.target.value;
    context.setModel(data);
  };

  const addComponent = () => {
    let component = {
      Name: '',
      image: '',
      info: [],
      factoryInfo: [],
      defects: []
    };
    let data = { ...context.model };
    data.component = [...data.component, component];
    context.setModel(data);
    setRenderKey(prevKey => prevKey + 1);
  };

  const deleteComponent = (index) => {
    let data = { ...context.model };
    data.component.splice(index, 1);
    context.setModel(data);
    setRenderKey(prevKey => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const optionSelected = (event, value) => {
    if (value) {
      console.log(value._id)
      axios
    .get(`http://localhost:5555/models/${value._id}`)
    .then((res)=>{
     let data=res.data;
     data._id=undefined;
     context.setModel(data);

    })
    .catch((error)=>{console.log(error)})
    }
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      <div>
      <Autocomplete
          disablePortal
          options={name}
          getOptionLabel={(option) => option.factName}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          onChange={optionSelected} 
          sx={{ width: 300, marginBottom: '10px',marginTop:'1px' }}
          renderInput={(params) => <TextField variant='standard' {...params} label="Similar Models" />}
        />
        <TextField
          name='modelName'
          label='Model Name'
          variant='standard'
          defaultValue={context.model.modelName}
          onBlur={event => handleChange(event)}
          sx={{ marginRight: 2 }}
        />
        <TextField
          name='factName'
          label='Factory Name'
          variant='standard'
          defaultValue={context.model.factName}
          onBlur={event => handleChange(event)}
          sx={{ marginRight: 2 }}
        />
        
      </div>
      <br />

      <Button
        style={{ marginTop: 7, marginBottom: 7 }}
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>
      <AddBOMData setKey={setMi_reload}/>

      <div style={{ marginTop: '10px' }}>
        {context.model.component.map((form, index) => (
          <Grid container spacing={2} style={{ marginBottom: '1px' }} key={`component-${index}-${renderKey}`}>
            <Grid item xs={12} sm={11} md={11}>
              <AddComponent index={index} form={form} />
            </Grid>
            <Grid item xs={12} sm={1} md={1}>
              <div onClick={() => deleteComponent(index)}>
                <DeleteIcon
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '30px'
                  }}
                />
              </div>
            </Grid>
          </Grid>
        ))}

        <Button color='info' variant="contained" type='button'
          onClick={addComponent}
          sx={{ marginBottom: 2, marginTop: 2 }}>
          Add New Component
        </Button>
      </div>
      <AddMiscellinous form={context.model.miscellinous} reloadState={mi_reload}/>

      <Button color='info' variant="contained" type='button'
        onClick={submit}
        sx={{ marginBottom: 2, marginTop: 2 }}>
        Save Model
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddModel;
