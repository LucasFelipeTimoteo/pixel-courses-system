import { createContext } from "react";
import type { Course } from "../../../hooks/courses/useCourses";

type SelectedCourseContextType = {
  selectedCourse: Course | null;
  handleSelectedCourse: (course: Course) => void;
};

export const SelectedCourseContext = createContext<SelectedCourseContextType | undefined>(undefined);