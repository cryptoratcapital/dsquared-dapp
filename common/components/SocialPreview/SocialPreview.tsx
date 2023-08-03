import { FC } from "react"

export const SocialPreview: FC<{ origin?: string }> = ({ origin }) => {
  return (
    <>
      {/* <!-- Primary Meta Tags --> */}
      <title>D-Squared — Options-Based DeFi Vaults</title>
      <meta name="title" content="D-Squared — Options-Based DeFi Vaults" />
      <meta
        name="description"
        content="Delivering consistent, risk-adjusted returns across market cycles through highly-secure vaults"
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://app.d2.finance" />
      <meta
        property="og:title"
        content="D-Squared — Options-Based DeFi Vaults"
      />
      <meta
        property="og:description"
        content="Delivering consistent, risk-adjusted returns across market cycles through highly-secure vaults"
      />
      <meta property="og:image" content={`${origin}/logos/d2-og-logo.jpg`} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://app.d2.finance" />
      <meta
        property="twitter:title"
        content="D-Squared — Options-Based DeFi Vaults"
      />
      <meta
        property="twitter:description"
        content="Delivering consistent, risk-adjusted returns across market cycles through highly-secure vaults"
      />
      <meta
        property="twitter:image"
        content={`${origin}/logos/d2-og-logo.jpg`}
      />
    </>
  )
}
