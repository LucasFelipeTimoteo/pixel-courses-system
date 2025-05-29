import { Typography } from '@mui/material'
import { styles } from './loading.style'

export default function Loading() {
  return (
    <div style={{...styles.loadingContainer}} data-testid="loading">
      <Typography variant="h4" component="p" color='primary'>
        LOADING...
      </Typography>
    </div>
  )
}