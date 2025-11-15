import axios from 'axios'

export const TranscriptionInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('access_token'),
  }
});

export const AuthorizationInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Accept': 'application/json',
  }
});