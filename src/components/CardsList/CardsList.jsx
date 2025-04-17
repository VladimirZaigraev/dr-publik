import React, { useState, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TinderCard from "react-tinder-card";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./CardsList.css";

import { EffectCards } from "swiper/modules";
import { Card } from "../Card/Card";
import { CircleXmarkFill } from "@gravity-ui/icons";
import Restart from "../../assets/icons/restart.svg";
import Close from "../../assets/icons/close.svg";
import Heart from "../../assets/icons/heart.svg";
import Vlada from "../../assets/user/Vlada.jpg";
import one from "../../assets/user/1a.jpg";
import two from "../../assets/user/2a.jpg";
import thre from "../../assets/user/3a.jpg";
import onem from "../../assets/user/1.jpg";
import twom from "../../assets/user/2.jpg";
import threm from "../../assets/user/3.jpg";
import form from "../../assets/user/4.jpg";
import error from "../../assets/user/error.jpg";
import { toast } from "react-toastify";

const errors = ["Даже не думай!", "Это судьба!", "Не тебе решать!", "Только вперед, не шагу назад!"];

const cards = [
  {
    name: "Влада",
    img: Vlada,
    year: "почти 18",
    description:
      "Милашка-полторашка-очаровашка, на деле сука сукой. Если ей отрубить голову, она будет еще 20 минут говорить, что она не может найти на себя джинсы. Гулять с ней крайне тяжело, потому что ее один твой шаг равен ее пяти",
    modal: {
      img: form,
      text: "💻 IT-волшебник, который превращает код в магию. Люблю твой ум и чувство юмора — ты всегда знаешь, как разрядить обстановку! 😄 ",
    },
  },
  {
    name: "Твоя мечта",
    img: one,
    year: "+ 18",
    description:
      "Кандидат в мастера спорта по конькам и чемпионка по отвлечению от ЕГЭ. Если ты не готов к мишапам Оксимирона, то, возможно, тебе стоит пересмотреть свои жизненные приоритеты. Люблю коньяк, но не переживай — я не пью его во время подготовки к экзаменам. Только после! 🍷⛸️",
    modal: {
      img: onem,
      text: "🥳 С днём рождения, мой идеальный мэтч! Пусть этот год будет полон смеха, успехов и незабываемых моментов! ❤️",
    },
  },
  {
    name: "Только ее и ждал",
    img: thre,
    description:
      "В поисках того, кто сможет оценить мои навыки катания на коньках и умение отвлекать от учёбы. Мой идеальный вечер — это коньяк, мишапы и разговоры о том, как мы будем сдавать ЕГЭ, когда я буду заниматься всем, кроме учёбы. 😂🥂",
    modal: {
      img: twom,
      text: "🌍 Путешественник в поисках новых приключений и впечатлений. Давай вместе покорим мир (или хотя бы ближайший магазин ЯРЧЕ)! 🍕✈️ ",
    },
  },
  {
    name: "Всегда рядом",
    img: two,
    description:
      "Привет! Я та, кто может сделать любую подготовку к ЕГЭ похожей на вечеринку с мишапами Оксимирона и бутылкой коньяка. Обещаю, что с родителями мы сработаемся — они будут в восторге от моего умения отвлекать их сына от учёбы! 🎉",
    modal: {
      img: threm,
      text: "🍕 Любитель роллов, пиццы и мемов. Если ты не против вечеров с играми и обсуждениями новых мишапов Окси, нам точно по пути! 🎮",
    },
  },
];

const errorModal = {
  img: error,
  text: "ЕЩЕ РАЗ НАЖМЕШЬ НА КРЕСТИК И ...",
};

const TITLE = ["ТвойЛичныйТиндер", "Романтичное название", "Тьюр", "ТуДу", "АЙЛОВЮ"];

const Modal = ({ onClose, info }) => {
  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modal-wrapper")) onClose();
  };
  return (
    <div className="modal">
      <div className="modal-wrapper" onClick={onWrapperClick}>
        <div className="modal-content">
          <button className="modal-close-button" onClick={onClose}>
            <CircleXmarkFill />
          </button>
          <img className="modal-img" src={info.img} alt="" />
          <p className="modal-text">{info.text}</p>
        </div>
      </div>
    </div>
  );
};

export const CardsList = () => {
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
  const [countErrors, setCountErrors] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  // const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(cards.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < cards.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    if (direction === "left") {
      return onError();
    }
    if (currentIndex === cards.length) return;
    setOpenModal(true);
    // setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cards.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const onError = () => {
    toast.error(errors[countErrors]);
    setCountErrors(countErrors + 1);
    if (countErrors === errors.length) {
      setOpenErrorModal(true);
      setCountErrors(0);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <>
      <div className="cardsList">
        <h1 className="cardsList-title">{TITLE[currentIndex] || "ТвойЛичныйТиндер"}</h1>
        <div className="cardContainer">
          {cards.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div className="card" key={index}>
                <img className="card-img" src={character.img} alt="" />
                <div className="card-outlet"></div>
                <div className="card-textBox">
                  <div className="card-textBox-titleWrapper">
                    <h4 className="card-textBox-title">{character.name}</h4>
                    <span className="card-textBox-year">{character.year}</span>
                  </div>
                  <span className="card-textBox-description">{character.description}</span>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="cardsList-btns">
          <button
            className="cardsList-btn cardsList-btn-close"
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => onError()}
          >
            {/* <Restart /> */}
            <img src={Close} alt="" />
          </button>
          <button
            className="cardsList-btn cardsList-btn-reset"
            style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
            onClick={() => goBack()}
          >
            <img src={Restart} alt="" />
          </button>
          <button
            className="cardsList-btn cardsList-btn-heart"
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("right")}
          >
            <img src={Heart} alt="" />
          </button>
        </div>
        {/* {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">Swipe a card or press a button to get Restore Card button visible!</h2>
      )} */}
      </div>
      {openModal && cards[currentIndex + 1]?.modal && (
        <Modal onClose={onCloseModal} info={cards[currentIndex + 1].modal} />
      )}
      {openErrorModal && <Modal onClose={onCloseErrorModal} info={errorModal} />}
    </>
  );
};
