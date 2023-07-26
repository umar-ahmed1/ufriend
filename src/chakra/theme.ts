// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF8264",
      200: "#FC863F",
      300: "#FDAE7E",
      400: "#145365",
      500: "#083A48",
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