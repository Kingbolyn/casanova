/* Marketing route group — inherits root layout (Navbar + Footer already there).
   This layout exists as a clean seam for future marketing-specific providers
   (analytics, A/B testing, campaign context) without touching the root shell. */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
