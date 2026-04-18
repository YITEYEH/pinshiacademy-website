import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Teachers } from "./pages/Teachers";
import { Team } from "./pages/Team";
import { StudentSuccess } from "./pages/StudentSuccess";
import { Blog } from "./pages/Blog";
import { TeacherRecruitment } from "./pages/TeacherRecruitment";
import { TeamRecruitment } from "./pages/TeamRecruitment";
import { FAQ } from "./pages/FAQ";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "courses", Component: Courses },
      { path: "teachers", Component: Teachers },
      { path: "team", Component: Team },
      { path: "student-success", Component: StudentSuccess },
      { path: "blog", Component: Blog },
      { path: "teacher-recruitment", Component: TeacherRecruitment },
      { path: "team-recruitment", Component: TeamRecruitment },
      { path: "faq", Component: FAQ },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "*", Component: NotFound },
    ],
  },
]);
