import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignIn = (props) => {
  const event = props.event

  const logIn = (values) => {
    let username = values["email"];
    let password = values["password"]

    const token = `${username}:${password}`;
    const encodedToken = window.btoa(token)
    const session_url = 'http://localhost:3000/api-keys';

    let config = {
      method: 'post',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };

    axios(config)
    .then(function (response) {
      window.localStorage.setItem('token', response.data["token"])
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container>
      <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        logIn(values)
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <span>Not a User yet? <button onClick={event}>Sign Up</button> here</span>
        </form>
      )}
    </Formik>
    </Container>
  )
}

export default SignIn