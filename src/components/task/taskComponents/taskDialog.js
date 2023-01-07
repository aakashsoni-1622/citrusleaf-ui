import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveTask, uploadFile } from '../../../service/apiCalls';

export default function TaskDialog({ handleClose, open, fetchTaskData }) {

    const data = JSON.parse(localStorage.getItem('userInfo'));

    var formik = useFormik({
        initialValues: {
            title: '',
            dueDate: '',
            attachment: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Title is required'),
            dueDate: Yup.date().required('Date is required'),
            attachment: Yup.mixed().required('File is required'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                console.log(values)
                const objectValues = Object.assign(values, { 'user_id': data.id })
                const result = await saveTask(objectValues, data.token);
                if (result.data.httpStatus === 200) {
                    alert('Task saved successful')
                    fetchTaskData()
                    helpers.resetForm();
                    handleClose();
                }
            }
            catch (err) {
                helpers.resetForm();
                handleClose();
                alert('Error : ', err.response.data.message)
            }
        }
    })

    const handleFileData = async (e) => {
        const fromData = new FormData();
        fromData.append('file', e.target.files[0]);
        const result = await uploadFile(fromData, data.token)
        if (result.data.httpStatus === 200) {
            formik.values.attachment = e.target.files[0].name
            alert('File uploaded successfully');
        }
        else {
            alert('Something went wrong');
        }
    }

    return (
        <div>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="title"
                        name='title'
                        label="Enter title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        error={Boolean(formik.touched.title && formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <TextField
                        margin="dense"
                        name='dueDate'
                        id="dueDate"
                        type="date"
                        fullWidth
                        variant="outlined"
                        error={Boolean(formik.touched.dueDate && formik.errors.dueDate)}
                        helperText={formik.touched.dueDate && formik.errors.dueDate}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.dueDate}
                    />
                    <TextField
                        margin="dense"
                        name='attachment'
                        id="attachment"
                        type="file"
                        fullWidth
                        variant="outlined"
                        error={Boolean(formik.touched.attachment && formik.errors.attachment)}
                        helperText={formik.touched.attachment && formik.errors.attachment}
                        onBlur={formik.handleBlur}
                        onChange={(e) => handleFileData(e)}
                    // value={formik.values.attachment}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={formik.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}