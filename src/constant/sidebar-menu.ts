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
  navMain: [
    {
      title: "Quản lý Tranh",
      url: "/paintings",
      icon: Palette,
      isActive: false,
      // items: [
      //   { title: "", url: "#" },
      //   { title: "Starred", url: "#" },
      //   { title: "Settings", url: "#" },
      // ],
    },
    {
      title: "Quản lý Đơn hàng",
      url: "/orders",
      icon: NotepadTextIcon,
      isActive: true,
      // items: [
      //   { title: "Genesis", url: "#" },
      //   { title: "Explorer", url: "#" },
      //   { title: "Quantum", url: "#" },
      // ],
    },
    {
      title: "Quản lý Danh mục",
      url: "/categories",
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






