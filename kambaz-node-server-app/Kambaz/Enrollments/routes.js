import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // List all enrollments for current user
  const findMyEnrollments = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.status(401).json({ error: "Not logged in" });

    const enrollments = dao.findEnrollmentsByUser(currentUser._id);
    res.json(enrollments);
  };

  // Enroll in a course
  const enrollInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.status(401).json({ error: "Not logged in" });

    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ error: "Missing courseId" });

    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  // Unenroll from a course
  const unenrollFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.status(401).json({ error: "Not logged in" });

    const { enrollmentId } = req.params;
    if (!enrollmentId) return res.status(400).json({ error: "Missing enrollmentId" });

    const deleted = dao.unenrollUser(enrollmentId);
    res.json({ deleted });
  };

  // Routes
  app.get("/api/enrollments", findMyEnrollments);
  app.post("/api/enrollments", enrollInCourse);
  app.delete("/api/enrollments/:enrollmentId", unenrollFromCourse);
}
