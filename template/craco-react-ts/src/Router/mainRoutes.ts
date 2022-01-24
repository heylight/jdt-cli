import Index from "@/page/index";
import Cats from "@/page/Main/Cats";
import TestPage from "@/page/TestPage";
import type { route } from "./index";

const routes: route[] = [
  {
    path: "overview",
    component: Index,
    title: "概览",
    name: "index",
    requireAuth: false,
  },
  {
    path: "TestPage",
    title: "测试页",
    name: "testPage",
    requireAuth: false,
    component: TestPage,
  },
  {
    path: "cats",
    title: "猫猫管理",
    name: "cats",
    children: [
      {
        path: "cats/catsList",
        component: Cats,
        title: "猫猫列表",
        name: "cats.catsList",
      },
    ],
  },
];

export default routes;
