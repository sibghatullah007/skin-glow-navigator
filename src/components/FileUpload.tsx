
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  translations: {
    upload_prompt: string;
    choose_file: string;
  };
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, translations }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`drop-zone ${isDragActive ? 'active' : ''} cursor-pointer text-center`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <Image className="w-12 h-12 mx-auto text-primary/50" />
        <div className="text-lg text-primary/80">
          {translations.upload_prompt}
        </div>
        <Button variant="outline">
          {translations.choose_file}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
