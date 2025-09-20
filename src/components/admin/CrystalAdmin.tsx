'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { crystalData } from '@/data/crystals';
import type { Crystal } from '@/data/crystals';
import { notifyCrystalDataUpdate, permanentlyDeleteCrystal, resetCrystalDeletions } from '@/hooks/useReactiveData';
import { uploadFile, deleteFile, extractFilenameFromUrl, isLocalUpload } from '@/lib/fileUtils';

const CrystalAdmin = () => {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [newCrystal, setNewCrystal] = useState<Partial<Crystal>>({
    name: '',
    type: '',
    price: 0,
    image: ''
  });

  // Load from localStorage on mount, initialize if doesn't exist
  useEffect(() => {
    const saved = localStorage.getItem('crystalData');
    if (saved) {
      setCrystals(JSON.parse(saved));
    } else {
      // Initialize with original data and save to localStorage
      localStorage.setItem('crystalData', JSON.stringify(crystalData));
      setCrystals(crystalData);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever crystals change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('crystalData', JSON.stringify(crystals));
      notifyCrystalDataUpdate(); // Notify other components of the change
    }
  }, [crystals, isInitialized]);

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

  const handleAddNew = () => {
    const maxId = Math.max(...crystals.map(c => parseInt(c.id)));
    const newId = (maxId + 1).toString();
    
    const crystal: Crystal = {
      id: newId,
      name: newCrystal.name || 'New Crystal',
      type: newCrystal.type || 'Healing Stone',
      price: newCrystal.price || 25,
      image: newCrystal.image || '/assets/images/crystal1.jpeg'
    };

    setCrystals([...crystals, crystal]);
    setNewCrystal({ name: '', type: '', price: 0, image: '' });
    setIsAddingNew(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, crystalId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadFile(file, 'crystal');
        
        if (crystalId) {
          // Delete old file if it exists and is a local upload
          const existingCrystal = crystals.find(c => c.id === crystalId);
          if (existingCrystal && isLocalUpload(existingCrystal.image)) {
            const oldFilename = extractFilenameFromUrl(existingCrystal.image);
            await deleteFile(oldFilename).catch(console.error);
          }
          
          // Update existing crystal
          setCrystals(crystals.map(crystal => 
            crystal.id === crystalId ? { ...crystal, image: result.url } : crystal
          ));
        } else {
          // Update new crystal
          setNewCrystal({ ...newCrystal, image: result.url });
        }
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset ALL crystal data to original? This will restore all deleted items and remove all changes.')) {
      resetCrystalDeletions();
      localStorage.setItem('crystalData', JSON.stringify(crystalData));
      setCrystals(crystalData);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Crystal Management</h2>
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
                onChange={(e) => setNewCrystal({ ...newCrystal, name: e.target.value })}
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
            onImageUpload={(e) => handleImageUpload(e, crystal.id)}
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
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="edit-input"
          />
          <input
            type="text"
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
            className="edit-input"
          />
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) || 0 })}
            className="edit-input"
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