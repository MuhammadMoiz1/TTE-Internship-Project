import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




function CustomTable(props) {

  return (
   <TableContainer key={props.index} className='table-container' component={Paper} sx={{marginBottom:'20px',backgroundColor: '#eceff1', color: '#000'}} elevation={4} square={false}>
   <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
     <TableHead>
       <TableRow>
         <TableCell style={{fontWeight:"700",color:'#37474f'}} colSpan={2}>{props?.category}</TableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {props?.data && props?.data.map(({name,specs})=>  (
         <TableRow
           key={name}
           sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
         >
           <TableCell component="th" scope="row">
             {name}
           </TableCell>
           <TableCell 
           style={{ 
            whiteSpace: 'normal !important', 
            wordWrap: 'break-word !important', 
            overflowWrap: 'break-word', 
          }}
           >{specs}</TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
  )
}

export default CustomTable;


