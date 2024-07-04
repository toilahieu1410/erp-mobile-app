import { BaseResponse } from "../../models/BaseResponse"
import http from "../../../store/http"

interface WorkFromHomePayLoad {
  content: string,
  equipmentBorrow: string,
  startDate: string,
  endDate: string
}

interface ListWorkFromHome {
  id: string,
  code: string,
  content: string,
  equipmentBorrow: string,
  startDate: string,
  endDate: string,
  createdByUserId: string,
  createdByUserName: string,
  createdByName: string,
  status: string,
  approvedBy: string | null,
  approvedAt: string | null,
  createdAt: string
}

export const ServiceWorkFromHome = {
  async createWorkFromHome(data: WorkFromHomePayLoad): Promise<BaseResponse<any>> {
    try {
      const response = await http.post('/work_from_home_application', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async getListWorkFromHome(fromDate: string, toDate: string, pageNumber: number, pageSize: number): Promise<BaseResponse<ListWorkFromHome[]>> {
    try {
      const response = await http.get(`/work_from_home_application?FromDate=${fromDate}&ToDate=${toDate}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
      return response.data.value.items
    } catch (error) {
      throw error
    }
  },

  async updateWorkFromHome(id: string, data: WorkFromHomePayLoad): Promise<BaseResponse<any>> {
    try {
      const response = await http.put(`/work_from_home_application/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async deleteWorkFromHome(id: string): Promise<BaseResponse<any>> {
    try {
      const response = await http.delete(`/work_from_home_application/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default ServiceWorkFromHome