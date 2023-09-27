import { Radio, type RadioProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const VGIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 18,
  height: 18,
  boxShadow: 'inset 0 0 0 2px #9AA4BF, inset 0 -2px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:disabled ~ &': {
    boxShadow: 'inset 0 0 0 2px #9AA4BF, inset 0 -2px 0 rgba(16,22,26,.1)',
    background: '#DEDEDE'
  },
}));

const VGCheckedIcon = styled(VGIcon)({
  boxShadow: 'inset 0 0 0 2px #7750F8, inset 0 -2px 0 rgba(16,22,26,.1)',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage: 'radial-gradient(#7750F8,#7750F8 28%,transparent 32%)',
    content: '""',
  },
  'input:disabled ~ &': {
    boxShadow: 'inset 0 0 0 2px #9AA4BF, inset 0 -2px 0 rgba(16,22,26,.1)',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage: 'radial-gradient(#9AA4BF,#9AA4BF 28%,transparent 32%)',
      content: '""',
    },
  },
});

export default function VGRadio(props: RadioProps) {
  return (
    <Radio
      checkedIcon={<VGCheckedIcon />}
      icon={<VGIcon />}
      {...props}
    />
  );
}