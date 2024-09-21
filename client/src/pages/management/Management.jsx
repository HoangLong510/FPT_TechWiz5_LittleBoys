import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography, Grid, Box, Button, ButtonGroup } from '@mui/material';
import { getDataChartAPI, getDataSecondChartAPI } from './managementChart';

export default function Management() {
  const [timePeriod, setTimePeriod] = useState('day'); // Default to 'day'
  const [accountData, setAccountData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getDataChartAPI(); // Fetch product data (no dateRange needed)
        setProductData(data);
        console.log(data)// Set the fetched data
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Fetch only once on mount

  // Fetch account data when timePeriod changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDataSecondChartAPI(); // Fetch account data
        setAccountData(processDataForTimePeriod(data, timePeriod)); // Process the data according to the selected time period
      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timePeriod]);

  // Process data for the chart based on the selected time period
  const processDataForTimePeriod = (data, period) => {
    switch (period) {
      case 'day':
    return [
      { category: 'Tài khoản tổng', value: data.totalAccounts },
      { category: 'Tài khoản bị khóa', value: data.lockedAccountsToday },
      { category: 'Tài khoản tạo trong ngày', value: data.accountsCreatedToday },
      { category: 'Role User', value: data.roleUserCreatedToday },
      { category: 'Role Designer', value: data.roleDesignerCreatedToday }, 
    ];
  case 'week':
    return [
      { category: 'Tài khoản tổng', value: data.totalAccounts },
      { category: 'Tài khoản bị khóa', value: data.lockedAccountsThisWeek },
      { category: 'Tài khoản tạo trong tuần', value: data.accountsCreatedThisWeek },
      { category: 'Role User', value: data.roleUserCreatedThisWeek },
      { category: 'Role Designer', value: data.roleDesignerCreatedThisWeek }, 
    ];
  case 'month':
    return [
      { category: 'Tài khoản tổng', value: data.totalAccounts },
      { category: 'Tài khoản bị khóa', value: data.lockedAccountsThisMonth },
      { category: 'Tài khoản tạo trong tháng', value: data.accountsCreatedThisMonth },
      { category: 'Role User', value: data.roleUserCreatedThisMonth },
      { category: 'Role Designer', value: data.roleDesignerCreatedThisMonth }, 
    ];
  case 'all':
  default:
    return [
      { category: 'Tài khoản tổng', day: data.totalAccounts, week: data.totalAccounts, month: data.totalAccounts },
      { category: 'Tài khoản bị khóa', day: data.lockedAccountsToday, week: data.lockedAccountsThisWeek, month: data.lockedAccountsThisMonth },
      { category: 'Tài khoản tạo', day: data.accountsCreatedToday, week: data.accountsCreatedThisWeek, month: data.accountsCreatedThisMonth },
      { category: 'Tổng Role User', day: data.roleUserCreatedToday, week: data.roleUserCreatedThisWeek, month: data.roleUserCreatedThisMonth },
      { category: 'Tổng Role Designer', day: data.roleDesignerCreatedToday, week: data.roleDesignerCreatedThisWeek, month: data.roleDesignerCreatedThisMonth }, 
    ];
    }
  };

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

    {loading ? (
      <Typography variant="subtitle1" gutterBottom>
        Đang tải dữ liệu...
      </Typography>
    ) : (
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
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
                  <Legend />
                  <Bar dataKey="value" name="Số lượng" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )}
 



      <Box sx={{ padding: 6 }}>
        {/* Accounts Chart Section */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', marginTop: 5, marginBottom: 3 }}>
          Thống kê Tài khoản
        </Typography>

        {/* Time Period Selection Buttons */}
        <ButtonGroup variant="outlined" sx={{ marginBottom: 3 }}>
          <Button onClick={() => setTimePeriod('day')} variant={timePeriod === 'day' ? 'contained' : 'outlined'}>
            Theo Ngày
          </Button>
          <Button onClick={() => setTimePeriod('week')} variant={timePeriod === 'week' ? 'contained' : 'outlined'}>
            Theo Tuần
          </Button>
          <Button onClick={() => setTimePeriod('month')} variant={timePeriod === 'month' ? 'contained' : 'outlined'}>
            Theo Tháng
          </Button>
          <Button onClick={() => setTimePeriod('all')} variant={timePeriod === 'all' ? 'contained' : 'outlined'}>
            Tất cả
          </Button>
        </ButtonGroup>

        {/* Account Chart */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thống kê Tài khoản ({timePeriod === 'day' ? 'Hàng ngày' : timePeriod === 'week' ? 'Hàng tuần' : timePeriod === 'month' ? 'Hàng tháng' : 'Tất cả'})
                </Typography>

                {loading ? (
                  <Typography variant="subtitle1">Đang tải dữ liệu...</Typography>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={accountData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip cursor={{ stroke: '#8884d8', strokeWidth: 2 }} />
                      <Legend />

                      {timePeriod === 'all' ? (
                        <>
                          <Line type="monotone" dataKey="day" stroke="#82ca9d" strokeWidth={4} dot={{ r: 6 }} name="Ngày" />
                          <Line type="monotone" dataKey="week" stroke="#8884d8" strokeDasharray="3 4 5 2" strokeWidth={4} dot={{ r: 6 }} name="Tuần" />
                          <Line type="monotone" dataKey="month" stroke="#ff7300" strokeDasharray="5 5" strokeWidth={4} dot={{ r: 6 }} name="Tháng" />
                        </>
                      ) : (
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={4} activeDot={{ r: 8 }} />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
