import axios from "axios";
import { BASE_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string = "") {
    this.endpoint = endpoint;
  }

  getAllByTimeRange = (quary: {
    start?: string;
    end?: string;
    month?: string;
  }) => {
    return axiosInstance
      .get<T[]>(this.endpoint, {
        params: {
          _start: quary.start ? quary.start : undefined,
          _end: quary.end ? quary.end : undefined,
          _month: quary.month ? quary.month : undefined,
        },
      })
      .then((res) => res.data);
  };

  getAll = (page?: number, pageSize?: number) => {
    return axiosInstance
      .get<T[]>(this.endpoint, {
        params: {
          _start: page ? (page - 1) * (pageSize || 6) : undefined,
          _limit: pageSize ? pageSize : undefined,
        },
      })
      .then((res) => res.data);
  };

  getSearchData = (search: string) => {
    return axiosInstance
      .get<T[]>(this.endpoint, {
        params: {
          searchBy: "name",
          searchKey: search,
        },
      })
      .then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  postFormData = (formData: FormData) => {
    return axiosInstance
      .post<T>(this.endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  };
}
export default ApiClient;
