import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [fetchTime, setFetchTime] = useState(null);

  const fetchWeatherData = async (cityName) => {
    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`,
      headers: {
        'x-rapidapi-key': '5f834ba477msh534b5b3fbdb9afbp1554b2jsna46e8def9c31',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await axios.request(options);

      if (response.data.cod === '404') {
        throw new Error('City not found. Please check the city name and try again.');
      }

      setWeatherData(response.data);
      setFetchTime(new Date());
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      setError(null);
      setSearched(true);
      fetchWeatherData(city.trim());
    } else {
      setError(new Error('Please enter a city name.'));
    }
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!searched ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
              Weather Search
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
                InputProps={{
                  endAdornment: <Search sx={{ color: 'action.active' }} />
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                startIcon={<Search />}
                sx={{ width: '100%' }}
              >
                Search
              </Button>
              {error && (
                <Box sx={{ mt: 4, width: '100%' }}>
                  <Alert severity="error">Error: {error.message}</Alert>
                </Box>
              )}
            </Paper>
          </>
        ) : (
          <>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box sx={{ mt: 4 }}>
                <Alert severity="error">Error: {error.message}</Alert>
              </Box>
            )}
            {weatherData && (
              <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                  Weather in {city}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Date and Time: {formatDateTime(fetchTime)}
                </Typography>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}
                    style={{ width: '100px', height: '100px', marginBottom: '10px' }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Temperature: {weatherData.main.temp} °C
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Humidity: {weatherData.main.humidity} %
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Wind Speed: {weatherData.wind.speed} m/s
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setSearched(false);
                      setCity('');
                      setWeatherData(null);
                      setFetchTime(null);
                    }}
                    startIcon={<Refresh />}
                    sx={{ width: '100%' }}
                  >
                    Search Again
                  </Button>
                </Box>
              </Paper>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Weather;
