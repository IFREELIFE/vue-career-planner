<template>
  <div class="career-goal-view">
    <h2>目标职业设定</h2>
    
    <el-card shadow="hover" class="goal-setting-card">
      <div class="goal-form">
        <div class="form-item">
          <el-form-label>目标城市</el-form-label>
          <el-select v-model="selectedCity" placeholder="请选择城市" class="w-full">
            <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
          </el-select>
        </div>
        
        <div class="form-item">
          <el-form-label>目标职业</el-form-label>
          <el-select v-model="selectedCareer" placeholder="请选择职业" class="w-full">
            <el-option v-for="career in careers" :key="career" :label="career" :value="career" />
          </el-select>
        </div>
        
        <div class="form-actions">
          <el-button type="primary" @click="analyzeMatch" :disabled="!selectedCity || !selectedCareer" :loading="loading">
            分析匹配度
          </el-button>
        </div>
      </div>
      
      <div v-if="matchResult" class="match-result">
        <h3>匹配度分析</h3>
        <div class="match-score">
          <div class="score-circle" :class="getScoreClass(matchResult.score)">
            <span class="score-value">{{ matchResult.score }}%</span>
          </div>
          <div class="score-info">
            <h4 :class="getScoreClass(matchResult.score)">{{ getEvaluationText(matchResult.score) }}</h4>
            <p class="score-reason">{{ matchResult.reason || '系统已根据您的画像完成匹配分析' }}</p>
          </div>
        </div>
        
        <div class="match-actions">
          <el-button v-if="matchResult.score < 70" @click="insistGoal" type="warning">
            坚持目标
          </el-button>
          <el-button type="primary" @click="generatePlan" :loading="generating">
            <el-icon><Download /></el-icon>
            生成规划方案
          </el-button>
        </div>
      </div>
    </el-card>
    
    <el-card shadow="hover" class="recommended-jobs" v-if="recommendedJobs.length > 0">
      <h3>推荐岗位</h3>
      <div class="jobs-list">
        <div class="job-item" v-for="(job, index) in recommendedJobs" :key="index">
          <div class="job-info">
            <h4>{{ job.title }}</h4>
            <p class="job-company">{{ job.company }}</p>
            <div class="job-tags">
              <el-tag size="small" effect="light">{{ job.salary }}</el-tag>
              <el-tag size="small" effect="light">{{ job.city }}</el-tag>
              <el-tag size="small" effect="light">{{ job.experience }}</el-tag>
            </div>
          </div>
          <div class="job-match">
            <span class="match-label">匹配度</span>
            <span class="match-value">{{ job.matchScore }}%</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'
import { careerPlanApi } from '../../api/student'

// 城市列表
const cities = ref([
  '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆'
])

// 职业列表
const careers = ref([
  '前端开发工程师', '后端开发工程师', '全栈开发工程师', '产品经理', 'UI设计师',
  '数据分析师', '算法工程师', '测试工程师', '运维工程师', '项目经理'
])

const selectedCity = ref('')
const selectedCareer = ref('')
const loading = ref(false)
const generating = ref(false)
const matchResult = ref<{
  score: number
  recommend: boolean
  reason?: string
  pdf_url?: string | null
} | null>(null)
const pdfUrl = ref<string | null>(null)

// 推荐岗位
const recommendedJobs = ref([
  {
    title: '前端开发工程师',
    company: '字节跳动',
    salary: '15K-25K',
    city: '北京',
    experience: '1-3年',
    matchScore: 85
  },
  {
    title: '全栈开发工程师',
    company: '腾讯',
    salary: '20K-30K',
    city: '深圳',
    experience: '3-5年',
    matchScore: 78
  },
  {
    title: '前端开发工程师',
    company: '阿里巴巴',
    salary: '18K-28K',
    city: '杭州',
    experience: '1-3年',
    matchScore: 82
  }
])

const getEvaluationText = (score: number) => {
  if (score >= 85) {
    return '非常匹配'
  }
  if (score >= 70) {
    return '比较匹配'
  }
  return '匹配度较低'
}

const setMatchResult = (payload: { match_score: number; recommend: boolean; reason?: string; pdf_url?: string | null }) => {
  matchResult.value = {
    score: payload.match_score,
    recommend: payload.recommend,
    reason: payload.reason,
    pdf_url: payload.pdf_url ?? null
  }
  pdfUrl.value = payload.pdf_url ?? null
}

// 分析匹配度
const analyzeMatch = async (force = false) => {
  if (!selectedCity.value || !selectedCareer.value) return
  loading.value = true
  try {
    const { data } = await careerPlanApi.matchAndPlan({
      target_city: selectedCity.value,
      target_job: selectedCareer.value,
      force_generate: force
    })
    setMatchResult(data)
    if (!data.recommend && !force) {
      ElMessage.warning(data.reason || '匹配度偏低，确认后可继续生成规划')
    } else if (data.pdf_url) {
      ElMessage.success('规划方案已生成，可下载 PDF')
    } else {
      ElMessage.success('匹配度分析完成')
    }
  } catch (error) {
    ElMessage.error('匹配分析失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const insistGoal = () => analyzeMatch(true)

// 生成规划方案
const generatePlan = async () => {
  generating.value = true
  try {
    await analyzeMatch(true)
    if (pdfUrl.value) {
      window.open(pdfUrl.value, '_blank')
    }
  } finally {
    generating.value = false
  }
}

// 根据分数获取样式类
const getScoreClass = (score: number) => {
  if (score >= 85) return 'high-score'
  if (score >= 70) return 'medium-score'
  return 'low-score'
}
</script>

<style scoped lang="scss">
.career-goal-view {
  padding: 20px;
  
  h2 {
    margin: 0 0 20px;
    color: #333;
    font-size: 24px;
    font-weight: 600;
  }
  
  .goal-setting-card {
    margin-bottom: 20px;
    border-radius: 12px;
    
    .goal-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      
      .form-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        
        .w-full {
          width: 100%;
        }
      }
      
      .form-actions {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
      }
    }
    
    .match-result {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px solid #f0f0f0;
      
      h3 {
        margin: 0 0 20px;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
      
      .match-score {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 30px;
        
        .score-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          
          &.high-score {
            background: linear-gradient(135deg, #67c23a, #85ce61);
          }
          
          &.medium-score {
            background: linear-gradient(135deg, #e6a23c, #ebb563);
          }
          
          &.low-score {
            background: linear-gradient(135deg, #f56c6c, #f78989);
          }
        }
        
        .score-info {
          flex: 1;
          
          h4 {
            margin: 0 0 8px;
            font-size: 20px;
            font-weight: 600;
            
            &.high-score {
              color: #67c23a;
            }
            
            &.medium-score {
              color: #e6a23c;
            }
            
            &.low-score {
              color: #f56c6c;
            }
          }
          
          .score-reason {
            margin: 0;
            color: #666;
            line-height: 1.5;
          }
        }
      }
      
      .match-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
    }
  }
  
  .recommended-jobs {
    border-radius: 12px;
    
    h3 {
      margin: 0 0 16px;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    
    .jobs-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      
      .job-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .job-info {
          flex: 1;
          
          h4 {
            margin: 0 0 8px;
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }
          
          .job-company {
            margin: 0 0 8px;
            font-size: 14px;
            color: #666;
          }
          
          .job-tags {
            display: flex;
            gap: 8px;
          }
        }
        
        .job-match {
          text-align: right;
          
          .match-label {
            display: block;
            font-size: 12px;
            color: #999;
            margin-bottom: 4px;
          }
          
          .match-value {
            display: block;
            font-size: 18px;
            font-weight: 600;
            color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
