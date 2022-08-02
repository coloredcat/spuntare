import { blackA } from '@radix-ui/colors';
import { styled } from '@stitches/react';

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: 'pointer',

  variants: {
    variant: {
      normal: {
        backgroundColor: blackA.blackA2,
        color: blackA.blackA12,
        '&:hover': { backgroundColor: blackA.blackA4 },
        '&:focus': { boxShadow: `0 0 0 2px ${blackA.blackA7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'normal',
  },
});

export default Button;
