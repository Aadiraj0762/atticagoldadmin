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
  const [customerModal, setCustomerModal] = useState(false);
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
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
            <Typography variant="h4" gutterBottom>
              Customer Details
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
                  <TableCell align="left">Action</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow hover key={1} tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
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
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
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
                  <TableCell align="left" />
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Pincode</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow hover key={1} tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
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
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
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
          <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(1)}>
            Prev
          </LoadingButton>
          <LoadingButton
            size="large"
            name="submit"
            type="button"
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => setStep(3)}
          >
            Next
          </LoadingButton>
        </Card>

        <Card sx={{ display: step === 3 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Billing Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.type && errors.type && true}>
                <InputLabel id="select-label">Select type</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.type && errors.type ? errors.type : 'Select type'}
                  name="type"
                  value={values.type}
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
                name="releaseid"
                value={values.releaseid}
                error={touched.releaseid && errors.releaseid && true}
                label={touched.releaseid && errors.releaseid ? errors.releaseid : 'Release Id'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
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
              <TextField
                name="uploadbill"
                value={values.uploadbill}
                error={touched.uploadbill && errors.uploadbill && true}
                label={touched.uploadbill && errors.uploadbill ? errors.uploadbill : 'Upload Bill'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="goldrate"
                value={values.goldrate}
                error={touched.goldrate && errors.goldrate && true}
                label={touched.goldrate && errors.goldrate ? errors.goldrate : 'Gold rate'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="totnetweight"
                value={values.totnetweight}
                error={touched.totnetweight && errors.totnetweight && true}
                label={touched.totnetweight && errors.totnetweight ? errors.totnetweight : 'Total Net Weight'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="totnetamount"
                value={values.totnetamount}
                error={touched.totnetamount && errors.totnetamount && true}
                label={touched.totnetamount && errors.totnetamount ? errors.totnetamount : 'Total Net Amount'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.paymentType && errors.paymentType && true}>
                <InputLabel id="select-label">Select paymentType</InputLabel>
                <Select
                  labelId="select-label"
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
              <TextField
                name="cashamount"
                value={values.cashamount}
                error={touched.cashamount && errors.cashamount && true}
                label={touched.cashamount && errors.cashamount ? errors.cashamount : 'Cash Amount'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="bankamount"
                value={values.bankamount}
                error={touched.bankamount && errors.bankamount && true}
                label={touched.bankamount && errors.bankamount ? errors.bankamount : 'Bank Amount'}
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
                </Select>
              </FormControl>
            </Grid>
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
                onClick={() => setStep(4)}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ display: step === 4 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Releases Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="weight"
                value={values.weight}
                error={touched.weight && errors.weight && true}
                label={touched.weight && errors.weight ? errors.weight : 'Weight'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="pledgeamount"
                value={values.pledgeamount}
                error={touched.pledgeamount && errors.pledgeamount && true}
                label={touched.pledgeamount && errors.pledgeamount ? errors.pledgeamount : 'Pledgeamount'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="payableamount"
                value={values.payableamount}
                error={touched.payableamount && errors.payableamount && true}
                label={touched.payableamount && errors.payableamount ? errors.payableamount : 'Payableamount'}
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
              <FormControl fullWidth error={touched.payablemode && errors.payablemode && true}>
                <InputLabel id="select-label">Select payablemode</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.payablemode && errors.payablemode ? errors.payablemode : 'Select payablemode'}
                  name="payablemode"
                  value={values.payablemode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="bank">Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="bankid"
                value={values.bankid}
                error={touched.bankid && errors.bankid && true}
                label={touched.bankid && errors.bankid ? errors.bankid : 'bankid'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="pledgeddate"
                value={values.pledgeddate}
                error={touched.pledgeddate && errors.pledgeddate && true}
                label={touched.pledgeddate && errors.pledgeddate ? errors.pledgeddate : 'pledgeddate'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="pledgedin"
                value={values.pledgedin}
                error={touched.pledgedin && errors.pledgedin && true}
                label={touched.pledgedin && errors.pledgedin ? errors.pledgedin : 'pledgedin'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="branch"
                value={values.branch}
                error={touched.branch && errors.branch && true}
                label={touched.branch && errors.branch ? errors.branch : 'branch'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="pledgeid"
                value={values.pledgeid}
                error={touched.pledgeid && errors.pledgeid && true}
                label={touched.pledgeid && errors.pledgeid ? errors.pledgeid : 'pledgeid'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="attach"
                value={values.attach}
                error={touched.attach && errors.attach && true}
                label={touched.attach && errors.attach ? errors.attach : 'attach'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="releasedate"
                value={values.releasedate}
                error={touched.releasedate && errors.releasedate && true}
                label={touched.releasedate && errors.releasedate ? errors.releasedate : 'releasedate'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="comments"
                value={values.comments}
                error={touched.comments && errors.comments && true}
                label={touched.comments && errors.comments ? errors.comments : 'comments'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="empid"
                value={values.empid}
                error={touched.empid && errors.empid && true}
                label={touched.empid && errors.empid ? errors.empid : 'empid'}
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
                </Select>
              </FormControl>
            </Grid>
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
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ display: step === 5 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Ornament Details
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
              <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(4)}>
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => setStep(6)}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ display: step === 6 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Bank Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="accno"
                value={values.accno}
                error={touched.accno && errors.accno && true}
                label={touched.accno && errors.accno ? errors.accno : 'Account No'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="accname"
                value={values.accname}
                error={touched.accname && errors.accname && true}
                label={touched.accname && errors.accname ? errors.accname : 'Account Name'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="ifsccode"
                value={values.ifsccode}
                error={touched.ifsccode && errors.ifsccode && true}
                label={touched.ifsccode && errors.ifsccode ? errors.ifsccode : 'ifsccode'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="bank"
                value={values.bank}
                error={touched.bank && errors.bank && true}
                label={touched.bank && errors.bank ? errors.bank : 'Bank name'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="branch"
                value={values.branch}
                error={touched.branch && errors.branch && true}
                label={touched.branch && errors.branch ? errors.branch : 'Bank branch'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.prooftype && errors.prooftype && true}>
                <InputLabel id="select-label">Select prooftype</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label={touched.prooftype && errors.prooftype ? errors.prooftype : 'Select prooftype'}
                  name="prooftype"
                  value={values.prooftype}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="check">Check</MenuItem>
                  <MenuItem value="passbook">Passbook</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="proofupload"
                value={values.proofupload}
                error={touched.proofupload && errors.proofupload && true}
                label={touched.proofupload && errors.proofupload ? errors.proofupload : 'Bank proofupload'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(5)}>
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => setStep(6)}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </form>

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
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                name="cusid"
                value={values.cusid}
                error={touched.cusid && errors.cusid && true}
                label={touched.cusid && errors.cusid ? errors.cusid : 'Customer Id'}
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
                name="pic"
                value={values.pic}
                error={touched.pic && errors.pic && true}
                label={touched.pic && errors.pic ? errors.pic : 'Pic'}
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
                name="addrproof"
                value={values.addrproof}
                error={touched.addrproof && errors.addrproof && true}
                label={touched.addrproof && errors.addrproof ? errors.addrproof : 'Addr proof'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="proofid"
                value={values.proofid}
                error={touched.proofid && errors.proofid && true}
                label={touched.proofid && errors.proofid ? errors.proofid : 'Proof Id'}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="proofupload"
                value={values.proofupload}
                error={touched.proofupload && errors.proofupload && true}
                label={touched.proofupload && errors.proofupload ? errors.proofupload : 'Proofupload'}
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
