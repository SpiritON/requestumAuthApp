import { useRef, useEffect } from 'react'
import {
    Animated,
    Pressable,
    Text,
    ActivityIndicator,
    GestureResponderEvent,
} from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { hexWithAlpha } from '../../utils/hexWithAlpha'

type Variant = 'button' | 'text'

type ButtonProps = {
    text: string
    backgroundColor?: string
    textColor?: string
    fontSize?: number
    fontFamily?: string
    loading?: boolean
    loaderColor?: string
    shakeTrigger?: boolean
    disabled?: boolean
    variant?: Variant
    onPress: (event: GestureResponderEvent) => void
}

const Button = ({
    text,
    variant = 'button',
    backgroundColor = '#EB0057',
    textColor = '#FFFFFF',
    fontSize,
    fontFamily,
    loading = false,
    loaderColor,
    disabled = false,
    shakeTrigger,
    onPress,
}: ButtonProps) => {
    const theme = useTheme()
    const shakeValue = useRef(new Animated.Value(0)).current
    const didMountRef = useRef(false)

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            return
        }   
        shakeValue.setValue(0)
        Animated.sequence([
            Animated.timing(shakeValue, { toValue: 1, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: -1, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: 1, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeValue, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start()
    }, [shakeTrigger])

    return (
        <AnimatedContainer
            style={{
                transform: [
                    {
                        translateX: shakeValue.interpolate({
                            inputRange: [-1, 1],
                            outputRange: [-8, 8],
                        }),
                    },
                ],
            }}
        >
            <StyledPressable
                disabled={disabled || loading}
                $variant={variant}
                $backgroundColor={backgroundColor}
                $disabled={disabled}
                onPress={onPress}
                style={({ pressed }) => [
                    variant === 'button' && pressed && {
                        backgroundColor: hexWithAlpha(backgroundColor, 0.8)
                    }
                ]}
            >
                {({ pressed }) =>
                    loading ? (
                        <ActivityIndicator size="small" color={loaderColor || textColor} />
                    ) : (
                        <StyledText
                            $variant={variant}
                            $fontSize={fontSize ? fontSize : theme.textSize.small}
                            $fontFamily={fontFamily ? fontFamily : theme.fontFamily.bold}
                            style={{
                                color: pressed && variant === 'text' ? hexWithAlpha(textColor, 0.7) : textColor
                            }}
                        >
                            {text}
                        </StyledText>
                    )
                }
            </StyledPressable>
        </AnimatedContainer>
    )
}

export default Button

const AnimatedContainer = styled(Animated.View)``

const StyledPressable = styled(Pressable)<{ $variant: Variant, $disabled: boolean, $backgroundColor: string }>`
    border-radius: ${({ theme }) => theme.button.borderRadius}px;
    ${({ theme, $variant, $disabled, $backgroundColor}) => $variant === 'button' && `
        height: ${theme.button.height}px;
        align-items: center;
        justify-content: center;
        padding-vertical: ${theme.spacing.medium}px;
        padding-horizontal: ${theme.spacing.large}px;
        background-color: ${$disabled ? '#d3d3d3' : $backgroundColor} 
    `}
    ${({ $variant }) => $variant === 'text' && `
        padding: 0;
        background-color: transparent;
        align-self: flex-end;
        border-radius: 0;
        height: auto;
    `}
`

const StyledText = styled(Text)<{ $variant: Variant, $fontSize: number, $fontFamily: string}>`
    ${({$variant, $fontSize, $fontFamily}) => `
        font-family: ${$fontFamily}; 
        text-decoration: ${$variant === 'text' ? 'underline' : 'none'};
        font-size: ${$fontSize}px;
    `}
`
  
       
        



        

