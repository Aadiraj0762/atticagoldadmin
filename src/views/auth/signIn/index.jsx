/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../features/authSlice";
import { useHistory } from "react-router-dom";
import { loginApi, getUserTypeApi, getBranchUserApi } from "../../../apis/auth";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [isEmployee, setIsEmployee] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [error, setError] = React.useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  // Form validation
  const schema = Yup.object({
    username: Yup.string().required("Username is required"),
    employeeId: isEmployee && Yup.string().required("Employee is required"),
    password: Yup.string().required("Password is required"),
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik(
    {
      initialValues: {
        username: "",
        employeeId: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        setError("");
        loginApi(values)
          .then(function (data) {
            if (data.status == 200) {
              dispatch(login(data.data.data));
              history.push("/");
            } else {
              setError(data.data.message);
            }
          })
          .catch(function (err) {
            setError(err.message);
          });
      },
    }
  );

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your username and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          {error && (
            <Flex justifyContent="center" align="center" mb="24px">
              <Text color="red" fontSize="sm" fontWeight="500">
                {error}
              </Text>
            </Flex>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Username<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              name="username"
              placeholder="username"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={handleChange}
              onBlur={async (e) => {
                try {
                  setIsDisable(true);
                  if (e.target.value) {
                    let userType = await getUserTypeApi({
                      username: e.target.value,
                    });
                    if (userType.data.data.userType == "branch") {
                      let employee = await getBranchUserApi({
                        username: e.target.value,
                      });
                      if (employee.data?.data?.length > 0) {
                        setEmployees(employee.data.data ?? []);
                      }
                      setIsEmployee(true);
                    } else {
                      setIsEmployee(false);
                    }
                  } else {
                    setIsEmployee(false);
                  }
                  handleBlur(e);
                  setIsDisable(false);
                } catch (err) {
                  setIsEmployee(false);
                  setIsDisable(false);
                }
              }}
            />
            {touched.username && errors.username ? (
              <Flex justifyContent="space-between" align="center" mb="24px">
                <Text color="red" fontSize="sm" fontWeight="500">
                  {errors.username}
                </Text>
              </Flex>
            ) : null}

            <div style={{ display: isEmployee ? "block" : "none" }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Select Employee<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                name="employeeId"
                placeholder="Select employee"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {employees?.map(function (data) {
                  return (
                    <option value={data.employeeId} key={data.employeeId}>
                      {data.employeeId}
                    </option>
                  );
                })}
              </Select>
              {touched.employeeId && errors.employeeId ? (
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <Text color="red" fontSize="sm" fontWeight="500">
                    {errors.employeeId}
                  </Text>
                </Flex>
              ) : null}
            </div>

            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                fontSize="sm"
                name="password"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {touched.password && errors.password ? (
              <Flex justifyContent="space-between" align="center" mb="24px">
                <Text color="red" fontSize="sm" fontWeight="500">
                  {errors.password}
                </Text>
              </Flex>
            ) : null}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              disabled={isDisable}
            >
              Sign In
            </Button>
          </form>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
