'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Calendar, User, Clock } from 'lucide-react';
import { blogData } from '@/data/blog';
import type { BlogPost } from '@/types/blog';
import { notifyBlogDataUpdate, permanentlyDeleteBlog } from '@/hooks/useReactiveData';
import { uploadFile, deleteFile, extractFilenameFromUrl, isLocalUpload } from '@/lib/fileUtils';

// Function to generate URL-friendly slug from title
const generateSlug = (title: string): string => {
  if (!title || title.trim() === '') {
    return `blog-${Date.now()}`; // Fallback for empty titles
  }
  
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  // Ensure slug is not empty after processing
  return slug || `blog-${Date.now()}`;
};

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    author: '',
    date: '',
    readTime: '',
    image: '',
    slug: '',
    content: '',
    tags: [],
    category: ''
  });

  // Load from localStorage on mount, initialize if doesn't exist
  useEffect(() => {
    const saved = localStorage.getItem('blogData');
    if (saved) {
      setBlogs(JSON.parse(saved));
    } else {
      // Initialize with original data and save to localStorage
      localStorage.setItem('blogData', JSON.stringify(blogData));
      setBlogs(blogData);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever blogs change (but not on initial load)  
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('blogData', JSON.stringify(blogs));
      notifyBlogDataUpdate(); // Notify other components of the change
    }
  }, [blogs, isInitialized]);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsAddingNew(false);
  };

  const handleSave = (id: string, updatedBlog: BlogPost) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? updatedBlog : blog
    ));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to PERMANENTLY delete this blog post? This cannot be undone and the item will never appear again.')) {
      const blog = blogs.find(b => b.id === id);
      
      // Delete associated file if it's a local upload
      if (blog && isLocalUpload(blog.image)) {
        try {
          const filename = extractFilenameFromUrl(blog.image);
          await deleteFile(filename);
        } catch (error) {
          console.error('Failed to delete file:', error);
        }
      }
      
      // Add to permanent deletion list
      permanentlyDeleteBlog(id);
      // Remove from current state
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const handleAddNew = () => {
    const maxId = Math.max(...blogs.map(b => parseInt(b.id)));
    const newId = (maxId + 1).toString();
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const blogTitle = newBlog.title || 'New Blog Post';
    const blogSlug = newBlog.slug || generateSlug(blogTitle);

    const blog: BlogPost = {
      id: newId,
      title: blogTitle,
      excerpt: newBlog.excerpt || 'Add your blog excerpt here...',
      author: newBlog.author || 'Admin',
      date: newBlog.date || currentDate,
      readTime: newBlog.readTime || '5 min read',
      image: newBlog.image || '/assets/images/blog1.jpg',
      slug: newBlog.slug || blogSlug,
      content: newBlog.content || '',
      tags: newBlog.tags || [],
      category: newBlog.category || ''
    };

    setBlogs([...blogs, blog]);
    setNewBlog({
      title: '',
      excerpt: '',
      author: '',
      date: '',
      readTime: '',
      image: '',
      slug: '',
      content: '',
      tags: [],
      category: ''
    });
    setIsAddingNew(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, blogId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadFile(file, 'blog');
        
        if (blogId) {
          // Delete old file if it exists and is a local upload
          const existingBlog = blogs.find(b => b.id === blogId);
          if (existingBlog && isLocalUpload(existingBlog.image)) {
            const oldFilename = extractFilenameFromUrl(existingBlog.image);
            await deleteFile(oldFilename).catch(console.error);
          }
          
          // Update existing blog
          setBlogs(blogs.map(blog => 
            blog.id === blogId ? { ...blog, image: result.url } : blog
          ));
        } else {
          // Update new blog
          setNewBlog({ ...newBlog, image: result.url });
        }
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };



  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Blog Management</h2>
        <div className="admin-buttons">
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add New Blog Post
          </button>
        </div>
      </div>

      {/* Add New Blog Form */}
      {isAddingNew && (
        <div className="admin-form-card">
          <h3>Add New Blog Post</h3>
          <div className="form-grid blog-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const generatedSlug = generateSlug(title);
                  console.log('📝 Blog Admin - Generated slug:', generatedSlug, 'from title:', title);
                  setNewBlog({ 
                    ...newBlog, 
                    title: title,
                    slug: generatedSlug
                  });
                }}
                placeholder="Blog post title"
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                placeholder="Author name"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="text"
                value={newBlog.date}
                onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
                placeholder="December 15, 2024"
              />
            </div>
            <div className="form-group">
              <label>Read Time</label>
              <input
                type="text"
                value={newBlog.readTime}
                onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                placeholder="5 min read"
              />
            </div>
            <div className="form-group">
              <label>Slug (URL) - Auto-generated</label>
              <input
                type="text"
                value={newBlog.slug}
                onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                placeholder="auto-generated-from-title"
                style={{ backgroundColor: '#f8fafc' }}
              />
              <small style={{ color: '#64748b', fontSize: '0.8rem' }}>
                Auto-generated from title. You can edit if needed.
              </small>
            </div>
            <div className="form-group full-width">
              <label>Excerpt</label>
              <textarea
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                placeholder="Blog post excerpt..."
                rows={3}
              />
            </div>
            <div className="form-group full-width">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
              {newBlog.image && (
                <div className="image-preview">
                  <img src={newBlog.image} alt="Preview" />
                </div>
              )}
            </div>
            <div className="form-group full-width">
              <label>Content (HTML)</label>
              <textarea
                value={newBlog.content || ''}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                placeholder="Full blog post content in HTML..."
                rows={8}
              />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                value={newBlog.tags?.join(', ') || ''}
                onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                placeholder="meditation, healing, crystals"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={newBlog.category || ''}
                onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                placeholder="Meditation, Healing, etc."
              />
            </div>
          </div>
          <div className="form-actions">
            <button onClick={handleAddNew} className="btn-success">
              <Save size={16} />
              Save Blog Post
            </button>
            <button onClick={() => setIsAddingNew(false)} className="btn-secondary">
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Blogs Grid */}
      <div className="admin-grid blog-grid">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            isEditing={editingId === blog.id}
            onEdit={() => handleEdit(blog.id)}
            onSave={(updated) => handleSave(blog.id, updated)}
            onDelete={() => handleDelete(blog.id)}
            onCancel={() => setEditingId(null)}
            onImageUpload={(e) => handleImageUpload(e, blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface BlogCardProps {
  blog: BlogPost;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (blog: BlogPost) => void;
  onDelete: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  onImageUpload
}) => {
  const [editData, setEditData] = useState(blog);

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div className="admin-card blog-card editing">
        <div className="card-image">
          <img src={editData.image} alt={editData.title} />
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="image-upload-input"
          />
        </div>
        <div className="card-content">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => {
              const title = e.target.value;
              setEditData({ 
                ...editData, 
                title: title,
                slug: generateSlug(title)
              });
            }}
            className="edit-input title-input"
            placeholder="Blog title"
          />
          <textarea
            value={editData.excerpt}
            onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })}
            className="edit-textarea"
            placeholder="Blog excerpt"
            rows={3}
          />
          <div className="meta-inputs">
            <input
              type="text"
              value={editData.author}
              onChange={(e) => setEditData({ ...editData, author: e.target.value })}
              className="edit-input meta-input"
              placeholder="Author"
            />
            <input
              type="text"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              className="edit-input meta-input"
              placeholder="Date"
            />
            <input
              type="text"
              value={editData.readTime}
              onChange={(e) => setEditData({ ...editData, readTime: e.target.value })}
              className="edit-input meta-input"
              placeholder="Read time"
            />
            <input
              type="text"
              value={editData.slug}
              onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
              className="edit-input meta-input"
              placeholder="Slug"
            />
          </div>
          <textarea
            value={editData.content || ''}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            className="edit-textarea"
            placeholder="Full content (HTML)"
            rows={6}
          />
          <input
            type="text"
            value={editData.tags?.join(', ') || ''}
            onChange={(e) => setEditData({ ...editData, tags: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            className="edit-input"
            placeholder="Tags (comma separated)"
          />
          <input
            type="text"
            value={editData.category || ''}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            className="edit-input"
            placeholder="Category"
          />
        </div>
        <div className="card-actions">
          <button onClick={handleSave} className="btn-success">
            <Save size={16} />
          </button>
          <button onClick={onCancel} className="btn-secondary">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card blog-card">
      <div className="card-image">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div className="card-content">
        <h4>{blog.title}</h4>
        <p className="card-excerpt">{blog.excerpt}</p>
        <div className="card-meta">
          <span className="meta-item">
            <User size={14} />
            {blog.author}
          </span>
          <span className="meta-item">
            <Calendar size={14} />
            {blog.date}
          </span>
          <span className="meta-item">
            <Clock size={14} />
            {blog.readTime}
          </span>
        </div>
      </div>
      <div className="card-actions">
        <button onClick={onEdit} className="btn-primary">
          <Edit2 size={16} />
        </button>
        <button onClick={onDelete} className="btn-danger">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default BlogAdmin;