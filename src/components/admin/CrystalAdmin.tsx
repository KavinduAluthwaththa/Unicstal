'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { crystalData } from '@/data/crystals';
import type { Crystal } from '@/data/crystals';

const CrystalAdmin = () => {
  const [crystals, setCrystals] = useState<Crystal[]>(crystalData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCrystal, setNewCrystal] = useState<Partial<Crystal>>({
    name: '',
    type: '',
    price: 0,
    image: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('crystalData');
    if (saved) {
      setCrystals(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever crystals change
  useEffect(() => {
    localStorage.setItem('crystalData', JSON.stringify(crystals));
  }, [crystals]);

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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this crystal?')) {
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, crystalId?: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (crystalId) {
          // Update existing crystal
          setCrystals(crystals.map(crystal => 
            crystal.id === crystalId ? { ...crystal, image: imageUrl } : crystal
          ));
        } else {
          // Update new crystal
          setNewCrystal({ ...newCrystal, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Crystal Management</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add New Crystal
        </button>
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