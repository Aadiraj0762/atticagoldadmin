import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { getLeaveById, updateLeave } from '../../../apis/hr/leave';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

function UpdateLeave(props) {
  // Form validation
  const schema = Yup.object({
    branchId: Yup.string().required('Branch id is required'),
    employeeId: Yup.string().required('Employee Id is required'),
    leaveType: Yup.string().required('Leave type is required'),
    proof: Yup.string().required('Proof is required'),
    dates: Yup.array().required('Dates is required'),
    note: Yup.string().required('Note is required'),
    status: Yup.string().required('Status is required'),
  });

  const initialValues = {
    branchId: '',
    employeeId: '',
    leaveType: '',
    proof: '',
    dates: [],
    note: '',
    status: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      updateLeave(props.id, values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Leave not updated',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Leave updated',
            severity: 'success',
          });
        }
      });
    },
  });

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!values.dates) {
      return <PickersDay {...pickersDayProps} />;
    }
    const selected = values.dates.find((item) => item?.isSame(moment(date)));
    return <CustomPickersDay {...pickersDayProps} disableMargin selected={selected} />;
  };

  useEffect(() => {
    setValues(initialValues);
    resetForm();
    if (props.id) {
      getLeaveById(props.id).then((data) => {
        const payload = {
          ...data.data,
          dates: data.data.dates?.map((item) => moment(moment(item).format('YYYY-MM-DD'))),
        };
        setValues(payload ?? {});
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
              name="branchId"
              value={values.branchId}
              error={touched.branchId && errors.branchId && true}
              label={touched.branchId && errors.branchId ? errors.branchId : 'Branch Id'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
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
              name="leaveType"
              value={values.leaveType}
              error={touched.leaveType && errors.leaveType && true}
              label={touched.leaveType && errors.leaveType ? errors.leaveType : 'Leave Type'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="proof"
              value={values.proof}
              error={touched.proof && errors.proof && true}
              label={touched.proof && errors.proof ? errors.proof : 'Proof'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterMoment} fullWidth>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                name="dates"
                error={touched.dates && errors.dates && true}
                label={touched.dates && errors.dates ? errors.dates : 'Dates'}
                value={values.dates}
                onChange={(newValue) => {
                  const array = [...values.dates];
                  const date = newValue;
                  const index = array.findIndex((item) => item?.isSame(moment(date)));
                  if (index >= 0) {
                    array.splice(index, 1);
                  } else {
                    array.push(date);
                  }
                  setValues({ ...values, dates: array });
                }}
                renderDay={renderPickerDay}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
                onChange={(e) => {
                  setValues({ ...values, status: e.target.value });
                  handleChange(e);
                }}
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

export default UpdateLeave;
