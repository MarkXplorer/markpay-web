import imageCompression from 'browser-image-compression';

export interface ResizeOptions {
  maxWidthOrHeight?: number;
  maxSizeMB?: number;
  useWebWorker?: boolean;
  quality?: number;
}

export const autoResizeImage = async (
  file: File,
  options: ResizeOptions = {}
): Promise<File> => {
  const defaultOptions = {
    maxWidthOrHeight: 1200,
    maxSizeMB: 1.5,
    useWebWorker: true,
    quality: 0.85,
    ...options
  };

  try {
    // Check if image meets minimum resolution requirements
    const dimensions = await getImageDimensions(file);
    if (dimensions.width < 300 || dimensions.height < 300) {
      throw new Error('Resolusi gambar minimal 300×300 piksel');
    }

    const compressedFile = await imageCompression(file, defaultOptions);
    
    return compressedFile;
  } catch (error) {
    console.error('Error resizing image:', error);
    throw new Error('Gagal memproses gambar. Pastikan file valid dan resolusi minimal 300×300 piksel.');
  }
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to create preview'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    reader.readAsDataURL(file);
  });
};