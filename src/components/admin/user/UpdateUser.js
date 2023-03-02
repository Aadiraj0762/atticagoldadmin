import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserById, updateUser } from '../../../apis/admin/user';
import { getEmployee } from '../../../apis/admin/employee';

function UpdateUser(props) {
  const [employees, setEmloyees] = useState([]);

  // Form validation
  const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    userType: Yup.string().required('User type is required'),
    employee: Yup.string().required('Employee Id is required'),
    status: Yup.string().required('Status is required'),
  });

  useEffect(() => {
    getEmployee().then((data) => {
      setEmloyees(data.data);
    });
  });

  const initialValues = {
    username: '',
    password: '',
    userType: '',
    employee: '',
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
    setValues(initialValues);
    resetForm();
    if (props.id) {
      getUserById(props.id).then((data) => {
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
              value={values.username}
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
              value={values.password}
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
                value={values.userType}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="hr">hr</MenuItem>
                <MenuItem value="accounts">accounts</MenuItem>
                <MenuItem value="branch">branch</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={touched.employee && errors.employee && true}>
              <InputLabel id="select-label">Select employee</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.employee && errors.employee ? errors.employee : 'Select employee'}
                name="employee"
                value={values.employee}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {employees.map((e) => (
                  <MenuItem value={e._id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
