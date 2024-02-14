import { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import './Nav.css';


export default function SearchDrawer({ onchange, searchTerm, markers }) {
  const [state, setState] = useState({
    left: false,
  });

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#DBF9AC',
    },
    '& label.MuiInputLabel-root': {
        color: '#DBF9AC'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#DBF9AC',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#DBF9AC',
        color: 'orange'
      },
      '&:hover fieldset': {
        borderColor: '#F5B0E6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#DBF9AC',
      },
    },
  });
  
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        <CssTextField
            id="outlined-basic"
            label="Filter locations..."
            variant="outlined"
            value={searchTerm}
            onChange={onchange}
            autoFocus
            sx={{
                border: "1px",
                borderColor: "orange !important"
            }}
            inputProps={{
                style: { color: '#DBF9AC' } }} />

        {markers.map((loc, index) => 
            <>
                <ListItem key={index}>{loc.properties.name || "no name "}</ListItem>
                <Divider />
            </>
        )}
      </List>
    </Box>
  );

  return (
    <div id="navbar">
        <>
          <Button onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
          <h3>Durham Trails</h3>
          <Drawer
            anchor='left'
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            PaperProps={{
                sx: {
                  backgroundColor: "#213547",
                  color: "#DBF9AC",
                  padding: "2em"
                }
              }}
          >
            {list('left')}
          </Drawer>
        </>
    </div>
  );
}