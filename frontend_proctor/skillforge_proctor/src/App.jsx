import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Shield, AlertTriangle, CheckCircle2, Eye, EyeOff,
  Activity, User, Lock, LogOut, Video, VideoOff, Wifi,
  WifiOff, Clock, AlertCircle, Sparkles, Play, Square
} from 'lucide-react';

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api',
  ENDPOINTS: {
    LOGIN: '/auth/login/',
    LIST: '/list/',
    START: '/start/',
    EVENT: '/event/',
  }
};

const DEFAULT_CREDENTIALS = {
  username: 'testuser',
  password: 'test@123'
};

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

const EventTypes = {
  TAB_SWITCH: 'TAB_SWITCH',
  NO_FACE: 'NO_FACE',
  MULTIPLE_FACES: 'MULTIPLE_FACES',
  LOOKING_AWAY: 'LOOKING_AWAY',
  AUDIO_DETECTED: 'AUDIO_DETECTED'
};

const RiskLevels = {
  LOW: { color: '#10B981', label: 'Low Risk' },
  MEDIUM: { color: '#F59E0B', label: 'Medium Risk' },
  HIGH: { color: '#EF4444', label: 'High Risk' }
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useProctorAPI = () => {
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const getHeaders = () => ({
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  });

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      const accessToken = data.access || data.tokens?.access;
      setToken(accessToken);
      return { success: true, token: accessToken };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getExamList = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIST}`, {
        headers: getHeaders()
      });

      if (!response.ok) throw new Error('Failed to fetch exams');

      const data = await response.json();
      return { success: true, exams: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const startExam = async (examId) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.START}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ exam_id: examId })
      });

      if (!response.ok) throw new Error('Failed to start exam');

      const data = await response.json();
      setSessionId(data.session_id);
      return { success: true, sessionId: data.session_id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const sendEvent = async (eventType, confidence = 1.0) => {
    if (!sessionId) {
      return { success: false, error: 'No active session' };
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          session_id: sessionId,
          event_type: eventType,
          confidence: confidence
        })
      });

      if (!response.ok) throw new Error('Failed to send event');

      const data = await response.json();
      return { success: true, risk: data.risk };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    token,
    sessionId,
    login,
    getExamList,
    startExam,
    sendEvent
  };
};

// ============================================================================
// VIDEO MONITOR COMPONENT
// ============================================================================

const VideoMonitor = ({ isActive, onCameraReady, onCameraError }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraStatus, setCameraStatus] = useState('initializing');

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      setCameraStatus('requesting');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      setCameraStatus('active');
      onCameraReady?.();
    } catch (error) {
      setCameraStatus('error');
      onCameraError?.(error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStatus('stopped');
  };

  return (
    <div className="video-monitor-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="video-feed"
        />
        
        {/* Status overlay */}
        <div className="video-status-overlay">
          <div className={`status-indicator status-${cameraStatus}`}>
            {cameraStatus === 'active' ? (
              <>
                <Video size={16} />
                <span>Camera Active</span>
              </>
            ) : cameraStatus === 'requesting' ? (
              <>
                <Activity size={16} className="spin" />
                <span>Requesting Camera...</span>
              </>
            ) : cameraStatus === 'error' ? (
              <>
                <VideoOff size={16} />
                <span>Camera Error</span>
              </>
            ) : (
              <>
                <VideoOff size={16} />
                <span>Camera Inactive</span>
              </>
            )}
          </div>
        </div>

        {/* Recording indicator */}
        {cameraStatus === 'active' && (
          <motion.div 
            className="recording-indicator"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="recording-dot" />
            <span>Recording</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// EVENT LOG COMPONENT
// ============================================================================

const EventLog = ({ events, riskLevel }) => {
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [events]);

  const getRiskColor = (risk) => {
    if (risk >= 0.7) return RiskLevels.HIGH.color;
    if (risk >= 0.4) return RiskLevels.MEDIUM.color;
    return RiskLevels.LOW.color;
  };

  return (
    <div className="event-log-container">
      <div className="log-header">
        <div className="log-title">
          <Activity className="icon-bold" size={20} />
          <span>Activity Monitor</span>
        </div>
        {riskLevel !== null && (
          <div 
            className="risk-badge"
            style={{ 
              backgroundColor: getRiskColor(riskLevel),
              color: 'white'
            }}
          >
            Risk: {(riskLevel * 100).toFixed(0)}%
          </div>
        )}
      </div>

      <div className="log-content" ref={logRef}>
        {events.length === 0 ? (
          <div className="log-empty">
            <Eye size={32} />
            <p>No events recorded yet</p>
          </div>
        ) : (
          events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`log-entry log-entry-${event.type}`}
            >
              <div className="log-timestamp">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              <div className="log-message">
                {event.icon}
                <span>{event.message}</span>
              </div>
              {event.risk !== undefined && (
                <div className="log-risk" style={{ color: getRiskColor(event.risk) }}>
                  {(event.risk * 100).toFixed(0)}%
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// ============================================================================
// LOGIN COMPONENT
// ============================================================================

const LoginScreen = ({ onLogin, isLoading }) => {
  const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials.username, credentials.password);
  };

  return (
    <div className="login-screen">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="login-header">
          <div className="login-icon">
            <Shield className="icon-bold" size={32} />
          </div>
          <h1 className="login-title">SkillForge Proctor</h1>
          <p className="login-subtitle">Secure exam monitoring system</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Activity className="spin" size={20} />
                Logging in...
              </>
            ) : (
              <>
                <Shield className="icon-bold" size={20} />
                Login & Start Proctoring
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <AlertCircle size={16} />
          <span>Camera and microphone access required</span>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// EXAM SELECTOR COMPONENT
// ============================================================================

const ExamSelector = ({ exams, onSelect, isLoading }) => {
  return (
    <div className="exam-selector-screen">
      <motion.div
        className="exam-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="exam-header">
          <Sparkles className="icon-bold" size={32} />
          <h2 className="exam-title">Select Your Exam</h2>
          <p className="exam-subtitle">Choose an exam to begin proctoring</p>
        </div>

        <div className="exam-list">
          {exams.length === 0 ? (
            <div className="exam-empty">
              <AlertTriangle size={48} />
              <p>No exams available</p>
              <span>Please contact your administrator</span>
            </div>
          ) : (
            exams.map((exam) => (
              <motion.button
                key={exam.id}
                className="exam-item"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(exam.id)}
                disabled={isLoading}
              >
                <div className="exam-info">
                  <div className="exam-name">{exam.name || `Exam ${exam.id}`}</div>
                  <div className="exam-details">
                    {exam.duration && <span><Clock size={14} /> {exam.duration} mins</span>}
                    {exam.questions && <span>{exam.questions} questions</span>}
                  </div>
                </div>
                <Play className="icon-bold" size={24} />
              </motion.button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// PROCTORING SESSION COMPONENT
// ============================================================================

const ProctoringSession = ({ sessionId, onEndSession, onEvent }) => {
  const [events, setEvents] = useState([]);
  const [riskLevel, setRiskLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const intervalRef = useRef(null);

  useEffect(() => {
    // Monitor visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleEvent(EventTypes.TAB_SWITCH, 1.0, 'Tab switched or window hidden');
      }
    };

    // Monitor window blur
    const handleBlur = () => {
      handleEvent(EventTypes.TAB_SWITCH, 0.8, 'Window lost focus');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    // Periodic face detection simulation
    intervalRef.current = setInterval(() => {
      handleEvent(EventTypes.NO_FACE, 0.5, 'Face detection check');
    }, 20000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleEvent = async (eventType, confidence, message) => {
    const result = await onEvent(eventType, confidence);
    
    const newEvent = {
      timestamp: new Date().toISOString(),
      type: eventType,
      message: message,
      confidence: confidence,
      risk: result.success ? result.risk : null,
      icon: getEventIcon(eventType)
    };

    setEvents(prev => [...prev, newEvent]);
    
    if (result.success && result.risk !== undefined) {
      setRiskLevel(result.risk);
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case EventTypes.TAB_SWITCH:
        return <AlertTriangle size={16} />;
      case EventTypes.NO_FACE:
        return <EyeOff size={16} />;
      case EventTypes.MULTIPLE_FACES:
        return <AlertCircle size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  return (
    <div className="proctoring-session">
      {/* Header */}
      <div className="session-header">
        <div className="session-info">
          <div className="session-badge">
            <Shield className="icon-bold" size={20} />
            <span>Session Active</span>
          </div>
          <div className="session-id">ID: {sessionId}</div>
        </div>

        <div className="session-actions">
          <div className={`connection-status status-${connectionStatus}`}>
            {connectionStatus === 'connected' ? (
              <>
                <Wifi size={16} />
                <span>Connected</span>
              </>
            ) : (
              <>
                <WifiOff size={16} />
                <span>Disconnected</span>
              </>
            )}
          </div>

          <button
            className="btn btn-ghost btn-small"
            onClick={onEndSession}
          >
            <LogOut size={18} />
            End Session
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="session-content">
        {/* Video feed */}
        <div className="session-video">
          <VideoMonitor
            isActive={isRecording}
            onCameraReady={() => {
              setEvents(prev => [...prev, {
                timestamp: new Date().toISOString(),
                type: 'SYSTEM',
                message: 'Camera initialized successfully',
                icon: <CheckCircle2 size={16} />
              }]);
            }}
            onCameraError={(error) => {
              setEvents(prev => [...prev, {
                timestamp: new Date().toISOString(),
                type: 'ERROR',
                message: `Camera error: ${error.message}`,
                icon: <AlertTriangle size={16} />
              }]);
            }}
          />

          {/* Quick stats */}
          <div className="session-stats">
            <div className="stat-card">
              <div className="stat-icon stat-icon-events">
                <Activity size={20} />
              </div>
              <div>
                <div className="stat-value">{events.length}</div>
                <div className="stat-label">Events</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-risk">
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="stat-value">{(riskLevel * 100).toFixed(0)}%</div>
                <div className="stat-label">Risk Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Event log */}
        <div className="session-log">
          <EventLog events={events} riskLevel={riskLevel} />

          {/* Manual event triggers (for testing) */}
          <div className="manual-controls">
            <div className="controls-header">
              <span>Manual Event Triggers</span>
              <span className="controls-note">For testing purposes</span>
            </div>
            <div className="controls-grid">
              <button
                className="control-btn control-btn-warning"
                onClick={() => handleEvent(EventTypes.TAB_SWITCH, 1.0, 'Manual: Tab switch')}
              >
                <AlertTriangle size={16} />
                Tab Switch
              </button>
              <button
                className="control-btn control-btn-danger"
                onClick={() => handleEvent(EventTypes.NO_FACE, 0.9, 'Manual: No face detected')}
              >
                <EyeOff size={16} />
                No Face
              </button>
              <button
                className="control-btn control-btn-info"
                onClick={() => handleEvent(EventTypes.MULTIPLE_FACES, 0.7, 'Manual: Multiple faces')}
              >
                <AlertCircle size={16} />
                Multi Face
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const SkillForgeProctor = () => {
  const [appState, setAppState] = useState('login'); // login, selectExam, proctoring
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useProctorAPI();

  const handleLogin = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const loginResult = await api.login(username, password);

    if (loginResult.success) {
      // Fetch available exams
      const examsResult = await api.getExamList();
      
      if (examsResult.success) {
        setExams(examsResult.exams);
        
        if (examsResult.exams.length === 0) {
          setError('No exams available');
        } else {
          setAppState('selectExam');
        }
      } else {
        setError(examsResult.error);
      }
    } else {
      setError(loginResult.error);
    }

    setIsLoading(false);
  };

  const handleExamSelect = async (examId) => {
    setIsLoading(true);
    setError(null);

    const startResult = await api.startExam(examId);

    if (startResult.success) {
      setAppState('proctoring');
    } else {
      setError(startResult.error);
    }

    setIsLoading(false);
  };

  const handleEndSession = () => {
    if (window.confirm('Are you sure you want to end the proctoring session?')) {
      setAppState('login');
      setExams([]);
    }
  };

  const handleEvent = async (eventType, confidence) => {
    return await api.sendEvent(eventType, confidence);
  };

  return (
    <div className="proctor-app">
      {/* Error notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="error-notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <AlertTriangle size={20} />
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {appState === 'login' && (
          <LoginScreen
            key="login"
            onLogin={handleLogin}
            isLoading={isLoading}
          />
        )}

        {appState === 'selectExam' && (
          <ExamSelector
            key="selectExam"
            exams={exams}
            onSelect={handleExamSelect}
            isLoading={isLoading}
          />
        )}

        {appState === 'proctoring' && (
          <ProctoringSession
            key="proctoring"
            sessionId={api.sessionId}
            onEndSession={handleEndSession}
            onEvent={handleEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --bg-primary: #0D0D0D;
  --bg-secondary: #1A1A1A;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --border-color: #333333;
  --border-light: #2A2A2A;
  
  --accent-blue: #3B82F6;
  --accent-green: #10B981;
  --accent-yellow: #FDE047;
  --accent-orange: #F59E0B;
  --accent-red: #EF4444;
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.proctor-app {
  min-height: 100vh;
  position: relative;
}

.icon-bold {
  stroke-width: 2.5px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ============================================================================
   BUTTONS
   ============================================================================ */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  outline: none;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--accent-blue);
  color: white;
  border: 3px solid var(--text-primary);
  box-shadow: 0 4px 0 var(--text-primary);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 var(--text-primary);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 2px 0 var(--text-primary);
}

.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--bg-secondary);
  border-color: var(--text-primary);
}

.btn-small {
  padding: 8px 16px;
  font-size: 0.875rem;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

/* ============================================================================
   ERROR NOTIFICATION
   ============================================================================ */

.error-notification {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: var(--accent-red);
  color: white;
  padding: 16px 24px;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-lg);
  font-weight: 600;
  min-width: 400px;
}

.error-notification button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: auto;
  padding: 0 8px;
}

/* ============================================================================
   LOGIN SCREEN
   ============================================================================ */

.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
}

.login-card {
  background: var(--bg-secondary);
  border: 3px solid var(--border-color);
  border-radius: 3rem;
  padding: 48px;
  max-width: 480px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-icon {
  width: 80px;
  height: 80px;
  background: var(--accent-blue);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  border: 3px solid var(--text-primary);
  color: white;
}

.login-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.login-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 700;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid var(--border-color);
  border-radius: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
}

.input-wrapper input:focus {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-wrapper svg:first-child {
  position: absolute;
  left: 16px;
  color: var(--text-secondary);
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.password-toggle:hover {
  color: var(--text-primary);
}

.login-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* ============================================================================
   EXAM SELECTOR
   ============================================================================ */

.exam-selector-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.exam-card {
  background: var(--bg-secondary);
  border: 3px solid var(--border-color);
  border-radius: 3rem;
  padding: 48px;
  max-width: 700px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.exam-header {
  text-align: center;
  margin-bottom: 40px;
}

.exam-header svg {
  color: var(--accent-yellow);
  margin-bottom: 16px;
}

.exam-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.exam-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.exam-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exam-empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.exam-empty svg {
  color: var(--accent-orange);
  margin-bottom: 16px;
}

.exam-empty p {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.exam-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  color: var(--text-primary);
}

.exam-item:hover:not(:disabled) {
  border-color: var(--accent-blue);
  background: var(--bg-secondary);
}

.exam-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.exam-name {
  font-weight: 900;
  font-size: 1.1rem;
}

.exam-details {
  display: flex;
  gap: 16px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.exam-details span {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ============================================================================
   PROCTORING SESSION
   ============================================================================ */

.proctoring-session {
  min-height: 100vh;
  padding: 24px;
}

.session-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 20px 32px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 2rem;
}

.session-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.session-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--accent-green);
  border: 2px solid var(--text-primary);
  border-radius: 9999px;
  font-weight: 900;
  color: white;
}

.session-id {
  font-family: monospace;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.session-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid;
}

.status-connected {
  background: rgba(16, 185, 129, 0.1);
  border-color: var(--accent-green);
  color: var(--accent-green);
}

.status-disconnected {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--accent-red);
  color: var(--accent-red);
}

.session-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* ============================================================================
   VIDEO MONITOR
   ============================================================================ */

.session-video {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.video-monitor-container {
  background: var(--bg-secondary);
  border: 3px solid var(--border-color);
  border-radius: 2rem;
  padding: 16px;
  box-shadow: var(--shadow-md);
}

.video-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: #000;
}

.video-feed {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 3;
}

.video-status-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 2px solid;
}

.status-active {
  background: rgba(16, 185, 129, 0.9);
  border-color: var(--text-primary);
  color: white;
}

.status-requesting {
  background: rgba(251, 191, 36, 0.9);
  border-color: var(--text-primary);
  color: #000;
}

.status-error {
  background: rgba(239, 68, 68, 0.9);
  border-color: var(--text-primary);
  color: white;
}

.status-stopped {
  background: rgba(160, 160, 160, 0.9);
  border-color: var(--border-color);
  color: white;
}

.recording-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.9);
  border: 2px solid var(--text-primary);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
}

.recording-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

/* ============================================================================
   SESSION STATS
   ============================================================================ */

.session-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 1.5rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--text-primary);
  color: white;
}

.stat-icon-events {
  background: var(--accent-blue);
}

.stat-icon-risk {
  background: var(--accent-orange);
}

.stat-value {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 600;
}

/* ============================================================================
   EVENT LOG
   ============================================================================ */

.session-log {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-log-container {
  background: var(--bg-secondary);
  border: 3px solid var(--border-color);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  flex: 1;
}

.log-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 2px solid var(--border-color);
}

.log-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  font-size: 1.05rem;
}

.risk-badge {
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 900;
  border: 2px solid var(--text-primary);
}

.log-content {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.log-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text-secondary);
}

.log-entry {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  padding: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 1rem;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.log-timestamp {
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-family: monospace;
}

.log-message {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.log-risk {
  font-weight: 900;
  font-family: monospace;
}

/* ============================================================================
   MANUAL CONTROLS
   ============================================================================ */

.manual-controls {
  background: var(--bg-secondary);
  border: 3px solid var(--border-color);
  border-radius: 2rem;
  padding: 20px;
}

.controls-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 700;
}

.controls-note {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  border: 2px solid;
  transition: all 0.2s;
  font-family: inherit;
}

.control-btn-warning {
  background: rgba(251, 191, 36, 0.1);
  border-color: var(--accent-yellow);
  color: var(--accent-yellow);
}

.control-btn-warning:hover {
  background: rgba(251, 191, 36, 0.2);
}

.control-btn-danger {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--accent-red);
  color: var(--accent-red);
}

.control-btn-danger:hover {
  background: rgba(239, 68, 68, 0.2);
}

.control-btn-info {
  background: rgba(59, 130, 246, 0.1);
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

.control-btn-info:hover {
  background: rgba(59, 130, 246, 0.2);
}

/* ============================================================================
   RESPONSIVE
   ============================================================================ */

@media (max-width: 1024px) {
  .session-content {
    grid-template-columns: 1fr;
  }

  .session-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .session-info,
  .session-actions {
    justify-content: space-between;
  }
}

@media (max-width: 640px) {
  .login-card,
  .exam-card {
    padding: 32px 24px;
  }

  .error-notification {
    min-width: auto;
    max-width: 90vw;
  }

  .session-stats {
    grid-template-columns: 1fr;
  }

  .controls-grid {
    grid-template-columns: 1fr;
  }
}
`;

// ============================================================================
// EXPORT
// ============================================================================

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <SkillForgeProctor />
    </>
  );
}
