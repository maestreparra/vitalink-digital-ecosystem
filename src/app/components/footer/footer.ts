import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MessageModalService } from '../../services/message-modal.service';
import { SiteDetectionService } from '../../services/site-detection.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.html',
})
export class FooterComponent {
  private messageModalService = inject(MessageModalService);
  private siteDetection = inject(SiteDetectionService);
  isExpress = this.siteDetection.isExpress;

  expressCertifications = [
    'express.codes.items.dot',
    'express.codes.items.ifta',
    'express.codes.items.insurance',
    'express.codes.items.safety',
  ];

  /**
   * Open the message method selection modal
   */
  openMessageModal(): void {
    this.messageModalService.openModal();
  }

}
