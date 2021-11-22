import axios from "axios";

export default axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '6dcd2b6d6cmsh665941fca0cf63bp17e5ddjsnf4e265f4cb0e'
  }
});