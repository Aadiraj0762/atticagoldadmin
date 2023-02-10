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
  Checkbox,
  Paper,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Iconify from '../../../iconify';
import Label from '../../../label';
import { getCustomer, createCustomer, deleteCustomerById } from '../../../../apis/branch/customer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxHeight: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflow: 'auto',
};

function Customer({ step, setStep, setNotify }) {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [customerModal, setCustomerModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    getCustomer().then((data) => {
      setData(data.data);
    });
  }, []);

  // Form validation
  const schema = Yup.object({
    customerId: Yup.string().required('Customer id is required'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email id is required'),
    dob: Yup.string().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    otp: Yup.string().required('Otp is required'),
    employmentType: Yup.string().required('Employment type is required'),
    organisation: Yup.string().required('Organisation is required'),
    annualIncome: Yup.string().required('Annual income is required'),
    maritalStatus: Yup.string().required('Marital is required'),
    status: Yup.string().required('Status is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      customerId: '',
      name: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      email: '',
      dob: '',
      gender: '',
      otp: '',
      employmentType: '',
      organisation: '',
      annualIncome: '',
      maritalStatus: '',
      source: '',
      signature: '',
      status: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createCustomer(values).then((data) => {
        if (data.status === false) {
          setNotify({
            open: true,
            message: 'Customer not created',
            severity: 'error',
          });
        } else {
          getCustomer().then((data) => {
            setData(data.data);
          });
          setCustomerModal(false);
          setNotify({
            open: true,
            message: 'Customer created',
            severity: 'success',
          });
        }
      });
    },
  });

  const handleSelect = (id) => {
    if (selectedId && selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const handleDelete = () => {
    deleteCustomerById(openId).then(() => {
      getCustomer().then((data) => {
        setData(data.data);
      });
      handleCloseDeleteModal();
    });
  };

  return (
    <>
      <Card sx={{ display: step === 1 ? 'block' : 'none', p: 4, my: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant="h4" gutterBottom>
            Customers
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setCustomerModal(true)}
          >
            New Customer
          </Button>
        </Stack>
        <Box sx={{ height: 400, width: '100%' }}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableCell align="left" />
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableHead>
              <TableBody>
                {data.map((e) => (
                  <TableRow hover key={e._id} tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedId === e._id} onChange={() => handleSelect(e._id)} />
                    </TableCell>
                    <TableCell align="left">{e.name}</TableCell>
                    <TableCell align="left">{e.email}</TableCell>
                    <TableCell align="left">{e.phoneNumber}</TableCell>
                    <TableCell align="left">{sentenceCase(e.gender)}</TableCell>
                    <TableCell align="left">
                      <Label
                        color={
                          (e.status === 'active' && 'success') || (e.status === 'deactive' && 'error') || 'warning'
                        }
                      >
                        {sentenceCase(e.status)}
                      </Label>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setOpenId(e._id);
                          handleOpenDeleteModal();
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography paragraph>No data in table</Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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
      </Card>

      <Modal
        open={customerModal}
        onClose={() => setCustomerModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Customer
          </Typography>
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
                  name="customerId"
                  value={values.customerId}
                  error={touched.customerId && errors.customerId && true}
                  label={touched.customerId && errors.customerId ? errors.customerId : 'Customer Id'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
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
                  name="phoneNumber"
                  value={values.phoneNumber}
                  error={touched.phoneNumber && errors.phoneNumber && true}
                  label={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : 'Phone'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="alternatePhoneNumber"
                  value={values.alternatePhoneNumber}
                  error={touched.alternatePhoneNumber && errors.alternatePhoneNumber && true}
                  label={
                    touched.alternatePhoneNumber && errors.alternatePhoneNumber
                      ? errors.alternatePhoneNumber
                      : 'Alt Phone'
                  }
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
                  name="employmentType"
                  value={values.employmentType}
                  error={touched.employmentType && errors.employmentType && true}
                  label={touched.employmentType && errors.employmentType ? errors.employmentType : 'Employment Type'}
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
                  name="annualIncome"
                  value={values.annualIncome}
                  error={touched.annualIncome && errors.annualIncome && true}
                  label={touched.annualIncome && errors.annualIncome ? errors.annualIncome : 'Annualincome'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth error={touched.maritalStatus && errors.maritalStatus && true}>
                  <InputLabel id="select-label">Select maritalStatus</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label={
                      touched.maritalStatus && errors.maritalStatus ? errors.maritalStatus : 'Select maritalStatus'
                    }
                    name="maritalStatus"
                    value={values.maritalStatus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="unmarried">Unmarried</MenuItem>
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
              <Grid item xs={4}>
                <TextField
                  name="chooseId"
                  value={values.chooseId}
                  error={touched.chooseId && errors.chooseId && true}
                  label={touched.chooseId && errors.chooseId ? errors.chooseId : 'Choose Id'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="idNo"
                  value={values.idNo}
                  error={touched.idNo && errors.idNo && true}
                  label={touched.idNo && errors.idNo ? errors.idNo : 'Id No'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="uploadId"
                  value={values.uploadId}
                  error={touched.uploadId && errors.uploadId && true}
                  label={touched.uploadId && errors.uploadId ? errors.uploadId : 'Upload Id'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="signature"
                  value={values.signature}
                  error={touched.signature && errors.signature && true}
                  label={touched.signature && errors.signature ? errors.signature : 'Signature'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="profileImage"
                  value={values.profileImage}
                  error={touched.profileImage && errors.profileImage && true}
                  label={touched.profileImage && errors.profileImage ? errors.profileImage : 'Profile image'}
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
        </Box>
      </Modal>

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            Do you want branchId delete?
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2} mt={3}>
            <Button variant="contained" color="error" onClick={() => handleDelete()}>
              Delete
            </Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Customer;
