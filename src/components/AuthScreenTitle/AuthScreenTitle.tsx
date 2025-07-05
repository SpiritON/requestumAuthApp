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
    color: ${({ theme }) => theme.textColor.primary};
    font-size: ${({ theme }) => theme.textSize.large}px;
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fontFamily.semiBold};
`

const DescText = styled.Text`
    color: ${({ theme }) => theme.textColor.secondary};
    font-size: ${({ theme }) => theme.textSize.extraSmall}px;
    font-family: ${({ theme }) => theme.fontFamily.regular};
`
