import axios from '../utils/axios'

// 岗位管理
export const jobApi = {
  // 获取岗位列表
  getJobs: (params: { page: number; size: number; keyword?: string; status?: string }) => {
    return axios.get('/company/jobs', { params })
  },
  
  // 创建岗位
  createJob: (data: any) => {
    return axios.post('/company/jobs', data)
  },
  
  // 更新岗位
  updateJob: (id: number, data: any) => {
    return axios.put(`/company/jobs/${id}`, data)
  },
  
  // 删除岗位
  deleteJob: (id: number) => {
    return axios.delete(`/company/jobs/${id}`)
  },
  
  // 获取岗位详情
  getJobDetail: (id: number) => {
    return axios.get(`/company/jobs/${id}`)
  }
}

// 岗位画像审核
export const jobPersonaApi = {
  // 获取岗位画像列表
  getPersonas: (params: { page: number; size: number; jobId?: number; status?: string }) => {
    return axios.get('/company/job-personas', { params })
  },
  
  // 审核岗位画像
  auditPersona: (id: number, data: { status: string; remark?: string }) => {
    return axios.put(`/company/job-personas/${id}/audit`, data)
  },
  
  // 获取岗位画像详情
  getPersonaDetail: (id: number) => {
    return axios.get(`/company/job-personas/${id}`)
  }
}

// 面试反馈录入
export const companyInterviewFeedbackApi = {
  // 获取面试反馈列表
  getFeedbacks: (params: { page: number; size: number; jobId?: number; studentId?: number }) => {
    return axios.get('/company/interview-feedbacks', { params })
  },
  
  // 创建面试反馈
  createFeedback: (data: any) => {
    return axios.post('/company/interview-feedbacks', data)
  },
  
  // 更新面试反馈
  updateFeedback: (id: number, data: any) => {
    return axios.put(`/company/interview-feedbacks/${id}`, data)
  }
}

// 智能简历筛选
export const getResumeDetail = (candidateId: string) => {
  return axios.get(`/company/resume/detail/${candidateId}`)
}

// 企业端核心接口
export const enterpriseApi = {
  // 批量上传岗位 Excel
  importJobsExcel: (formData: FormData) => {
    return axios.post('/jobs/import/excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  // 手动关闭/下线岗位
  closeJob: (jobId: string | number) => {
    return axios.put(`/enterprise/jobs/${jobId}/close`)
  },
  // 企业录入真实面试反馈
  submitInterviewFeedback: (applicationId: string | number, data: { result: string; tags: string[]; notes: string }) => {
    return axios.post(`/enterprise/interviews/${applicationId}/feedback`, data)
  }
}
