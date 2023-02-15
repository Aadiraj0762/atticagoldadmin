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
import { getAddressById, createAddress, deleteAddressById } from '../../../../apis/branch/customer-address';

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

function Address({ step, setStep, setNotify, selectedUserId, setSelectedUserId }) {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    if (selectedUserId) {
      getAddressById(selectedUserId).then((data) => {
        setData(data.data);
      });
    }
  }, [selectedUserId]);

  // Form validation
  const schema = Yup.object({
    address: Yup.string().required('Address is required'),
    area: Yup.string().required('Area is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required'),
    landmark: Yup.string().required('Landmark is required'),
    residential: Yup.string().required('Residential type is required'),
    label: Yup.string().required('Label is required'),
    documentType: Yup.string().required('Document type is required'),
    documentNo: Yup.string().required('Document no is required'),
    documentFile: Yup.string().required('Document file is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      address: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      residential: '',
      label: '',
      documentType: '',
      documentNo: '',
      documentFile: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createAddress({ customerId: selectedUserId, ...values }).then((data) => {
        if (data.status === false) {
          setNotify({
            open: true,
            message: 'Address not created',
            severity: 'error',
          });
        } else {
          getAddressById(selectedUserId).then((data) => {
            setData(data.data);
          });
          setAddressModal(false);
          setNotify({
            open: true,
            message: 'Address created',
            severity: 'success',
          });
        }
      });
    },
  });

  const handleDelete = () => {
    deleteAddressById(selectedUserId, openId).then(() => {
      getAddressById(selectedUserId).then((data) => {
        setData(data.data);
      });
      handleCloseDeleteModal();
    });
  };

  return (
    <>
      <Card sx={{ display: step === 2 ? 'block' : 'none', p: 4, my: 4 }}>
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
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Landmark</TableCell>
                <TableCell align="left">Pincode</TableCell>
                <TableCell align="left">Label</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableHead>
              <TableBody>
                {data?.map((e) => (
                  <TableRow hover key={e._id} tabIndex={-1}>
                    <TableCell align="left">{e.address}</TableCell>
                    <TableCell align="left">{e.landmark}</TableCell>
                    <TableCell align="left">{e.pincode}</TableCell>
                    <TableCell align="left">{sentenceCase(e.label)}</TableCell>
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
        <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(step - 1)}>
          Prev
        </LoadingButton>
        <LoadingButton
          size="large"
          name="submit"
          type="button"
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => {
            if (data.length === 0) {
              setNotify({
                open: true,
                message: 'Please add address',
                severity: 'info',
              });
            } else {
              setStep(step + 1);
            }
          }}
        >
          Next
        </LoadingButton>
      </Card>

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
                  name="address"
                  value={values.address}
                  error={touched.address && errors.address && true}
                  label={touched.address && errors.address ? errors.address : 'Address'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <TextField
                  name="residential"
                  value={values.residential}
                  error={touched.residential && errors.residential && true}
                  label={touched.residential && errors.residential ? errors.residential : 'Residential'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth error={touched.label && errors.label && true}>
                  <InputLabel id="select-label">Select label</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label={touched.label && errors.label ? errors.label : 'Select label'}
                    name="label"
                    value={values.label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="office">Office</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="documentType"
                  value={values.documentType}
                  error={touched.documentType && errors.documentType && true}
                  label={touched.documentType && errors.documentType ? errors.documentType : 'Proof document type'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="documentNo"
                  value={values.documentNo}
                  error={touched.documentNo && errors.documentNo && true}
                  label={touched.documentNo && errors.documentNo ? errors.documentNo : 'Document no'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="documentFile"
                  value={values.documentFile}
                  error={touched.documentFile && errors.documentFile && true}
                  label={touched.documentFile && errors.documentFile ? errors.documentFile : 'Document file'}
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
            Do you want to delete?
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

export default Address;
