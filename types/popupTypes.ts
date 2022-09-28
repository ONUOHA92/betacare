export namespace Popup {
  export type State = {
    isOpen: boolean
  }

  export type PopupTypes = 'confirm' | 'bookSuccess' | ''

  export const enum ATypes {
    POPUP_OPEN = 'POPUP_OPEN',
    POPUP_CLOSE = 'POPUP_CLOSE',
  }

  // export interface IActionSettings extends Action {
  //   payload: any
  //   type: ATypes
  // }
}
