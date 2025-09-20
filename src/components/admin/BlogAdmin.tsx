'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Calendar, User, Clock } from 'lucide-react';
import { blogData } from '@/data/blog';
import type { BlogPost } from '@/data/blog';
import { notifyBlogDataUpdate, permanentlyDeleteBlog, resetBlogDeletions } from '@/hooks/useReactiveData';

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
    slug: ''
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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to PERMANENTLY delete this blog post? This cannot be undone and the item will never appear again.')) {
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
    const blogSlug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const blog: BlogPost = {
      id: newId,
      title: blogTitle,
      excerpt: newBlog.excerpt || 'Add your blog excerpt here...',
      author: newBlog.author || 'Admin',
      date: newBlog.date || currentDate,
      readTime: newBlog.readTime || '5 min read',
      image: newBlog.image || '/assets/images/blog1.jpg',
      slug: newBlog.slug || blogSlug
    };

    setBlogs([...blogs, blog]);
    setNewBlog({ title: '', excerpt: '', author: '', date: '', readTime: '', image: '', slug: '' });
    setIsAddingNew(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, blogId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (blogId) {
          // Update existing blog
          setBlogs(blogs.map(blog => 
            blog.id === blogId ? { ...blog, image: imageUrl } : blog
          ));
        } else {
          // Update new blog
          setNewBlog({ ...newBlog, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset ALL blog data to original? This will restore all deleted items and remove all changes.')) {
      resetBlogDeletions();
      localStorage.setItem('blogData', JSON.stringify(blogData));
      setBlogs(blogData);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Blog Management</h2>
        <div className="admin-buttons">
          <button
            onClick={handleResetData}
            className="btn-secondary"
          >
            Reset to Original
          </button>
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
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
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
              <label>Slug (URL)</label>
              <input
                type="text"
                value={newBlog.slug}
                onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                placeholder="blog-post-url"
              />
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
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
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