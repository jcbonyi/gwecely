export type AdminRole = 'owner' | 'editor';

export interface AdminUserRecord {
  email: string;
  role: AdminRole;
  invitedBy?: string;
  createdAt: string;
  source: 'env' | 'database';
}

export interface AdminSession {
  email: string;
  role: AdminRole;
}

export interface SheetImportResult {
  created: number;
  updated: number;
  skipped: number;
  errors: { row: number; message: string }[];
}
