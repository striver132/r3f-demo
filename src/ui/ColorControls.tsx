export default function ColorControls({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const colors = {
    white: { color1: '#ffffff', color2: '#f0f0f0' },
    blue: { color1: '#4a9eff', color2: '#1e5fa8' },
    dark: { color1: '#2a2a2a', color2: '#0a0a0a' },
  }

  return (
    <div className="color-controls">
      <button
        className={value === 'white' ? 'active' : ''}
        onClick={() => onChange('white')}
        style={{
          '--btn-color-1': colors.white.color1,
          '--btn-color-2': colors.white.color2,
        } as React.CSSProperties}
        aria-label="白色主题"
      />
      <button
        className={value === 'blue' ? 'active' : ''}
        onClick={() => onChange('blue')}
        style={{
          '--btn-color-1': colors.blue.color1,
          '--btn-color-2': colors.blue.color2,
        } as React.CSSProperties}
        aria-label="蓝色主题"
      />
      <button
        className={value === 'dark' ? 'active' : ''}
        onClick={() => onChange('dark')}
        style={{
          '--btn-color-1': colors.dark.color1,
          '--btn-color-2': colors.dark.color2,
        } as React.CSSProperties}
        aria-label="暗色主题"
      />
    </div>
  )
}