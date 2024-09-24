import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Post from '@/types/post';
import User from '@/types/user';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export class CrudService<T> {
  public endpoint: string;

  constructor(resourceName: string) {
    this.endpoint = `${API_BASE_URL}/${resourceName}`;
  }

  async getAll(): Promise<T[]> {
    const response: AxiosResponse<T[]> = await axios.get(this.endpoint);
    return response.data;
  }

  async getById(id: number): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const response: AxiosResponse<T> = await axios.post(this.endpoint, item);
    return response.data;
  }

  async update(id: number, item: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await axios.put(
      `${this.endpoint}/${id}`,
      item
    );
    return response.data;
  }

  async patch(id: number, item: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await axios.patch(
      `${this.endpoint}/${id}`,
      item
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.endpoint}/${id}`);
  }

  async customRequest<R>(config: AxiosRequestConfig): Promise<R> {
    const response: AxiosResponse<R> = await axios.request(config);
    return response.data;
  }
}

export const PostService = new CrudService<Post>('posts');
export const UserService = new CrudService<User>('users');
