import styled from 'styled-components/native'

type Props = {
    title: string
    text: string
}

const AuthScreenTitle = ({ title, text }: Props) => {
    return (
        <Container>
            <TitleText>{title}</TitleText>
            <DescText>{text}</DescText>
        </Container>
    )
}

export default AuthScreenTitle

const Container = styled.View`
    padding-vertical: 24px;
    gap: 8px;
    justify-content: center;
    align-items: center;
`

const TitleText = styled.Text`
    ${({ theme }) => {
        const { textColor, textSize, fontFamily } = theme
        return `
            color: ${textColor.primary};
            font-size: ${textSize.large}px;
            text-transform: uppercase;
            font-family: ${fontFamily.semiBold};
        `
    }}
`

const DescText = styled.Text`
    ${({ theme }) => {
        const { textColor, textSize, fontFamily } = theme
        return `
            color: ${textColor.secondary};
            font-size: ${textSize.extraSmall}px;
            font-family: ${fontFamily.regular};
        `
    }}
`
