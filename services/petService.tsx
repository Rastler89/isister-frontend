import { ApiClient } from '../utils/apiClient'

const apiClient = new ApiClient('http://localhost/api')

export const petService = {
  async getPetDetails(petId: string) {
    apiClient.setToken(localStorage.getItem('access_token')||'')
    return apiClient.get(`/pets/${petId}`)
  },

  async uploadPetImage(petId: string, file: File) {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('petId', petId)

    return apiClient.post('/upload-image', formData)
  },
}
