import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Spinner,
} from "@chakra-ui/react"
import { useState } from "react"
import { useBooking } from "./apiFetching"

const HousingList = ({ token, id }: { token: string; id: string }) => {
  const [closed, setClosed] = useState(false)
  const { bookingStatus, error, loading, abort } = useBooking(token, id)

  return (
    !closed && (
      <Alert
        status={
          loading
            ? "info"
            : error
            ? "error"
            : bookingStatus == "success"
            ? "success"
            : "warning"
        }
      >
        {loading ? <Spinner /> : <AlertIcon />}
        <Box flexGrow={1}>
          <AlertTitle>
            {id}
            {": "}
            {loading
              ? "Booking..."
              : error
              ? "Request failed"
              : bookingStatus == "success"
              ? "Booking Started!"
              : "Unavailable."}
          </AlertTitle>
          {!loading && !error && bookingStatus != "success" && (
            <AlertDescription>{bookingStatus}</AlertDescription>
          )}
          {!loading && error && <AlertDescription>{error}</AlertDescription>}
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={() => {
            loading && abort()
            setClosed(true)
          }}
        />
      </Alert>
    )
  )
}

export default HousingList
