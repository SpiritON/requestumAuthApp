import { useRef, useEffect } from 'react'
import {
    Animated,
    Pressable,
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
    shakeTrigger?: number
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
        if (typeof shakeTrigger === 'number') {
            shakeValue.setValue(0)
            Animated.sequence([
                Animated.timing(shakeValue, { toValue: 1, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: -1, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: 1, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start()
        }
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
                onPress={onPress}
                style={({ pressed }) => [
                    variant === 'button'
                        ? {
                            backgroundColor: disabled
                                ? '#d3d3d3'
                                : pressed
                                    ? hexWithAlpha(backgroundColor, 0.8)
                                    : backgroundColor,
                            opacity: disabled ? 0.7 : 1,
                        }
                        : {
                            backgroundColor: 'transparent',
                            opacity: disabled ? 0.7 : 1,
                        },
                ]}
            >
                {({ pressed }) =>
                    loading ? (
                        <ActivityIndicator size="small" color={loaderColor || textColor} />
                    ) : (
                        <StyledText
                            $variant={variant}
                            style={{
                                color: disabled
                                    ? '#FFFFFF'
                                    : variant === 'text' && pressed
                                        ? hexWithAlpha(textColor, 0.7)
                                        : textColor,
                                textDecorationLine: variant === 'text' ? 'underline' : 'none',
                                opacity: disabled ? 0.7 : 1,
                                fontFamily: fontFamily || theme.fontFamily.bold,
                                fontSize: fontSize || theme.textSize.small,
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

const StyledPressable = styled(Pressable)<{ $variant: Variant }>`
    border-radius: ${({ theme }) => theme.button.borderRadius}px;
    ${({ theme, $variant }) => $variant === 'button' && `
        height: ${theme.button.height}px;
        align-items: center;
        justify-content: center;
        padding-vertical: ${theme.spacing.medium}px;
        padding-horizontal: ${theme.spacing.large}px;
    `}
    ${({ $variant }) => $variant === 'text' && `
        padding: 0;
        background-color: transparent;
        align-self: flex-end;
        border-radius: 0;
        height: auto;
    `}
`

const StyledText = styled.Text<{ $variant: Variant }>``

