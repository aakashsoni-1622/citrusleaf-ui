import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, Grid, IconButton, TextField } from '@mui/material';
import TaskDialog from './taskDialog';
import { deleteTaskById, fetchTaskList, updateTask } from '../../../service/apiCalls';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TaskTable() {

    const [formData, setFormData] = React.useState({
        title: '',
        dueDate: '',
        user_id: null,
        taskid: null,
        attachment: ''
    })

    const userData = JSON.parse(localStorage.getItem('userInfo'));

    React.useEffect(() => {
        fetchTaskData();
    }, [])


    const [totalCount, setTotalCount] = React.useState(0);

    const [taskData, setTaskData] = React.useState();

    const fetchTaskData = async () => {
        try {
            const data = await fetchTaskList(userData.id, userData.token);
            setTaskData(data.data.data);
            const arr = data.data.data;
            setTotalCount(arr.length);
        }
        catch (err) {
            console.log(err);
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTask = async (id) => {
        try {
            const result = await deleteTaskById(id, userData.id, userData.token);
            if (result.data.httpStatus === 200) {
                fetchTaskData();
                alert('Task deleted successfull');
            }
        } catch (error) {
            alert('Something went wrong')
        }
    }

    const [showField, setShowField] = React.useState(false);

    const editTask = async (data) => {
        setFormData((v) => ({
            ...data
        }))
        setShowField(true);
    }

    const handleEditSubmit = async () => {
        try {
            const result = await updateTask(formData, userData.token);
            if (result.data.httpStatus === 200) {
                fetchTaskData();
                setShowField(false);
                alert('Task Updated successfull');
            }
        } catch (error) {
            alert('Something went wrong')
        }
    }

    const handleEditCancel = () => {
        setFormData((v) => ({
            ...v,
            title: '',
            dueDate: '',
            attachment: '',
            user_id: null,
            taskid: null
        }))
        setShowField(false);
    }

    return (
        <React.Fragment>
            <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <div>Total Rows Count : {totalCount}</div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Due date</TableCell>
                                    <TableCell align="left">Attachment</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {taskData && taskData.map((row, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="left">{row.dueDate}</TableCell>
                                        <TableCell align="left">{row.attachment}</TableCell>
                                        <TableCell align="left">
                                            <IconButton onClick={() => deleteTask(row.taskid)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => editTask(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Button variant='contained' type='submit' onClick={handleClickOpen}>Add Task</Button>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>

            {
                showField === true
                    ?
                    <Grid container style={{ marginTop: 20 }}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardContent style={{ m: 20 }}>
                                    <TextField name="title" id="title"
                                        size='small' variant='outlined'
                                        type='text' label='Title'
                                        onChange={(e) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                [e.target.name]: e.target.value
                                            }))}
                                        value={formData.title} /> &nbsp;
                                    <TextField size='small' variant='outlined'
                                        type='date' label='Due Date'
                                        name='dueDate' id='dueDate'
                                        onChange={(e) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                [e.target.name]: e.target.value
                                            }))}
                                        value={formData.dueDate} /> &nbsp;
                                </CardContent>
                            </Card>
                            <div style={{ margin: 10 }}>
                                <Button variant='contained' type='submit' onClick={handleEditSubmit}>Submit</Button>&nbsp;
                                <Button variant='contained' type='submit' onClick={handleEditCancel}>Cancel</Button>
                            </div>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    :
                    ''
            }
            <TaskDialog handleClose={handleClose} open={open} fetchTaskData={fetchTaskData} />
        </React.Fragment>
    );
}