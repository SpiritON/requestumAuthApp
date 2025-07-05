import { useState } from 'react'
import { Keyboard, Alert, TouchableWithoutFeedback } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled, { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../navigation/PageTemplate/PageTemplate'
import { setToken, setUser } from '../../store/reducers/authSlice'
import { getUserData } from '../../services/getUserData'
import Button from '../../components/Button/Button'
import AppBackground from '../../components/AppBackground/AppBackground'
import UserIcon from '../../../assets/UserIcon.svg'
import AuthForm from '../../components/AuthForm/AuthForm'
import { validateEmail, validatePassword } from '../../utils/validation'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const Login = ({ navigation }: Props) => {
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState(false)
    const dispatch = useDispatch()

    const handleLogin = async () => {
        if (!validateEmail(email) || !validatePassword(password)) {
            setValidationError(prev => !prev)
            return
        }
        setLoading(true)
        try {
            await AsyncStorage.setItem('token', 'test-token')
            dispatch(setToken('test-token'))
            const userData = await getUserData()
            dispatch(setUser(userData))
        } catch (error: unknown) {
            let message = 'Unknown error'
            if (error instanceof Error) {
                message = error.message
            } else if (typeof error === 'string') {
                message = error
            }
            Alert.alert('Login error:', message)
        } finally {
            setLoading(false)
        }
    }

    const signUpHandler = () => {
        navigation.navigate('SignUp')
    }

    return (
        <AppBackground>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <MainContainer>
                    <ContentWrapper>
                        <IconContainer>
                            <UserIcon />
                        </IconContainer>
                        <AuthForm 
                            email={email} 
                            setEmail={setEmail} 
                            password={password} 
                            setPassword={setPassword} 
                            formTitle='Login' 
                            formText='Enter your login password from your account'
                        />
                        <ButtonContainer>
                            <Button 
                                text="Forgot password" 
                                onPress={() => null} 
                                variant='text' 
                                textColor={theme.textColor.red}
                                fontSize={theme.textSize.extraSmall}
                                fontFamily={theme.fontFamily.medium}
                            />
                            <Button 
                                text="Login" 
                                onPress={handleLogin} 
                                loading={loading}
                                shakeTrigger={validationError}
                            />
                        </ButtonContainer>
                    </ContentWrapper>
                    <FooterWrapper>
                        <FooterText>
                            Don't have an account?
                        </FooterText>
                        <Button 
                            text="Sign up" 
                            onPress={signUpHandler} 
                            variant='text'
                            textColor={theme.textColor.red} 
                            fontSize={theme.textSize.extraSmall}
                            fontFamily={theme.fontFamily.regular}
                        />
                    </FooterWrapper>
                </MainContainer>
            </TouchableWithoutFeedback>
        </AppBackground>
    )
}

export default Login

const MainContainer = styled.View`
    flex: 1;
    padding: 70px 35px;
`

const IconContainer = styled.View`
    align-items: flex-end;
    padding-right: 40px;
`

const ContentWrapper = styled.View`
    flex: 1;
    margin-top: 30%;
`

const ButtonContainer = styled.View`
    gap: 16px;
    margin-top: 16px;
`

const FooterWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`

const FooterText = styled.Text`
    ${({ theme }) => {
        const { textColor, textSize, fontFamily } = theme
        return `
            color: ${textColor.primary};
            font-size: ${textSize.extraSmall}px;
            font-family: ${fontFamily.regular};
        `
    }}
`
