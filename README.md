# 🎬 Watchlog

> 영화 검색, 리뷰, 좋아요 및 북마크 기능을 지원하는 영화 기록 플랫폼

**Watchlog**는 [TMDB API](https://www.themoviedb.org/documentation/api)를 기반으로 인기 영화 검색부터 사용자의 감상 기록, 좋아요, 북마크 기능까지 제공하는 개인 영화 일지 서비스입니다.

<br/>

## 🚀 기능 소개

- 🔍 **TMDB 연동 영화 검색** (제목, 출시 연도, 평점, 언어 필터)
- 📈 **인기순, 평점순, 출시일순 정렬**
- 💬 **영화별 유저 리뷰 등록 및 조회**
- ❤️ **좋아요 및 북마크 기능**
- 🧾 **사용자 맞춤 감상 기록 관리 (Watchlog 기능)**
- 📱 반응형 디자인 (모바일/태블릿/PC 지원)

<br/>

## 🖼️ 주요 스크린샷

| 홈 화면 | 검색 결과 | 리뷰 작성 |
|---------|-----------|------------|
| (추가 예정) | (추가 예정) | (추가 예정) |

<br/>

## 🔧 기술 스택

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/ShadCN UI-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="ShadCN UI" />
  <img src="https://img.shields.io/badge/v0 by Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="v0 by Vercel" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TMDB API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB" />
  <img src="https://img.shields.io/badge/React Hooks-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Hooks" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

<br/>

## 🗂️ 프로젝트 구조

```bash
.
├── app/                     # Next.js App Router 엔트리 포인트
│   ├── api/                 # API Routes (TMDB 프록시 등)
│   └── movies/              # 영화 목록 및 상세 페이지
├── components/              # 재사용 가능한 UI 컴포넌트
├── lib/                     # 유틸 함수, TMDB API 요청 함수
├── public/                  # 정적 파일 (이미지 등)
├── types/                   # 전역 타입 정의
├── .env.example             # 환경 변수 예시 파일
├── README.md                # 프로젝트 소개 문서
└── package.json             # 의존성 및 스크립트
```
