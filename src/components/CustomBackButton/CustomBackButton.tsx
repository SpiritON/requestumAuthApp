import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Back from '../../../assets/Back.svg';

type Props = {
    onPress: () => void
    style?: ViewStyle | ViewStyle[]
}

const CustomBackButton = ({ onPress, style }: Props) => {

    return (
        <ButtonContainer
            onPress={onPress}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                style,
            ]}
        >
            <Back width={24} height={24}/>
        </ButtonContainer>
    )
}

const ButtonContainer = styled(Pressable)`
    padding: ${({ theme }) => theme.spacing.small}px ${({ theme }) => theme.spacing.large}px;
    border-radius: ${({ theme }) => theme.borderRadius.medium}px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
`

export default CustomBackButton