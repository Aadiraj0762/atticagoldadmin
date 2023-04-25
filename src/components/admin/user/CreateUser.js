import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../../apis/admin/user';
import { getLoginNotCreatedEmployee } from '../../../apis/admin/employee';

function CreateUser(props) {
  const [status, setStatus] = useState('');
  const [userType, setUserType] = useState('');
  const [employee, setEmployee] = useState('');
  const [employees, setEmloyees] = useState([]);
  const form = useRef();

  useEffect(() => {
    getLoginNotCreatedEmployee().then((data) => {
      setEmloyees(data.data);
    });
  }, []);

  // Form validation
  const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    userType: Yup.string().required('User type is required'),
    employee: Yup.string().required('Employee Id is required'),
    status: Yup.string().required('Status is required'),
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors, resetForm } = useFormik({
    initialValues: {
      username: '',
      password: '',
      userType: '',
      employee: '',
      status: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createUser(values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: data.message,
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          form.current.reset();
          setStatus('');
          resetForm();
          props.setNotify({
            open: true,
            message: 'User created',
            severity: 'success',
          });
        }
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
              name="username"
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
                value={userType}
                onBlur={handleBlur}
                onChange={(e) => {
                  setUserType(e.target.value);
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
            <FormControl fullWidth error={touched.employee && errors.employee && true}>
              <InputLabel id="select-label">Select employee</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.employee && errors.employee ? errors.employee : 'Select employee'}
                name="employee"
                value={employee}
                onBlur={handleBlur}
                onChange={(e) => {
                  setEmployee(e.target.value);
                  handleChange(e);
                }}
              >
                {employees.map((e) => (
                  <MenuItem value={e._id}>{e.employeeId}</MenuItem>
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
                value={status}
                onBlur={handleBlur}
                onChange={(e) => {
                  setStatus(e.target.value);
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

export default CreateUser;
