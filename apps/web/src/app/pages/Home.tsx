import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, CardHeader, Container, Grid, Skeleton } from "@mui/material"
import React from "react";
import emplacement from "../../schemas/emplacement";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const { loading, data: dataEmplacements } = useQuery(emplacement.emplacements, { fetchPolicy: "network-only"});

    const handleClick = (id: string) => () => {
        navigate(`/emplacement/${id}`);
    }

    return (
        <Box sx={{ margin: 2 }}>
            {loading ? (
                <Skeleton variant="text" />
            ) : (
                <Grid container spacing={2}>
                    {dataEmplacements?.emplacements.map((emplacement) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={emplacement.id}>
                            <Card
                                onClick={handleClick(emplacement.id)}
                                sx={{ cursor: "pointer", minHeight: 200 }}
                            >
                                <CardHeader title={emplacement.title} />
                                <CardContent>{emplacement.description}</CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default Home;