import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MessageModalService } from '../../services/message-modal.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './services.html',
})
export class ServicesComponent {
  private messageModalService = inject(MessageModalService);

  openMessageModal(): void {
    this.messageModalService.openModal();
  }
}
