import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Upload, X, Plus, Loader, MessageSquare } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { getSupabase } from '../lib/supabase';

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

interface ImageItem {
  id: string;
  section: string;
  name: string;
  image_url: string;
  alt_text?: string;
}

export default function AdminDashboard() {
  const { logout, username } = useAdmin();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'images' | 'submissions' | 'settings'>('content');
  const [newImageSection, setNewImageSection] = useState('hero');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageName, setNewImageName] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const db = getSupabase();
      const { data: contentData } = await db.from('website_content').select('*');
      const { data: imageData } = await db.from('website_images').select('*');
      if (contentData) setContent(contentData as ContentItem[]);
      if (imageData) setImages(imageData as ImageItem[]);
    } catch (err) {
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateContentValue = (id: string, newValue: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  const saveContent = async () => {
    try {
      setSaving(true);
      const db = getSupabase();
      for (const item of content) {
        await db
          .from('website_content')
          .update({ value: item.value, updated_at: new Date().toISOString() })
          .eq('id', item.id);
      }
      alert('Content saved successfully!');
    } catch (err) {
      console.error('Error saving:', err);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const addImage = async () => {
    if (!newImageUrl || !newImageName || !newImageSection) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSaving(true);
      const db = getSupabase();
      const { error } = await db.from('website_images').insert({
        section: newImageSection,
        name: newImageName,
        image_url: newImageUrl,
        alt_text: newImageAlt,
        order: images.length,
      });

      if (error) throw error;
      setNewImageUrl('');
      setNewImageName('');
      setNewImageAlt('');
      await loadContent();
      alert('Image added successfully!');
    } catch (err) {
      console.error('Error adding image:', err);
      alert('Error adding image');
    } finally {
      setSaving(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      setSaving(true);
      const db = getSupabase();
      await db.from('website_images').delete().eq('id', id);
      await loadContent();
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Error deleting image');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-[#1a6fd4] animate-spin mx-auto mb-3" />
          <p className="text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <header className="bg-[#0f1929] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-montserrat text-2xl font-bold text-white">ICR Admin Panel</h1>
            <p className="text-gray-400 text-xs mt-1">Welcome, {username}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#0f1929] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {(['content', 'images', 'submissions', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === tab
                  ? 'border-[#1a6fd4] text-[#4da6ff]'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'submissions' && <MessageSquare className="w-4 h-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-montserrat text-xl font-bold text-white">Website Content</h2>
              <button
                onClick={saveContent}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-[#1db954] hover:bg-[#16a34a] disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-colors"
              >
                {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>

            <div className="space-y-6">
              {content.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#1a6fd4]/20 text-[#4da6ff] text-xs font-semibold rounded-full mb-2">
                      {item.section}
                    </span>
                    <label className="block text-gray-300 text-sm font-medium mb-2">{item.key}</label>
                  </div>
                  {item.value.length > 100 ? (
                    <textarea
                      value={item.value}
                      onChange={(e) => updateContentValue(item.id, e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1a6fd4] transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateContentValue(item.id, e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1a6fd4] transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div>
            <h2 className="font-montserrat text-xl font-bold text-white mb-8">Manage Images</h2>

            {/* Add Image Form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Image
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Section</label>
                  <select
                    value={newImageSection}
                    onChange={(e) => setNewImageSection(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#1a6fd4] transition-colors"
                  >
                    <option>hero</option>
                    <option>about</option>
                    <option>services</option>
                    <option>car-hire</option>
                    <option>contact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Image Name</label>
                  <input
                    type="text"
                    value={newImageName}
                    onChange={(e) => setNewImageName(e.target.value)}
                    placeholder="e.g., Hero Background"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#1a6fd4] transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.pexels.com/..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#1a6fd4] transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Alt Text</label>
                <input
                  type="text"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  placeholder="Describe the image for accessibility"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#1a6fd4] transition-colors"
                />
              </div>
              <button
                onClick={addImage}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-[#1a6fd4] hover:bg-[#1560c0] disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-colors"
              >
                {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Add Image
              </button>
            </div>

            {/* Images List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <div key={img.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="h-40 bg-white/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.alt_text}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23444" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="12" fill="%23999" text-anchor="middle" dy=".3em"%3EImage Error%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-[#1a6fd4]/20 text-[#4da6ff] text-xs font-semibold rounded">
                        {img.section}
                      </span>
                    </div>
                    <h4 className="text-white font-medium text-sm mb-2">{img.name}</h4>
                    <p className="text-gray-400 text-xs mb-3 truncate">{img.alt_text}</p>
                    <button
                      onClick={() => deleteImage(img.id)}
                      disabled={saving}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 text-red-300 rounded-lg text-sm transition-colors font-medium"
                    >
                      <X className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div>
            <h2 className="font-montserrat text-xl font-bold text-white mb-8">Contact Form Submissions</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">View and manage contact form submissions</p>
              <button
                onClick={() => window.open('/admin/submissions', '_blank')}
                className="px-6 py-2 bg-[#1a6fd4] hover:bg-[#1560c0] text-white rounded-lg font-medium text-sm transition-colors inline-block"
              >
                Open Submissions Panel
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="font-montserrat text-xl font-bold text-white mb-8">Settings</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Admin Account</h3>
                  <p className="text-gray-400 text-sm mb-4">Logged in as: <strong>{username}</strong></p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      To change the admin password, contact your system administrator.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-2">Content Management Tips</h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Edit website text content in the "Content" tab</li>
                    <li>• Add or remove images in the "Images" tab</li>
                    <li>• Always save your content changes before navigating away</li>
                    <li>• Use Pexels.com or similar for free high-quality images</li>
                    <li>• Keep alt text descriptive for accessibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
