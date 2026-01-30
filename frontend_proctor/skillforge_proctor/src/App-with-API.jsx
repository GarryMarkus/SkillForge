// NOTE: This file shows how to integrate the api.js service into your App component
// Replace the useProctorAPI hook in your skillforge-proctor.jsx with this implementation

import { useState, useEffect } from 'react';
import API, { AuthAPI, ExamAPI, ProctorAPI } from './api';

// ============================================================================
// UPDATED CUSTOM HOOK USING API SERVICE
// ============================================================================

const useProctorAPI = () => {
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    if (AuthAPI.isAuthenticated()) {
      setToken(AuthAPI.getToken());
    }
  }, []);

  /**
   * Login user
   */
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const result = await AuthAPI.login(username, password);

    if (result.success) {
      setToken(result.data.token);
      setIsLoading(false);
      return result;
    } else {
      setError(result.error);
      setIsLoading(false);
      return result;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    setIsLoading(true);
    const result = await AuthAPI.logout();
    
    setToken(null);
    setSessionId(null);
    setIsLoading(false);
    
    return result;
  };

  /**
   * Get available exams
   */
  const getExamList = async () => {
    setIsLoading(true);
    setError(null);

    const result = await ExamAPI.getExamList();

    if (!result.success) {
      setError(result.error);
    }

    setIsLoading(false);
    return result;
  };

  /**
   * Start an exam
   */
  const startExam = async (examId) => {
    setIsLoading(true);
    setError(null);

    const result = await ExamAPI.startExam(examId);

    if (result.success) {
      setSessionId(result.data.sessionId);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
    return result;
  };

  /**
   * Send proctoring event
   */
  const sendEvent = async (eventType, confidence = 1.0, metadata = {}) => {
    if (!sessionId) {
      return { success: false, error: 'No active session' };
    }

    const result = await ProctorAPI.sendEvent(
      sessionId,
      eventType,
      confidence,
      metadata
    );

    return result;
  };

  /**
   * Get event history
   */
  const getEventHistory = async () => {
    if (!sessionId) {
      return { success: false, error: 'No active session' };
    }

    const result = await ProctorAPI.getEventHistory(sessionId);
    return result;
  };

  return {
    token,
    sessionId,
    isLoading,
    error,
    login,
    logout,
    getExamList,
    startExam,
    sendEvent,
    getEventHistory
  };
};

// ============================================================================
// EXAMPLE: COMPLETE INTEGRATION IN A COMPONENT
// ============================================================================

export function ProctorAppWithAPI() {
  const {
    token,
    sessionId,
    isLoading,
    error,
    login,
    logout,
    getExamList,
    startExam,
    sendEvent
  } = useProctorAPI();

  const [appState, setAppState] = useState('login');
  const [exams, setExams] = useState([]);

  // Handle login
  const handleLogin = async (username, password) => {
    const result = await login(username, password);

    if (result.success) {
      // Fetch exams after successful login
      const examsResult = await getExamList();
      
      if (examsResult.success && examsResult.data.length > 0) {
        setExams(examsResult.data);
        setAppState('selectExam');
      } else {
        console.error('No exams available');
      }
    }
  };

  // Handle exam selection
  const handleExamSelect = async (examId) => {
    const result = await startExam(examId);

    if (result.success) {
      setAppState('proctoring');
    }
  };

  // Handle event sending
  const handleEvent = async (eventType, confidence) => {
    const result = await sendEvent(eventType, confidence, {
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });

    return result;
  };

  // Handle logout/end session
  const handleEndSession = async () => {
    await logout();
    setAppState('login');
    setExams([]);
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      
      {appState === 'login' && (
        <LoginScreen onLogin={handleLogin} isLoading={isLoading} />
      )}

      {appState === 'selectExam' && (
        <ExamSelector
          exams={exams}
          onSelect={handleExamSelect}
          isLoading={isLoading}
        />
      )}

      {appState === 'proctoring' && (
        <ProctoringSession
          sessionId={sessionId}
          onEndSession={handleEndSession}
          onEvent={handleEvent}
        />
      )}
    </div>
  );
}

// ============================================================================
// ALTERNATIVE: REACT CONTEXT PATTERN FOR API
// ============================================================================

import { createContext, useContext } from 'react';

const APIContext = createContext(null);

export function APIProvider({ children }) {
  const api = useProctorAPI();

  return (
    <APIContext.Provider value={api}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  
  if (!context) {
    throw new Error('useAPI must be used within APIProvider');
  }
  
  return context;
}

// Usage in main.jsx:
// import { APIProvider } from './App';
// 
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <APIProvider>
//       <App />
//     </APIProvider>
//   </React.StrictMode>
// );

// Usage in any component:
// function SomeComponent() {
//   const { login, sendEvent } = useAPI();
//   // Use API functions
// }

// ============================================================================
// ADVANCED: ERROR BOUNDARY FOR API ERRORS
// ============================================================================

import { Component } from 'react';

export class APIErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('API Error:', error, errorInfo);
    
    // Log to error tracking service (e.g., Sentry)
    // Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// INTEGRATION EXAMPLE: COMPLETE FLOW
// ============================================================================

export function ExampleIntegration() {
  const [user, setUser] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);

  // Step 1: Login
  const handleLogin = async () => {
    const result = await API.Auth.login('testuser', 'test@123');
    
    if (result.success) {
      setUser(result.data.user);
      console.log('✅ Logged in successfully');
    } else {
      console.error('❌ Login failed:', result.error);
    }
  };

  // Step 2: Fetch exams
  const handleFetchExams = async () => {
    const result = await API.Exam.getExamList();
    
    if (result.success) {
      console.log('✅ Exams loaded:', result.data);
      return result.data;
    } else {
      console.error('❌ Failed to load exams:', result.error);
      return [];
    }
  };

  // Step 3: Start exam
  const handleStartExam = async (examId) => {
    const result = await API.Exam.startExam(examId);
    
    if (result.success) {
      setCurrentExam(result.data);
      console.log('✅ Exam started:', result.data.sessionId);
    } else {
      console.error('❌ Failed to start exam:', result.error);
    }
  };

  // Step 4: Send events during exam
  const handleSendEvent = async (eventType) => {
    if (!currentExam) return;

    const result = await API.Proctor.sendEvent(
      currentExam.sessionId,
      eventType,
      1.0,
      { timestamp: Date.now() }
    );
    
    if (result.success) {
      console.log('✅ Event sent. Risk:', result.data.risk);
    } else {
      console.error('❌ Failed to send event:', result.error);
    }
  };

  // Step 5: End session
  const handleEndSession = async () => {
    if (!currentExam) return;

    const result = await API.Session.endSession(currentExam.sessionId);
    
    if (result.success) {
      console.log('✅ Session ended');
      setCurrentExam(null);
    }
  };

  // Step 6: Logout
  const handleLogout = async () => {
    await API.Auth.logout();
    setUser(null);
    setCurrentExam(null);
    console.log('✅ Logged out');
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <p>Welcome, {user?.username}!</p>
          <button onClick={handleFetchExams}>Load Exams</button>
          
          {currentExam ? (
            <div>
              <p>Session: {currentExam.sessionId}</p>
              <button onClick={() => handleSendEvent('TAB_SWITCH')}>
                Send Tab Switch Event
              </button>
              <button onClick={handleEndSession}>End Session</button>
            </div>
          ) : (
            <button onClick={() => handleStartExam(1)}>Start Exam</button>
          )}
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXPORT THE UPDATED HOOK
// ============================================================================

export default useProctorAPI;

/*
 * INTEGRATION INSTRUCTIONS:
 * 
 * 1. Replace the old useProctorAPI hook in skillforge-proctor.jsx with this one
 * 
 * 2. Import the API service at the top of your file:
 *    import API, { AuthAPI, ExamAPI, ProctorAPI } from './api';
 * 
 * 3. The hook now returns additional properties:
 *    - isLoading: boolean indicating if an API call is in progress
 *    - error: string containing the last error message
 *    - getEventHistory: function to fetch event history
 * 
 * 4. All API calls now use the centralized API service with:
 *    - Automatic retry logic
 *    - Proper error handling
 *    - Token management
 *    - Timeout handling
 * 
 * 5. Error handling example:
 *    const { error, login } = useProctorAPI();
 *    
 *    if (error) {
 *      <div className="error-message">{error}</div>
 *    }
 */
