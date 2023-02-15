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
import { getBankById, createBank, deleteBankById } from '../../../../apis/branch/customer-bank';

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

function Bank({ setNotify, selectedUserId, selectedBankId, setSelectedBankId }) {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [bankModal, setBankModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    if (selectedUserId) {
      getBankById(selectedUserId).then((data) => {
        setData(data.data);
      });
    }
  }, [selectedUserId]);

  // Form validation
  const schema = Yup.object({
    accountNo: Yup.string().required('Account no is required'),
    accountHolderName: Yup.string().required('Account holder name is required'),
    ifscCode: Yup.string().required('IFSC code is required'),
    bankName: Yup.string().required('Bank name is required'),
    branch: Yup.string().required('Branch is required'),
    proofType: Yup.string().required('Prooftype is required'),
    proofFile: Yup.string().required('Proof file is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      accountNo: '',
      accountHolderName: '',
      ifscCode: '',
      bankName: '',
      branch: '',
      proofType: '',
      proofFile: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createBank({ customerId: selectedUserId, ...values }).then((data) => {
        if (data.status === false) {
          setNotify({
            open: true,
            message: 'Bank not created',
            severity: 'error',
          });
        } else {
          getBankById(selectedUserId).then((data) => {
            setData(data.data);
          });
          setBankModal(false);
          setNotify({
            open: true,
            message: 'Bank created',
            severity: 'success',
          });
        }
      });
    },
  });

  const handleSelect = (id) => {
    if (selectedBankId && selectedBankId === id) {
      setSelectedBankId(null);
    } else {
      setSelectedBankId(id);
    }
  };

  const handleDelete = () => {
    deleteBankById(selectedUserId, openId).then(() => {
      getBankById(selectedUserId).then((data) => {
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
            Customer Bank
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setBankModal(true)}>
            New Bank
          </Button>
        </Stack>
        <Box sx={{ height: 250, width: '100%' }}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left">Bank</TableCell>
                  <TableCell align="left">Account No</TableCell>
                  <TableCell align="left">Account Holder Name</TableCell>
                  <TableCell align="left">Branch</TableCell>
                  <TableCell align="left">IFSC Code</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((e) => (
                  <TableRow hover key={e._id} tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedBankId === e._id} onChange={() => handleSelect(e._id)} />
                    </TableCell>
                    <TableCell align="left">{sentenceCase(e.bankName)}</TableCell>
                    <TableCell align="left">{e.accountNo}</TableCell>
                    <TableCell align="left">{e.accountHolderName}</TableCell>
                    <TableCell align="left">{sentenceCase(e.branch)}</TableCell>
                    <TableCell align="left">{e.ifscCode}</TableCell>
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
      </Grid>

      <Modal
        open={bankModal}
        onClose={() => setBankModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Customer Bank
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
                  name="accountNo"
                  value={values.accountNo}
                  error={touched.accountNo && errors.accountNo && true}
                  label={touched.accountNo && errors.accountNo ? errors.accountNo : 'Account No'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="accountHolderName"
                  value={values.accountHolderName}
                  error={touched.accountHolderName && errors.accountHolderName && true}
                  label={
                    touched.accountHolderName && errors.accountHolderName
                      ? errors.accountHolderName
                      : 'Account holder name'
                  }
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="ifscCode"
                  value={values.ifscCode}
                  error={touched.ifscCode && errors.ifscCode && true}
                  label={touched.ifscCode && errors.ifscCode ? errors.ifscCode : 'IFSC code'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="bankName"
                  value={values.bankName}
                  error={touched.bankName && errors.bankName && true}
                  label={touched.bankName && errors.bankName ? errors.bankName : 'Bank name'}
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
                  name="proofType"
                  value={values.proofType}
                  error={touched.proofType && errors.proofType && true}
                  label={touched.proofType && errors.proofType ? errors.proofType : 'Prooftype'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="proofFile"
                  value={values.proofFile}
                  error={touched.proofFile && errors.proofFile && true}
                  label={touched.proofFile && errors.proofFile ? errors.proofFile : 'Proof file'}
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

export default Bank;
