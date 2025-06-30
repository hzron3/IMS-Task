import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';

const MIN_DRAWER_WIDTH = 60;
const MAX_DRAWER_WIDTH = 260;

const Sidebar = ({ sections, selectedIndex, onSectionSelect, sidebarOpen, setSidebarOpen }) => {
  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      sx={{
        width: sidebarOpen ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'width 0.3s',
        overflowX: 'hidden',
        [`& .MuiDrawer-paper`]: {
          width: sidebarOpen ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: '#fff',
          overflowX: 'hidden',
          transition: 'width 0.3s',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', mt: 3 }}>
        <List>
          {sections.map((section, idx) => (
            <ListItem
              key={section.label}
              selected={selectedIndex === idx}
              onClick={() => onSectionSelect(idx)}
              sx={{
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
                transition: 'justify-content 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: 0,
                mr: sidebarOpen ? 2 : 'auto',
                justifyContent: 'center',
                transition: 'margin 0.3s',
              }}>
                {section.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={section.label} sx={{ opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.3s' }} />}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 