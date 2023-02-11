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
  const [addressModal, setAddressModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [ornamentModal, setOrnamentModal] = useState(false);
  const [releaseModal, setReleaseModal] = useState(false);
  const [bankModal, setBankModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);

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
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
                  <Typography variant="h4" gutterBottom>
                    Bank
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => setBankModal(true)}
                  >
                    New Bank
                  </Button>
                </Stack>
                <Box sx={{ height: 200, width: '100%' }}>
                  <TableContainer sx={{ overflow: 'auto' }}>
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
              </Grid>
            )}
            {values.saleType === 'pledged' && (
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
                  <Typography variant="h4" gutterBottom>
                    Release
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => setReleaseModal(true)}
                  >
                    New Release
                  </Button>
                </Stack>
                <Box sx={{ height: 200, width: '100%' }}>
                  <TableContainer sx={{ overflow: 'auto' }}>
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
              </Grid>
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
                onClick={() => setStep(4)}
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
        open={releaseModal}
        onClose={() => setReleaseModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Release
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
              <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
                <Typography variant="h4" gutterBottom>
                  Bank
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setBankModal(true)}
                >
                  New Bank
                </Button>
              </Stack>
              <Box sx={{ height: 200, width: '100%' }}>
                <TableContainer sx={{ overflow: 'auto' }}>
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

      <Modal
        open={bankModal}
        onClose={() => setBankModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Bank
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
