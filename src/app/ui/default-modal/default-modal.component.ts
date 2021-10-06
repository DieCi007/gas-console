import { Component, Inject } from '@angular/core';
import { IAction, IDefaultModalInjectionData, MODAL_DATA } from '../modal.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss'],
  animations: [
    fadeInOnEnterAnimation({duration: 300}),
  ]
})
export class DefaultModalComponent {
  title: string;
  primaryText: string;
  secondaryText: string;
  htmlContent: string;
  actions: IAction[];
  overlayRef: OverlayRef;

  constructor(
    @Inject(MODAL_DATA) public data: IDefaultModalInjectionData
  ) {
    this.title = data.title;
    this.primaryText = data.primaryText;
    this.secondaryText = data.secondaryText;
    this.htmlContent = data.html;
    this.actions = data.actions;
    this.overlayRef = data.overlayRef;
  }

  emitAction(action: IAction): void {
    action.click.emit();
    this.overlayRef.dispose();
  }
}
