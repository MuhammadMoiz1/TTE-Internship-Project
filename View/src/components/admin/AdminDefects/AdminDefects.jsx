import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import AdminDefect from './AdminDefect';
import axios from 'axios';
import SearchComponent from '../../user/SearchComponents/SearchComponent';
import { useNavigate } from 'react-router-dom';

const AdminDefects = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5555/defects')
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleAddDefect = () => {
    navigate('/admin/defects/add', {
        state: {
            name: '',
            description: '',
            image: '',
            quantity: '',
            causes: []
          },
      });
  };

  return (
    <div style={{minHeight:'75vh'}}>
      <div  style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDefect}
         
        >
          Add Defect
        </Button>
        
      </div>

      <Grid container spacing={3} style={{ marginTop: '20px', height: 'auto', width: '100%', marginBottom: '10px' }} justifyContent='space-evenly'>
        {data.map((defect) => (
          <AdminDefect
            key={defect._id}
            img={defect.image}
            DefectName={defect.name}
            id={defect._id}
          />
        ))}
      </Grid>
    </div>
  );
};

export default AdminDefects;
