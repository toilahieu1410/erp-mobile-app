import { BaseResponse } from "../../models/BaseResponse"
import http from "../../../store/http"

interface ConfirmPayload {
  content: string,
  type: string,
  startDate: string,
  endDate: string,
  dateNeedConfirm: string
}

interface ConfirmType {
  value: number,
  display:string
}

interface ListConfirm {
  id: string,
  code: string,
  content: string,
  dateNeedConfirm: string,
  type: string,
  status: string,
  createdByUserId: string,
  createdByUsername: string,
  startDate: string | null,
  endDate: string | null,
  createdAt: string
}


export const ServiceConfirm = {
  async createConfirm(data: ConfirmPayload): Promise<BaseResponse<any>> {
    try {
      const response = await http.post('/approval_application', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getConfirmTypes(): Promise<ConfirmType[]> {
    try {
      const response = await http.get('/approval_application/get_type_application')
      return response.data.value
    } catch (error) {
      throw new Error('Không thể lấy loại xác nhận') // Failed to fetch confirmation types
    }
  },

  async getConfirmList(fromDate: string, toDate: string, pageNumber: number, pageSize: number): Promise<BaseResponse<ListConfirm[]>> {
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
      return response.data.value.items;
    } catch (error) {
      throw error;
    }
  },

  async updateConfirm(id: string, data: ConfirmPayload): Promise<BaseResponse<any>> {
    try {
      const response = await http.put(`/approval_application/${id}`, data)
      return response.data
    }
    catch (error) {
      throw error
    }
  },

  async deleteConfirm(id: string): Promise<BaseResponse<any>> {
    try {
      const response = await http.delete(`/approval_application/${id}`)
      return response.data
    }
     catch (error) {
      throw error
     }
  }

}

export default ServiceConfirm