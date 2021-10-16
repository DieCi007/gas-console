// import { ComponentRef, EventEmitter, Injectable, InjectionToken, Injector } from '@angular/core';
// import { ComponentType, GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
// import { tap } from 'rxjs/operators';
// import { ComponentPortal } from '@angular/cdk/portal';
// import { DefaultModalComponent } from './default-modal/default-modal.component';
//
// export interface IModalRef<T> {
//   overlayRef: OverlayRef;
//   componentRef: ComponentRef<T>;
// }
//
// export interface IModalOptions {
//   size?: ModalSize;
//   hasBackdrop?: boolean;
//   panelClass?: string;
// }
//
// export enum ModalSize {
//   SMALL = 'SMALL',
//   MEDIUM = 'MEDIUM',
//   LARGE = 'LARGE',
//   FULL = 'FULL',
//   HALF = 'HALF',
//   AUTO = 'AUTO'
// }
//
// export interface IModalData {
//   [MData: string]: any;
// }
//
// export interface IModalInjectionData extends IModalData {
//   overlayRef: OverlayRef;
// }
//
// export interface IDefaultModalData {
//   title?: string;
//   primaryText?: string;
//   secondaryText?: string;
//   html?: string;
//   actions?: IModalAction[];
// }
//
// export interface IDefaultModalInjectionData extends IDefaultModalData {
//   overlayRef: OverlayRef;
// }
//
// export interface IModalAction {
//   buttonLabel: string;
//   buttonColor: 'primary' | 'secondary' | 'danger' | string;
// }
//
// export interface IErrorResponse {
//   error: string;
//   message: string;
// }
//
// export interface IAction extends IModalAction {
//   click?: EventEmitter<MouseEvent>;
// }
//
// export const MODAL_DATA = new InjectionToken('MODAL_DATA');
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ModalService {
//   private overlayReference: OverlayRef[] = [];
//
//   constructor(private overlay: Overlay) {
//   }
//
//   createFromComponent<T>(component: ComponentType<T>, props: IModalData, onBackdropClick?: () => void,
//                          options: IModalOptions = {hasBackdrop: true, size: ModalSize.AUTO}, closeAll: boolean = true): IModalRef<T> {
//     if (closeAll) {
//       this.closeAllModals();
//     }
//     const index = this.overlayReference.length;
//
//     const positionStrategy = new GlobalPositionStrategy().centerHorizontally().centerVertically();
//
//     const overlayRef = this.overlay.create({
//       height: options?.size ? getModalSize(options.size).height : 300,
//       width: options?.size ? getModalSize(options.size).width : 500,
//       hasBackdrop: !!options?.hasBackdrop,
//       positionStrategy,
//       panelClass: options?.panelClass ?? '',
//     });
//     overlayRef.backdropClick().pipe(
//       tap(() => {
//         if (onBackdropClick) {
//           return onBackdropClick();
//         }
//         this.closeModal(index);
//       })
//     ).subscribe();
//
//     const portal = new ComponentPortal(
//       component,
//       null,
//       createInjector(Object.assign(props, {overlayRef}))
//     );
//     const componentRef = overlayRef.attach(portal);
//     this.overlayReference.push(overlayRef);
//
//     return {overlayRef, componentRef};
//   }
//
//   openDefaultModal(props: IDefaultModalData, onBackdropClick?: () => void,
//                    options: IModalOptions = {hasBackdrop: true, size: ModalSize.LARGE}, closeAll: boolean = true): IAction[] {
//     if (!props || !props.actions) {
//       return null;
//     }
//     const actions: IAction[] = props.actions;
//     actions.map(a => {
//       a.click = new EventEmitter<MouseEvent>();
//       return a;
//     });
//     this.createFromComponent(DefaultModalComponent, props, onBackdropClick, options, closeAll);
//     return actions;
//   }
//
//   handleError(error: IErrorResponse): IAction[] {
//     return this.openDefaultModal({
//       title: `Errore`,
//       primaryText: 'Abbiamo incontrato un problema. Contatta l\'assistenza con il messaggio:',
//       secondaryText: error.error + ': ' + error.message,
//       actions: [{
//         buttonColor: 'secondary',
//         buttonLabel: 'Indietro',
//       }]
//     });
//   }
//
//   private closeModal(index): void {
//     if (this.overlayReference[index]) {
//       this.overlayReference[index].dispose();
//     }
//   }
//
//   private closeAllModals(): void {
//     this.overlayReference.forEach(of => of.dispose());
//   }
// }
//
// const getModalSize = (size: ModalSize): { width: string | number; height: string | number } => {
//   switch (size) {
//     case ModalSize.SMALL:
//       return {width: '30%', height: '30%'};
//     case ModalSize.MEDIUM:
//       return {width: '350px', height: 'auto'};
//     case ModalSize.LARGE:
//       return {width: '500px', height: 'auto'};
//     case ModalSize.FULL:
//       return {width: '100%', height: '100%'};
//     case ModalSize.HALF:
//       return {width: '50%', height: '50%'};
//     case ModalSize.AUTO:
//       return {width: 'auto', height: 'auto'};
//     default:
//       return {width: 300, height: 500};
//   }
// };
//
// const createInjector = (props: IModalData): Injector => {
//   const tokens = new WeakMap();
//   tokens.set(MODAL_DATA, props);
//   return Injector.create({
//     providers: [{
//       provide: MODAL_DATA,
//       useValue: props
//     }]
//   });
// };
//
//
