import axios from 'axios'

const resource = "https://covid-api.mmediagroup.fr/v1/vaccines?country="

export default {
    get(country) {
        return axios.get(resource+country)
    }
}