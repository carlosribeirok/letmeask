import usePersistedState from '../hooks/usePersistedState';
import Interruptor from './Interruptor/Index';

import GlobalStyle from '../styles/global'
import { ThemeProvider, DefaultTheme } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

export function Tema(){
    const [ theme, setTheme ] = usePersistedState<DefaultTheme>('theme', light);

    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light);
        document.location.reload();
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Interruptor toggleTheme={toggleTheme}/>
            </ThemeProvider>
        </div> 
    )
}