import * as React from 'react';
import { SpuntareProps } from '../../../../src';
import Modal, { ModalProps } from '../modal';

type ExtendedOverlayProps = SpuntareProps & ModalProps;

export interface OverlayProps extends ExtendedOverlayProps {}

const Overlay = (props: OverlayProps) => {
  return (
    <Modal
      {...props}
      rootProps={{
        open: props.open,
      }}
      initial={{
        opacity: 0,
        transform: `scale(0.95) translateX(25%) translateX(0px)`,
      }}
      animate={{
        opacity: 1,
        transform: `scale(${1 -
          props.depthOfType *
            (0.2 /
              props.lengthOfType)}) translateX(0%) translateX(-${props.depthOfType *
          (100 / props.lengthOfType)}px)`,
        filter: props.depth > 0 ? 'blur(2px)' : 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        transform: `scale(0.95)  translateX(25%) translateX(0)`,
      }}
      style={{
        boxSizing: 'border-box',
        height: '100vh',
        maxHeight: '100vh',
        right: 0,
        top: 0,
        bottom: 0,
        left: 'auto',
        minWidth: '500px',
        borderRadius: '16px 0px 0px 16px',
        transformOrigin: props.depth > 0 ? 'center left' : 'center center',
      }}
    />
  );
};

export default Overlay;
