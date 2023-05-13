import {
  TextField,
  Typography,
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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import moment from 'moment';
import Scrollbar from '../../scrollbar';
import { getSalesById } from '../../../apis/admin/sales';
import global from '../../../utils/global';

export default function SaleDetail({ id }) {
  const [data, setData] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(true);

  useEffect(() => {
    getSalesById(id).then((data) => {
      setData(data.data);
      setOpenBackdrop(false);
    });
  }, [id]);

  function Ornament() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.ornaments.length) : 0;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
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
              {data?.ornaments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e, index) => (
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
              {data?.ornaments?.length === 0 && (
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
          count={data?.ornaments?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Scrollbar>
    );
  }

  function Release() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.release.length) : 0;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, mb: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Pledge Id</TableCell>
                <TableCell align="left">Pledged In</TableCell>
                <TableCell align="left">Weight (Grams)</TableCell>
                <TableCell align="left">Pledge amount</TableCell>
                <TableCell align="left">Pledged date</TableCell>
                <TableCell align="left">Payable amount</TableCell>
                <TableCell align="left">Payment Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.release?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e) => (
                <TableRow hover key={e._id} tabIndex={-1}>
                  <TableCell align="left">{e.pledgeId}</TableCell>
                  <TableCell align="left">{sentenceCase(e.pledgedIn)}</TableCell>
                  <TableCell align="left">{e.weight}</TableCell>
                  <TableCell align="left">{e.pledgeAmount}</TableCell>
                  <TableCell align="left">{moment(e.pledgedDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell align="left">{e.payableAmount}</TableCell>
                  <TableCell align="left">{sentenceCase(e.paymentType)}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
              {data?.release?.length === 0 && (
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
          count={data?.release?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Scrollbar>
    );
  }

  function Proof() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.proof.length) : 0;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, mb: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Document Type</TableCell>
                <TableCell align="left">Document No</TableCell>
                <TableCell align="left">File</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.proof?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e) => (
                <TableRow hover key={e._id} tabIndex={-1}>
                  <TableCell align="left">{sentenceCase(e.documentType)}</TableCell>
                  <TableCell align="left">{e.documentNo}</TableCell>
                  <TableCell align="left">
                    <Link href={`${global.baseURL}/${e?.uploadedFile}`}>View File</Link>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
              {data?.proof?.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={3} sx={{ py: 3 }}>
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
          count={data?.proof?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Scrollbar>
    );
  }

  return (
    <>
      {openBackdrop ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Card sx={{ p: 4, my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Billing Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Customer Detail:
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow tabIndex={-1}>
                      <TableCell align="left">Customer Name: {data?.customer?.name}</TableCell>
                      <TableCell align="left">Customer Email: {data?.customer?.email}</TableCell>
                      <TableCell align="left">Customer Phone Number: {data?.customer?.phoneNumber}</TableCell>
                      <TableCell align="left">Address: {data?.customer?.address[0]?.address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Bill Detail:
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow tabIndex={-1}>
                      <TableCell align="left">Bill Id: {data?.billId}</TableCell>
                      <TableCell align="left">Branch: {sentenceCase(data.branch?.branchName ?? '')}</TableCell>
                      <TableCell align="left">Sale Type: {sentenceCase(data.saleType ?? '')}</TableCell>
                      <TableCell align="left">Ornament Type: {sentenceCase(data.ornamentType ?? '')}</TableCell>
                    </TableRow>
                    <TableRow tabIndex={-1}>
                      <TableCell align="left">DOP: {new Date(data.dop).toUTCString()}</TableCell>
                      <TableCell align="left">Net Weight: {data.netWeight}</TableCell>
                      <TableCell align="left">Payment Type: {data.paymentType}</TableCell>
                      <TableCell align="left">Net Amount: {data.netAmount}</TableCell>
                    </TableRow>
                    <TableRow tabIndex={-1}>
                      <TableCell align="left">Margin: {data.margin}</TableCell>
                      <TableCell align="left">Payable Amount: {data.payableAmount}</TableCell>
                      <TableCell align="left">Status: {data.status}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Ornament Detail:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Ornament />
            </Grid>
            {data?.paymentType === 'bank' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                    Bank Detail:
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow tabIndex={-1}>
                          <TableCell align="left">
                            Account Holder Name: {sentenceCase(data?.bank?.accountHolderName ?? '')}
                          </TableCell>
                          <TableCell align="left">Account No: {data?.bank?.accountNo}</TableCell>
                          <TableCell align="left">Branch: {data?.bank?.branch}</TableCell>
                          <TableCell align="left">IFSC Code: {data?.bank?.ifscCode}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Release Detail:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Release />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                Proof Documents
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Proof />
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
