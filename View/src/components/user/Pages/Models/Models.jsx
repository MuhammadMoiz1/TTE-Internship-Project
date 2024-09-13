import React, { useEffect, useState } from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import Model from '../../Model/Model';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const Models = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/models`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(model =>
    model.modelName.toLowerCase().includes(searchQuery) ||
    model.factName.toLowerCase().includes(searchQuery)
  );

  return (
    <div style={{ minHeight: '80vh' }}>
      <TextField
        label="Search Models"
        variant="outlined"
        size='small'
        style={{ margin: '20px 0' }}
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={3} style={{ height: 'auto', width: '100%', marginBottom: '10px' }} justifyContent='space-evenly'>
        {
          filteredData.map((model, index) => (
            <Model
              key={model._id}
              img={model.image}
              customerName={model.modelName}
              factoryName={model.factName}
              index={model._id}
            />
          ))
        }
      </Grid>
    </div>
  );
};

export default Models;
