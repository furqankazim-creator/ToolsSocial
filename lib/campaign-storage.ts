import type { CampaignData, CampaignInput } from './types';

export interface StoredCampaign {
  campaign: CampaignData;
  input: CampaignInput;
  warnings: string[];
}

async function openStorage(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('crazze-campaigns', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('campaigns');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadCampaign(brand: string): Promise<StoredCampaign | undefined> {
  const db = await openStorage();
  try {
    return await new Promise((resolve, reject) => {
      const request = db.transaction('campaigns').objectStore('campaigns').get(brand);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export async function saveCampaign(brand: string, campaign: StoredCampaign): Promise<void> {
  const db = await openStorage();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('campaigns', 'readwrite');
      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(transaction.error);
      transaction.onerror = () => reject(transaction.error);
      transaction.objectStore('campaigns').put(campaign, brand);
    });
  } finally {
    db.close();
  }
}
