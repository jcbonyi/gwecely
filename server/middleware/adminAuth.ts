import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

function adminEmails(): string[] {
  return (process.env.CLERK_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(auth.userId);
    const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;

    if (!email) {
      return res.status(403).json({ error: "No email on account" });
    }

    const allowed = adminEmails();
    if (allowed.length === 0) {
      return res.status(503).json({ error: "Admin access not configured. Set CLERK_ADMIN_EMAILS." });
    }

    if (!allowed.includes(email.toLowerCase())) {
      return res.status(403).json({ error: "You are not authorized to manage the catalog" });
    }

    next();
  } catch (e) {
    console.error("[auth]", e);
    res.status(500).json({ error: "Authentication error" });
  }
}

// requireAuth must run before requireAdmin
export const adminAuth = [requireAuth(), requireAdmin] as const;
