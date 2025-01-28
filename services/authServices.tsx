import { ApiClient } from '../utils/apiClient'

// Instancia del cliente API
const apiClient = new ApiClient('http://localhost/api')

export const authService = {
  async login(email: string, password: string) {
    const data = await apiClient.post('/login', { email, password })
    apiClient.setToken(data.token) // Guardar el token en el cliente API
    return data
  },

  async logout() {
    await apiClient.post('/logout', {})
    apiClient.setToken(null) // Limpiar el token
  },
}
