# 🛡️ Proctoring & Anti-Cheat Subsystem

A cornerstone of SkillForge’s credential credibility is its **browser-native, non-invasive anti-cheat engine**. Instead of relying on vulnerable trust-based evaluations, SkillForge records real-time behavioral telemetry and visual presence heuristics throughout every assessment session.

---

## 1. Proctoring Pipeline Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CANDIDATE BROWSER WINDOW                        │
│                                                                        │
│   ┌─────────────────────┐   ┌───────────────────┐   ┌──────────────┐   │
│   │ React Webcam Stream │   │ Window Blur & Tab │   │ Fullscreen   │   │
│   │ (Frame Extraction)  │   │ Visibility Change │   │ Event Trap   │   │
│   └──────────┬──────────┘   └─────────┬─────────┘   └──────┬───────┘   │
│              │                        │                    │           │
│              ▼                        ▼                    ▼           │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 ProctorWrapper Telemetry Engine                │   │
│   │   - Canvas skin-tone pixel histogram heuristic                 │   │
│   │   - Tab-switch debounce & unverified duration counter          │   │
│   │   - In-app visual warning banners & modal notifications        │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │ HTTP POST
                                    │ /api/proctor/events/
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           BACKEND PROCTOR APP                          │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                     ProctorSession Event Log                   │   │
│   │   Records: Event Type, Timestamp, Duration, Severity Weight    │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│                                   ▼                                    │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                    Risk Scoring Engine (0-100)                 │   │
│   │   Assigns: LOW (0-20), MEDIUM (21-50), HIGH (51-80), CRITICAL  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. In-Browser Detection Mechanisms

### 📷 1. Hardware Video & Canvas Presence Heuristic
- **Camera Stream:** The candidate grants camera permissions; the video stream is mounted inside an invisible canvas worker via `React Webcam`.
- **Pixel Sampling:** At periodic intervals (every 2-3 seconds), frames are drawn to an off-screen HTML5 `<canvas>`.
- **Presence Analysis:** Evaluates pixel luminance and RGB skin-tone bounding boxes. If pixel variance drops below threshold (e.g., camera obstructed, room pitch black, candidate moved out of frame), a `FACE_NOT_DETECTED` event is triggered.
- **Multiple Faces:** Significant multi-cluster skin-tone distributions flag potential unauthorized collaboration (`MULTIPLE_FACES_DETECTED`).

### 🔀 2. Tab Switching & Window Blur Tracking
- **`visibilitychange`:** Listens to document visibility states. If the candidate switches tabs to look up answers or consult an AI assistant, the timestamp is marked.
- **`window.onblur`:** Captures clicks outside the browser window (e.g., opening a terminal, second monitor, or native chat app).
- When focus returns, the platform computes total background elapsed time and logs a `TAB_BLUR` event with duration metadata.

### 🖥️ 3. Fullscreen Lock Enforcement
- Assessments mandate an active fullscreen window (`document.documentElement.requestFullscreen()`).
- Any attempt to minimize, escape fullscreen, or resize triggers an immediate `FULLSCREEN_EXIT` event and prompts an inescapable warning modal.

---

## 3. Violation Classification & Weighting

Violations are categorized and weighted according to integrity risk:

| Event Identifier | Description | Severity Weight | Impact on Risk Score |
| :--- | :--- | :--- | :--- |
| `TAB_BLUR` | User navigated away from the assessment window | **High** | +15 pts per occurrence |
| `FULLSCREEN_EXIT` | Candidate exited mandated fullscreen view | **Medium** | +10 pts per occurrence |
| `FACE_NOT_DETECTED`| Candidate absent from camera frame for > 5s | **High** | +20 pts per occurrence |
| `MULTIPLE_FACES` | Multiple individuals detected in frame | **Critical**| +35 pts per occurrence |
| `CAMERA_DISABLED` | Camera stream hardware disconnected or blocked | **Critical**| +50 pts per occurrence |
| `PASTE_DETECTED` | Bulk external text pasted into code editor | **Medium** | +10 pts per occurrence |

---

## 4. Risk Level Scoring & Recruiter Audit

The session risk score is continuously computed using the normalized aggregate:

$$\text{RiskScore} = \min\left(100, \sum_{i} (\text{EventCount}_i \times \text{Weight}_i)\right)$$

### Risk Categorization:
- 🟢 **LOW RISK (0 – 20):** Clean assessment with zero or negligible incidental events (e.g. accidental key tap).
- 🟡 **MEDIUM RISK (21 – 50):** Minor anomalies detected (e.g. single momentary tab blur under 3 seconds).
- 🟠 **HIGH RISK (51 – 80):** Repeated tab switches or extended camera absence. Recruiter review recommended.
- 🔴 **CRITICAL RISK (81 – 100):** Systemic violations. Candidate dossier displays prominent integrity warning badge.

---

## 5. Recruiter Transparency: The Proctor Audit Dossier

Recruiters never receive a raw "pass/fail" boolean. Instead, the candidate dossier displays:
1. **Overall Risk Score** with color-coded integrity badge.
2. **Timeline Log** showing exact minute-by-minute occurrence of each violation.
3. **Verified Assessment Score** contextualized alongside the proctor audit.
