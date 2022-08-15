/* eslint-disable */

import { useState } from "react";
import "./App.css";

function App() {
  // 잠시 저장할 데이터는 let 등 변수에 저장한다.
  let post = "강남 맛집 추천";

  // 중요한 데이터는 useState를 사용해서 state에 보관한다.
  // 첫 번째는 state에 저장한 자료
  // 두 번째는 state 변경을 도와주는 함수
  // Destructuring 문법
  // state에 저장한 데이터는 변경시 html이 자동으로 재렌더링됨
  // 자주 변경되는 데이터는 state로 만든다.
  let [title, setTitle] = useState([
    "리액트로 블로그 만들기",
    "성수동 맛집 추천",
    "경주 여행 후기",
  ]);
  let [likeNum, setLikeNum] = useState([0, 0, 0]);
  let [date, setDate] = useState(['2022.07.21', '2022.07.22', '2022.07.23' ]); 

  // 동적인 UI 만드는 법
  // 1.html,css 작성
  // 2.UI의 현재 상태를 state로 저장 
  // 3.state에 따라 UI가 어떻게 보일지 작성
  let [modal, setModal] = useState(false);
  let [detailTitle, setDetailtitle] = useState(0);

  let [inputValue, setInputValue] = useState();

  function handleLike() {
    let copy = [...likeNum];
    copy[i] = copy[i] + 1;
    setLikeNum(copy);
  }

  function changeTitle() {
    // 원본 데이터 보존을 위해 기존 데이터를 복제한다.
    // state 변경함수 특징
    // 데이터를 바꾸기 전에 기존 state와 신규 state를 비교해서 같으면 변경하지 않는다. (자원 절약)
    // js에서 array와 object를 담은 변수는 arry나 object 자체가 아닌 어디에 담겨져 있는지 알려주는 화살표만 들어있다.
    // 변수1과 변수2의 화살표가 같으면 변수2를 수정해도 변수1 == 변수2 비교해도 true가 나온다.
    // array, object는 reference data type이기 때문이다.
    // copy본을 만들지 않으면 state 변경이 없다고 인식한다.
    let copy = [...title];
    copy[0] = '리액트로 쇼핑몰 만들기';
    // state를 변경할 때는 반드시 변경함수를 사용해야 재렌더링이 된다.
    setTitle(copy);
  }

  function sortTitle() {
    let copy = [...title];
    copy.sort();
    setTitle(copy);
  }

  return (
    <div className="App">
      <header>
        <h1 className="title">React Blog</h1>
        <nav className="gnb">메뉴</nav>
      </header>
      <div className="content-area">
        <button onClick={sortTitle}>가나다순 정렬</button>       
        <button onClick={changeTitle}>제목 바꾸기</button>
        <ul className="post-list">
          {
            // 반복문을 사용하고 싶을 때는 map을 사용한다. for문 사용 불가
            title.map(function(t, i) {
              return (
                <li key={i}>
                  <div className="title-area">
                    <h2 className="post-title" onClick={()=>{
                      setModal(!modal);
                      setDetailtitle(i);
                    }}>{t}</h2>
                    <div>
                      {/* 상위 html로 퍼지는 이벤트버블링을 막고싶으면 e.stopPropagation() */}
                      <button className="like-btn" onClick={(e)=> {
                        e.stopPropagation();
                        let copy = [...likeNum];
                        copy[i] = copy[i] + 1;
                        setLikeNum(copy);
                      }}>💗</button>
                      <span className="like-num">{likeNum[i]}</span>
                      <button className="delete-btn" onClick={()=>{
                        let copy = [...title];
                        copy.splice(i,1);
                        setTitle(copy);
                      }}>삭제</button>
                    </div>
                  </div>
                  <p className="post-date">{date[i]}</p>           
                </li>
              )
            })
          }
        </ul>
      </div>
      
      {/* onChange와 onInput은 유사 */}
      <input onInput={(e)=>{
        // state변경함수는 늦게처리돼서 다음 함수가 먼저 실행됨 (비동기)
        setInputValue(e.target.value);
        console.log(inputValue);
      }}></input>
      <button onClick={()=>{
        if (inputValue === undefined) return;
        let copyTitle = [...title];
        let copyLikeNum = [...likeNum];
        let copyDate = [...date];
        let now = new Date();
        copyTitle.unshift(inputValue);
        copyLikeNum.unshift(0);
        copyDate.unshift(`${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}`);
        setTitle(copyTitle);
        setLikeNum(copyLikeNum);
        setDate(copyDate);
      }}>글 발행</button>

      {
        // 조건문을 사용하고 싶을때는 삼항연산자를 쓴다. if문 사용 불가
        // state 안의 값을 컴포넌트에서 쓰려면 작명={state 이름}
        modal === true  ? <Modal title={title} detailTitle={detailTitle} color=''/> : null
      }

    </div>
  );
}


// 컴포넌트: 중괄호 밖에 작성, 첫 글자는 대문자로
// 컴포넌트로 만들면 좋은 것
// 1.반복적인 html 축약, 2.큰 페이지들, 3.자주 변경되는 것들
// 컴포넌트의 단점 : state를 바로 가져다 쓸 수 없다.
// state를 사용하려면 파라미터로 props를 전달해줘야 한다.
// props 전달은 부모에서 자식 컴포넌트로만 가능하다.
function Modal (props) {
  return (
    // 하나의 태그로 감싸는 것만 가능
    // 만약 여러개의 태그를 감싸야 한다면 의미 없는 <div></div> 대신 <></> 로 감쌀 수 있다.
    <div className="modal" style={{background: props.color}}>
      <h4>{props.title[props.detailTitle]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

// 아래와 같은 문법으로도 컴포넌트를 만들 수 있다.
// const Modal = () => {
//   return ()
// }


export default App;
