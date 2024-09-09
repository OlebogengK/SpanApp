// This is the AxiosHelper class to help with all the http requests
import axios, { AxiosInstance } from 'axios';

class AxiosHelper {
  private instance: AxiosInstance;

  constructor(baseURL: string, accessKey: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Authorization': `Client-ID ${accessKey}`
      }
    });
  }

  get<T>(path: string, params?: any) {
    return this.instance.get<T>(path, { params });
  }

  post<T>(path: string, data: any) {
    return this.instance.post<T>(path, data);
  }

  put<T>(path: string, data: any) {
    return this.instance.put<T>(path, data);
  }

  delete<T>(path: string, data?: any) {
    return this.instance.delete<T>(path, { data });
  }
}

export default AxiosHelper;

