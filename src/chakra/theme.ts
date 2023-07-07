// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF8264",
      700: "#71767B",
      800: "##2F3336",
      900: "#E7E9EA",
    },
  },
  fonts: {
    body: 'Open Sans, sans-serif'
  },
  styles:{
    global: () => ({
        body: {
            bg: 'white'
        }
    })
  },
  components: {

  }
})