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



export const ConfirmService = {
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

  async getConfirmList(fromDate: string, toDate: string): Promise<BaseResponse<ListConfirm[]>> {
    try {
      const response = await http.get(`/approval_application?FromDate=${fromDate}&ToDate=${toDate}`)
      return response.data.value.items
    } catch (error) {
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
  },

  async updateConfirm(id: string, data: ConfirmPayload): Promise<BaseResponse<any>> {
    try {
      const response = await http.put(`/approval_application/${id}`, data)
      return response.data
    }
    catch (error) {
      throw error
    }
  }
}

export default ConfirmService