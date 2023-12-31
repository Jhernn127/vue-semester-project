import { ref } from 'vue'
import axios from 'axios'

const vehicles = ref([])
const pages = ref(1)
const loading = ref(false)
const activePage = ref(1)
const pageSize = ref(12)
const currentVehicle = ref(null)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  auth: {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  },
})

const getVehicles = async () => {
  loading.value = true
  const { data, headers } = await api.get('/api/vehicles', {
    params: {
      page: activePage.value,
      size: pageSize.value,
    },
  })
  vehicles.value = data
  pages.value = Number(headers['x-total-pages']) || 1
  loading.value = false
}

const fetchVehicle = async (id) => {
  const { data } = await api.get(`/api/vehicles/${id}`)
  currentVehicle.value = data
  console.log(data)
}
const useAPI = () => {
  return { vehicles, pages, activePage, loading, pageSize, getVehicles, fetchVehicle, currentVehicle}
}

export default useAPI