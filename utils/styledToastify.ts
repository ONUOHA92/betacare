import { ToastContainer } from 'react-toastify'
import { styled } from '@mui/material/styles'

export const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__progress-bar--error {
    background: white;
    margin-bottom: 0.3%;
  }
  .Toastify__progress-bar--success {
    background: white;
    margin-bottom: 0.3%;
  }
  .Toastify__toast--error {
    background: #e74c3c;
    color: white;
  }
  .Toastify__toast--default {
    background: #fff;
    color: #aaa;
  }
  .Toastify__toast--info {
    background: #3498db;
    color: white;
  }
  .Toastify__toast--success {
    background: #036b06;
    color: white;
  }
  .Toastify__toast--warning {
    background: #f1c40f;
    color: white;
  }
`
