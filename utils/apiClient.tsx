export class ApiClient {
    private baseURL: string
    private token: string | null
  
    constructor(baseURL: string) {
      this.baseURL = baseURL
      this.token = null // Se actualizará dinámicamente
    }
  
    // Método para establecer el token de autenticación
    setToken(token: string) {
      this.token = token
    }
  
    // Método privado para configurar opciones de la solicitud
    private getRequestOptions(
      method: string,
      body?: Record<string, unknown> | FormData,
      customHeaders?: HeadersInit
    ): RequestInit {
      const headers: HeadersInit = {
        Accept: 'application/json',
        ...customHeaders,
      }
  
      // Si el body no es FormData, añadimos Content-Type
      if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
      }
  
      // Añadir el token si existe
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`
      }
  
      return {
        method,
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body),
      }
    }
  
    // Método principal para realizar peticiones
    private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, options)
  
      // Si el token expiró (401), intenta renovarlo y reintentar la solicitud
      if (response.status === 401 && this.token) {
        const newToken = await this.refreshToken()
        if (newToken) {
          this.setToken(newToken)
          // Reintentar con el nuevo token
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          }
          return this.request(endpoint, options)
        }
      }
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error en la solicitud')
      }
  
      return response.json()
    }
  
    // Métodos públicos para los métodos HTTP
    async get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
      const options = this.getRequestOptions('GET', undefined, customHeaders)
      return this.request<T>(endpoint, options)
    }
  
    async post<T>(
      endpoint: string,
      body: Record<string, unknown> | FormData,
      customHeaders?: HeadersInit
    ): Promise<T> {
      const options = this.getRequestOptions('POST', body, customHeaders)
      return this.request<T>(endpoint, options)
    }
  
    async put<T>(
      endpoint: string,
      body: Record<string, unknown> | FormData,
      customHeaders?: HeadersInit
    ): Promise<T> {
      const options = this.getRequestOptions('PUT', body, customHeaders)
      return this.request<T>(endpoint, options)
    }
  
    async delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
      const options = this.getRequestOptions('DELETE', undefined, customHeaders)
      return this.request<T>(endpoint, options)
    }
  
    // Método para renovar el token
    private async refreshToken(): Promise<string | null> {
      try {
        const response = await fetch(`${this.baseURL}/refresh-token`, {
          method: 'POST',
          credentials: 'include', // Si usas cookies para manejar sesiones
        })
        if (response.ok) {
          const data = await response.json()
          return data.token
        }
      } catch (error) {
        console.error('Error al renovar el token:', error)
      }
      return null
    }
  }
  