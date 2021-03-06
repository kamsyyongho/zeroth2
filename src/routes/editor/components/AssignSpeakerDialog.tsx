import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckIcon from '@material-ui/icons/Check';
import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import MoonLoader from 'react-spinners/MoonLoader';
import React from 'reactn';
import * as yup from 'yup';
import { ApiContext } from '../../../hooks/api/ApiContext';
import { I18nContext } from '../../../hooks/i18n/I18nContext';
import { Segment, SnackbarError, SNACKBAR_VARIANTS, WordAlignment } from '../../../types';
import log from '../../../util/log/logger';
import { InputSelectFormField } from '../../shared/form-fields/InputSelectFormField';

interface AssignSpeakerDialogProps {
  open: boolean;
  projectId: string;
  dataId: string;
  speakers: string[];
  onSpeakersUpdate: (speakers: string[]) => void;
  segment?: Segment;
  segmentIndex?: number;
  onClose: () => void;
  onSuccess: (updatedSegment: Segment, segmentIndex: number) => void;
}


export function AssignSpeakerDialog(props: AssignSpeakerDialogProps) {
  const {
    open,
    projectId,
    dataId,
    speakers,
    onSpeakersUpdate,
    segment,
    segmentIndex,
    onClose,
    onSuccess,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = React.useContext(I18nContext);
  const api = React.useContext(ApiContext);
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const speakerReducer = (accumulator: string, currentValue: WordAlignment) => currentValue.speaker || '';
  const speaker = segment?.wordAlignments.reduce(speakerReducer, '') || '';
  // const speaker = segment?.speaker || '';
  const segmentId = segment?.id || '';

  const theme = useTheme();
  // to expand to fullscreen on small displays
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const formSchema = yup.object({
    speaker: yup.string().trim(),
  });
  type FormValues = yup.InferType<typeof formSchema>;
  const initialValues: FormValues = {
    speaker,
  };

  const handleSubmit = async (values: FormValues) => {
    if (api?.voiceData && !loading && segmentId && segment && typeof segmentIndex === 'number') {
      setLoading(true);
      setIsError(false);
      const speaker = values.speaker.trim();
      const indices = segment.wordAlignments.map((word: WordAlignment, index: number) => index);
      const response = await api.voiceData.updateSpeaker(projectId, dataId, segmentId, speaker, indices);
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;
      if (response.kind === 'ok') {
        snackbarError = undefined;
        enqueueSnackbar(translate('common.success'), { variant: SNACKBAR_VARIANTS.success });
        const speakersSet = new Set(speakers);
        if (!speakersSet.has(speaker)) {
          speakers.push(speaker);
          onSpeakersUpdate(speakers);
        }
        const updatedSegment = { ...segment };
        updatedSegment.wordAlignments.forEach(word => word.speaker = speaker);
        onSuccess(updatedSegment, segmentIndex);
        onClose();
      } else {
        log({
          file: `AssignSpeakerDialog.tsx`,
          caller: `handleSubmit - failed to assign speaker`,
          value: response,
          important: true,
        });
        snackbarError.isError = true;
        setIsError(true);
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      setLoading(false);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      aria-labelledby="invite-dialog"
      style={{zIndex: 1600}}
    >
      <DialogTitle id="invite-dialog">{translate(speaker ? "editor.changeSpeaker" : "editor.addSpeaker")}</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formSchema}>
        {(formikProps) => (
          <>
            <DialogContent>
              <Form>
                <Field
                  autoFocus
                  options={speakers}
                  name='speaker'
                  component={InputSelectFormField}
                  label={translate("forms.speaker")}
                  errorOverride={isError}
                />
              </Form>
            </DialogContent>
            <DialogActions>
              <Button disabled={loading} onClick={onClose} color="primary">
                {translate("common.cancel")}
              </Button>
              <Button
                disabled={!formikProps.isValid || loading}
                onClick={formikProps.submitForm}
                color="primary"
                variant="outlined"
                startIcon={loading ?
                  <MoonLoader
                    sizeUnit={"px"}
                    size={15}
                    color={theme.palette.primary.main}
                    loading={true}
                  /> : <CheckIcon />}
              >
                {translate("editor.confirm")}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}