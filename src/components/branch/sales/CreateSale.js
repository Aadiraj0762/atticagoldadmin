import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  Paper,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { sentenceCase } from 'change-case';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getBranchByBranchId } from '../../../apis/branch/branch';
import { getGoldRateByState } from '../../../apis/branch/gold-rate';
import { createSales } from '../../../apis/branch/sales';
import Customer from './customer';
import Address from './address';
import Bank from './bank';
import Release from './release';
import Ornament from './ornament';
import ProofDocument from './proof';
import Scrollbar from '../../scrollbar';

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
  const auth = useSelector((state) => state.auth);
  const [branch, setBranch] = useState({});
  const [goldRate, setGoldRate] = useState({});
  const [silverRate, setSilverRate] = useState({});
  const [ornaments, setOrnaments] = useState([]);
  const [proofDocument, setProofDocument] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedRelease, setSelectedRelease] = useState([]);
  const payload = {
    goldRate: goldRate?.rate ?? 0,
    silverRate: silverRate?.rate ?? 0,
    payableAmount: 0,
    netAmount: ornaments?.reduce((prev, cur) => prev + +cur.netAmount, 0) ?? 0,
    grossWeight: ornaments?.reduce((prev, cur) => prev + +cur.grossWeight, 0) ?? 0,
    stoneWeight: ornaments?.reduce((prev, cur) => prev + +cur.stoneWeight, 0) ?? 0,
    netWeight: ornaments?.reduce((prev, cur) => prev + +cur.netWeight, 0) ?? 0,
    releaseAmount: selectedRelease?.reduce((prev, cur) => prev + +cur.payableAmount, 0) ?? 0,
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ornaments.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    getBranchByBranchId({ branchId: auth.user.username }).then((data) => {
      setBranch(data.data);
      if (data.data) {
        getGoldRateByState({
          state: data.data.state,
          type: 'gold',
        }).then((data) => {
          setGoldRate(data.data);
        });
        getGoldRateByState({
          state: data.data.state,
          type: 'silver',
        }).then((data) => {
          setSilverRate(data.data);
        });
      }
    });
  }, [auth]);

  // Form validation
  const schema = Yup.object({
    ornamentType: Yup.string().required('Ornament type is required'),
    saleType: Yup.string().required('Customer id is required'),
    dop: Yup.string().required('DOP is required'),
    paymentType: Yup.string().required('Payment type is required'),
    margin: Yup.string().required('Margin is required'),
    status: Yup.string().required('Status is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, setValues, touched, errors } = useFormik({
    initialValues: {
      ornamentType: '',
      saleType: '',
      dop: moment(),
      paymentType: '',
      cashAmount: '',
      bankAmount: '',
      margin: 3,
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

  payload.payableAmount = payload.netAmount - (payload.netAmount * values.margin) / 100;

  return (
    <>
      <Customer
        step={step}
        setStep={setStep}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        {...props}
      />

      <Address step={step} setStep={setStep} selectedUser={selectedUser} {...props} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <Card sx={{ display: step === 3 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Billing Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth error={touched.ornamentType && errors.ornamentType && true}>
                <InputLabel id="select-ornamentType">Select ornament type</InputLabel>
                <Select
                  labelId="select-ornamentType"
                  id="select"
                  label={touched.ornamentType && errors.ornamentType ? errors.ornamentType : 'Select ornament type'}
                  name="ornamentType"
                  value={values.ornamentType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  name="dop"
                  value={values.dop}
                  error={touched.dop && errors.dop && true}
                  label={touched.dop && errors.dop ? errors.dop : 'DOP'}
                  inputFormat="MM/DD/YYYY"
                  onChange={(e) => {
                    setValues({ ...values, dop: e });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
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
                  <MenuItem value="partial">Partial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {values.paymentType === 'partial' && (
              <Grid item xs={4}>
                <TextField
                  name="cashAmount"
                  type={'number'}
                  value={values.cashAmount}
                  error={touched.cashAmount && errors.cashAmount && true}
                  label={touched.cashAmount && errors.cashAmount ? errors.cashAmount : 'Cash Amount'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, bankAmount: payload.payableAmount - values.cashAmount });
                    handleChange(e);
                  }}
                />
              </Grid>
            )}
            {values.paymentType === 'partial' && (
              <Grid item xs={4}>
                <TextField
                  name="bankAmount"
                  type={'number'}
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
                type={'number'}
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
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Ornament ornaments={ornaments} setOrnaments={setOrnaments} {...props} />
            {values.paymentType === 'bank' && (
              <Bank
                selectedUser={selectedUser}
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
                {...props}
              />
            )}
            {values.saleType === 'pledged' && (
              <Release
                selectedUser={selectedUser}
                selectedRelease={selectedRelease}
                setSelectedRelease={setSelectedRelease}
                {...props}
              />
            )}
            <Grid item xs={12}>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                onClick={() => setStep(step - 1)}
              >
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => {
                  if (values.paymentType === 'bank' && !selectedBank) {
                    props.setNotify({
                      open: true,
                      message: 'Please select bank',
                      severity: 'info',
                    });
                  } else if (values.saleType === 'pledged' && selectedRelease.length === 0) {
                    props.setNotify({
                      open: true,
                      message: 'Please select release',
                      severity: 'info',
                    });
                  } else if (ornaments.length === 0) {
                    props.setNotify({
                      open: true,
                      message: 'Please add ornaments',
                      severity: 'info',
                    });
                  } else {
                    setStep(step + 1);
                  }
                }}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <ProofDocument
          step={step}
          setStep={setStep}
          proofDocument={proofDocument}
          setProofDocument={setProofDocument}
          {...props}
        />

        <Card sx={{ display: step === 5 ? 'block' : 'none', p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Billing Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Customer Detail:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="name"
                value={selectedUser?.name}
                label={'Customer Name'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="address"
                value={selectedUser?.address[0]?.address}
                label={'Customer Address'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="saleType"
                value={sentenceCase(values.saleType ?? '')}
                label={'Billing Type'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Ornament Detail:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800, mb: 1 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Purity</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Stone weight (Grams)</TableCell>
                        <TableCell align="left">Net weight (Grams)</TableCell>
                        <TableCell align="left">Gross weight (Grams)</TableCell>
                        <TableCell align="left">Net amount (INR)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ornaments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e, index) => (
                        <TableRow hover key={index} tabIndex={-1}>
                          <TableCell align="left">{e.purity}</TableCell>
                          <TableCell align="left">{e.quantity}</TableCell>
                          <TableCell align="left">{e.stoneWeight}</TableCell>
                          <TableCell align="left">{e.netWeight}</TableCell>
                          <TableCell align="left">{e.grossWeight}</TableCell>
                          <TableCell align="left">{e.netAmount}</TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                      {ornaments.length === 0 && (
                        <TableRow>
                          <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography paragraph>No ornaments in table</Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={ornaments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Scrollbar>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="grossWeight"
                value={payload.grossWeight}
                label={'Total Gross Weight'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="stoneWeight"
                value={payload.stoneWeight}
                label={'Total Stone Weight'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="netWeight"
                value={payload.netWeight}
                label={'Total Net Weight'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {values.ornamentType === 'gold' ? (
              <Grid item xs={4}>
                <TextField
                  name="goldRate"
                  value={payload.goldRate}
                  label={'Gold Rate'}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs={4}>
                <TextField
                  name="silverRate"
                  value={payload.silverRate}
                  label={'Silver Rate'}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            <Grid item xs={4}>
              <TextField
                name="netAmount"
                value={payload.netAmount}
                label={'Net Amount'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="releaseAmount"
                value={payload.releaseAmount}
                label={'Release Amount'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="netPayable"
                value={payload.netAmount - payload.payableAmount}
                label={'Net Payable'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="paymentType"
                value={sentenceCase(values.paymentType ?? '')}
                label={'Payment Type'}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {values.paymentType === 'bank' && (
              <>
                <Grid item xs={4}>
                  <TextField
                    name="accountHolderName"
                    value={sentenceCase(selectedBank?.accountHolderName ?? '')}
                    label={'Account Holder Name'}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="accountNo"
                    value={selectedBank?.accountNo}
                    label={'Account No'}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="branch"
                    value={selectedBank?.branch}
                    label={'Branch'}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="ifscCode"
                    value={selectedBank?.ifscCode}
                    label={'IFSC Code'}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                onClick={() => setStep(step - 1)}
              >
                Prev
              </LoadingButton>
              <LoadingButton
                size="large"
                name="submit"
                type="button"
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => {
                  console.log(selectedUser, ornaments, selectedRelease, selectedBank, proofDocument, auth);
                  console.log(branch, goldRate, silverRate);
                }}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </form>
    </>
  );
}

export default CreateSale;
