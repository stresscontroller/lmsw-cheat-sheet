const DashedLine = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 1562 596"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M536 0H1227C1262.9 0 1292 29.1015 1292 65V513C1292 548.899 1321.1 578 1357 578H1440H1562"
      stroke="url(#paint0_linear)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="10 10"
    />
    <path
      d="M-212 376H452C487.899 376 517 405.101 517 441V513C517 548.899 546.101 578 582 578H692H1328"
      stroke="url(#paint1_linear)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="10 10"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="654.5" y1="0" x2="1637" y2="389" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FE7E4F" stopOpacity="0" />
        <stop offset="1" stopColor="#FE7E4F" stopOpacity="0.56" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="131" y1="123" x2="1071.5" y2="634" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FE7E4F" stopOpacity="0" />
        <stop offset="1" stopColor="#FE7E4F" stopOpacity="0.56" />
      </linearGradient>
    </defs>
  </svg>
);

const PartialDashedLine = ({ className }: { className?: string }) => (
  <svg
    width="289"
    height="221"
    viewBox="0 0 289 221"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.0625 1H223.998C237.805 1 248.998 12.1929 248.998 26V195C248.998 208.807 260.191 220 273.998 220"
      stroke="url(#paint0_linear_partial)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="10 10"
    />
    <defs>
      <linearGradient
        id="paint0_linear_partial"
        x1="-154.508"
        y1="-21.2493"
        x2="323.706"
        y2="144.415"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FE7E4F" stopOpacity="0" />
        <stop offset="1" stopColor="#FE7E4F" stopOpacity="0.56" />
      </linearGradient>
    </defs>
  </svg>
);

export { DashedLine, PartialDashedLine };
