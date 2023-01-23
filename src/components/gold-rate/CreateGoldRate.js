import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createGoldRate } from '../../apis/gold-rate';

function CreateGoldRate(props) {
  const [type, setType] = useState('');
  const form = useRef();

  // Form validation
  const schema = Yup.object({
    rate: Yup.string().required('Rate is required'),
    type: Yup.string().required('Type is required'),
    state: Yup.string().required('State is required'),
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors, resetForm } = useFormik({
    initialValues: {
      rate: '',
      type: '',
      state: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createGoldRate(values).then(() => {
        props.setToggleContainer(false);
        form.current.reset();
        setType('');
        resetForm();
        props.setNotify({
          open: true,
          message: 'Gold rate created',
          severity: 'success',
        });
      });
    },
  });

  return (
    <Card sx={{ p: 4, my: 4 }}>
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              name="rate"
              error={touched.rate && errors.rate && true}
              label={touched.rate && errors.rate ? errors.rate : 'Rate'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={touched.type && errors.type && true}>
              <InputLabel id="select-label">Select type</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.rate && errors.rate ? errors.rate : 'Select type'}
                name="type"
                value={type}
                onBlur={handleBlur}
                onChange={(e) => {
                  setType(e.target.value);
                  handleChange(e);
                }}
              >
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="state"
              error={touched.state && errors.state && true}
              label={touched.state && errors.state ? errors.state : 'State'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton size="large" type="submit" variant="contained">
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default CreateGoldRate;
