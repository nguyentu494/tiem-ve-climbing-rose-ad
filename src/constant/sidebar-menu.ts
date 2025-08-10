import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  LogsIcon,
  Map,
  NotebookIcon,
  NotepadTextDashedIcon,
  NotepadTextIcon,
  Palette,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Quản lý Tranh",
      url: "/admin/paintings",
      icon: Palette,
      isActive: true,
      // items: [
      //   { title: "", url: "#" },
      //   { title: "Starred", url: "#" },
      //   { title: "Settings", url: "#" },
      // ],
    },
    {
      title: "Quản lý Đơn hàng",
      url: "/admin/orders",
      icon: NotepadTextIcon,
      // items: [
      //   { title: "Genesis", url: "#" },
      //   { title: "Explorer", url: "#" },
      //   { title: "Quantum", url: "#" },
      // ],
    },
    {
      title: "Quản lý Danh mục",
      url: "/admin/categories",
      icon: LogsIcon,
      // items: [
      //   { title: "Introduction", url: "#" },
      //   { title: "Get Started", url: "#" },
      //   { title: "Tutorials", url: "#" },
      //   { title: "Changelog", url: "#" },
      // ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //     { title: "Billing", url: "#" },
    //     { title: "Limits", url: "#" },
    //   ],
    // },
  ],
};
  





