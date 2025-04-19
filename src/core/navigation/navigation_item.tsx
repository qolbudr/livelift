import * as Icon from 'react-bootstrap-icons';

type NavigationItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}

export const navigationItem: NavigationItem[] = [
  {
    icon: <Icon.HouseDoorFill />,
    href: "/app/dashboard",
    label: "Dashboard",
  },
  {
    icon: <Icon.JournalAlbum />,
    href: "/app/media",
    label: "Media",
  },
  {
    icon: <Icon.Record2 className='size-6' />,
    href: "/app/live",
    label: "Live Stream",
  },
  {
    icon: <Icon.ClockHistory />,
    href: "/app/generate",
    label: "History",
  }
]