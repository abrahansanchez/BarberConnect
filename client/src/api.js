import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const fetchAppointments = () => API.get('/appointments');
export const fetchBarbers = () => API.get('/barbers');
export const fetchVoicemails = () => API.get('/voicemails');
 export const fetchtwilioSMS = () => API.get('/twilio/sms');

export default API;
