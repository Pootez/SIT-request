import { useEffect, useState } from "react"

const useProfile = (token: string, deps?: any) => {
  const [profileName, setProfileName] = useState("No Profile")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const controller = new AbortController()

  useEffect(
    () => {
      if (!token) {
        setError("No token provided")
        return
      }

      setLoading(true)
      setError("")
      fetch("http://localhost:3001/proxy/profile", {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
        method: "GET",
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            // Check if the response is not ok then throw an error
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          if (data.data && data.data.me) {
            setProfileName(data.data.me.fullName)
          } else if (data.errors) {
            // Log GraphQL errors
            setError("GraphQL error")
          } else {
            setError("Profile data not found")
          }
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          console.log("Error while fetching profile: ", err.message)
          setLoading(false)
        })
    },
    deps ? [...deps] : []
  )

  return { profileName, error, loading, abort: () => controller.abort() }
}

const useBooking = (token: string, housingId: string, deps?: any) => {
  const [bookingStatus, setBookingStatus] = useState("pending")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const controller = new AbortController()

  useEffect(
    () => {
      if (!token) {
        setError("No token provided")
        return
      } else if (!housingId) {
        setError("No housing ID provided")
        return
      }

      setLoading(true)
      fetch("http://localhost:3001/proxy/book/" + housingId, {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
        method: "GET",
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            // Check if the response is not ok then throw an error
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          if (data.errors) {
            // Log GraphQL errors
            setError("GraphQL error")
          } else if (data.data.startHousingReservation.errorMessage) {
            setBookingStatus(
              data.data.startHousingReservation.errorMessage.errorCode
            )
          } else if (data) {
            setBookingStatus("success")
            console.log("Successfully booked housing ID: ", housingId, data)
          } else {
            setError("Booking unsuccessful data not found")
          }
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

      return () => controller.abort()
    },
    deps ? [...deps] : []
  )
  return { bookingStatus, error, loading, abort: () => controller.abort() }
}

export { useProfile, useBooking }
