import React from 'react';
import {
  BarChart, Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

// Sample Data for Categories
const categoryData = [
  { name: 'Category A', orders: 2400, stock: 1200, outOfStock: 300 },
  { name: 'Category B', orders: 1800, stock: 900, outOfStock: 150 },
  { name: 'Category C', orders: 2200, stock: 1100, outOfStock: 500 },
];

// Prepare data for the chart
const categoriesChartData = categoryData.map(category => ({
  name: category.name,
  orders: category.orders,
  stock: category.stock,
  outOfStock: category.outOfStock
}));

export default function Supplier() {
  return (
    <Box sx={{ padding: 6 }}>
      {/* Categories Chart Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', marginBottom: 3 }}>
        Quản lý Danh mục
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tổng quan về Danh mục
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoriesChartData} barSize={50}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
                  <Legend />

                  {/* Bars for each metric */}
                  <Bar dataKey="orders" fill="#8884d8" name="Đơn hàng" />
                  <Bar dataKey="stock" fill="#82ca9d" name="Sản phẩm còn" />
                  <Bar dataKey="outOfStock" fill="#ffc658" name="Sản phẩm hết" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}