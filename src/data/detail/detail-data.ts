export const rate_mode_data = [
  {
    name: '0%',
    apr: 0,
  },
  {
    name: '25%',
    apr: 0,
  },
  {
    name: '50%',
    apr: 0,
  },
  {
    name: '75%',
    apr: 0,
  },
  {
    name: '100%',
    apr: 0.02,
  },
]

export const generateFakeAPRData = (timeframe: string) => {
  let weeks
  if (timeframe === '1m') {
    weeks = 4
  } else if (timeframe === '6m') {
    weeks = 26
  } else if (timeframe === '1y') {
    weeks = 52
  } else {
    throw new Error('Invalid timeframe specified. Use "1m", "6m", or "1y".')
  }

  const currentDate = new Date()
  const data = []

  for (let i = 0; i < weeks; i++) {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + i * 7) // Move to the next week

    const apr = parseFloat(Math.random().toFixed(2)) // Random APR between 0 and 0.2

    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), // Use a readable date format
      apr: apr,
    })
  }

  return data
}
