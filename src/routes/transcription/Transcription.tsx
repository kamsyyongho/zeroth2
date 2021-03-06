import Paper from '@material-ui/core/Paper';
import { Box, Card, CardContent, CardHeader, Container, Grid, TextField, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {useSnackbar, VariantType} from 'notistack';
import { SNACKBAR_VARIANTS } from '../../types/snackbar.types';
import clsx from 'clsx';
import { RouteComponentProps } from "react-router";
import { useHistory } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useGlobal } from "reactn";
import { BulletList } from 'react-content-loader';
import { PERMISSIONS } from '../../constants';
import { I18nContext } from '../../hooks/i18n/I18nContext';
import { KeycloakContext } from '../../hooks/keycloak/KeycloakContext';
import { ApiContext } from '../../hooks/api/ApiContext';
import { ProblemKind } from '../../services/api/types';
import {
    AcousticModel,
    DataSet,
    VoiceData,
    VoiceDataResults,
    LanguageModel,
    ModelConfig,
    PATHS,
    Project,
    SubGraph,
    TopGraph,
    BooleanById,
    PaginatedResults,
    TranscriberStats,
    SnackbarError } from '../../types';
import SET from '../projects/set/SET';
import { TDP } from '../projects/TDP/TDP';
import { TranscriptionTable } from './components/TranscriptionTable';
import log from '../../util/log/logger';
import { setPageTitle } from '../../util/misc';
import { AddTranscriberDialog } from '../projects/set/components/AddTranscriberDialog';
import { NotFound } from '../shared/NotFound';
import { CustomTheme } from '../../theme';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.default,
        },
        card: {
            backgroundColor: theme.palette.background.default,
            justifyContent: 'flex-start',
        },
        cardContent: {
            marginLeft: 10,
            padding: 0,
        },
        infoBox: {
            minHeight: 180,
        },
        boxSpacing: {
            marginRight: theme.spacing(1),
        },
        apiHeading: {
            minWidth: 75,
            margin: theme.spacing(1),
        },
        summaryHeading: {
            minWidth: 75,
            margin: theme.spacing(1),
            size: '16px',
            color: '#077db5'
        },
        apiInfo: {
            minWidth: 250,
            backgroundColor: theme.palette.grey[200],
        },
        refreshButton: {
            marginTop: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }),
);

export function Transcription() {
    //temporary hardcoded projectId for setting up dummy component
    const [pagination, setPagination] = React.useState<PaginatedResults>({} as PaginatedResults);
    const [isForbidden, setIsForbidden] = React.useState(false);
    // const { projectId } = match.params;
    const { translate } = React.useContext(I18nContext);
    const api = React.useContext(ApiContext);
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { hasPermission, roles } = React.useContext(KeycloakContext);
    const [navigationProps, setNavigationProps] = useGlobal('navigationProps');
    const [voiceDataResults, setVoiceDataResults] = React.useState<VoiceDataResults>({} as VoiceDataResults);
    const [selectedVoiceData, setSelectedVoiceData] = React.useState<VoiceData | undefined>();
    const [selectedVoiceDataIndex, setSelectedVoiceDataIndex] = React.useState<number>(0);
    const [isConfirmationOpen, setIsConfirmationOpen] = React.useState<boolean>(false);
    const [isConfirm, setIsConfirm] = React.useState<boolean>(true);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showStatus, setShowStatus] = React.useState<boolean>(false);

    const theme: CustomTheme = useTheme();
    const classes = useStyles();

    const hasAdminPermissions = React.useMemo(() => hasPermission(roles, PERMISSIONS.projects.administration), [roles]);
    const hasModelConfigPermissions = React.useMemo(() => hasPermission(roles, PERMISSIONS.modelConfig), [roles]);
    const hasTdpPermissions = React.useMemo(() => hasPermission(roles, PERMISSIONS.projects.TDP), [roles]);

    const getVoiceDataInReview = async (options: any = {}) => {
        if (api?.voiceData) {
            // const response = await api.voiceData.getHistory();
            const response = await api.voiceData.getDataToReview(options);
            if (response.kind === 'ok') {
                setShowStatus(false);
                setVoiceDataResults(response.data);
            } else {
                log({
                    file: `ProjectDetails.tsx`,
                    caller: `getVoiceDataInReview - failed to get data sets`,
                    value: response,
                    important: true,
                });
            }
        }
    };

    const getAllVoiceData = async () => {
        if (api?.voiceData) {
            const response = await api.voiceData.getHistory();
            // const response = await api.voiceData.getDataToReview();
            if (response.kind === 'ok') {
                setShowStatus(true);
            } else {
                log({
                    file: `ProjectDetails.tsx`,
                    caller: `getVoiceDataInReview - failed to get data sets`,
                    value: response,
                    important: true,
                });
            }
        }
    };

    const handlePagination = (pageIndex: number, size: number) => getVoiceDataInReview({page: pageIndex, size});

    const setSelectionAndOpenDialog = (index: number) => {
        setSelectedVoiceDataIndex(index);
        setSelectedVoiceData(voiceDataResults.content[index]);
        setIsConfirmationOpen(true);
    }

    const handleConfirmationClick = (voiceDataIndex: number) => {
        setIsConfirm(true);
        setSelectionAndOpenDialog(voiceDataIndex)
    };

    const handleRejectClick = (voiceDataIndex: number) => {
        setIsConfirm(false);
        setSelectionAndOpenDialog(voiceDataIndex)
    };

    const handleConfirmation = async () => {
        if (api?.voiceData && voiceDataResults && selectedVoiceData) {
            setIsLoading(true);
            setIsConfirmationOpen(false);
            const response = await api.voiceData.confirmData(selectedVoiceData.projectId, selectedVoiceData.id);
            let snackbarError: SnackbarError | undefined = {} as SnackbarError;
            if (response.kind === 'ok') {
                const copyData = voiceDataResults.content.slice();
                snackbarError = undefined;
                copyData.splice(selectedVoiceDataIndex, 1);
                const updateVoiceDataResults = JSON.parse(JSON.stringify(voiceDataResults));
                Object.assign(updateVoiceDataResults, {content: copyData});
                setVoiceDataResults(updateVoiceDataResults)
                // setVoiceData(copyData);
                enqueueSnackbar(translate('common.success'), { variant: SNACKBAR_VARIANTS.success });
                // to trigger the `useEffect` to fetch more
                // setVoiceData(undefined);
            } else {
                log({
                    file: `EditorPage.tsx`,
                    caller: `confirmData - failed to confirm segments`,
                    value: response,
                    important: true,
                });
                snackbarError.isError = true;
                const { serverError } = response;
                if (serverError) {
                    snackbarError.errorText = serverError.message || "";
                }
            }
            snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
            setIsLoading(false);
        }
    };

    const handleRejection = async () => {
        if (api?.voiceData && voiceDataResults && selectedVoiceData) {
            setIsLoading(true);
            setIsConfirmationOpen(false);
            const response = await api.voiceData.rejectData(selectedVoiceData.projectId, selectedVoiceData.id);
            let snackbarError: SnackbarError | undefined = {} as SnackbarError;
            if (response.kind === 'ok') {
                const copyData = voiceDataResults.content.slice();
                snackbarError = undefined;
                copyData.splice(selectedVoiceDataIndex, 1);
                const updateVoiceDataResults = JSON.parse(JSON.stringify(voiceDataResults));
                Object.assign(updateVoiceDataResults, {content: copyData});
                setVoiceDataResults(updateVoiceDataResults)
                enqueueSnackbar(translate('common.success'), { variant: SNACKBAR_VARIANTS.success });
                // to trigger the `useEffect` to fetch more
                // setVoiceData(undefined);
            } else {
                log({
                    file: `Transcription.tsx`,
                    caller: `confirmData - failed to confirm segments`,
                    value: response,
                    important: true,
                });
                snackbarError.isError = true;
                const { serverError } = response;
                if (serverError) {
                    snackbarError.errorText = serverError.message || "";
                }
            }
            snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        setPageTitle(translate('admin.pageTitle'));
        getVoiceDataInReview();
    }, []);

    const renderSummary = () => {
        return (<Card elevation={0} className={classes.card} >
            <CardHeader
                title={<Typography variant='h4'>{translate('admin.pageTitle')}</Typography>}
            />
            <CardContent className={classes.cardContent} >
                {isLoading ? <BulletList /> :
                    <Grid
                        container
                        direction='row'
                        justify='flex-start'
                        alignItems='flex-start'
                        alignContent='center'
                        spacing={2}
                    >
                        <Grid
                            container
                            item
                            direction='column'
                            component={Box}
                            border={1}
                            borderColor={theme.table.border}
                            xs={5}
                            className={clsx(classes.infoBox, classes.boxSpacing)}
                        >
                            <Typography align='left' className={classes.summaryHeading} >{translate('common.summary')}</Typography>
                            <Grid
                                container
                                item
                                direction='row'
                                justify='flex-start'
                                alignItems='center'
                                alignContent='center'
                            >
                                <Typography align='left' className={classes.apiHeading} >{translate('projects.apiKey')}</Typography>
                                <TextField
                                    id="api-key"
                                    value={""}
                                    className={clsx(classes.textField, classes.apiInfo)}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </CardContent>
        </Card>);
        if (!voiceDataResults) {
            return <NotFound text={translate('projects.notFound')} />;
        }
    };

    return (
        <Container>
            <Paper square elevation={0} className={classes.root} >
                {isLoading && <ScaleLoader
                    color={theme.palette.common.white}
                    loading={true}
                />}
                <ConfirmationDialog
                    open={isConfirmationOpen}
                    buttonMsg={isConfirm ? translate('common.confirm') : translate('common.reject')}
                    contentMsg={isConfirm ? translate('admin.approveMsg') : translate('admin.rejectMsg')}
                    isConfirm={isConfirm}
                    onClose={() => setIsConfirmationOpen(false)}
                    onConfirm={handleConfirmation}
                    onReject={handleRejection} />
                {
                    isLoading ? <BulletList /> : renderSummary()
                }
                {voiceDataResults &&
                    <TranscriptionTable
                        voiceDataResults={voiceDataResults}
                        handlePagination={handlePagination}
                        getAllVoiceData={getAllVoiceData}
                        getVoiceDataInReview={getVoiceDataInReview}
                        handleConfirmationClick={handleConfirmationClick}
                        handleRejectClick={handleRejectClick}
                        showStatus={showStatus}
                    />
                }
            </Paper>
        </Container>
    );
}