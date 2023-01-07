import * as React from 'react';
import { Grid } from '@mui/material';
import SignUp from './signUp';


export default function SingUpIndex() {

    return (
        <React.Fragment>
            <Grid container marginTop={20}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <SignUp />
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}