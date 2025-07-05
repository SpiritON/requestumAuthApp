import styled, { useTheme } from 'styled-components/native'
import AppBackground from '../../components/AppBackground/AppBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/PageTemplate/PageTemplate'
import Button from '../../components/Button/Button'
import Logo from '../../../assets/logo.svg'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>
}

const Splash = ({ navigation }: Props) => {

    const theme = useTheme()

    return (
        <AppBackground>
            <Container>
                <LogoContainer>
                    <Logo width={104} height={111} />
                </LogoContainer>
                <ButtonContainer>
                    <Button text="Login" onPress={() => navigation.navigate('Login')} backgroundColor={theme.colors.primary}/>
                    <Button text="Register" onPress={() => navigation.navigate('SignUp')} backgroundColor={theme.colors.secondary}/>
                </ButtonContainer>
            </Container>
        </AppBackground>
    )
}

export default Splash

const Container = styled.View`
    flex: 1;
    padding-horizontal: 35px;
    padding-vertical: 70px;
`

const LogoContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const ButtonContainer = styled.View`
    gap: 15px;
    height: 20%;
    justify-content: flex-end;
`