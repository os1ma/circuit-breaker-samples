import CircuitBreaker from 'opossum'

function wait(second: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, second * 1000))
}

async function slowEcho(message: string, waitSecond: number = 0) {
  await wait(waitSecond)
  return message
}

async function main() {
  const options = {
    // If our function takes longer than timeout seconds, trigger a failure
    timeout: 3000,
    // When 50% of requests fail, trip the circuit
    errorThresholdPercentage: 50,
    // After 3 seconds, try again.
    resetTimeout: 3000
  }

  const breaker = new CircuitBreaker(slowEcho, options)

  breaker.on('timeout', () => {
    console.log('timeout')
  })
  breaker.on('open', () => {
    console.log('open')
  })
  breaker.on('halfOpen', () => {
    console.log('halfOpen')
  })
  breaker.on('close', () => {
    console.log('close')
  })

  // [0, 1, 2, ...]
  const waitSeconds = [...Array(10).keys()]

  for (let i = 0; i < waitSeconds.length; i++) {
    const waitSecond = waitSeconds[i]
    console.log(
      `[${new Date().toLocaleTimeString()}] waitSecond = ${waitSecond}`
    )

    try {
      const echoMessage = await breaker.fire('Hello!', waitSecond)
      console.log(echoMessage)
    } catch (e) {
      console.log('error catched!!!')
    }
  }

  console.log(breaker.stats)
}

main()
