import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/about", label: "회사 정보" },
  { path: "/leadership", label: "임원 소개" },
  { path: "/board", label: "업무 게시판" },
  { path: "/our-services", label: "제공 기술" },
  { path: "/contact", label: "문의하기" },
]; // 경로도 있기 때문에 배열로 객체 생성

// 인자값({path, label, onClick}) 넘김. react-router-dom 설치해서 Link 사용.
const MenuItem = ({ path, label, onClick }) => (
  <li>
    <Link
      to={path}
      className="hover:text-blue-600 transition duration-300"
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);

// rafce로 기본 컴포넌트 생성
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // useState : React 상태관리 후크. setLanguage : languate의 상태 변화 함수(language를 업데이트 해주는 함수라고 생각). 초기값은 한국어로 설정
  const [language, setLanguage] = useState("ko");

  // ?
  const toggleMenu = () => setIsOpen(!isOpen);

  // className에 tailwindcss 적용
  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:ml-12 lg:mr-8">
          <Link to="/">ABC Company</Link>
        </h1>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg">
            {menuItems.map(
              (
                item // item에는 path, label, onClick이 있음
              ) => (
                // key 속성으로 항목을 식별하면 ... 연산자를 사용하면 필드를 작성하지 않아도 나머지 인자값 작성 안해도 됨.
                <MenuItem key={item.path} {...item} />
              )
            )}
          </ul>
        </div>

        <select
          value={language} // option의 value 값이 달라질 때마다 저장하기 위해서
          onChange={(e) => setLanguage(e.target.value)} // onChange는 option 값이 실제로 바꿨을 때 생기는 이벤트
          className="hidden lg:block px-3 py-1 ml-8 border rounded-md bg-white hover:border-blue-500 transition duration-300"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>

        {/* 모바일 환경에서 적용되는 코드 */}
        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="메뉴"
        >
          {/* react-icons 설치하여 사용한 HiX, HiMenu */}
          {/* isOpen이 true라면 HiX, false라면 HiMenu */}
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full" // 사이드바를 보여주고 안 보여주는 삼중다항식
        } lg:hidden`} // ``는 문자열과 변수를 같이 생성 가능
      >
        <div className="p-4">
          <button
            className="text-2xl mb-8 float-right"
            onClick={toggleMenu}
            aria-label="닫기"
          >
            <HiX />
          </button>
          <ul className="clear-both space-y-4 pt-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                {...item}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </ul>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-6 w-full px-3 py-1 border rounded-md bg-white hover:border-blue-500 transition duration-300"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

/* tailwindcss 명령어
fixed : 스크롤을 내려도 위에 고정되어 항상 보임.
w-full : 가로 전체 길이 할당
p : padding
shadow-lg : 그림자를 lg 크기(18px)로 할당
z : 값이 클수록 앞에 보이고 작을수록 뒤에 배치함.
justify-between : 노션 그림 참조
text-xl : 텍스트를 xl 크기(20px)로 할당
lg:ml-12 : lg는 화면 너비가 1024px 이상일 때 적용. 일반적인 랩탑 및 데스크톱에 사용. ml은 margin left.
lg:mr-8 : mr은 margin right.
lg:flex : 일반적인 랩탑에서는 네비바 고정
gap : 상하좌우 여백
transition : 부드럽게 변경
hidden : 네비바나 메뉴 아이콘은 기본적으로 보이지 않게 하기 위해서 hidden 사용
border rounded-md : 테두리를 md 사이즈로 둥글게 만듬
*/
