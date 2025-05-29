import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styles } from './coursesCard.style';
import { Tooltip } from '@mui/material';
import type { Course } from '../../components/hooks/courses/useCourses';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        alt={course.name}
        image={
          course.image
        }
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
      <CardActions sx={styles.cardActions}>

        <Button startIcon={<AddShoppingCartIcon />} size="small">
          subscribe
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;