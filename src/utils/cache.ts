export function setCache(key: string, value: any): boolean {
  try {
    const parseValue = JSON.stringify(value)
    window.localStorage.setItem(key, parseValue)
    return true
  } catch (err) {
    return false
  }
}
export function getCache(key: string): any {
  try {
    const getValue = window.localStorage.getItem(key)
    if (getValue) {
      const parseValue = JSON.parse(getValue)
      return parseValue
    }
  } catch (err) {
    return null
  }
}
export function deleteCache(key: string): any {
  try {
    window.localStorage.removeItem(key)
  } catch (err) {
    return null
  }
}
