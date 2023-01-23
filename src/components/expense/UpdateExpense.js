import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getExpenseById, updateExpense } from '../../apis/expense';

function UpdateExpense(props) {
  const [data, setData] = useState({
    type: '',
    amount: '',
    branchId: '',
    note: '',
    status: '',
  });

  // Form validation
  const schema = Yup.object({
    type: Yup.string().required('Type is required'),
    amount: Yup.string().required('Amount is required'),
    branchId: Yup.string().required('Branch id is required'),
    note: Yup.string().required('Note is required'),
    status: Yup.string().required('Status is required'),
  });

  const initialValues = {
    type: '',
    amount: '',
    from: '',
    branchId: '',
    note: '',
    status: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      updateExpense(props.id, values).then((data) => {
        if (data.status === false) {
          props.setNotify({
            open: true,
            message: 'Expense not updated',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Expense updated',
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
      getExpenseById(props.id).then((data) => {
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
              name="type"
              value={data.type}
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
              value={data.amount}
              error={touched.amount && errors.amount && true}
              label={touched.amount && errors.amount ? errors.amount : 'Amount'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="branchId"
              value={data.branchId}
              error={touched.branchId && errors.branchId && true}
              label={touched.branchId && errors.branchId ? errors.branchId : 'Branch id'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="note"
              value={data.note}
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
                value={data.status}
                onBlur={handleBlur}
                onChange={(e) => {
                  setData({ ...data, status: e.target.value });
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

export default UpdateExpense;
