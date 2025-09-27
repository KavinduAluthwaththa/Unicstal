'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { fetchCrystals, addCrystal, uploadImage } from '@/lib/supabaseApi';
import type { Crystal } from '@/types/crystal';
import { notifyCrystalDataUpdate, permanentlyDeleteCrystal } from '@/hooks/useReactiveData';
import { uploadFile, deleteFile, extractFilenameFromUrl, isLocalUpload } from '@/lib/fileUtils';

// Function to generate URL-friendly slug from name
const generateSlug = (name: string): string => {
  if (!name || name.trim() === '') {
    return `crystal-${Date.now()}`; // Fallback for empty names
  }
  
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  // Ensure slug is not empty after processing
  return slug || `crystal-${Date.now()}`;
};

const CrystalAdmin = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [newCrystal, setNewCrystal] = useState<Partial<Crystal>>({
    name: '',
    type: '',
    price: 0,
    image: '',
    description: '',
    slug: '',
    full_description: '',
    properties: [],
    chakras: [],
    origin: '',
    hardness: '',
    size: '',
    weight: ''
  });

  // Load from localStorage on mount, initialize if doesn't exist
  useEffect(() => {
    fetchCrystals().then(setCrystals);
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever crystals change (but not on initial load)
  // No localStorage syncing needed

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsAddingNew(false);
  };

  const handleSave = (id: string, updatedCrystal: Crystal) => {
    setCrystals(crystals.map(crystal => 
      crystal.id === id ? updatedCrystal : crystal
    ));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to PERMANENTLY delete this crystal? This cannot be undone and the item will never appear again.')) {
      const crystal = crystals.find(c => c.id === id);
      
      // Delete associated file if it's a local upload
      if (crystal && isLocalUpload(crystal.image)) {
        try {
          const filename = extractFilenameFromUrl(crystal.image);
          await deleteFile(filename);
        } catch (error) {
          console.error('Failed to delete file:', error);
        }
      }
      
      // Add to permanent deletion list
      permanentlyDeleteCrystal(id);
      // Remove from current state
      setCrystals(crystals.filter(crystal => crystal.id !== id));
    }
  };

  const handleAddNew = async () => {
    const crystal: Partial<Crystal> = {
      name: newCrystal.name || 'New Crystal',
      type: newCrystal.type || 'Healing Stone',
      price: newCrystal.price || 25,
      image: newCrystal.image || '/assets/images/crystal1.jpeg',
      description: newCrystal.description || '',
      slug: newCrystal.slug || generateSlug(newCrystal.name || 'new-crystal'),
      full_description: newCrystal.full_description || '',
      properties: newCrystal.properties || [],
      chakras: newCrystal.chakras || [],
      origin: newCrystal.origin || '',
      hardness: newCrystal.hardness || '',
      size: newCrystal.size || '',
      weight: newCrystal.weight || ''
    };
    await addCrystal(crystal);
    const updatedCrystals = await fetchCrystals();
    setCrystals(updatedCrystals);
    setNewCrystal({
      name: '',
      type: '',
      price: 0,
      image: '',
      description: '',
      slug: '',
      full_description: '',
      properties: [],
      chakras: [],
      origin: '',
      hardness: '',
      size: '',
      weight: ''
    });
    setIsAddingNew(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file, 'crystal-images');
        setNewCrystal({ ...newCrystal, image: url });
      } catch (error) {
        console.error('Failed to upload image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };



  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Crystal Management</h2>
        <div className="admin-buttons">
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add New Crystal
          </button>
        </div>
      </div>

      {/* Add New Crystal Form */}
      {isAddingNew && (
        <div className="admin-form-card">
          <h3>Add New Crystal</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={newCrystal.name}
                onChange={(e) => {
                  const name = e.target.value;
                  const generatedSlug = generateSlug(name);
                  console.log('💎 Crystal Admin - Generated slug:', generatedSlug, 'from name:', name);
                  setNewCrystal({ 
                    ...newCrystal, 
                    name: name,
                    slug: generatedSlug
                  });
                }}
                placeholder="Crystal name"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                value={newCrystal.type}
                onChange={(e) => setNewCrystal({ ...newCrystal, type: e.target.value })}
                placeholder="Crystal type"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={newCrystal.price}
                onChange={(e) => setNewCrystal({ ...newCrystal, price: parseInt(e.target.value) || 0 })}
                placeholder="25"
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
              {newCrystal.image && (
                <div className="image-preview">
                  <img src={newCrystal.image} alt="Preview" />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={newCrystal.description || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, description: e.target.value })}
                placeholder="Short description"
              />
            </div>
            <div className="form-group">
              <label>Slug (URL) - Auto-generated</label>
              <input
                type="text"
                value={newCrystal.slug || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, slug: e.target.value })}
                placeholder="auto-generated-from-name"
                style={{ backgroundColor: '#f8fafc' }}
              />
              <small style={{ color: '#64748b', fontSize: '0.8rem' }}>
                Auto-generated from name. You can edit if needed.
              </small>
            </div>
            <div className="form-group full-width">
              <label>Full Description</label>
              <textarea
                value={newCrystal.full_description || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, full_description: e.target.value })}
                placeholder="Detailed description for the crystal page"
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>Properties (comma separated)</label>
              <input
                type="text"
                value={newCrystal.properties?.join(', ') || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, properties: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                placeholder="Healing, Protection, Energy"
              />
            </div>
            <div className="form-group">
              <label>Chakras (comma separated)</label>
              <input
                type="text"
                value={newCrystal.chakras?.join(', ') || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, chakras: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                placeholder="Crown, Third Eye, Heart"
              />
            </div>
            <div className="form-group">
              <label>Origin</label>
              <input
                type="text"
                value={newCrystal.origin || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, origin: e.target.value })}
                placeholder="Brazil, Madagascar, etc."
              />
            </div>
            <div className="form-group">
              <label>Hardness</label>
              <input
                type="text"
                value={newCrystal.hardness || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, hardness: e.target.value })}
                placeholder="7 on Mohs scale"
              />
            </div>
            <div className="form-group">
              <label>Size</label>
              <input
                type="text"
                value={newCrystal.size || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, size: e.target.value })}
                placeholder="2-3 inches"
              />
            </div>
            <div className="form-group">
              <label>Weight</label>
              <input
                type="text"
                value={newCrystal.weight || ''}
                onChange={(e) => setNewCrystal({ ...newCrystal, weight: e.target.value })}
                placeholder="150-200g"
              />
            </div>
          </div>
          <div className="form-actions">
            <button onClick={handleAddNew} className="btn-success">
              <Save size={16} />
              Save Crystal
            </button>
            <button onClick={() => setIsAddingNew(false)} className="btn-secondary">
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Crystals Grid */}
      <div className="admin-grid">
        {crystals.map((crystal) => (
          <CrystalCard
            key={crystal.id}
            crystal={crystal}
            isEditing={editingId === crystal.id}
            onEdit={() => handleEdit(crystal.id)}
            onSave={(updated) => handleSave(crystal.id, updated)}
            onDelete={() => handleDelete(crystal.id)}
            onCancel={() => setEditingId(null)}
            onImageUpload={handleImageUpload}
          />
        ))}
      </div>
    </div>
  );
};

interface CrystalCardProps {
  crystal: Crystal;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (crystal: Crystal) => void;
  onDelete: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CrystalCard: React.FC<CrystalCardProps> = ({
  crystal,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  onImageUpload
}) => {
  const [editData, setEditData] = useState(crystal);

  const handleSave = () => {
    onSave(editData);
  };

  if (isEditing) {
    return (
      <div className="admin-card editing">
        <div className="card-image">
          <img src={editData.image} alt={editData.name} />
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
            value={editData.name}
            onChange={(e) => {
              const name = e.target.value;
              setEditData({ 
                ...editData, 
                name: name,
                slug: generateSlug(name)
              });
            }}
            className="edit-input"
            placeholder="Name"
          />
          <input
            type="text"
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
            className="edit-input"
            placeholder="Type"
          />
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) || 0 })}
            className="edit-input"
            placeholder="Price"
          />
          <input
            type="text"
            value={editData.description || ''}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="edit-input"
            placeholder="Description"
          />
          <input
            type="text"
            value={editData.slug || ''}
            onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
            className="edit-input"
            placeholder="Slug"
          />
          <textarea
            value={editData.full_description || ''}
            onChange={(e) => setEditData({ ...editData, full_description: e.target.value })}
            className="edit-input"
            placeholder="Full Description"
            rows={3}
          />
          <input
            type="text"
            value={editData.properties?.join(', ') || ''}
            onChange={(e) => setEditData({ ...editData, properties: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            className="edit-input"
            placeholder="Properties (comma separated)"
          />
          <input
            type="text"
            value={editData.chakras?.join(', ') || ''}
            onChange={(e) => setEditData({ ...editData, chakras: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            className="edit-input"
            placeholder="Chakras (comma separated)"
          />
          <input
            type="text"
            value={editData.origin || ''}
            onChange={(e) => setEditData({ ...editData, origin: e.target.value })}
            className="edit-input"
            placeholder="Origin"
          />
          <input
            type="text"
            value={editData.hardness || ''}
            onChange={(e) => setEditData({ ...editData, hardness: e.target.value })}
            className="edit-input"
            placeholder="Hardness"
          />
          <input
            type="text"
            value={editData.size || ''}
            onChange={(e) => setEditData({ ...editData, size: e.target.value })}
            className="edit-input"
            placeholder="Size"
          />
          <input
            type="text"
            value={editData.weight || ''}
            onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
            className="edit-input"
            placeholder="Weight"
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
    <div className="admin-card">
      <div className="card-image">
        <img src={crystal.image} alt={crystal.name} />
      </div>
      <div className="card-content">
        <h4>{crystal.name}</h4>
        <p className="card-type">{crystal.type}</p>
        <p className="card-price">${crystal.price}</p>
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

export default CrystalAdmin;