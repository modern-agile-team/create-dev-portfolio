import React, { useState, useEffect } from "react";
import commentAPI from "../apis/comment";

const useComment = () => {
  const [commentList, setCommentList] = useState<any[] | undefined>(undefined);
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const initializeCommentState = () => {
    setComment("");
    setNickname("");
    setPassword("");
  };
  const handleChangeDescription = (e?: React.ChangeEvent<HTMLElement>) => {
    if (!e) return;
    const target = e.currentTarget as HTMLTextAreaElement;
    setComment(target.value);
  };
  const handleChangeNickname = (e?: React.ChangeEvent<HTMLElement>) => {
    if (!e) return;
    const target = e.currentTarget as HTMLInputElement;
    setNickname(target.value);
  };
  const handleChangePassword = (e?: React.ChangeEvent<HTMLElement>) => {
    if (!e) return;
    const target = e.currentTarget as HTMLInputElement;
    setPassword(target.value);
  };

  const handleCreateComment = async (
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data = { nickname, password, description: comment };
    const result = await commentAPI.createComment(data);
    if (result.statusCode === 400) {
      alert(result.detail[0].constraints.isLength);
      initializeCommentState();
      return;
    }
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let today = date.getDate();

    if (!commentList) {
      setCommentList([data]);
    } else {
      setCommentList([
        ...commentList,
        { ...data, date: `${year}-${month}-${today}` },
      ]);
      initializeCommentState();
      console.log(result);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await commentAPI.getCommment();
      console.log(result);
      setCommentList(result.visitorComments);
    })();
  }, []);

  return {
    handleChangeDescription,
    handleChangeNickname,
    handleChangePassword,
    handleCreateComment,
    commentList,
    comment,
    nickname,
    password,
  };
};

export default useComment;
