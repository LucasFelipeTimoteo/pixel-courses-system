import axios from 'axios'
import { useState, useEffect } from 'react';

export type Course = {
  _id: string;
  name: string;
  description: string;
  durationHours: number,
  image: string,
}

const fetchCourses = async () => {
  const response = await axios.get('http://localhost:3000/courses');
  return response.data;
};

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getCourses = async () => {
      try {
        setIsError(false)
        setIsLoading(true)
        const fetchedData = await fetchCourses();
        setCourses(fetchedData);
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        console.error(error)
      }
    };

    getCourses();
  }, []);

  return {courses, isError, isLoading};
};

export default useCourses;