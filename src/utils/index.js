import axios from 'axios';
import { baseUrl } from './helpers';

export default axios.create({
  baseURL: baseUrl,
});
