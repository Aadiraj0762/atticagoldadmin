import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

export default function CreateGoldRate() {
  const [value, setValue] = useState(moment('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ p: 4, my: 4 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField name="amount" label="Amount" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select type</InputLabel>
              <Select labelId="select-label" id="select" label="Select type" name="type" value="">
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField name="amount" label="Amount" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton size="large" type="submit" variant="contained">
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Card>
  );
}
