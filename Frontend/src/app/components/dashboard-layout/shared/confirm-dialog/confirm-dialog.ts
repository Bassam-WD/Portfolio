import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  title = input('Are you sure?');
  message = input('This action cannot be undone.');
  confirmText = input('Delete');

  confirmed = output<void>();
  cancelled = output<void>();
}
