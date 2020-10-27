/* eslint-disable @typescript-eslint/camelcase */
import { ResourceLanguage } from 'i18next';

export const ko: ResourceLanguage = {
  translation: {
    common: {
      all: '전체',
      okay: '확인',
      delete: '삭제',
      submit: '제출',
      cancel: '취소',
      back: '뒤로 가기',
      create: '생성',
      edit: '수정',
      save: '저장',
      saved: '저장됨',
      discard: '취소',
      dismiss: '닫기',
      error: '오류',
      pageError: '페이지 에러 발생',
      reset: '재설정',
      success: '성공',
      failure: '실패',
      clear: '지우기',
      clearAll: '초기화',
      startAt: '시작 시간',
      endAt: '종료 시간',
      fetchedAt: '전사 시작 시간',
      confirmedAt: '전사 제출 시간',
      length: '길이',
      score: '점수',
      upload: '업로드',
      decode: '디코딩',
      decoded: '오디오 디코딩 완료',
      decoding: '오디오 디코딩 진행중',
      decodingTimeRemaining: '{{progress}} 초',
      forbidden: '금지',
      view: '보기',
      date: '날짜',
      version: '버전',
      open: '열기',
      invalidId: '유효하지 않은 ID',
      notFound: '찾을 수 없음',
      noData: '데이터 없음',
      progress: '진행상황',
      refresh: '새로고침',
      close: '닫기',
      zeroth: 'Zeroth EE',
      url: 'URL',
      path: '경로',
      confirmDelete: '선택한 데이터를 삭제하시겠습니까?',
      userId: '유저 아이디',
      search: '검색',
      confirm: '승인하기',
      reject: '반려하기',
      comment: '코멘트',
    },
    table: {
      page: '페이지',
      pageOf: '{{current}} / {{total}}',
      labelDisplayedRows: '{{from}}-{{to}} 중 {{count}}',
      labelRowsPerPage: '페이지 당 표시할 숫자',
      noResults: '결과 없음',
      filter: '필터',
    },
    path: {
      home: '홈',
      IAM: 'IAM',
      projects: '프로젝트',
      models: '모델',
      editor: '에디터',
      modelTraining: '모델 학습',
     history: '전사내역',
      transcription: '전사관리',
    },
    menu: {
      login: '로그인',
      logout: '로그아웃',
      changeLanguage: '언어 바꾸기',
      profile: '프로필',
    },
    profile: {
      user: '사용자명',
      organization: '기관명',
      organization_plural: '기관명',
      fullName: '{{family}} {{given}}',
      resetPassword: '비밀번호 재생성',
      changeOrganization: '기관 변경',
      updatePhoneTitle: '전화번호 수정',
      updatePhoneText: '전화번호를 수정하시겠습니까?',
    },
    organization: {
      rename: '수정',
      renameOrg: '기관명 수정',
    },
    transcribers: {
      header: '전사자 관리',
      count: '전사 수정 완료수',
      rating: '평가',
      noTranscribers: '전사자 없음',
    },
    forms: {
      validation: {
        required: 'Required',
        email: '유효하지 않은 이메일입니다',
        number: '숫자만 가능합니다',
        integer: '정수만 가능합니다',
        min: '{{target}} 값은 {{value}} 보다 커야합니다',
        max: '{{target}} 값은 {{value}} 보다 커야합니다',
        greaterThan: '{{target}} 값은 {{value}} 보다 커야합니다',
        lessThan: '{{target}} 값은 {{value}} 보다 작아야합니다',
        greaterEqualTo: '{{target}} 값은 {{value}} 보다 작지 않아야 합니다',
        lessEqualTo: '{{target}} 값은 {{value}} 보다 크지 않아야 합니다',
        between: '{{target}} 값은 {{first}} 과 {{second}} 사이여야 합니다',
        between_characters:
          '{{target}}은(는) {{first}} 자에서 {{second}} 글자만 가능합니다',
        maxFileSize: '최대 파일 개수를 초과했습니다. ({{value}})',
        TDPFilterEndDate: '시작시간은 종료시간보다 전이여야 합니다.',
      },
      dropZone: {
        main: '업로드할 파일을 끌어다 놓거나 클릭해주세요',
        text: '업로드할 텍스트 파일을 끌어다 놓거나 클릭해주세요',
        audio: '업로드할 오디오 파일을 끌어다 놓거나 클릭해주세요',
        main_plural: '업로드할 파일을 끌어다 놓거나 클릭해주세요',
        text_plural: '업로드할 텍스트 파일을 끌어다 놓거나 클릭해주세요',
        audio_plural: '업로드할 오디오 파일을 끌어다 놓거나 클릭해주세요',
        reject: {
          main: '{{name}} 파일 업로드에 실패했습니다.',
          notSupported: '지원하지 않는 파일 형식입니다.',
          exceedSizeLimit: '파일이 너무 큽니다. 최대 크기는 {{size}} 입니다.',
          duplicateFileNames: '중복되는 파일 이름입니다.',
        },
      },
      numberFiles: '업로드할 파일 개수: {{count}}',
      email: '이메일',
      phone: '전화번호',
      speaker: '발화자',
      name: '이름',
      text: '텍스트 입력',
      file: '파일',
      thresholdLr: 'Low risk threshold',
      thresholdHr: 'High risk threshold',
      description: '설명',
      location: '위치',
      sampleRate_khz: '샘플링 주파수 (kHz)',
      sampleRate: '샘플링 주파수',
      top: '탑 그래프',
      sub: '서브 그래프',
      modelConfig: '모델 설정',
      privacySetting: '개인정보',
      mutability: '수정가능 여부',
      mutable: '수정가능',
      immutable: '수정불가',
      fileUpload: '파일 업로드',
      source: '데이터 업로드 방식',
      private: '비공개',
      public: '공개',
      languageModel: '언어 모델',
      acousticModel: '음향 모델',
      status: '상태',
      startDate: '시작시간',
      endDate: '종료시간',
      lengthMin: '최소 길이 (초)',
      lengthMax: '최대 길이 (초)',
      scoreMin: '최소 Score',
      scoreMax: '최대 Score',
      transcript: '전사 결과',
      transcriber: '전사자',
      none: '없음',
      all: '모든',
      today: '오늘',
      assign: '할당',
      length: '길이',
      filePath: '파일 경로',
      fileUrl: '파일 URL',
    },
    admin: {
      pageTitle: '전사 관리',
      diff: 'Diff',
      commentNumber: '댓글수',
      approveMsg: '승인하시겠습니까?',
      rejectMsg: '반려하시겠습니까?',
      reason: '이유',
    },
    transcription: {
      pageTitle: '전사 내역',
      diff: 'Diff',
      commentNumber: '댓글수',
      approveMsg: '승인하시겠습니까?',
      rejectMsg: '반려하시겠습니까?',
      reason: '이유',
    },
    IAM: {
      users: '사용자',
      user: '사용자',
      usersHeader: '사용자 관리',
      transcribers: '전사자',
      roles: '역할',
      invite: '초대',
      header: '권한 관리',
      inviteUser: '사용자 추가',
      deleteUser: '사용자 삭제',
      deleteUser_plural: '{{count}} 명의 사용자 삭제',
      resetUserPassword: `({{email}}) - 비밀번호 초기화`,
      requestVoiceMasking: '보이스 마스킹',
      confirmVoiceMasking: '보이스 마스킹을 요청하시겠습니까?',
      deactivateVoiceMasking: '보이스 마스킹을 해지하시겠습니까?',
    },
    projects: {
      noProjects: '프로젝트 없음',
      noProjectSelected: '선택된 프로젝트 없음',
      notFound: '프로젝트 찾을 수 없음',
      createProject: '프로젝트 생성',
      editProject: '프로젝트 수정',
      deleteProject: '프로젝트 삭제',
      deleteProject_plural: '{{count}} 개의 프로젝트 삭제',
      header: '프로젝트 관리',
      apiKey: 'API 키',
      apiSecret: 'API Secret',
    },
    TDP: {
      TDP: 'TDP',
      dataUpload: '데이터 업로드',
      highRiskSegments: 'High Risk 세그먼트',
      classifyHighRisk: 'LR/HR 평가',
      classifyHighRiskHelper: 'LR/HR 평가를 진행할 모델을 선택해주세요',
      requestClassification: '평가요청',
      memo: '메모',
      sessionId: '세션 ID',
      ip: 'IP',
      websocketCloseStatus: 'Websocket close status',
      websocketCloseReason: 'Websocket close reason',
      transferredBytes: '전송된 바이트',
      originalFilename: '파일 이름',
      wordCount: '글자 수',
      statusChange: '상태변화 내역',
      deleteFailMsg: '삭제요청 실패',
    },
    transcribingSet: {
      transcribingSet: 'TDP 세트',
      setName: '세트 이름',
      wordCount: '글자 수',
      highrisk: 'High Risk',
    },
    SET: {
      SET: '전사세트',
      dataSet: '데이터 전사',
      deleteAll: '전체 삭제',
      deleteAllMsg: '아래의 모든 데이터를 삭제하시겠습니까?',
      createTrainingSet: '학습세트 만들기',
      createSetFromFilter: '필터로 전사세트 만들기',
      createSet: '전사세트 만들기',
      downloadSet: '세트 다운로드',
      numberTranscribers: '{{count}} 전사자',
      numberTranscribers_plural: '{{count}} 전사자',
      transcribersToAssign: '할당된 전사자 수: {{count}}',
      addTranscriber: '전사자 추가',
      requestEvaluation: '평가 요청하기',
      requestEvaluationMsg: '평가 요청하시겠습니까?',
      requestEvaluationWarning: '이미 존재하는 평가가 삭제되고 새로운 평가가 진행됩니다. 진행하시겠습니까?',
      showEvaluationDetail: '평가 상세보기',
      downloadEvaluationDetail: '평가 상세정보 다운로드',
      evaluationDetail: '평가 상세 정보',
      evaluationStatus: '평가상태',
      openToRate: '전사상태 평가',
      selectModel: '모델 선택',
      rejected: '반려',
      transcribers: '전사자',
      highRisk: 'High Risk',
      editProgress: '진행상황',
    },
    modelTraining: {
      header: '모델 학습',
      model: '모델',
      trainingData: '학습 데이터',
      trainingMethod: '학습 방식',
      shareSettings: '공유 설정',
      shared: '공유됨',
      notShared: '공유되지 않음',
      startTraining: '학습 시작',
      highRiskSegmentsOnly: 'High Risk 세그먼트만',
      validation: {
        allModelConfigsStillTranscribing: '데이터 전사가 진행중입니다.',
        allModelConfigsStillTranscribing_plural: '데이터 전사가 진행중입니다',
      },
    },
    editor: {
      editor: '에디터',
      approvalRequest: '승인요청',
      save: '저장하기',
      seeRejectReason: '반려사유 : {{rejectReason}}',
      setThreshold: 'Threshold 설정',
      shortcuts: '단축키',
      duplicateShortcut: '단축키를 중복 설정 할 수 없습니다',
      invalidInitialKey: '첫 입력키는 ⌘ Cmd, Ctrl, ⇧ Shift, ⌥ Opt, Alt 중 하나입니다.',
      maxLength: '단축키는 최대 3개 입력까지 가능합니다.',
      rewindAudio: '뒤로감기',
      forwardAudio: '빨리감기',
      audioPlayPause: '재생/일시정지',
      confirm: '확인',
      merge: '합치기',
      split: '나누기',
      edit: '수정',
      redo: '재실행',
      undo: '실행취소',
      fetch: '받아오기',
      speaker: '발화자',
      toggleMore: '자세히보기',
      createWord: '단어 만들기',
      toggleAutoSeek: '커서 오디오 동기화',
      toggleAutoScroll: '자동 스크롤',
      loop: 'Loop',
      loadingAdditonalSegmentSuccess: '추가 세그먼트 로딩 성공',
      editSegmentTime: '세그먼트 시간 수정',
      wordConfidence: '단어 confidence',
      setWordConfidence: '단어 confidence threshold 설정',
      nothingToTranscribe: '전사할 데이터가 없습니다',
      discardChanges: '다시 불러오기',
      confirmTranscript: '수정 완료',
      addSpeaker: '발화자 추가',
      changeSpeaker: '발화자 변경',
      calculating: '계산중',
      highRiskSegment: 'High Risk 세그먼트',
      confirmWarning: '제출하면 수정이 불가능합니다',
      keyboardShortCuts: '키보드 단축키',
      function: '기능',
      input: '입력',
      validation: {
        missingTimes: '모든 어절의 시작시간과 종료시간을 정해야 합니다.',
        invalidSplitLocation: '유효하지 않은 나누기 위치입니다',
        invalidMergeLocation: '유효하지 않은 합치기 위치입니다',
        invalidTimeRange: '유효하지 않은 시간 범위입니다',
        invalidCharacterRange: 'Invalid character in range',
        noSelection: 'No word selected',
      },
    },
    modelConfig: {
      import_header: '모델 설정 불러오기',
      import_guide: '모델 설정을 선택해주세요',
      header: '모델 설정',
      header_plural: '모델 설정',
      import: '불러오기',
      create: '설정 만들기',
      edit: '설정 수정',
      delete: '설정 삭제',
      thresholdLr: 'Low risk threshold',
      thresholdHr: 'High risk threshold',
      noResults: '모델 설정 없음',
      manage: '설정 관리',
      helpText: '데이터를 업로드하기 전에 모델 설정을 만들어 주세요.',
    },
    models: {
      header: '모델 관리',
      tabs: {
        acousticModel: {
          header: '음향 모델',
          create: '음향 모델 만들기',
          delete: '음향 모델 삭제',
          delete_plural: '{{count}} 개의 음향 모델 삭제',
          noResults: '음향 모델이 없습니다.',
        },
        languageModel: {
          header: '언어 모델',
          create: '언어 모델 생성',
          edit: '언어 모델 수정',
          delete: '언어 모델 삭제',
          delete_plural: '{{count}} 개의 언어 모델 삭제',
          noResults: '언어 모델이 없습니다.',
        },
      },
      validation: {
        allAcousticModelsStillTraining: '음향 모델 학습이 진행중입니다',
        allAcousticModelsStillTraining_plural: '음향 모델 학습이 진행중입니다',
        allSubGraphsStillTraining: '서브 그래프 학습이 진행중입니다',
        allSubGraphsStillTraining_plural: '서브 그래프 학습이 진행중입니다',
        allModelConfigsStillTraining: '모델 설정을 위한 학습이 진행중입니다',
        allModelConfigsStillTraining_plural:
          '모델 설정을 위한 학습이 진행중입니다',
      },
      trainingInProgress: '학습 진행중',
      trainingError: '학습 오류',
      subGraphHeader: '서브 그래프 관리',
      subGraphNoResults: '서브 그래프 없음',
      createSubGraph: '서브 그래프 생성',
      editSubGraph: '서브 그래프 수정',
      deleteSubGraph: '서브 그래프 삭제',
      deleteSubGraph_plural: '{{count}} 개의 Sub graph 삭제',
      createModel: '모델 생성',
      editModel: '모델 수정',
    },
    audioPlayer: {
      noUrl: '오디오 URL이 없습니다',
      zoomIn: '확대하기',
      zoomOut: '축소하기',
      loop: '루프하기',
      playbackSpeed: '재생속도',
      mute: '음소거하기',
      syncAudioCursorLocation: '커서-오디오 위치 동기화 활성',
      unsyncAudioCursorLocation: '커서-오디오 위치 동기화 비활성',
      disableAutoScroll: '자동스크롤 사용안하기',
      enableAutoScroll: '자동스크롤 사용하기',
    },
    home: {
      header: 'Welcome to Zeroth',
      textBlocks: {
        ['1']: 'Zeroth를 유용하게 사용하시려면',
        ['2']:
          '왼쪽 메뉴에서 음향모델과 언어모델을 확인해주세요. 모델이 없는 경우, 프로젝트 생성이 제한될 수 있습니다.',
        ['3']:
          '프로젝트를 생성하신 후 전사를 시작해보세요. 상단의 프로젝트를 클릭하시면 프로젝트를 생성할 수 있습니다.',
        ['4']: '사용에 궁금하신 점이 있으시면 연락주세요. 감사합니다.',
      },
    },
  },
};
