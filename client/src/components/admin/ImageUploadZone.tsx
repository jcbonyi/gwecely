import { useCallback, useRef, useState } from 'react';
import { ImagePlus, Loader2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

interface ImageUploadZoneProps {
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File, onProgress: (percent: number) => void) => Promise<string>;
  disabled?: boolean;
  showError?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

export default function ImageUploadZone({
  value,
  onChange,
  onUpload,
  disabled,
  showError,
  onUploadingChange,
}: ImageUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const runUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      onUploadingChange?.(true);
      setProgress(0);
      try {
        const url = await onUpload(file, setProgress);
        onChange(url);
      } finally {
        setUploading(false);
        onUploadingChange?.(false);
        setProgress(0);
      }
    },
    [onChange, onUpload]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file || disabled || uploading) return;
      void runUpload(file);
    },
    [disabled, uploading, runUpload]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        disabled={disabled || uploading}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onClick={() => !uploading && !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && !uploading) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          'relative rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer',
          dragOver ? 'border-[#F05A32] bg-[#F05A32]/5' : 'border-gray-200 bg-[#FAFAF9] hover:border-[#F05A32]/50',
          (disabled || uploading) && 'pointer-events-none opacity-70'
        )}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <Loader2 className="h-8 w-8 text-[#F05A32] animate-spin" />
            <p className="text-sm font-medium text-[#2D2626] font-['Inter']">
              {progress <= 5 ? 'Preparing image…' : `Uploading… ${progress}%`}
            </p>
            <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F05A32] transition-all duration-200"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F05A32]/10 text-[#F05A32]">
              <ImagePlus size={24} />
            </div>
            <p className="text-sm font-medium text-[#2D2626] font-['Inter']">
              Drag & drop an image here, or <span className="text-[#F05A32]">browse</span>
            </p>
            <p className="text-xs text-gray-500 font-['Inter']">JPEG, PNG, WebP, GIF — max 5 MB</p>
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-['Inter'] mt-1">
              <Upload size={14} />
              Uploads go directly to Cloudinary
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Image URL <span className="text-gray-400 font-normal">(auto-filled after upload)</span>
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Upload above, or paste https://… or /products/…"
          className={cn(
            'w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#F05A32]',
            showError && !value.trim() ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
          )}
          disabled={disabled || uploading}
        />
        {showError && !value.trim() && (
          <p className="mt-1 text-xs text-red-600 font-['Inter']">Upload an image or enter an image URL.</p>
        )}
      </div>

      {value && (
        <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
      )}
    </div>
  );
}
