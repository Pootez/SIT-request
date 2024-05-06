import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react"
import TokenInput from "./TokenInput"
import { useEffect, useState } from "react"
import { useProfile } from "./apiFetching"
import { AddIcon } from "@chakra-ui/icons"
import BookRequest from "./BookRequest"

function getCountDown(ms: number) {
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)
  return `${hours}h ${minutes}m ${seconds}s`
}

function App() {
  const [accessToken, setAccesToken] = useState("")
  const [expiration, setExpiration] = useState(0)
  const [countDown, setCountDown] = useState(0)
  const [submitCounter, setSubmitCounter] = useState(0)
  const { profileName, error, loading } = useProfile(accessToken, [
    submitCounter,
  ])

  const [housingIds, setHousingIds] = useState<string[]>([])
  const [bookRequests, setBookRequests] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = expiration * 1000 - now
      setCountDown(distance)
    }, 1000)
    return () => clearInterval(interval)
  }, [expiration])

  return (
    <Flex>
      <Box padding="40px" flexGrow={1}>
        <Heading as="h1" size="xl" m={1}>
          {loading
            ? "Fetching profile..."
            : countDown <= 0
            ? "No profile"
            : profileName}
        </Heading>
        <Heading as="h3" size="m" m={2}>
          {error
            ? error
            : countDown <= 0
            ? "Expired token"
            : "Expiration: " + getCountDown(countDown)}
        </Heading>
        <TokenInput
          onSubmit={(accessData) => {
            setSubmitCounter(submitCounter + 1)
            setAccesToken(accessData.access_token)
            setExpiration(accessData.expires_at)
          }}
        />
        <Card m={2}>
          <CardHeader>
            <Heading size="md">Housing IDs</Heading>
          </CardHeader>
          <VStack px={5}>
            {housingIds.map((id, index) => (
              <HStack width="100%">
                <Input
                  key={index}
                  placeholder="Housing ID"
                  value={id}
                  onChange={(e) => {
                    const newIds = [...housingIds]
                    newIds[index] = e.target.value
                    setHousingIds(newIds)
                  }}
                />
                <Button
                  colorScheme="red"
                  onClick={() => {
                    const newIds = [...housingIds]
                    newIds.splice(index, 1)
                    setHousingIds(newIds)
                  }}
                >
                  Remove
                </Button>
                <Button
                  // isDisabled={profileName == "No Profile"}
                  colorScheme="green"
                  onClick={() => {
                    setBookRequests([...bookRequests, id])
                  }}
                >
                  Book
                </Button>
              </HStack>
            ))}
          </VStack>
          <CardFooter>
            <Flex width="100%">
              <Button
                flexGrow={2}
                onClick={() => {
                  setHousingIds([...housingIds, ""])
                }}
              >
                <AddIcon />
              </Button>
              <Button
                ml={2}
                flexGrow={1}
                colorScheme="green"
                onClick={() => {
                  setBookRequests([...bookRequests, ...housingIds])
                }}
              >
                Book All
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      </Box>
      <Box padding="40px" flexGrow={1}>
        <Heading size="md">Booking Requests</Heading>
        <Stack p={2} direction="column-reverse">
          {bookRequests.map((request, index) => (
            <BookRequest key={index} token={accessToken} id={request} />
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}

export default App
