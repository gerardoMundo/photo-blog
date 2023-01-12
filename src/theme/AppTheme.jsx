import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { mainTheme } from './mainTheme'

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
