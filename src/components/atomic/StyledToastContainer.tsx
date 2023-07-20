import { styled } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    background-color: #ceecd1 !important;
    color: #00870e !important;
  }
  .Toastify__close-button {
    display: none;
  }
  .Toastify__toast-icon {
    display: none;
  }
  .Toastify__toast-body {
    color: #00870e;
    text-align: center;
    font-family: Rajdhani;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
  }
  .Toastify__progress-bar {
    background-color: #00870e !important;
  }
`;

export default StyledToastContainer;
