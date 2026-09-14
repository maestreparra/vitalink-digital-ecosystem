import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MessageModalService } from '../../services/message-modal.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './about.html',
})
export class AboutComponent {
  private messageModalService = inject(MessageModalService);

  openMessageModal(): void {
    this.messageModalService.openModal();
  }
}
