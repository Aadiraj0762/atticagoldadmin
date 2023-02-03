import { TextField, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createAttendance } from '../../../apis/branch/attendance';

function CreateAttendance(props) {
  // Form validation
  const schema = Yup.object({
    employeeId: Yup.string().required('Amount is required'),
    employeePhoto: Yup.string().required('From is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      employeeId: '',
      employeePhoto: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createAttendance(values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Attendance not created',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Attendance created',
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

export default CreateAttendance;
