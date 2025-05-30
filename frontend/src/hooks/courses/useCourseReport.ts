import axios from "axios"
import { useEffect, useState } from "react"

type SelectedCourseReport = {
  subscriptionsQuantity: number
  subscriptionAverageAge: number
  subscriptionsPerMaleGender: number
  subscriptionsPerFemaleGender: number
  subscriptionsPerUndefinedGender: number
}

const fetchCoursereports = async (courseId: string) => {
  const reports = await axios.get(
    `http://localhost:3000/courses/report/${courseId}`,
     {headers:{
      "X-Pixel-Access-Token": localStorage.getItem("accessToken")
     }}
    )
  return reports.data
}

export const useCourseReport = (courseId: string) => {
  const [courseReport, setCourseReport] = useState<SelectedCourseReport>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getCourseReport = async () => {
      try {
        setIsError(false)
        setIsLoading(true)
        const report = await fetchCoursereports(courseId)
        setCourseReport(report)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
        console.error(error)
      }
    }

    getCourseReport()
  }, [courseId])

  return {
    courseReport,
    isError,
    isLoading
  }
}