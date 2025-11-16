import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const findMyEnrollments = async () => {
  const response = await axios.get(`${SERVER}/api/enrollments`);
  return response.data;
};

export const enrollInCourse = async (courseId: string) => {
  const response = await axios.post(`${SERVER}/api/enrollments`, { courseId });
  return response.data;
};

export const unenrollFromCourse = async (enrollmentId: string) => {
  const response = await axios.delete(`${SERVER}/api/enrollments/${enrollmentId}`);
  return response.data;
};
