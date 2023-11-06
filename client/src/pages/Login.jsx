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
import { UserState } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, token, setToken } = UserState();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await http.post("/user/login", values);

      console.log(data);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("recipeToken", data.token);
      localStorage.setItem("recipeUser", JSON.stringify(data.user));
      navigate("/");
      setValues({
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
          label="Login"
          sx={{ color: "white", width: "100%" }}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <Typography>Do not have account ? </Typography>
          <Link to="/sign-up">
            <Typography
              variant="span"
              fontWeight={600}
              color="#008000"
              marginLeft={0.5}
            >
              Sign Up
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;

const Input = styled(InputBase)(() => ({
  width: "100%",
  border: "1px solid #00800070",
  borderRadius: 4,
  paddingLeft: 8,
  height: "40px",
  marginBottom: 14,
}));
