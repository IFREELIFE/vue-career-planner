# 项目页面说明

本文档梳理了当前前端项目的页面文件、对应路由及主要功能，便于快速定位页面代码。

## 入口与整体架构
- `src/main.ts`：应用入口，挂载 Vue 实例、Pinia、Element Plus，并注册路由。
- `src/App.vue`：根组件，只承载 `<router-view />`。
- `src/router/index.ts`：路由与角色权限配置，基于 `requiresAuth` 与 `role` 进行访问控制。
- `src/components/layout/MainLayout.vue`：登录后的通用布局，按用户角色动态加载侧边栏（学生/企业/高校/平台）。
- 侧边栏组件：`src/components/layout/StudentSidebar.vue`、`CompanySidebar.vue`、`SchoolSidebar.vue`、`PlatformSidebar.vue`。

## 页面速览（按角色）

### 学生端 `/student`（使用 MainLayout + StudentSidebar）
- `src/views/student/StudentHome.vue`（`/student`）：学生首页，展示个人概览、快捷入口、推荐岗位、最近通告、学习进度与最近活动。
- `src/views/platform/Dashboard.vue`（`/student/dashboard`）：质量指标驾驶舱（在学生路由下复用平台仪表盘组件）。
- `src/views/student/StudentPersonaView.vue`（`/student/persona`）：画像雷达图与特征摘要，展示学生能力画像。
- `src/views/student/AppointmentView.vue`（`/student/appointment`）：职业指导预约，支持查看老师/时段并创建预约。
- `src/views/student/CareerGoalView.vue`（`/student/career-goal`）：目标城市与职业设定，调用匹配度分析与规划生成，可下载 PDF。
- `src/views/student/JobsView.vue`（`/student/jobs`）：岗位列表与筛选，查看详情，AI 职业顾问问答，以及“投递并授权”操作。
- `src/views/student/AchievementsView.vue`（`/student/achievements`）：学习/求职成就展示卡片。
- `src/views/student/AnnouncementsView.vue`（`/student/announcements`）：系统公告列表与状态标记。
- `src/views/student/Profile.vue`（`/student/profile`）：个人信息/联系方式维护。
- `src/views/student/WelcomeNotification.vue`（`/student/welcome`）：欢迎与提示信息页。
- 问卷流程：  
  - `src/views/student/questionnaire/SkillsQuestionnaire.vue`（`/student/questionnaire/skills`）：技术技能问卷。  
  - `src/views/student/questionnaire/MBTIQuestionnaire.vue`（`/student/questionnaire/mbti`）：MBTI 性格测试。  
  - `src/views/student/questionnaire/ConfirmQuestionnaire.vue`（`/student/questionnaire/confirm`）：问卷提交前确认与画像初始化。
- 其他保留/占位页面（当前未在路由注册，可用于扩展或测试）：  
  - `src/views/student/ResumeUpload.vue`：简历上传占位。  
  - `src/views/student/ReportView.vue`：报告查看占位。  
  - `src/views/student/PreferenceEdit.vue`：偏好编辑占位。  
  - `src/views/student/MatchRecommendation.vue`：匹配推荐空状态。  
  - `src/views/student/TestProfile.vue`：个人中心测试页。

### 企业端 `/company`（使用 MainLayout + CompanySidebar）
- `src/views/company/JobManagement.vue`（`/company/jobs`）：岗位列表、筛选、查看详情、创建/编辑/删除岗位。
- `src/views/company/JobCandidateManagement.vue`（`/company/job-candidate`）：岗位投递列表，查看候选人及筛选。
- `src/views/company/InterviewFeedbackEntry.vue`（`/company/interview-feedback/:candidateId`）：面试反馈登记表单。
- `src/views/company/IntelligentResume.vue`（`/company/intelligent-resume/:candidateId`）：智能简历分析/报告展示。

### 高校端 `/school`（使用 MainLayout + SchoolSidebar）
- `src/views/school/StudentProfile.vue`（`/school/profile`）：学生档案与画像列表。
- `src/views/school/EmploymentAnalysis.vue`（`/school/employment-analysis`）：就业数据与趋势分析。
- `src/views/school/GuidanceManagement.vue`（`/school/guidance-management`）：老师信息管理、辅导纪要登记及预约时段选择。

### 平台端 `/platform`（使用 MainLayout + PlatformSidebar）
- `src/views/platform/Dashboard.vue`（`/platform/dashboard`）：质量指标驾驶舱，核心业务指标与趋势。
- `src/views/platform/DataSourceManagement.vue`（`/platform/data-source`）：数据源接入/配置管理。
- `src/views/platform/ContentAudit.vue`（`/platform/content-audit`）：内容审核与发布流程。
- `src/views/platform/TaskScheduler.vue`（`/platform/task-scheduler`）：任务调度中心，计划任务与执行记录。
- `src/views/platform/ModelQuality.vue`（`/platform/model-quality`）：模型质量监控与优化。

### 认证
- `src/views/auth/Login.vue`（`/login`）：登录页，公开路由。

## 相关状态与接口
- `src/stores/jobStore.ts`：集中管理岗位与候选人筛选条件等公司端状态。
- `src/api/*.ts`：按领域拆分的接口封装（学生、企业、高校、平台、认证）。
