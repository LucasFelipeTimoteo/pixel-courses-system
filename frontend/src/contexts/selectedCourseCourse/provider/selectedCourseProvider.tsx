import { useState } from "react";
import type { Course } from "../../../hooks/courses/useCourses";
import { SelectedCourseContext } from '../context/selectedCourseContext'

export const SelectedCourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleSelectedCourse = (SelectedCourse: Course) => {
    setSelectedCourse(SelectedCourse)
  }

  return (
    <SelectedCourseContext.Provider value={{selectedCourse, handleSelectedCourse}}>
    {children}
    </SelectedCourseContext.Provider>
  );
};