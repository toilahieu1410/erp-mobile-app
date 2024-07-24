import { BaseResponse } from "../../models/BaseResponse"
import http from "../../../store/http"

interface TakeLeavePayLoad {
  content: string,
  typeApplication: string,
  handOverContent: string,
  handOverToUserId: string,
  leaveApplicationDetails: {
    leaveAt: string,
    timeType: number
  }[]
}

interface TakeLeaveType {
  value: number,
  display: string
}

interface ListTakeLeave {
  id: string,
  code: string,
  content: string,
  handOverContent: string,
  handOverToUserId: string,
  approvedBy: string | null,
  approvedByName: string | null,
  approvedAt: string | null,
  typeApplication: string,
  status: string,
  createdByUserId: string,
  createdByUserName: string,
  createdByName: string,
  createdAt: string,
  detail: {
    id: string,
    leaveAt: string
    timeType: number
  }[]
}

interface ListUsers {
  id: string, 
  hoTen: string,
  userName: string
}

export const ServiceTakeLeave = {
  async createTakeLeave(data: TakeLeavePayLoad): Promise<BaseResponse<any>> {
    try {
      const response = await http.post('/leave_application', data) 
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getTypesTakeLeave(): Promise<TakeLeaveType[]> {
    try {
      const response = await http.get('/leave_application/get_type_application' )
        return response.data.value
    } catch (error) {
      throw new Error(' Không thể lấy loại xác nhận')
    }
  },

  async getListTakeLeave(fromDate: string, toDate: string, pageNumber: number, pageSize: number): Promise<BaseResponse<ListTakeLeave[]>> {
    try {
      // Tạo URL cơ bản với pageNumber và pageSize
      let url = `/approval_application?PageNumber=${pageNumber}&PageSize=${pageSize}`;

      // Nếu fromDate có giá trị, thêm vào URL
      if (fromDate) {
        url += `&FromDate=${fromDate}`;
      }
      
      // Nếu toDate có giá trị, thêm vào URL
      if (toDate) {
        url += `&ToDate=${toDate}`;
      }
      
      // Gọi API với URL đã điều chỉnh
      const response = await http.get(url);

      return response.data.value.items
    } catch (error) {
      throw error
    }
  },

  async updateTakeLeave(id: string, data: TakeLeavePayLoad): Promise<BaseResponse<any>> {
    try {
      const response = await http.put(`/leave_application/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteTakeLeave(id: string): Promise<BaseResponse<any>> {
    try {
      const response = await http.delete(`/leave_application/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getUserHandOver(name: string): Promise<ListUsers[]> {
    try {
      const response = await http.get(`/leave_application/get_user_handover?Name=${name}`)
      return response.data.value
    } catch {
      throw new Error ('Không thể lấy danh sách người bàn giao')
    }
  }
  
}

export default ServiceTakeLeave