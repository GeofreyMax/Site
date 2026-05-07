import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { contactService, type ContactForm } from '../services/database';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactForm | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAll();
      setSubmissions(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load submissions';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      setDeleting(id);
      await contactService.delete(id);
      setSubmissions(prev => prev.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete submission');
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'responded') => {
    try {
      await contactService.updateStatus(id, newStatus);
      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'read':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'responded':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const unreadCount = submissions.filter(s => s.status === 'new').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-[#1a6fd4] animate-spin mx-auto mb-3" />
          <p className="text-gray-300">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-montserrat text-3xl font-bold text-white mb-2">Contact Submissions</h1>
          <p className="text-gray-400">
            Total: {submissions.length} | Unread: {unreadCount}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-semibold">Error</p>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          </div>
        )}

        {submissions.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No submissions yet</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Submissions List */}
            <div className="lg:col-span-2">
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {submissions.map(submission => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`bg-white/5 border rounded-lg p-4 cursor-pointer transition-all hover:bg-white/10 ${
                      selectedSubmission?.id === submission.id
                        ? 'border-[#1a6fd4] bg-[#1a6fd4]/20'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-semibold text-sm">{submission.name}</h3>
                        <p className="text-gray-400 text-xs">{submission.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 truncate">{submission.subject}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(submission.created_at).toLocaleDateString()} {new Date(submission.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail View */}
            {selectedSubmission && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:sticky lg:top-8 h-fit">
                <h2 className="font-montserrat text-xl font-bold text-white mb-4">Submission Details</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-1">Name</label>
                    <p className="text-white">{selectedSubmission.name}</p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-1">Email</label>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-[#4da6ff] hover:underline flex items-center gap-2 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {selectedSubmission.email}
                    </a>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-1">Phone</label>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-[#4da6ff] hover:underline flex items-center gap-2 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {selectedSubmission.phone}
                    </a>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-1">Subject</label>
                    <p className="text-white">{selectedSubmission.subject}</p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-1">Received</label>
                    <p className="text-gray-300 text-sm">
                      {new Date(selectedSubmission.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2">Status</label>
                    <div className="flex gap-2">
                      {(['new', 'read', 'responded'] as const).map(status => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(selectedSubmission.id, status)}
                          className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                            selectedSubmission.status === status
                              ? `${getStatusColor(status)} opacity-100`
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Message</label>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  disabled={deleting === selectedSubmission.id}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 text-red-300 rounded-lg transition-colors font-medium text-sm"
                >
                  {deleting === selectedSubmission.id ? (
                    <>
                      <span className="w-4 h-4 border-2 border-red-300/30 border-t-red-300 rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Submission
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
