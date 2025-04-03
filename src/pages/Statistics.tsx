
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data - would be replaced with API data
const mockData = {
  Alabama: {
    temperature: [
      { year: '2013', value: 63.2 },
      { year: '2014', value: 62.1 },
      { year: '2015', value: 64.5 },
      { year: '2016', value: 66.3 },
      { year: '2017', value: 65.4 },
      { year: '2018', value: 64.8 },
      { year: '2019', value: 65.7 },
      { year: '2020', value: 65.9 },
      { year: '2021', value: 64.5 },
      { year: '2022', value: 66.2 },
    ],
    pollution: [
      { year: '2013', value: 36 },
      { year: '2014', value: 38 },
      { year: '2015', value: 40 },
      { year: '2016', value: 43 },
      { year: '2017', value: 39 },
      { year: '2018', value: 41 },
      { year: '2019', value: 45 },
      { year: '2020', value: 38 },
      { year: '2021', value: 42 },
      { year: '2022', value: 44 },
    ],
    precipitation: [
      { year: '2013', value: 58.3 },
      { year: '2014', value: 54.2 },
      { year: '2015', value: 62.1 },
      { year: '2016', value: 48.5 },
      { year: '2017', value: 60.3 },
      { year: '2018', value: 65.4 },
      { year: '2019', value: 58.7 },
      { year: '2020', value: 63.2 },
      { year: '2021', value: 59.8 },
      { year: '2022', value: 52.4 },
    ],
    rainfall: [
      { year: '2013', value: 55.1 },
      { year: '2014', value: 52.3 },
      { year: '2015', value: 58.6 },
      { year: '2016', value: 45.2 },
      { year: '2017', value: 57.8 },
      { year: '2018', value: 62.3 },
      { year: '2019', value: 55.9 },
      { year: '2020', value: 60.5 },
      { year: '2021', value: 56.7 },
      { year: '2022', value: 49.8 },
    ],
    humidity: [
      { year: '2013', value: 72.3 },
      { year: '2014', value: 74.5 },
      { year: '2015', value: 71.2 },
      { year: '2016', value: 70.8 },
      { year: '2017', value: 73.6 },
      { year: '2018', value: 75.1 },
      { year: '2019', value: 72.9 },
      { year: '2020', value: 74.2 },
      { year: '2021', value: 73.5 },
      { year: '2022', value: 74.8 },
    ],
    windSpeed: [
      { year: '2013', value: 7.2 },
      { year: '2014', value: 7.5 },
      { year: '2015', value: 6.9 },
      { year: '2016', value: 7.3 },
      { year: '2017', value: 7.8 },
      { year: '2018', value: 7.1 },
      { year: '2019', value: 7.4 },
      { year: '2020', value: 7.6 },
      { year: '2021', value: 7.2 },
      { year: '2022', value: 7.9 },
    ]
  },
  California: {
    temperature: [
      { year: '2013', value: 60.1 },
      { year: '2014', value: 62.4 },
      { year: '2015', value: 63.8 },
      { year: '2016', value: 62.5 },
      { year: '2017', value: 61.3 },
      { year: '2018', value: 64.2 },
      { year: '2019', value: 60.7 },
      { year: '2020', value: 63.9 },
      { year: '2021', value: 65.1 },
      { year: '2022', value: 64.5 },
    ],
    pollution: [
      { year: '2013', value: 48 },
      { year: '2014', value: 51 },
      { year: '2015', value: 55 },
      { year: '2016', value: 52 },
      { year: '2017', value: 58 },
      { year: '2018', value: 54 },
      { year: '2019', value: 49 },
      { year: '2020', value: 42 },
      { year: '2021', value: 47 },
      { year: '2022', value: 50 },
    ],
    precipitation: [
      { year: '2013', value: 12.4 },
      { year: '2014', value: 10.2 },
      { year: '2015', value: 8.7 },
      { year: '2016', value: 18.5 },
      { year: '2017', value: 25.3 },
      { year: '2018', value: 15.4 },
      { year: '2019', value: 19.7 },
      { year: '2020', value: 11.2 },
      { year: '2021', value: 14.3 },
      { year: '2022', value: 10.8 },
    ],
    rainfall: [
      { year: '2013', value: 11.5 },
      { year: '2014', value: 9.8 },
      { year: '2015', value: 8.2 },
      { year: '2016', value: 17.9 },
      { year: '2017', value: 24.5 },
      { year: '2018', value: 14.7 },
      { year: '2019', value: 18.9 },
      { year: '2020', value: 10.8 },
      { year: '2021', value: 13.6 },
      { year: '2022', value: 10.1 },
    ],
    humidity: [
      { year: '2013', value: 61.3 },
      { year: '2014', value: 59.5 },
      { year: '2015', value: 58.2 },
      { year: '2016', value: 63.8 },
      { year: '2017', value: 65.6 },
      { year: '2018', value: 62.1 },
      { year: '2019', value: 64.9 },
      { year: '2020', value: 61.2 },
      { year: '2021', value: 60.5 },
      { year: '2022', value: 59.8 },
    ],
    windSpeed: [
      { year: '2013', value: 8.2 },
      { year: '2014', value: 8.5 },
      { year: '2015', value: 8.9 },
      { year: '2016', value: 8.3 },
      { year: '2017', value: 7.8 },
      { year: '2018', value: 8.1 },
      { year: '2019', value: 8.4 },
      { year: '2020', value: 8.6 },
      { year: '2021', value: 8.2 },
      { year: '2022', value: 8.7 },
    ]
  },
  // Add more states as needed
};

const states = ['Alabama', 'California'];
const dataTypes = [
  { id: 'temperature', label: 'Temperature', unit: '°F', color: '#FF9800' },
  { id: 'pollution', label: 'Pollution (AQI)', unit: 'AQI', color: '#F44336' },
  { id: 'precipitation', label: 'Precipitation', unit: 'inches', color: '#2196F3' },
  { id: 'rainfall', label: 'Rainfall', unit: 'inches', color: '#4CAF50' },
  { id: 'humidity', label: 'Humidity', unit: '%', color: '#9C27B0' },
  { id: 'windSpeed', label: 'Wind Speed', unit: 'mph', color: '#00BCD4' },
];

const StatisticsPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('California');
  const [selectedDataType, setSelectedDataType] = useState<string>('temperature');

  const dataTypeInfo = dataTypes.find(type => type.id === selectedDataType) || dataTypes[0];
  const chartData = mockData[selectedState as keyof typeof mockData]?.[selectedDataType as keyof typeof mockData.Alabama];
  
  const latestValue = chartData && chartData.length > 0 ? 
    chartData[chartData.length - 1].value : 
    0;

  const getStatusColor = () => {
    if (selectedDataType === 'temperature') {
      return latestValue > 65 ? 'text-climate-alert-red' : 'text-climate-green';
    } else if (selectedDataType === 'pollution') {
      return latestValue > 50 ? 'text-climate-alert-red' : 'text-climate-green';
    }
    return 'text-climate-blue';
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="climate-heading mb-8">Climate Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Select State</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Select Data Type</label>
            <Select value={selectedDataType} onValueChange={setSelectedDataType}>
              <SelectTrigger>
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                {dataTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Viewing 10-year trend data for {dataTypeInfo.label} in {selectedState}. 
            This data is regularly updated from reliable climate sources.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{dataTypeInfo.label} Trend (2013-2022)</span>
              <span className={`text-sm font-normal ${getStatusColor()}`}>
                Latest: {latestValue} {dataTypeInfo.unit}
              </span>
            </CardTitle>
            <CardDescription>10-year historical data visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ${dataTypeInfo.unit}`, dataTypeInfo.label]}
                    labelFormatter={(value) => `Year: ${value}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={dataTypeInfo.color} 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average {dataTypeInfo.label}</CardTitle>
              <CardDescription>Over last decade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {chartData ? (chartData.reduce((acc, item) => acc + item.value, 0) / chartData.length).toFixed(1) : 0} {dataTypeInfo.unit}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Highest {dataTypeInfo.label}</CardTitle>
              <CardDescription>Peak recorded value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {chartData ? Math.max(...chartData.map(item => item.value)).toFixed(1) : 0} {dataTypeInfo.unit}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Recorded in {chartData ? chartData.find(item => item.value === Math.max(...chartData.map(d => d.value)))?.year : 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lowest {dataTypeInfo.label}</CardTitle>
              <CardDescription>Minimum recorded value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {chartData ? Math.min(...chartData.map(item => item.value)).toFixed(1) : 0} {dataTypeInfo.unit}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Recorded in {chartData ? chartData.find(item => item.value === Math.min(...chartData.map(d => d.value)))?.year : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;
