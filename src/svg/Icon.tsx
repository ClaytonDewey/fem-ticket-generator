import {
  IconGithub,
  IconInfo,
  IconUpload,
  LogoFull,
  LogoMark,
  MoveIcon,
  PatternCircle,
  PatternLines,
  PatternTicket,
  RotateLeft,
  RotateRight,
  ZoomInIcon,
  ZoomOutIcon,
} from '.';

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'github':
      return <IconGithub />;
    case 'info':
      return <IconInfo />;
    case 'upload':
      return <IconUpload />;
    case 'logo':
      return <LogoFull />;
    case 'logo-mark':
      return <LogoMark />;
    case 'move':
      return <MoveIcon />;
    case 'pattern-circle':
      return <PatternCircle />;
    case 'pattern-lines':
      return <PatternLines />;
    case 'ticket':
      return <PatternTicket />;
    case 'rotate-left':
      return <RotateLeft />;
    case 'rotate-right':
      return <RotateRight />;
    case 'zoom-in':
      return <ZoomInIcon />;
    case 'zoom-out':
      return <ZoomOutIcon />;
    default:
      return null;
  }
};

export default Icon;
