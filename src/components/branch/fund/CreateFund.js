import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createFund } from '../../../apis/branch/fund';

function CreateFund(props) {
  // Form validation
  const schema = Yup.object({
    type: Yup.string().required('Type is required'),
    amount: Yup.string().required('Amount is required'),
    from: Yup.string().required('From is required'),
    to: Yup.string().required('To is required'),
    note: Yup.string().required('Note is required'),
    status: Yup.string().required('Status is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: {
      type: '',
      amount: '',
      from: '',
      to: '',
      note: '',
      status: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createFund(values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Fund not created',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Fund created',
            severity: 'success',
          });
        }
      });
    },
  });

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
              name="type"
              value={values.type}
              error={touched.type && errors.type && true}
              label={touched.type && errors.type ? errors.type : 'Type'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="amount"
              value={values.amount}
              error={touched.amount && errors.amount && true}
              label={touched.amount && errors.amount ? errors.amount : 'Amount'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="from"
              value={values.from}
              error={touched.from && errors.from && true}
              label={touched.from && errors.from ? errors.from : 'From'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="to"
              value={values.to}
              error={touched.to && errors.to && true}
              label={touched.to && errors.to ? errors.to : 'To'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="note"
              value={values.note}
              error={touched.note && errors.note && true}
              label={touched.note && errors.note ? errors.note : 'Note'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={touched.status && errors.status && true}>
              <InputLabel id="select-label">Select status</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.status && errors.status ? errors.status : 'Select status'}
                name="status"
                value={values.status}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
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

export default CreateFund;
