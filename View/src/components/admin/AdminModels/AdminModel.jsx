import * as React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { modelContext } from '../Context/Context';

const AdminModel = (props) => {
  const navigate=useNavigate();
  const context =React.useContext(modelContext);
  const [openDialog, setOpenDialog] = React.useState(false);  
  const editModel=()=>{
    axios
      .get(`http://localhost:5555/models/${props.index}`)
      .then((res)=>{
       let data=res.data;
       context.setModel(data);
       console.log(context.model);
       navigate('/admin/models/edit')
      })
      .catch((error)=>{console.log(error)})
  }
  const deleteModel = async () => {
    const token = localStorage.getItem('token');
    console.log(import.meta.env.VITE_API_URL)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/deleteModel/${props.index}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        }
      );
      window.location.reload(); 
      console.log('Model deleted successfully:', response.data);
      
    } catch (error) {
      console.log(error)
    }
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    deleteModel();
    handleDialogClose();
  };
  return (
    <React.Fragment>
      <Grid item xs={6} sm={4} md={3} >
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 445 }} className='card-one' >
          <CardActionArea>
            <CardMedia
              component="img"
              image={`http://localhost:5555${props.img}`}
              height="150"
              style={{ objectFit: 'contain' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {props.factoryName}
              </Typography>
              <Typography variant="span" color="text.secondary">
                {props.customerName}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            
            <IconButton
              color="primary"
              onClick={() => editModel()}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDialogOpen()}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Model? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AdminModel;
