/**
 * The kFormatter function formats a number by abbreviating it with a "k" suffix if it is greater than
 * 999.
 * @param {number} num - The `num` parameter in the `kFormatter` function is the number that you want
 * to format. The function checks if the absolute value of the number is greater than 999, and if so,
 * it converts it to a shortened format with a "k" suffix representing thousands. If the number
 * @returns The kFormatter function returns a formatted number with a "k" suffix if the absolute value
 * of the input number is greater than 999. If the absolute value is less than or equal to 999, it
 * returns the input number as is.
 */
export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + 'k'
    : Math.sign(num) * Math.abs(num)
}

/**
 * The `addressFormatter` function shortens a given address by keeping the first and last 5 characters
 * and adding ellipses in between.
 * @param {string | undefined} address - The `addressFormatter` function takes a string input `address`
 * and returns a formatted version of the address. If the `address` is undefined or empty, it returns
 * '...'. Otherwise, it takes the first 5 characters of the address, adds '...', and then appends the
 * last
 * @returns The `addressFormatter` function returns the first 5 characters of the address, followed by
 * '...', and then the last 5 characters of the address.
 */
export const addressFormatter = (address: string | undefined) => {
  if (!address) return '...'
  return address.slice(0, 5) + '...' + address.slice(-5)
}
