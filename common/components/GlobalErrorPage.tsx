import * as Sentry from "@sentry/nextjs"
import { NextPageContext } from "next"
import NextErrorComponent from "next/error"
import { Layout } from "./Layout/Layout"

/**
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

const CustomErrorComponent = () => (
  <Layout headless={true} hideNavigation={true}>
    <div className="relative">
      <div className="mt-[260px] flex flex-col items-center gap-y-5 max-w-[700px] mx-auto relative font-roboto-mono">
        <div className="text-2xl font-bold sm:text-4xl font-roboto">
          Oops, something went wrong.
        </div>

        <div className="text-center font-roboto font-extralight text-dsqgray-200 md:text-white">
          We already logged the error for our team of elite cyberninjas to
          diagnose and patch soon. Feel free to contact us in Discord if you
          would like to let us know yourself.
        </div>
      </div>
    </div>
  </Layout>
)

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
