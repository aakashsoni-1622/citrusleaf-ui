import React from 'react'
import { Button, Card, CardContent, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../service/apiCalls';

export default function SignUp() {

    const navigate = useNavigate();

    var formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Must be a valid email').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            const result = await saveUser(values);
            if (result.data.httpStatus === 200) {
                helpers.resetForm();
                alert('Registered Successfully..!')
                navigate('/');
            }
            else {
                alert('Something went wrong')
                helpers.resetForm();
            }
        }
    })

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <h3>Sign Up</h3>
                    <TextField
                        variant='outlined'
                        fullWidth label='Name'
                        type='text'
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id="name"
                        name='name'
                        value={formik.values.name}
                    />
                    <TextField
                        variant='outlined'
                        fullWidth label='Email'
                        type='text'
                        style={{ marginTop: 20 }}
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
            </Card>
        </React.Fragment>
    )
}
