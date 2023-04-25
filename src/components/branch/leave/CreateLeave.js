import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { getLeaveById, createLeave } from '../../../apis/branch/leave';

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

function CreateLeave(props) {
  const form = useRef();

  // Form validation
  const schema = Yup.object({
    branchId: Yup.string().required('Branch id is required'),
    employeeId: Yup.string().required('Employee Id is required'),
    leaveType: Yup.string().required('Leave type is required'),
    dates: Yup.array().required('Dates is required'),
    note: Yup.string().required('Note is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: {
      branchId: '',
      employeeId: '',
      leaveType: '',
      proof: {},
      dates: [moment(moment().format('YYYY-MM-DD'))],
      note: '',
      status: 'pending',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'dates') {
          values.dates.forEach((date) => {
            formData.append('dates[]', date.format('YYYY-MM-DD'));
          });
        } else {
          formData.append(key, values[key]);
        }
      });
      createLeave(formData).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Leave not created',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          form.current.reset();
          resetForm();
          props.setNotify({
            open: true,
            message: 'Leave created',
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

  return (
    <Card sx={{ p: 4, my: 4 }}>
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete="off"
        encType="multipart/form-data"
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
              type={'file'}
              fullWidth
              onBlur={handleBlur}
              onChange={(e) => {
                setValues({ ...values, proof: e.target.files[0] });
              }}
              required
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

export default CreateLeave;
