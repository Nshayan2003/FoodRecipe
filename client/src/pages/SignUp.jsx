import {
  Box,
  InputBase,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MyButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import http from "../http";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("recipeUser")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = values;

    if (!email || !password || !password) {
      return;
    }

    setLoading(true);
    try {
      await http.post("/sign-up", values);

      navigate("/login");
      setValues({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="20px"
      marginTop={4}
    >
      <Paper
        onSubmit={handleSubmit}
        component="form"
        sx={{ maxWidth: "500px", width: "100%" }}
        elevation={0}
      >
        <Input
          id="name"
          type="text"
          name="name"
          required={true}
          value={values.name}
          onChange={handleChange}
          placeholder="Username"
        />

        <Input
          id="email"
          type="email"
          name="email"
          required={true}
          value={values.email}
          onChange={handleChange}
          placeholder="Email Address"
        />

        <Input
          id="password"
          type="password"
          required={true}
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <MyButton
          type="submit"
          label="Sign Up"
          sx={{ color: "white", width: "100%" }}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <Typography>Already have an account? </Typography>
          <Link to="/login">
            <Typography
              variant="span"
              fontWeight={600}
              color="#008000"
              marginLeft={0.5}
            >
              Login
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignUp;

const Input = styled(InputBase)(() => ({
  width: "100%",
  border: "1px solid #00800070",
  borderRadius: 4,
  paddingLeft: 8,
  height: "40px",
  marginBottom: 14,
}));
