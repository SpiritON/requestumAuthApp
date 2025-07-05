import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { clearAuth } from '../../store/reducers/authSlice'
import Button from '../../components/Button/Button'
import AppBackground from '../../components/AppBackground/AppBackground'
import BgImage from '../../../assets/Rlogo.png'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/PageTemplate/PageTemplate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled from 'styled-components/native'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>
}

const Main = ({ navigation }: Props) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token')
        dispatch(clearAuth())
    }

    return (
        <AppBackground>
            <BgStyledImage
                source={BgImage}
                resizeMode="contain"
            />
            <MainContainer>
                <CenterContent>
                    <Subtext>You're logged in now</Subtext>
                    <Username>{user?.name}</Username>
                    <InfoText>Now you can see the app content!</InfoText>
                    <ButtonBlock>
                        <Button
                            text="Log out"
                            onPress={handleLogout}
                        />
                    </ButtonBlock>
                </CenterContent>
            </MainContainer>
        </AppBackground>
    )
}

export default Main

const BgStyledImage = styled.Image`
    position: absolute;
    width: 100%;
    height: 50%;
    top: 10%;
    left: 0;
    z-index: 1;
`

const MainContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding: 75px 35px;
    margin-top: 43%;
`

const CenterContent = styled.View`
    align-items: center;
    width: 100%;
`

const Subtext = styled.Text`
    ${({ theme }) => {
        const { textColor, textSize, fontFamily } = theme
        return `
            color: ${textColor.secondary};
            font-size: ${textSize.extraSmall}px;
            font-family: ${fontFamily.regular};
            margin-bottom: 8px;
        `
    }}
`

const Username = styled.Text`
    ${({ theme }) => {
        const { textColor, textSize, fontFamily } = theme
        return `
            color: ${textColor.primary};
            font-size: ${textSize.large}px;
            font-family: ${fontFamily.semiBold};
            margin-bottom: 18px;
        `
    }}
`

const InfoText = styled.Text`
    ${({ theme }) => {
        const { textColor, textSize, fontFamily } = theme
        return `
            color: ${textColor.primary};
            font-size: ${textSize.medium}px;
            font-family: ${fontFamily.medium};
            margin-top: 12%;
            margin-bottom: 8%;
        `
    }}
`

const ButtonBlock = styled.View`
    width: 100%;
    margin-top: 18%;
`
