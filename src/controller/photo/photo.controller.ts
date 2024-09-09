// Photoontroller.ts makes use of the AxiosHelper to make http requests and return response
import AxiosHelper from '../../axios/axios.helper';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

class PhotoController {
  private apiClient: AxiosHelper;

  // constructor instantiate the Axioshelper  
  // set the base URL and ACCESS_KEY for the http requests
  constructor() {
    this.apiClient = new AxiosHelper('https://api.unsplash.com', ACCESS_KEY);
  }

  async fetchPhotos(topicName:string): Promise<any> {
    try {
      const response = await this.apiClient.get(`/topics/${topicName}/photos`, {orientation: 'landscape'});
      console.log('Fetched photos:', response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching photos:', error.message);
        throw new Error(error.message);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error occurred.');
      }
    }
  }
}

export default PhotoController;