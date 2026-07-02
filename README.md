# 🎬 MovieMind Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![NestJS](https://img.shields.io/badge/NestJS-11-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-API-green)

> AI 기반 영화 리뷰 종합 분석 플랫폼 Frontend

MovieMind Frontend는 Next.js 기반 웹 애플리케이션입니다.

사용자는 영화 리뷰를 작성하고, AI가 종합 분석한 결과를 직관적인 UI를 통해 확인할 수 있습니다.

---

# 🚀 Tech Stack

## Framework

- Next.js (App Router)
- React
- TypeScript

## Styling

- TailwindCSS

## State

- Context API

---

# ✨ 주요 기능

## Authentication

- 회원가입
- 로그인
- 로그아웃

---

## Review

- 리뷰 목록 조회
- 리뷰 상세 조회
- 리뷰 작성
- 리뷰 수정
- 리뷰 삭제

---

## AI Analysis

- AI 분석 요청
- AI 분석 결과 조회
- AI 분석 결과 목록 조회

---

# 📷 Screenshots

## Home

(이미지 추가 예정)

## Review

(이미지 추가 예정)

## AI Analysis

(이미지 추가 예정)

---

# 📷 주요 화면

## 🏠 Home

- 서비스 소개
- 리뷰 목록 이동
- AI 분석 결과 이동

---

## 📝 Review

- 리뷰 목록
- 리뷰 상세
- 리뷰 작성
- 리뷰 수정

---

## 🤖 AI Analysis

- AI 분석 결과
- 장점
- 단점
- 키워드
- 추천 의견
- 감성 분석
- 장르
- 분위기

---

# 📂 프로젝트 구조

```text
src
├── app
├── components
│   ├── common
│   └── review
├── context
├── lib
│   ├── api
│   └── token.ts
├── types
└── ...
```

---

# 💡 프로젝트 특징

## Component 재사용

- Header
- Footer
- Button
- Loading
- EmptyState
- ReviewCard
- ReviewForm

---

## Context API

로그인 상태를 Context로 관리하여

- 로그인
- 로그아웃
- Header 갱신

을 새로고침 없이 처리합니다.

---

## TailwindCSS

TailwindCSS 기반 반응형 UI를 적용했습니다.

---

## API 연동

NestJS Backend와 REST API 통신을 수행합니다.

---

# 🚀 실행

```bash
npm install

npm run dev
```

---

# 📌 Backend Repository

👉 https://github.com/minji-bit/movie-mind.git

---

# 📌 향후 개선 예정

- 영화 검색
- 개인 취향 추천
- TMDb API 연동
- Refresh Token
- 배포 (Vercel)

---

# 👨‍💻 Developer

전민지
