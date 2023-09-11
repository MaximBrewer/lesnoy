import BackGround from "./img/bg.png"
import Tube from "./img/tube.png"
import Tube2 from "./img/tube2.png"
import GreenBrush from "./img/green.png"
import Family from "./img/family.png"
import BlueBrush from "./img/blue.png"
import YellowBrush from "./img/yellow.png"
import Tail from "./img/tail.png"
import PinkBrush from "./img/pink.png"
import Hand from "./img/hand.png"
import Paste from "./img/paste.png"


import { Fragment, useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer';

const numWord = (value: number, words: Array<string>) => {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

const phrases = [
  `Отлично получается`,
  `Так держать!`,
  `Неплохо`,
  `Какая скорость!`,
  `Еще немного`,
  `А если еще быстрее?`,
  `Фух, даже жарко стало…`,
  `Какое упорство!`,
  `Честно, мы поражены`,
  `Осталось совсем чуть-чуть`,
  `Финишная прямая!`,
  `Кажется, кто-то идет на рекорд`,
  `Очень хорошо!`,
  `У вас точно талант`,
  `Такого мы еще не видели`
]

const results = [
  `Превосходный результат!`,
  `Вот это да!`,
  `Как вам это удалось?`,
  `Ваш новый рекорд`,
  `Мы считаем, это успех`
]

const timing = 30


const StartBubble = () => {
  return <div className="w-[150px] h-[142px] lg:w-[379px] lg:h-[198px]">
    <svg className="lg:hidden" width="150" height="142" viewBox="0 0 150 142" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M25 142C13.9543 142 5 133.046 5 122V20.2458C4.94258 20.2392 4.88514 20.2323 4.82766 20.2252C4.82766 19.4381 4.86225 18.6149 4.89789 17.7666C5.0789 13.4592 5.28703 8.50627 1.1306 4.34984C-2.12785 1.0914 0.695544 0.00038147 22.4697 0.00038147C22.8644 0.00038147 23.2376 0.0168762 23.5899 0.0489349C24.0557 0.0164948 24.5259 0 25 0H130C141.046 0 150 8.9543 150 20V122C150 133.046 141.046 142 130 142H25Z" fill="white" />
    </svg>
    <svg className="hidden lg:block" width="379" height="198" viewBox="0 0 379 198" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M41 198C24.4315 198 11 184.569 11 168V30C11 29.2823 11.0252 28.5705 11.0748 27.8654C10.3175 21.7256 8.15299 15.5536 2.59942 10C-4.20824 3.19232 0.530343 0.499512 39.0161 0.0645447C39.6719 0.0217285 40.3334 0 41 0H51.2347C51.3765 -4.57764e-05 51.5187 -6.10352e-05 51.6612 -6.10352e-05C51.6822 -6.10352e-05 51.7032 -4.57764e-05 51.7242 0H349C365.569 0 379 13.4315 379 30V168C379 184.569 365.569 198 349 198H41Z" fill="white" />
    </svg>
    <div className="w-[124px] lg:w-[327px] left-[20px] top-[16px] lg:left-[40px] lg:top-[32px] absolute text-emerald-950 text-[22px] lg:text-[45px] font-medium leading-none">Нажмите на дозатор, чтобы выдавить пасту</div>
  </div>
}

type BubbleProps = {
  text: string;
  index: Number
};

const Bubble = ({ text, index }: BubbleProps) => {

  const opacity = index == 1 ? `` : (index == 2 ? `opacity-70` : `opacity-50`)

  return <div className={`relative pl-[.375rem] pl-2.5 flex items-stretch flex-col max-w-[141px] lg:max-w-[320px] ${opacity} ${index === 1 ? `animate-bubble` : ``}`}>
    <img src={Tail} className="absolute bottom-0 left-0 w-10 lg:w-16 h-auto" />
    <div className="rounded-full bg-white lg:text-2xl font-medium py-[12px] lg:py-[35px] px-4 lg:px-8 relative leading-none">{text}</div>
  </div>
}

console.log(window.innerWidth)

const brushes = [
  YellowBrush,
  PinkBrush,
  BlueBrush,
  GreenBrush
];

const App: React.FC = () => {

  const [classes, setClasses] = useState({
    hand: ``,
    brush: ``,
    paste: `hidden`
  });

  const [b1, setB1] = useState<boolean>(false);

  const [bubbles, setBubbles] = useState<Array<string>>([]);

  const [started, setStarted] = useState<boolean>(false);

  const [brushIndex, setBrushIndex] = useState<number>(0);

  const [timer, setTimer] = useState<number>(timing);

  const [count, setCount] = useState<number>(0);

  const click = (e: React.MouseEvent<HTMLDivElement>) => {

    e.preventDefault();

    setCount(prev => ++prev)

    setStarted(true)

    setTimer(prev => !prev ? timing : prev)

    setClasses(prev => ({
      ...prev,
      hand: ``,
      brush: ``,
      paste: `scale-0`
    }))

    setTimeout(() => {
      setClasses(prev => ({
        ...prev,
        hand: `animate-mpush lg:animate-push`,
        brush: `animate-mbrush lg:animate-brush`,
        paste: `animate-paste`
      }))
    }, 10)

    setTimeout(() => {
      setBrushIndex(prev => prev < 3 ? ++prev : 0)
      setClasses(prev => ({
        ...prev,
        paste: `animate-paste`
      }))
    }, 150)
  }

  useEffect(() => {
    if (started) {
      setB1(false)
      timer > 0 && setTimeout(() => setTimer(prev => --prev), 1000)
    }
  }, [timer, started])

  const { ref } = useInView({
    threshold: 0,
    delay: 300,
    triggerOnce: true,
    onChange: (e) => {
      setB1(e)
    }
  });

  useEffect(() => {
    if (count) {
      if (!(count % 4)) {
        setBubbles(prev => {
          let bubbles = [...prev]
          bubbles.push(phrases[bubbles.length % phrases.length])
          return bubbles
        })
      }
    }
  }, [count])


  useEffect(() => {
    [Tube, Family, BackGround, Tube2, GreenBrush, Family, BlueBrush, YellowBrush, Tail, PinkBrush, Hand, Paste].forEach((picture) => {
      const img = new Image();
      img.src = picture;
    });
  }, [])

  return (
    <div className="w-[342px] select-none lg:w-[1164px] h-[489px] lg:h-[764px] bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: `url('${BackGround}')` }}>
      {!started || timer ? <>
        <div
          className={`bg-cover bg-center bg-no-repeat w-[163px] lg:w-[260px] h-[140px] lg:h-[223px] left-0 lg:left-[384px] transition -top-[21px] lg:-top-8 absolute ${classes.hand}`}
          style={{ backgroundImage: `url('${Hand}')` }}
          onClick={click}
        />
        <div className="bg-cover bg-center bg-no-repeat w-[133px] lg:w-[208px] h-[346px] lg:h-[547px] left-[26px] lg:left-[428px] top-[118px] lg:top-[185px] absolute" style={{ backgroundImage: `url('${Tube2}')` }}></div>
      </> : <>
        <div className="bg-cover bg-center bg-no-repeat w-[133px] lg:w-[217px] h-[346px] lg:h-[616px] left-[26px] lg:left-[428px] top-[118px] lg:top-[116px] absolute hidden lg:block" style={{ backgroundImage: `url('${Tube}')` }}></div>
        <div className="bottom-5 lg:right-8 lg:bottom-8 absolute bg-white rounded-xl p-5 lg:p-8 w-[303px] lg:w-[389px] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto">
          <div className="text-3xl lg:text-[45px] font-medium mb-1 lg:mb-3 leading-none">{
            count < 20 ? results[4] : (count < 30 ? results[3] : (count < 40 ? results[2] : (count < 50 ? results[1] : results[0])))
          }</div>
          <div className="text-emerald-950 text-[22px] lg:text-3xl font-medium mb-1 lg:mb-4">{count} {numWord(count, ['нажатие', 'нажатия', 'нажатий'])}</div>
          <img className="mb-4 block w-full" src={Family} />
          <div className="text-emerald-950 text-[22px] lg:text-3xl font-medium leading-none">«Лесной бальзам» удивляет объемом: 400 нажатий для всей семьи!</div>
        </div>
      </>}
      {timer ? <>
        <div className={`bg-cover bg-center bg-no-repeat w-[321px] lg:w-[542px] h-[36px] lg:h-[62px] -right-[128px] lg:right-0 top-[129px] lg:top-[201px] absolute ${classes.brush}`} style={{ backgroundImage: `url('${brushes[brushIndex]}')` }}></div>
        <div className={`bg-cover bg-center bg-no-repeat w-[46px] lg:w-[82px] h-[19px] lg:h-[33px] right-[137px] lg:right-[454px] top-[115px] lg:top-[175px] absolute ${classes.paste}`} style={{ backgroundImage: `url('${Paste}')` }}></div>
      </> : ``}
      <div className={`p-2 lg:p-4 ${started ? `bg-emerald-950` : `bg-green-700`} rounded-lg lg:rounded-xl absolute right-4 lg:right-8 top-4 lg:top-8`}>
        <div className={`text-white text-[25px] lg:text-[45px] font-medium leading-none  ${started ? `${timer ? `` : `opacity-50`}` : ``}`}>00:{started ? (timer >= 10 ? timer : `0${timer}`) : timing >= 10 ? timing : `0${timing}`}</div>
      </div>
      {!started ? <div className={`absolute top-[182px] top-[290px] right-[21px] lg:right-8 ${b1 ? `opacity-100` : `opacity-0`} transition`}>
        <StartBubble />
      </div> : ``}
      {timer ? <div className="absolute bottom-[37px] left-[179px] lg:left-[794px] flex flex-col items-start gap-3 lg:gap-8">
        {bubbles.map((buble, bdx) => <Fragment>
          {bdx > bubbles.length - 4 ? <Bubble key={bdx} text={buble} index={bubbles.length - bdx} /> : ``}
        </Fragment>)}
      </div> : ``}
      <div className="h-px w-px absolute top-full left-1/2" ref={ref}></div>
    </div>
  );
};

export default App;
