export function ActivitiesMockup() {
  return (
    <svg
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://w3.org"
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <style>{`
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeInArea {
            to {
              opacity: 1;
            }
          }
          .animated-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .animated-area {
            opacity: 0;
            animation: fadeInArea 1s ease-in-out 1.2s forwards;
          }
        `}</style>

        <filter
          id="card-shadow"
          x="-20"
          y="-10"
          width="540"
          height="420"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="16"
            floodColor="#000000"
            floodOpacity="0.25"
          />
        </filter>

        <linearGradient id="purple-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="yellow-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      <g filter="url(#card-shadow)" opacity="0.85">
        <rect x="30" y="160" width="380" height="190" rx="12" fill="#FFFFFF" />

        <text
          x="50"
          y="190"
          fill="#1F2937"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
        >
          Recent Activity Logs
        </text>

        <circle cx="56" cy="225" r="4" fill="#10B981" />
        <text
          x="70"
          y="224"
          fill="#1F2937"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="11"
          fontWeight="500"
        >
          Password updated
        </text>
        <text
          x="70"
          y="238"
          fill="#9CA3AF"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
        >
          Firefox on Ubuntu • Just now
        </text>
        <rect x="320" y="215" width="70" height="20" rx="4" fill="#F3F4F6" />
        <text
          x="355"
          y="229"
          fill="#6B7280"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9"
          textAnchor="middle"
        >
          Success
        </text>

        <line
          x1="50"
          y1="255"
          x2="390"
          y2="255"
          stroke="#F3F4F6"
          strokeWidth="1"
        />

        <circle cx="56" cy="280" r="4" fill="#EF4444" />
        <text
          x="70"
          y="279"
          fill="#1F2937"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="11"
          fontWeight="500"
        >
          Session token revoked
        </text>
        <text
          x="70"
          y="293"
          fill="#9CA3AF"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
        >
          Chrome on macOS • 5m ago
        </text>
        <rect x="320" y="270" width="70" height="20" rx="4" fill="#FEF2F2" />
        <text
          x="355"
          y="284"
          fill="#EF4444"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9"
          textAnchor="middle"
        >
          Revoked
        </text>
      </g>

      <g filter="url(#card-shadow)">
        <rect x="60" y="20" width="410" height="220" rx="14" fill="#FFFFFF" />

        <text
          x="80"
          y="50"
          fill="#EA580C"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          Activities
        </text>

        <g transform="translate(210, 40)">
          <circle cx="0" cy="0" r="3.5" fill="#8B5CF6" />
          <text
            x="8"
            y="3.5"
            fill="#4B5563"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="10"
            fontWeight="500"
          >
            Created
          </text>

          <circle cx="65" cy="0" r="3.5" fill="#F59E0B" />
          <text
            x="73"
            y="3.5"
            fill="#4B5563"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="10"
            fontWeight="500"
          >
            Expired
          </text>

          <circle cx="125" cy="0" r="3.5" fill="#EF4444" />
          <text
            x="133"
            y="3.5"
            fill="#4B5563"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="10"
            fontWeight="500"
          >
            Reuse detected
          </text>
        </g>

        <g stroke="#F3F4F6" strokeWidth="1">
          <line x1="80" y1="90" x2="445" y2="90" />
          <line x1="80" y1="130" x2="445" y2="130" />
          <line x1="80" y1="170" x2="445" y2="170" />
          <line x1="80" y1="210" x2="445" y2="210" stroke="#E5E7EB" />
        </g>

        <path
          className="animated-line"
          d="M 80 180 C 110 110, 120 110, 140 160 C 160 210, 190 210, 210 210 C 250 210, 280 160, 310 110 C 330 75, 360 80, 380 150 C 390 185, 420 210, 445 190"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className="animated-area"
          d="M 80 180 C 110 110, 120 110, 140 160 C 160 210, 190 210, 210 210 C 250 210, 280 160, 310 110 C 330 75, 360 80, 380 150 C 390 185, 420 210, 445 190 L 445 210 L 80 210 Z"
          fill="url(#purple-area)"
        />

        <path
          className="animated-line"
          d="M 80 210 C 110 210, 130 180, 150 170 C 170 160, 190 200, 220 210 C 240 210, 260 140, 280 140 C 300 140, 320 210, 350 210 C 380 210, 390 160, 415 160 C 430 160, 435 190, 445 210"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className="animated-area"
          d="M 80 210 C 110 210, 130 180, 150 170 C 170 160, 190 200, 220 210 C 240 210, 260 140, 280 140 C 300 140, 320 210, 350 210 C 380 210, 390 160, 415 160 C 430 160, 435 190, 445 210 Z"
          fill="url(#yellow-area)"
        />

        <path
          className="animated-line"
          d="M 80 195 C 120 195, 150 210, 180 205 C 220 200, 240 180, 270 180 C 300 180, 320 215, 360 200 C 400 185, 420 170, 445 175"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        <g className="animated-area" transform="translate(121, 132)">
          <rect x="-35" y="-45" width="76" height="38" rx="6" fill="#1E293B" />
          <path
            d="M 0 0 L 5 5 L 10 0 Z"
            fill="#1E293B"
            transform="translate(-2, -8)"
          />
          <text
            x="3"
            y="-33"
            fill="#9CA3AF"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="8"
            textAnchor="middle"
          >
            Sep 14, 21:00
          </text>
          <text
            x="-25"
            y="-16"
            fill="#FFFFFF"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="9"
            fontWeight="600"
          >
            Created:
          </text>
          <text
            x="33"
            y="-16"
            fill="#8B5CF6"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="9"
            fontWeight="700"
            textAnchor="end"
          >
            2
          </text>

          <circle
            cx="3"
            cy="0"
            r="4"
            fill="#8B5CF6"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </g>
      </g>
    </svg>
  );
}
