import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { IdeaGenerator } from './pages/IdeaGenerator';
import { UploadImage } from './pages/UploadImage';
import { Tutorials } from './pages/Tutorials';
import { Community } from './pages/Community';
import { Dashboard } from './pages/Dashboard';
import { AboutContact } from './pages/AboutContact';
import { MOCK_COMMUNITY_POSTS } from './data/mockProjects';
import type { CommunityPost } from './data/mockProjects';
import { CheckCircle, Info, Leaf } from 'lucide-react';
import './App.css';


function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>(['p1', 'p5']); // Pre-save 2 items for visual completeness
  const [completedIdeaIds, setCompletedIdeaIds] = useState<string[]>(['p5']); // Pre-complete 1 item for dashboard stats
  const [likedPostIds, setLikedPostIds] = useState<string[]>(['c3']);
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check local storage or system preferences
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemTheme ? 'dark' : 'light';
    }
    return 'light';
  });

  // Notification State
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info';
  } | null>(null);

  // Apply Theme class to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle auto-closing notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showNotification = (message: string, type: 'success' | 'info') => {
    setNotification({ message, type });
  };

  // Global Actions
  const handleSaveToggle = (id: string) => {
    setSavedIdeaIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showNotification('Project removed from saved list.', 'info');
        // Also remove from completed if it was saved
        setCompletedIdeaIds(c => c.filter(item => item !== id));
        return prev.filter((item) => item !== id);
      } else {
        showNotification('Project saved to your Dashboard!', 'success');
        return [...prev, id];
      }
    });
  };

  const handleCompleteToggle = (id: string) => {
    setCompletedIdeaIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleLikeToggle = (id: string) => {
    setLikedPostIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showNotification('Removed like from project.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showNotification('Thank you for supporting this project! ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `cc-${Date.now()}`,
            username: 'EcoWarriorYou',
            text: commentText,
            time: 'Just now'
          };
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  const handleAddPost = (newPostData: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'date'>) => {
    const newPost: CommunityPost = {
      ...newPostData,
      id: `c-${Date.now()}`,
      likes: 0,
      comments: [],
      date: new Date().toISOString().split('T')[0]
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleShare = (idea: { title: string }) => {
    navigator.clipboard.writeText(window.location.href);
    showNotification(`Copied sharing link for "${idea.title}" to clipboard!`, 'success');
  };

  // Render Page Content based on routing tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'generator':
        return (
          <IdeaGenerator
            savedIdeaIds={savedIdeaIds}
            completedIdeaIds={completedIdeaIds}
            onSaveToggle={handleSaveToggle}
            onCompleteToggle={handleCompleteToggle}
            onShare={handleShare}
            showNotification={showNotification}
          />
        );
      case 'upload':
        return (
          <UploadImage
            savedIdeaIds={savedIdeaIds}
            completedIdeaIds={completedIdeaIds}
            onSaveToggle={handleSaveToggle}
            onCompleteToggle={handleCompleteToggle}
            onShare={handleShare}
            showNotification={showNotification}
          />
        );
      case 'tutorials':
        return <Tutorials />;
      case 'community':
        return (
          <Community
            posts={posts}
            likedPostIds={likedPostIds}
            onLikeToggle={handleLikeToggle}
            onAddComment={handleAddComment}
            onAddPost={handleAddPost}
            showNotification={showNotification}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            savedIdeaIds={savedIdeaIds}
            completedIdeaIds={completedIdeaIds}
            onSaveToggle={handleSaveToggle}
            onCompleteToggle={handleCompleteToggle}
            onShare={handleShare}
            showNotification={showNotification}
            setActiveTab={setActiveTab}
          />
        );
      case 'about-contact':
        return <AboutContact showNotification={showNotification} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05100a] text-slate-800 dark:text-slate-100 bg-grid-pattern transition-colors duration-300 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {renderContent()}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white dark:bg-slate-950/80 border-t border-slate-200/60 dark:border-slate-800/60 py-10 text-center text-xs text-slate-450 dark:text-slate-500 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="p-1.5 bg-eco-green-500 rounded-lg text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-850 dark:text-slate-250">Smart Reuse Idea Generator</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed text-[11px]">
            Empowering global citizens to convert everyday domestic waste into premium, functional assets. Upcycle for a cleaner, greener tomorrow.
          </p>
          <div className="pt-2 text-[10px]">
            © {new Date().getFullYear()} Smart Reuse Inc. Developed with eco-friendly intelligence.
          </div>
        </div>
      </footer>

      {/* GLOBAL TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className="glass-panel flex items-center gap-3 py-3.5 px-5 rounded-2xl border border-white/30 dark:border-slate-800 shadow-xl max-w-sm">
            {notification.type === 'success' ? (
              <div className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-1.5 bg-eco-blue-500/10 text-eco-blue-600 rounded-xl">
                <Info className="w-5 h-5" />
              </div>
            )}
            <p className="text-xs font-bold text-slate-850 dark:text-slate-200 leading-tight">
              {notification.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
