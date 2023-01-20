import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getGoldRateById, updateGoldRate } from '../../apis/gold-rate';

function UpdateGoldRate({ id, setToggleContainer }) {
  const [data, setData] = useState({
    rate: '',
    type: '',
    state: '',
  });

  // Form validation
  const schema = Yup.object({
    rate: Yup.string().required('Rate is required'),
    type: Yup.string().required('Type is required'),
    state: Yup.string().required('State is required'),
  });

  const initialValues = {
    rate: '',
    type: '',
    state: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      updateGoldRate(id, values).then(() => {
        setToggleContainer(false);
        setData(initialValues);
        setValues(initialValues);
        resetForm();
      });
    },
  });

  useEffect(() => {
    if (id) {
      getGoldRateById(id).then((data) => {
        setData(data.data ?? {});
        setValues(data.data);
      });
    }
  }, [id]);

  return (
    <Card sx={{ p: 4, my: 4 }}>
      <form
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
              value={values.rate}
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
                value={values.type}
                onBlur={handleBlur}
                onChange={(e) => {
                  setData({ ...data, type: e.target.value });
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
              value={values.state}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
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

export default UpdateGoldRate;
