import express from 'express'
const app = express()
import path from 'path'
import { fileURLToPath } from "url"
import cors from 'cors'
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow your React app domain
    methods: ['POST'], // Adjust according to what methods you are using
  })
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const apiURL = 'https://as-portal-a-prod884f86a.azurewebsites.net/graphql'

app.use(express.json())
app.use(express.static(path.join(__dirname, './dist')))

app.get('/api/profile', async (req, res) => {
  try {
    const apiResponse = await fetch(apiURL, {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-ch-ua':
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        Referer: 'https://bolig.sit.no/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        authorization: req.headers.authorization,
      },
      body: '{"operationName":"GetProfileInfo","variables":{},"query":"query GetProfileInfo {\\n  me {\\n    fullName\\n  }\\n}\\n"}',
      method: 'POST',
    })
    const data = await apiResponse.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch data' + error.message })
  }
})

app.get('/api/book/:id', async (req, res) => {
  try {
    const housingId =
      req.params.id.substring(0, 2).toUpperCase() + req.params.id.substring(2)
    const apiResponse = await fetch(apiURL, {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-ch-ua':
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        Referer: 'https://bolig.sit.no/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        authorization: req.headers.authorization,
      },
      body:
        '{"operationName":"startHousingReservation","variables":{"input":{"houseId":"' +
        housingId +
        '","collectiveHouseIds":[],"language":"no"}},"query":"mutation startHousingReservation($input: StartHousingReservationInput!) {\\n  startHousingReservation(input: $input) {\\n    ... on StartHousingReservationSuccessPayload {\\n      reservationIds\\n      __typename\\n    }\\n    ... on StartHousingReservationErrorPayload {\\n      errorMessage {\\n        errorCode\\n        parameters {\\n          parameter\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
      method: 'POST',
    })
    const data = await apiResponse.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch data' + error.message })
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
