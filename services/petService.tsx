import { ApiClient } from '../utils/apiClient'

const apiClient = new ApiClient('http://localhost/api')

export const petService = {
  async getPetDetails(petId: string) {
    this.setToken()
    return apiClient.get(`/pets/${petId}`)
  },

  async putMoreDetails(petId: string, details: any) {
    this.setToken()
    return apiClient.put(`/pets/${petId}`, details)
  },

  async uploadPetImage(petId: string, formData: any) {
    this.setToken()
    return apiClient.post(`/pets/${petId}`, formData, {'Accept': 'application/json' }as HeadersInit)
  },

  async createAllergy(petId: number, allergy: any) {
    this.setToken()
    return apiClient.post(`/allergies/${petId}`,allergy)
  },

  async updateAllergy(petId: number, allergy: any, allergyId: number) {
    this.setToken()
    return apiClient.put(`/allergies/${petId}/${allergyId}`,allergy)
  },

  async createVaccine(petId: number, vaccine: any) {
    this.setToken()
    return apiClient.post(`/vaccines/${petId}`,vaccine);
  },

  async createWalk(petId: number, walk: any) {
    this.setToken()
    return apiClient.post(`/walks/${petId}`,walk);
  },

  async deleteWalk(petId: number, day: string, time: string) {
    this.setToken()
    return apiClient.delete(`/walks/${petId}/${day}/${time}`);
  },

  setToken() {
    apiClient.setToken(localStorage.getItem('access_token')||'')
  }
}
