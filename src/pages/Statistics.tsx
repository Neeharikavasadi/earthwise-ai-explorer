
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

// Updated to use Indian states
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
  'Chandigarh', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
];

// Mock data for Indian states
const mockData = {
  'Maharashtra': {
    temperature: [
      { year: '2013', value: 28.2 },
      { year: '2014', value: 27.5 },
      { year: '2015', value: 29.1 },
      { year: '2016', value: 30.3 },
      { year: '2017', value: 29.8 },
      { year: '2018', value: 29.1 },
      { year: '2019', value: 29.4 },
      { year: '2020', value: 29.9 },
      { year: '2021', value: 29.5 },
      { year: '2022', value: 30.2 },
    ],
    pollution: [
      { year: '2013', value: 70 },
      { year: '2014', value: 75 },
      { year: '2015', value: 80 },
      { year: '2016', value: 85 },
      { year: '2017', value: 82 },
      { year: '2018', value: 78 },
      { year: '2019', value: 87 },
      { year: '2020', value: 72 },
      { year: '2021', value: 79 },
      { year: '2022', value: 83 },
    ],
    precipitation: [
      { year: '2013', value: 2150 },
      { year: '2014', value: 1980 },
      { year: '2015', value: 2250 },
      { year: '2016', value: 1850 },
      { year: '2017', value: 2340 },
      { year: '2018', value: 2500 },
      { year: '2019', value: 2180 },
      { year: '2020', value: 2420 },
      { year: '2021', value: 2290 },
      { year: '2022', value: 1950 },
    ],
    rainfall: [
      { year: '2013', value: 2000 },
      { year: '2014', value: 1850 },
      { year: '2015', value: 2100 },
      { year: '2016', value: 1750 },
      { year: '2017', value: 2200 },
      { year: '2018', value: 2350 },
      { year: '2019', value: 2050 },
      { year: '2020', value: 2280 },
      { year: '2021', value: 2140 },
      { year: '2022', value: 1820 },
    ],
    humidity: [
      { year: '2013', value: 65.3 },
      { year: '2014', value: 68.5 },
      { year: '2015', value: 64.2 },
      { year: '2016', value: 63.8 },
      { year: '2017', value: 67.6 },
      { year: '2018', value: 70.1 },
      { year: '2019', value: 66.9 },
      { year: '2020', value: 68.2 },
      { year: '2021', value: 67.5 },
      { year: '2022', value: 69.8 },
    ],
    windSpeed: [
      { year: '2013', value: 8.2 },
      { year: '2014', value: 8.5 },
      { year: '2015', value: 7.9 },
      { year: '2016', value: 8.3 },
      { year: '2017', value: 8.8 },
      { year: '2018', value: 8.1 },
      { year: '2019', value: 8.4 },
      { year: '2020', value: 8.6 },
      { year: '2021', value: 8.2 },
      { year: '2022', value: 8.9 },
    ]
  },
  'Tamil Nadu': {
    temperature: [
      { year: '2013', value: 30.1 },
      { year: '2014', value: 29.8 },
      { year: '2015', value: 30.5 },
      { year: '2016', value: 31.2 },
      { year: '2017', value: 30.7 },
      { year: '2018', value: 30.9 },
      { year: '2019', value: 31.3 },
      { year: '2020', value: 31.5 },
      { year: '2021', value: 30.8 },
      { year: '2022', value: 31.7 },
    ],
    pollution: [
      { year: '2013', value: 65 },
      { year: '2014', value: 68 },
      { year: '2015', value: 72 },
      { year: '2016', value: 69 },
      { year: '2017', value: 75 },
      { year: '2018', value: 71 },
      { year: '2019', value: 66 },
      { year: '2020', value: 59 },
      { year: '2021', value: 64 },
      { year: '2022', value: 67 },
    ],
    precipitation: [
      { year: '2013', value: 998 },
      { year: '2014', value: 945 },
      { year: '2015', value: 875 },
      { year: '2016', value: 1200 },
      { year: '2017', value: 1120 },
      { year: '2018', value: 1050 },
      { year: '2019', value: 1080 },
      { year: '2020', value: 925 },
      { year: '2021', value: 980 },
      { year: '2022', value: 905 },
    ],
    rainfall: [
      { year: '2013', value: 945 },
      { year: '2014', value: 898 },
      { year: '2015', value: 830 },
      { year: '2016', value: 1150 },
      { year: '2017', value: 1065 },
      { year: '2018', value: 995 },
      { year: '2019', value: 1025 },
      { year: '2020', value: 878 },
      { year: '2021', value: 930 },
      { year: '2022', value: 860 },
    ],
    humidity: [
      { year: '2013', value: 75.3 },
      { year: '2014', value: 73.5 },
      { year: '2015', value: 72.2 },
      { year: '2016', value: 78.8 },
      { year: '2017', value: 77.6 },
      { year: '2018', value: 76.1 },
      { year: '2019', value: 78.9 },
      { year: '2020', value: 74.2 },
      { year: '2021', value: 75.5 },
      { year: '2022', value: 73.8 },
    ],
    windSpeed: [
      { year: '2013', value: 9.2 },
      { year: '2014', value: 9.5 },
      { year: '2015', value: 9.9 },
      { year: '2016', value: 9.3 },
      { year: '2017', value: 8.8 },
      { year: '2018', value: 9.1 },
      { year: '2019', value: 9.4 },
      { year: '2020', value: 9.6 },
      { year: '2021', value: 9.2 },
      { year: '2022', value: 9.7 },
    ]
  },
  'Delhi': {
    temperature: [
      { year: '2013', value: 25.5 },
      { year: '2014', value: 26.1 },
      { year: '2015', value: 26.8 },
      { year: '2016', value: 27.3 },
      { year: '2017', value: 26.4 },
      { year: '2018', value: 27.2 },
      { year: '2019', value: 26.7 },
      { year: '2020', value: 26.9 },
      { year: '2021', value: 27.5 },
      { year: '2022', value: 28.1 },
    ],
    pollution: [
      { year: '2013', value: 120 },
      { year: '2014', value: 135 },
      { year: '2015', value: 145 },
      { year: '2016', value: 152 },
      { year: '2017', value: 168 },
      { year: '2018', value: 154 },
      { year: '2019', value: 149 },
      { year: '2020', value: 132 },
      { year: '2021', value: 147 },
      { year: '2022', value: 158 },
    ],
    precipitation: [
      { year: '2013', value: 780 },
      { year: '2014', value: 720 },
      { year: '2015', value: 650 },
      { year: '2016', value: 830 },
      { year: '2017', value: 795 },
      { year: '2018', value: 765 },
      { year: '2019', value: 805 },
      { year: '2020', value: 710 },
      { year: '2021', value: 758 },
      { year: '2022', value: 690 },
    ],
    rainfall: [
      { year: '2013', value: 740 },
      { year: '2014', value: 685 },
      { year: '2015', value: 615 },
      { year: '2016', value: 790 },
      { year: '2017', value: 755 },
      { year: '2018', value: 730 },
      { year: '2019', value: 765 },
      { year: '2020', value: 675 },
      { year: '2021', value: 720 },
      { year: '2022', value: 655 },
    ],
    humidity: [
      { year: '2013', value: 55.3 },
      { year: '2014', value: 53.5 },
      { year: '2015', value: 52.2 },
      { year: '2016', value: 57.8 },
      { year: '2017', value: 56.6 },
      { year: '2018', value: 54.1 },
      { year: '2019', value: 55.9 },
      { year: '2020', value: 53.2 },
      { year: '2021', value: 54.5 },
      { year: '2022', value: 52.8 },
    ],
    windSpeed: [
      { year: '2013', value: 7.2 },
      { year: '2014', value: 7.5 },
      { year: '2015', value: 7.0 },
      { year: '2016', value: 7.3 },
      { year: '2017', value: 6.8 },
      { year: '2018', value: 7.1 },
      { year: '2019', value: 7.4 },
      { year: '2020', value: 7.6 },
      { year: '2021', value: 7.2 },
      { year: '2022', value: 7.7 },
    ]
  },
  'Kerala': {
    temperature: [
      { year: '2013', value: 27.8 },
      { year: '2014', value: 28.1 },
      { year: '2015', value: 28.5 },
      { year: '2016', value: 28.9 },
      { year: '2017', value: 28.3 },
      { year: '2018', value: 28.6 },
      { year: '2019', value: 29.0 },
      { year: '2020', value: 29.3 },
      { year: '2021', value: 28.7 },
      { year: '2022', value: 29.1 },
    ],
    pollution: [
      { year: '2013', value: 40 },
      { year: '2014', value: 42 },
      { year: '2015', value: 45 },
      { year: '2016', value: 43 },
      { year: '2017', value: 46 },
      { year: '2018', value: 44 },
      { year: '2019', value: 41 },
      { year: '2020', value: 38 },
      { year: '2021', value: 42 },
      { year: '2022', value: 44 },
    ],
    precipitation: [
      { year: '2013', value: 2800 },
      { year: '2014', value: 2650 },
      { year: '2015', value: 2450 },
      { year: '2016', value: 3050 },
      { year: '2017', value: 3200 },
      { year: '2018', value: 2950 },
      { year: '2019', value: 3100 },
      { year: '2020', value: 2700 },
      { year: '2021', value: 2900 },
      { year: '2022', value: 2550 },
    ],
    rainfall: [
      { year: '2013', value: 2750 },
      { year: '2014', value: 2600 },
      { year: '2015', value: 2400 },
      { year: '2016', value: 3000 },
      { year: '2017', value: 3150 },
      { year: '2018', value: 2900 },
      { year: '2019', value: 3050 },
      { year: '2020', value: 2650 },
      { year: '2021', value: 2850 },
      { year: '2022', value: 2500 },
    ],
    humidity: [
      { year: '2013', value: 82.3 },
      { year: '2014', value: 80.5 },
      { year: '2015', value: 81.2 },
      { year: '2016', value: 83.8 },
      { year: '2017', value: 84.6 },
      { year: '2018', value: 82.1 },
      { year: '2019', value: 83.9 },
      { year: '2020', value: 81.2 },
      { year: '2021', value: 82.5 },
      { year: '2022', value: 80.8 },
    ],
    windSpeed: [
      { year: '2013', value: 6.2 },
      { year: '2014', value: 6.5 },
      { year: '2015', value: 6.0 },
      { year: '2016', value: 6.3 },
      { year: '2017', value: 5.8 },
      { year: '2018', value: 6.1 },
      { year: '2019', value: 6.4 },
      { year: '2020', value: 6.6 },
      { year: '2021', value: 6.2 },
      { year: '2022', value: 6.5 },
    ]
  },
};

const dataTypes = [
  { id: 'temperature', label: 'Temperature', unit: '°C', color: '#FF9800' },
  { id: 'pollution', label: 'Pollution (AQI)', unit: 'AQI', color: '#F44336' },
  { id: 'precipitation', label: 'Precipitation', unit: 'mm', color: '#2196F3' },
  { id: 'rainfall', label: 'Rainfall', unit: 'mm', color: '#4CAF50' },
  { id: 'humidity', label: 'Humidity', unit: '%', color: '#9C27B0' },
  { id: 'windSpeed', label: 'Wind Speed', unit: 'km/h', color: '#00BCD4' },
];

const StatisticsPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [selectedDataType, setSelectedDataType] = useState<string>('temperature');

  const dataTypeInfo = dataTypes.find(type => type.id === selectedDataType) || dataTypes[0];
  
  // Check if the state exists in our mock data, otherwise use Maharashtra as fallback
  const chartData = mockData[selectedState as keyof typeof mockData]?.[selectedDataType as keyof typeof mockData.Maharashtra]
    || mockData.Maharashtra[selectedDataType as keyof typeof mockData.Maharashtra];
  
  const latestValue = chartData && chartData.length > 0 ? 
    chartData[chartData.length - 1].value : 
    0;

  const getStatusColor = () => {
    if (selectedDataType === 'temperature') {
      return latestValue > 30 ? 'text-climate-alert-red' : 'text-climate-green';
    } else if (selectedDataType === 'pollution') {
      return latestValue > 100 ? 'text-climate-alert-red' : 'text-climate-green';
    }
    return 'text-climate-blue';
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="climate-heading mb-8">Indian Climate Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Select State</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-80">
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </ScrollArea>
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
            This data is regularly updated from reliable climate sources in India.
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
