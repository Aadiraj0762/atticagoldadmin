import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../features/authSlice';
import { loginApi, getUserTypeApi, getBranchUserApi } from '../../../apis/auth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Form validation
  const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    employeeId: isEmployee && Yup.string().required('Employee is required'),
    password: Yup.string().required('Password is required'),
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      username: '',
      employeeId: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setError(null);
      loginApi(values)
        .then((data) => {
          if (data.status === true) {
            console.log(data.data);
            dispatch(login(data.data));
            navigate('/dashboard', { replace: true });
          } else {
            setError(data.response.data.message || data.message);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    },
  });

  if (auth.isAuthenticated === true) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Stack spacing={3}>
        {error && (
          <Typography
            sx={{
              textAlign: 'center',
              color: 'red',
            }}
          >
            {error}
          </Typography>
        )}

        <TextField
          name="username"
          error={touched.username && errors.username && true}
          label={touched.username && errors.username ? errors.username : 'Username'}
          onChange={handleChange}
          onBlur={async (e) => {
            setIsDisable(true);
            try {
              const userType = await getUserTypeApi({
                username: e.target.value,
              });

              if (userType?.data?.userType && userType.data.userType === 'branch') {
                const employee = await getBranchUserApi({
                  username: e.target.value,
                });
                if (employee?.data?.length > 0) {
                  setEmployees(employee.data ?? []);
                  setIsEmployee(true);
                }
              }
            } catch (err) {
              setIsEmployee(false);
            }
            handleBlur(e);
            setIsDisable(false);
          }}
        />

        <FormControl
          sx={{
            width: '100%',
            display: isEmployee === true ? 'flex' : 'none',
          }}
          error={touched.employeeId && errors.employeeId && true}
        >
          <InputLabel id="select-label">
            {touched.employeeId && errors.employeeId ? errors.employeeId : 'Select employee'}
          </InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label={touched.employeeId && errors.employeeId ? errors.employeeId : 'Select employee'}
            name="employeeId"
            value={employeeId}
            onChange={(event) => {
              setEmployeeId(event.target.value);
              handleChange(event);
            }}
          >
            {employees?.map((data) => (
              <MenuItem value={data.employeeId} key={data.employeeId ?? 0}>
                {data.employeeId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="password"
          error={touched.password && errors.password && true}
          label={touched.password && errors.password ? errors.password : 'Password'}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={isDisable}>
        Login
      </LoadingButton>
    </form>
  );
}
