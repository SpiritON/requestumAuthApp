import PageTemplate from './src/navigation/PageTemplate/PageTemplate';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './src/theme/theme';
import { ThemeProvider } from 'styled-components/native';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <PageTemplate />
                </NavigationContainer>
            </ThemeProvider>
        </Provider>
    )
}

export default App
