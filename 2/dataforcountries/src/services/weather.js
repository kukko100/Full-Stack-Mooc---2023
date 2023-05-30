import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY


const getWeather = ({ lat, lng}) => {
    const baseUrl= `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}&aqi=no`
    const request = axios.get(baseUrl, { timeout: 5000 })
    return request.then(response => response.data)
}


export default { getWeather }