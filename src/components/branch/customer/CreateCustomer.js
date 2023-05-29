import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LoadingButton } from '@mui/lab';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Webcam from 'react-webcam';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { createCustomer } from '../../../apis/branch/customer';
import { getBranchByBranchId } from '../../../apis/branch/branch';
import { createFile } from '../../../apis/branch/fileupload';

function CreateCustomer({ setToggleContainer, setNotify }) {
  const auth = useSelector((state) => state.auth);
  const [branch, setBranch] = useState({});
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);
  const form = useRef();

  useEffect(() => {
    getBranchByBranchId({ branchId: auth.user.username }).then((data) => {
      setBranch(data.data);
    });
  }, [auth]);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: 'user',
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  // Form validation
  const schema = Yup.object({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email id is required'),
    dob: Yup.string().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    otp: Yup.string().required('Otp is required'),
    employmentType: Yup.string().required('Employment type is required'),
    organisation: Yup.string().required('Organisation is required'),
    annualIncome: Yup.string().required('Annual income is required'),
    maritalStatus: Yup.string().required('Marital is required'),
    status: Yup.string().required('Status is required'),
  });

  const { handleSubmit, handleChange, handleBlur, values, setValues, touched, errors, resetForm } = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      email: '',
      dob: moment(),
      gender: '',
      otp: '',
      employmentType: '',
      organisation: '',
      annualIncome: '',
      maritalStatus: '',
      source: '',
      signature: {},
      status: '',
      chooseId: '',
      idNo: '',
      uploadId: {},
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (!img) {
        setNotify({
          open: true,
          message: 'Please capture photo',
          severity: 'info',
        });
        return;
      }
      const payload = {
        branch: branch?._id,
        name: values.name,
        phoneNumber: values.phoneNumber,
        alternatePhoneNumber: values.alternatePhoneNumber,
        email: values.email,
        dob: values.dob,
        gender: values.gender,
        otp: values.otp,
        employmentType: values.employmentType,
        organisation: values.organisation,
        annualIncome: values.annualIncome,
        maritalStatus: values.maritalStatus,
        source: values.source,
        status: values.status,
      };
      createCustomer(payload).then((data) => {
        if (data.status === false) {
          setNotify({
            open: true,
            message: 'Customer not created',
            severity: 'error',
          });
        } else {
          fetch(img)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], `profile-${data.data.fileUpload.uploadId}.png`, { type: 'image/png' });
              const formData = new FormData();
              formData.append('uploadId', data.data.fileUpload.uploadId);
              formData.append('uploadName', data.data.fileUpload.uploadName);
              formData.append('uploadType', 'profile_image');
              formData.append('uploadedFile', file);
              createFile(formData);
            });
          const formData = new FormData();
          formData.append('uploadId', data.data.fileUpload.uploadId);
          formData.append('uploadName', data.data.fileUpload.uploadName);
          formData.append('uploadType', 'upload_id');
          formData.append('uploadedFile', values.uploadId);
          formData.append('documentType', values.chooseId);
          formData.append('documentNo', values.idNo);
          createFile(formData);
          const formData1 = new FormData();
          formData1.append('uploadId', data.data.fileUpload.uploadId);
          formData1.append('uploadName', data.data.fileUpload.uploadName);
          formData1.append('uploadType', 'signature');
          formData1.append('uploadedFile', values.signature);
          createFile(formData1);
          setToggleContainer(false);
          setImg(null);
          form.current.reset();
          resetForm();
          setNotify({
            open: true,
            message: 'Customer created',
            severity: 'success',
          });
        }
      });
    },
  });

  return (
    <Card sx={{ p: 4, my: 4 }}>
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              name="phoneNumber"
              value={values.phoneNumber}
              error={touched.phoneNumber && errors.phoneNumber && true}
              label={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : 'Phone'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="alternatePhoneNumber"
              value={values.alternatePhoneNumber}
              error={touched.alternatePhoneNumber && errors.alternatePhoneNumber && true}
              label={
                touched.alternatePhoneNumber && errors.alternatePhoneNumber ? errors.alternatePhoneNumber : 'Alt Phone'
              }
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                name="dob"
                value={values.dob}
                error={touched.dob && errors.dob && true}
                label={touched.dob && errors.dob ? errors.dob : 'DOB'}
                inputFormat="MM/DD/YYYY"
                onChange={(e) => {
                  setValues({ ...values, dob: e });
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              name="employmentType"
              value={values.employmentType}
              error={touched.employmentType && errors.employmentType && true}
              label={touched.employmentType && errors.employmentType ? errors.employmentType : 'Employment Type'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              name="annualIncome"
              value={values.annualIncome}
              error={touched.annualIncome && errors.annualIncome && true}
              label={touched.annualIncome && errors.annualIncome ? errors.annualIncome : 'Annualincome'}
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={touched.maritalStatus && errors.maritalStatus && true}>
              <InputLabel id="select-label">Select marital status</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label={touched.maritalStatus && errors.maritalStatus ? errors.maritalStatus : 'Select maritalStatus'}
                name="maritalStatus"
                value={values.maritalStatus}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="unmarried">Unmarried</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <span>UploadId: </span>
            <TextField
              name="uploadId"
              type={'file'}
              onBlur={handleBlur}
              onChange={(e) => {
                setValues({ ...values, uploadId: e.target.files[0] });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <span>Signature: </span>
            <TextField
              name="signature"
              type={'file'}
              onBlur={handleBlur}
              onChange={(e) => {
                setValues({ ...values, signature: e.target.files[0] });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {img === null ? (
              <>
                <Webcam
                  mirrored
                  audio={false}
                  height={400}
                  width={400}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                />
                <br />
                <LoadingButton size="small" type="button" variant="contained" onClick={capture}>
                  Capture photo
                </LoadingButton>
              </>
            ) : (
              <>
                <img src={img} alt="screenshot" />
                <br />
                <LoadingButton size="small" type="button" variant="contained" onClick={() => setImg(null)}>
                  Retake
                </LoadingButton>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12}>
            <LoadingButton size="large" type="submit" variant="contained">
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default CreateCustomer;
