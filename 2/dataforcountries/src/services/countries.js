import axios from 'axios'
const baseUrl='https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(baseUrl, { timeout: 5000 })
    return request.then(response => response.data)
}



export default { getAll }