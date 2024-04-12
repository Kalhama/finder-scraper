import { delay } from './delay'

export const fetchRetry = async (url: string, config?: RequestInit) => {
  const MAX_RETRIES = 6
  for (let i = 1; i <= MAX_RETRIES; i++) {
    await delay(5000 * Math.pow(2, i - 1))
    try {
      return await fetch(url, config)
    } catch (e) {
      if (i === MAX_RETRIES) {
        console.error(
          'Tried request 6 times with progressive delay in between and failed them all'
        )
        throw e
      } else {
        console.log('Request failed, retrying', e.message)
      }
    }
  }
}
