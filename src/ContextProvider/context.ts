import React from 'react' 

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

export const context = React.createContext<Context>({} as Context);