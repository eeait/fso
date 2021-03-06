import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = id => {
    //console.log(`Trying to remove ${id}`)
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {getAll, create, remove, update}