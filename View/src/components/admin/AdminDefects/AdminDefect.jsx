import * as React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea,Button, IconButton,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDefect = (props) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false); 

  const handleEdit = () => {
    console.log(props.id)
    axios
    .get(`http://localhost:5555/defects/${props.id}`)
    .then((res)=>{
     let data=res.data;
     navigate(`/admin/defects/edit`,{
        state: data
     });
    })
    .catch((error)=>{console.log(error)})
   
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5555/admin/deleteDefects/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        }
      );
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to delete defect:', error);
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
    <>
    <Grid item xs={6} sm={4} md={3} >
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 445 }} className='card-one'>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`http://localhost:5555${props.img}`}
            height="150"
            alt={props.DefectName}
            style={{ objectFit: 'contain' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {props.DefectName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDialogOpen} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
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
      <Button onClick={handleDelete} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  </>
  );
};

export default AdminDefect;
