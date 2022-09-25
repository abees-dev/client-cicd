import { useCookies } from 'react-cookie';

export default function useCookiesTheme() {
  const [cookie, setCookie] = useCookies(['themeMode']);

  const setThemeMode = (mode: string) => {
    setCookie('themeMode', mode, {
      path: '/',
      sameSite: 'lax',
    });
  };

  return {
    themeMode: cookie.themeMode,
    setThemeMode,
  };
}
