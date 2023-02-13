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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Iconify from '../../iconify';
import { createSales } from '../../../apis/branch/sales';
import Customer from './customer';
import Address from './address';
import Bank from './bank';
import Release from './release';

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

function CreateSale(props) {
  const [ornamentModal, setOrnamentModal] = useState(false);
  const [releaseModal, setReleaseModal] = useState(false);
  const [bankModal, setBankModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [selectedReleaseId, setSelectedReleaseId] = useState(null);

  // Form validation
  const schema = Yup.object({
    saleType: Yup.string().required('Customer id is required'),
    dop: Yup.string().required('DOP is required'),
    paymentType: Yup.string().required('Payment type is required'),
    margin: Yup.string().required('Margin is required'),
    status: Yup.string().required('DOB is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      saleType: '',
      dop: '',
      paymentType: '',
      cashAmount: '',
      bankAmount: '',
      margin: '',
      status: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createSales(values).then((data) => {
        if (data.status === false) {
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
      <Customer
        step={step}
        setStep={setStep}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        {...props}
      />

      <Address
        step={step}
        setStep={setStep}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        {...props}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete="off"
      >
        <Card sx={{ display: step === 3 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Billing Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.saleType && errors.saleType && true}>
                <InputLabel id="select-saleType">Select sale type</InputLabel>
                <Select
                  labelId="select-saleType"
                  id="select"
                  label={touched.saleType && errors.saleType ? errors.saleType : 'Select sale type'}
                  name="saleType"
                  value={values.saleType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="physical">Physical</MenuItem>
                  <MenuItem value="pledged">Pledged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dop"
                value={values.dop}
                error={touched.dop && errors.dop && true}
                label={touched.dop && errors.dop ? errors.dop : 'DOP'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.paymentType && errors.paymentType && true}>
                <InputLabel id="select-paymentType">Select payment type</InputLabel>
                <Select
                  labelId="select-paymentType"
                  id="select"
                  label={touched.paymentType && errors.paymentType ? errors.paymentType : 'Select payment type'}
                  name="paymentType"
                  value={values.paymentType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="bank">Bank</MenuItem>
                  <MenuItem value="cash">Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="cashAmount"
                value={values.cashAmount}
                error={touched.cashAmount && errors.cashAmount && true}
                label={touched.cashAmount && errors.cashAmount ? errors.cashAmount : 'Cash Amount'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            {values.paymentType === 'bank' && (
              <Grid item xs={4}>
                <TextField
                  name="bankAmount"
                  value={values.bankAmount}
                  error={touched.bankAmount && errors.bankAmount && true}
                  label={touched.bankAmount && errors.bankAmount ? errors.bankAmount : 'Bank Amount'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={4}>
              <TextField
                name="margin"
                value={values.margin}
                error={touched.margin && errors.margin && true}
                label={touched.margin && errors.margin ? errors.margin : 'Margin'}
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
            {values.paymentType === 'bank' && (
              <Bank
                selectedUserId={selectedUserId}
                selectedBankId={selectedBankId}
                setSelectedBankId={setSelectedBankId}
                {...props}
              />
            )}
            {values.saleType === 'pledged' && (
              <Release
                selectedUserId={selectedUserId}
                selectedReleaseId={selectedReleaseId}
                setSelectedReleaseId={setSelectedReleaseId}
                {...props}
              />
            )}
            <Grid item xs={12}>
              <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(2)}>
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => {
                  if (values.paymentType === 'bank' && !selectedBankId) {
                    props.setNotify({
                      open: true,
                      message: 'Please select bank',
                      severity: 'info',
                    });
                  } else if (values.saleType === 'pledged' && !selectedReleaseId) {
                    props.setNotify({
                      open: true,
                      message: 'Please select release',
                      severity: 'info',
                    });
                  } else {
                    setStep(4);
                  }
                }}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ display: step === 4 ? 'block' : 'none', p: 4, my: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
            <Typography variant="h4" gutterBottom>
              Ornaments
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setOrnamentModal(true)}
            >
              New Ornament
            </Button>
          </Stack>
          <Box sx={{ height: 400, width: '100%' }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow hover key={1} tabIndex={-1}>
                    <TableCell align="left">Arjun</TableCell>
                    <TableCell align="left">arjun@gmail.com</TableCell>
                    <TableCell align="left">2323234342</TableCell>
                    <TableCell align="left">Male</TableCell>
                    <TableCell align="left">
                      <Button variant="contained" startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow hover key={1} tabIndex={-1}>
                    <TableCell align="left">Ravi</TableCell>
                    <TableCell align="left">ravi@gmail.com</TableCell>
                    <TableCell align="left">87293862963</TableCell>
                    <TableCell align="left">Male</TableCell>
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(3)}>
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => setStep(5)}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </form>

      <Modal
        open={ornamentModal}
        onClose={() => setOrnamentModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Ornaments
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="ornaments"
                value={values.ornaments}
                error={touched.ornaments && errors.ornaments && true}
                label={touched.ornaments && errors.ornaments ? errors.ornaments : 'Ornaments'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="count"
                value={values.count}
                error={touched.count && errors.count && true}
                label={touched.count && errors.count ? errors.count : 'Count'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="grossweight"
                value={values.grossweight}
                error={touched.grossweight && errors.grossweight && true}
                label={touched.grossweight && errors.grossweight ? errors.grossweight : 'Gross Weight'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="stoneweight"
                value={values.stoneweight}
                error={touched.stoneweight && errors.stoneweight && true}
                label={touched.stoneweight && errors.stoneweight ? errors.stoneweight : 'Stone Weight'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="purity"
                value={values.purity}
                error={touched.purity && errors.purity && true}
                label={touched.purity && errors.purity ? errors.purity : 'Purity'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="billid"
                value={values.billid}
                error={touched.billid && errors.billid && true}
                label={touched.billid && errors.billid ? errors.billid : 'billid'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
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
