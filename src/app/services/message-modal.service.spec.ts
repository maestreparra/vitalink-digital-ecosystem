import { buildMessageUrl } from './message-modal.service';

describe('buildMessageUrl', () => {
  it('adds an encoded draft to WhatsApp links', () => {
    expect(buildMessageUrl('whatsapp', '17279472309', 'Hello VitaLink\nName: Jordan Lee')).toBe(
      'https://wa.me/17279472309?text=Hello%20VitaLink%0AName%3A%20Jordan%20Lee',
    );
  });

  it('keeps a direct SMS link when no draft exists', () => {
    expect(buildMessageUrl('sms', '17279472309', '')).toBe('sms:17279472309');
  });
});
