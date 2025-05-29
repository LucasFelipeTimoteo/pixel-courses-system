import * as React from 'react';
import { Box } from '@mui/material';
import { styles } from './cardWapper.style';
import type { Course } from '../../components/hooks/courses/useCourses';
import CourseCard from '../CoursesCard/coursesCard';

interface CardsWrapperProps {
  courses: Course[]
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({courses}) => {
  return (
    <Box sx={styles.CardsSection}>
      <Box sx={styles.CardsWrapper}>
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </Box>
    </Box>
  );
};

export default CardsWrapper;