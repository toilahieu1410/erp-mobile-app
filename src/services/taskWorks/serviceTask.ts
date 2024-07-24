import http from '../../../store/http';
import {BaseResponse} from '../../models/BaseResponse';

enum typeVote  {
  Kem = 1,
  TrungBinh = 2,
  Tot = 3
}

interface CreateTask {
  title: string,
  typejob: number,
  internalCode: string,
  customerCode: string,
  content: string,
  feedback: string,
  vote: typeVote,
  locationCheckIn: string,
  locationCheckOut: string,
  deadline: string,
  followers: string[]
}

interface UpdateTask {
  id: string;
  title: string;
  typejob: number;
  customerCode: string;
  content: string;
  feedback: string;
  vote: typeVote;
  deadline: string;
  followers: string[];
}

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
  typeJob: number;
  content: string;
  feedback: string;
  vote: number;
  locationCheckIn: string;
  locationCheckout: string;
  deadline: string;
  createdAt: string;
  followers: Followers[];
}

interface TypeJob {
  value: number;
  display: string;
}

interface UpdateTask extends CreateTask {
  id: string
}

export const TaskService = {
  async getTasks(
    fromDate?: string,
    toDate?: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<BaseResponse<ListTask[]>> {
    try {
       // Tạo URL cơ bản với pageNumber và pageSize
       let url = `/task?PageNumber=${pageNumber}&PageSize=${pageSize}`;
      
       // Nếu fromDate có giá trị, thêm vào URL
       if (fromDate) {
         url += `&FromDate=${fromDate}`;
       }
       
       // Nếu toDate có giá trị, thêm vào URL
       if (toDate) {
         url += `&ToDate=${toDate}`;
       }

       const response = await http.get(url);
      if (response.data.isSuccess) {
        return response.data.value
      } else {
        throw new Error(response.data.error.message || 'Error fetching tasks')
      }
    } catch (error) {
      throw error;
    }
  },

  async getJobTypes(): Promise<BaseResponse<TypeJob[]>> {
    try {
      const response = await http.get('/task/get_type_job')
      return response.data
    } catch (error) {
      throw error;
    }
  },

  async createTask(data: CreateTask): Promise<BaseResponse<any>> {
    try {
      const response = await http.post('/task', data)
      if (response.data.isSuccess) {
        return response.data
      }else {
        throw new Error(response.data.error.message || 'Error create tasks')
      }
    } catch (error) {
      throw error
    }
  }, 
  async updateTask(data: UpdateTask) : Promise<BaseResponse<any>> {
    try {
      const response = await http.put('/task', data)
      if (response.data.isSuccess) {
        return response.data
      } else {
        throw new Error(response.data.error.message || 'Error update tasks')
      }
    } catch (error) {
      throw error
    }
  },

  async deleteTask(taskId: string): Promise<BaseResponse<any>> {
    try {
      const response = await http.delete(`task/${taskId}`)
      if (response.data.isSuccess) {
        return response.data
      } else {
        throw new Error(response.data.error.message || 'Error delete task')
      }
    } catch (error) {
      throw error
    }
  }
}

export default TaskService;
