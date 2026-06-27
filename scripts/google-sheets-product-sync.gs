/**
 * Gwecely — Google Sheets product sync (no Zapier required)
 *
 * SETUP (one time, ~10 minutes):
 * 1. Create a Google Sheet with these columns in row 1:
 *    name | category | price | image | description | inStock | status
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Project Settings → Script properties → add AUTOMATION_API_KEY (same as Vercel)
 * 4. Reload the sheet → menu "Gwecely" → Authorize → Sync products now
 *
 * USAGE (for staff):
 * - Add a new row with product details
 * - Put a Google Drive image link in the "image" column (share → Anyone with the link)
 * - Leave "status" empty (or "pending")
 * - Run Gwecely → Sync products now (or set a time trigger for hourly sync)
 *
 * Categories: spare-parts, batteries, tyres, engine-oils, filters,
 *   office-stationery, furniture, it-equipment, safety-equipment, dry-foods
 */

const API_BASE = 'https://gwecely.vercel.app/api/automation/products';

function getApiKey_() {
  const key = PropertiesService.getScriptProperties().getProperty('AUTOMATION_API_KEY');
  if (!key) {
    throw new Error('Set AUTOMATION_API_KEY in Apps Script → Project Settings → Script properties');
  }
  return key;
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Gwecely')
    .addItem('Sync products now', 'syncPendingProducts')
    .addItem('Install hourly auto-sync', 'installHourlyTrigger')
    .addToUi();
}

function installHourlyTrigger() {
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === 'syncPendingProducts') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('syncPendingProducts').timeBased().everyHours(1).create();
  SpreadsheetApp.getUi().alert('Hourly sync enabled. New rows sync automatically within an hour.');
}

function syncPendingProducts() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return;

  const headers = data[0].map((h) => String(h).trim().toLowerCase());
  const col = (name) => headers.indexOf(name);

  const nameCol = col('name');
  const categoryCol = col('category');
  const priceCol = col('price');
  const imageCol = col('image');
  const descCol = col('description');
  const stockCol = col('instock');
  const statusCol = col('status');
  const idCol = col('id');

  if (nameCol < 0 || categoryCol < 0 || priceCol < 0 || imageCol < 0 || descCol < 0) {
    throw new Error('Sheet must have columns: name, category, price, image, description');
  }

  const apiKey = getApiKey_();

  for (let row = 1; row < data.length; row++) {
    const status = statusCol >= 0 ? String(data[row][statusCol] || '').trim().toLowerCase() : '';
    if (status === 'synced' || status === 'skip') continue;

    const name = String(data[row][nameCol] || '').trim();
    if (!name) continue;

    const payload = {
      name,
      category: String(data[row][categoryCol] || '').trim(),
      price: Number(data[row][priceCol]),
      image: String(data[row][imageCol] || '').trim(),
      description: String(data[row][descCol] || '').trim(),
      inStock: stockCol >= 0 ? String(data[row][stockCol]).toLowerCase() !== 'false' : true,
    };

    const existingId = idCol >= 0 ? String(data[row][idCol] || '').trim() : '';
    const method = existingId ? 'PUT' : 'POST';
    const url = existingId ? `${API_BASE}/${existingId}` : API_BASE;

    try {
      const response = UrlFetchApp.fetch(url, {
        method,
        contentType: 'application/json',
        headers: { 'X-Automation-Key': apiKey },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
      });

      const code = response.getResponseCode();
      const body = JSON.parse(response.getContentText() || '{}');

      if (code >= 200 && code < 300) {
        if (statusCol >= 0) sheet.getRange(row + 1, statusCol + 1).setValue('synced');
        if (idCol >= 0 && body.id) sheet.getRange(row + 1, idCol + 1).setValue(body.id);
        if (body.imageWarning && statusCol >= 0) {
          sheet.getRange(row + 1, statusCol + 1).setValue('synced (image warning)');
        }
      } else {
        const err = body.error || `HTTP ${code}`;
        if (statusCol >= 0) sheet.getRange(row + 1, statusCol + 1).setValue(`error: ${err}`);
      }
    } catch (e) {
      if (statusCol >= 0) sheet.getRange(row + 1, statusCol + 1).setValue(`error: ${e.message}`);
    }
  }
}
