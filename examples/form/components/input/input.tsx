import { blackA } from '@radix-ui/colors';
import { styled } from '@stitches/react';

const Input = styled('input', {
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '8px 12px',
  fontSize: 15,
  lineHeight: 1,
  color: blackA.blackA11,
  boxShadow: `0 0 0 1px ${blackA.blackA7}`,
  border: `1px solid ${blackA.blackA2}`,

  '&:focus': { boxShadow: `0 0 0 2px ${blackA.blackA8}` },
});

export default Input;
