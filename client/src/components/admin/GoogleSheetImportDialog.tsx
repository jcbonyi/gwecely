import { useState } from 'react';
import { FileSpreadsheet, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { importAdminGoogleSheet } from '@/lib/adminApi';
import { SHOP_CATEGORIES } from '@shared/product';

interface GoogleSheetImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string;
  onComplete: () => void;
}

export default function GoogleSheetImportDialog({
  open,
  onOpenChange,
  token,
  onComplete,
}: GoogleSheetImportDialogProps) {
  const [sheetUrl, setSheetUrl] = useState('');
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (!sheetUrl.trim()) {
      toast.error('Paste your Google Sheet link');
      return;
    }
    setImporting(true);
    try {
      const result = await importAdminGoogleSheet(token, sheetUrl.trim());
      const summary = `${result.created} created, ${result.updated} updated`;
      if (result.errors.length > 0) {
        toast.warning(`${summary}. ${result.errors.length} row issue(s) — check console.`);
        console.warn('Sheet import issues:', result.errors);
      } else {
        toast.success(`Import complete: ${summary}`);
      }
      onOpenChange(false);
      setSheetUrl('');
      onComplete();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg font-['Inter']">
        <DialogHeader>
          <DialogTitle className="font-['Barlow_Condensed'] text-2xl">Import from Google Sheet</DialogTitle>
          <DialogDescription>
            Paste a shared Google Sheet link. Products are created or updated from each row.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Google Sheet URL</label>
            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F05A32]"
            />
          </div>

          <div className="rounded-lg bg-[#F5F3F2] p-3 text-xs text-gray-600 space-y-2">
            <p className="font-medium text-[#2D2626]">Sheet setup</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Row 1 headers: <code>name</code>, <code>category</code>, <code>price</code>, <code>image</code>, <code>description</code></li>
              <li>Optional: <code>id</code> (update existing), <code>inStock</code>, <code>status</code> (use <code>skip</code> to ignore a row)</li>
              <li>Share → General access → <strong>Anyone with the link</strong> → Viewer</li>
              <li>Image column: Google Drive link (Anyone with link) or any public image URL</li>
            </ol>
            <p>
              Categories:{' '}
              {SHOP_CATEGORIES.map((c) => c.id).join(', ')}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
            disabled={importing}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleImport()}
            disabled={importing}
            className="btn-gwecely text-sm py-2.5 px-5"
          >
            {importing ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />}
            {importing ? 'Importing…' : 'Import now'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
