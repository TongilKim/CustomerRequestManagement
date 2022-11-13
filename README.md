# 프로젝트 구성

## `Client`

📦src <br/>
┣ 📂api <br/>
┃ ┗ 📜index.tsx // 모든 fetch api function을 정의 <br/>
┣ 📂assets <br/>
┃ ┣ 📜addition.svg <br/>
┃ ┣ 📜addition_active.svg <br/>
┃ ┣ 📜arrow_down.svg <br/>
┃ ┣ 📜arrow_up.svg <br/>
┃ ┣ 📜change.svg <br/>
┃ ┣ 📜defaultButton.svg <br/>
┃ ┗ 📜delete.svg <br/>
┣ 📂common <br/>
┃ ┣ 📜Loader.module.css <br/>
┃ ┣ 📜Loader.tsx <br/>
┃ ┣ 📜Snackbar.module.css <br/>
┃ ┗ 📜Snackbar.tsx <br/>
┣ 📂component <br/>
┃ ┣ 📂Modal<br/>
┃ ┃ ┣ 📜CustomerIdInputModal.module.css <br/>
┃ ┃ ┣ 📜CustomerIdInputModal.tsx // 고객이 등록한 문의를 확인하기 위한 ID 입력 Modal <br/>
┃ ┃ ┣ 📜WritingModal.module.css <br/>
┃ ┃ ┗ 📜WritingModal.tsx // 고객 문의 접수 / 문의 답변 내용 작성에 대한 Modal <br/>
┃ ┣ 📂RequestItem <br/>
┃ ┃ ┣ 📜CompletedCounselorRequest.module.css <br/>
┃ ┃ ┣ 📜CompletedCounselorRequest.tsx // 문의 답변이 완료된 내용을 보여주는 Card? 컴포넌트 <br/>
┃ ┃ ┣ 📜CompletedWrittenCustomerRequest.module.css <br/>
┃ ┃ ┣ 📜CompletedWrittenCustomerRequest.tsx // 고객 입장에서, 작성된 문의가 답변이된 내용을 보여주는 Card 컴포넌트 <br/>
┃ ┃ ┣ 📜NewCounselorRequest.module.css <br/>
┃ ┃ ┣ 📜NewCounselorRequest.tsx // 새로운 문의 내용을 보여주는 Card 컴포넌트 <br/>
┃ ┃ ┣ 📜WrittenCustomerRequest.module.css <br/>
┃ ┃ ┗ 📜WrittenCustomerRequest.tsx // 새로 작성한 문의를 보여주는 Card 컴포넌트 <br/>
┃ ┗ 📂RequestList <br/>
┃ ┃ ┣ 📜RequestList.module.css <br/>
┃ ┃ ┗ 📜RequestList.tsx // RequestItem ( Card 컴포넌트 )를 랜더 해주는 wrapper 컴포넌트 <br/>
┣ 📂constants <br/>
┃ ┗ 📜index.tsx // 해당 앱에서 공통적으로 쓰이는 상수 값 정의 <br/>
┣ 📂hook <br/>
┃ ┣ 📜index.tsx <br/>
┃ ┗ 📜useInterval.tsx // Polling 방식으로 조회 할 수 있는 interval custom hook <br/>
┣ 📂page <br/>
┃ ┣ 📜CounselorRequestList.module.css <br/>
┃ ┣ 📜CounselorRequestList.tsx // '답변한 문의' & '새로운 문의' 목록을 랜더 해주는 페이지 <br/>
┃ ┣ 📜CustomerOptions.module.css <br/>
┃ ┣ 📜CustomerOptions.tsx // 고객에게 '문의 목록 조회' & '문의 접수 목록을 랜더 해주는 페이지 <br/>
┃ ┣ 📜CustomerRequestList.module.css <br/>
┃ ┣ 📜CustomerRequestList.tsx // 고객이 이전에 본인이 문의 했던 이력을 확인 하는 페이지 <br/>
┃ ┣ 📜Home.module.css <br/>
┃ ┣ 📜Home.tsx <br/>
┃ ┣ 📜Login.module.css <br/>
┃ ┣ 📜Login.tsx // 로그인 & 회원가입 페이지 <br/>
┃ ┗ 📜index.tsx <br/>
┣ 📂store <br/>
┃ ┣ 📂slice <br/>
┃ ┃ ┣ 📜CompletedCustomerRequestSlice.tsx // 답변완료된 문의 목록을 고객/상담사 입장에서 확인 할 수 있는 state를 관리 <br/>
┃ ┃ ┣ 📜CustomerRequestSlice.tsx // '새로운 문의', '특정 고객이 작성한 문의' 목록을 가지고 있는 state를 관리 <br/>
┃ ┃ ┗ 📜SnackBarSlice.tsx <br/>
┃ ┣ 📜hooks.tsx <br/>
┃ ┗ 📜index.tsx <br/>
┣ 📂type <br/>
┃ ┗ 📜index.tsx <br/>
┣ 📂utils <br/>
┃ ┣ 📜CheckSessionAvailability.tsx // 현재 로그인 되었는지 세션을 통해 확인하는 유틸 함수 <br/>
┃ ┣ 📜ValidateEmail.tsx // 이메일 validation 유틸 함수 <br/>
┃ ┗ 📜index.tsx <br/>
┣ 📜App.css <br/>
┣ 📜App.tsx <br/>
┣ 📜declarations.d.ts <br/>
┣ 📜index.css <br/>
┣ 📜index.tsx <br/>
┗ 📜logo.svg <br/>

---

<br/>

## `Server`

📦src <br/>
┣ 📂main <br/>
┃ ┣ 📂java <br/>
┃ ┃ ┣ 📂com <br/>
┃ ┃ ┃ ┣ 📂example <br/>
┃ ┃ ┃ ┃ ┣ 📂server <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂audit <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DateAudit.java // 데이터 생성되는 날짜 기록을 위해 생성한 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂config <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuditingConfig.java // Authentication 심사?를 위한 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SecurityConfig.java // spring security configuration (설정) 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WebMvcConfig.java // CORS 설정을 위한 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂controller <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthController.java // signin, signup fetch Controller <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CompletedCustomerRequestController.java // 답변이 완료된 문의에 대한 Controller <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomerRequestController.java // 문의 생성,삭제,조회 등에 대한 Controller <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.java // email 중복 validation 여부, 현재 로그인한 유저 정보를 반환해주는 Controller <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂exception <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AppException.java // Application 에서 서버에러가 발생 할 때, 공통적으로 Exception 낼 수 있는 클래스<br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BadRequestException.java // 요청받는 Parameter가 적절하지 않을 때 발생되는 Exception 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ResourceNotFoundException.java // 조회하는 데이터가 없을 때 발생되는 Exception 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂model <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CompletedCustomerRequest.java // 완료된 문의 정보에 대한 model <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomerRequest.java // 기본 문의 정보에 대한 model <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Role.java // 유저의 Role <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RoleName.java // Role 종류 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜User.java // 로그인 한, 유저 정보 <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂payload <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ApiResponse.java // Client 에게 공통적으로 반환할 내용을 담고 있는 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CompletedCustomerRequestRequest.java // Client로 부터 답변이 완료된 문의에 대해 요청 받을 때, 전달 받는 property값 설정 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CompletedCustomerRequestResponse.java // Client로 응답을 보낼 때, 담겨야할 property값 설정 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomerRequestRequest.java // 기본 문의정보 조회에 대한 property값 설정<br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomerRequestResponse.java // 기본 문의정보 응답에 대한 property값 설정 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationResponse.java // jwt token 값 설정/접근 클래스 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginRequest.java // login 할 때 요구되는 property값 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SignUpRequest.java // sign up 할 때 요구되는 property값 <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserIdentityAvailability.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserSummary.java // 로그인한 유저에 대한 property <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂repository <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CompletedCustomerRequestRepository.java // 완료된 문의 리스트를 접근 할 수 있는 repository <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomerRequest.java // 기본 문의에 대한 내용을 접근 할 수 있는 repository <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomerRequestRepository.java // 특정 고객의 문의 내용 & 리스트를 접근 할 수 있는 repo <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RoleRepository.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserRepository.java <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂security <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CurrentUser.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationEntryPoint.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationFilter.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtTokenProvider.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserPrincipal.java <br/>
┃ ┃ ┃ ┃ ┃ ┣ 📂service <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CompletedCustomerRequestService.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomUserDetailsService.java <br/>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CustomerRequestService.java <br/>
┃ ┃ ┃ ┃ ┃ ┗ 📜ServerApplication.java // Main Class<br/>
┃ ┃ ┃ ┃ ┗ 📜.DS_Store <br/>
┃ ┃ ┃ ┗ 📜.DS_Store <br/>
┃ ┃ ┗ 📜.DS_Store <br/>
┃ ┣ 📂resources <br/>
┃ ┃ ┣ 📂static <br/>
┃ ┃ ┣ 📂templates <br/>
┃ ┃ ┣ 📜application.properties // Application 환경 상수? 설정 <br/>
┃ ┃ ┣ 📜data.sql // 기본 데이터 설정 <br/>
┃ ┃ ┗ 📜schema.sql // 기본 테이블 설정 <br/>
┃ ┗ 📜.DS_Store <br/>
┣ 📂test <br/>
┃ ┗ 📂java <br/>
┃ ┃ ┗ 📂com <br/>
┃ ┃ ┃ ┗ 📂example <br/>
┃ ┃ ┃ ┃ ┗ 📂server <br/>
┃ ┃ ┃ ┃ ┃ ┗ 📜ServerApplicationTests.java <br/>
┗ 📜.DS_Store <br/>

---

<br/>

# 실행 방법

## `npm install`

앱을 실행하기 전에 package module을 설치 해야 합니다.

## `npm start`

로컬에서 앱을 실행합니다.

## `npm run dev`

개발 모드에서 앱을 실행합니다.

## `npm run build`

배포용 파일을 public 폴더에 빌드합니다.

## `cd build & npx serve`

테스트 & 빌드 동작 및 배포된 파일을 브라우저에서 확인할 수 있습니다.

---

<br/>

# 문제 해결 전략

## `기술 스택`

--- ### `Client` ### ---

### redux-toolkit

- client state 관리를 위해 적용.

### Webpack

- bundle 하기 위해 사용.
- dev/prod 환경에 따라, 작업을 분기하기 위해서 사용
- 목적에 따라 webpack.dev.js / webpack.prod.js 분리
- 공통적으로 사용 되는 내용은 webpack.common.js에 적용
- hot reload 적용
- `npm run build` 스크립트 사용시 public 폴더에 js, css 파일 export

---

<br/>

--- ### `Server` ### ---

### spring-security

- Application 회원가입&로그인 보안/인증을 위해 적용.

### jjwt-api

- jwt token 생성/응답 등 jwt 업무를 위해 적용.

### jackson-datatype-jsr310

- 데이터 생성 시간을 기록하기 위해 적용.

### h2-database

- 임시 데이터 저장을 위해 사용.

### spring-boot-starter-data-jpa

- 데이터를 접근 하고 관리 하기위해 사용.
