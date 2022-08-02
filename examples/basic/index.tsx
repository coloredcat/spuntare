import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './components/button';
import { SpuntareContextProvider, useSpuntare } from '@ironeko/spuntare';
import { AnimatePresence } from 'framer-motion';
import Modal, { ModalProps } from './components/modal';
import Overlay from './components/overlay';

const App = () => {
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

const DeepModal = () => {
  const { removeAll, sharedData } = useSpuntare();

  return (
    <>
      <p>
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae,
        eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
        tincidunt quis, accumsan porttitor, facilisis luctus, metus.
      </p>
      <div
        style={{
          display: 'flex',
          marginTop: 25,
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={() => removeAll()}>No!</Button>
      </div>
    </>
  );
};

const Internal = () => {
  const { create, removeLast } = useSpuntare();

  return (
    <Button
      onClick={() => {
        create('overlay', {
          closeProps: {
            onClick: () => removeLast(),
          },
          title: 'Can you confirm this?',
          description: (
            <>
              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <Button
                  onClick={() =>
                    create('overlay', {
                      title: 'Can you confirm this?',
                      description: (
                        <>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Donec odio. Quisque volutpat mattis eros.
                            Nullam malesuada erat ut turpis. Suspendisse urna
                            nibh, viverra non, semper suscipit, posuere a, pede.
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              marginTop: 25,
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Button
                              onClick={() =>
                                create('modal', {
                                  title: 'Can you confirm this?',
                                  description: (
                                    <>
                                      <p>
                                        Donec nec justo eget felis facilisis
                                        fermentum. Aliquam porttitor mauris sit
                                        amet orci. Aenean dignissim pellentesque
                                        felis.
                                      </p>
                                      <div
                                        style={{
                                          display: 'flex',
                                          marginTop: 25,
                                          justifyContent: 'flex-end',
                                        }}
                                      >
                                        <Button
                                          onClick={() =>
                                            create('modal', {
                                              title: 'Can you confirm this?',
                                              description: <DeepModal />,
                                              closeProps: {
                                                onClick: () => removeLast(),
                                              },
                                            })
                                          }
                                        >
                                          Sure why not
                                        </Button>
                                      </div>
                                    </>
                                  ),
                                  closeProps: {
                                    onClick: () => removeLast(),
                                  },
                                })
                              }
                            >
                              Sure why not
                            </Button>
                          </div>
                        </>
                      ),
                      closeProps: {
                        onClick: () => removeLast(),
                      },
                    })
                  }
                >
                  Sure why not
                </Button>
              </div>
            </>
          ),
        } as ModalProps);
      }}
    >
      Click me
    </Button>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
