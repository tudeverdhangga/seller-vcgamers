import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Tabs, Tab, Grid, Typography, TextField, Stack, Button, IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import VGCard from "~/components/atomic/VGCard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import ConfirmationDeleteWithIconDialog from "~/components/molecule/ConfirmationDeleteWithIconDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EFEBFF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function APIFeaturePage() {
  const { t } = useTranslation("vip");
  const [valueTab, setValueTab] = useState(0);
  const [apiWhitelist, setApiWhitelist] = useState('');
  const [urlWebhook, setUrlWebhook] = useState('');
  const [accessKey, setAccessKey] = useState('c527d84501ae885652e121215567d249bc527d84501ae885652e121215567d249b');
  const [accessTokens, setAccessTokens] = useState(Array<string>);
  const [deleteAccessToken, setDeleteAccessToken] = useState('');
  const [disableAPIWhitelistForm, setDisableAPIWhitelistForm] = useState(true);
  const [disableWebhookForm, setDisableWebhookForm] = useState(true);
  const [isOpenDeleteAccessKeyDialog, setIsOpenDeleteAccessKeyDialog] = useState(false);
  const [callbackTypes, setCallbackTypes] = useState(Array<string>);

  
	useEffect( () => {
    const callbackTypesResponse = [
      'Riwayat Saldo',
      'Withdraw',
      'List Produk',
      'Tambah Produk',
      'Edit Produk',
      'Delete Produk'
    ];
    setCallbackTypes(callbackTypesResponse);
    
    setAccessTokens(['a4c21hj1v231v31h321hg3']);
	}, []);
  
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const handleAPIWhitelist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiWhitelist(event.target.value);
  };
  const handleAccessKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessKey(event.target.value);
  };
  const handleUrlWebhook = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlWebhook(event.target.value);
  };

  const handleSubmitAPIWhitelist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(apiWhitelist);
  };
  const handleSubmitUrlWebhook = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(urlWebhook);
  };
  
  
  const clickCopyAccessKey = async () => {
    await navigator.clipboard.writeText(accessKey);
    return;
  };

  const maskStringWithChar = (str: string) => {
    let masked = str.slice(0, 5);
    for (let i = 5; i < str.length; i++) {
      masked += '*';
    }
    return masked;
  };

  const APIWhitelistTitleContentStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "common.shade.400",
  }
  const APIWhitelistSubTitleContentStyle = {
    fontSize: "12px",
    fontWeight: 400,
    color: "common.shade.300",
    mt: .5
  }
  const UrlWebhookTitleContentStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "common.shade.400"
  }
  const WebhookCheckTitleContentStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "common.shade.400",
    mt: 2
  }

  return (
    <>
      {/* API Feature */}
      <div>        
        {/* Dialog */}
        <ConfirmationDeleteWithIconDialog
          title={t("contentApi.accessKey.modalDelete.title")}
          contentDeleteAlert={maskStringWithChar(deleteAccessToken)}
          desc={t("contentApi.accessKey.modalDelete.subtitle")}
          iconSrc="/assets/caution-warning.png"
          isOpen={isOpenDeleteAccessKeyDialog}
          handleClose={() => setIsOpenDeleteAccessKeyDialog(false)}
        />

        <Grid container spacing={2} justifyContent={'space-between'} >
          <Grid item xs={12} sm={9} order={{ xs: 2, sm: 1 }}>
            <Grid container spacing={2} justifyContent={'space-between'} >
              {/* Content IP Whitelist */}
              <Grid item xs={12}>
                <TabPanel value={valueTab} index={0}>
                  <VGCard>
                    <Typography
                      component="div"
                      sx={APIWhitelistTitleContentStyle}
                    >
                      {t("contentApi.whitelist.title")}
                    </Typography>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 1}}>
                      <Grid item xs={12}>
                        <TextField
                          id="ip-whitelist"
                          label=""
                          placeholder="Contoh: 192.168.1.1, 192.168.1.2"
                          multiline
                          minRows={3}
                          fullWidth
                          InputProps={{
                            readOnly: disableAPIWhitelistForm,
                          }}
                          value={apiWhitelist}
                          onChange={handleAPIWhitelist}
                        />
                        <Typography
                          component="div"
                          sx={APIWhitelistSubTitleContentStyle}
                        >
                          {t("contentApi.whitelist.desc")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={disableAPIWhitelistForm ? 10 : 9}></Grid>
                      <Grid item xs={12} sm={disableAPIWhitelistForm ? 2 : 3}>
                        <Stack 
                          justifyContent="flex-end"
                          alignItems="center"
                          direction="row" 
                          spacing={2}>
                            {
                              disableAPIWhitelistForm ? 
                              <Button onClick={() => setDisableAPIWhitelistForm(false)} fullWidth variant="contained" color="primary" sx={{textTransform: 'none'}}>
                                {t("contentApi.whitelist.button")}
                              </Button>
                              :
                              <>
                              <Button onClick={() => {setDisableAPIWhitelistForm(true); setApiWhitelist(apiWhitelist); }} fullWidth variant="outlined" color="secondary" sx={{textTransform: 'none'}}>
                                {t("contentApi.cancelBtn")}
                              </Button>
                              <Button onClick={handleSubmitAPIWhitelist} fullWidth variant="contained" color="success" sx={{textTransform: 'none'}}>
                                {t("contentApi.saveBtn")}
                              </Button>
                              </>
                            }
                        </Stack>
                      </Grid>
                    </Grid>
                  </VGCard>
                </TabPanel>
              </Grid>

              {/* Content API Access Key */}
              <Grid item xs={12}>
                <TabPanel value={valueTab} index={1}>
                  <VGCard>
                    <Typography
                      component="div"
                      sx={APIWhitelistTitleContentStyle}
                    >
                      {t("contentApi.accessKey.title")}
                    </Typography>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 1}}>
                      <Grid item xs={9} sm={10}>
                        <TextField
                          id="access-key-text"
                          label=""
                          fullWidth
                          aria-readonly                      
                          InputProps={{
                            readOnly: true,
                          }}
                          value={accessKey}
                          onChange={handleAccessKey}
                        />
                      </Grid>
                      <Grid item xs={3} sm={2}>
                        <Stack 
                          justifyContent="flex-end"
                          alignItems="center"
                          direction="row" 
                          spacing={2}>
                            <Button 
                              variant="outlined" 
                              startIcon={<ContentCopyIcon />}
                              color="primary" 
                              sx={{textTransform: 'none'}}
                              onClick={() => void clickCopyAccessKey()}
                            >
                              {t("contentApi.accessKey.copy")}
                            </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </VGCard>
                  <VGCard>
                    <Stack 
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row" 
                      spacing={2}>
                        <Typography
                          component="div"
                          sx={APIWhitelistTitleContentStyle}
                        >
                          {t("contentApi.accessKey.title")}
                        </Typography>
                        <div>
                          <IconButton aria-label="delete" size="small">
                            <ReplayIcon color="primary" fontSize="inherit" /> 
                            <Typography
                              component="span"
                              color="primary"
                              sx={{fontSize: "12px"}}
                            >
                              {t("contentApi.accessKey.generateTokenBtn")}
                            </Typography>
                          </IconButton>
                        </div>
                    </Stack>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 1}}>
                      <Grid item xs={12}>
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 280 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>
                                <Typography
                                  component="span"
                                  color="primary"
                                  sx={{fontSize: "13px"}}
                                >
                                  {t("contentApi.accessKey.tableHeaderTitle")}
                                </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {accessTokens.map((accToken, idx) => (
                                <TableRow
                                  key={idx}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {maskStringWithChar(accToken)}
                                  </TableCell>
                                  <TableCell align="right">
                                  <IconButton 
                                    aria-label="delete" 
                                    size="small"
                                    onClick={() => {
                                      setDeleteAccessToken(accToken)
                                      setIsOpenDeleteAccessKeyDialog(true)
                                    }}
                                  >
                                    <Typography
                                      component="span"
                                      color="error"
                                      sx={{fontSize: "12px"}}
                                    >
                                      {t("contentApi.accessKey.deleteBtn")}
                                    </Typography>
                                  </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </VGCard>
                </TabPanel>
              </Grid>

              {/* Content Webhook */}
              <Grid item xs={12}>
                <TabPanel value={valueTab} index={2}>
                  <VGCard>
                    <Typography
                      component="div"
                      sx={UrlWebhookTitleContentStyle}
                    >
                      {t("contentApi.webhook.title")}
                    </Typography>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 1}}>
                      <Grid item xs={12}>
                        <TextField
                          id="ip-whitelist"
                          label=""
                          placeholder="Input URL"
                          fullWidth
                          InputProps={{
                            readOnly: disableWebhookForm,
                          }}
                          value={urlWebhook}
                          onChange={handleUrlWebhook}
                        />
                      </Grid>
                      <Grid item xs={12} sm={disableWebhookForm ? 10 : 9}></Grid>
                      <Grid item xs={12} sm={disableWebhookForm ? 2 : 3}>
                        <Stack 
                          justifyContent="flex-end"
                          alignItems="center"
                          direction="row" 
                          spacing={2}>
                            {
                              disableWebhookForm ? 
                              <Button onClick={() => setDisableWebhookForm(false)} fullWidth variant="contained" color="primary" sx={{textTransform: 'none'}}>
                                {t("contentApi.whitelist.button")}
                              </Button>
                                :
                                <>
                                <Button onClick={() => {setDisableWebhookForm(true); setUrlWebhook(urlWebhook); }} fullWidth variant="outlined" color="secondary" sx={{textTransform: 'none'}}>
                                  {t("contentApi.cancelBtn")}
                                </Button>
                                <Button onClick={handleSubmitUrlWebhook} fullWidth variant="contained" color="success" sx={{textTransform: 'none'}}>
                                  {t("contentApi.saveBtn")}
                                </Button>
                                </>
                            }
                        </Stack>
                      </Grid>
                    </Grid>
                    <Typography
                      component="div"
                      sx={WebhookCheckTitleContentStyle}
                    >
                      {t("contentApi.webhook.checkTitle")}
                    </Typography>
                    <FormGroup>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 1}}>
                      {
                        callbackTypes.map((val, idx) => {
                          return (<Grid key={idx} item xs={6}>
                            <FormControlLabel disabled={disableWebhookForm} control={<Checkbox />} label={val} />
                          </Grid>)
                        })
                      }
                    </Grid>
                    </FormGroup>
                  </VGCard>
                </TabPanel>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={12} sm={3} order={{ xs: 1, sm: 2 }}>
            <VGCard>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={valueTab}
                onChange={handleChangeTab}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab label={t("contentApi.whitelist.tab")} sx={{textTransform: 'none'}} {...a11yProps(0)} />
                <Tab label={t("contentApi.accessKey.tab")} sx={{textTransform: 'none'}} {...a11yProps(1)} />
                <Tab label={t("contentApi.webhook.tab")} sx={{textTransform: 'none'}} {...a11yProps(2)} />
              </Tabs>
            </VGCard>
          </Grid>
        </Grid>
      </div>
      
    </>
  )
}

