import { Button } from '@mui/material';
import React, { useState,useContext } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { modelContext } from '../Context/Context';
import * as XLSX from 'xlsx';

const AddBOMData = (props) => {
  const context= useContext(modelContext);
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const data = new Uint8Array(arrayBuffer);
      const binaryStr = data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let Miscellinousdata = XLSX.utils.sheet_to_json(worksheet);
      Miscellinousdata = Miscellinousdata.map(row => ({
        ...row,
        image:'',
        addInfo:''
      }));
      let model=context.model;
      model.miscellinous=[...model.miscellinous,...Miscellinousdata];
      context.setModel(model);
      props.setKey(prev=>prev+1);
      console.log(context.model);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Button
        style={{ marginTop: 7, marginBottom: 7, marginLeft:10 }}
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
      >
        Upload BOM
        <input
          type="file"
          hidden
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
        />
      </Button>
    </>
  );
};

export default AddBOMData;
