import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Tabs, Tab, Grid, Typography, TextField, Stack, Button, IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import VGCard from "~/components/atomic/VGCard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import ConfirmationDeleteWithIconDialog from "~/components/molecule/ConfirmationDeleteWithIconDialog";
import { AccessKeyApiAccess, BodyPayloadIPWhitelist, BodyPayloadWebhookConfig, CustomErrorResponse, DataCallbackWebhook, useDeleteAccessKey, useGenerateAccessKey, useGetApiAccess, useGetIPWhitelist, useGetWebhookConfig, usePostIPWhitelist, usePostWebhookConfig } from "~/services/api/api-integration";
import ConfirmationGenerateWithIconDialog from "../molecule/ConfirmationGenerateWithIconDialog";
import queryString from "query-string";
import APIFeatureSidebarMenu from "../molecule/APIFeatureSidebarMenu";
import VGTabPanel from "../atomic/VGTabPanel";
import Link from "next/link";

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

const CallbackWebhookArr = [
  {
    key: "callback_type_withdraw",
    label: "Withdraw",
    value: false
  },
  {
    key: "callback_type_notification",
    label: "Notifikasi Update VCGamers",
    value: true
  },
  {
    key: "callback_type_promo",
    label: "Update Kode promo",
    value: false
  },
  {
    key: "callback_type_transaction",
    label: "Update Transaksi",
    value: true
  },
  {
    key: "callback_type_product_stock",
    label: "Update Stok Produk",
    value: false
  },
  {
    key: "callback_type_campaign",
    label: "Update Campaign",
    value: true
  },
  {
    key: "callback_type_feature_request",
    label: "Update Fitur Layanan",
    value: false
  }
];

export default function APIFeaturePage() {
  const { t } = useTranslation("vip");
  const [valueTab, setValueTab] = useState(0);
  const [apiWhitelist, setApiWhitelist] = useState('');
  const [urlWebhook, setUrlWebhook] = useState('');
  const [secretKey, setSecretKey] = useState('c527d84501ae885652e121215567d249bc527d84501ae885652e121215567d249b');
  const [accessTokens, setAccessTokens] = useState(Array<AccessKeyApiAccess>);
  const [deleteAccessTokenID, setDeleteAccessTokenID] = useState('');
  const [deleteAccessToken, setDeleteAccessToken] = useState('');
  const [generatedAccessToken, setGeneratedAccessToken] = useState('');
  const [disableWebhookForm, setDisableWebhookForm] = useState(true);
  const [availableGenerateAccessToken, setAvailableGenerateAccessToken] = useState(false);
  const [isOpenGenerateAccessKeyDialog, setIsOpenGenerateAccessKeyDialog] = useState(false);
  const [isOpenDeleteAccessKeyDialog, setIsOpenDeleteAccessKeyDialog] = useState(false);
  const [disableAPIWhitelistForm, setDisableAPIWhitelistForm] = useState(true);
  const [callbackWebhookConfigs, setCallbackWebhookConfigs] = useState<DataCallbackWebhook>();
  const [webhookCheckboxes, setWebhookCheckboxes] = useState(CallbackWebhookArr);
  const [menuPosition, setMenuPosition] = useState(0);
  const getIPWhitelist = useGetIPWhitelist();
  const postIPWhitelist = usePostIPWhitelist();
  const getWebhookConfig = useGetWebhookConfig();
  const postWebhookConfig = usePostWebhookConfig();
  const getApiAccess = useGetApiAccess();
  const postGenerateAccessKey = useGenerateAccessKey();
  
	useEffect( () => {
    setAccessTokens([{
      "id": "1ed7e28c-df2b-498a-a59e-3ec09147b510",
      "access_key": "JRqO*******"
    }]);
	}, []);
  
  useEffect(() => {
    if(getIPWhitelist?.data?.data) {
      setApiWhitelist(getIPWhitelist.data.data.ip_whitelist)
    }
    if(getWebhookConfig?.data?.data) {
      setCallbackWebhookConfigs(getWebhookConfig.data.data);
      setUrlWebhook(getWebhookConfig.data.data.callback_url);
      handleWebhookChecboxesState(getWebhookConfig.data.data);
    }
    if(getApiAccess?.data?.data) {
      setSecretKey(getApiAccess.data.data.secret_key);
      setAvailableGenerateAccessToken(getApiAccess.data.data.can_generate_access_key);
      setAccessTokens(getApiAccess.data.data.access_keys);
    }
  }, [
    getIPWhitelist.data,
    getWebhookConfig.data,
    getApiAccess.data,
  ])

  const changeMenuPosition = (value: number) => {
    setMenuPosition(value);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const handleAPIWhitelist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiWhitelist(event.target.value);
  };
  const handleAccessKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(event.target.value);
  };
  const handleUrlWebhook = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlWebhook(event.target.value);
  };

  const handleSubmitAPIWhitelist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const payload: BodyPayloadIPWhitelist = {
      ip_list: apiWhitelist
    }
    postIPWhitelist.mutate(payload, {
      onSuccess: () => {
        void getIPWhitelist.refetch()
        setDisableAPIWhitelistForm(true);
      },
      onError: (error) => {
        const err = error as CustomErrorResponse
        console.log("Err: ", err.response.data);
      }
    });
  };

  const collectValueOfWebhookChecboxes = () => {
    const checkedItems = webhookCheckboxes.reduce<{ [key: string]: boolean }>((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return checkedItems;
  };

  const handleSubmitUrlWebhook = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const checkedItemObject = collectValueOfWebhookChecboxes();

    const payloads: BodyPayloadWebhookConfig = {
      callback_url: urlWebhook,
      callback_type_withdraw: checkedItemObject["callback_type_withdraw"] ? checkedItemObject["callback_type_withdraw"] : false,
      callback_type_notification: checkedItemObject["callback_type_notification"] ? checkedItemObject["callback_type_notification"] : false,
      callback_type_promo: checkedItemObject["callback_type_promo"] ? checkedItemObject["callback_type_promo"] : false,
      callback_type_transaction: checkedItemObject["callback_type_transaction"] ? checkedItemObject["callback_type_transaction"] : false,
      callback_type_product_stock: checkedItemObject["callback_type_product_stock"] ? checkedItemObject["callback_type_product_stock"] : false,
      callback_type_campaign: checkedItemObject["callback_type_campaign"] ? checkedItemObject["callback_type_campaign"] : false,
      callback_type_feature_request: checkedItemObject["callback_type_feature_request"] ? checkedItemObject["callback_type_feature_request"] : false
    };
    
    postWebhookConfig.mutate(payloads, {
      onSuccess: () => {
        void getWebhookConfig.refetch()
        setDisableWebhookForm(true);
      },
      onError: (error) => {
        const err = error as CustomErrorResponse
        console.log("Err: ", err.response.data);
      }
    });
  };

  const handleWebhookChecboxesState = (payloads: DataCallbackWebhook) => {
    const webhookCheckboxesTemp = webhookCheckboxes.map((item, idx) => {
      if (item.key in payloads) {
        const itemValue = payloads[item.key as keyof DataCallbackWebhook]
        if (item.key !== 'callback_url' && typeof itemValue === 'boolean') { // isBooleanObject(itemValue)
          return { ...item, value: itemValue};
        }
      }
      return item;
    });

    setWebhookCheckboxes(webhookCheckboxesTemp);
  };

  const handleWebhookCheckbox = (itemKey: string) => {
    const webhookCheckboxesTemp = webhookCheckboxes.map((item, idx) => {
      if (item.key === itemKey) {
        return { ...item, value: !item.value };
      }
      return item;
    });

    setWebhookCheckboxes(webhookCheckboxesTemp);
  };

  const handleGenerateAccessToken = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    postGenerateAccessKey.mutate(undefined, {
      onSuccess: (res) => {
        console.log("res: ", res)
        setGeneratedAccessToken(res?.data.access_key);
        setIsOpenGenerateAccessKeyDialog(true);
        void getApiAccess.refetch();
      },
      onError: (error) => {
        const err = error as CustomErrorResponse
        console.log("Err: ", err.response.data);
      }
    });

    void getApiAccess.refetch()
  };

  const deleteAccessTokenAction = useDeleteAccessKey(queryString.stringify({id: deleteAccessTokenID}));
  const handleDeleteAccessToken = () => {
    deleteAccessTokenAction.mutate(undefined, {
      onSuccess: (res) => {
        console.log("result: ",res)
        void getApiAccess.refetch();
        setIsOpenDeleteAccessKeyDialog(false);
      },
      onError: (error) => {
        const err = error as CustomErrorResponse
        console.log("Err: ", err.response.data);
        void getApiAccess.refetch();
        setIsOpenDeleteAccessKeyDialog(false);
      }
    });
  };

  const clickCopyAccessKey = async () => {
    await navigator.clipboard.writeText(secretKey);
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
    fontSize: {xs: "14px", xl: "16px"},
    fontWeight: 600,
    color: "common.shade.400",
  }
  const APIContentHyperlinkStyle = {
    fontSize: {xs: "14px", xl: "16px"},
    fontWeight: 600,
    color: "#7750F8",
    textAlign: "right"
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
          handleSubmit={handleDeleteAccessToken}
        />

        <ConfirmationGenerateWithIconDialog
          title={t("contentApi.accessKey.modalGenerate.title")}
          contentGenerateAlert={generatedAccessToken}
          isOpen={isOpenGenerateAccessKeyDialog}
          handleClose={() => setIsOpenGenerateAccessKeyDialog(false)}
          handleCopy={() => navigator.clipboard.writeText(generatedAccessToken)}
        />

        <Grid container spacing={2} justifyContent={'space-between'} >
          <Grid item xs={12} sm={10} order={{ xs: 2, sm: 1 }} sx={{mt: {xs:4,sm:0}}}>
            <Grid container spacing={2} justifyContent={'space-between'} >
              {/* Content IP Whitelist */}
                <VGTabPanel value={menuPosition} index={0} sx={{ ml: 2, width: "99%" }}>
                  <VGCard>
                    <Typography
                      component="div"
                      sx={APIWhitelistTitleContentStyle}
                    >
                      {t("contentApi.whitelist.title")}
                    </Typography>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 0}}>
                      <Grid item xs={12}>
                        <TextField
                          id="ip-whitelist"
                          label=""
                          placeholder="Contoh: 192.168.1.1, 192.168.1.2"
                          multiline
                          minRows={3}
                          fullWidth
                          InputProps={{
                            disabled: disableAPIWhitelistForm,
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
                </VGTabPanel>

              {/* Content API Access Key */}
                <VGTabPanel value={menuPosition} index={1} sx={{ ml: 2, width: "99%" }}>
                  <VGCard>
                    <Grid container spacing={1} rowSpacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 0}}>
                      <Grid item xs={6}>
                        <Typography
                          component="div"
                          sx={APIWhitelistTitleContentStyle}
                        >
                          {t("contentApi.accessKey.title")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Link href="#" target="_blank" style={{ textDecoration: "none" }}>
                            <Typography
                              component="div"
                              sx={APIContentHyperlinkStyle}
                            >
                              {t("contentApi.accessKey.hyperlink")}
                            </Typography>
                          </Link>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} rowSpacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 0}}>
                      <Grid item xs={9} sm={10}>
                        <TextField
                          id="access-key-text"
                          label=""
                          fullWidth
                          aria-readonly                      
                          InputProps={{
                            readOnly: true,
                          }}
                          inputProps={{ style: { lineHeight: '24px' } }}
                          value={secretKey}
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
                              sx={{textTransform: 'none', lineHeight: '3', borderRadius: '10px'}}
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
                        {
                          availableGenerateAccessToken == true ? <div>
                          <IconButton 
                            aria-label="delete" 
                            size="small"
                            onClick={handleGenerateAccessToken}
                          >
                            <ReplayIcon color="primary" fontSize="inherit" /> 
                            <Typography
                              component="span"
                              color="primary"
                              sx={{fontSize: "12px"}}
                            >
                              {t("contentApi.accessKey.generateTokenBtn")}
                            </Typography>
                          </IconButton>
                        </div> : ''
                        }
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
                                  sx={{fontSize: "13px", fontWeight: 600}}
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
                                    {accToken.access_key}
                                  </TableCell>
                                  <TableCell align="right">
                                  <IconButton 
                                    aria-label="delete" 
                                    size="small"
                                    onClick={() => {
                                      setDeleteAccessTokenID(accToken.id)
                                      setDeleteAccessToken(accToken.access_key)
                                      setIsOpenDeleteAccessKeyDialog(true)
                                    }}
                                  >
                                    <Typography
                                      component="span"
                                      color="error"
                                      sx={{fontSize: "12px", fontWeight: 600}}
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
                </VGTabPanel>

              {/* Content Webhook */}
                <VGTabPanel value={menuPosition} index={2} sx={{ ml: 2, width: "99%" }}>
                  <VGCard>
                    <Typography
                      component="div"
                      sx={UrlWebhookTitleContentStyle}
                    >
                      {t("contentApi.webhook.title")}
                    </Typography>
                    <Grid container spacing={1} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 0}}>
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
                        webhookCheckboxes.map((val, idx) => {
                          return (<Grid key={idx} item xs={6}>
                            <FormControlLabel disabled={disableWebhookForm} 
                            control={
                              <Checkbox
                                checked={val.value}
                                onChange={(_, checked) => handleWebhookCheckbox(val.key)}
                              />
                            } 
                            label={val.label} />
                          </Grid>)
                        })
                      }
                    </Grid>
                    </FormGroup>
                  </VGCard>
                </VGTabPanel>

            </Grid>
          </Grid>

          <Grid item xs={12} sm={2} order={{ xs: 1, sm: 2 }}>
            <APIFeatureSidebarMenu
              position={menuPosition}
              setPosition={changeMenuPosition}
            />
          </Grid>
        </Grid>
      </div>
      
    </>
  )
}

