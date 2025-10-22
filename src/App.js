'use client';

import { useState, useEffect } from 'react';
import Chat from './pages/ChatNext';
import Sidebar from './components/Sidebar';
import { SettingsProvider } from './contexts/SettingsContext';
import { ConversationsProvider } from './contexts/ConversationsContext';
import Toast from './components/Toast';
import './styles/index.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simplified - no auth for now
  const [userInfo, setUserInfo] = useState({ name: 'User', email: 'user@example.com' });
  const [isResponsive, setIsResponsive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <SettingsProvider>
      <ConversationsProvider>
        <div className="app">
          {showToast && (
            <Toast 
              message={toastMessage} 
              onClose={() => setShowToast(false)} 
            />
          )}
          
          <div className="main-container">
            <Sidebar
              isResponsive={isResponsive}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              userInfo={userInfo}
              setIsLoggedIn={setIsLoggedIn}
              showToast={showToastMessage}
            />
            
            <div className="content-area">
              <Chat
                isResponsive={isResponsive}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                showToast={showToastMessage}
              />
            </div>
          </div>
        </div>
      </ConversationsProvider>
    </SettingsProvider>
  );
}
    return location.pathname.startsWith("/view");
  }, [location.pathname]);

  const chatMessageRef = useRef(null);
  const { fetchConversations } = useContext(ConversationsContext);
  const { isModelReady } = useContext(SettingsContext);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const statusRes = await fetch(`${process.env.REACT_APP_FASTAPI_URL}/auth/status`, { credentials: "include" });
        if (!statusRes.ok) {
          setIsLoggedIn(false);
          setUserInfo(null);
          return;
        }
        const statusData = await statusRes.json();
        setIsLoggedIn(statusData.logged_in);
        if (statusData.logged_in) {
          fetchConversations();
          try {
            const userRes = await fetch(`${process.env.REACT_APP_FASTAPI_URL}/auth/user`, { credentials: "include" });
            if (userRes.ok) {
              const userData = await userRes.json();
              setUserInfo(userData);
            }
          } catch (error) {}
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    }
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isResponsive) {
      setIsSidebarOpen(false);
    } else {
      if (userSidebarOpen !== null) {
        setIsSidebarOpen(userSidebarOpen);
    } else {
      setIsSidebarOpen(true);
      }
    }
  }, [isResponsive, userSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => {
      const newState = !prev;
      if (!isResponsive) setUserSidebarOpen(newState);
      return newState;
    });
  }, [isResponsive]);
  
  useEffect(() => {
    const handlePointerDown = (event) => {
      const newIsTouch = event.pointerType === 'touch';
      setIsTouch(prev => prev !== newIsTouch ? newIsTouch : prev);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (!isTouch) return;
  
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTarget = null;
    let hadTextSelectionAtStart = false;

    const threshold = 50;
    const excludedClasses = ['.header', '.context-menu', '.message-edit', '.input-container', '.katex-display', '.code-block', '.mcp-modal-overlay', '.modal-overlay'];
  
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTarget = e.touches[0].target;
      hadTextSelectionAtStart = window.getSelection && window.getSelection().toString().length > 0;
    };
  
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTarget = e.changedTouches[0].target;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
  
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        const hasTextSelectionNow = window.getSelection && window.getSelection().toString().length > 0;
        const isStartExcluded = excludedClasses.some(cls => touchStartTarget && touchStartTarget.closest(cls));
        const isEndExcluded = excludedClasses.some(cls => touchEndTarget && touchEndTarget.closest(cls));
        
        if (!hadTextSelectionAtStart && !hasTextSelectionNow && !isStartExcluded && !isEndExcluded) {
          setIsSidebarOpen(currentOpen => {
            if ((diffX > 0 && !currentOpen) || (diffX < 0 && currentOpen)) {
              const newState = !currentOpen;
              const currentIsResponsive = window.innerWidth <= 768;
              if (!currentIsResponsive) setUserSidebarOpen(newState);
              return newState;
            }
            return currentOpen;
          });
        }
      }
    };
    
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTouch]);

  if (isLoggedIn === null) return null;
  if (isLoggedIn && !isModelReady) return null;

  return (
    <div style={{ display: "flex", margin: "0", overflow: "hidden" }}>
      {shouldShowLayout && (
        <div
          style={{
            width: "260px",
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            zIndex: 1000,
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <Sidebar
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            isResponsive={isResponsive}
            isTouch={isTouch}
            userInfo={userInfo}
          />
        </div>
      )}

      {shouldShowLayout && isSidebarOpen && isResponsive && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 100,
          }}
        />
      )}

      <div
        style={{ 
          width: "100%",
          height: "100dvh",
          marginLeft: (shouldShowLayout && isSidebarOpen && !isResponsive) ? "260px" : "0",
          transition: "margin-left 0.3s ease",
          scrollbarGutter: "stable",
          backfaceVisibility: "hidden",
        }}
      >
        {shouldShowLogo && (
          <div className="header" style={{ padding: "0 20px" }}>
            <img
              src={logo}
              alt="DEVOCHAT"
              width="143.5px"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}

        {shouldShowLayout && (
          location.pathname.startsWith('/image') ? (
            <ImageHeader
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              isTouch={isTouch}
              chatMessageRef={chatMessageRef}
            />
          ) : (
            <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              isTouch={isTouch}
              chatMessageRef={chatMessageRef}
            />
          )
        )}

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={isLoggedIn ? <Home isTouch={isTouch} /> : <Navigate to="/login" />} />
          <Route path="/chat/:conversation_id" element={isLoggedIn ? <Chat isTouch={isTouch} chatMessageRef={chatMessageRef} /> : <Navigate to="/login" />} />
          <Route path="/image" element={isLoggedIn ? <ImageHome isTouch={isTouch} /> : <Navigate to="/login" />} />
          <Route path="/image/:conversation_id" element={isLoggedIn ? <ImageChat isTouch={isTouch} chatMessageRef={chatMessageRef} /> : <Navigate to="/login" />} />
          <Route path="/view/:type/:conversation_id" element={isLoggedIn ? <View /> : <Navigate to="/login" />} />
          <Route path="/realtime" element={isLoggedIn ? <Realtime /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </div>

      <Toast
        type="error"
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;