import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Grid,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Modal,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Iconify from '../../iconify';
import { createSales } from '../../../apis/branch/sales';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function CreateSale(props) {
  const [addressModal, setAddressModal] = useState(false);
  const [step, setStep] = useState(1);

  // Form validation
  const schema = Yup.object({
    cusid: Yup.string().required('Customer id is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email id is required'),
    dob: Yup.string().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    otp: Yup.string().required('Otp is required'),
    employment: Yup.string().required('Employment is required'),
    organisation: Yup.string().required('Organisation is required'),
    annualincome: Yup.string().required('Annualincome is required'),
    marital: Yup.string().required('Marital is required'),
    source: Yup.string().required('Source is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      cusid: '',
      name: '',
      phone: '',
      email: '',
      dob: '',
      gender: '',
      otp: '',
      employment: '',
      organisation: '',
      annualincome: '',
      marital: '',
      source: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createSales(values).then((data) => {
        if (data.gender === false) {
          props.setNotify({
            open: true,
            message: 'Sale not created',
            severity: 'error',
          });
        } else {
          props.setToggleContainer(false);
          props.setNotify({
            open: true,
            message: 'Sale created',
            severity: 'success',
          });
        }
      });
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete="off"
      >
        <Card sx={{ display: step === 1 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Customer Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="name"
                value={values.name}
                error={touched.name && errors.name && true}
                label={touched.name && errors.name ? errors.name : 'Name'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="phone"
                value={values.phone}
                error={touched.phone && errors.phone && true}
                label={touched.phone && errors.phone ? errors.phone : 'Phone'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="email"
                value={values.email}
                error={touched.email && errors.email && true}
                label={touched.email && errors.email ? errors.email : 'Email id'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob"
                value={values.dob}
                error={touched.dob && errors.dob && true}
                label={touched.dob && errors.dob ? errors.dob : 'DOB'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.gender && errors.gender && true}>
                <InputLabel id="select-label">Select gender</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.gender && errors.gender ? errors.gender : 'Select gender'}
                  name="gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="otp"
                value={values.otp}
                error={touched.otp && errors.otp && true}
                label={touched.otp && errors.otp ? errors.otp : 'OTP'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="employment"
                value={values.employment}
                error={touched.employment && errors.employment && true}
                label={touched.employment && errors.employment ? errors.employment : 'Employment'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="organisation"
                value={values.organisation}
                error={touched.organisation && errors.organisation && true}
                label={touched.organisation && errors.organisation ? errors.organisation : 'Organisation'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="annualincome"
                value={values.annualincome}
                error={touched.annualincome && errors.annualincome && true}
                label={touched.annualincome && errors.annualincome ? errors.annualincome : 'Annualincome'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.marital && errors.marital && true}>
                <InputLabel id="select-label">Select marital</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.marital && errors.marital ? errors.marital : 'Select marital'}
                  name="marital"
                  value={values.marital}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="married">married</MenuItem>
                  <MenuItem value="unmarried">unmarried</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="source"
                value={values.source}
                error={touched.source && errors.source && true}
                label={touched.source && errors.source ? errors.source : 'Source'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
                <Typography variant="h4" gutterBottom>
                  Customer Address
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setAddressModal(true)}
                >
                  New Address
                </Button>
              </Stack>
              <Box sx={{ height: 400, width: '100%' }}>
                {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              /> */}

                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="left">Pincode</TableCell>
                      <TableCell align="left">Type</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow hover key={1} tabIndex={-1}>
                        <TableCell align="left">B123 Someware in mumbai</TableCell>
                        <TableCell align="left">43004</TableCell>
                        <TableCell align="left">Home</TableCell>
                        <TableCell align="left">
                          <Button variant="contained" startIcon={<DeleteIcon />}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow hover key={2} tabIndex={-1}>
                        <TableCell align="left">B123 Someware in mumbai, maharastra</TableCell>
                        <TableCell align="left">43004</TableCell>
                        <TableCell align="left">Office</TableCell>
                        <TableCell align="left">
                          <Button variant="contained" startIcon={<DeleteIcon />}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size="large" name="submit" type="button" variant="contained">
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => setStep(2)}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ display: step === 2 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Ornament Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="name"
                value={values.name}
                error={touched.name && errors.name && true}
                label={touched.name && errors.name ? errors.name : 'Name'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="phone"
                value={values.phone}
                error={touched.phone && errors.phone && true}
                label={touched.phone && errors.phone ? errors.phone : 'Phone'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="email"
                value={values.email}
                error={touched.email && errors.email && true}
                label={touched.email && errors.email ? errors.email : 'Email id'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob"
                value={values.dob}
                error={touched.dob && errors.dob && true}
                label={touched.dob && errors.dob ? errors.dob : 'DOB'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(1)}>
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => setStep(2)}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </form>

      <Modal
        open={addressModal}
        onClose={() => setAddressModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Customer Address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="name"
                value={values.name}
                error={touched.name && errors.name && true}
                label={touched.name && errors.name ? errors.name : 'Name'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="phone"
                value={values.phone}
                error={touched.phone && errors.phone && true}
                label={touched.phone && errors.phone ? errors.phone : 'Phone'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="email"
                value={values.email}
                error={touched.email && errors.email && true}
                label={touched.email && errors.email ? errors.email : 'Email id'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob"
                value={values.dob}
                error={touched.dob && errors.dob && true}
                label={touched.dob && errors.dob ? errors.dob : 'DOB'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.gender && errors.gender && true}>
                <InputLabel id="select-label">Select gender</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.gender && errors.gender ? errors.gender : 'Select gender'}
                  name="gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="otp"
                value={values.otp}
                error={touched.otp && errors.otp && true}
                label={touched.otp && errors.otp ? errors.otp : 'OTP'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="employment"
                value={values.employment}
                error={touched.employment && errors.employment && true}
                label={touched.employment && errors.employment ? errors.employment : 'Employment'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="organisation"
                value={values.organisation}
                error={touched.organisation && errors.organisation && true}
                label={touched.organisation && errors.organisation ? errors.organisation : 'Organisation'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="annualincome"
                value={values.annualincome}
                error={touched.annualincome && errors.annualincome && true}
                label={touched.annualincome && errors.annualincome ? errors.annualincome : 'Annualincome'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.marital && errors.marital && true}>
                <InputLabel id="select-label">Select marital</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.marital && errors.marital ? errors.marital : 'Select marital'}
                  name="marital"
                  value={values.marital}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="married">married</MenuItem>
                  <MenuItem value="unmarried">unmarried</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size="large" name="submit" type="button" variant="contained">
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default CreateSale;
