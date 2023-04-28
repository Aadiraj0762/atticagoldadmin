import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getBranchById, updateBranch } from '../../../apis/admin/branch';

function UpdateBranch(props) {
  // Form validation
  const schema = Yup.object({
    branchId: Yup.string().required('Branch id is required'),
    branchName: Yup.string().required('Branch name is required'),
    gstNumber: Yup.string().required('GST Number is required'),
    address: Yup.string().required('address is required'),
    area: Yup.string().required('Area is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required'),
    landmark: Yup.string().required('Landmark is required'),
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required'),
    isHeadOffice: Yup.string().required('Is Head Office is required'),
  });

  const initialValues = {
    branchId: '',
    branchName: '',
    gstNumber: '',
    address: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    longitude: '',
    latitude: '',
    isHeadOffice: '',
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue, setValues, resetForm } = useFormik({
    initialValues: { ...initialValues },
    validationSchema: schema,
    onSubmit: (values) => {
      const payload = {
        branchId: values.branchId,
        branchName: values.branchName,
        gstNumber: values.gstNumber,
        address: {
          address: values.address,
          area: values.area,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          landmark: values.landmark,
          longitude: values.longitude,
          latitude: values.latitude,
        },
        isHeadOffice: values.isHeadOffice,
      };
      updateBranch(props.id, payload).then((data) => {
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
      getBranchById(props.id).then((data) => {
        setValues({
          branchId: data.data.branchId ?? '',
          branchName: data.data.branchName ?? '',
          gstNumber: data.data.gstNumber ?? '',
          address: data.data.address.address ?? '',
          area: data.data.address.area ?? '',
          city: data.data.address.city ?? '',
          state: data.data.address.state ?? '',
          pincode: data.data.address.pincode ?? '',
          landmark: data.data.address.landmark ?? '',
          longitude: data.data.address.longitude ?? '',
          latitude: data.data.address.latitude ?? '',
          isHeadOffice: data.data.isHeadOffice ?? '',
        });
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              name="branchName"
              value={values.branchName}
              error={touched.branchName && errors.branchName && true}
              label={touched.branchName && errors.branchName ? errors.branchName : 'Branch Name'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="gstNumber"
              value={values.gstNumber}
              error={touched.gstNumber && errors.gstNumber && true}
              label={touched.gstNumber && errors.gstNumber ? errors.gstNumber : 'GST Number'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="address"
              value={values.address}
              error={touched.address && errors.address && true}
              label={touched.address && errors.address ? errors.address : 'Address'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="area"
              value={values.area}
              error={touched.area && errors.area && true}
              label={touched.area && errors.area ? errors.area : 'Area'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="city"
              value={values.city}
              error={touched.city && errors.city && true}
              label={touched.city && errors.city ? errors.city : 'City'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="state"
              value={values.state}
              error={touched.state && errors.state && true}
              label={touched.state && errors.state ? errors.state : 'State'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="pincode"
              value={values.pincode}
              error={touched.pincode && errors.pincode && true}
              label={touched.pincode && errors.pincode ? errors.pincode : 'Pincode'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="landmark"
              value={values.landmark}
              error={touched.landmark && errors.landmark && true}
              label={touched.landmark && errors.landmark ? errors.landmark : 'Landmark'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="longitude"
              value={values.longitude}
              error={touched.longitude && errors.longitude && true}
              label={touched.longitude && errors.longitude ? errors.longitude : 'Longitude'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="latitude"
              value={values.latitude}
              error={touched.latitude && errors.latitude && true}
              label={touched.latitude && errors.latitude ? errors.latitude : 'Latitude'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={touched.isHeadOffice && errors.isHeadOffice && true}>
              <InputLabel id="select-label">Is Head Office</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.isHeadOffice && errors.isHeadOffice ? errors.isHeadOffice : 'Select Head Office'}
                name="isHeadOffice"
                value={values.isHeadOffice}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('isHeadOffice', e.target.value, true);
                }}
              >
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
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

export default UpdateBranch;
