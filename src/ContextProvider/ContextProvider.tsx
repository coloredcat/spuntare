import React, { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Context {
  dialogs: {
    id: string;
    modalType: string;
    props: any[];
  }[];
  setDialogs: (a: any) => any;
  sharedData: any;
  setSharedData: React.Dispatch<any>;
}

const Context = createContext<Context>({} as Context);

export const useModal = () => {
  const { dialogs, setDialogs, sharedData, setSharedData } =
    React.useContext(Context);

  const create = (type: string, props: any) => {
    setDialogs({
      type: 'create',
      modal: {
        modalType: type,
        props,
        id: uuidv4(),
      },
    });
  };

  const removeLast = () => {
    setDialogs({
      type: 'removeLast',
    });
  };

  const remove = (id: string) => {
    setDialogs({
      type: 'remove',
      id,
    });
  };

  const removeAll = () => {
    setDialogs({
      type: 'removeAll',
    });
  };

  return {
    /**
     * The currently open dialogs props.
     */
    dialogs,
    /**
     * Allows modifying the array of open dialogs.
     * Don't modify this directly unless absolutely necessary.
     */
    setDialogs,
    /**
     * A state shared between all currently open modals. This is useful for
     * passing data between modals, for example in multi-stage forms.
     */
    sharedData,
    /**
     * Allows modifying the shared data. Has no typechecking, so be careful.
     */
    setSharedData,
    /**
     * Creates a new modal.
     * @param type The type of modal to create.
     * @param props The props to pass to the modal.
     */
    create,
    /**
     * Removes the last modal from the stack.
     */
    removeLast,
    /**
     * Removes a specific modal from the stack.
     * @param id The id of the modal to remove.
     */
    remove,
    /**
     * Removes all modals from the stack.
     */
    removeAll,
  };
};

const reducer = (
  state: Context['dialogs'],
  action?: {
    type?: string;
    modal?: Context['dialogs'][0];
    id?: string;
  }
): Context['dialogs'] => {
  switch (action?.type) {
    case 'create':
      if (action.modal) {
        return [...state, action.modal];
      }
      return state;
    case 'removeLast':
      return state.slice(0, -1);
    case 'remove':
      return state.filter((d: any) => d.id !== action.id);
    case 'removeAll':
      return [];
    default:
      return state;
  }
};

export interface ContextConfig {
  [key: string]: {
    component: any;
  };
}

export interface ModalControllerProps {
  /**
   * The modal's unique Id
   */
  id: string;
  /**
   * The modal's depth in the stack of modals currently open.
   */
  depth: number;
  /**
   * The modal's depth relative to how many other modals of its type are open
   */
  depthOfType: number;
  /**
   * The index of the modal in the stack of modals currently open.
   */
  index: number;
  /**
   * How many modals are in the current stack
   */
  length: number;
  /**
   * The modal's length relative to how many other modals of its type are open
   */
  lengthOfType: number;
  /**
   * Wheter the modal is open or not. This is currently always `true`.
   */
  open: boolean;
}

const ContextProvider = ({
  children,
  config,
  modalWrapper,
}: {
  children: React.ReactNode;
  config: ContextConfig;
  /**
   * A component that wraps all modals created.
   * If using `framer-motion` you can pass `AnimatePresence` here to
   * animate modals in and out.
   */
  modalWrapper?: React.ReactNode;
}) => {
  const Wrapper = (modalWrapper || React.Fragment) as any;
  const state = [] as Context['dialogs'];

  const [dialogs, setDialogs] = React.useReducer(reducer, state);
  const [sharedData, setSharedData] = React.useState<any | undefined>(undefined);

  return (
    <Context.Provider
      value={{ dialogs, setDialogs, sharedData, setSharedData }}
    >
      <Wrapper>
        {dialogs.map((d, i: number, array) => {
          const Component = config[d.modalType].component;

          /**
           * By cutting the array to the current index, we get the array up to the current index.
           * Then, we can filter that array to get the modals of the same type.
           * The length of that - 1 is the current index if we only counted modals of that type being open.
           */
          const currentArray = [...array];
          currentArray.length = i + 1;
          const adjustedIndex =
            currentArray.filter((d2: any) => d2.modalType === d.modalType)
              .length - 1;

          const lengthOfType = array.filter(
            (d2: any) => d2.modalType === d.modalType
          ).length;
          return (
            <Component
              key={d.id}
              id={d.id}
              depth={array.length - 1 - i}
              depthOfType={lengthOfType - 1 - adjustedIndex}
              lengthOfType={lengthOfType}
              index={i}
              open={true}
              {...d.props}
              length={array.length}
            />
          );
        })}
      </Wrapper>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
