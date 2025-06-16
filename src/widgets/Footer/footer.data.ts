interface IFooterSocial {
  icon: string;
  title?: string;
  link?: string;
}

interface IFooterColumn {
  columnTitle: string;
  columnItems: IColumnItem[];
}

interface IColumnItem {
  title: string;
  link?: string;
  icon?: string;
  id?: string; // Добавляем необязательное поле id
}

const footerColumns: IFooterColumn[] = [
  {
    columnTitle: "Поддержка",
    columnItems: [
      {
        title: "Центр помощи",
        link: "/support",
      },
      {
        title: "Сообщить о проблеме",
        link: "/report-problem",
      },
      {
        title: "Методы оплаты",
        link: "/payment-methods",
      },
    ],
  },
  {
    columnTitle: "KÖL",
    columnItems: [
      {
        title: "Регистрация/Вход",
        link: "#auth",
        id: "auth" // Добавляем идентификатор
      },
      {
        title: "Сдать жилье на KÖL",
        link: "#create-service",
        id: "create-service" // Добавляем идентификатор
      },
    ],
  },
  {
    columnTitle: "Наши контакты",
    columnItems: [
      {
        title: "+9965049234434",
        link: "tel:+9965049234434",
        icon: "/imgs/svgs/phone.svg",
      },
      {
        title: "kyrg.anim2025@gmail.com",
        link: "mailto:kyrg.anim2025@gmail.com",
        icon: "/imgs/svgs/email.svg",
      },
    ],
  },
];

const footerSocials: IFooterSocial[] = [
  {
    icon: "/imgs/svgs/globe.svg",
    title: "English(US)",
  },
  {
    icon: "/imgs/svgs/dollar.svg",
    title: "USD",
  },
  {
    icon: "/imgs/socials/facebook.svg",
    link: "https://www.facebook.com/",
  },
  {
    icon: "/imgs/socials/instagram.svg",
    link: "https://www.instagram.com/kyrgyzanimation/",
  },
  {
    icon: "/imgs/socials/telegram.svg",
    link: "https://www.telegram.com/",
  },
  {
    icon: "/imgs/socials/whatsapp.svg",
    link: "https://www.whatsapp.com/",
  },
  {
    icon: "/imgs/socials/vkontakte.svg",
    link: "https://www.vkontakte.com/",
  },
];

export { footerColumns, footerSocials };
export type { IFooterColumn, IFooterSocial, IColumnItem };