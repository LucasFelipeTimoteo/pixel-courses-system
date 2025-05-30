import { useContext } from "react";
import { SelectedCourseContext } from "../context/selectedCourseContext";

export const useSelectedCourse = () => {
  const context = useContext(SelectedCourseContext);
  if (!context) {
    throw new Error("useCurrentCourse must be used within a CurrentCourseProvider");
  }
  return context;
}