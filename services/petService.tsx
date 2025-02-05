import { ApiClient } from '../utils/apiClient'

const apiClient = new ApiClient('http://localhost/api')

export const petService = {
  async getPetDetails(petId: string) {
    apiClient.setToken(localStorage.getItem('access_token')||'')
    return apiClient.get(`/pets/${petId}`)
  },

  async putMoreDetails(petId: string, details: any) {
    apiClient.setToken(localStorage.getItem('access_token')||'')
    return apiClient.put(`/pets/${petId}`, details)
  },

  async uploadPetImage(petId: string, formData: any) {
    apiClient.setToken(localStorage.getItem('access_token')||'')
    return apiClient.post(`/pets/${petId}`, formData, {'Accept': 'application/json' }as HeadersInit)
  },
}
