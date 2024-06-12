import { useQuery } from '@apollo/client';
import { Box, Chip, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emplacement from '../../schemas/emplacement';
import { ArrowBack } from '@mui/icons-material';

function Emplacement() {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    const { loading, data, error } = useQuery(emplacement.emplacement, { variables: { id: id || "" } });

    return (
        <Box sx={{margin: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{marginBottom: 4}}>
                    <Paper sx={{ padding: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => navigate('/')}><ArrowBack fontSize='large' /></IconButton>
                            <Typography variant="h4" style={{ marginLeft: '1rem' }}>{ data?.emplacement?.title }</Typography>
                        </div>
                    </Paper>
                </Grid>
                {
                    data?.emplacement?.items?.length === 0 ? (
                        <Grid item xs={12}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h5" align='center'>No items found <span role="img" aria-label=":disappointed:">😞</span></Typography>
                            </Paper>
                        </Grid>
                    ) :
                    data?.emplacement?.items?.filter((item) => item?.__typename === "Item").map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item?.id}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h5">{ item?.title }</Typography>
                                <Typography>{ item?.description }</Typography>
                                <Divider sx={{ margin: 2 }}/>
                                {
                                    item?.tags?.map((tag) => (
                                        <Chip key={tag} label={tag} sx={{ marginRight: 1}} />
                                    ))
                                }
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default Emplacement;