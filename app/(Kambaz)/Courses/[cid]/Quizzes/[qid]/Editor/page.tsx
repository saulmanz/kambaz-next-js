/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Tabs,
  Tab} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as client from "../../client";
import { addQuiz, updateQuiz as updateRedux } from "../../reducer";
import QuizDetailsTab from "./QuizDetailsTab";
import QuizQuestionsTab from "./QuizQuestionsTab";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    _id: qid ?? "",
    title: "",
    course: cid ?? "",
    instruction: "",
    available: "",
    due: "",
    until: "",
    points: 100,
    type: "Graded Quiz",
    group: "Quizzes",
    shuffleAnswers: true,
    multipleAttempts: false,
    maxAttempts: null,
    oneQuestion: false,
    webcamRequired: false,
    lockQuestions: false,
    showCorrect: false,
    timeLimit: 20,
    accessCode: "",
    questionTotal: 100,
    studentScores: [],
    questions: [],
    published: false
  });

  const [questions, setQuestions] = useState<any[]>(quiz.questions || []);
  const [editingQuestion, setEditingQuestion] = useState<{ [key: string]: any }>({});

  // Load quiz if editing
  useEffect(() => {
    if (!qid || qid === "QuizEditor") {
      setQuiz((prev: any) => ({ ...prev, _id: "", course: cid ?? prev.course }));
      setQuestions([]);
      return;
    }

    const loadQuiz = async () => {
      try {
        const q = await client.findQuizById(qid.toString());
        const loadedQuiz = {
          _id: q._id ?? "",
          title: q.title ?? "",
          course: q.course ?? cid ?? "",
          instruction: q.instruction ?? "",
          available: q.available ?? "",
          due: q.due ?? "",
          until: q.until ?? "",
          points: q.points ?? 0,
          type: q.type ?? "Graded Quiz",
          group: q.group ?? "Quizzes",
          shuffleAnswers: q.shuffleAnswers ?? true,
          multipleAttempts: q.multipleAttempts ?? false,
          maxAttempts: q.maxAttempts ?? null,
          oneQuestion: q.oneQuestion ?? false,
          webcamRequired: q.webcamRequired ?? false,
          lockQuestions: q.lockQuestions ?? false,
          showCorrect: q.showCorrect ?? false,
          timeLimit: q.timeLimit ?? 20,
          accessCode: q.accessCode ?? "",
          questionTotal: q.questionTotal ?? 100,
          studentScores: q.studentScores ?? [],
          questions: q.questions ?? [],
          published: q.published ?? false
        };
        setQuiz(loadedQuiz);
        setQuestions(loadedQuiz.questions || []);
      } catch (err) {
        console.error("Failed to load quiz:", err);
      }
    };

    loadQuiz();
  }, [qid, cid]);

  // Update total points whenever questions change
  useEffect(() => {
    const total = questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0);
    setQuiz((prev: any) => ({ ...prev, points: total }));
  }, [questions]);

  const save = async () => {
    try {
      const quizToSave = {
        ...quiz,
        course: quiz.course || cid,
        questions,
      };

      let savedQuiz;
      if (!qid || qid === "QuizEditor" || !quiz._id) {
        savedQuiz = await client.createQuiz(quizToSave);
        dispatch(addQuiz(savedQuiz));
      } else {
        savedQuiz = await client.updateQuiz(quizToSave);
        dispatch(updateRedux(savedQuiz));
      }

      // Redirect (only if called by Save)
      router.push(`/Courses/${cid}/Quizzes`);
      return savedQuiz;
    } catch (err) {
      console.error("Failed to save quiz:", err);
      alert("Failed to save quiz.");
    }
  };

  const saveWithoutRedirect = async () => {
    const quizToSave = {
      ...quiz,
      course: quiz.course || cid,
      questions,
    };

    let savedQuiz;
    if (!qid || qid === "QuizEditor" || !quiz._id) {
      savedQuiz = await client.createQuiz(quizToSave);
      dispatch(addQuiz(savedQuiz));
    } else {
      savedQuiz = await client.updateQuiz(quizToSave);
      dispatch(updateRedux(savedQuiz));
    }

    return savedQuiz;
  };

  const saveAndPublish = async () => {
    try {
      const savedQuiz = await saveWithoutRedirect();
      await client.togglePublish(savedQuiz._id); // Or publish API call

      router.push(`/Courses/${cid}/Quizzes`);
    } catch (err) {
      console.error("Failed to save and publish:", err);
    }
  };



  const addQuestion = () => {
    const tempId = `temp-${Date.now()}`;
    const newQuestion = {
      _id: tempId,
      name: "Question",
      question: "",
      type: "MCQ",
      points: 1,
      options: [
        { text: "Option 1", correct: false },
        { text: "Option 2", correct: false }
      ],
      answers: []
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setActiveTab("questions");
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-assignments-editor">
      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key || "details")} className="mb-4">
        <Tab eventKey="details" title="Details" />
        <Tab eventKey="questions" title="Questions" />
      </Tabs>

      {activeTab === "details" && (
        <QuizDetailsTab
          quiz={quiz}
          cid={cid}
          setQuiz={setQuiz}
          save={save}
          saveAndPublish={saveAndPublish}
        />
      )}

      {activeTab === "questions" && (
        <QuizQuestionsTab
          cid={cid}
          quiz={quiz}
          questions={questions}
          setQuestions={setQuestions}
          editingQuestion={editingQuestion}
          setEditingQuestion={setEditingQuestion}
          addQuestion={addQuestion}
          deleteQuestion={deleteQuestion}
          save={save}
          saveAndPublish={saveAndPublish}
        />
      )}
    </div>
  );
}
