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
  Paper,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import Iconify from '../../../iconify';
import Scrollbar from '../../../scrollbar';

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

function Ornament({ setNotify, ornaments, setOrnaments, goldRate, silverRate, ornamentType }) {
  const [openId, setOpenId] = useState(null);
  const [ornamentModal, setOrnamentModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
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

  // Form validation
  const schema = Yup.object({
    quantity: Yup.string().required('Quantity is required'),
    grossWeight: Yup.string().required('Gross weight is required'),
    stoneWeight: Yup.string().required('Stone weight is required'),
    netWeight: Yup.string().required('Net weight is required'),
    purity: Yup.string().required('Purity is required'),
    netAmount: Yup.string().required('Net amount is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, setValues, touched, errors, resetForm } = useFormik({
    initialValues: {
      quantity: '',
      grossWeight: '',
      stoneWeight: '',
      netWeight: '',
      purity: '',
      netAmount: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setOrnaments([...ornaments, values]);
      setOrnamentModal(false);
      resetForm();
      setNotify({
        open: true,
        message: 'Ornament created',
        severity: 'success',
      });
    },
  });

  const handleDelete = () => {
    setOrnaments(ornaments.filter((e, index) => index !== openId));
    handleCloseDeleteModal();
  };

  useEffect(() => {
    const rate = ornamentType === 'gold' ? goldRate : ornamentType === 'silver' ? silverRate : 0;
    setValues({ ...values, netAmount: (((values.netWeight ?? 0) * (values.purity ?? 0)) / 100) * rate });
  }, [values.netWeight, values.purity]);

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant="h4" gutterBottom>
            Ornament Details
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOrnamentModal(true)}
          >
            New Ornament
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={3}>
          <Typography gutterBottom>
            <b>Gold Rate:</b> {goldRate} <b>Silver Rate:</b> {silverRate}
          </Typography>
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Purity</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Stone weight (Grams)</TableCell>
                  <TableCell align="left">Net weight (Grams)</TableCell>
                  <TableCell align="left">Gross weight (Grams)</TableCell>
                  <TableCell align="left">Net amount (INR)</TableCell>
                  <TableCell align="left">Action</TableCell>
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
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setOpenId(index);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  name="quantity"
                  type={'number'}
                  value={values.quantity}
                  error={touched.quantity && errors.quantity && true}
                  label={touched.quantity && errors.quantity ? errors.quantity : 'Quantity'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="grossWeight"
                  type={'number'}
                  value={values.grossWeight}
                  error={touched.grossWeight && errors.grossWeight && true}
                  label={touched.grossWeight && errors.grossWeight ? errors.grossWeight : 'Gross Weight (Grams)'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, netWeight: e.target.value - (values.stoneWeight ?? 0) });
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="stoneWeight"
                  type={'number'}
                  value={values.stoneWeight}
                  error={touched.stoneWeight && errors.stoneWeight && true}
                  label={touched.stoneWeight && errors.stoneWeight ? errors.stoneWeight : 'Stone Weight (Grams)'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, netWeight: (values.grossWeight ?? 0) - e.target.value });
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="netWeight"
                  type={'number'}
                  value={values.netWeight}
                  error={touched.netWeight && errors.netWeight && true}
                  label={touched.netWeight && errors.netWeight ? errors.netWeight : 'Net Weight (Grams)'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="purity"
                  type={'number'}
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
                  name="netAmount"
                  type={'number'}
                  value={values.netAmount}
                  error={touched.netAmount && errors.netAmount && true}
                  label={touched.netAmount && errors.netAmount ? errors.netAmount : 'Net Amount (INR)'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
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

export default Ornament;
