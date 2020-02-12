/* eslint-disable @typescript-eslint/camelcase */
import { ResourceLanguage } from 'i18next';

export const ko: ResourceLanguage = {
  translation: {
    common: {
      okay: 'Okay',
      delete: '삭제',
      submit: '제출',
      cancel: '취소',
      back: '뒤로 가기',
      create: '생성',
      edit: '수정',
      save: '저장',
      discard: '취소',
      dismiss: '닫기',
      error: '오류',
      pageError: 'Something went wrong',
      reset: '재설정',
      success: '성공',
      failure: '실패',
      clear: 'Clear',
      clearAll: 'Clear all',
      startAt: '시작 시간',
      endAt: '종료 시간',
      length: '길이',
      score: '점수',
      upload: '업로드',
      uploaded: '업로드됨',
      uploading: '업로드중',
      forbidden: '금지',
      view: '보기',
      date: '날짜',
      version: '버전',
      open: '열기',
      invalidId: 'Invalid ID',
      notFound: 'Not found',
      noData: 'No data',
      progress: 'Progress',
      refresh: 'Refresh',
    },
    table: {
      page: 'Page',
      pageOf: 'Page {{current}} of {{total}}',
      labelDisplayedRows: '{{from}}-{{to}} of {{count}}',
      labelRowsPerPage: 'Rows per page',
      noResults: 'No results',
      filter: 'Filter',
    },
    path: {
      home: '홈',
      IAM: 'IAM',
      projects: 'Projects',
      models: 'Models',
      editor: 'Editor',
      modelTraining: 'Model Training',
    },
    menu: {
      login: '로그인',
      logout: '로그아웃',
      changeLanguage: '언어 바꾸기',
      profile: 'Profile',
    },
    profile: {
      user: 'User',
      organization: 'Organization',
      fullName: '{{family}} {{given}}',
      resetPassword: 'Reset password',
    },
    organization: {
      rename: 'Rename',
      renameOrg: 'Rename organization',
    },
    transcribers: {
      header: 'Transcriber management',
      count: 'Count',
      rating: 'Rating',
      noTranscribers: 'No transcribers',
    },
    forms: {
      validation: {
        required: 'Required',
        email: 'Email is not valid',
        number: 'Must be a number',
        integer: 'Must be an integer',
        min: '{{target}} must be greater than {{value}}',
        max: '{{target}} must be greater than {{value}}',
        greaterThan: '{{target}} must be greater than {{value}}',
        lessThan: '{{target}} must be less than {{value}}',
        greaterEqualTo: '{{target}} must be greater than or equal to {{value}}',
        lessEqualTo: '{{target}} must be less than or equal to {{value}}',
        between: '{{target}} must between {{first}} and {{second}}',
        between_characters:
          '{{target}} must between {{first}} and {{second}} characters long',
        maxFileSize: 'Max total file size exceeded. ({{value}})',
        dropZone: {
          main: 'Drag and drop a file or click',
          text: 'Drag and drop a text file or click',
          audio: 'Drag and drop an audio file or click',
          main_plural: 'Drag and drop files or click',
          text_plural: 'Drag and drop text files or click',
          audio_plural: 'Drag and drop audio files or click',
          reject: {
            main: 'File {{name}} was rejected.',
            notSupported: 'File type not supported.',
            exceedSizeLimit: 'File is too big. Size limit is {{size}}.',
            duplicateFileNames: 'File names must be unique',
          },
        },
      },
      numberFiles: 'Number of files to upload: {{count}}',
      email: '이메일',
      speaker: 'Speaker',
      name: '이름',
      text: 'Text',
      file: 'File',
      thresholdLr: 'Low risk threshold',
      thresholdHr: 'High risk threshold',
      description: 'Description',
      location: 'Location',
      sampleRate_khz: 'Sample rate (kHz)',
      sampleRate: 'Sample rate',
      top: 'Top',
      sub: 'Sub',
      modelConfig: 'Model configuration',
      privacySetting: 'Privacy setting',
      mutability: 'Mutability',
      mutable: 'Mutable',
      immutable: 'Immutable',
      fileUpload: 'File upload',
      source: 'Source',
      private: 'Private',
      public: 'Public',
      languageModel: 'Language Model',
      acousticModel: 'Acoustic Model',
      status: 'Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      lengthMin: 'Min Length',
      lengthMax: 'Max Length',
      scoreMin: 'Min Score',
      scoreMax: 'Max Score',
      transcript: 'Transcript',
      transcriber: 'Transcriber',
      none: 'None',
      today: '오늘',
      assign: 'Assign',
      length: 'Length',
    },
    IAM: {
      users: '사용자',
      user: '사용자',
      usersHeader: 'User Management',
      transcribers: 'Transcribers',
      roles: '역할',
      invite: '초대',
      header: 'Identity and Access Management',
      inviteUser: 'Invite user',
      deleteUser: 'Delete user',
      deleteUser_plural: 'Delete {{count}} users',
      resetUserPassword: `({{email}}) - Reset password`,
    },
    projects: {
      noProjects: 'No projects',
      noProjectSelected: 'No project selected',
      notFound: 'Project not found',
      createProject: 'Create project',
      editProject: 'Edit project',
      deleteProject: 'Delete project',
      deleteProject_plural: 'Delete {{count}} projects',
      header: 'Project Management',
      apiKey: 'API Key',
      apiSecret: 'API Secret',
    },
    TDP: {
      TDP: 'TDP',
      uploadData: 'Upload data',
      highRiskSegments: 'High Risk Segments',
      memo: 'Memo',
      sessionId: 'Session ID',
      ip: 'IP',
      websocketCloseStatus: 'Websocket close status',
      websocketCloseReason: 'Websocket close reason',
      transferredBytes: 'Transferred bytes',
      openToRate: 'Open to rate',
    },
    SET: {
      SET: 'SET',
      createSetFromFilter: 'Create SET from filter',
      createSet: 'Create SET',
      numberTranscribers: '{{count}} transcriber',
      numberTranscribers_plural: '{{count}} transcribers',
      transcribersToAssign: 'Transcribers to assign: {{count}}',
      addTranscriber: 'Add transcriber',
    },
    modelTraining: {
      header: 'Model Training',
      model: 'Model',
      trainingData: 'Training data',
      trainingMethod: 'Training method',
      shareSettings: 'Share settings',
      shared: 'Shared',
      notShared: 'Not shared',
      startTraining: 'Start training',
    },
    editor: {
      editor: 'Editor',
      confirm: 'Confirm',
      merge: 'Merge',
      split: 'Split',
      edit: 'Edit',
      redo: 'Redo',
      undo: 'Undo',
      fetch: 'Fetch',
      speaker: 'Speaker',
      toggleMore: 'Toggle more',
      createWord: 'Create word',
      editSegmentTime: 'Edit segment time',
      wordConfidence: 'Word confidence',
      setWordConfidence: 'Set word confidence threshold',
      nothingToTranscribe: 'Nothing to transcribe',
      discardChanges: 'Discard changes',
      confirmTranscript: 'Confirm transcript',
      addSpeaker: 'Add speaker',
      changeSpeaker: 'Change speaker',
      validation: {
        missingTimes: 'All words must have start and end times',
        invalidSplitLocation: 'Invalid split location',
        invalidMergeLocation: 'Invalid merge location',
        invalidTimeRange: 'Invalid time range',
        invalidCharacterRange: 'Invalid character in range',
        noSelection: 'No word selected',
      },
    },
    modelConfig: {
      header: 'Model configuration',
      header_plural: 'Model configurations',
      create: 'Create configuration',
      edit: 'Edit configuration',
      delete: 'Delete model configuration',
      thresholdLr: 'Low risk threshold',
      thresholdHr: 'High risk threshold',
      noResults: 'No model configurations',
      manage: 'Manage configuration',
      helpText: 'Create a model configuration before uploading data.',
    },
    models: {
      header: 'Model Management',
      tabs: {
        acousticModel: {
          header: 'Acoustic Model',
          create: 'Create acoustic model',
          delete: 'Delete acoustic model',
          delete_plural: 'Delete {{count}} acoustic models',
          noResults: 'No acoustic models',
          trainingInProgress: 'Training in progress',
        },
        languageModel: {
          header: '언어 모델',
          create: '언어 모델 생성',
          edit: '언어 모델 수정',
          delete: '언어 모델 삭제',
          delete_plural: '{{count}} 언어 모델 삭제',
          noResults: '언어 모델이 없습니다.',
        },
      },
      validation: {
        allAcousticModelsStillTraining: 'Acoustic model still training',
        allAcousticModelsStillTraining_plural:
          'All acoustic models still training',
        allSubGraphsStillTraining: 'Sub graph still training',
        allSubGraphsStillTraining_plural: 'All sub graphs still training',
        allModelConfigsStillTraining: 'Model configuration still training',
        allModelConfigsStillTraining_plural:
          'All modelConfigurations still training',
      },
      subGraphHeader: 'Sub Graph Management',
      subGraphNoResults: 'No sub graphs',
      createSubGraph: 'Create sub graph',
      editSubGraph: 'Edit sub graph',
      deleteSubGraph: 'Delete sub graph',
      deleteSubGraph_plural: 'Delete {{count}} sub graphs',
      createModel: '모델 생성',
      editModel: '모델 수정',
    },
    audioPlayer: {
      noUrl: '오디오 URL이 없습니다',
    },
    home: {
      header: 'Welcome to Zeroth',
      textBlocks: {
        ['1']: 'Zeroth를 유용하게 사용하시려면 ',
        ['2']:
          '왼쪽 메뉴에서 음향모델과 언어모델을 확인해주세요. 모델이 없을 시, 프로젝트 생성이 제한될 수 있습니다.',
        ['3']:
          '프로젝트를 생성하신 후 전사를 시작해보세요. 상단의 프로젝트를 클릭하시면 프로젝트를 생성할 수 있습니다.',
        ['4']: '사용에 궁금하신 점이 있으시면 연락주세요. 감사합니다.',
      },
    },
  },
};
