/** Normalize Zapier / Make payloads into a flat product field object. */
export function unwrapAutomationPayload(raw: unknown): Record<string, unknown> {
  if (raw == null) return {};
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return {};
    try {
      return unwrapAutomationPayload(JSON.parse(trimmed));
    } catch {
      return {};
    }
  }
  if (typeof raw !== 'object' || Array.isArray(raw)) return {};

  const obj = raw as Record<string, unknown>;
  if (typeof obj.name === 'string' && obj.name.trim()) return obj;

  if (typeof obj.data === 'string' && obj.data.trim()) {
    try {
      return unwrapAutomationPayload(JSON.parse(obj.data));
    } catch {
      /* fall through */
    }
  }

  for (const key of ['payload', 'body', 'product', 'json']) {
    const nested = obj[key];
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      const flat = unwrapAutomationPayload(nested);
      if (typeof flat.name === 'string' && flat.name.trim()) return flat;
    }
    if (typeof nested === 'string' && nested.trim()) {
      const flat = unwrapAutomationPayload(nested);
      if (typeof flat.name === 'string' && flat.name.trim()) return flat;
    }
  }

  const keys = Object.keys(obj);
  if (keys.length === 1) {
    const key = keys[0];
    const value = obj[key];
    if ((value === '' || value == null) && key.trim().startsWith('{')) {
      try {
        return unwrapAutomationPayload(JSON.parse(key));
      } catch {
        /* fall through */
      }
    }
  }

  return obj;
}

export function parseAutomationBodyText(
  text: string,
  contentType = 'application/json'
): Record<string, unknown> {
  const ct = contentType.split(';')[0].trim().toLowerCase();
  if (!text.trim()) return {};

  if (ct === 'application/x-www-form-urlencoded') {
    return unwrapAutomationPayload(Object.fromEntries(new URLSearchParams(text)));
  }

  return unwrapAutomationPayload(JSON.parse(text));
}
