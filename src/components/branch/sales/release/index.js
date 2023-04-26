import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  Modal,
  Checkbox,
  Paper,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Iconify from '../../../iconify';
import { getReleaseByCustomerId, createRelease, deleteReleaseById } from '../../../../apis/branch/release';
import Scrollbar from '../../../scrollbar';
import Bank from '../bank';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  maxHeight: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: 'auto',
  border: 'none',
};

function Release({ setNotify, selectedUser, selectedRelease, setSelectedRelease }) {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [releaseModal, setReleaseModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (selectedUser) {
      getReleaseByCustomerId(selectedUser._id).then((data) => {
        setData(data.data);
      });
    }
  }, [selectedUser]);

  // Form validation
  const schema = Yup.object({
    weight: Yup.string().required('Weight is required'),
    pledgeAmount: Yup.string().required('Pledge amount is required'),
    payableAmount: Yup.string().required('Payable amount is required'),
    paymentType: Yup.string().required('Payment type is required'),
    pledgedDate: Yup.string().required('Pledged date is required'),
    pledgeId: Yup.string().required('Pledge id is required'),
    pledgedIn: Yup.string().required('Pledged in is required'),
    branch: Yup.string().required('branch is required'),
    releaseDocument: Yup.string().required('Release document is required'),
    releaseDate: Yup.string().required('Release date is required'),
    comments: Yup.string().required('comments is required'),
    documentType: Yup.string().required('Document type is required'),
    documentNo: Yup.string().required('Document no is required'),
    documentFile: Yup.string().required('Document file is required'),
    status: Yup.string().required('status is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, setValues, touched, errors } = useFormik({
    initialValues: {
      customer: selectedUser?._id,
      weight: '',
      pledgeAmount: '',
      payableAmount: '',
      paymentType: '',
      bank: selectedBank?._id,
      pledgedDate: moment(),
      pledgeId: '',
      pledgedIn: '',
      branch: '',
      releaseDocument: '',
      releaseDate: moment(),
      comments: '',
      documentType: '',
      documentNo: '',
      documentFile: '',
      status: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createRelease({ customer: selectedUser._id, ...values }).then((data) => {
        if (data.status === false) {
          setNotify({
            open: true,
            message: 'Release not created',
            severity: 'error',
          });
        } else {
          getReleaseByCustomerId(selectedUser._id).then((data) => {
            setData(data.data);
          });
          setReleaseModal(false);
          setNotify({
            open: true,
            message: 'Release created',
            severity: 'success',
          });
        }
      });
    },
  });

  const handleSelect = (release) => {
    if (selectedRelease && selectedRelease.find((e) => e._id === release._id)) {
      setSelectedRelease(selectedRelease.filter((e) => e._id !== release._id));
    } else {
      setSelectedRelease([...selectedRelease, release]);
    }
  };

  const handleDelete = () => {
    deleteReleaseById(openId).then(() => {
      getReleaseByCustomerId(selectedUser._id).then((data) => {
        setData(data.data);
      });
      handleCloseDeleteModal();
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant="h4" gutterBottom>
            Customer Release
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setReleaseModal(true)}
          >
            New Release
          </Button>
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left">Pledge Id</TableCell>
                  <TableCell align="left">Pledged In</TableCell>
                  <TableCell align="left">Weight (Grams)</TableCell>
                  <TableCell align="left">Pledge amount</TableCell>
                  <TableCell align="left">Pledged date</TableCell>
                  <TableCell align="left">Payable amount</TableCell>
                  <TableCell align="left">Payment Type</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e) => (
                  <TableRow hover key={e._id} tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRelease.find((v) => v._id === e._id)}
                        onChange={() => handleSelect(e)}
                      />
                    </TableCell>
                    <TableCell align="left">{e.pledgeId}</TableCell>
                    <TableCell align="left">{sentenceCase(e.pledgedIn)}</TableCell>
                    <TableCell align="left">{e.weight}</TableCell>
                    <TableCell align="left">{e.pledgeAmount}</TableCell>
                    <TableCell align="left">{moment(e.pledgedDate).format('YYYY-MM-DD')}</TableCell>
                    <TableCell align="left">{e.payableAmount}</TableCell>
                    <TableCell align="left">{sentenceCase(e.paymentType)}</TableCell>
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
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Scrollbar>
      </Grid>

      <Modal
        open={releaseModal}
        onClose={() => setReleaseModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Customer Release
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (values.paymentType === 'bank' && !selectedBank) {
                setNotify({
                  open: true,
                  message: 'Please select bank',
                  severity: 'info',
                });
              } else {
                handleSubmit(e);
              }
            }}
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  name="weight"
                  type={'number'}
                  value={values.weight}
                  error={touched.weight && errors.weight && true}
                  label={touched.weight && errors.weight ? errors.weight : 'Weight (Grams)'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="pledgeAmount"
                  type={'number'}
                  value={values.pledgeAmount}
                  error={touched.pledgeAmount && errors.pledgeAmount && true}
                  label={touched.pledgeAmount && errors.pledgeAmount ? errors.pledgeAmount : 'Pledge amount'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="payableAmount"
                  type={'number'}
                  value={values.payableAmount}
                  error={touched.payableAmount && errors.payableAmount && true}
                  label={touched.payableAmount && errors.payableAmount ? errors.payableAmount : 'Payable amount'}
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
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    name="pledgedDate"
                    value={values.pledgedDate}
                    error={touched.pledgedDate && errors.pledgedDate && true}
                    label={touched.pledgedDate && errors.pledgedDate ? errors.pledgedDate : 'Pledged date'}
                    inputFormat="MM/DD/YYYY"
                    onChange={(e) => {
                      setValues({ ...values, pledgedDate: e });
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="pledgeId"
                  value={values.pledgeId}
                  error={touched.pledgeId && errors.pledgeId && true}
                  label={touched.pledgeId && errors.pledgeId ? errors.pledgeId : 'Pledge id'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="pledgedIn"
                  value={values.pledgedIn}
                  error={touched.pledgedIn && errors.pledgedIn && true}
                  label={touched.pledgedIn && errors.pledgedIn ? errors.pledgedIn : 'Pledged in'}
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
                  label={touched.branch && errors.branch ? errors.branch : 'Branch'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="releaseDocument"
                  value={values.releaseDocument}
                  error={touched.releaseDocument && errors.releaseDocument && true}
                  label={
                    touched.releaseDocument && errors.releaseDocument ? errors.releaseDocument : 'Release document'
                  }
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    name="releaseDate"
                    value={values.releaseDate}
                    error={touched.releaseDate && errors.releaseDate && true}
                    label={touched.releaseDate && errors.releaseDate ? errors.releaseDate : 'Release date'}
                    inputFormat="MM/DD/YYYY"
                    onChange={(e) => {
                      setValues({ ...values, releaseDate: e });
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
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
                  name="documentType"
                  value={values.documentType}
                  error={touched.documentType && errors.documentType && true}
                  label={touched.documentType && errors.documentType ? errors.documentType : 'Document type'}
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
                  selectedUser={selectedUser}
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                  setNotify={setNotify}
                />
              )}
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

export default Release;
