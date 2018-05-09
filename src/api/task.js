import fetch from '@/utils/fetch'

export function getClaimTasks(query) {
  return fetch({
    url: `/activiti/claim-tasks`,
    method: 'get',
    params: query
  })
}

export function getCompleteTasks(query) {
  return fetch({
    url: `/activiti/complete-tasks`,
    method: 'get',
    params: query
  })
}

export function getCompleteHistoryTasks(query) {
  return fetch({
    url: `/activiti/complete-history-tasks`,
    method: 'get',
    params: query
  })
}

export function getHistoryActivitis(query) {
  return fetch({
    url: `/activiti/history-activitis`,
    method: 'get',
    params: query
  })
}

export function claimTask(taskIds) {
  return fetch({
    url: `/activiti/claim`,
    method: 'post',
    data: taskIds
  })
}

export function getWorkflowTasks(type, query) {
  switch (type) {
    case 'complete-tasks':
      return getCompleteTasks(query)
    case 'complete-history-tasks':
      return getCompleteHistoryTasks(query)
    case 'history-activitis':
      return getHistoryActivitis(query)
  }
}

export function qualityCompleteTask(query) {
  return fetch({
    url: `/activiti/quality-complete-task`,
    method: 'post',
    data: query
  })
}

export function qualityRefuseTask(query) {
  return fetch({
    url: `/activiti/quality-refuse-task`,
    method: 'post',
    data: query
  })
}

export function qualityBackTask(query) {
  return fetch({
    url: `/activiti/quality-back-task`,
    method: 'post',
    data: query
  })
}

export function serviceAdjustTask(query) {
  return fetch({
    url: `/activiti/service-adjust-task`,
    method: 'post',
    data: query
  })
}

export function serviceRefuseTask(query) {
  return fetch({
    url: `/activiti/service-refuse-task`,
    method: 'post',
    data: query
  })
}

export function signCompleteTask(query) {
  return fetch({
    url: `/activiti/sign-complete-task`,
    method: 'post',
    data: query
  })
}

export function doRiskComplete(query) {
  return fetch({
    url: `/activiti/risk-complete-task`,
    method: 'post',
    data: query
  })
}

export function doRiskBack(query) {
  return fetch({
    url: `/activiti/risk-back-task`,
    method: 'post',
    data: query
  })
}

// 归档老流程
export function endOldProcess(query) {
  return fetch({
    url: `/activiti/end-old-process`,
    method: 'post',
    data: query
  })
}

// app任务查询
export function appTaskSearch(query) {
  return fetch({
    url: `/addressbook/clientassignselect`,
    method: 'get',
    params: query
  })
}
