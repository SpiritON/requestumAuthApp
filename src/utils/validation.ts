export const validateEmail = (email: string): boolean => {
    const regex = /^.{3,}@\S+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

export const validatePassword = (password: string): boolean => {
    return password.length >= 8
}