import React, { useContext, useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import AdminModel from './AdminModel';
import SearchComponent from '../../user/SearchComponents/SearchComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { modelContext } from '../Context/Context';

const AdminModels = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const context=useContext(modelContext);


  useEffect(() => {
    axios
      .get('http://localhost:5555/models')
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleAddModel = () => {
    context.setModel({
        modelName:'',
        factName:'',
        image:'',
        component:[],
    miscellinous:[]  
    });
    navigate('/admin/models/add');
  };

  
  return (
    <div style={{ minHeight: '80vh' }}>
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
 
        <Button variant="contained" color="primary" onClick={handleAddModel}>
          Add New Model
        </Button>
      </div>

      <Grid  container spacing={3} style={{ marginTop: '20px', height: 'auto', width: '100%', marginBottom: '10px' }} justifyContent='space-evenly'>
        {
          data.map((form, index) => (
            <AdminModel key={form._id} img={form.image} customerName={form.modelName} factoryName={form.factName} index={form._id} />
          ))
        }
      </Grid>
    </div>
  );
};

export default AdminModels;
