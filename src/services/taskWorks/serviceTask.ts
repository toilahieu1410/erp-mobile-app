import http from '../../../store/http';
import {BaseResponse} from '../../models/BaseResponse';

interface Followers {
  id: string;
  userId: string;
  userName: string;
  hoTen: string;
  maPhongBan: string;
}

interface ListTask {
  id: string;
  title: string;
  typeJob: string;
  content: string;
  feedback: string;
  vote: string;
  locationCheckIn: string;
  locationCheckout: string;
  deadline: string;
  createdAt: string;
  followers: Followers[];
}

interface TypeJob {
  value: number;
  displau: string;
}

export const TaskService = {
  async getTasks(
    fromDate?: string,
    toDate?: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<BaseResponse<ListTask[]>> {
    try {
      const response = await http.get(`/task?FromDate=${fromDate}&ToDate=${toDate}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
      if (response.data.isSuccess) {
        return response.data.value;
      } else {
        throw new Error(response.data.error.message || 'Error fetching tasks');
      }
    } catch (error) {
      throw error;
    }
  },

  async getJobTypes(): Promise<BaseResponse<TypeJob[]>> {
    try {
      const response = await http.get('/task/get_type_job');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
};

export default TaskService;
