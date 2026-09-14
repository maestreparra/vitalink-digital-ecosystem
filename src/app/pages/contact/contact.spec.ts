import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact';
import { MessageModalService } from '../../services/message-modal.service';
import { provideRouter } from '@angular/router';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('does not report a successful network submission', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    const messageModal = TestBed.inject(MessageModalService);
    spyOn(messageModal, 'openModal');

    component.updateField('fullName', 'Jordan Lee');
    component.updateField('phone', '+1 555 123 4567');
    component.updateField('email', 'jordan@example.com');
    component.updateField('origin', 'Clinic A');
    component.updateField('destination', 'Lab B');
    component.updateField('cargoType', 'Laboratory Specimens');

    component.onSubmit(new Event('submit'));

    expect(component.handoffRequired()).toBeTrue();
    expect(messageModal.openModal).toHaveBeenCalled();
    expect(messageModal.openModal).toHaveBeenCalledWith(
      jasmine.stringContaining('Jordan Lee'),
    );
  });

  it('keeps the handoff closed when required fields are invalid', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    const messageModal = TestBed.inject(MessageModalService);
    spyOn(messageModal, 'openModal');

    component.onSubmit(new Event('submit'));

    expect(component.handoffRequired()).toBeFalse();
    expect(component.showError('fullName')).toBeTrue();
    expect(messageModal.openModal).not.toHaveBeenCalled();
  });

  it('stores validation errors as translation keys', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    component.onSubmit(new Event('submit'));

    expect(component.f.fullName.error).toBe('contact.form.errors.fullNameRequired');
    expect(component.f.phone.error).toBe('contact.form.errors.phoneRequired');
  });
});
