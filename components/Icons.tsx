export const LoadingIcon = ({ className }: { className: string }) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={className}>
      <rect fill="white" />
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
