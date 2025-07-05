
interface ITheme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        red: string;
        white: string;
        grey: string;
        error: string;
    },
    textColor: {
        primary: string;
        secondary: string;
        red: string;
    },
    spacing: {
        small: number;
        medium: number;
        large: number;
    },
    borderRadius: {
        small: number;
        medium: number;
        large: number;
    },
    textSize: {
        extraSmall: number;
        small: number;
        medium: number;
        large: number;
        input: number;
        labelActive: number;
    },
    fontFamily: {
        regular: string,
        medium: string,
        semiBold: string,    
        bold: string,
    },
    input: {
        height: number;
        border: number;
        leftIconSize: number;
        rightIconSize: number;
    },
    button: {
        height: number,
        borderRadius: number,
    }
}

export const theme = {
    colors: {
        primary: '#EB0057',
        secondary: '#262727',
        background: '#1D1D1D',
        red: '#EB0057',
        white: '#fff',
        grey: '#818181',
        error: '#ff1744'
    },
    textColor: {
        primary: '#FFFFFF',
        secondary: '#818181',
        red: '#EB0057',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
    borderRadius: {
        small: 4,
        medium: 8,
        large: 16,
    },
    textSize: {
        extraSmall: 11,
        small: 12,
        medium: 16,
        large: 18,
        input: 12,     
        labelActive: 10
    },
    fontFamily: {
        regular: 'Montserrat-Regular',
        medium: 'Montserrat-Medium',
        semiBold: 'Montserrat-SemiBold',    
        bold: 'Montserrat-Bold',
    },
    input: {
        height: 50,
        border: 1,
        leftIconSize: 28,
        rightIconSize: 28
    },
    button: {
        height: 50,
        borderRadius: 8,
    }
} as ITheme

export type AppTheme =  ITheme