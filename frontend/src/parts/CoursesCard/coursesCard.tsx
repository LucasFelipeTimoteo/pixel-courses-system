import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router';
import { useSelectedCourse } from '../../contexts/selectedCourseCourse/hooks/useSelectedCourse';
import type { Course } from '../../hooks/courses/useCourses';
import { styles } from './coursesCard.style';

interface CourseCardProps {
  course: Course;
  large?: boolean
}

const CourseCard: React.FC<CourseCardProps> = ({ course, large }) => {
  const { handleSelectedCourse } = useSelectedCourse()
  const navigate = useNavigate();

  const handleCardMediaClick = () => {
    handleSelectedCourse(course)
    navigate('/courseReport')
  }
  return (
    <Card sx={large ? styles.LargeCard : styles.card}>
      <CardMedia
        component="img"
        alt={course.name}
        image={course.image}
        onClick={handleCardMediaClick}
        sx={styles.cardMedia} />
      <CardContent sx={styles.cardContent}>
        <Tooltip title={course.name}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={styles.title}
            className="title"
          >
            {course.name || 'Título indisponível'}
          </Typography>
        </Tooltip>
        <Typography variant="body1" sx={styles.cardText} color='success' >
          {course.description}
        </Typography>
        <Typography variant="body2" sx={styles.cardTimeText}>
          <AccessTimeIcon fontSize='small' sx={styles.cardTimeIcon} /> {course.durationHours}H
        </Typography>

      </CardContent>
      {
        !large && (
          <CardActions sx={styles.cardActions}>

            <Button startIcon={<AddShoppingCartIcon />} size="small">
              subscribe
            </Button>
          </CardActions>
        )
      }
    </Card>
  );
};

export default CourseCard;