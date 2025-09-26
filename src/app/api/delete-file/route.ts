import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Construct the file path
    const filePath = path.join(process.cwd(), 'public/assets/uploads', filename);
    
    // Delete the file
    await unlink(filePath);
    
    return NextResponse.json({ 
      success: true, 
      message: 'File deleted successfully' 
    });
    
  } catch (error) {
    console.error('File deletion error:', error);
    // If file doesn't exist, still return success
  if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ 
        success: true, 
        message: 'File already deleted or not found' 
      });
    }
    
    return NextResponse.json({ error: 'File deletion failed' }, { status: 500 });
  }
}