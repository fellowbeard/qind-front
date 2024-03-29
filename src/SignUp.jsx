import React from 'react'
import { Formik } from 'formik'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { logIn } from './SignIn'

const SignUp = (props) => {
  const event2 = props.event2
  const event3 = props.event3
  const createNewUser = (values) => {
    axios
        .post("http://localhost:3000/users", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const logInValues = {email: values.email, password: values.password}
          logIn(logInValues)
          event2()
          event3(false)
        })
        
        .catch((err) => {
          console.log(err);
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
        createNewUser(values) 
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
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
            placeholder="First Name"
            type="first_name"
            name="first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.first_name}
          />
          {errors.first_name && touched.first_name && errors.first_name}
          <input
            placeholder="Last Name"
            type="last_name"
            name="last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}
          />
          {errors.last_name && touched.last_name && errors.last_name}
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
          <input
            placeholder="Re-Enter Password"
            type="password"
            name="password_confirmation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password_confirmation}
          />
          {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
    </Container>
  )
}

export default SignUp