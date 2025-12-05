import {
  IconGithub,
  IconInfo,
  IconUpload,
  LogoFull,
  LogoMark,
  PatternCircle,
  PatternLines,
  PatternTicket,
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
    case 'pattern-circle':
      return <PatternCircle />;
    case 'pattern-lines':
      return <PatternLines />;
    case 'ticket':
      return <PatternTicket />;
    default:
      return null;
  }
};

export default Icon;
