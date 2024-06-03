import { BaseResponse } from "../../models/BaseResponse"
import http from "../../../store/http"

interface ListTakeLeave {
  id: string,
  content: string,
  handOver_Content: string,
  handOver_ToUserId: string,
  approvedBy: string | null,
  approvedAt: string | null,
  type: string,
  status: string,
  createdByUserId: string,
  createdByUserName: string,
  createdAt: string
}

export const TakeLeaveService = {
  async getListTakeLeave(fromDate: string, toDate: string): Promise<BaseResponse<ListTakeLeave[]>> {
    try {
      const response = await http.get(`/leave_application?FromDate=${fromDate}&ToDate=${toDate}`)
      return response.data.value.items
    } catch (error) {
      throw error
    }
  }
}

export default TakeLeaveService