import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardContent, Typography, Grid, Box, Button, ButtonGroup } from '@mui/material';

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Sample Data for Products including supplier data
const productData = [
  {
    name: 'Đơn hàng bán',
    suppliers: [
      { name: 'Supplier 1', value: 1500 },
      { name: 'Supplier 2', value: 900 },
      { name: 'Supplier 3', value: 700 },  // New Supplier
    ]
  },
  { name: 'Sản phẩm còn', value: 1200, color: '#82ca9d' },
  { name: 'Sản phẩm hết', value: 300, color: '#ffc658' },
];

// Generate random colors for suppliers
const suppliersWithColors = productData[0].suppliers.map(supplier => ({
  ...supplier,
  color: getRandomColor()
}));

// Sample Data for Accounts by Day, Week, and Month combined for "All"
const accountDataForAll = [
  { category: 'Tổng số tài khoản', day: 500, week: 3500, month: 5000 },
  { category: 'Tài khoản bị khóa', day: 10, week: 70, month: 100 },
  { category: 'Tài khoản tạo thêm', day: 20, week: 200, month: 300 },
  { category: 'Role User', day: 350, week: 2800, month: 4000 },
  { category: 'Role Supplier', day: 120, week: 700, month: 1000 },
];

export default function Management() {
  const [timePeriod, setTimePeriod] = useState('day'); // Default to day

  // Determine which data to show based on the selected time period
  const accountData =
    timePeriod === 'all'
      ? accountDataForAll // Use the combined dataset for "All"
      : timePeriod === 'day'
      ? accountDataForAll.map(({ category, day }) => ({ category, value: day }))
      : timePeriod === 'week'
      ? accountDataForAll.map(({ category, week }) => ({ category, value: week }))
      : accountDataForAll.map(({ category, month }) => ({ category, value: month }));

  return (
    <Box sx={{ padding: 6 }}>
      {/* Main Header */}
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: 5 }}>
        Bảng Thống kê Quản lý
      </Typography>

      {/* Product Chart Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', marginBottom: 3 }}>
        Thống kê Sản phẩm
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tổng số đơn hàng: {suppliersWithColors.reduce((acc, curr) => acc + curr.value, 0)}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tổng quan về Sản phẩm
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productData} barSize={50}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
                  <Legend />

                  {/* Bars for each supplier in 'Đơn hàng bán' next to each other */}
                  {suppliersWithColors.map((supplier, index) => (
                    <Bar key={index} dataKey={() => supplier.value} fill={supplier.color} name={supplier.name} />
                  ))}

                  {/* Other product bars */}
                  <Bar dataKey="value" name="Sản phẩm còn" fill={productData[1].color} />
                  <Bar dataKey="value" name="Sản phẩm hết" fill={productData[2].color} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Accounts Chart Section */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', marginTop: 5, marginBottom: 3 }}>
        Thống kê Tài khoản
      </Typography>

      {/* Time Period Selection Buttons */}
      <ButtonGroup variant="outlined" sx={{ marginBottom: 3 }}>
        <Button
          onClick={() => setTimePeriod('day')}
          variant={timePeriod === 'day' ? 'contained' : 'outlined'}
        >
          Theo Ngày
        </Button>
        <Button
          onClick={() => setTimePeriod('week')}
          variant={timePeriod === 'week' ? 'contained' : 'outlined'}
        >
          Theo Tuần
        </Button>
        <Button
          onClick={() => setTimePeriod('month')}
          variant={timePeriod === 'month' ? 'contained' : 'outlined'}
        >
          Theo Tháng
        </Button>
        <Button
          onClick={() => setTimePeriod('all')}
          variant={timePeriod === 'all' ? 'contained' : 'outlined'}
        >
          Tất cả
        </Button>
      </ButtonGroup>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thống kê Tài khoản ({timePeriod === 'day' ? 'Hàng ngày' : timePeriod === 'week' ? 'Hàng tuần' : timePeriod === 'month' ? 'Hàng tháng' : 'Tất cả'})
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={accountData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip cursor={{ stroke: '#8884d8', strokeWidth: 2 }} />
                  <Legend />

                  {timePeriod === 'all' ? (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="day" 
                        stroke="#82ca9d" 
                        strokeWidth={4} 
                        dot={{ r: 6 }} 
                        name="Ngày" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="week" 
                        stroke="#8884d8" 
                        strokeDasharray="3 4 5 2" 
                        strokeWidth={4} 
                        dot={{ r: 6 }} 
                        name="Tuần" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="month" 
                        stroke="#ff7300" 
                        strokeDasharray="5 5" 
                        strokeWidth={4} 
                        dot={{ r: 6 }} 
                        name="Tháng" 
                      />
                    </>
                  ) : (
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#82ca9d" 
                      strokeWidth={4} 
                      activeDot={{ r: 8 }} // Interactive dots for individual views
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}