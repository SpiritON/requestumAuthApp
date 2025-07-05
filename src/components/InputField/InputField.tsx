import { useState, useRef, useEffect } from 'react'
import {
    TextInput,
    Animated,
    TextInputProps,
    TouchableWithoutFeedback,
} from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import EmailIcon from '../../../assets/Email.svg'
import LockIcon from '../../../assets/Lock.svg'
import EyeIcon from '../../../assets/Eye.svg'

type Variant = 'text' | 'email' | 'password'

type Props = TextInputProps & {
    label: string
    value: string 
    variant?: Variant
    onChangeText: (text: string) => void
}

const LABEL_INNER_TOP = 8
const LABEL_ANIMATION_OFFSET = 10

const InputField: React.FC<Props> = ({
    label,
    value,
    onChangeText,
    variant = 'text',

}) => {
    const theme = useTheme()
    const [focused, setFocused] = useState(false)
    const [secure, setSecure] = useState(variant === 'password')
    const inputRef = useRef<TextInput>(null)
    const animatedLabelRef = useRef(new Animated.Value(value ? 1 : 0)).current

    const hasValue = !!value && value.length > 0
    const isActive = focused || hasValue

    const activeColor = isActive ? theme.colors.red : theme.colors.grey
    const labelColor = isActive ? theme.colors.white : theme.colors.grey
    const borderColor = isActive ? theme.colors.red : theme.colors.grey
    const secureIconColor = secure ? theme.colors.grey : theme.colors.red

    const labelStyle = {
        top: animatedLabelRef.interpolate({
            inputRange: [0, 1],
            outputRange: [
                theme.input.height / 2 - LABEL_ANIMATION_OFFSET,
                LABEL_INNER_TOP,
            ],
        }),
        fontSize: animatedLabelRef.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.textSize.input, theme.textSize.labelActive],
        }),
        color: labelColor,
    }

    useEffect(() => {
        Animated.timing(animatedLabelRef, {
            toValue: isActive ? 1 : 0,
            duration: 180,
            useNativeDriver: false,
        }).start()
    }, [isActive])

    const inputLeftIcon = () => {
        if (variant === 'email')
            return (
                <IconSide>
                    <EmailIcon
                        width={theme.input.leftIconSize}
                        height={theme.input.leftIconSize}
                        fill={activeColor}
                    />
                </IconSide>
            )
        if (variant === 'password')
            return (
                <IconSide>
                    <LockIcon
                        width={theme.input.leftIconSize}
                        height={theme.input.leftIconSize}
                        fill={activeColor}
                    />
                </IconSide>
            )
        return null
    }

    const inputSecureIcon = () =>
        variant === 'password' && (
            <IconSide pointerEvents="box-none">
                <TouchableWithoutFeedback onPress={() => setSecure((prev) => !prev)}>
                    <IconPressable>
                        <EyeIcon
                            width={theme.input.rightIconSize}
                            height={theme.input.rightIconSize}
                            fill={secureIconColor}
                        />
                    </IconPressable>
                </TouchableWithoutFeedback>
            </IconSide>
        )

    return (
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <InputWrap style={{ borderColor }}>
                {inputLeftIcon()}
                <InputContent>
                    <AnimatedLabel
                        style={labelStyle}
                        pointerEvents="none"
                    >
                        {label}
                    </AnimatedLabel>
                    <TextInput
                        ref={inputRef}
                        keyboardType={variant === 'email' ? 'email-address' : 'default'}
                        value={value}
                        secureTextEntry={secure}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder=""
                        selectionColor={theme.colors.primary}
                        onChangeText={onChangeText}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={[
                            {
                                color: theme.colors.white,
                                fontSize: theme.textSize.input,
                                fontFamily: theme.fontFamily.bold,
                                padding: 0,
                                margin: 0,
                                marginTop: 20,
                                height: 30,
                                backgroundColor: 'transparent',
                            },
                        ]}
                    />
                </InputContent>
                {inputSecureIcon()}
            </InputWrap>
        </TouchableWithoutFeedback>
    )
}

export default InputField

const InputWrap = styled.View`
    width: 100%;
    height: ${({ theme }) => theme.input.height}px;
    flex-direction: row;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.medium}px;
    border-width: 1px;
    background-color: transparent;
`

const IconSide = styled.View`
    width: 48px;
    align-items: center;
    justify-content: center;
`

const IconPressable = styled.View``

const InputContent = styled.View`
    flex: 1;
    justify-content: center;
    height: 100%;
    padding-right: 4px;
`

const AnimatedLabel = styled(Animated.Text)`
    position: absolute;
    left: 0;
    font-family: ${({ theme }) => theme.fontFamily.regular};
    z-index: 2;
`

