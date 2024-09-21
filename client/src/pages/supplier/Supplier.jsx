import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { getSupplierChartAPI } from './supplierChart';

export default function Supplier() {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSupplierChartAPI();
        setDataChart(data);  // Directly set the returned data
      } catch (err) {
        console.error('Failed to fetch data chart', err);
      }
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', marginBottom: 3 }}>
        Quản lý Sản phẩm
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Card elevation={3}>
            <CardContent> 
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dataChart} barSize={50}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Số lượng tổng" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
