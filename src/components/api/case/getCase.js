import axios from 'axios'

const resource = "https://covid-api.mmediagroup.fr/v1/cases"

export default {
    get() {
        return axios.get(resource)
    }
}