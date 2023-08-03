import ErrorPage from "@/common/components/GlobalErrorPage"
import "@/styles/globals.css"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { ErrorBoundary } from "react-error-boundary"
import "../styles/globals.css"

const queryClient = new QueryClient()

const theme = extendTheme({
  colors: {
    dsqgreen: {
      100: "#00EBAB",
    },
    dsqblack: {
      100: "#0E1016",
      200: "#0B0C0B",
    },
    dsqgray: {
      50: "#2F3544",
      100: "#888B92",
      200: "#C1C1C3",
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
