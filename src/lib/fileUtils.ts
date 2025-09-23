export const uploadFile = async (file: File, type: 'crystal' | 'blog' | 'article') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
};

export const deleteFile = async (filename: string) => {
  const response = await fetch('/api/delete-file', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Delete failed');
  }

  return response.json();
};

export const extractFilenameFromUrl = (url: string): string => {
  if (url.startsWith('/assets/uploads/')) {
    return url.split('/').pop() || '';
  }
  return '';
};

export const isLocalUpload = (url: string): boolean => {
  return url.startsWith('/assets/uploads/');
};