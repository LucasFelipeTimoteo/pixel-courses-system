import { Box, Typography } from '@mui/material';
import React from 'react';
import useCourses from '../../hooks/courses/useCourses';
import CardsWrapper from "../../parts/CardsWrapper/cardsWrapper";
import Loading from '../../parts/Loading/loading';
import { styles } from './coursesPage.styles';

const CoursesPage: React.FC = () => {
  const { courses, isError, isLoading } = useCourses()

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Erro ao buscar produtos</div>;
  }

  return (
    <Box sx={styles.coursesPageContainer}>
      <Typography sx={styles.title} variant="h3" component="h1">
        Cursos disponíveis
      </Typography>

      <CardsWrapper
        courses={courses}
      />
    </Box>
  );
};

export default CoursesPage;