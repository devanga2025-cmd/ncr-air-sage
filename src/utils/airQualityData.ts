import csvData from '@/data/final_dataset.csv?raw';

export interface AirQualityRecord {
  date: number;
  month: number;
  year: number;
  holidaysCount: number;
  days: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  ozone: number;
  aqi: number;
  fullDate: Date;
}

let parsedData: AirQualityRecord[] | null = null;

export const parseAirQualityData = (): AirQualityRecord[] => {
  if (parsedData) return parsedData;

  const lines = csvData.split('\n').slice(1); // Skip header
  parsedData = lines
    .filter(line => line.trim())
    .map(line => {
      const [date, month, year, holidaysCount, days, pm25, pm10, no2, so2, co, ozone, aqi] = 
        line.split(',').map(val => parseFloat(val.trim()));
      
      return {
        date,
        month,
        year,
        holidaysCount,
        days,
        pm25,
        pm10,
        no2,
        so2,
        co,
        ozone,
        aqi,
        fullDate: new Date(year, month - 1, date)
      };
    });

  return parsedData;
};

export const getLatestData = (): AirQualityRecord => {
  const data = parseAirQualityData();
  return data[data.length - 1];
};

export const getRecentTrend = (days: number = 30): AirQualityRecord[] => {
  const data = parseAirQualityData();
  return data.slice(-days);
};

export const getMonthlyAverage = (month: number, year: number) => {
  const data = parseAirQualityData();
  const monthData = data.filter(d => d.month === month && d.year === year);
  
  if (monthData.length === 0) return null;

  const avg = {
    pm25: monthData.reduce((sum, d) => sum + d.pm25, 0) / monthData.length,
    pm10: monthData.reduce((sum, d) => sum + d.pm10, 0) / monthData.length,
    no2: monthData.reduce((sum, d) => sum + d.no2, 0) / monthData.length,
    so2: monthData.reduce((sum, d) => sum + d.so2, 0) / monthData.length,
    co: monthData.reduce((sum, d) => sum + d.co, 0) / monthData.length,
    ozone: monthData.reduce((sum, d) => sum + d.ozone, 0) / monthData.length,
    aqi: monthData.reduce((sum, d) => sum + d.aqi, 0) / monthData.length
  };

  return avg;
};

export const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "text-success" };
  if (aqi <= 100) return { label: "Moderate", color: "text-accent" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-warning" };
  return { label: "Hazardous", color: "text-destructive" };
};

export const getPollutantStatus = (value: number, pollutant: string) => {
  const limits: { [key: string]: number } = {
    pm25: 60,
    pm10: 100,
    no2: 80,
    so2: 80,
    co: 2,
    ozone: 100
  };

  const limit = limits[pollutant.toLowerCase().replace('.', '')];
  if (!limit) return "Unknown";
  
  if (value <= limit) return "Good";
  if (value <= limit * 1.5) return "Moderate";
  if (value <= limit * 2) return "Poor";
  return "Severe";
};
