import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import Image from "next/image";
import { useResponsive } from "~/utils/mediaQuery";
import { useTranslation } from "next-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.blue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const profitHeaderColumnStyle = {
    color: "primary.main",
    fontSize: {xs: "14px", md: "16px"}, 
    fontWeight: "bold"
  }
const regularHeaderColumnStyle = {
    color: "common.shade.500",
    fontSize: "16px",
    fontWeight: 800
  }
  
export default function CustomizedTables(props: {
  feature: string,
  badgeSrc: string,
  rowsFeatures: Array<{
    profit: string;
    regular: string;
  }>
  children?: React.ReactNode;
}) {
  const { t } = useTranslation("requestFitur");
  const { isMobile } = useResponsive();

  return (
    <TableContainer component={Paper} sx={{mt: 2, pt: 2, backgroundColor: "#fff", borderRadius: '8px'}}>
      <Table sx={{ minWidth: 260 }} aria-label="customized table">
        {
            isMobile ? 
            (
              <>
                <TableHead>
                    <TableRow>
                        <StyledTableCell colSpan={2} sx={{textAlign: 'center'}}>
                            <Typography
                                component="div"
                                sx={profitHeaderColumnStyle}
                            >
                                {t("tableComparison.header1")}
                            </Typography>
                        </StyledTableCell>
                    </TableRow>
                  <TableRow>
                      <StyledTableCell align="center">
                          <Typography
                              component="div"
                              sx={regularHeaderColumnStyle}
                          >
                              {t("tableComparison.header2")}
                          </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          <Image
                          src={props.badgeSrc}
                          width={80}
                          height={20}
                          alt={`Badge ${props.feature}`}
                          />
                      </StyledTableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                      {props.rowsFeatures.map((row, idx) => (
                          <>
                          <StyledTableRow key={idx}>
                              <StyledTableCell colSpan={2} align="center" component="th" scope="row">
                                  {row.profit}
                              </StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow key={idx}>
                              {/* <StyledTableCell component="th" scope="row">
                              </StyledTableCell> */}
                              <StyledTableCell align="center">
                                  {
                                      (row.regular == "" || row.regular == "-") ?
                                      <HorizontalRuleOutlinedIcon sx={{color: "gray", p: 0, m: 0}} /> :
                                      <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} />
                                  }
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                  <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} />
                              </StyledTableCell>
                          </StyledTableRow>
                          </>
                      ))}
                  </TableBody>
              </>
            ) : (
                <>
                  <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography
                            component="span"
                            sx={profitHeaderColumnStyle}
                            >
                            {t("tableComparison.header1")}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography
                                component="span"
                                sx={regularHeaderColumnStyle}
                            >
                                {t("tableComparison.header2")}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Image
                            src={props.badgeSrc}
                            width={80}
                            height={20}
                            alt={`Badge ${props.feature}`}
                            />
                        </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.rowsFeatures.map((row, idx) => (
                        <StyledTableRow key={idx}>
                          <StyledTableCell component="th" scope="row">
                              {row.profit}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                              {
                                  (row.regular == "" || row.regular == "-") ?
                                  <HorizontalRuleOutlinedIcon sx={{color: "gray", p: 0, m: 0}} /> :
                                  <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} />
                              }
                          </StyledTableCell>
                          <StyledTableCell align="center">
                              <CheckOutlinedIcon sx={{color: "green", p: 0, m: 0}} />
                          </StyledTableCell>
                        </StyledTableRow>
                    ))}
                  </TableBody>
              </>
            )
        }
      </Table>
    </TableContainer>
  );
}