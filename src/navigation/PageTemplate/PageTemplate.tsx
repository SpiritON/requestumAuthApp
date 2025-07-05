import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { clearAuth, setToken, setUser } from '../../store/reducers/authSlice'
import Splash from '../../screens/Splash/Splash'
import Main from '../../screens/Main/Main'
import SignUp from '../../screens/SignUp/SignUp'
import Loading from '../../screens/Loading/Loading'
import Login from '../../screens/Login/Login'
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton'
import { getUserData } from '../../services/getUserData'
import AppBackground from '../../components/AppBackground/AppBackground'

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    Main: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const PageTemplate = () => {
    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector((state: RootState) => state.auth.token)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const checkToken = async () => {
            try {
                const savedToken = await AsyncStorage.getItem('token')
                if (savedToken) {
                    dispatch(setToken(savedToken))
                    try {
                        const res = await getUserData()
                        dispatch(setUser(res))
                    } catch {
                        await AsyncStorage.removeItem('token')
                        dispatch(clearAuth())
                    }
                } else {
                    dispatch(clearAuth())
                }
            } finally {
                setChecking(false)
            }
        }
        checkToken()
    }, [dispatch])

    if (checking) return <Loading />

    return (
        <AppBackground>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackVisible: false
                }}
            >
                {token ? (
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Splash"
                            component={Splash}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={({ navigation }) => ({
                                headerLeft: () => (
                                    <CustomBackButton onPress={() => navigation.replace('Splash')} />
                                ),
                                headerTitle: '',
                                headerTransparent: true
                            })}
                        />
                        <Stack.Screen
                            name="SignUp"
                            component={SignUp}
                            options={({ navigation }) => ({
                                headerLeft: () => (
                                    <CustomBackButton onPress={() => navigation.replace('Splash')} />
                                ),
                                headerTitle: '',
                                headerTransparent: true
                            })}
                        />
                    </>
                )}
            </Stack.Navigator>
        </AppBackground>
    )
}

export default PageTemplate