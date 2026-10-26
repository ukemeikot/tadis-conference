import { c } from '../config/theme'

/** The coral play button used on every recording thumbnail. */
export function PlayDisc({ size }: { size: number }) {
  const triangle = Math.round(size * 0.29)
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        margin: `${-size / 2}px 0 0 ${-size / 2}px`,
        borderRadius: 999,
        background: c.coral,
        boxShadow: '0 0 0 8px rgba(225,81,42,0.25), 0 16px 34px rgba(0,0,0,0.45)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <span
        style={{
          width: 0,
          height: 0,
          marginLeft: triangle / 3.5,
          borderTop: `${triangle / 2}px solid transparent`,
          borderBottom: `${triangle / 2}px solid transparent`,
          borderLeft: `${triangle * 0.8}px solid #fff`,
        }}
      />
    </div>
  )
}
