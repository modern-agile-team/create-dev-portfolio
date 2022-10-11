/* This is imported components of dev-portfolio library */
import {
  Header,
  TechStackList,
  Contact,
  Intro,
  Gallery,
  Item,
  Masonry,
  Image,
  Carousel,
  Experience,
  TechStackInput,
  VisitorComment,
} from "dev-portfolio";
import styled from "styled-components";
import {
  CardInstruction,
  Introduction,
  TeckstackInputInstruction,
  DisplayPortfolioInstruction,
  VisitorCounterInstruction,
} from "./common";
import useComment from "./hooks/useComment";
import "./App.css";
import color from "./common/style/theme";
import { SkillInstruction } from "./common/instruction/SkillInstruction";
import { ChannelInstruction } from "./common/instruction/ChannelInstruction";
import { ProgressBarInstruction } from "./common/instruction/ProgressBarInstruction";
import { ContactInstruction } from "./common/instruction/ContactInstruction";

function App() {
  /**
   * If you want to view README.md of 'dev-portfolio', go to the link below.
   * {@link https://github.com/modern-agile-team/dev-portfolio#readme}
   */

  /* These are variables and handler functions used in VisitorComment component. */
  const {
    comment,
    commentList,
    password,
    nickname,
    handleChangeDescription,
    handleChangeNickname,
    handleChangePassword,
    handleCreateComment,
  } = useComment();

  const itemList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    /**
     * The 'className' in the <div> tag surrounding the components of 'dev-portfolio' must be 'App'.
     * Only then can the SideBar in the <Header> component recognize id props and automatically assign all components into the SideBar.
     */
    <div className="App">
      {/**
       * @component Header
       * {@link https://github.com/modern-agile-team/dev-portfolio#header}
       */}
      <Header
        headerBackgroundColor={color.mainColor}
        logoOption={{
          redirectUrl: "/",
          title: "dev-portfolio",
          logoHidden: true,
          titleColor: `${color.pointColor}`,
          titleSize: "30px",
        }}
        channels={[
          {
            name: "github",
            redirectUrl: "https://",
            color: `${color.pointColor}`,
            size: "30px",
          },
          {
            name: "facebook",
            redirectUrl: "https://",
            color: `${color.pointColor}`,
            size: "30px",
          },
        ]}
        sideBarOption={{
          mainTitle: "dev-portfolio",
          mainTitleSize: "24px",
          mainTitleColor: "white",
          mainTitleAlign: "left",
          mainTitleBorderColor: "white",
          iconName: "ant-design:menu-fold-outlined", //Refer to the guidelines.
          iconSize: "28px",
          iconColor: `${color.pointColor}`,
          iconMargin: "0px 12px 0px 12px",
          itemTextColor: "white",
          itemTextAlign: "left",
          itemBackgroundColor: `${color.mainColor}`,
          itemHoverdBackgroundColor: `${color.pointColor}`,
          backgroundColor: `${color.mainColor}`,
        }}
      />

      {/**
       * Just introduction for dev-portfolio-app.
       *
       * If you want view internal of Introduction,
       * go to the './src/common/instruction/Introduction.tsx'
       */}
      <Introduction id="['Manual Introduction', 'bx:home-smile']" />

      {/**
       * @component Intro
       * {@link https://github.com/modern-agile-team/dev-portfolio#intro}
       */}
      <Intro
        id="['Intro', 'clarity:cursor-hand-open-line']"
        backgroundColor={color.mainColor}
        titleColor={color.pointColor}
        shortIntroColor="white"
      />

      {/**
       * TechStackInput used only to find the logoName value in the TechStackList.
       * @component TechStackInput
       * {@link none}
       *
       * If you want view internal of TeckstackInputInstruction,
       * go to the './src/common/instruction/TeckstackInputInstruction.tsx'
       */}
      <TeckstackInputInstruction id="['TechStackInput', 'fa:stack-overflow']" />
      <TechStackInput />

      {/**
       * @component TechStackList
       * {@link https://github.com/modern-agile-team/dev-portfolio#techstacklist}
       */}
      <TechStackListTitle id="['TechStackList', 'bx:coin-stack']">
        Tech Stack List
      </TechStackListTitle>
      <TechStackList
        techStackList={[
          {
            nameOption: {
              name: "Javascript",
              logoName: "Javascript",
              fontSize: "18px",
              logoSize: "24px",
            },
            progressBarOption: {
              rateText: "45%",
              backgroundColor: `${color.lightGrey}`,
              colorTo: `${color.mainColor}`,
              width: "100%",
              height: "35px",
            },
          },
          {
            nameOption: {
              name: "HTML5",
              logoName: "HTML-5",
              fontSize: "18px",
              logoSize: "24px",
            },
            progressBarOption: {
              rateText: "30%",
              backgroundColor: `${color.lightGrey}`,
              colorTo: `${color.mainColor}`,
              colorFrom: `${color.pointColor}`,
              width: "100%",
              height: "35px",
              isBlinking: true,
            },
          },
          {
            nameOption: {
              name: "Nodejs",
              logoName: "Nodejs",
              fontSize: "18px",
              logoSize: "24px",
            },
            progressBarOption: {
              rateText: "85%",
              rateTextColor: `${color.lightGrey}`,
              backgroundColor: `${color.lightGrey}`,
              colorTo: `${color.mainColor}`,
              width: "100%",
              height: "35px",
            },
          },
        ]}
      />

      <ProgressBarInstruction id="['ProgressBar', 'ci:bar-chart-horizontal']" />

      <SkillInstruction id="['Skill', 'charm:stack']" />

      {/**
       * Just introduction for Carousel, Gallery and Masonry.
       *
       * If you want view internal of DisplayPortfolioInstruction,
       * go to the './src/common/instruction/DisplayPortfolioInstruction.tsx'
       */}
      <DisplayPortfolioInstruction />

      {/**
       * @component Carousel
       * {@link https://github.com/modern-agile-team/dev-portfolio#carousel}
       */}
      <CarouselWrap>
        <Carousel id="['Carousel', 'bx:carousel']">
          <Item title="1" />
          <Item title="2" />
          <Item title="3" />
        </Carousel>
      </CarouselWrap>

      {/**
       * @component Gallery
       * {@link https://github.com/modern-agile-team/dev-portfolio#gallery}
       */}
      <Gallery id="['Gallery', 'clarity:image-gallery-line']">
        {itemList.map((idx) => (
          <Item
            key={idx}
            hoverdInnerBorderColor={color.mainColor}
            titleColor={color.pointColor}
          />
        ))}
      </Gallery>

      {/**
       * @component Masonry
       * {@link https://github.com/modern-agile-team/dev-portfolio#masonry}
       */}
      <Masonry id="['Masonry', 'ri:layout-masonry-line']">
        <Image src="https://picsum.photos/600/600/?random" />
        <Image src="https://picsum.photos/600/900/?random" />
        <Image src="https://picsum.photos/300/400/?random" />
        <Image src="https://picsum.photos/600/400/?random" />
        <Image src="https://picsum.photos/600/900/?random" />
        <Image src="https://picsum.photos/600/300/?random" />
        <Image src="https://picsum.photos/400/700/?random" />
        <Image src="https://picsum.photos/600/600/?random" />
        <Image src="https://picsum.photos/600/800/?random" />
        <Image src="https://picsum.photos/600/300/?random" />
        <Image src="https://picsum.photos/600/500/?random" />
        <Image src="https://picsum.photos/500/600/?random" />
        <Image src="https://picsum.photos/700/600/?random" />
      </Masonry>

      {/**
       * @component VisitorCounter
       * {@link https://github.com/modern-agile-team/dev-portfolio#visitorcounter}
       *
       * If you want view Card component,
       * go to the './src/common/instruction/VisitorCounterInstruction.tsx'
       */}
      <VisitorCounterInstruction id="['VisitorCounter', 'mdi:counter']" />

      {/**
       * @component VisitorComment
       * {@link https://github.com/modern-agile-team/dev-portfolio#visitorcomment}
       */}
      <VisitorCommentTitle id="['VisitorComment', 'bx:comment-dots']">
        Visitor Comments
      </VisitorCommentTitle>
      <VisitorComment
        backgroundColor={color.mainColor}
        progressbarColor={color.pointColor}
        handleChangeDescription={handleChangeDescription}
        handleChangeNickname={handleChangeNickname}
        handleChangePassword={handleChangePassword}
        handleCreateComment={handleCreateComment}
        comment={comment}
        nickname={nickname}
        password={password}
        commentList={commentList}
        buttonColor={color.mainColor}
        listNicknameColor={color.mainColor}
        listDateColor={color.pointColor}
      />

      {/**
       * @component Card
       * {@link https://github.com/modern-agile-team/dev-portfolio#card}
       *
       * If you want view Card component,
       * go to the './src/common/instruction/CardInstruction.tsx'
       */}
      <CardInstruction id="['Card', 'bi:card-list']" />

      {/**
       * @component Experience
       * {@link https://github.com/modern-agile-team/dev-portfolio#experience}
       */}
      <Experience id="['Experience', 'carbon:list-boxes']" theme="vertical" />

      <ChannelInstruction id="['Channel', 'fluent:channel-48-filled']" />
      {/**
       * @component Contact
       * {@link https://github.com/modern-agile-team/dev-portfolio#contact}
       */}

      <ContactInstruction />
      <Contact
        id="['Contact', 'fluent:contact-card-20-regular']"
        titleColor={color.pointColor}
        subTitleColor={color.lightGrey}
        backgroundColor={color.mainColor}
        channels={[
          {
            name: "github",
            redirectUrl: "https://",
            color: `${color.pointColor}`,
          },
          {
            name: "facebook",
            redirectUrl: "https://",
            color: `${color.pointColor}`,
          },
        ]}
        aboutMeInfos={[
          {
            title: "Where I live",
            titleColor: `${color.pointColor}`,
            description: "Seoul, Republic of Korea",
            descriptionColor: `${color.lightGrey}`,
          },
          {
            title: "Give me a call",
            titleColor: `${color.pointColor}`,
            description: "T. +82 (0)10 1234 5678",
            descriptionColor: `${color.lightGrey}`,
          },
          {
            title: "Or, why don’t you email me?",
            titleColor: `${color.pointColor}`,
            description: "dev-portfolio@gmail.com",
            descriptionColor: `${color.lightGrey}`,
          },
        ]}
      />
    </div>
  );
}

export default App;

/**
 * Just styled component for TechStackList's title
 *
 * If you don't need this, delete both TechStackListTitle component and the style components below.
 */
const TechStackListTitle = styled.h1`
  color: ${color.mainColor};
  margin: 1em 1em;
  padding-bottom: 15px;
  border-bottom: 1px solid;
`;

/**
 * Just styled component for VisitorComment's title
 *
 * If you don't need this, delete both VisitorCommentTitle component and the style components below.
 */
const VisitorCommentTitle = styled.h1`
  margin: 1em 1em 0 1em;
  padding-bottom: 15px;
`;

/**
 * Just styled component for Carousel's title
 *
 * If you don't need this, delete both CarouselWrap component and the style components below.
 */
const CarouselWrap = styled.div`
  background-color: ${color.mainColor};
  padding: 2em 0;
  svg {
    color: white;
  }
`;
