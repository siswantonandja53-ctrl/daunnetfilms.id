import * as CryptoJS from 'crypto-js';

// Use environment variable for encryption key in production
const ENCRYPTION_KEY = process.env.VIDEO_ENCRYPTION_KEY || 'default-video-key-2024';

export function encryptVideoUrl(url: string): string {
  try {
    const encrypted = CryptoJS.AES.encrypt(url, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Error encrypting video URL:', error);
    return url; // Fallback to original URL
  }
}

export function decryptVideoUrl(encryptedUrl: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedUrl, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || encryptedUrl; // Fallback if decryption fails
  } catch (error) {
    console.error('Error decrypting video URL:', error);
    return encryptedUrl; // Fallback to encrypted URL
  }
}

// Generate a time-limited token for additional security
export function generateVideoToken(lessonId: string, userId?: string): string {
  const timestamp = Date.now();
  const expiresIn = 2 * 60 * 60 * 1000; // 2 hours
  const expiryTime = timestamp + expiresIn;
  
  const tokenData = {
    lessonId,
    userId: userId || 'anonymous',
    timestamp,
    expiryTime
  };
  
  return CryptoJS.AES.encrypt(JSON.stringify(tokenData), ENCRYPTION_KEY).toString();
}

export function validateVideoToken(token: string, lessonId: string): boolean {
  try {
    const bytes = CryptoJS.AES.decrypt(token, ENCRYPTION_KEY);
    const tokenData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    const now = Date.now();
    
    return (
      tokenData.lessonId === lessonId &&
      tokenData.expiryTime > now &&
      tokenData.timestamp <= now
    );
  } catch (error) {
    console.error('Error validating video token:', error);
    return false;
  }
}