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
    href: "/app/history",
    label: "History",
  },
  {
    icon: <Icon.Telegram />,
    href: "https://t.me/fyconst",
    label: "Contact Admin",
  },
  {
    icon: <Icon.Power />,
    href: "/logout",
    label: "Logout",
    onClick: () => {
      localStorage.clear();
      window.location.href = "/login";
    }
  }
]