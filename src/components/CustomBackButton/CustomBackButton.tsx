import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Back from '../../../assets/Back.svg';

type Props = {
    onPress: () => void
    styles?: ViewStyle | ViewStyle[]
}

const CustomBackButton = ({ onPress, styles }: Props) => {

    return (
        <ButtonContainer
            onPress={onPress}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                styles,
            ]}
        >
            <Back width={24} height={24}/>
        </ButtonContainer>
    )
}

const ButtonContainer = styled(Pressable)`
    ${({ theme }) => {
        const { spacing, borderRadius } = theme
        return `
            padding: ${spacing.small}px ${spacing.large}px;
            border-radius: ${borderRadius.medium}px;
            width: 24px;
            height: 24px;
            justify-content: center;
            align-items: center;
        `
    }}
`

export default CustomBackButton