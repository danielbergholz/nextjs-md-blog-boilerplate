import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        'h1, h2, h3, p, span, strong': {
          color: '#21243D',
        },
      },
    },
  },
  fonts: {
    body: '"Heebo", sans-serif',
  },
  colors: { dark: '#21243D', primary: '#FF6464' },
})
