import { StatusBar, StyleProp, ViewStyle } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useEffect } from 'react'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

type Props = {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
}

const AppBackground = ({ children, style }: Props) => {
    const theme = useTheme()

    useEffect(() => {
        changeNavigationBarColor(theme.colors.background, false)
    }, [theme.colors.background])

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <Container style={style}>
                <BgBallTopRight source={require('../../../assets/FirstEllipse.png')} />
                <BgBallCenterLeft source={require('../../../assets/SecondEllipse.png')} />
                <BgBallBottomRight source={require('../../../assets/ThirdEllipse.png')} />
                {children}
            </Container>
        </>
    )
}

export default AppBackground

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    position: relative;
`

const Ball = styled.Image`
    position: absolute;
`

const BgBallTopRight = styled(Ball)`
    top: 0;
    right: 0;
`

const BgBallCenterLeft = styled(Ball)`
    top: 100px;
    left: 0;

`

const BgBallBottomRight = styled(Ball)`
    bottom: 0;
    right: 0;
`