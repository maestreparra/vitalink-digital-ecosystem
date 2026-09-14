import { TestBed } from '@angular/core/testing';
import { SelectMessageModalComponent } from './select-message-modal';

describe('SelectMessageModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMessageModalComponent],
    }).compileComponents();
  });

  it('closes when Escape is pressed', () => {
    const fixture = TestBed.createComponent(SelectMessageModalComponent);
    const component = fixture.componentInstance;
    const closeSpy = jasmine.createSpy('close');
    component.closeModalEvent.subscribe(closeSpy);
    fixture.componentRef.setInput('showModal', true);
    fixture.detectChanges();

    component.handleKeyboard(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(closeSpy).toHaveBeenCalled();
  });

  it('renders a single labelled modal dialog', () => {
    const fixture = TestBed.createComponent(SelectMessageModalComponent);
    fixture.componentRef.setInput('showModal', true);
    fixture.detectChanges();

    const dialogs = fixture.nativeElement.querySelectorAll('[role="dialog"]');
    expect(dialogs.length).toBe(1);
    expect(dialogs[0].getAttribute('aria-labelledby')).toBe('message-modal-headline');
  });
});
