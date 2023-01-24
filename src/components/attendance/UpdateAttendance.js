import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAttendanceById, updateAttendance } from '../../apis/attendance';

function UpdateAttendance(props) {
  // Form validation
  const schema = Yup.object({
    employeeId: Yup.string().required('Amount is required'),
    employeePhoto: Yup.string().required('From is required'),
  });

  const initialValues = {
    employeeId: '',
    employeePhoto: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      updateAttendance(props.id, values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Attendance not updated',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Attendance updated',
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
      getAttendanceById(props.id).then((data) => {
        setValues(data.data ?? {});
      });
    }
  }, [props.id]);

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
              name="employeeId"
              value={values.employeeId}
              error={touched.employeeId && errors.employeeId && true}
              label={touched.employeeId && errors.employeeId ? errors.employeeId : 'Employee Id'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="employeePhoto"
              value={values.employeePhoto}
              error={touched.employeePhoto && errors.employeePhoto && true}
              label={touched.employeePhoto && errors.employeePhoto ? errors.employeePhoto : 'Employee Photo'}
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

export default UpdateAttendance;
