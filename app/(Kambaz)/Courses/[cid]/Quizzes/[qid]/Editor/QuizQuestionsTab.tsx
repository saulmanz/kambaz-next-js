/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button, FormControl, FormLabel, ListGroup } from "react-bootstrap";
import Link from "next/link";
import { MCQEditor } from "./MCQEditor";
import { TFEditor } from "./TFEditor";
import { FIBEditor } from "./FIBEditor";
import QuestionPreview from "./QuestionPreview";

export default function QuizQuestionsTab({
  cid,
  questions,
  setQuestions,
  editingQuestion,
  setEditingQuestion,
  addQuestion,
  deleteQuestion,
  save,
  saveAndPublish
}: any) {
  const [openEditors, setOpenEditors] = useState<any>({});

  const openEditorFor = (q: any) => {
    // initialize editingQuestion for this question if not present
    setEditingQuestion((prev: any) => {
      if (prev && prev[q._id]) return prev;
      return { ...(prev || {}), [q._id]: { ...q } };
    });

    setOpenEditors((prev: any) => ({ ...(prev || {}), [q._id]: true }));
  };

  const closeEditorFor = (q: any) => {
    setOpenEditors((prev: any) => ({ ...(prev || {}), [q._id]: false }));
    setEditingQuestion((prev: any) => {
      if (!prev) return prev;
      const copy = { ...prev };
      delete copy[q._id];
      return copy;
    });
  };

  return (
    <div>
      <Button variant="primary" onClick={addQuestion}>Add Question</Button>
      <hr />

      <ListGroup>
        {questions.map((q: any, index: number) => {
          const localQuestion = {
            ...q,
            ...(editingQuestion[q._id] || {}),
            options:
              (editingQuestion[q._id]?.options || q.options || []).map(
                (opt: any) => ({
                  text: opt.text ?? "",
                  correct: !!opt.correct
                })
              ),
            answers: editingQuestion[q._id]?.answers || q.answers || [],
            answer: editingQuestion[q._id]?.answer ?? q.answer ?? "True",
            name: editingQuestion[q._id]?.name ?? q.name ?? "",
            points: editingQuestion[q._id]?.points ?? q.points ?? 1,
            type: editingQuestion[q._id]?.type ?? q.type ?? "MCQ"
          };

          return (
            <ListGroup.Item
              key={(q._id || index) + (openEditors[q._id] ? "-edit" : "-preview")}
            >
              <h5>Question {index + 1}</h5>

              {!openEditors[q._id] && (
                <QuestionPreview
                  question={localQuestion}
                  onEdit={() => openEditorFor(q)}
                  onDelete={() => deleteQuestion(index)}
                />
              )}

              {openEditors[q._id] && (
                <>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl
                    type="text"
                    value={localQuestion.name}
                    onChange={(e) =>
                      setEditingQuestion((prev: any) => ({
                        ...prev,
                        [q._id]: { ...localQuestion, name: e.target.value }
                      }))
                    }
                  />

                  <br />

                  <FormLabel>Question Type</FormLabel>
                  <FormControl
                    as="select"
                    value={localQuestion.type}
                    onChange={(e) =>
                      setEditingQuestion((prev: any) => ({
                        ...prev,
                        [q._id]: { ...localQuestion, type: e.target.value }
                      }))
                    }
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="TF">True / False</option>
                    <option value="FIB">Fill in the Blank</option>
                  </FormControl>

                  <br />

                  <FormLabel>Points</FormLabel>
                  <FormControl
                    type="number"
                    value={localQuestion.points}
                    onChange={(e) =>
                      setEditingQuestion((prev: any) => ({
                        ...prev,
                        [q._id]: {
                          ...localQuestion,
                          points: Number(e.target.value)
                        }
                      }))
                    }
                  />

                  <br />

                  {localQuestion.type === "MCQ" && (
                    <MCQEditor
                      question={localQuestion}
                      index={index}
                      onChange={(i: any, updated: any) =>
                        setEditingQuestion((prev: any) => ({
                          ...prev,
                          [q._id]: updated
                        }))
                      }
                    />
                  )}

                  {localQuestion.type === "TF" && (
                    <TFEditor
                      question={localQuestion}
                      index={index}
                      onChange={(i: any, updated: any) =>
                        setEditingQuestion((prev: any) => ({
                          ...prev,
                          [q._id]: updated
                        }))
                      }
                    />
                  )}

                  {localQuestion.type === "FIB" && (
                    <FIBEditor
                      question={localQuestion}
                      index={index}
                      onChange={(i: any, updated: any) =>
                        setEditingQuestion((prev: any) => ({
                          ...prev,
                          [q._id]: updated
                        }))
                      }
                    />
                  )}

                  <div className="d-flex gap-2 mt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => closeEditorFor(q)}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        // Use the edited copy if present, otherwise fall back to localQuestion
                        const edited = (editingQuestion && editingQuestion[q._id]) ? editingQuestion[q._id] : localQuestion;

                        // Close editor first so the UI collapses immediately
                        setOpenEditors((prev: any) => ({ ...(prev || {}), [q._id]: false }));

                        // Update questions array with the edited data
                        setQuestions((prev: any[]) =>
                          prev.map((item, i) =>
                            i === index ? { ...item, ...edited } : item
                          )
                        );

                        // Clear editing state for this question
                        setEditingQuestion((prev: any) => {
                          if (!prev) return prev;
                          const c = { ...prev };
                          delete c[q._id];
                          return c;
                        });
                      }}
                    >
                      Save Question
                    </Button>
                  </div>
                </>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <hr />
      <div className="d-flex justify-content-end gap-2 mt-4 mb-5">
        <Link href={`/Courses/${cid}/Quizzes`}>
          <Button variant="secondary" size="lg">Cancel</Button>
        </Link>
        <Button variant="danger" size="lg" onClick={save}>
          Save
        </Button>
        <Button variant="success" size="lg" onClick={saveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
