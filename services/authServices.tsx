import { ApiClient } from '../utils/apiClient'

// Instancia del cliente API
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_AUTH_URL || 'default_api_url')

const client_secret = process.env.NEXT_PUBLIC_SECRET_API_KEY

export const authService = {
  async login(email: string, password: string) {
    console.log(process.env.NEXT_PUBLIC_AUTH_URL)
    const data = await apiClient.post('/token',
      {
        username: email,
        password: password,
        client_id: '2',
        client_secret: client_secret,
        grant_type: 'password'
      })

    apiClient.setToken(data.token) // Guardar el token en el cliente API
    return data
  },

  async refresh(refresh: string) {
    console.log('yyyy')
    const data = await apiClient.post('/token/refresh',
      {
        client_id: '2',
        client_secret: client_secret,
        grant_type: 'refresh_token',
        refresh_token: refresh
      }
    )

    apiClient.setToken(data.token)
    return data
  }
}