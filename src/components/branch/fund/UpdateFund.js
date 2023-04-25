import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getFundById, updateFund } from '../../../apis/branch/fund';

function UpdateFund(props) {
  // Form validation
  const schema = Yup.object({
    type: Yup.string().required('Type is required'),
    amount: Yup.string().required('Amount is required'),
    from: Yup.string().required('From is required'),
    to: Yup.string().required('To is required'),
    note: Yup.string().required('Note is required'),
  });

  const initialValues = {
    type: '',
    amount: '',
    from: '',
    to: '',
    note: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      updateFund(props.id, values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Fund not updated',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          form.current.reset();
          resetForm();
          props.setNotify({
            open: true,
            message: 'Fund updated',
            severity: 'success',
          });
        }
      });
    },
  });

  useEffect(() => {
    setValues(initialValues);
    resetForm();
    if (props.id) {
      getFundById(props.id).then((data) => {
        setValues(data.data ?? {});
      });
    }
  }, [props.id]);

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

export default UpdateFund;
