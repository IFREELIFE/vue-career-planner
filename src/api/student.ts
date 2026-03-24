import axios from '../utils/axios'

// 个人简历上传
export const resumeApi = {
  // 上传简历
  uploadResume: (formData: FormData) => {
    return axios.post('/student/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  // 获取简历信息
  getResume: () => {
    return axios.get('/student/resume')
  },
  
  // 删除简历
  deleteResume: () => {
    return axios.delete('/student/resume')
  }
}

// 学生画像
export const studentPersonaApi = {
  // 获取个人画像
  getPersona: () => {
    return axios.get('/student/persona')
  },
  
  // 生成个人画像
  generatePersona: () => {
    return axios.post('/student/persona/generate')
  }
}

// 自我偏好编辑
export const preferenceApi = {
  // 获取偏好设置
  getPreferences: () => {
    return axios.get('/student/preferences')
  },
  
  // 更新偏好设置
  updatePreferences: (data: any) => {
    return axios.put('/student/preferences', data)
  }
}

// 匹配推荐
export const matchApi = {
  // 获取匹配推荐列表
  getRecommendations: (params: { page: number; size: number; sortBy?: string }) => {
    return axios.get('/student/match/recommendations', { params })
  },
  
  // 获取匹配详情
  getMatchDetail: (id: number) => {
    return axios.get(`/student/match/${id}`)
  }
}

// 问卷与画像初始化
export const studentProfileApi = {
  // 提交初始技术能力与 MBTI
  initProfile: (data: { tech_skills: string; mbti: string; is_guaranteed: boolean }) => {
    return axios.post('/student/profile/init', data)
  }
}

// 职业规划匹配
export const careerPlanApi = {
  matchAndPlan: (data: { target_city: string; target_job: string; force_generate: boolean }) => {
    return axios.post('/student/career/match-and-plan', data)
  }
}

// 职位智能体
export const jobAgentApi = {
  jobChat: (data: { job_code: string; question: string }) => {
    return axios.post('/student/agent/job-chat', data)
  },
  applyJob: (jobId: string | number, payload: { grant_auth_to_enterprise: boolean }) => {
    return axios.post(`/student/jobs/${jobId}/apply`, payload)
  }
}

// 报告查看/导出
export const reportApi = {
  // 获取报告列表
  getReports: (params: { page: number; size: number; type?: string }) => {
    return axios.get('/student/reports', { params })
  },
  
  // 获取报告详情
  getReportDetail: (id: number) => {
    return axios.get(`/student/reports/${id}`)
  },
  
  // 导出报告
  exportReport: (id: number, format: string) => {
    return axios.get(`/student/reports/${id}/export`, {
      params: { format },
      responseType: 'blob'
    })
  },
  
  // 生成报告
  generateReport: (data: { type: string; params?: any }) => {
    return axios.post('/student/reports/generate', data)
  }
}
