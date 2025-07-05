import AppBackground from "../../components/AppBackground/AppBackground"
import Logo from '../../../assets/logo.svg'
import { ActivityIndicator } from "react-native"
import styled, { useTheme } from "styled-components/native"

const Loading = () => {
    const theme = useTheme()
    return (
        <AppBackground>
            <Container>
                <LogoContainer>
                    <Logo />
                </LogoContainer>
                <LoaderContainer>
                    <ActivityIndicator size="large" color={theme.colors.red} />
                </LoaderContainer>
            </Container>
        </AppBackground>
    )
}

export default Loading

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    gap: 20px;
`

const LogoContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const LoaderContainer = styled.View`
    height: 30%;
    align-items: center;
    justify-content: center;
`
