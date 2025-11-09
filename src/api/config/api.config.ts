import axios from 'axios'

export const TranscriptionInstance = axios.create({
  baseURL:'http://localhost:8080',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})