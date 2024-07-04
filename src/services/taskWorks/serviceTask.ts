import http from "../../../store/http";
import { BaseResponse } from "../../models/BaseResponse";

interface ListTask {
  id: string,
  title: string,
  typeJob: string,
  assignTo: string | null, 
  customerCode: string, 
  content: string,
  feedback: string,
  vote: number,
  locationCheckIn: string,
  locationCheckout: string,
  deadline: string,
  isDelete: boolean,
  deletedAt: string | null,
  createdAt: string,
  modifiedAt: string | null,
  createdBy: string,
  modifiedBy: string | null
}

interface TypeJob {
  value: number,
  displau: string
}

export const TaskService = {
  async getTasks(): Promise<BaseResponse<ListTask[]>> {
    try {
      const response = await http.get('task')
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getJobTypes(): Promise<BaseResponse<TypeJob[]>> {
    try {
      const response = await http.get('/task/get_type_job')
      return response.data
    } catch (error) {
      throw error
    }
  }
  
}

export default TaskService