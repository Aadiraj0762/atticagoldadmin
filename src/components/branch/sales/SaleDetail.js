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
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import moment from 'moment';
import Scrollbar from '../../scrollbar';
import { getSalesById } from '../../../apis/branch/sales';

export default function SaleDetail({ id }) {
  const [data, setData] = useState({});

  useEffect(() => {
    getSalesById(id).then((data) => {
      setData(data.data);
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.proof?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e) => (
                <TableRow hover key={e._id} tabIndex={-1}>
                  <TableCell align="left">{sentenceCase(e.documentType)}</TableCell>
                  <TableCell align="left">{e.documentNo}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
              {data?.proof?.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={2} sx={{ py: 3 }}>
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
      <Card sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
          Billing Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
              Customer Detail:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="name"
              value={data?.customer?.name}
              label={'Customer Name'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="email"
              value={data?.customer?.email}
              label={'Customer Email'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="phoneNumber"
              value={data?.customer?.phoneNumber}
              label={'Customer Phone Number'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="address"
              value={data?.customer?.address[0]?.address}
              label={'Customer Address'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
              Bill Detail:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="billId"
              value={data.billId}
              label={'Bill Id'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="Branch"
              value={sentenceCase(data.branch?.branchName ?? '')}
              label={'Branch'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="saleType"
              value={sentenceCase(data.saleType ?? '')}
              label={'Sale Type'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="ornamentType"
              value={sentenceCase(data.ornamentType ?? '')}
              label={'Ornament Type'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="dop"
              value={new Date(data.dop).toUTCString()}
              label={'DOP'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="netWeight"
              value={data.netWeight}
              label={'Net Weight'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="paymentType"
              value={data.paymentType}
              label={'Payment Type'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="netAmount"
              value={data.netAmount}
              label={'Net Amount'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="margin"
              value={data.margin}
              label={'Margin'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="payableAmount"
              value={data.payableAmount}
              label={'Payable Amount'}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="staus"
              value={sentenceCase(data.status ?? '')}
              label={'Status'}
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
            <Ornament />
          </Grid>
          {data?.paymentType === 'bank' && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 1, mb: 1 }}>
                  Bank Detail:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="accountHolderName"
                  value={sentenceCase(data?.bank?.accountHolderName ?? '')}
                  label={'Account Holder Name'}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="accountNo"
                  value={data?.bank?.accountNo}
                  label={'Account No'}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="branch"
                  value={data?.bank?.branch}
                  label={'Branch'}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="ifscCode"
                  value={data?.bank?.ifscCode}
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
    </>
  );
}
