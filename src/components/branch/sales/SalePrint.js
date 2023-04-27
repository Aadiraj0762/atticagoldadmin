import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from '../../iconify';
import { getSalesById } from '../../../apis/branch/sales';

export default function SalePrint({ id }) {
  const [data, setData] = useState({});

  useEffect(() => {
    getSalesById(id).then((data) => {
      setData(data.data);
    });
  }, [id]);

  return (
    <>
      <iframe id="iframe" style={{ display: 'none', height: '0px', width: '0px', position: 'absolute' }} title="pdf" />
      <div id="pdf">
        <img
          alt="Logo"
          src="/assets/logo.png"
          style={{ width: '100px', display: 'block', margin: '20px auto', borderRadius: '50%' }}
        />
        <div style={{ display: 'block', textAlign: 'center', margin: '10px auto' }}>
          <span>
            Benaka Gold, {data?.branch?.branchName}, {data?.branch?.address?.city}
          </span>
          <br />
          <b>Ph:</b> 63661 11999
          <br />
          <b>GST:</b> 29AAJCB0171B1Z2
          <br />
          <div style={{ display: 'block', margin: '20px 0' }}>
            <table style={{ width: '100%', textAlign: 'left' }}>
              <tbody>
                <tr>
                  <td style={{ width: '50%' }}>
                    <b>Bill ID:</b> {data?._id}
                  </td>
                  <td style={{ width: '50%', textAlign: 'right' }}>{new Date(data?.createdAt).toUTCString()}</td>
                </tr>
                <tr>
                  <td style={{ width: '50%' }}>
                    <b>Gold Rate:</b> &#8377; {data?.goldRate}
                  </td>
                  <td style={{ width: '50%', textAlign: 'right' }} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr style={{ border: '0', borderBottom: '1px solid' }} />
        <div style={{ margin: '20px 0' }}>
          <table style={{ width: '100%', textAlign: 'left' }}>
            <tbody>
              <tr>
                <th style={{ width: '40%' }}>Customer Name :</th>
                <td>{data?.customer?.name}</td>
              </tr>
              <tr>
                <th>Contact :</th>
                <td>{data?.customer?.phoneNumber}</td>
              </tr>
              <tr>
                <th>Address :</th>
                <td>
                  {`${data?.customer?.address[0]?.address}, ${data?.customer?.address[0]?.city}, ${data?.customer?.address[0]?.state}, ${data?.customer?.address[0]?.pincode}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ margin: '20px 0' }}>
          <table
            style={{
              width: '100%',
              textAlign: 'center',
              border: '1px solid',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: '1px solid',
                    padding: '5px',
                  }}
                >
                  Gram
                </th>
                <th
                  style={{
                    border: '1px solid',
                    padding: '5px',
                  }}
                >
                  Stone
                </th>
                <th
                  style={{
                    border: '1px solid',
                    padding: '5px',
                  }}
                >
                  NetW
                </th>
                <th
                  style={{
                    border: '1px solid',
                    padding: '5px',
                  }}
                >
                  Purity
                </th>
                <th
                  style={{
                    border: '1px solid',
                    padding: '5px',
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.ornaments?.map((e) => (
                <tr key={e._id}>
                  <td
                    style={{
                      border: '1px solid',
                      padding: '5px',
                    }}
                  >
                    {e.grossWeight} Gram
                  </td>
                  <td
                    style={{
                      border: '1px solid',
                      padding: '5px',
                    }}
                  >
                    {e.stoneWeight} Gram
                  </td>
                  <td
                    style={{
                      border: '1px solid',
                      padding: '5px',
                    }}
                  >
                    {e.netWeight} Gram
                  </td>
                  <td
                    style={{
                      border: '1px solid',
                      padding: '5px',
                    }}
                  >
                    {e.purity} %
                  </td>
                  <td
                    style={{
                      border: '1px solid',
                      padding: '5px',
                    }}
                  >
                    &#8377; {e.netAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr style={{ border: '0', borderBottom: '1px solid' }} />
        <div style={{ display: 'block', margin: '20px 0' }}>
          <table style={{ width: '100%', textAlign: 'left' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%' }}>Gross Amount</td>
                <td style={{ width: '50%', textAlign: 'right' }}>&#8377; 50.97</td>
              </tr>
              <tr>
                <td style={{ width: '50%' }}>Release</td>
                <td style={{ width: '50%', textAlign: 'right' }}>&#8377; 3.06</td>
              </tr>
              <tr>
                <td style={{ width: '50%' }}>Service Charges</td>
                <td style={{ width: '50%', textAlign: 'right' }}>&#8377; 54.03</td>
              </tr>
              <tr>
                <th style={{ width: '50%' }}>Payable</th>
                <td style={{ width: '50%', textAlign: 'right' }}>&#8377; 54.03</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr style={{ border: '0', borderBottom: '1px solid' }} />
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          Thanks For your billing
          <br /> www.benakagoldcompany.com
        </div>
      </div>
      <Button
        variant="contained"
        startIcon={<Iconify icon={'material-symbols:print'} sx={{ mr: 2 }} />}
        onClick={() => {
          const content = document.getElementById('pdf');
          const pri = document.getElementById('iframe').contentWindow;
          pri.document.open();
          pri.document.write(content.innerHTML);
          pri.document.close();
          pri.onload = function () {
            pri.focus();
            pri.print();
          };
        }}
      >
        Print
      </Button>
    </>
  );
}
