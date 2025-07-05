import styled from 'styled-components/native'
import InputField from '../InputField/InputField'
import AuthScreenTitle from '../AuthScreenTitle/AuthScreenTitle'
import { View } from 'react-native'

type Props = {
    email: string
    password: string
    formTitle: string
    formText: string
    setEmail: (text: string) => void
    setPassword: (text: string) => void
}

const AuthForm = ({
    email,
    password,
    formTitle,
    formText,
    setEmail,
    setPassword,
}: Props) => {
    return (
        <View>
            <AuthScreenTitle title={formTitle} text={formText} />
            <InputsContainer>
                <InputField value={email} onChangeText={setEmail} label="Email address" variant="email" />
                <InputField value={password} onChangeText={setPassword} label="Password" variant="password" />
            </InputsContainer>
        </View>
    )
}

export default AuthForm

const InputsContainer = styled.View`
    gap: 16px;
`