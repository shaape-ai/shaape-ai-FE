import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

const MenuBar = ({onMenuClick}: { onMenuClick:any }) => {
  const [value, setValue] = useState('summary');

  const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
    setValue(newValue);
    onMenuClick(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction
          label="Summary"
          value="summary"
          color="black"
          icon={<img src="./assests/summary.png" width="20px"/>}
          sx={{
            color: value === 'summary' ? 'black !important' : 'inherit',
            borderTop: value === 'summary' ? '3px solid black' : 'none',
          }}
          onClick={() => onMenuClick('summary')}
        />
        <BottomNavigationAction
          label="FashBot"
          value="chatbot"
          icon={<img src="./assests/chat.png" width="20px"/>}
          sx={{
            color: value === 'chatbot' ? 'black !important' : 'inherit',
            borderTop: value === 'chatbot' ? '3px solid black' : 'none',
          }}
          onClick={() => onMenuClick('chatbot')}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MenuBar;
