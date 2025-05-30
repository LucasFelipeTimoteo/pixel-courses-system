import CourseCard from "../../parts/CoursesCard/coursesCard"
import { Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js"
import { Box } from "@mui/system"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)

const courseReportMock = {
  "subscriptionsQuantity": 1,
  "subscriptionAverageAge": 18,
  "subscriptionsPerMaleGender": 1,
  "subscriptionsPerFemaleGender": 0,
  "subscriptionsPerUndefinedGender": 0
}

const courseMock = {
  "_id": "6837a88cf6246d98be47bbed",
  "name": "Curso Javascript",
  "description": "Nesse curso aprenderemos de maneira prática e bem estruturada ctodos os fundamentos de Javascript",
  "durationHours": 56,
  "image": "https://wallpaperaccess.com/full/1555163.jpg"
}

export const CourseReportPage: React.FC = () => {
  const genderData = {
    labels: ["Masculino", "Feminino", "Indefinido"],
    datasets: [
      {
        label: "Inscrições por Gênero",
        data: [
          courseReportMock.subscriptionsPerMaleGender,
          courseReportMock.subscriptionsPerFemaleGender,
          courseReportMock.subscriptionsPerUndefinedGender,
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
        data: [courseReportMock.subscriptionAverageAge],
        backgroundColor: ["#4BC0C0"],
      },
    ],
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
      <CourseCard course={courseMock} large={true} />

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
            data: [courseReportMock.subscriptionsQuantity],
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