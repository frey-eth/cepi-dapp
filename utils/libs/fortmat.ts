export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + 'k'
    : Math.sign(num) * Math.abs(num)
}

export const addressFormatter = (address: string | undefined) => {
  if (!address) return '...'
  return address.slice(0, 5) + '...' + address.slice(-5)
}
