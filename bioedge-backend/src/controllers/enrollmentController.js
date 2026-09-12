import { CourseModel } from '../models/courseModel.js';
import { EnrollmentModel } from '../models/enrollmentModel.js';

export const EnrollmentController = {
  /**
   * Process and finalize course enrollment
   * Critical Security Rule: Course pricing is ALWAYS determined authoritatively from the database.
   * Frontend-submitted pricing amounts are strictly ignored.
   */
  async createEnrollment(req, res) {
    try {
      const userId = req.user.id;
      const { courseId, plan = 'full', paymentMethod = 'bKash', transactionId = '' } = req.body;

      if (!courseId) {
        return res.status(400).json({
          success: false,
          message: 'Course ID or Slug is required.'
        });
      }

      // Authoritative lookup from database
      const course = CourseModel.findBySlugOrId(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Selected course does not exist.'
        });
      }

      // Check seat capacity limit
      if (course.enrolled_count >= course.seat_limit) {
        return res.status(400).json({
          success: false,
          message: `Admission for ${course.title} is currently full (${course.seat_limit}/${course.seat_limit} seats filled).`
        });
      }

      // Authoritatively compute fee from DB
      const authoritativeAmount = (plan === 'monthly' && course.monthly_fee)
        ? course.monthly_fee
        : course.full_fee;

      // Check if user already has an active enrollment for this course
      const existingEnrollments = EnrollmentModel.findByUserId(userId);
      const isAlreadyEnrolled = existingEnrollments.some(e => e.course_id === course.id || e.course_slug === course.slug);

      if (isAlreadyEnrolled) {
        return res.status(400).json({
          success: false,
          message: `You are already enrolled in ${course.title}. Please visit your student dashboard.`
        });
      }

      // Create enrollment in database
      const enrollment = EnrollmentModel.create({
        userId,
        courseId: course.id,
        courseSlug: course.slug,
        plan,
        authoritativeAmount,
        paymentMethod,
        transactionId: transactionId || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        studentName: req.user.name,
        studentEmail: req.user.email,
        studentPhone: req.user.phone || ''
      });

      // Increment enrolled count
      CourseModel.incrementEnrolledCount(course.id);

      return res.status(201).json({
        success: true,
        message: `Congratulations! You have successfully enrolled in ${course.title}.`,
        enrollment: {
          id: enrollment.id,
          courseTitle: course.title,
          courseSlug: course.slug,
          plan: enrollment.plan,
          authoritativeAmount: enrollment.authoritative_amount,
          paymentMethod: enrollment.payment_method,
          paymentStatus: enrollment.payment_status,
          enrollmentStatus: enrollment.enrollment_status,
          transactionId: enrollment.transaction_id,
          createdAt: enrollment.created_at
        }
      });
    } catch (error) {
      console.error('Enrollment creation error:', error);
      return res.status(500).json({
        success: false,
        message: 'Could not process enrollment. Please try again.'
      });
    }
  },

  /**
   * Get all enrollments of the currently logged-in student
   */
  async getMyEnrollments(req, res) {
    try {
      const enrollments = EnrollmentModel.findByUserId(req.user.id);
      return res.status(200).json({
        success: true,
        enrollments
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve your enrollments.'
      });
    }
  }
};
