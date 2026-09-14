/**
 * WhatsApp Integration Utilities for Prayxis Academy
 * Admin Contact: 7877716367 (+917877716367)
 */

export interface WhatsAppEnrollDetails {
  userId?: string;
  userName?: string;
  userEmail?: string;
  courseTitle: string;
  price?: number;
  offer?: string;
}

export function buildWhatsAppEnrollMessage(details: WhatsAppEnrollDetails): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    `🔥 *PRAYXIS ACADEMY - ENROLLMENT REQUEST* 🔥\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Student Name:* ${details.userName}\n` +
    `🆔 *Student ID:* ${details.userId}\n` +
    `📧 *Email:* ${details.userEmail}\n` +
    `📚 *Course:* ${details.courseTitle}\n` +
    `💰 *Offer Price:* ₹${details.price ?? 99} (Original: ₹999)\n` +
    `🎁 *Offer:* ${details.offer ?? 'Ganesh Chaturthi Special Offer (90% OFF)'}\n` +
    `📅 *Date:* ${dateStr}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `*Hello Admin, I have submitted my course enrollment request on the Prayxis portal. Please verify and approve my access.*`
  );
}

export function getWhatsAppEnrollUrl(details: WhatsAppEnrollDetails): string {
  const message = buildWhatsAppEnrollMessage(details);
  const phoneNumber = '917877716367'; // 7877716367 with country code 91
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
