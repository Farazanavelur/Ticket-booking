import axios from 'axios';

// IRCTC API Key
const IRCTC_API_KEY = '844f57aab6msh05b9c9810017cddp185e4fjsn36e56aa06152';

/**
 * Service for fetching real-time train data
 */

// Create an axios instance for IRCTC API calls
const irctcAxios = axios.create({
  baseURL: 'https://irctc1.p.rapidapi.com/api/v3',
  timeout: 15000,
  headers: {
    'x-rapidapi-host': ' irctc1.p.rapidapi.com' ,
    'x-rapidapi-key': '844f57aab6msh05b9c9810017cddp185e4fjsn36e56aa06152'  }
});

// Add response interceptor for consistent error handling
irctcAxios.interceptors.response.use(
  response => response,
  error => {
    console.error('IRCTC API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Search for trains between stations on a specific date
 * @param {string} fromStation - Source station code
 * @param {string} toStation - Destination station code
 * @param {string} date - Travel date in YYYY-MM-DD format
 * @returns {Promise<object>} - Train data
 */
export const searchTrains = async (fromStation, toStation, date) => {
  try {
    console.log(`Searching trains from ${fromStation} to ${toStation} on ${date}`);
    
    // Format date from YYYY-MM-DD to DD-MM-YYYY as required by IRCTC API
    const formattedDate = formatDateForIRCTC(date);
    
    const response = await irctcAxios.get('/trainBetweenStations', {
      params: {
        fromStationCode: fromStation.toUpperCase(),
        toStationCode: toStation.toUpperCase(),
        dateOfJourney: formattedDate
      }
    });
    
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      // Process and format the train data for our application
      const formattedTrains = response.data.data.map(train => ({
        trainNumber: train.train_number,
        trainName: train.train_name,
        departureTime: train.depart_time,
        arrivalTime: train.arrival_time,
        travelTime: train.travel_time,
        availableClasses: formatTrainClasses(train.class_type),
        departureStation: `${train.from_station_name} (${train.from_station_code})`,
        arrivalStation: `${train.to_station_name} (${train.to_station_code})`,
        departureDate: date,
        runningDays: train.running_days || [],
        distance: train.distance
      }));
      
      return {
        success: true,
        data: formattedTrains
      };
    } else {
      // If API doesn't return expected structure, fallback to sample train data
      return {
        success: true,
        data: getSampleTrainData(fromStation, toStation, date)
      };
    }
  } catch (error) {
    console.error('Error searching trains:', error);
    
    // Fallback to sample data in case of API errors
    return {
      success: true,
      data: getSampleTrainData(fromStation, toStation, date),
      isPlaceholder: true
    };
  }
};

/**
 * Get PNR status for a train booking
 * @param {string} pnrNumber - PNR number
 * @returns {Promise<object>} - PNR status data
 */
export const getPNRStatus = async (pnrNumber) => {
  try {
    const response = await irctcAxios.get('--url https://irctc1.p.rapidapi.com/api/v3/getPNRStatusDetail \
', {
      params: {
        pnrNumber: pnrNumber
      }
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching PNR status:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch PNR status'
    };
  }
};

/**
 * Utility function to format date for IRCTC API
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} - Date in DD-MM-YYYY format
 */
function formatDateForIRCTC(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}

/**
 * Format train classes into readable array
 * @param {string} classString - Train class types
 * @returns {Array} - Array of class types
 */
function formatTrainClasses(classString) {
  if (!classString) return ['SL', '2S']; // Default classes if none provided
  
  // Split class string and map to readable format
  const classMap = {
    '1A': 'First AC',
    '2A': 'Second AC',
    '3A': 'Third AC',
    'SL': 'Sleeper',
    'CC': 'Chair Car',
    '2S': 'Second Sitting',
    'EC': 'Executive Class'
  };
  
  return classString.split(',').map(c => classMap[c.trim()] || c.trim());
}

/**
 * Provides sample train data for testing or when API fails
 * @param {string} fromStation - Source station code
 * @param {string} toStation - Destination station code
 * @param {string} date - Travel date
 * @returns {Array} - Sample train data
 */
function getSampleTrainData(fromStation, toStation, date) {
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-IN');
  
  return [
    {
      trainNumber: '12301',
      trainName: 'Rajdhani Express',
      departureTime: '16:55',
      arrivalTime: '09:40',
      travelTime: '16h 45m',
      availableClasses: ['First AC', 'Second AC', 'Third AC'],
      departureStation: `${fromStation.toUpperCase()} (${fromStation.toUpperCase()})`,
      arrivalStation: `${toStation.toUpperCase()} (${toStation.toUpperCase()})`,
      departureDate: formattedDate,
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      distance: '1450 km'
    },
    {
      trainNumber: '12259',
      trainName: 'Duronto Express',
      departureTime: '08:30',
      arrivalTime: '22:15',
      travelTime: '13h 45m',
      availableClasses: ['Second AC', 'Third AC', 'Sleeper'],
      departureStation: `${fromStation.toUpperCase()} (${fromStation.toUpperCase()})`,
      arrivalStation: `${toStation.toUpperCase()} (${toStation.toUpperCase()})`,
      departureDate: formattedDate,
      runningDays: ['Mon', 'Wed', 'Fri'],
      distance: '1390 km'
    },
    {
      trainNumber: '12801',
      trainName: 'Purushottam Express',
      departureTime: '21:45',
      arrivalTime: '19:25',
      travelTime: '21h 40m',
      availableClasses: ['Second AC', 'Third AC', 'Sleeper', 'Second Sitting'],
      departureStation: `${fromStation.toUpperCase()} (${fromStation.toUpperCase()})`,
      arrivalStation: `${toStation.toUpperCase()} (${toStation.toUpperCase()})`,
      departureDate: formattedDate,
      runningDays: ['Tue', 'Thu', 'Sat', 'Sun'],
      distance: '1520 km'
    }
  ];
}
