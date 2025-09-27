// Delete a blog by id
export async function deleteBlog(id: string) {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Delete a crystal by id
export async function deleteCrystal(id: string) {
  const { error } = await supabase
    .from('crystals')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Delete an image from Supabase Storage
export async function deleteImageFromStorage(bucket: string, fileName: string) {
  // fileName should be the full path inside the bucket, e.g. 'myimage.png' or 'uploads/blog_12345.jpeg'
  const { data, error } = await supabase.storage.from(bucket).remove([fileName]);
  if (error) {
    throw new Error(`Failed to delete image from storage: ${error.message}`);
  }
}
import { supabase } from './supabaseClient';
import type { BlogPost } from '@/types/blog';
import type { Crystal } from '@/types/crystal';

// Fetch all blogs
export async function fetchBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Add a new blog
export async function addBlog(blog: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blogs')
    .insert([blog]);
  if (error) throw error;
  return data;
}

// Fetch all crystals
export async function fetchCrystals(): Promise<Crystal[]> {
  const { data, error } = await supabase
    .from('crystals')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

// Add a new crystal
export async function addCrystal(crystal: Partial<Crystal>) {
  const { data, error } = await supabase
    .from('crystals')
    .insert([crystal]);
  if (error) throw error;
  return data;
}

// Upload image to Supabase Storage
export async function uploadImage(file: File, bucket: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(file.name, file, { upsert: true });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(file.name).data.publicUrl;
}
