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
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect } from 'react';
import Iconify from '../../../iconify';
import Scrollbar from '../../../scrollbar';
import { getAddressById, createAddress, deleteAddressById } from '../../../../apis/branch/customer-address';
import { createFile } from '../../../../apis/branch/fileupload';

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

function Address({ step, setStep, setNotify, selectedUser }) {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [width, setWindowWidth] = useState(0);
  const states = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Pondicherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttaranchal',
    'West Bengal',
  ];
  const cities = {
    'Andaman and Nicobar Islands': 'Nicobar|North and Middle Andaman|South Andaman',
    'Andhra Pradesh':
      'Anantapur|Chittoor|East Godavari|Guntur|Krishna|Kurnool|Prakasam|Srikakulam|SriPotti Sri Ramulu Nellore|Vishakhapatnam|Vizianagaram|West Godavari|Cudappah',
    'Arunachal Pradesh':
      'Anjaw|Changlang|Dibang Valley|East Siang|East Kameng|Kurung Kumey|Lohit|Longding|Lower Dibang Valley|Lower Subansiri|Papum Pare|Tawang|Tirap|Upper Siang|Upper Subansiri|West Kameng|West Siang',
    Assam:
      'Baksa|Barpeta|Bongaigaon|Cachar|Chirang|Darrang|Dhemaji|Dima Hasao|Dhubri|Dibrugarh|Goalpara|Golaghat|Hailakandi|Jorhat|Kamrup|Kamrup Metropolitan|Karbi Anglong|Karimganj|Kokrajhar|Lakhimpur|Morigaon|Nagaon|Nalbari|Sivasagar|Sonitpur|Tinsukia|Udalguri',
    Bihar:
      'Araria|Arwal|Aurangabad|Banka|Begusarai|Bhagalpur|Bhojpur|Buxar|Darbhanga|East Champaran|Gaya|Gopalganj|Jamui|Jehanabad|Kaimur|Katihar|Khagaria|Kishanganj|Lakhisarai|Madhepura|Madhubani|Munger|Muzaffarpur|Nalanda|Nawada|Patna|Purnia|Rohtas|Saharsa|Samastipur|Saran|Sheikhpura|Sheohar|Sitamarhi|Siwan|Supaul|Vaishali|West Champaran',
    Chhattisgarh:
      'Bastar|Bijapur|Bilaspur|Dantewada|Dhamtari|Durg|Jashpur|Janjgir-Champa|Korba|Koriya|Kanker|Kabirdham (formerly Kawardha)|Mahasamund|Narayanpur|Raigarh|Rajnandgaon|Raipur|Surajpur|Surguja',
    Chandigarh: 'Chandigarh',
    'Dadra and Nagar Haveli': 'Amal|Silvassa',
    'Daman and Diu': 'Daman|Diu',
    Delhi: 'Delhi|New Delhi|North Delhi|Noida|Patparganj|Sonabarsa|Tughlakabad',
    Goa: 'Chapora|Dabolim|Madgaon|Marmugao (Marmagao)|Panaji Port|Panjim|Pellet Plant Jetty/Shiroda|Talpona|Vasco da Gama',
    Gujarat:
      'Ahmedabad|Amreli district|Anand|Aravalli|Banaskantha|Bharuch|Bhavnagar|Dahod|Dang|Gandhinagar|Jamnagar|Junagadh|Kutch|Kheda|Mehsana|Narmada|Navsari|Patan|Panchmahal|Porbandar|Rajkot|Sabarkantha|Surendranagar|Surat|Tapi|Vadodara|Valsad',
    Haryana:
      'Ambala|Bhiwani|Faridabad|Fatehabad|Gurgaon|Hissar|Jhajjar|Jind|Karnal|Kaithal|Kurukshetra|Mahendragarh|Mewat|Palwal|Panchkula|Panipat|Rewari|Rohtak|Sirsa|Sonipat|Yamuna Nagar',
    'Himachal Pradesh':
      'Baddi|Baitalpur|Chamba|Dharamsala|Hamirpur|Kangra|Kinnaur|Kullu|Lahaul & Spiti|Mandi|Simla|Sirmaur|Solan|Una',
    'Jammu and Kashmir': 'Jammu|Leh|Rajouri|Srinagar',
    Jharkhand:
      'Bokaro|Chatra|Deoghar|Dhanbad|Dumka|East Singhbhum|Garhwa|Giridih|Godda|Gumla|Hazaribag|Jamtara|Khunti|Koderma|Latehar|Lohardaga|Pakur|Palamu|Ramgarh|Ranchi|Sahibganj|Seraikela Kharsawan|Simdega|West Singhbhum',
    Kerala:
      'Alappuzha|Ernakulam|Idukki|Kannur|Kasaragod|Kollam|Kottayam|Kozhikode|Malappuram|Palakkad|Pathanamthitta|Thrissur|Thiruvananthapuram|Wayanad',
    Karnataka:
      'Bagalkot|Bangalore|Bangalore Urban|Belgaum|Bellary|Bidar|Bijapur|Chamarajnagar|Chikkamagaluru|Chikkaballapur|Chitradurga|Davanagere|Dharwad|Dakshina Kannada|Gadag|Gulbarga|Hassan|Haveri district|Kodagu|Kolar|Koppal|Mandya|Mysore|Raichur|Shimoga|Tumkur|Udupi|Uttara Kannada|Ramanagara|Yadgir',
    Lakshadweep: 'Kavaratti|Lakshadweep',
    'Madhya Pradesh':
      'Alirajpur|Anuppur|Ashoknagar|Balaghat|Barwani|Betul|Bhilai|Bhind|Bhopal|Burhanpur|Chhatarpur|Chhindwara|Damoh|Dewas|Dhar|Guna|Gwalior|Hoshangabad|Indore|Itarsi|Jabalpur|Khajuraho|Khandwa|Khargone|Malanpur|Malanpuri (Gwalior)|Mandla|Mandsaur|Morena|Narsinghpur|Neemuch|Panna|Pithampur|Raipur|Raisen|Ratlam|Rewa|Sagar|Satna|Sehore|Seoni|Shahdol|Singrauli|Ujjain',
    Maharashtra:
      'Ahmednagar|Akola|Alibag|Amaravati|Arnala|Aurangabad|Aurangabad|Bandra|Bassain|Belapur|Bhiwandi|Bhusaval|Borliai-Mandla|Chandrapur|Dahanu|Daulatabad|Dighi (Pune)|Dombivali|Goa|Jaitapur|Jalgaon|Jawaharlal Nehru (Nhava Sheva)|Kalyan|Karanja|Kelwa|Khopoli|Kolhapur|Lonavale|Malegaon|Malwan|Manori|Mira Bhayandar|Miraj|Mumbai (ex Bombay)|Murad|Nagapur|Nagpur|Nalasopara|Nanded|Nandgaon|Nasik|Navi Mumbai|Nhave|Osmanabad|Palghar|Panvel|Pimpri|Pune|Ratnagiri|Sholapur|Shrirampur|Shriwardhan|Tarapur|Thana|Thane|Trombay|Varsova|Vengurla|Virar|Wada',
    Manipur: 'Bishnupur|Churachandpur|Chandel|Imphal East|Senapati|Tamenglong|Thoubal|Ukhrul|Imphal West',
    Meghalaya:
      'Baghamara|Balet|Barsora|Bolanganj|Dalu|Dawki|Ghasuapara|Mahendraganj|Moreh|Ryngku|Shella Bazar|Shillong',
    Mizoram: 'Aizawl|Champhai|Kolasib|Lawngtlai|Lunglei|Mamit|Saiha|Serchhip',
    Nagaland: 'Dimapur|Kiphire|Kohima|Longleng|Mokokchung|Mon|Peren|Phek|Tuensang|Wokha|Zunheboto',
    Orissa: 'Bahabal Pur|Bhubaneswar|Chandbali|Gopalpur|Jeypore|Paradip Garh|Puri|Rourkela',
    Pondicherry: 'Karaikal|Mahe|Pondicherry|Yanam',
    Punjab:
      'Amritsar|Barnala|Bathinda|Firozpur|Faridkot|Fatehgarh Sahib|Fazilka|Gurdaspur|Hoshiarpur|Jalandhar|Kapurthala|Ludhiana|Mansa|Moga|Sri Muktsar Sahib|Pathankot|Patiala|Rupnagar|Ajitgarh (Mohali)|Sangrur|Shahid Bhagat Singh Nagar|Tarn Taran',
    Rajasthan:
      'Ajmer|Alwar|Banswara|Barmer|Barmer Rail Station|Basni|Beawar|Bharatpur|Bhilwara|Bhiwadi|Bikaner|Bongaigaon|Boranada, Jodhpur|Chittaurgarh|Fazilka|Ganganagar|Jaipur|Jaipur-Kanakpura|Jaipur-Sitapura|Jaisalmer|Jodhpur|Jodhpur-Bhagat Ki Kothi|Jodhpur-Thar|Kardhan|Kota|Munabao Rail Station|Nagaur|Rajsamand|Sawaimadhopur|Shahdol|Shimoga|Tonk|Udaipur',
    Sikkim: 'Chamurci|Gangtok',
    'Tamil Nadu':
      'Ariyalur|Chennai|Coimbatore|Cuddalore|Dharmapuri|Dindigul|Erode|Kanchipuram|Kanyakumari|Karur|Krishnagiri|Madurai|Mandapam|Nagapattinam|Nilgiris|Namakkal|Perambalur|Pudukkottai|Ramanathapuram|Salem|Sivaganga|Thanjavur|Thiruvallur|Tirupur|Tiruchirapalli|Theni|Tirunelveli|Thanjavur|Thoothukudi|Tiruvallur|Tiruvannamalai|Vellore|Villupuram|Viruthunagar',
    Telangana:
      'Adilabad|Hyderabad|Karimnagar|Khammam|Mahbubnagar|Medak|Nalgonda|Nizamabad|Ranga Reddy|Secunderabad|Warangal',
    Tripura:
      'Agartala|Dhalaighat|Kailashahar|Kamalpur|Kanchanpur|Kel Sahar Subdivision|Khowai|Khowaighat|Mahurighat|Old Raghna Bazar|Sabroom|Srimantapur',
    'Uttar Pradesh':
      'Agra|Allahabad|Auraiya|Banbasa|Bareilly|Berhni|Bhadohi|Dadri|Dharchula|Gandhar|Gauriphanta|Ghaziabad|Gorakhpur|Gunji|Jarwa|Jhulaghat (Pithoragarh)|Kanpur|Katarniyaghat|Khunwa|Loni|Lucknow|Meerut|Moradabad|Muzaffarnagar|Nepalgunj Road|Pakwara (Moradabad)|Pantnagar|Saharanpur|Sonauli|Surajpur|Tikonia|Varanasi',
    Uttarakhand:
      'Almora|Badrinath|Bangla|Barkot|Bazpur|Chamoli|Chopra|Dehra Dun|Dwarahat|Garhwal|Haldwani|Hardwar|Haridwar|Jamal|Jwalapur|Kalsi|Kashipur|Mall|Mussoorie|Nahar|Naini|Pantnagar|Pauri|Pithoragarh|Rameshwar|Rishikesh|Rohni|Roorkee|Sama|Saur',
    'West Bengal':
      'Alipurduar|Bankura|Bardhaman|Birbhum|Cooch Behar|Dakshin Dinajpur|Darjeeling|Hooghly|Howrah|Jalpaiguri|Kolkata|Maldah|Murshidabad|Nadia|North 24 Parganas|Paschim Medinipur|Purba Medinipur|Purulia|South 24 Parganas|Uttar Dinajpur',
  };

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (width < 899) {
    style.width = '80%';
  } else {
    style.width = 800;
  }

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
      getAddressById(selectedUser._id).then((data) => {
        setData(data.data);
      });
    }
  }, [selectedUser]);

  // Form validation
  const schema = Yup.object({
    address: Yup.string().required('Address is required'),
    area: Yup.string().required('Area is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .length(6),
    landmark: Yup.string().required('Landmark is required'),
    residential: Yup.string().required('Residential type is required'),
    label: Yup.string().required('Label is required'),
    documentType: Yup.string().required('Document type is required'),
    documentNo: Yup.string().required('Document no is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, setValues, errors, resetForm } = useFormik({
    initialValues: {
      address: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      residential: '',
      label: '',
      documentType: '',
      documentNo: '',
      documentFile: {},
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createAddress({ customerId: selectedUser._id, ...values }).then((data) => {
        if (data.status === false) {
          setNotify({
            open: true,
            message: 'Address not created',
            severity: 'error',
          });
        } else {
          getAddressById(selectedUser._id).then((data) => {
            setData(data.data);
          });
          setAddressModal(false);
          const formData = new FormData();
          formData.append('uploadId', data.data.fileUpload.uploadId);
          formData.append('uploadName', data.data.fileUpload.uploadName);
          formData.append('uploadType', 'proof');
          formData.append('uploadedFile', values.documentFile);
          formData.append('documentType', values.documentType);
          formData.append('documentNo', values.documentNo);
          createFile(formData);
          resetForm();
          setNotify({
            open: true,
            message: 'Address created',
            severity: 'success',
          });
        }
      });
    },
  });

  const handleDelete = () => {
    deleteAddressById(selectedUser._id, openId).then(() => {
      getAddressById(selectedUser._id).then((data) => {
        setData(data.data);
      });
      handleCloseDeleteModal();
    });
  };

  return (
    <>
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
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Landmark</TableCell>
                  <TableCell align="left">Pincode</TableCell>
                  <TableCell align="left">Label</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((e) => (
                  <TableRow hover key={e._id} tabIndex={-1}>
                    <TableCell align="left">{sentenceCase(e.address)}</TableCell>
                    <TableCell align="left">{sentenceCase(e.landmark)}</TableCell>
                    <TableCell align="left">{e.pincode}</TableCell>
                    <TableCell align="left">{sentenceCase(e.label)}</TableCell>
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
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
        <LoadingButton size="large" name="submit" type="button" variant="contained" onClick={() => setStep(step - 1)}>
          Prev
        </LoadingButton>
        <LoadingButton
          size="large"
          name="submit"
          type="button"
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => {
            if (data.length === 0) {
              setNotify({
                open: true,
                message: 'Please add address',
                severity: 'info',
              });
            } else {
              setStep(step + 1);
            }
          }}
        >
          Next
        </LoadingButton>
      </Card>

      <Modal
        open={addressModal}
        onClose={() => setAddressModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Customer Address
            <Button
              sx={{ color: '#222', float: 'right' }}
              startIcon={<CloseIcon />}
              onClick={() => setAddressModal(false)}
            />
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={touched.state && errors.state && true}>
                  <InputLabel id="select-label">Select state</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label={touched.state && errors.state ? errors.state : 'Select state'}
                    name="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {states.map((state) => (
                      <MenuItem value={state}>{state}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={touched.city && errors.city && true}>
                  <InputLabel id="select-label">Select city</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label={touched.city && errors.city ? errors.city : 'Select city'}
                    name="city"
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {cities[values.state]?.split('|')?.map((city) => (
                      <MenuItem value={city}>{city}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={touched.residential && errors.residential && true}>
                  <InputLabel id="select-label">Select residential</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label={touched.residential && errors.residential ? errors.residential : 'Select residential'}
                    name="residential"
                    value={values.residential}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="Indian">Indian</MenuItem>
                    <MenuItem value="NRI">NRI</MenuItem>
                    <MenuItem value="Foreign Resident">Foreign Resident</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={touched.documentType && errors.documentType && true}>
                  <InputLabel id="select-label">Select address proof</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    label={touched.documentType && errors.documentType ? errors.documentType : 'Select address proof'}
                    name="documentType"
                    value={values.documentType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                    <MenuItem value="Driving License">Driving License</MenuItem>
                    <MenuItem value="Passport">Passport</MenuItem>
                    <MenuItem value="Ration Card">Ration Card</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="documentNo"
                  value={values.documentNo}
                  error={touched.documentNo && errors.documentNo && true}
                  label={touched.documentNo && errors.documentNo ? errors.documentNo : 'Address proof number'}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <span>Attach address proof: </span>
                <TextField
                  name="documentFile"
                  type={'file'}
                  error={touched.documentFile && errors.documentFile && true}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, documentFile: e.target.files[0] });
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton size="large" type="submit" variant="contained" startIcon={<SaveIcon />}>
                  Save
                </LoadingButton>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  sx={{ ml: 2 }}
                  startIcon={<CloseIcon />}
                  onClick={() => setAddressModal(false)}
                >
                  Close
                </Button>
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

export default Address;
