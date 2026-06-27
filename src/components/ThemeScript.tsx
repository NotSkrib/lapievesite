// Runs before paint to set the .dark class from the saved choice or the
// system preference, avoiding a flash of the wrong theme.
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t!=='light'&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
