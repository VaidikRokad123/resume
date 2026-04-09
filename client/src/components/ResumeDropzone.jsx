import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ResumeDropzone = ({ onFileSelect, fileName, loading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10485760, // 10MB
    multiple: false,
    disabled: loading
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      {fileName ? (
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-medium">{fileName}</span>
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume, or click to browse'}
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF or DOCX (max 10MB)</p>
        </>
      )}
    </div>
  );
};

export default ResumeDropzone;
