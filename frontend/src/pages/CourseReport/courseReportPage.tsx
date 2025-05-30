import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import { useNavigate } from "react-router"
import { useSelectedCourse } from "../../contexts/selectedCourseCourse/hooks/useSelectedCourse"
import { useCourseReport } from "../../hooks/courses/useCourseReport"
import CourseCard from "../../parts/CoursesCard/coursesCard"
import Loading from "../../parts/Loading/loading"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)

export const CourseReportPage: React.FC = () => {
  const navigate = useNavigate()
  const { selectedCourse } = useSelectedCourse()
  const { courseReport, isLoading } = useCourseReport(selectedCourse!._id)
  if (isLoading) {
    return <Loading />
  }

  if (!selectedCourse) {
    console.error("No selected course provided")
    navigate("/")
    return null
  }

  if (!courseReport) {
    console.error("No course report found")
  }

  const report = courseReport || {
    subscriptionsPerMaleGender: 4,
    subscriptionsPerFemaleGender: 2,
    subscriptionsPerUndefinedGender: 1,
    subscriptionAverageAge: 23,
    subscriptionsQuantity: 5
  }


const genderData = {
  labels: ["Masculino", "Feminino", "Indefinido"],
  datasets: [
    {
      label: "Inscrições por Gênero",
      data: [
        report.subscriptionsPerMaleGender,
        report.subscriptionsPerFemaleGender,
        report.subscriptionsPerUndefinedGender,
      ],
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
  ],
}

const ageData = {
  labels: ["Idade Média"],
  datasets: [
    {
      label: "Idade Média dos Inscritos",
      data: [report.subscriptionAverageAge],
      backgroundColor: ["#4BC0C0"],
    },
  ],
}

return (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: 7 }}>
    <CourseCard course={selectedCourse} large={true} />
    {!courseReport && (
      <>
        <Typography variant="h3" sx={{marginTop: 4}}>Nenhum relatório encontrado</Typography>
        <Typography variant="body1">Os dados são apenas para vizualização, pois não são reais. Para ver dados reais, adicione este curso para usuários</Typography>
      </>
    )}

    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Inscrições por Gênero</h2>
      <Pie data={genderData} />

      <h2 style={{ marginTop: 40 }}>Idade Média dos Inscritos</h2>
      <Bar data={ageData} options={{
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          x: { beginAtZero: true }
        }
      }} />

      <h2 style={{ marginTop: 40 }}>Total de Inscrições</h2>
      <Bar data={{
        labels: ["Total"],
        datasets: [{
          label: "Inscrições",
          data: [report.subscriptionsQuantity],
          backgroundColor: ["#9966FF"]
        }]
      }} options={{
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }} />
    </div>
  </ Box>
)
}