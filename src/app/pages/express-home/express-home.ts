import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MessageModalService } from '../../services/message-modal.service';

@Component({
  selector: 'app-express-home',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './express-home.html',
  styleUrls: ['./express-home.css']
})
export class ExpressHomeComponent implements OnInit {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  currentLanguage = 'en';

  sectors = [
    { key: 'automobiles' },
    { key: 'agriculture' },
    { key: 'food-beverage' },
    { key: 'machinery' }
  ];

  constructor(public messageModalService: MessageModalService) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }

  openMessageModal(): void {
    this.messageModalService.openModal();
  }
}
