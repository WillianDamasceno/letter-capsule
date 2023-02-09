type IconProps = {
  fill?: string
  className?: string
}

export const LoadingIcon = ({ className, fill = "currentColor" }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={className}>
      <rect fill={fill} />
      <path
        d="M12 2V7.71429M12 16.2857V22"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M21 6.99445L16.0458 9.85476M8.61451 14.1452L3.6603 17.0056"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M21 17.0056L16.0458 14.1452M8.61451 9.85476L3.6603 6.99445"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const BlockquoteIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M6 15h15" />
      <path d="M21 19h-15" />
      <path d="M15 11h6" />
      <path d="M21 7h-6" />
      <path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
      <path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
    </svg>
  )
}
