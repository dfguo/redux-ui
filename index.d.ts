declare module "redux-ui" {

  import * as Redux from 'redux';

  export interface uiParams<UIStateShape> {
    // optional key which is used to determine the UI path in which state will
    // be stored. if omitted this is randomly generated.
    key?: string;

    // optional persist, defaults to false. if set to true persist will keep UI
    // state for this component after it unmounts. if set to false the UI state
    // will be deleted and recreated when the component remounts
    persist?: boolean;

    // **required**: UI state for the component
    state: UIStateShape;

    // optional mergeProps passed to react-redux' @connect
    mergeProps?: (stateProps: any, dispatchProps: any, ownProps: any) => any;

    // optional `options` passed to react-redux @connect
    options?: {
      pure?: boolean;
      withRef?: boolean;
    };

    // optional `dirty`, a function has both default and current UI state passed in,
    // allow you to customize the way to tell if UI state is dirty
    dirty?: (defaultUIState: UIStateShape, currentUIState: UIStateShape) => boolean
  }

  export interface ReduxUIProps<UIStateShape> {
    // The key passed to the decorator from the decorator
    // (eg. 'some-decorator' with `@ui('some-decorator')`
    uiKey: string;

    // The UI state for the component's `uiKey`
    ui: UIStateShape;

    // A function accepting either a name/value pair or object which updates
    // state within `uiKey`
    updateUI(obj: Partial<UIStateShape>): void;
    updateUI(key: string, value: any): void;

    // A function which resets the state within `uiKey` to its default
    resetUI(): void;

    isUIDirty(): boolean;
  }

  export const reducer: Redux.Reducer<any>;

  export default function ui<UIStateShape>(params?: uiParams<UIStateShape>): <T>(component: T) => T;
}
