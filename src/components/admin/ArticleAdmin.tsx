'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { articleData } from '@/data/articles';
import type { Article } from '@/data/articles';
import { notifyArticleDataUpdate, permanentlyDeleteArticle } from '@/hooks/useReactiveData';
import { uploadFile, deleteFile, extractFilenameFromUrl, isLocalUpload } from '@/lib/fileUtils';

const ArticleAdmin = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    category: 'HIGH QUALITY',
    image: '',
    likes: 0,
    description: ''
  });

  // Load from localStorage on mount, initialize if doesn't exist
  useEffect(() => {
    const saved = localStorage.getItem('articleData');
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      // Initialize with original data and save to localStorage
      localStorage.setItem('articleData', JSON.stringify(articleData));
      setArticles(articleData);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever articles change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('articleData', JSON.stringify(articles));
      notifyArticleDataUpdate(); // Notify other components of the change
    }
  }, [articles, isInitialized]);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsAddingNew(false);
  };

  const handleSave = (id: string, updatedArticle: Article) => {
    setArticles(articles.map(article => 
      article.id === id ? updatedArticle : article
    ));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to PERMANENTLY delete this article? This cannot be undone and the item will never appear again.')) {
      const article = articles.find(a => a.id === id);
      
      // Delete associated file if it's a local upload
      if (article && isLocalUpload(article.image)) {
        try {
          const filename = extractFilenameFromUrl(article.image);
          await deleteFile(filename);
        } catch (error) {
          console.error('Failed to delete file:', error);
        }
      }
      
      // Add to permanent deletion list
      permanentlyDeleteArticle(id);
      // Remove from current state
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const handleAddNew = () => {
    const maxId = Math.max(...articles.map(a => parseInt(a.id)));
    const newId = (maxId + 1).toString();
    
    const article: Article = {
      id: newId,
      title: newArticle.title || 'New Article',
      category: newArticle.category || 'HIGH QUALITY',
      image: newArticle.image || '/assets/images/crystal1.jpeg',
      likes: newArticle.likes || 0,
      description: newArticle.description || 'New article description'
    };

    setArticles([...articles, article]);
    setNewArticle({ title: '', category: 'HIGH QUALITY', image: '', likes: 0, description: '' });
    setIsAddingNew(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, articleId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadFile(file, 'article');
        
        if (articleId) {
          // Delete old file if it exists and is a local upload
          const existingArticle = articles.find(a => a.id === articleId);
          if (existingArticle && isLocalUpload(existingArticle.image)) {
            const oldFilename = extractFilenameFromUrl(existingArticle.image);
            await deleteFile(oldFilename).catch(console.error);
          }
          
          // Update existing article
          setArticles(articles.map(article => 
            article.id === articleId ? { ...article, image: result.url } : article
          ));
        } else {
          // Update new article
          setNewArticle({ ...newArticle, image: result.url });
        }
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const categories = ['HIGH QUALITY', 'PREMIUM', 'CALM', 'PROTECT', 'CLEAN'];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Article Management</h2>
        <div className="admin-buttons">
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add New Article
          </button>
        </div>
      </div>

      {/* Add New Article Form */}
      {isAddingNew && (
        <div className="admin-form-card">
          <h3>Add New Article</h3>
          <div className="form-grid article-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                placeholder="Article title"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={newArticle.category}
                onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Likes</label>
              <input
                type="number"
                value={newArticle.likes}
                onChange={(e) => setNewArticle({ ...newArticle, likes: parseInt(e.target.value) })}
                placeholder="Number of likes"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newArticle.description}
                onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                placeholder="Article description"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
              {newArticle.image && (
                <div className="image-preview">
                  <img src={newArticle.image} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          <div className="form-actions">
            <button onClick={handleAddNew} className="btn-primary">
              <Save size={16} />
              Save Article
            </button>
            <button onClick={() => setIsAddingNew(false)} className="btn-secondary">
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="admin-grid article-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isEditing={editingId === article.id}
            onEdit={() => handleEdit(article.id)}
            onSave={(updatedArticle) => handleSave(article.id, updatedArticle)}
            onDelete={() => handleDelete(article.id)}
            onCancel={() => setEditingId(null)}
            onImageUpload={(e) => handleImageUpload(e, article.id)}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
};

interface ArticleCardProps {
  article: Article;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (article: Article) => void;
  onDelete: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  onImageUpload,
  categories
}) => {
  const [editData, setEditData] = useState<Article>(article);

  useEffect(() => {
    setEditData(article);
  }, [article]);

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div className="admin-card editing">
        <div className="admin-card-image">
          <img src={editData.image} alt={editData.title} />
          <div className="image-upload-overlay">
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="image-upload-input"
            />
          </div>
        </div>
        <div className="admin-card-content">
          <div className="form-grid article-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Likes</label>
              <input
                type="number"
                value={editData.likes}
                onChange={(e) => setEditData({ ...editData, likes: parseInt(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="admin-card-actions">
            <button onClick={handleSave} className="btn-primary">
              <Save size={16} />
              Save
            </button>
            <button onClick={onCancel} className="btn-secondary">
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="card-image">
        <img src={article.image} alt={article.title} />
        <div className="card-category">{article.category}</div>
      </div>
      <div className="card-content">
        <h4>{article.title}</h4>
        <p className="card-description">{article.description}</p>
        <div className="card-meta">
          <span className="meta-item likes">{article.likes} likes</span>
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

export default ArticleAdmin;