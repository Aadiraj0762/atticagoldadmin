import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserById, updateUser } from '../../apis/user';

function UpdateUser(props) {
  const [data, setData] = useState({
    username: '',
    password: '',
    userType: '',
    employeeId: '',
    status: '',
  });

  // Form validation
  const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    userType: Yup.string().required('User type is required'),
    employeeId: Yup.string().required('Employee Id is required'),
    status: Yup.string().required('Status is required'),
  });

  const initialValues = {
    username: '',
    password: '',
    userType: '',
    employeeId: '',
    status: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      updateUser(props.id, values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Branch not updated',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Branch updated',
            severity: 'success',
          });
        }
      });
    },
  });

  useEffect(() => {
    setData(initialValues);
    setValues(initialValues);
    resetForm();
    if (props.id) {
      getUserById(props.id).then((data) => {
        setData(data.data ?? {});
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
              name="username"
              value={data.username}
              error={touched.username && errors.username && true}
              label={touched.username && errors.username ? errors.username : 'Username'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="password"
              value={data.password}
              error={touched.password && errors.password && true}
              label={touched.password && errors.password ? errors.password : 'Password'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={touched.userType && errors.userType && true}>
              <InputLabel id="select-label">Select user type</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.userType && errors.userType ? errors.userType : 'Select user type'}
                name="userType"
                value={data.userType}
                onBlur={handleBlur}
                onChange={(e) => {
                  setData({ ...data, userType: e.target.value });
                  handleChange(e);
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="hr">hr</MenuItem>
                <MenuItem value="accounts">accounts</MenuItem>
                <MenuItem value="branch">branch</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="employeeId"
              value={data.employeeId}
              error={touched.employeeId && errors.employeeId && true}
              label={touched.employeeId && errors.employeeId ? errors.employeeId : 'Employee Id'}
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
                value={data.status}
                onBlur={handleBlur}
                onChange={(e) => {
                  setData({ ...data, status: e.target.value });
                  handleChange(e);
                }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="deactive">Deactive</MenuItem>
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

export default UpdateUser;
