import { Injectable, signal } from '@angular/core';
import { MessageMethod } from '../components/select-message-modal/select-message-modal';

export function buildMessageUrl(
  method: MessageMethod,
  phoneNumber: string,
  messageDraft: string,
): string {
  const encodedMessage = encodeURIComponent(messageDraft);
  if (method === 'sms') {
    return encodedMessage
      ? `sms:${phoneNumber}?body=${encodedMessage}`
      : `sms:${phoneNumber}`;
  }
  return encodedMessage
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://wa.me/${phoneNumber}`;
}

@Injectable({
  providedIn: 'root',
})
export class MessageModalService {
  showModal = signal(false);
  messageDraft = signal('');

  /**
   * Open the message method selection modal
   */
  openModal(messageDraft: string = ''): void {
    this.messageDraft.set(messageDraft);
    this.showModal.set(true);
  }

  /**
   * Close the message method selection modal
   */
  closeModal(): void {
    this.showModal.set(false);
  }

  /**
   * Handle message method selection
   * @param method Selected communication method ('sms' or 'whatsapp')
   */
  handleMethodSelection(method: MessageMethod): void {
    const phoneNumber = '17279472309';
    window.location.href = buildMessageUrl(method, phoneNumber, this.messageDraft());

    this.closeModal();
  }
}
