import { parseTime } from './index'
export const dateFormat = (value, fromat) => {
  if (!value) return ''
  return parseTime(value, fromat)
}
