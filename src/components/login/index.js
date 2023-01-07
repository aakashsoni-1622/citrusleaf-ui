import * as React from 'react';
import { Grid } from '@mui/material';
import LoginCard from './loginCard';


export default function LoginIndex() {

    return (
        <React.Fragment>
            <Grid container marginTop={20}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <LoginCard />
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}