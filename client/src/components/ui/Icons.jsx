import React from 'react';

const Svg = ({
    children,
    viewBox = '0 0 16 16',
    strokeWidth = 1.2,
    className = 'w-4 h-4',
    fill = 'none',
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill={fill}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...props}
    >
        {children}
    </svg>
);

// Minimal Octocat silhouette outline matching portfolio pill buttons
export const Github = ({ className = 'w-4 h-4', ...props }) => (
    <Svg viewBox="0 0 24 24" strokeWidth={1.75} className={className} {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </Svg>
);

// Minimal typographic @ glyph for Contact / Email
export const Mail = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="2.2" />
        <path d="M10.2 8v1.1a1.4 1.4 0 0 0 2.8 0V8a5 5 0 1 0-2 4" />
    </Svg>
);

// Crisp diagonal ↗ arrow
export const ArrowUpRight = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M4.5 11.5L11.5 4.5" />
        <path d="M5.5 4.5H11.5V10.5" />
    </Svg>
);

export const ExternalLink = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M6.5 3H3v10h10V9.5" />
        <path d="M8.5 7.5L13 3" />
        <path d="M9.5 3H13v3.5" />
    </Svg>
);

export const ArrowLeft = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M12.5 8H3.5" />
        <path d="M7 4.5L3.5 8L7 11.5" />
    </Svg>
);

export const ChevronLeft = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M9.5 3.5L5 8l4.5 4.5" />
    </Svg>
);

export const ChevronRight = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M6.5 3.5L11 8l-4.5 4.5" />
    </Svg>
);

export const Menu = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2.5 4.5h11" />
        <path d="M2.5 8h11" />
        <path d="M2.5 11.5h11" />
    </Svg>
);

export const PanelLeftClose = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="2" y="2.5" width="12" height="11" rx="1" />
        <path d="M6 2.5v11" />
        <path d="M10.5 6.5L8.5 8l2 1.5" />
    </Svg>
);

export const PanelLeftOpen = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="2" y="2.5" width="12" height="11" rx="1" />
        <path d="M6 2.5v11" />
        <path d="M9 6.5L11 8l-2 1.5" />
    </Svg>
);

export const LayoutDashboard = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="2.5" y="2.5" width="4.5" height="5.5" rx="0.6" />
        <rect x="9" y="2.5" width="4.5" height="4" rx="0.6" />
        <rect x="2.5" y="10" width="4.5" height="3.5" rx="0.6" />
        <rect x="9" y="8.5" width="4.5" height="5" rx="0.6" />
    </Svg>
);

export const LayoutGrid = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="0.6" />
        <rect x="9" y="2.5" width="4.5" height="4.5" rx="0.6" />
        <rect x="2.5" y="9" width="4.5" height="4.5" rx="0.6" />
        <rect x="9" y="9" width="4.5" height="4.5" rx="0.6" />
    </Svg>
);

export const Briefcase = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="2" y="5" width="12" height="8.5" rx="1" />
        <path d="M5.5 5V3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5" />
        <path d="M2 8.5h12" />
    </Svg>
);

export const BookOpen = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 4v9.5" />
        <path d="M2.5 3.5H6a2 2 0 0 1 2 2v8a1.5 1.5 0 0 0-1.5-1.5h-4z" />
        <path d="M13.5 3.5H10a2 2 0 0 0-2 2v8a1.5 1.5 0 0 1 1.5-1.5h4z" />
    </Svg>
);

export const ShieldCheck = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2L3 4v4c0 3.2 2.1 5.3 5 6.2 2.9-.9 5-3 5-6.2V4z" />
        <path d="M5.8 8.2L7.3 9.7 10.4 6.4" />
    </Svg>
);

export const ShieldAlert = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2L3 4v4c0 3.2 2.1 5.3 5 6.2 2.9-.9 5-3 5-6.2V4z" />
        <path d="M8 5.5v3" />
        <circle cx="8" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
    </Svg>
);

// Clean minimalist calibration / neural pulse reticle instead of cluttered brain-circuit
export const BrainCircuit = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2.5 8h2l1.5-3.5L8 11.5l1.5-3.5h4" />
        <circle cx="13.5" cy="8" r="1" />
    </Svg>
);

// Clean corner-bracket audit reticle instead of noisy scanner glyph
export const ScanSearch = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2.5 5.5V3.5a1 1 0 0 1 1-1h2" />
        <path d="M10.5 2.5h2a1 1 0 0 1 1 1v2" />
        <path d="M13.5 10.5v2a1 1 0 0 1-1 1h-2" />
        <path d="M5.5 13.5h-2a1 1 0 0 1-1-1v-2" />
        <circle cx="7.5" cy="7.5" r="2.2" />
        <path d="M9.1 9.1L11 11" />
    </Svg>
);

export const FileText = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M4 2h5.5L12.5 5v9H4z" />
        <path d="M9.5 2v3h3" />
        <path d="M6 8h4" />
        <path d="M6 10.5h3" />
    </Svg>
);

export const FileCheck2 = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M4 2h5.5L12.5 5v9H4z" />
        <path d="M9.5 2v3h3" />
        <path d="M6.2 9.5L7.6 10.9 10.2 8" />
    </Svg>
);

export const Code2 = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M5.5 5L2.5 8l3 3" />
        <path d="M10.5 5l3 3-3 3" />
        <path d="M9 3.5l-2 9" />
    </Svg>
);

export const Terminal = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="2" y="3" width="12" height="10" rx="1" />
        <path d="M4.5 6.5L6.5 8 4.5 9.5" />
        <path d="M8 9.5h3" />
    </Svg>
);

// Single crisp geometric 4-point sparkle
export const Sparkles = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.2L9.3 6.7 13.8 8 9.3 9.3 8 13.8 6.7 9.3 2.2 8 6.7 6.7z" />
    </Svg>
);

export const Cpu = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="4.5" y="4.5" width="7" height="7" rx="0.6" />
        <rect x="6.8" y="6.8" width="2.4" height="2.4" />
        <path d="M6.5 2v2.5M9.5 2v2.5M6.5 11.5V14M9.5 11.5V14M2 6.5h2.5M2 9.5h2.5M11.5 6.5H14M11.5 9.5H14" />
    </Svg>
);

export const SlidersHorizontal = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2.5 5h2.2M7.3 5h6.2" />
        <circle cx="6" cy="5" r="1.3" />
        <path d="M2.5 11h6.7M11.8 11h1.7" />
        <circle cx="10.5" cy="11" r="1.3" />
    </Svg>
);

export const Search = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="7" cy="7" r="4.2" />
        <path d="M10.1 10.1L13.5 13.5" />
    </Svg>
);

export const Check = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3.5 8.5L6.5 11.5 12.5 4.5" />
    </Svg>
);

export const CheckCircle2 = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="5.5" />
        <path d="M5.6 8.2L7.3 9.9 10.6 6.2" />
    </Svg>
);

export const Circle = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="5.5" />
    </Svg>
);

export const Plus = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 3.5v9" />
        <path d="M3.5 8h9" />
    </Svg>
);

export const X = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M4 4l8 8" />
        <path d="M12 4l-8 8" />
    </Svg>
);

export const Clock = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="5.5" />
        <path d="M8 5v3.2l2.2 1.3" />
    </Svg>
);

export const Lock = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="3.5" y="7" width="9" height="6.5" rx="0.8" />
        <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
    </Svg>
);

export const Award = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="6" r="3.5" />
        <path d="M5.8 9L5 14l3-1.6L11 14l-.8-5" />
    </Svg>
);

export const Star = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.2l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" />
    </Svg>
);

export const DollarSign = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.5v11" />
        <path d="M10.5 4.8H6.8a1.7 1.7 0 0 0 0 3.2h2.4a1.7 1.7 0 0 1 0 3.2H5.5" />
    </Svg>
);

export const Users = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="6" cy="5.5" r="2.2" />
        <path d="M2 13a4 4 0 0 1 8 0" />
        <circle cx="11" cy="5.8" r="1.7" />
        <path d="M11 9.5a3.2 3.2 0 0 1 3 3.5" />
    </Svg>
);

export const User = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="5.3" r="2.4" />
        <path d="M3 13.5a5 5 0 0 1 10 0" />
    </Svg>
);

export const UserCheck = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="6.5" cy="5.3" r="2.2" />
        <path d="M2.2 13.2a4.3 4.3 0 0 1 8.6 0" />
        <path d="M10.8 6.5l1.2 1.2 2.2-2.4" />
    </Svg>
);

export const LogOut = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M6.5 2.5H3.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3" />
        <path d="M10 10.5L13 8l-3-2.5" />
        <path d="M6 8h7" />
    </Svg>
);

export const RefreshCw = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M13 6.5A5.2 5.2 0 0 0 4 4.3" />
        <path d="M3.5 2.5v2.5H6" />
        <path d="M3 9.5a5.2 5.2 0 0 0 9 2.2" />
        <path d="M12.5 13.5V11H10" />
    </Svg>
);

export const RotateCcw = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3.5 6.5A4.8 4.8 0 1 1 4.5 11" />
        <path d="M3 3.5v3h3" />
    </Svg>
);

export const Loader2 = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.5a5.5 5.5 0 1 1-4.8 2.8" />
    </Svg>
);

export const Upload = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 10V3" />
        <path d="M5.2 5.5L8 2.8l2.8 2.7" />
        <path d="M2.5 10.5v2.5h11v-2.5" />
    </Svg>
);

export const UploadCloud = ({ className = 'w-5 h-5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M5 11.5H4a2.5 2.5 0 0 1-.4-4.9A3.8 3.8 0 0 1 11 5.5a2.6 2.6 0 0 1 1 5H11" />
        <path d="M8 13.5v-5" />
        <path d="M6.2 10.3L8 8.5l1.8 1.8" />
    </Svg>
);

export const Download = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.5v7" />
        <path d="M5.2 7L8 9.8 10.8 7" />
        <path d="M2.5 11v2.5h11V11" />
    </Svg>
);

export const AlertTriangle = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.5L2 13h12z" />
        <path d="M8 6.5v3" />
        <circle cx="8" cy="11.2" r="0.5" fill="currentColor" stroke="none" />
    </Svg>
);

export const AlertCircle = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="5.5" />
        <path d="M8 5.2v3.3" />
        <circle cx="8" cy="10.7" r="0.5" fill="currentColor" stroke="none" />
    </Svg>
);

export const Play = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M4.5 3.2L12.5 8l-8 4.8z" />
    </Svg>
);

export const Camera = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2 5.5h2.3l1.2-1.8h5l1.2 1.8H14v7.5H2z" />
        <circle cx="8" cy="9" r="2.2" />
    </Svg>
);

export const Building2 = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3 13.5V3h6.5v10.5" />
        <path d="M9.5 6.5H13v7" />
        <path d="M2 13.5h12" />
        <path d="M5 5.5h2M5 8h2M5 10.5h2" />
    </Svg>
);

export const Globe = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="5.5" />
        <path d="M2.5 8h11" />
        <path d="M8 2.5a8 8 0 0 1 0 11 8 8 0 0 1 0-11z" />
    </Svg>
);

export const MapPin = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 13.5s4-3.7 4-6.8a4 4 0 1 0-8 0c0 3.1 4 6.8 4 6.8z" />
        <circle cx="8" cy="6.7" r="1.3" />
    </Svg>
);

export const Layers = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2.5L2.5 5.5 8 8.5l5.5-3z" />
        <path d="M2.5 8.2L8 11.2l5.5-3" />
        <path d="M2.5 10.8L8 13.8l5.5-3" />
    </Svg>
);

export const Box = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8 2l5.5 3v6L8 14l-5.5-3V5z" />
        <path d="M2.5 5L8 8l5.5-3" />
        <path d="M8 8v6" />
    </Svg>
);

export const Database = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <ellipse cx="8" cy="4.2" rx="4.8" ry="1.8" />
        <path d="M3.2 4.2v7.6c0 1 2.1 1.8 4.8 1.8s4.8-.8 4.8-1.8V4.2" />
        <path d="M3.2 8c0 1 2.1 1.8 4.8 1.8s4.8-.8 4.8-1.8" />
    </Svg>
);

export const Zap = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M8.8 2L3.5 9h4.2l-.7 5L12.5 7H8.3z" />
    </Svg>
);

export const GraduationCap = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2 6.5L8 3.5l6 3-6 3z" />
        <path d="M4.5 8v3.2c0 1 1.6 1.8 3.5 1.8s3.5-.8 3.5-1.8V8" />
        <path d="M13.5 7v4" />
    </Svg>
);

export const FolderOpen = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2 4.5a1 1 0 0 1 1-1h3.2l1.3 1.5H13a1 1 0 0 1 1 1v1" />
        <path d="M2 7h11.5l-1 6H2.8z" />
    </Svg>
);

export const Tag = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2.5 2.5h4.8l6.2 6.2-4.8 4.8L2.5 7.3z" />
        <circle cx="5.5" cy="5.5" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
);

export const Copy = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="5.5" y="5.5" width="8" height="8" rx="0.8" />
        <path d="M10.5 5.5V3.3a.8.8 0 0 0-.8-.8H3.3a.8.8 0 0 0-.8.8v6.4a.8.8 0 0 0 .8.8h2.2" />
    </Svg>
);

export const Edit3 = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M9.8 3.2l3 3L5.5 13.5H2.5v-3z" />
        <path d="M8.5 13.5h5" />
    </Svg>
);

export const Trash2 = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3 4.5h10" />
        <path d="M5.5 4.5V3h5v1.5" />
        <path d="M4.2 4.5l.7 9h6.2l.7-9" />
    </Svg>
);

export const Eye = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M1.8 8s2.3-4 6.2-4 6.2 4 6.2 4-2.3 4-6.2 4-6.2-4-6.2-4z" />
        <circle cx="8" cy="8" r="1.6" />
    </Svg>
);

export const Send = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M13.5 2.5L2.5 7l4.2 1.8L8.5 13z" />
        <path d="M6.7 8.8l6.8-6.3" />
    </Svg>
);

export const Bell = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M4 11V7a4 4 0 0 1 8 0v4l1.2 1.2H2.8z" />
        <path d="M6.7 13.5a1.5 1.5 0 0 0 2.6 0" />
    </Svg>
);

export const Activity = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2 8h2.5l1.8-4.5L9.5 12.5l1.7-4.5H14" />
    </Svg>
);

export const TrendingUp = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M2.2 11.2L6.5 7l2.5 2.5L13.5 4.8" />
        <path d="M10.2 4.8h3.3v3.3" />
    </Svg>
);

export const Gauge = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3 11.5a5.8 5.8 0 1 1 10 0" />
        <path d="M8 9l2.8-2.8" />
    </Svg>
);

export const Compass = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="8" cy="8" r="5.5" />
        <path d="M10.2 5.8L8.8 9.2l-3.4 1.4 1.4-3.4z" />
    </Svg>
);

export const Bug = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <rect x="5.2" y="5" width="5.6" height="7" rx="2.6" />
        <path d="M6.5 4.8V3.2M9.5 4.8V3.2M2.5 7.5h2.7M10.8 7.5h2.7M2.5 10.5h2.7M10.8 10.5h2.7" />
    </Svg>
);

export const ListChecks = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3 5l1.1 1L6 4" />
        <path d="M8 5h5.5" />
        <path d="M3 10.5l1.1 1 1.9-2" />
        <path d="M8 10.5h5.5" />
    </Svg>
);

export const ListTree = ({ className = 'w-4 h-4', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3 3.5v8.5" />
        <path d="M3 5.5h3.5" />
        <path d="M3 10.5h3.5" />
        <path d="M8.5 5.5h5" />
        <path d="M8.5 10.5h5" />
    </Svg>
);

export const Maximize2 = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M9.5 2.5h4v4" />
        <path d="M13.5 2.5L9 7" />
        <path d="M6.5 13.5h-4v-4" />
        <path d="M2.5 13.5L7 9" />
    </Svg>
);

export const ChevronDown = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3.5 6.5L8 11l4.5-4.5" />
    </Svg>
);

export const ChevronUp = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M3.5 10.5L8 6l4.5 4.5" />
    </Svg>
);

export const GitFork = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <circle cx="5" cy="4" r="1.4" />
        <circle cx="11" cy="4" r="1.4" />
        <circle cx="8" cy="12" r="1.4" />
        <path d="M5 5.4v1.4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5.4" />
        <path d="M8 8.8v1.8" />
    </Svg>
);

export const Link2 = ({ className = 'w-3.5 h-3.5', ...props }) => (
    <Svg className={className} {...props}>
        <path d="M6.5 10.5H5a2.5 2.5 0 0 1 0-5h1.5" />
        <path d="M9.5 5.5H11a2.5 2.5 0 0 1 0 5H9.5" />
        <path d="M5.5 8h5" />
    </Svg>
);
