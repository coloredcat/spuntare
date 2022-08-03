import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { SpuntareContextProvider, useSpuntare } from '@ironeko/spuntare';
import { AnimatePresence } from 'framer-motion';
import Modal, { ModalProps } from './components/modal';
import Overlay from './components/overlay';
import { useForm } from 'react-hook-form';
import Button from './components/button';
import Input from './components/input';

const Index = () => {
  return (
    <div>
      <SpuntareContextProvider
        config={{
          modal: {
            component: Modal,
          },
          overlay: {
            component: Overlay,
          },
        }}
        // @ts-ignore
        modalWrapper={AnimatePresence}
      >
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Internal />
        </div>
      </SpuntareContextProvider>
    </div>
  );
};

const ConfirmationModal = () => {
  const { sharedData, removeAll } = useSpuntare();

  return (
    <div
      style={{
        marginTop: 25,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* We read the shared state from here */}
      <div>First name: {sharedData.firstName}</div>
      <div>Last name: {sharedData.lastName}</div>
      <div
        style={{
          display: 'flex',
          marginTop: 25,
          justifyContent: 'flex-end',
          gap: 8,
        }}
      >
        <Button onClick={() => removeAll()}>Yeah, it's okay</Button>
      </div>
    </div>
  );
};

const FormWithinModal = () => {
  const { setSharedData, create, removeLast } = useSpuntare();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div
      style={{
        marginTop: 25,
        position: 'relative',
      }}
    >
      <form
        onSubmit={handleSubmit(({ firstName, lastName }) => {
          /**
           * Set the values to the modal stack state and then open a confirmation modal
           */
          setSharedData({
            firstName,
            lastName,
          });
          create('modal', {
            closeProps: {
              onClick: () => removeLast(),
            },
            title: 'Are you sure this is correct?',
            description: <ConfirmationModal />,
          });
        })}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
          }}
        >
          <Input
            {...register('firstName', { required: true })}
            placeholder="First name"
          />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
          }}
        >
          <Input
            {...register('lastName', { required: true })}
            placeholder="Last name"
          />
          {errors.lastName && <span>This field is required</span>}
        </div>
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            bottom: 0,
            justifyContent: 'flex-end',
            left: 0,
            right: 0,
            padding: 16,
          }}
        >
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

const Internal = () => {
  const { create, removeLast, dialogs } = useSpuntare();

  return (
    <Button
      onClick={() => {
        create('overlay', {
          closeProps: {
            onClick: () => removeLast(),
          },
          title: 'What is your name?',
          description: <FormWithinModal />,
        } as ModalProps);
      }}
    >
      Click me
    </Button>
  );
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<Index />);
