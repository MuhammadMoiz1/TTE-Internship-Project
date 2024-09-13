import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AddDefect = () => {
  const location = useLocation();
  const [defect, setDefect] = useState(location.state);
  const [renderKey, setRenderKey] = useState(0);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    const token = localStorage.getItem('token');
    if (file) {
      formData.append('image', file);
      try {
        const res = await axios.post('http://localhost:5555/admin/upload', formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json', 
            }
          }
        );
        const imageUrl = res.data.imageUrl;
        let data = { ...defect };
        data.image = imageUrl;
        setDefect(data);
        setRenderKey(prevKey => prevKey + 1); // Update key to force rerender
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleChange = (event) => {
    let data = { ...defect };
    data[event.target.name] = event.target.value;
    setDefect(data);
    setRenderKey(prevKey => prevKey + 1); // Update key to force rerender
  };

  const handleNumberChange = (event) => {
    let data = { ...defect };
    if (event.target.value > 0) {
      data[event.target.name] = event.target.value;
    } else {
      data[event.target.name] = 0;
    }
    setDefect(data);
    setRenderKey(prevKey => prevKey + 1); // Update key to force rerender
  };

  const handleCauseChange = (event, index) => {
    const updatedCauses = [...defect.causes];
    updatedCauses[index] = event.target.value;
    setDefect({
      ...defect,
      causes: updatedCauses
    });
    setRenderKey(prevKey => prevKey + 1); // Update key to force rerender
  };

  const addCause = () => {
    let data = { ...defect };
    data.causes = [...data.causes, ""];
    setDefect(data);
    setRenderKey(prevKey => prevKey + 1); // Update key to force rerender
  };

  const deleteCause = (index) => {
    let data = { ...defect };
    data.causes.splice(index, 1);
    setDefect(data);
    setRenderKey(prevKey => prevKey + 1); // Update key to force rerender
  };

  const submit = async () => {
    let data = { ...defect };
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5555/admin/addDefect', data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        }
      );
      setSnackbarMessage('Defect saved successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error saving defect:', error);
      setSnackbarMessage('Failed to save defect. Please try again.');
      setSnackbarSeverity('error');
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ minHeight: '75vh', marginTop: '5vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            name="name"
            label="Defect Name"
            variant="standard"
            multiline
            fullWidth
            defaultValue={defect.name}
            onBlur={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <TextField
            name="quantity"
            label="Defect Quantity"
            variant="standard"
            type="number"
            defaultValue={defect.quantity}
            onBlur={handleNumberChange}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <Button
            style={{ marginTop: 7, marginBottom: 7 }}
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
          >
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Defect Description"
            variant="standard"
            fullWidth
            multiline
            defaultValue={defect.description}
            onBlur={handleChange}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <h3>Causes:</h3>
        {defect.causes && defect.causes.map((str, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={10} md={10}>
              <TextField
                key={`cause-${index}-${renderKey}`}
                name="causes"
                label="Enter Cause"
                variant="standard"
                fullWidth
                multiline
                defaultValue={defect.causes[index]}
                onBlur={(event) => handleCauseChange(event, index)}
              />
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <div onClick={() => deleteCause(index)}>
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div onClick={addCause}>
            <AddCircleOutlineSharpIcon
              style={{
                color: 'black',
                cursor: 'pointer',
                fontSize: '30px'
              }}
            />
          </div>
        </div>
      </div>
      <Button color='info' variant="contained" type='button'
        onClick={submit}
        sx={{ marginBottom: 2, marginTop: 2 }}>
        Save Defect
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
};

export default AddDefect;
