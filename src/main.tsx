import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript></ColorModeScript>
    <App />
  </ChakraProvider>
)
