import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 250,
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));

const FilterControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Sidebar = ({ filterType, setFilterType, sortOrder, setSortOrder }) => {
  return (
    <SidebarContainer>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Divider />

      <FilterControl fullWidth variant="outlined">
        <InputLabel>Filter by Policy Type</InputLabel>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          label="Filter by Policy Type"
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Life Insurance">Life Insurance</MenuItem>
          <MenuItem value="Health Insurance">Health Insurance</MenuItem>
          <MenuItem value="Pet Insurance">Pet Insurance</MenuItem>
          <MenuItem value="Car Insurance">Car Insurance</MenuItem>
          <MenuItem value="Travel Insurance">Travel Insurance</MenuItem>
          <MenuItem value="Bike Insurance">Bike Insurance</MenuItem>
          <MenuItem value="Home Insurance">Home Insurance</MenuItem>
        </Select>
      </FilterControl>

      <FilterControl fullWidth variant="outlined">
        <InputLabel>Sort by Amount</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort by Amount"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FilterControl>
    </SidebarContainer>
  );
};

export default Sidebar;
