import * as React from 'react';
import { InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, TextField } from '@mui/material';
import { ExpandLess, ExpandMore,Search } from '@mui/icons-material';

const AllParts = (props) => {
  const [expandedRows, setExpandedRows] = React.useState({});
  const [search, setSearch] = React.useState(''); // State to handle search input

  const handleRowClick = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Flatten components and miscellinous into rows
  const rows = [
    ...props.components.flatMap((component, index) =>
      component.factoryInfo.map((factory, factoryIndex) => ({
        id: `${index + 1}-${factoryIndex}`,
        componentName: component.name,
        Process: factory.Process,
        Color: factory.Color,
        Code: factory.Code,
        Description: factory.Description,
        "Item Type": factory['Item Type'],
        Consumption: factory.Consumption,
        addInfo: factory.addInfo
      }))
    ),
    ...props.miscellinous.map((factory, index) => ({
      id: `M-${index + 1}`,
      componentName: 'Miscellaneous',
      Process: factory.Process,
      Color: factory.Color,
      Code: factory.Code,
      Description: factory.Description,
      "Item Type": factory['Item Type'],
      Consumption: factory.Consumption,
      addInfo: factory.addInfo
    }))
  ];

  // Filter rows based on search input
  const filteredRows = rows.filter(row =>
    row.componentName?.toLowerCase().includes(search.toLowerCase()) ||
    row.Process?.toLowerCase().includes(search.toLowerCase()) ||
    row.Color?.toLowerCase().includes(search.toLowerCase()) ||
    row.Code?.toLowerCase().includes(search.toLowerCase()) ||
    row.Description?.toLowerCase().includes(search.toLowerCase()) ||
    row["Item Type"]?.toLowerCase().includes(search.toLowerCase()) ||
    row.Consumption?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
<TextField
  label=""
  variant="outlined"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search..."
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    ),
    style: {
      borderRadius: '50px', 
      padding: '5px 15px',
      height: '40px',
      fontSize: '14px', 
      marginBottom:'5px'
    },
  }}
  // style={{
  //   marginBottom: '16px',
  //   width: '100%',
  //   maxWidth: '500px',
  //   margin: '0 auto',
  // }}
/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Process</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Item Type</TableCell>
              <TableCell>Consumption</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{row.componentName}</TableCell>
                  <TableCell>{row.Process}</TableCell>
                  <TableCell>{row.Color}</TableCell>
                  <TableCell>{row.Code}</TableCell>
                  <TableCell>{row.Description}</TableCell>
                  <TableCell>{row['Item Type']}</TableCell>
                  <TableCell>{row.Consumption}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(row.id)}>
                      {expandedRows[row.id] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} style={{ padding: 0 }}>
                    <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                      <Paper style={{ padding: '16px' }}>
                        <div>{row.addInfo}</div>
                      </Paper>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AllParts;
