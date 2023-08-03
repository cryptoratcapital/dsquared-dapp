import type { NextPage } from "next"
import { useEffect } from "react"

const Home: NextPage = () => {
  useEffect(() => {
    throw new Error("Sentry Frontend Error")
  })

  return <></>
}

export default Home
