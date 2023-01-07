import React from 'react'
import { Button, Card, CardContent, TextField, Link, CardActions } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../service/apiCalls';

export default function LoginCard() {

    const navigate = useNavigate();

    var formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const result = await authenticateUser(values);
                if (result.data.httpStatus === 200) {
                    localStorage.setItem('userInfo', JSON.stringify(result.data.data))
                    helpers.resetForm();
                    alert('Login Successfull..!')
                    navigate('/home');
                }
            }
            catch (err) {
                alert('Login Failed')
                helpers.resetForm();
            }
        }
    })

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <h3>Login</h3>
                    <TextField
                        variant='outlined'
                        fullWidth label='Email'
                        type='text'
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id="email"
                        name='email'
                        value={formik.values.email}
                    />
                    <TextField
                        variant='outlined'
                        fullWidth type='password'
                        label='Password'
                        style={{ marginTop: 20 }}
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id="password"
                        name='password'
                        value={formik.values.password}
                    />
                    <Button onClick={formik.handleSubmit} variant='contained' style={{ marginTop: 20 }} type='submit'>Submit</Button>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Link href="/signup" underline="hover">
                        Dont have an account? SignUp
                    </Link>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}
