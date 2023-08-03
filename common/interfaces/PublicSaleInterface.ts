export const saleStartDefault = "Public sale starting soon"
export const saleStartingText = "Public sale starts in "
export const saleEndingText = "Public sale ends in "
export const saleClaim1text = "Claim stage 1 tokens in "
export const saleClaim2Text = "Claim stage 2 tokens in "
export const saleClaim3Text = "Claim stage 3 tokens in "
export const saleEndedText = "Public sale has ended"

export type CountDownText =
  | typeof saleStartDefault
  | typeof saleStartingText
  | typeof saleEndingText
  | typeof saleClaim1text
  | typeof saleClaim2Text
  | typeof saleClaim3Text
  | typeof saleEndedText

export const stage4WLStartingText = "Stage 4 whitelist sale starts in"
export const stage4StartingText = "Stage 4 public sale starts in "
export const stage4EndingText = "Public sale ends in "
export const stage4ClaimText = "Claim stage 4 tokens in"
export const stage4Ended = "Stage 4 sale has ended"

export type Stage4CountDownText =
  | typeof stage4WLStartingText
  | typeof stage4StartingText
  | typeof stage4EndingText
  | typeof stage4ClaimText
  | typeof stage4Ended

export interface PublicsaleInterface {
  startTime: number
  endTime: number
  tier2ClaimTime: number
  tier3ClaimTime: number

  totalContributed: string
  contributionRemaining: string

  stage1Max: string
  stage1Filled: string
  stage2Max: string
  stage2Filled: string
  stage3Started: boolean
  stage3Max: string
  stage3Filled: string

  userDepositAmt: string
  userClaimable: boolean
  userClaimableAmt: string
  userLockedTokens: string

  currentTime: number
}

export interface Stage4SaleInterface {
  whitelistStartTime: number
  startTime: number
  endTime: number
  claimTime: number
  currentTime: number

  wlMaxContribution: string
  maxContribution: string
  totalContribution: string
  contributionRemaining: string

  userDepositAmt: string
  userWLRemaining: string
  userClaimable: boolean
  userClaimableAmt: string
  userLockedTokens: string
}
