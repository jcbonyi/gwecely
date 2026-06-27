export function bootstrapOwnerEmails(): string[] {
  return (process.env.CLERK_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
