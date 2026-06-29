import { useState } from 'react';
import type { CommunityPost } from '../data/mockProjects';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { Heart, MessageSquare, Share2, Plus, X, Sparkles, Send } from 'lucide-react';

interface CommunityProps {
  posts: CommunityPost[];
  likedPostIds: string[];
  onLikeToggle: (id: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onAddPost: (post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'date'>) => void;
  showNotification: (msg: string, type: 'success' | 'info') => void;
}

export const Community: React.FC<CommunityProps> = ({
  posts,
  likedPostIds,
  onLikeToggle,
  onAddComment,
  onAddPost,
  showNotification,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Form State for New Post
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formMaterial, setFormMaterial] = useState('Plastic Bottle');
  const [formBeforeLabel, setFormBeforeLabel] = useState('');
  const [formAfterLabel, setFormAfterLabel] = useState('');
  
  // Custom design choices for user post
  const [formBeforeColor, setFormBeforeColor] = useState('from-gray-700 to-slate-900');
  const [formAfterColor, setFormAfterColor] = useState('from-emerald-500 to-teal-600');
  const formBeforeIcon = 'Box';
  const formAfterIcon = 'Sparkles';

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDesc.trim() || !formBeforeLabel.trim() || !formAfterLabel.trim()) {
      showNotification('Please fill in all fields to share your project!', 'info');
      return;
    }

    onAddPost({
      username: 'EcoWarriorYou',
      userAvatar: '🦸',
      userTitle: 'Eco Enthusiast',
      title: formTitle,
      description: formDesc,
      material: formMaterial,
      beforeLabel: formBeforeLabel,
      afterLabel: formAfterLabel,
      beforeColor: formBeforeColor,
      afterColor: formAfterColor,
      beforeIcon: formBeforeIcon,
      afterIcon: formAfterIcon,
    });

    // Reset Form
    setFormTitle('');
    setFormDesc('');
    setFormBeforeLabel('');
    setFormAfterLabel('');
    setShowAddModal(false);
    showNotification('Project published to the global feed!', 'success');
  };

  const handleCommentSubmit = (postId: string) => {
    if (!commentText.trim()) return;
    onAddComment(postId, commentText);
    setCommentText('');
    showNotification('Comment posted!', 'success');
  };

  const handleSharePost = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    showNotification(`Copied link for "${title}" to clipboard!`, 'success');
  };

  const activeCommentPost = posts.find(p => p.id === activeCommentPostId);

  return (
    <div className="space-y-10 pb-16">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-200/60 dark:border-slate-800/50 pb-8">
        <div className="max-w-xl text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Community Showcase
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Inspire and get inspired! Browse beautiful before-and-after upcycling creations submitted by eco-warriors around the globe.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="glass-button inline-flex items-center gap-2 bg-gradient-to-r from-eco-green-600 to-eco-green-700 hover:from-eco-green-500 hover:to-eco-green-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Share Your Project</span>
        </button>
      </div>

      {/* COMMUNITY POSTS FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="glass-panel rounded-3xl p-6 border border-white/20 dark:border-slate-800/40 shadow-md flex flex-col justify-between"
          >
            {/* User Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-slate-100 dark:bg-slate-950/40 border border-slate-200/20 rounded-2xl">
                  {post.userAvatar}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {post.username}
                  </h4>
                  <span className="text-[10px] bg-eco-green-100 dark:bg-eco-green-950/40 text-eco-green-700 dark:text-eco-green-400 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                    {post.userTitle}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{post.date}</span>
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Before/After Slider */}
              <BeforeAfterSlider
                beforeLabel={post.beforeLabel}
                afterLabel={post.afterLabel}
                beforeColor={post.beforeColor}
                afterColor={post.afterColor}
                beforeIcon={post.beforeIcon}
                afterIcon={post.afterIcon}
              />
            </div>

            {/* Post Actions */}
            <div>
              <hr className="border-slate-200/60 dark:border-slate-800/45 my-4" />
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {/* Like Button */}
                  <button
                    onClick={() => onLikeToggle(post.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      likedPostIds.includes(post.id)
                        ? 'bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 text-slate-500 dark:text-slate-450'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedPostIds.includes(post.id) ? 'fill-current' : ''}`} />
                    <span>{post.likes + (likedPostIds.includes(post.id) ? 1 : 0)}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setActiveCommentPostId(post.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 text-slate-500 dark:text-slate-450 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleSharePost(post.title)}
                  className="p-1.5 rounded-xl border bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 text-slate-500 dark:text-slate-450 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMMENT INBOX DRAWER (MODAL) */}
      {activeCommentPost && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Comments</h3>
                <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[280px]">For: {activeCommentPost.title}</p>
              </div>
              <button
                onClick={() => setActiveCommentPostId(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeCommentPost.comments.map((comment) => (
                <div key={comment.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/40 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{comment.username}</span>
                    <span className="text-[9px] text-slate-400 font-mono">{comment.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{comment.text}</p>
                </div>
              ))}
              {activeCommentPost.comments.length === 0 && (
                <p className="text-center text-slate-400 text-xs italic py-10">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Input Box */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
              <input
                type="text"
                placeholder="Write a supportive comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCommentSubmit(activeCommentPost.id);
                }}
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-850 dark:text-slate-250 focus:outline-none focus:border-eco-green-500"
              />
              <button
                onClick={() => handleCommentSubmit(activeCommentPost.id)}
                className="bg-eco-green-600 hover:bg-eco-green-700 text-white p-2.5 rounded-xl transition-colors active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE PROJECT SUBMISSION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handlePostSubmit}
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-scaleUp"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-eco-green-600" />
                <span>Share Your Upcycle Success</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rustic Wine Bottle Garden Border"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:border-eco-green-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">How did you build it?</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your process and materials so others can replicate it..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:border-eco-green-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>

              {/* Material Dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Primary Waste Material</label>
                <select
                  value={formMaterial}
                  onChange={(e) => setFormMaterial(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 focus:border-eco-green-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-700 dark:text-slate-300"
                >
                  <option>Plastic Bottle</option>
                  <option>Glass Jar</option>
                  <option>Cardboard Box</option>
                  <option>Old T-Shirt</option>
                  <option>Coffee Grounds</option>
                  <option>Tire</option>
                  <option>Tin Can</option>
                  <option>Orange Peels</option>
                </select>
              </div>

              {/* Slider Config row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-305">Before Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Bald Car Tire"
                    value={formBeforeLabel}
                    onChange={(e) => setFormBeforeLabel(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:border-eco-green-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-305">After Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rope Ottoman"
                    value={formAfterLabel}
                    onChange={(e) => setFormAfterLabel(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:border-eco-green-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* Slider Design Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Before Color Theme</label>
                  <select
                    value={formBeforeColor}
                    onChange={(e) => setFormBeforeColor(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-[11px] text-slate-750 dark:text-slate-300"
                  >
                    <option value="from-gray-700 to-slate-900">Dark Charcoal (Default)</option>
                    <option value="from-amber-700/40 to-yellow-800/40">Cardboard Brown</option>
                    <option value="from-sky-700/45 to-sky-900/45">Plastic Blue</option>
                    <option value="from-emerald-900/50 to-teal-900/50">Glass Green</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">After Color Theme</label>
                  <select
                    value={formAfterColor}
                    onChange={(e) => setFormAfterColor(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-[11px] text-slate-750 dark:text-slate-300"
                  >
                    <option value="from-emerald-500 to-teal-600">Forest Green (Default)</option>
                    <option value="from-sky-500 to-eco-blue-600">Ocean Blue</option>
                    <option value="from-amber-400 to-orange-600">Vibrant Sunset</option>
                    <option value="from-purple-500 to-pink-600">Creative Magenta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-eco-green-600 hover:bg-eco-green-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors"
              >
                Publish Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
