// material-ui
import { experimentalStyled as styled } from '@material-ui/core/styles';

//-----------------------|| AUTHENTICATION 1 WRAPPER ||-----------------------//

const AuthWrapper1 = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    maxWidth: 'calc(100% + 16px)'
}));

export default AuthWrapper1;
