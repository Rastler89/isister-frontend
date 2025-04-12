import { create } from 'domain'
import { ApiClient } from '../utils/apiClient'

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'default_api_url')

export const petService = {
  async getPetDetails(petId: string) {
    this.setToken()
    return apiClient.get(`/pets/${petId}`)
  },

  async getSpecies() {
    this.setToken()
    return apiClient.get('/species')
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

  async createMeal(petId: number, meal: any) {
    this.setToken()
    return apiClient.post(`/diets/${petId}`,meal);
  },

  async deleteMeal(petId: number, day: string, time: string) {
    this.setToken()
    return apiClient.delete(`/diets/${petId}/${day}/${time}`);
  },

  async getTypeMedical() {
    this.setToken()
    return apiClient.get('/medicalType');
  },

  async createVisit(petId: number, visit: any) {
    this.setToken()
    return apiClient.post(`/visits/${petId}`,visit);
  },

  async createTreatment(petId: number, treatment: any) {
    this.setToken()
    return apiClient.post(`/treatments/${petId}`,treatment);
  },

  async createSurgery(petId: number, medical: any) {
    this.setToken()
    return apiClient.post(`/surgeries/${petId}`,medical);
  },

  async createTest(petId: number, test: any) {
    this.setToken()
    return apiClient.post(`/medicals/${petId}`,test);
  },

  async createWeight(petId: number, weight: any) {
    this.setToken()
    return apiClient.post(`/pets/${petId}/weight`,weight);
  },

  async getCountries() {
    this.setToken()
    return apiClient.get('/countries/full')
  },

  async updateProfile(profile:any) {
    this.setToken()
    return apiClient.post('/profile', profile)
  },

  async changePassword(password:any) {
    this.setToken()
    return apiClient.post('/changePassword', password)
  },

  async getProfile() {
    this.setToken()
    return apiClient.get('/profile')
  },

  async getPublicPet(id:string) {
    return apiClient.get(`/public/pet/${id}`)
  },

  async getArticles() {
    return apiClient.get('/articles')
  },

  async getArticle(slug:string) {
    return apiClient.get(`/articles/${slug}`)
  },

  setToken() {
    apiClient.setToken(localStorage.getItem('access_token')||'')
  }
}
